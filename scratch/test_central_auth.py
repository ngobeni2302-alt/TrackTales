import requests
import sys

BASE_URL = "http://127.0.0.1:8000"

def test_central_auth():
    print("--- 1. Testing Central User Registration ---")
    reg_payload = {
        "email": "device1_user@tracktales.co.za",
        "username": "device1_user",
        "password": "SecurePassword2026",
        "full_name": "Device 1 Test User"
    }
    
    # Try register
    resp = requests.post(f"{BASE_URL}/api/auth/register", json=reg_payload)
    if resp.status_code == 400 and "already exists" in resp.text:
        print("User already registered, proceeding to login test...")
    else:
        assert resp.status_code == 200, f"Register failed: {resp.text}"
        data = resp.json()
        assert data["status"] == "success"
        assert "access_token" in data
        print("[OK] Registration successful! Access Token received.")

    print("\n--- 2. Testing Central Login (Device 2 Simulating Cross-Device Login) ---")
    login_payload = {
        "login": "device1_user@tracktales.co.za",
        "password": "SecurePassword2026"
    }
    resp = requests.post(f"{BASE_URL}/api/auth/login", json=login_payload)
    assert resp.status_code == 200, f"Login failed: {resp.text}"
    login_data = resp.json()
    token = login_data["access_token"]
    user_info = login_data["user"]
    print(f"[OK] Cross-device Login successful! Logged in as: {user_info['full_name']} ({user_info['email']})")

    print("\n--- 3. Testing Token Verification (/api/auth/me) ---")
    headers = {"Authorization": f"Bearer {token}"}
    me_resp = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
    assert me_resp.status_code == 200, f"Me endpoint failed: {me_resp.text}"
    me_data = me_resp.json()
    print(f"[OK] Profile fetched from central SQLite DB: ID={me_data['user']['id']}, Username={me_data['user']['username']}")

    print("\n--- 4. Testing Ticket Creation linked to Central User Account ---")
    ticket_payload = {
        "passenger_name": "Device 1 Test User",
        "train_id": "blue-train",
        "cabin_type": "Luxury Suite",
        "travel_date": "2026-10-15",
        "passengers_count": 1
    }
    ticket_resp = requests.post(f"{BASE_URL}/api/ticket", json=ticket_payload, headers=headers)
    assert ticket_resp.status_code == 200, f"Ticket generation failed: {ticket_resp.text}"
    ticket = ticket_resp.json()["ticket"]
    print(f"[OK] Ticket generated & saved centrally: Ticket ID={ticket['ticket_id']}, Seat={ticket['seat_number']}")

    print("\n--- 5. Testing Retrieving User Tickets on Another Device ---")
    my_tickets_resp = requests.get(f"{BASE_URL}/api/auth/my-tickets", headers=headers)
    assert my_tickets_resp.status_code == 200
    my_tickets = my_tickets_resp.json()
    print(f"[OK] Synced Tickets count in central database: {my_tickets['count']}")
    for t in my_tickets["data"]:
        print(f"   -> Ticket {t['ticket_id']} | Train: {t['train_name']} | Date: {t['travel_date']}")

    print("\n--- ALL CENTRAL DATABASE AUTHENTICATION & CROSS-DEVICE TESTS PASSED! ---")

if __name__ == "__main__":
    test_central_auth()
