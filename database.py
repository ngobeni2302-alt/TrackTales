import sqlite3
import os
import secrets
import hashlib
import time
import bcrypt
from datetime import datetime
from typing import Optional, Dict, List, Tuple
from cryptography.fernet import Fernet

# Load local .env file if present
_ENV_FILE = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(_ENV_FILE):
    try:
        with open(_ENV_FILE, "r", encoding="utf-8") as _f:
            for _line in _f:
                _line = _line.strip()
                if _line and not _line.startswith("#") and "=" in _line:
                    _k, _v = _line.split("=", 1)
                    _k, _v = _k.strip(), _v.strip().strip("\"'")
                    if _k and _k not in os.environ:
                        os.environ[_k] = _v
    except Exception:
        pass

# Optional Supabase Cloud Integration
try:
    from supabase import create_client, Client
    SUPABASE_URL = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY", "") or os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
    _SUPABASE_CLIENT: Optional[Client] = create_client(SUPABASE_URL, SUPABASE_KEY) if (SUPABASE_URL and SUPABASE_KEY) else None
except Exception:
    _SUPABASE_CLIENT = None

import shutil

IS_VERCEL = bool(os.getenv("VERCEL"))
if IS_VERCEL:
    DB_PATH = "/tmp/tracktales.db"
    KEY_PATH = "/tmp/.db_secret_key"
    bundled_db = os.path.join(os.path.dirname(__file__), "tracktales.db")
    if not os.path.exists(DB_PATH) and os.path.exists(bundled_db):
        try:
            shutil.copyfile(bundled_db, DB_PATH)
        except Exception:
            pass
    bundled_key = os.path.join(os.path.dirname(__file__), ".db_secret_key")
    if not os.path.exists(KEY_PATH) and os.path.exists(bundled_key):
        try:
            shutil.copyfile(bundled_key, KEY_PATH)
        except Exception:
            pass
else:
    DB_PATH = os.path.join(os.path.dirname(__file__), "tracktales.db")
    KEY_PATH = os.path.join(os.path.dirname(__file__), ".db_secret_key")

def _get_or_create_cipher_key() -> bytes:
    """Load or generate master AES-256 key for field-level PII encryption."""
    env_key = os.getenv("TRACKTALES_DB_SECRET_KEY")
    if env_key:
        return env_key.encode('utf-8')
    if os.path.exists(KEY_PATH):
        try:
            with open(KEY_PATH, "rb") as f:
                return f.read().strip()
        except Exception:
            pass
    key = Fernet.generate_key()
    try:
        with open(KEY_PATH, "wb") as f:
            f.write(key)
    except Exception:
        pass
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
        return ciphertext

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize central SQLite database tables with security constraints."""
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            
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
            
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS login_attempts (
                    login TEXT PRIMARY KEY,
                    failed_count INTEGER DEFAULT 0,
                    last_failed_at INTEGER DEFAULT 0,
                    locked_until INTEGER DEFAULT 0
                )
            """)
            
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS password_resets (
                    email TEXT PRIMARY KEY,
                    reset_code TEXT NOT NULL,
                    expires_at INTEGER NOT NULL
                )
            """)
            
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

            cursor.execute("""
                CREATE TABLE IF NOT EXISTS user_journals (
                    id TEXT PRIMARY KEY,
                    user_id TEXT NOT NULL,
                    train_id TEXT NOT NULL,
                    train_name TEXT NOT NULL,
                    stop_name TEXT NOT NULL,
                    category TEXT NOT NULL,
                    date_str TEXT NOT NULL,
                    timestamp INTEGER NOT NULL,
                    text TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
                )
            """)
            
            conn.commit()
    except Exception as e:
        print("SQLite init warning (fallback to memory/Supabase):", e)


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
        
        salt, key_hex = stored_hash.split("$")
        recalculated_key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return secrets.compare_digest(recalculated_key.hex(), key_hex)
    except Exception:
        return False

# --- Brute-Force Rate Limiting Functions ---

MAX_FAILED_ATTEMPTS = 5
LOCKOUT_DURATION_SECONDS = 900  # 15 minutes lockout

def is_account_locked(login: str) -> Tuple[bool, int]:
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

# --- Database User Helper Functions (Dual Local & Supabase Cloud) ---

def create_user(user_id: str, email: str, username: str, password_hash: str, full_name: str) -> Dict:
    now = datetime.utcnow().isoformat() + "Z"
    clean_email = email.lower().strip()
    clean_username = username.strip()
    encrypted_name = encrypt_pii(full_name.strip())

    # 1. Supabase Cloud DB write if configured
    if _SUPABASE_CLIENT:
        try:
            _SUPABASE_CLIENT.table("users").insert({
                "id": user_id,
                "email": clean_email,
                "username": clean_username,
                "password_hash": password_hash,
                "full_name": encrypted_name,
                "created_at": now,
                "last_login": now
            }).execute()
        except Exception as e:
            print("Supabase cloud insert warning:", e)

    # 2. Local SQLite DB write
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
    clean_email = email.lower().strip()
    if _SUPABASE_CLIENT:
        try:
            res = _SUPABASE_CLIENT.table("users").select("*").eq("email", clean_email).execute()
            if res.data and len(res.data) > 0:
                d = dict(res.data[0])
                d["full_name"] = decrypt_pii(d["full_name"])
                return d
        except Exception as e:
            print("Supabase email query warning:", e)

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE LOWER(email) = ?", (clean_email,))
        row = cursor.fetchone()
        if row:
            d = dict(row)
            d["full_name"] = decrypt_pii(d["full_name"])
            return d
    return None

def get_user_by_username(username: str) -> Optional[Dict]:
    clean_username = username.lower().strip()
    if _SUPABASE_CLIENT:
        try:
            res = _SUPABASE_CLIENT.table("users").select("*").eq("username", clean_username).execute()
            if res.data and len(res.data) > 0:
                d = dict(res.data[0])
                d["full_name"] = decrypt_pii(d["full_name"])
                return d
        except Exception as e:
            print("Supabase username query warning:", e)

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE LOWER(username) = ?", (clean_username,))
        row = cursor.fetchone()
        if row:
            d = dict(row)
            d["full_name"] = decrypt_pii(d["full_name"])
            return d
    return None

def get_user_by_id(user_id: str) -> Optional[Dict]:
    if _SUPABASE_CLIENT:
        try:
            res = _SUPABASE_CLIENT.table("users").select("id, email, username, full_name, created_at, last_login").eq("id", user_id).execute()
            if res.data and len(res.data) > 0:
                d = dict(res.data[0])
                d["full_name"] = decrypt_pii(d["full_name"])
                return d
        except Exception as e:
            print("Supabase id query warning:", e)

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
    if _SUPABASE_CLIENT:
        try:
            _SUPABASE_CLIENT.table("users").update({"last_login": now}).eq("id", user_id).execute()
        except Exception:
            pass

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET last_login = ? WHERE id = ?", (now, user_id))
        conn.commit()

# --- Database Ticket Helper Functions ---

def save_user_ticket(ticket: Dict, user_id: Optional[str] = None):
    encrypted_passenger = encrypt_pii(ticket["passenger_name"])
    ticket_payload = {
        "ticket_id": ticket["ticket_id"],
        "user_id": user_id or "GUEST",
        "passenger_name": encrypted_passenger,
        "train_id": ticket["train_id"],
        "train_name": ticket["train_name"],
        "cabin_type": ticket["cabin_type"],
        "travel_date": ticket["travel_date"],
        "passengers_count": ticket["passengers_count"],
        "carriage_number": ticket["carriage_number"],
        "seat_number": ticket["seat_number"],
        "boarding_station": ticket["boarding_station"],
        "destination_station": ticket["destination_station"],
        "qr_code_data": ticket["qr_code_data"],
        "issued_at": ticket["issued_at"],
        "status": ticket["status"]
    }

    if _SUPABASE_CLIENT:
        try:
            _SUPABASE_CLIENT.table("user_tickets").insert(ticket_payload).execute()
        except Exception as e:
            print("Supabase ticket insert warning:", e)

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO user_tickets (
                ticket_id, user_id, passenger_name, train_id, train_name,
                cabin_type, travel_date, passengers_count, carriage_number,
                seat_number, boarding_station, destination_station, qr_code_data, issued_at, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            ticket_payload["ticket_id"],
            ticket_payload["user_id"],
            ticket_payload["passenger_name"],
            ticket_payload["train_id"],
            ticket_payload["train_name"],
            ticket_payload["cabin_type"],
            ticket_payload["travel_date"],
            ticket_payload["passengers_count"],
            ticket_payload["carriage_number"],
            ticket_payload["seat_number"],
            ticket_payload["boarding_station"],
            ticket_payload["destination_station"],
            ticket_payload["qr_code_data"],
            ticket_payload["issued_at"],
            ticket_payload["status"]
        ))
        conn.commit()

def get_user_tickets(user_id: str) -> List[Dict]:
    if _SUPABASE_CLIENT:
        try:
            res = _SUPABASE_CLIENT.table("user_tickets").select("*").eq("user_id", user_id).order("issued_at", desc=True).execute()
            if res.data:
                tickets = []
                for row in res.data:
                    t = dict(row)
                    t["passenger_name"] = decrypt_pii(t["passenger_name"])
                    tickets.append(t)
                return tickets
        except Exception as e:
            print("Supabase ticket query warning:", e)

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
    clean_email = email.strip().lower()
    code = f"{secrets.randbelow(900000) + 100000}"
    expires_at = int(time.time()) + 900

    if _SUPABASE_CLIENT:
        try:
            _SUPABASE_CLIENT.table("password_resets").upsert({
                "email": clean_email,
                "reset_code": code,
                "expires_at": expires_at
            }).execute()
        except Exception as e:
            print("Supabase reset code upsert warning:", e)

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
    clean_email = email.strip().lower()
    now = int(time.time())

    if _SUPABASE_CLIENT:
        try:
            res = _SUPABASE_CLIENT.table("password_resets").select("reset_code, expires_at").eq("email", clean_email).execute()
            if res.data and len(res.data) > 0:
                r = res.data[0]
                if r["reset_code"] == code.strip() and r["expires_at"] > now:
                    return True
        except Exception:
            pass

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT reset_code, expires_at FROM password_resets WHERE email = ?", (clean_email,))
        row = cursor.fetchone()
        if row and row["reset_code"] == code.strip() and row["expires_at"] > now:
            return True
    return False

def reset_user_password(email: str, new_password_hash: str) -> bool:
    clean_email = email.strip().lower()

    if _SUPABASE_CLIENT:
        try:
            _SUPABASE_CLIENT.table("users").update({"password_hash": new_password_hash}).eq("email", clean_email).execute()
            _SUPABASE_CLIENT.table("password_resets").delete().eq("email", clean_email).execute()
        except Exception as e:
            print("Supabase password reset warning:", e)

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET password_hash = ? WHERE LOWER(email) = ?", (new_password_hash, clean_email))
        cursor.execute("DELETE FROM password_resets WHERE email = ?", (clean_email,))
        conn.commit()
        return cursor.rowcount > 0

# --- User Journals / Voice Notes Persistence ---

def save_user_journal(user_id: str, journal: dict) -> dict:
    clean_id = journal.get("id") or f"voice-{int(time.time() * 1000)}"
    entry_payload = {
        "id": clean_id,
        "user_id": user_id,
        "train_id": journal.get("trainId") or journal.get("train_id") or "blue-train",
        "train_name": journal.get("trainName") or journal.get("train_name") or "The Blue Train",
        "stop_name": journal.get("stop") or journal.get("stop_name") or "Pretoria Hub",
        "category": journal.get("category") or "Route Reflection",
        "date_str": journal.get("date") or journal.get("date_str") or datetime.now().strftime("%d %b %Y, %H:%M"),
        "timestamp": int(journal.get("timestamp") or (time.time() * 1000)),
        "text": (journal.get("text") or "").strip(),
        "created_at": datetime.now().isoformat()
    }

    if _SUPABASE_CLIENT:
        try:
            _SUPABASE_CLIENT.table("user_journals").upsert(entry_payload).execute()
        except Exception as e:
            print("Supabase journal insert warning:", e)

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO user_journals (
                id, user_id, train_id, train_name, stop_name,
                category, date_str, timestamp, text, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                train_id = excluded.train_id,
                train_name = excluded.train_name,
                stop_name = excluded.stop_name,
                category = excluded.category,
                date_str = excluded.date_str,
                timestamp = excluded.timestamp,
                text = excluded.text
        """, (
            entry_payload["id"],
            entry_payload["user_id"],
            entry_payload["train_id"],
            entry_payload["train_name"],
            entry_payload["stop_name"],
            entry_payload["category"],
            entry_payload["date_str"],
            entry_payload["timestamp"],
            entry_payload["text"],
            entry_payload["created_at"]
        ))
        conn.commit()

    return {
        "id": entry_payload["id"],
        "trainId": entry_payload["train_id"],
        "trainName": entry_payload["train_name"],
        "stop": entry_payload["stop_name"],
        "category": entry_payload["category"],
        "date": entry_payload["date_str"],
        "timestamp": entry_payload["timestamp"],
        "text": entry_payload["text"]
    }

def get_user_journals(user_id: str) -> List[Dict]:
    if _SUPABASE_CLIENT:
        try:
            res = _SUPABASE_CLIENT.table("user_journals").select("*").eq("user_id", user_id).order("timestamp", desc=True).execute()
            if res.data:
                return [{
                    "id": r["id"],
                    "trainId": r["train_id"],
                    "trainName": r["train_name"],
                    "stop": r["stop_name"],
                    "category": r["category"],
                    "date": r["date_str"],
                    "timestamp": r["timestamp"],
                    "text": r["text"]
                } for r in res.data]
        except Exception as e:
            print("Supabase journal query warning:", e)

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user_journals WHERE user_id = ? ORDER BY timestamp DESC", (user_id,))
        rows = cursor.fetchall()
        return [{
            "id": r["id"],
            "trainId": r["train_id"],
            "trainName": r["train_name"],
            "stop": r["stop_name"],
            "category": r["category"],
            "date": r["date_str"],
            "timestamp": r["timestamp"],
            "text": r["text"]
        } for r in rows]

def delete_user_journal(user_id: str, journal_id: str) -> bool:
    if _SUPABASE_CLIENT:
        try:
            _SUPABASE_CLIENT.table("user_journals").delete().eq("user_id", user_id).eq("id", journal_id).execute()
        except Exception as e:
            print("Supabase journal delete warning:", e)

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM user_journals WHERE user_id = ? AND id = ?", (user_id, journal_id))
        conn.commit()
        return cursor.rowcount > 0

def sync_user_journals(user_id: str, client_entries: List[Dict]) -> List[Dict]:
    """Sync client-side local storage entries with persistent server entries, preserving both."""
    if isinstance(client_entries, list):
        for entry in client_entries:
            if isinstance(entry, dict) and entry.get("text") and not str(entry.get("id", "")).startswith("voice-sample-"):
                save_user_journal(user_id, entry)
    return get_user_journals(user_id)

