import os
import uuid
from datetime import datetime
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Query
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel

app = FastAPI(
    title="TrackTales API - South African Railway Stories & Journeys",
    description="Explore South Africa's legendary rail lines: The Blue Train, Rovos Rail, and Shosholoza Meyl from Pretoria to Cape Town.",
    version="1.0.0"
)

# --- Data Models ---
class TicketRequest(BaseModel):
    passenger_name: str
    train_id: str
    cabin_type: str
    travel_date: str
    passengers_count: int = 1
    special_requests: Optional[str] = ""

# --- In-Memory Railway Data ---

TRAINS_DATA = [
    {
        "id": "blue-train",
        "name": "The Blue Train",
        "tagline": "A Window to the Soul of South Africa",
        "category": "Ultra Luxury Express",
        "speed": "90 km/h (Smooth Slow Travel)",
        "duration": "31 Hours (1,600 km)",
        "frequency": "Weekly Departures",
        "route_summary": "Pretoria -> Kimberley -> Matjiesfontein -> Cape Town",
        "primary_color": "#005691",
        "secondary_color": "#d4af37",
        "description": "The Blue Train has been synonymous with luxury rail travel since 1946. Kings, presidents, and celebrities have experienced its world-class butler service, marble-tiled suite bathrooms, fine South African wine pairings, and exquisite multi-course dining as the dramatic landscapes of Mzansi unfold outside panoramic windows.",
        "highlights": [
            "24/7 Dedicated Personal Butler Service",
            "En-suite marble bathrooms with full-sized bathtubs",
            "Gourmet 5-course dining with silver service & local wine pairing",
            "Cigar & Cognac Observation Lounge Car",
            "Excursion stop at the historic Kimberley Big Hole Diamond Mine"
        ],
        "suites": [
            {
                "name": "Luxury Suite",
                "bed_type": "Twin beds or Double bed",
                "size": "5-Star Deluxe",
                "amenities": "Full marble bath, private audio system, Wi-Fi, butler service, mini-bar"
            },
            {
                "name": "De Luxe Suite",
                "bed_type": "Twin beds or Double bed",
                "size": "Executive Comfort",
                "amenities": "Private shower or bath, writing desk, butler service, complimentary champagne"
            }
        ],
        "image_url": "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&w=1000&q=80"
    },
    {
        "id": "rovos-rail",
        "name": "Rovos Rail",
        "tagline": "The Most Luxurious Train in the World",
        "category": "Vintage Edwardian Luxury",
        "speed": "60 km/h (Nostalgic Slow Travel)",
        "duration": "48 Hours (Relaxed Safari Pace)",
        "frequency": "Bi-Weekly Departures",
        "route_summary": "Pretoria -> Highveld -> Kimberley -> Karoo (Matjiesfontein) -> Cape Town",
        "primary_color": "#0e382c",
        "secondary_color": "#c5a059",
        "description": "Established in 1989 by Rohan Vos, Rovos Rail recaptures the romance and elegance of a bygone era. Featuring restored 1920s Edwardian wood-paneled carriages, open-air balcony observation cars, formal dress-code evening banquets, and high tea in the lounge car, it is the ultimate romantic rail safari.",
        "highlights": [
            "Open-air balcony on the rear Observation Car for photography",
            "Vintage wood-paneled suites with original period craftsmanship",
            "Formal dress code evening dinners (suit & tie / evening gown)",
            "All-inclusive South African fine wines & traditional High Tea",
            "Off-train historic excursion to the preserved Victorian village of Matjiesfontein"
        ],
        "suites": [
            {
                "name": "Royal Suite",
                "bed_type": "King-size bed",
                "size": "16 sq. metres (Half carriage)",
                "amenities": "Victorian bath, ensuite shower, lounge area, 24h room service, fine teas"
            },
            {
                "name": "Deluxe Suite",
                "bed_type": "Twin or Double bed",
                "size": "11 sq. metres",
                "amenities": "Ensuite shower, seating area, wood paneling, fully stocked bar fridge"
            },
            {
                "name": "Pullman Suite",
                "bed_type": "Sofa bed by day, upper/lower berth by night",
                "size": "7 sq. metres",
                "amenities": "Ensuite shower, vintage brass fittings, air conditioning"
            }
        ],
        "image_url": "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80"
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
        "description": "Famous worldwide for the 1870s Diamond Rush. Home to 'The Big Hole'—the largest hand-dug excavation on earth—and vintage tramways.",
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
        "content": "Before the steam locomotives chugged into Kimberley in 1885, traveling from Cape Town to the diamond fields required a grueling multi-week journey by ox-wagon across scorched Karoo scrubland. The arrival of the iron horse transformed South Africa overnight. Engineering feats like the Hex River Railway Pass—carved manually through solid rock and cliffside ledges—allowed heavy machinery to reach the mines and birthed South Africa's modern industrial network."
    },
    {
        "id": "story-2",
        "title": "The Blue Train Legacy: 75+ Years of Presidential Romance",
        "author": "TrackTales Archives",
        "read_time": "3 min read",
        "summary": "Originally dubbed the 'Union Limited' in 1923, the train acquired its iconic royal blue coat during World War II and grew into a world symbol of luxurious hospitality.",
        "content": "Kings, queens, statesmen, and cultural icons have stepped onto the deep pile carpets of The Blue Train. From Nelson Mandela hosting foreign dignitaries to Hollywood legends watching the sunset over the Karoo, the train is more than transport—it is a floating sanctuary where butler service, fine porcelain, and slow travel create lifelong memories."
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
def create_ticket(ticket_req: TicketRequest):
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
    
    return {"status": "success", "message": "Souvenir Boarding Pass Generated", "ticket": ticket_pass}

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
        return FileResponse(index_file)
    return JSONResponse({"message": "TrackTales API active. Open /public/index.html or run via uvicorn."})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

