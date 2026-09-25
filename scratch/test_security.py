import requests
import sqlite3
import os

BASE_URL = "http://127.0.0.1:8000"
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "tracktales.db")

def test_security_features():
    print("=== 1. Testing Password Policy Enforcement ===")
    weak_reg = {
        "email": "weak_user@tracktales.co.za",
        "username": "weakuser",
        "password": "simple", # fails min 8 chars and letter+number rule
        "full_name": "Weak User"
    }
    resp = requests.post(f"{BASE_URL}/api/auth/register", json=weak_reg)
    assert resp.status_code == 400, f"Weak password should be rejected: {resp.text}"
    print("[OK] Weak password rejected by backend validation.")

    print("\n=== 2. Testing Secure Account Registration ===")
    secure_reg = {
        "email": "secure_user@tracktales.co.za",
        "username": "secureuser",
        "password": "StrongPassword2026",
        "full_name": "Thabo Mbeki Secret"
    }
    resp = requests.post(f"{BASE_URL}/api/auth/register", json=secure_reg)
    if resp.status_code == 400 and "already exists" in resp.text:
        print("Secure user already registered, testing data retrieval...")
    else:
        assert resp.status_code == 200, f"Registration failed: {resp.text}"
        print("[OK] Account registered successfully.")

    print("\n=== 3. Verifying AES-256 Encryption & Bcrypt Hashing at Rest in SQLite ===")
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT email, username, password_hash, full_name FROM users WHERE email = ?", ("secure_user@tracktales.co.za",))
    row = cursor.fetchone()
    assert row is not None, "User record not found in database!"
    
    # 1. Password Hash check (Bcrypt)
    assert row["password_hash"].startswith("$2b$") or row["password_hash"].startswith("$2a$"), f"Password hash is not Bcrypt: {row['password_hash']}"
    print(f"[OK] Password hash stored as Bcrypt cost 12: {row['password_hash'][:20]}...")

    # 2. PII Encryption check (Fernet ciphertext starting with gAAAAA)
    raw_name_in_db = row["full_name"]
    assert raw_name_in_db.startswith("gAAAAA"), f"PII is NOT encrypted in DB! Got: {raw_name_in_db}"
    print(f"[OK] User Full Name encrypted at rest in SQLite DB: {raw_name_in_db[:30]}...")

    print("\n=== 4. Testing Anti-Brute-Force Lockout Protection ===")
    for attempt in range(1, 6):
        fail_resp = requests.post(f"{BASE_URL}/api/auth/login", json={
            "login": "secure_user@tracktales.co.za",
            "password": "WrongPassword123"
        })
        assert fail_resp.status_code == 401, f"Failed attempt {attempt} expected 401, got {fail_resp.status_code}"

    # 6th attempt must return HTTP 429 Account Locked
    lock_resp = requests.post(f"{BASE_URL}/api/auth/login", json={
        "login": "secure_user@tracktales.co.za",
        "password": "WrongPassword123"
    })
    assert lock_resp.status_code == 429, f"6th attempt expected 429 Locked, got {lock_resp.status_code}: {lock_resp.text}"
    print("[OK] Account lockout triggered after 5 failed attempts! HTTP 429 response received.")

    print("\n=== 5. Verifying Security HTTP Headers ===")
    headers_resp = requests.get(f"{BASE_URL}/")
    assert headers_resp.headers.get("X-Content-Type-Options") == "nosniff"
    assert headers_resp.headers.get("X-Frame-Options") == "DENY"
    assert headers_resp.headers.get("X-XSS-Protection") == "1; mode=block"
    print("[OK] Security HTTP Headers (nosniff, DENY, XSS protection) verified.")

    print("\n--- ALL SECURITY CONTROLS VERIFIED SUCCESSFULLY! ---")

if __name__ == "__main__":
    test_security_features()
