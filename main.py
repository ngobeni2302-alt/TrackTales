import os
import uuid
from datetime import datetime
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Query, Header, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel

import database
from database import (
    init_db, create_user, get_user_by_email, get_user_by_username,
    get_user_by_id, verify_password, hash_password, update_last_login,
    save_user_ticket, get_user_tickets, is_account_locked, record_login_attempt,
    create_password_reset_code, verify_reset_code, reset_user_password
)
import auth
from auth import create_access_token, get_current_user_optional, require_current_user

from fastapi.middleware.cors import CORSMiddleware

# Initialize database on module load
init_db()

app = FastAPI(
    title="TrackTales API - South African Railway Stories & Journeys",
    description="Explore South Africa's 2 flagship luxury rail lines: The Blue Train and Rovos Rail from Pretoria to Cape Town.",
    version="1.0.0"
)

# Enable CORS for cross-origin and file:// access with credentials support
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Security HTTP Headers Middleware ---
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response

def validate_password_strength(password: str):
    if len(password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters long.")
    if not any(c.isalpha() for c in password) or not any(c.isdigit() for c in password):
        raise HTTPException(status_code=400, detail="Password must contain both letters and numbers for security.")

# --- Data Models ---
class TicketRequest(BaseModel):
    passenger_name: str
    train_id: str
    cabin_type: str
    travel_date: str
    passengers_count: int = 1
    special_requests: Optional[str] = "gh"

class RegisterRequest(BaseModel):
    email: str
    username: str
    password: str
    full_name: str

class LoginRequest(BaseModel):
    login: str
    password: str

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    email: str
    reset_code: str
    new_password: str

class JournalEntryRequest(BaseModel):
    id: Optional[str] = None
    train_id: Optional[str] = None
    trainId: Optional[str] = None
    train_name: Optional[str] = None
    trainName: Optional[str] = None
    stop: Optional[str] = None
    stop_name: Optional[str] = None
    category: Optional[str] = None
    date: Optional[str] = None
    date_str: Optional[str] = None
    timestamp: Optional[int] = None
    text: str

class JournalSyncRequest(BaseModel):
    entries: List[dict]



# --- In-Memory Railway Data ---

TRAINS_DATA = [
    {
        "id": "blue-train",
        "name": "The Blue Train",
        "tagline": "A Window to the Soul of South Africa",
        "category": "Ultra Luxury Express",
        "speed": "90 km/h (Smooth Luxury Travel)",
        "duration": "31 Hours (1,600 km)",
        "frequency": "Weekly Departures",
        "route_summary": "Southbound: Pretoria (Irene/Park) -> Kimberley -> Cape Town",
        "primary_color": "#005691",
        "secondary_color": "#d4af37",
        "description": "The Blue Train has been synonymous with luxury rail travel since 1946. On the southbound journey from Pretoria to Cape Town, passengers disembark for a scheduled main off-train excursion in Kimberley, featuring a guided tour of the famous Big Hole and the Open Diamond Mine Museum. (Note: On northbound trips from Cape Town to Pretoria, the train stops at the historic town of Matjiesfontein).",
        "highlights": [
            "Kimberley Big Hole & Diamond Mine Museum Guided Tour",
            "24/7 Dedicated Personal Butler Service",
            "En-suite marble bathrooms with full-sized bathtubs",
            "Gourmet 5-course dining with silver service & local wine pairing",
            "Cigar & Cognac Observation Lounge Car"
        ],
        "scenery_highlights": [
            {
                "title": "The Great Karoo Sunset & Desert Horizons",
                "vantage": "Observation Car Panoramic Lounge",
                "time_window": "Late Afternoon to Golden Hour",
                "icon": "sun",
                "desc": "Experience the infinite flat-topped kopjes and acacia silhouettes of the Karoo bathed in glowing crimson and gold through floor-to-ceiling panoramic glass.",
                "tips": "Arrive at the Observation Car 30 minutes before twilight for prime armchair seating."
            },
            {
                "title": "Hex River Mountain Pass & Railway Tunnels",
                "vantage": "Club Car & Lounge Windows",
                "time_window": "Morning Descent into Western Cape",
                "icon": "mountain",
                "desc": "Marvel as the train snakes through towering sandstone ranges and the 13.5 km tunnel system into emerald vineyard valleys.",
                "tips": "Sit on the right side of the lounge car for sheer mountain ravine views."
            },
            {
                "title": "Kamfers Dam Flamingo Salt Pans",
                "vantage": "Panoramic Windows & Dining Car",
                "time_window": "Approaching Kimberley Rail Junction",
                "icon": "compass",
                "desc": "Witness tens of thousands of lesser flamingos tinting the salt pan waters in pastel pink right along the rail tracks.",
                "tips": "Have your camera ready as flocks take flight in waves alongside the train."
            },
            {
                "title": "Highveld Open Goldfields & Grasslands",
                "vantage": "Panoramic Lounge & Club Car",
                "time_window": "Pretoria & Gauteng Departure",
                "icon": "layers",
                "desc": "Watch the rolling high-altitude savannah and historic mine dumps transition into the wide-open expanse of the central plateau.",
                "tips": "Best enjoyed with morning espresso as the train reaches cruising speed."
            }
        ],
        "image_url": "/images/blue-train.jpg",
        "video_url": "/videos/blue-train-showcase.mp4"
    },
    {
        "id": "rovos-rail",
        "name": "Rovos Rail",
        "tagline": "The Most Luxurious Train in the World",
        "category": "Vintage Edwardian Luxury",
        "speed": "60 km/h (Nostalgic Slow Travel)",
        "duration": "3 Days / 48 Hours (1,600 km)",
        "frequency": "Bi-Weekly Departures",
        "route_summary": "Capital Park (Pretoria) -> Highveld -> Kimberley -> Great Karoo -> Hex River -> Cape Town",
        "primary_color": "#0e382c",
        "secondary_color": "#c5a059",
        "description": "Established in 1989 by Rohan Vos, Rovos Rail covers approximately 1,600 kilometers over 3 days from Pretoria (Capital Park) to Cape Town. It features two main off-train excursion stops: Kimberley (to view the Big Hole and Diamond Mine Museum) and the perfectly preserved 19th-century Victorian railway village of Matjiesfontein. The route traverses the gold-rich Highveld grasslands, the vast semi-desert of The Great Karoo, and the dramatic mountain passes and tunnels of the Hex River Valley.",
        "highlights": [
            "Kimberley Stop: Big Hole & Underground/Surface Diamond Mine Museum",
            "Matjiesfontein Stop: Preserved 19th-century Victorian Railway Village & Museum",
            "Open-air balcony on the rear Observation Car for photography",
            "Scenic Passing Points: Highveld Plateau, Great Karoo & Hex River Valley Tunnels",
            "Formal dress code evening dinners (suit & tie / evening gown)"
        ],
        "scenery_highlights": [
            {
                "title": "Open-Air Balcony Sunset & Stargazing",
                "vantage": "Rear Open Observation Balcony",
                "time_window": "Twilight to Deep Desert Night",
                "icon": "sparkles",
                "desc": "Step onto the open teak balcony at the very rear of the train. Feel the crisp Karoo air and watch the tracks vanish under a starry Milky Way.",
                "tips": "The open balcony offers 100% glare-free photography and an immersive soundscape."
            },
            {
                "title": "Hex River Mountain Viaducts & 4 Tunnels",
                "vantage": "Observation Car & Teak Balcony",
                "time_window": "Day 3 Morning Winelands Descent",
                "icon": "mountain",
                "desc": "The vintage train negotiates the steep 1-in-40 gradient through 4 historic mountain tunnels with views over Cape Dutch homesteads.",
                "tips": "The rear balcony provides stunning views of the curved train winding across stone viaducts."
            },
            {
                "title": "Matjiesfontein Victorian Desert Village",
                "vantage": "Observation Lounge & Open Balcony",
                "time_window": "Afternoon Arrival in Little Karoo",
                "icon": "compass",
                "desc": "Glide into the preserved 19th-century railway village of Matjiesfontein, framed by the rugged Witteberge peaks and cast-iron lamps.",
                "tips": "Listen for the traditional bugle call summoning passengers to the platform."
            },
            {
                "title": "Vaal River Crossing & Maize Triangle",
                "vantage": "1920s Dining Car & Suites",
                "time_window": "Day 1 Afternoon Highveld Transit",
                "icon": "wind",
                "desc": "Cross the Vaal River border into the Free State plains, watching springbok and native birdlife scatter across the grasslands.",
                "tips": "Keep watch from the wood-framed picture windows during afternoon high tea."
            }
        ],
        "image_url": "/images/rovos-rail.jpg",
        "video_url": "/videos/rovos-rail-showcase.mp4"
    }
]

ROUTE_STOPS = [
    {
        "id": "pretoria",
        "stop_number": 1,
        "name": "Pretoria (Capital Park & Park Station)",
        "province": "Gauteng",
        "distance_km": 0,
        "coordinates": {"lat": -25.7479, "lng": 28.1878},
        "description": "The Jacaranda City and northern terminus of the Pretoria to Cape Town rail corridor. Home to historic Victorian rail yards and grand sandstone architecture.",
        "train_calls": ["The Blue Train", "Rovos Rail"],
        "recommended_stay": "Departure Hub / 1-2 Days",
        "local_dish": "Gauteng Style Braai & Chakalaka paired with Craft Lager"
    },
    {
        "id": "kimberley",
        "stop_number": 2,
        "name": "Kimberley (The Diamond City)",
        "province": "Northern Cape",
        "distance_km": 645,
        "coordinates": {"lat": -28.7282, "lng": 24.7499},
        "description": "Famous worldwide for the 1870s Diamond Rush. Home to 'The Big Hole', the largest hand-dug excavation on earth, and vintage tramways.",
        "train_calls": ["The Blue Train", "Rovos Rail"],
        "recommended_stay": "Stopover Tour (3-4 Hours)",
        "local_dish": "Northern Cape Biltong & Kalahari Truffle Tart"
    },
    {
        "id": "cape-town",
        "stop_number": 3,
        "name": "Cape Town (The Mother City)",
        "province": "Western Cape",
        "distance_km": 1600,
        "coordinates": {"lat": -33.9249, "lng": 18.4241},
        "description": "The spectacular coastal terminus. Framed by Table Mountain, Atlantic oceans, colorful heritage quarters, and world-class culinary scenes.",
        "train_calls": ["The Blue Train", "Rovos Rail"],
        "recommended_stay": "Final Destination / 3-5 Days",
        "local_dish": "Traditional Cape Malay Bobotie & Snoek Braai with Chenin Blanc"
    }
]

ATTRACTIONS_DATA = [
    {
        "id": "union-buildings",
        "stop_id": "pretoria",
        "city": "Pretoria",
        "title": "Union Buildings & Nelson Mandela Statue",
        "category": "History & Heritage",
        "rating": 4.9,
        "description": "The official seat of the South African government, surrounded by terraced gardens and featuring a massive 9-metre bronze statue of Nelson Mandela.",
        "image_url": "https://images.unsplash.com/photo-1577971132997-c10be9372519?auto=format&fit=crop&w=600&q=80",
        "highlights": "Terraced Gardens, City Views, Architecture"
    },
    {
        "id": "freedom-park",
        "stop_id": "pretoria",
        "city": "Pretoria",
        "title": "Freedom Park Heritage Site",
        "category": "Culture & Memory",
        "rating": 4.8,
        "description": "A memorial precinct on Salvokop hill overlooking Pretoria, honoring those who fought for freedom, human rights, and democracy.",
        "image_url": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=600&q=80",
        "highlights": "Wall of Names, Sanctuary, Eternal Flame"
    },
    {
        "id": "big-hole-kimberley",
        "stop_id": "kimberley",
        "city": "Kimberley",
        "title": "The Big Hole & Open Mine Museum",
        "category": "World Heritage Landmark",
        "rating": 4.9,
        "description": "The world's largest hand-dug crater, excavated by 50,000 miners with picks and shovels. Includes an underground mine experience and real diamond vault.",
        "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        "highlights": "215-metre deep crater, Original De Beers Vault, Vintage Tramway"
    },
    {
        "id": "kimberley-transport-museum",
        "stop_id": "kimberley",
        "city": "Kimberley",
        "title": "Kimberley Railway & Transport Museum",
        "category": "Rail History",
        "rating": 4.6,
        "description": "Located right inside Kimberley Station, showcasing steam locomotives, historic dining cars, telegraph equipment, and railway nostalgia.",
        "image_url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80",
        "highlights": "Restored Steam Engines, Royal Carriage relics, Ticket Machines"
    },
    {
        "id": "table-mountain",
        "stop_id": "cape-town",
        "city": "Cape Town",
        "title": "Table Mountain Aerial Cableway",
        "category": "Natural Wonder",
        "rating": 5.0,
        "description": "One of the New 7 Wonders of Nature. Ascend to the flat-topped mountain peak in a 360-degree rotating cable car for breathtaking ocean and city panoramas.",
        "image_url": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80",
        "highlights": "360° Cable Car Ride, Table Mountain Summit Trails, Sunset Spot"
    },
    {
        "id": "v-and-a-waterfront",
        "stop_id": "cape-town",
        "city": "Cape Town",
        "title": "V&A Waterfront & Zeitz MOCAA",
        "category": "Culture, Shopping & Dining",
        "rating": 4.9,
        "description": "A bustling historic harbor offering world-class dining, seal viewing, street musicians, craft markets, and the Zeitz Museum of Contemporary Art Africa.",
        "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        "highlights": "Robben Island Ferry Departure, Two Oceans Aquarium, Zeitz MOCAA"
    }
]

STORIES_DATA = [
    {
        "id": "story-1",
        "title": "The Golden Track: How Diamonds & Gold Built South Africa's Railway",
        "author": "Rail History Heritage Trust",
        "read_time": "4 min read",
        "summary": "In the 1870s, the discovery of diamonds in Kimberley sparked an urgent engineering race to lay tracks across the formidable Karoo desert, connecting coastal ports to the inland treasure trove.",
        "content": "Before the steam locomotives chugged into Kimberley in 1885, traveling from Cape Town to the diamond fields required a grueling multi-week journey by ox-wagon across scorched Karoo scrubland. The arrival of the iron horse transformed South Africa overnight. Engineering feats like the Hex River Railway Pass, carved manually through solid rock and cliffside ledges, allowed heavy machinery to reach the mines and birthed South Africa's modern industrial network."
    },
    {
        "id": "story-2",
        "title": "The Blue Train Legacy: 75+ Years of Presidential Romance",
        "author": "TrackTales Archives",
        "read_time": "3 min read",
        "summary": "Originally dubbed the 'Union Limited' in 1923, the train acquired its iconic royal blue coat during World War II and grew into a world symbol of luxurious hospitality.",
        "content": "Kings, queens, statesmen, and cultural icons have stepped onto the deep pile carpets of The Blue Train. From Nelson Mandela hosting foreign dignitaries to Hollywood legends watching the sunset over the Karoo, the train is more than transport, it is a floating sanctuary where butler service, fine porcelain, and slow travel create lifelong memories."
    },
    {
        "id": "story-3",
        "title": "Rohan Vos & The Legend of Rovos Rail",
        "author": "African Rail Gazette",
        "read_time": "5 min read",
        "summary": "How one man's passion for restoring vintage steam engines led to the creation of the world's most opulent train safari company.",
        "content": "In 1989, Rohan Vos bought a handful of vintage carriage shells with the dream of taking family trips behind a steam engine. That passion project blossomed into Rovos Rail. Today, skilled artisans at Capital Park station in Pretoria meticulously hand-restore 1920s Edwardian timber interiors, brass lamps, and teak paneling, keeping the Golden Age of rail travel vibrant in the 21st century."
    }
]

# --- REST API Endpoints ---

@app.get("/api/trains", summary="Get all trains details")
def get_trains():
    return {"status": "success", "count": len(TRAINS_DATA), "data": TRAINS_DATA}

@app.get("/api/trains/{train_id}", summary="Get specific train details")
def get_train_by_id(train_id: str):
    train = next((t for t in TRAINS_DATA if t["id"] == train_id), None)
    if not train:
        raise HTTPException(status_code=404, detail="Train not found")
    return {"status": "success", "data": train}

@app.get("/api/routes", summary="Get Pretoria to Cape Town route stops")
def get_route_stops():
    return {"status": "success", "total_distance_km": 1600, "count": len(ROUTE_STOPS), "data": ROUTE_STOPS}

@app.get("/api/attractions", summary="Get attractions along the train stops")
def get_attractions(stop_id: Optional[str] = Query(None, description="Filter by stop ID e.g. pretoria, kimberley, cape-town")):
    if stop_id:
        filtered = [a for a in ATTRACTIONS_DATA if a["stop_id"] == stop_id]
        return {"status": "success", "filter_stop": stop_id, "count": len(filtered), "data": filtered}
    return {"status": "success", "count": len(ATTRACTIONS_DATA), "data": ATTRACTIONS_DATA}

@app.get("/api/stories", summary="Get South African rail folklore and heritage stories")
def get_stories():
    return {"status": "success", "count": len(STORIES_DATA), "data": STORIES_DATA}

@app.post("/api/ticket", summary="Generate a custom souvenir train ticket & boarding pass")
def create_ticket(ticket_req: TicketRequest, authorization: Optional[str] = Header(None)):
    train = next((t for t in TRAINS_DATA if t["id"] == ticket_req.train_id), None)
    if not train:
        raise HTTPException(status_code=400, detail="Invalid train ID selected")
    
    ticket_id = f"TT-{uuid.uuid4().hex[:8].upper()}"
    carriage = f"CAR-{ord(ticket_req.cabin_type[0]) % 5 + 1}"
    seat_no = f"{((len(ticket_req.passenger_name) * 7) % 24) + 1}A"
    
    ticket_pass = {
        "ticket_id": ticket_id,
        "passenger_name": ticket_req.passenger_name.title(),
        "train_name": train["name"],
        "train_id": train["id"],
        "route": "Pretoria -> Cape Town (1,600 km)",
        "cabin_type": ticket_req.cabin_type,
        "travel_date": ticket_req.travel_date,
        "passengers_count": ticket_req.passengers_count,
        "carriage_number": carriage,
        "seat_number": seat_no,
        "boarding_station": "Pretoria Station (Gauteng)",
        "destination_station": "Cape Town Station (Western Cape)",
        "qr_code_data": f"TRACKTALES:{ticket_id}:{train['id']}:{ticket_req.passenger_name}",
        "issued_at": datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC"),
        "status": "CONFIRMED & READY FOR BOARDING"
    }

    current_user = get_current_user_optional(authorization)
    user_id = current_user["sub"] if current_user else "GUEST"
    save_user_ticket(ticket_pass, user_id=user_id)

    return {"status": "success", "ticket": ticket_pass}

# --- Central Database Authentication Endpoints ---

@app.post("/api/auth/register", summary="Register a new central user account")
def register(req: RegisterRequest):
    email = req.email.strip().lower()
    username = req.username.strip()
    
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Please enter a valid email address.")
    if not username or len(username) < 3:
        raise HTTPException(status_code=400, detail="Username must be at least 3 characters.")
    if not req.full_name.strip():
        raise HTTPException(status_code=400, detail="Please enter your full name.")
        
    validate_password_strength(req.password)
        
    if get_user_by_email(email):
        raise HTTPException(status_code=400, detail="An account with this email address already exists.")
    if get_user_by_username(username):
        raise HTTPException(status_code=400, detail="This username is already taken.")
        
    user_id = f"usr_{uuid.uuid4().hex[:12]}"
    pwd_hash = hash_password(req.password)
    user_data = create_user(user_id, email, username, pwd_hash, req.full_name)
    
    token = create_access_token(user_id, email, username)
    response = JSONResponse(content={
        "status": "success",
        "message": "Account created successfully with AES-256 encrypted profile security!",
        "access_token": token,
        "token_type": "bearer",
        "user": user_data
    })
    response.set_cookie(
        key="access_token",
        value=f"Bearer {token}",
        httponly=True,
        samesite="strict",
        max_age=86400 * 30
    )
    return response

@app.post("/api/auth/login", summary="Log in to existing central user account")
def login(req: LoginRequest):
    login_str = req.login.strip()
    if not login_str or not req.password:
        raise HTTPException(status_code=400, detail="Please enter your email/username and password.")
        
    # Anti-Brute-Force Lockout Check
    locked, remaining = is_account_locked(login_str)
    if locked:
        raise HTTPException(
            status_code=429,
            detail=f"Account temporarily locked due to multiple failed login attempts. Please try again in {remaining // 60 + 1} minute(s)."
        )

    user = get_user_by_email(login_str) or get_user_by_username(login_str)
    if not user or not verify_password(req.password, user["password_hash"]):
        record_login_attempt(login_str, False)
        raise HTTPException(status_code=401, detail="Invalid email/username or password.")
        
    record_login_attempt(login_str, True)
    update_last_login(user["id"])
    token = create_access_token(user["id"], user["email"], user["username"])
    
    response = JSONResponse(content={
        "status": "success",
        "message": "Logged in successfully!",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "email": user["email"],
            "username": user["username"],
            "full_name": user["full_name"],
            "created_at": user["created_at"]
        }
    })
    response.set_cookie(
        key="access_token",
        value=f"Bearer {token}",
        httponly=True,
        samesite="strict",
        max_age=86400 * 30
    )
    return response

@app.get("/api/auth/me", summary="Get logged-in user profile from central database")
def get_me(current_user: dict = Depends(require_current_user)):
    user = get_user_by_id(current_user["sub"])
    if not user:
        raise HTTPException(status_code=404, detail="User account not found.")
    return {"status": "success", "user": user}

@app.get("/api/auth/my-tickets", summary="Get tickets saved in central database for logged-in user")
def get_my_tickets(current_user: dict = Depends(require_current_user)):
    tickets = get_user_tickets(current_user["sub"])
    return {"status": "success", "count": len(tickets), "data": tickets}

@app.post("/api/auth/forgot-password", summary="Request password reset verification code")
def forgot_password(req: ForgotPasswordRequest):
    email = req.email.strip().lower()
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Please enter a valid email address.")
        
    user = get_user_by_email(email)
    if not user:
        return {
            "status": "success",
            "message": "If your email is registered in our system, a 6-digit security reset code has been issued."
        }
        
    code = create_password_reset_code(email)
    return {
        "status": "success",
        "message": f"Security reset code generated for {email}.",
        "reset_code": code
    }

@app.post("/api/auth/reset-password", summary="Reset password using 6-digit verification code")
def reset_password(req: ResetPasswordRequest):
    email = req.email.strip().lower()
    code = req.reset_code.strip()
    
    if not email or not code or not req.new_password:
        raise HTTPException(status_code=400, detail="Please provide your email, reset code, and new password.")
        
    validate_password_strength(req.new_password)
    
    if not verify_reset_code(email, code):
        raise HTTPException(status_code=400, detail="Invalid or expired reset code. Please request a new code.")
        
    new_hash = hash_password(req.new_password)
    success = reset_user_password(email, new_hash)
    if not success:
        raise HTTPException(status_code=404, detail="User account not found.")
        
    return {
        "status": "success",
        "message": "Password updated successfully in central database! You can now log in with your new password."
    }

# --- Multi-Year Permanent Journal / Voice Notes Endpoints ---

@app.get("/api/journals", summary="Get user's permanent journal entries from central database")
def get_user_journal_entries(current_user: dict = Depends(require_current_user)):
    entries = database.get_user_journals(current_user["sub"])
    return {
        "status": "success",
        "count": len(entries),
        "data": entries
    }

@app.post("/api/journals", summary="Save or update a permanent journal entry in database")
def save_user_journal_entry(req: JournalEntryRequest, current_user: dict = Depends(require_current_user)):
    payload = req.model_dump() if hasattr(req, "model_dump") else req.dict()
    saved = database.save_user_journal(current_user["sub"], payload)
    return {
        "status": "success",
        "message": "Journal memory saved permanently to your account cloud storage!",
        "data": saved
    }

@app.post("/api/journals/sync", summary="Two-way sync journal entries between browser storage and permanent database")
def sync_user_journal_entries(req: JournalSyncRequest, current_user: dict = Depends(require_current_user)):
    merged = database.sync_user_journals(current_user["sub"], req.entries)
    return {
        "status": "success",
        "message": "Journal entries synchronized with cloud account.",
        "count": len(merged),
        "data": merged
    }

@app.delete("/api/journals/{journal_id}", summary="Delete a journal entry from permanent database")
def delete_user_journal_entry(journal_id: str, current_user: dict = Depends(require_current_user)):
    deleted = database.delete_user_journal(current_user["sub"], journal_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Journal entry not found or already deleted.")
    return {
        "status": "success",
        "message": "Journal entry deleted from account."
    }

    
class TranslateRequest(BaseModel):
    texts: List[str]
    target_lang: str

@app.get("/api/translations", summary="Get cached master translation dictionary")
def get_translations():
    cache_path = os.path.join(os.path.dirname(__file__), "scratch", "translations_cache.json")
    if os.path.exists(cache_path):
        import json
        with open(cache_path, "r", encoding="utf-8") as f:
            return JSONResponse(json.load(f))
    return JSONResponse({})

@app.post("/api/translate", summary="Translate dynamic strings on the fly with persistent caching")
def translate_texts(req: TranslateRequest):
    import json, urllib.request, urllib.parse
    cache_path = os.path.join(os.path.dirname(__file__), "scratch", "translations_cache.json")
    cache = {}
    if os.path.exists(cache_path):
        try:
            with open(cache_path, "r", encoding="utf-8") as f:
                cache = json.load(f)
        except Exception:
            cache = {}

    target = req.target_lang
    if target not in cache:
        cache[target] = {}

    results = {}
    needed = []
    for t in req.texts:
        clean = t.strip()
        if not clean:
            continue
        if clean in cache[target]:
            results[clean] = cache[target][clean]
        else:
            needed.append(clean)

    if needed:
        chunk_size = 20
        api_lang = "zh-CN" if target == "zh" else target
        for i in range(0, len(needed), chunk_size):
            chunk = needed[i:i+chunk_size]
            combined = "\n###\n".join(chunk)
            url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" + api_lang + "&dt=t&q=" + urllib.parse.quote(combined)
            try:
                rq = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(rq, timeout=6) as resp:
                    data = json.loads(resp.read().decode("utf-8"))
                    full_res = "".join(part[0] for part in data[0] if part[0])
                    parts = [p.strip() for p in full_res.split("###")]
                    for orig, trans in zip(chunk, parts):
                        cache[target][orig] = trans
                        results[orig] = trans
            except Exception:
                for orig in chunk:
                    results[orig] = orig

        try:
            os.makedirs(os.path.dirname(cache_path), exist_ok=True)
            with open(cache_path, "w", encoding="utf-8") as f:
                json.dump(cache, f, ensure_ascii=False, indent=2)
        except Exception:
            pass

    return {"status": "success", "target_lang": target, "translations": results}

# --- Mount Static Frontend Files ---
static_dir = os.path.join(os.path.dirname(__file__), "public")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")
    css_dir = os.path.join(static_dir, "css")
    js_dir = os.path.join(static_dir, "js")
    videos_dir = os.path.join(static_dir, "videos")
    images_dir = os.path.join(static_dir, "images")
    if os.path.exists(css_dir):
        app.mount("/css", StaticFiles(directory=css_dir), name="css")
    if os.path.exists(js_dir):
        app.mount("/js", StaticFiles(directory=js_dir), name="js")
    if os.path.exists(videos_dir):
        app.mount("/videos", StaticFiles(directory=videos_dir), name="videos")
    if os.path.exists(images_dir):
        app.mount("/images", StaticFiles(directory=images_dir), name="images")

@app.get("/")
def read_root():
    index_file = os.path.join(static_dir, "index.html")
    if os.path.exists(index_file):
        return FileResponse(
            index_file,
            headers={
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0"
            }
        )
    return JSONResponse({"message": "TrackTales API active. Open /public/index.html or run via uvicorn."})

@app.get("/guest")
@app.get("/guest.html")
def read_guest_portal():
    guest_file = os.path.join(static_dir, "guest.html")
    if os.path.exists(guest_file):
        return FileResponse(
            guest_file,
            headers={
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0"
            }
        )
    return JSONResponse({"message": "TrackTales Guest Portal file not found."})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

