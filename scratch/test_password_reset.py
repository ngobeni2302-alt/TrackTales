import requests
import time

BASE_URL = "http://127.0.0.1:8000"

def test_password_reset_flow():
    unique_id = int(time.time())
    email = f"reset_user_{unique_id}@tracktales.co.za"
    old_password = "OldPassword2026"
    new_password = "NewPassword2026"
    
    print(f"=== 1. Register User Account ({email}) ===")
    reg_resp = requests.post(f"{BASE_URL}/api/auth/register", json={
        "email": email,
        "username": f"user{unique_id}",
        "password": old_password,
        "full_name": "Reset Test User"
    })
    assert reg_resp.status_code == 200, f"Registration failed: {reg_resp.text}"
    print("[OK] User registered successfully.")

    print("\n=== 2. Test Login with Original Password ===")
    login_resp = requests.post(f"{BASE_URL}/api/auth/login", json={
        "login": email,
        "password": old_password
    })
    assert login_resp.status_code == 200, f"Login failed: {login_resp.text}"
    print("[OK] Logged in successfully with original password.")

    print("\n=== 3. Request Password Reset Code ===")
    forgot_resp = requests.post(f"{BASE_URL}/api/auth/forgot-password", json={
        "email": email
    })
    assert forgot_resp.status_code == 200, f"Forgot password failed: {forgot_resp.text}"
    data = forgot_resp.json()
    reset_code = data["reset_code"]
    print(f"[OK] Reset code generated: {reset_code}")

    print("\n=== 4. Reset Password using Code ===")
    reset_resp = requests.post(f"{BASE_URL}/api/auth/reset-password", json={
        "email": email,
        "reset_code": reset_code,
        "new_password": new_password
    })
    assert reset_resp.status_code == 200, f"Reset password failed: {reset_resp.text}"
    print("[OK] Password updated in central database.")

    print("\n=== 5. Test Login with Old Password (Should Fail 401) ===")
    fail_login = requests.post(f"{BASE_URL}/api/auth/login", json={
        "login": email,
        "password": old_password
    })
    assert fail_login.status_code == 401, "Old password should no longer work!"
    print("[OK] Old password correctly rejected.")

    print("\n=== 6. Test Login with New Password from Any Device (Should Succeed) ===")
    new_login = requests.post(f"{BASE_URL}/api/auth/login", json={
        "login": email,
        "password": new_password
    })
    assert new_login.status_code == 200, f"New password login failed: {new_login.text}"
    print(f"[OK] Successfully logged in with NEW password: {new_login.json()['user']['full_name']}")

    print("\n--- ALL PASSWORD RESET & MULTI-DEVICE LOGIN TESTS PASSED! ---")

if __name__ == "__main__":
    test_password_reset_flow()
