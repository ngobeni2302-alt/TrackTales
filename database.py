import sqlite3
import os
import secrets
import hashlib
import time
import bcrypt
from base64 import b64encode, b64decode
from datetime import datetime, timedelta
from typing import Optional, Dict, List, Tuple
from cryptography.fernet import Fernet

DB_PATH = os.path.join(os.path.dirname(__file__), "tracktales.db")
KEY_PATH = os.path.join(os.path.dirname(__file__), ".db_secret_key")

def _get_or_create_cipher_key() -> bytes:
    """Load or generate master AES-256 key for field-level PII encryption."""
    env_key = os.getenv("TRACKTALES_DB_SECRET_KEY")
    if env_key:
        return env_key.encode('utf-8')
    if os.path.exists(KEY_PATH):
        with open(KEY_PATH, "rb") as f:
            return f.read().strip()
    key = Fernet.generate_key()
    with open(KEY_PATH, "wb") as f:
        f.write(key)
    return key

_CIPHER_KEY = _get_or_create_cipher_key()
_FERNET = Fernet(_CIPHER_KEY)

def encrypt_pii(data: str) -> str:
    """Encrypt sensitive personally identifiable information (PII) at rest."""
    if not data:
        return ""
    try:
        return _FERNET.encrypt(data.encode('utf-8')).decode('utf-8')
    except Exception:
        return data

def decrypt_pii(ciphertext: str) -> str:
    """Decrypt sensitive PII fetched from database."""
    if not ciphertext:
        return ""
    try:
        return _FERNET.decrypt(ciphertext.encode('utf-8')).decode('utf-8')
    except Exception:
        # Fallback if text was stored unencrypted
        return ciphertext

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize central SQLite database tables with security constraints."""
    with get_db() as conn:
        cursor = conn.cursor()
        
        # Create users table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                full_name TEXT NOT NULL,
                created_at TEXT NOT NULL,
                last_login TEXT
            )
        """)
        
        # Create failed login attempt tracker table for brute-force prevention
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS login_attempts (
                login TEXT PRIMARY KEY,
                failed_count INTEGER DEFAULT 0,
                last_failed_at INTEGER DEFAULT 0,
                locked_until INTEGER DEFAULT 0
            )
        """)
        
        # Create password reset codes table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS password_resets (
                email TEXT PRIMARY KEY,
                reset_code TEXT NOT NULL,
                expires_at INTEGER NOT NULL
            )
        """)
        
        # Create user tickets table linked to central user accounts
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_tickets (
                ticket_id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                passenger_name TEXT NOT NULL,
                train_id TEXT NOT NULL,
                train_name TEXT NOT NULL,
                cabin_type TEXT NOT NULL,
                travel_date TEXT NOT NULL,
                passengers_count INTEGER NOT NULL,
                carriage_number TEXT NOT NULL,
                seat_number TEXT NOT NULL,
                boarding_station TEXT NOT NULL,
                destination_station TEXT NOT NULL,
                qr_code_data TEXT NOT NULL,
                issued_at TEXT NOT NULL,
                status TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        """)
        
        conn.commit()

# --- Security & Hashing Functions ---

def hash_password(password: str) -> str:
    """Hash password securely using Bcrypt with cost factor 12."""
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(password: str, stored_hash: str) -> bool:
    """Verify plain password against stored bcrypt (or legacy PBKDF2) hash."""
    try:
        if stored_hash.startswith("$2b$") or stored_hash.startswith("$2a$"):
            return bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8'))
        
        # Legacy PBKDF2 fallback
        salt, key_hex = stored_hash.split("$")
        recalculated_key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return secrets.compare_digest(recalculated_key.hex(), key_hex)
    except Exception:
        return False

# --- Brute-Force Rate Limiting Functions ---

MAX_FAILED_ATTEMPTS = 5
LOCKOUT_DURATION_SECONDS = 900  # 15 minutes lockout

def is_account_locked(login: str) -> Tuple[bool, int]:
    """Check if account is temporarily locked due to failed login attempts."""
    clean_login = login.strip().lower()
    now = int(time.time())
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT failed_count, locked_until FROM login_attempts WHERE login = ?", (clean_login,))
        row = cursor.fetchone()
        if row:
            locked_until = row["locked_until"]
            if locked_until > now:
                return True, locked_until - now
    return False, 0

def record_login_attempt(login: str, success: bool):
    """Record login attempt; locks account if failed attempts exceed limit."""
    clean_login = login.strip().lower()
    now = int(time.time())
    with get_db() as conn:
        cursor = conn.cursor()
        if success:
            cursor.execute("DELETE FROM login_attempts WHERE login = ?", (clean_login,))
        else:
            cursor.execute("SELECT failed_count, locked_until FROM login_attempts WHERE login = ?", (clean_login,))
            row = cursor.fetchone()
            if row:
                new_count = row["failed_count"] + 1
                locked_until = (now + LOCKOUT_DURATION_SECONDS) if new_count >= MAX_FAILED_ATTEMPTS else 0
                cursor.execute("""
                    UPDATE login_attempts
                    SET failed_count = ?, last_failed_at = ?, locked_until = ?
                    WHERE login = ?
                """, (new_count, now, locked_until, clean_login))
            else:
                cursor.execute("""
                    INSERT INTO login_attempts (login, failed_count, last_failed_at, locked_until)
                    VALUES (?, 1, ?, 0)
                """, (clean_login, now))
        conn.commit()

# --- Database User Helper Functions ---

def create_user(user_id: str, email: str, username: str, password_hash: str, full_name: str) -> Dict:
    now = datetime.utcnow().isoformat() + "Z"
    clean_email = email.lower().strip()
    clean_username = username.strip()
    encrypted_name = encrypt_pii(full_name.strip())

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO users (id, email, username, password_hash, full_name, created_at, last_login)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (user_id, clean_email, clean_username, password_hash, encrypted_name, now, now))
        conn.commit()

    return {
        "id": user_id,
        "email": clean_email,
        "username": clean_username,
        "full_name": full_name.strip(),
        "created_at": now
    }

def get_user_by_email(email: str) -> Optional[Dict]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE LOWER(email) = ?", (email.lower().strip(),))
        row = cursor.fetchone()
        if row:
            d = dict(row)
            d["full_name"] = decrypt_pii(d["full_name"])
            return d
    return None

def get_user_by_username(username: str) -> Optional[Dict]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE LOWER(username) = ?", (username.lower().strip(),))
        row = cursor.fetchone()
        if row:
            d = dict(row)
            d["full_name"] = decrypt_pii(d["full_name"])
            return d
    return None

def get_user_by_id(user_id: str) -> Optional[Dict]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, email, username, full_name, created_at, last_login FROM users WHERE id = ?", (user_id,))
        row = cursor.fetchone()
        if row:
            d = dict(row)
            d["full_name"] = decrypt_pii(d["full_name"])
            return d
    return None

def update_last_login(user_id: str):
    now = datetime.utcnow().isoformat() + "Z"
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET last_login = ? WHERE id = ?", (now, user_id))
        conn.commit()

# --- Database Ticket Helper Functions ---

def save_user_ticket(ticket: Dict, user_id: Optional[str] = None):
    encrypted_passenger = encrypt_pii(ticket["passenger_name"])
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO user_tickets (
                ticket_id, user_id, passenger_name, train_id, train_name,
                cabin_type, travel_date, passengers_count, carriage_number,
                seat_number, boarding_station, destination_station, qr_code_data, issued_at, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            ticket["ticket_id"],
            user_id or "GUEST",
            encrypted_passenger,
            ticket["train_id"],
            ticket["train_name"],
            ticket["cabin_type"],
            ticket["travel_date"],
            ticket["passengers_count"],
            ticket["carriage_number"],
            ticket["seat_number"],
            ticket["boarding_station"],
            ticket["destination_station"],
            ticket["qr_code_data"],
            ticket["issued_at"],
            ticket["status"]
        ))
        conn.commit()

def get_user_tickets(user_id: str) -> List[Dict]:
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user_tickets WHERE user_id = ? ORDER BY issued_at DESC", (user_id,))
        rows = cursor.fetchall()
        tickets = []
        for row in rows:
            t = dict(row)
            t["passenger_name"] = decrypt_pii(t["passenger_name"])
            tickets.append(t)
        return tickets

# --- Password Reset Helper Functions ---

def create_password_reset_code(email: str) -> str:
    """Generate a 6-digit password reset security code valid for 15 minutes."""
    clean_email = email.strip().lower()
    code = f"{secrets.randbelow(900000) + 100000}"
    expires_at = int(time.time()) + 900
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO password_resets (email, reset_code, expires_at)
            VALUES (?, ?, ?)
            ON CONFLICT(email) DO UPDATE SET reset_code = excluded.reset_code, expires_at = excluded.expires_at
        """, (clean_email, code, expires_at))
        conn.commit()
    return code

def verify_reset_code(email: str, code: str) -> bool:
    """Verify if 6-digit reset code matches and is active."""
    clean_email = email.strip().lower()
    now = int(time.time())
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT reset_code, expires_at FROM password_resets WHERE email = ?", (clean_email,))
        row = cursor.fetchone()
        if row and row["reset_code"] == code.strip() and row["expires_at"] > now:
            return True
    return False

def reset_user_password(email: str, new_password_hash: str) -> bool:
    """Update user password in central SQLite database and delete used code."""
    clean_email = email.strip().lower()
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET password_hash = ? WHERE LOWER(email) = ?", (new_password_hash, clean_email))
        cursor.execute("DELETE FROM password_resets WHERE email = ?", (clean_email,))
        conn.commit()
        return cursor.rowcount > 0
