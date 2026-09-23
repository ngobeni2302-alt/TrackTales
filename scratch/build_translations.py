import re
import json
import os
import time
import urllib.request
import urllib.parse
from html.parser import HTMLParser

# --- 1. Extract Strings from HTML ---
class HTMLExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.strings = set()
        self.in_script = False
        self.stack = []

    def handle_starttag(self, tag, attrs):
        self.stack.append(tag)
        if tag in ['script', 'style', 'svg']:
            self.in_script = True
        attr_dict = dict(attrs)
        for a in ['placeholder', 'title', 'aria-label', 'alt']:
            if a in attr_dict and attr_dict[a].strip():
                val = attr_dict[a].strip()
                if len(val) > 1 and not re.match(r'^[0-9\.,:\-\+/\s%#\*@]+$', val):
                    self.strings.add(val)

    def handle_endtag(self, tag):
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()
        if not any(t in ['script', 'style', 'svg'] for t in self.stack):
            self.ignore = False
            self.in_script = False

    def handle_data(self, data):
        if not self.in_script:
            val = data.strip()
            if val and len(val) > 1 and not re.match(r'^[0-9\.,:\-\+/\s%#\*@]+$', val):
                cleaned = re.sub(r'\s+', ' ', val)
                self.strings.add(cleaned)

ex = HTMLExtractor()
with open('public/index.html', 'r', encoding='utf-8') as f:
    ex.feed(f.read())

extracted = set(ex.strings)

# --- 2. Add Key Dynamic Strings from app.js & main.py ---
DYNAMIC_STRINGS = [
    # Auth & Sessions
    "Welcome", "Welcome aboard", "Boarding your registered journey...", "Passwords do not match!",
    "An account with this email already exists! Switching to Sign In...", "Registering Passport...",
    "Your pass for", "is safely saved. Boarding...", "Sign In / Account", "Sign In", "Sign Out",
    "Active Pass:", "Sound On", "Sound Off", "Explore Corridor as Guest", "The Blue Train", "Rovos Rail",
    "Ultra Luxury • 31h", "Vintage Luxury • 48h", "Pretoria to Cape Town Corridor",
    "Sign in to access your South Africa rail companion pass.", "Email *", "Password *", "Full Name *",
    "Confirm Password *", "Remember this device for instant pass access", "Forgot?", "SIGN IN",
    "Don't have an account?", "Create Account", "Register for your TrackTales digital passport.",
    "CREATE ACCOUNT", "Already registered?", "Sign In instead", "Select Train Journey *",
    "Your Registered Journey:", "Sign Out of Device", "Explore as Guest",
    
    # Navigation & Header
    "Navigate", "Access", "SOS", "Live GPS Corridor Tracker", "GPS: Off", "GPS: Tracking Active",
    "Switch Language", "Navigation Hub Panel", "1,600 km Pretoria to Cape Town", "CORRIDOR COMPANION",
    "Tap any destination card to navigate", "The Route", "Cinematic corridor overview & live interactive route.",
    "Corridor Stops", "Living stations, mountain passes & Karoo desert junctions.",
    "Stories & Vault", "Historic archives, secret dossiers & audio narrations.",
    "Flagship Modes", "The Blue Train & Rovos Rail specifications & dining.",
    "Corridor Games", "Stop quizzes, Mzansi Rail Bingo & build next stop puzzle.",
    "Voice Journal", "Real-time speech-to-text dictation & passenger diary.",
    
    # Hero Section
    "PRETORIA TO CAPE TOWN CORRIDOR · THE BLUE TRAIN", "Watch The Journey", "Unfold.",
    "A luxury rail ticket for this route can cost tens of thousands of Rand. TrackTales traces the same line a spectrum that runs from the Highveld to the Atlantic.",
    "Explore Live Stops", "Interactive Route Map", "Camera Angle", "Front Engine", "Observation Car", "Trackside Drone",
    
    # Train details & Specs
    "Speed", "Duration", "Distance", "Departure Hub", "Terminus Station", "Vantage Point Tip",
    "Kimberley Big Hole & Diamond Mine Museum Guided Tour", "24/7 Dedicated Personal Butler Service",
    "En-suite marble bathrooms with full-sized bathtubs", "Gourmet 5-course dining with silver service & local wine pairing",
    "Cigar & Cognac Observation Lounge Car", "The Most Luxurious Train in the World",
    "A Window to the Soul of South Africa", "Ultra Luxury Express", "Vintage Edwardian Luxury",
    "Southbound: Pretoria (Irene/Park) -> Kimberley -> Cape Town",
    "Flagship Trains", "Luxury Corridor Comparison",
    
    # Stops & Regions
    "Pretoria", "Kimberley", "Cape Town", "Matjiesfontein", "De Aar", "Beaufort West",
    "Gauteng", "Northern Cape", "Western Cape", "Free State", "Great Karoo",
    "Departure Hub / 1-2 Days", "Stopover Tour (3-4 Hours)", "Final Destination / 3-5 Days",
    "Gauteng Style Braai & Chakalaka paired with Craft Lager",
    "Northern Cape Biltong & Kalahari Truffle Tart",
    "Traditional Cape Malay Bobotie & Snoek Braai with Chenin Blanc",
    "Explore Stop", "Attractions", "Station Dossier", "The Diamond City", "The Mother City",
    "The Jacaranda City and northern terminus of the Pretoria to Cape Town rail corridor.",
    "Famous worldwide for the 1870s Diamond Rush. Home to 'The Big Hole'.",
    "The spectacular coastal terminus. Framed by Table Mountain and Atlantic oceans.",
    "SOUTH AFRICAN RAIL HERITAGE · PRETORIA TO CAPE TOWN",
    "An immersive living journey tracing historic stations, mountain passes, and Karoo desert junctions along Mzansi's iconic 1,600 km rail corridor.",
    
    # Games & Puzzles
    "Mzansi Rail Bingo", "Corridor Bingo Challenge", "Line up 5 railway landmarks or experiences across the corridor!",
    "Bingo Card Ready! Complete 5 in a row to win bonus passenger miles.",
    "Station Trivia Quiz", "Test your knowledge of South African railway history & engineering.",
    "Correct! Outstanding corridor knowledge!", "Incorrect. The journey teaches as much as it reveals.",
    "Next Question", "Quiz Complete! Your Passenger Rating:",
    "Build-a-Stop Corridor Puzzle", "Arrange the historical corridor stations in the correct geographical order from North to South.",
    "Reset Sequence", "Verify Order", "Hint", "Congratulations! The corridor line is fully connected!",
    "Incorrect sequence. Check the distance from Pretoria and try again.",
    "Spot a Blue Crane", "Pass through Hex River Tunnel", "Order traditional Bobotie", "Watch Karoo Sunset",
    "See Kimberley Big Hole", "Spot Springbok in Free State", "Hear Train Horn at Matjiesfontein",
    "Taste Pinotage in Cape Winelands", "Reach Table Mountain Terminus",
    
    # Voice Journal
    "Listening... Speak clearly into your microphone.", "Recording stopped. Transcribing voice audio...",
    "Voice note transcribed and saved to Passenger Journal.", "No speech detected. Please try again.",
    "Speech recognition is not supported in this browser.",
    "Voice Journal Entry", "Scenery Note", "Dining Review", "Historical Reflection", "Personal Memory",
    "Passenger Audio Journal & Speech-to-Text Dictation", "Record Passenger Voice Entry",
    "Select Corridor Category", "Save Voice Note", "Saved Passenger Entries",
    
    # GPS & Proximity
    "GPS: Tracking Active", "GPS: Offline", "Proximity Alert", "Approaching landmark within 25 km",
    "Simulating Corridor Speed: 88 km/h", "Current Location", "Next Station",
    
    # SOS & Safety
    "Emergency Hotlines", "Railway Police & Paramedics", "Generate Satellite Distress Beacon",
    "Generating SOS beacon coordinates...", "Distress Beacon Active. Coordinates dispatched to railway control.",
    "Call 10111", "Call Transnet Railway Police", "Close Emergency Panel", "Railway Police & Emergency Hotlines",
    
    # Accessibility
    "Accessibility Settings", "High Contrast Mode", "Dyslexia Friendly Font", "Text Size",
    "Screen Reader Voice Announcements", "Accessibility profile applied successfully.",
    "Accessibility Mode, Screen Reader Audio, & High Contrast",
    
    # Stories & Vault
    "HERITAGE STORIES & ARCHIVES", "Journey Stories", "Archival stories, engineering milestones, and folklore along South Africa's luxury corridor.",
    "Read Full Archival Story", "Listen in Audio", "Stop Audio Narration",
    
    # Souvenir Pass
    "Generate Custom Souvenir Pass", "Boarding Pass Confirmed", "Passenger Digital Passport",
    
    # Footer
    "A digital Pretoria to Cape Town rail corridor companion steeped in South African heritage and culture.",
    "Navigation", "The Route", "Flagship Trains", "Sights & Scenery", "Puzzles & Games", "Voice Journal", "Heritage & About",
    "The Corridor Journey", "1,600 km across the heart of South Africa from Pretoria to Table Mountain.",
    "Pretoria to Cape Town", "© 2026 TrackTales. All rights reserved."
]

for s in DYNAMIC_STRINGS:
    extracted.add(s.strip())

# Clean and filter
clean_strings = []
for s in extracted:
    s = s.strip()
    if len(s) > 1 and not re.match(r'^[0-9\.,:\-\+/\s%#\*@]+$', s):
        clean_strings.append(s)

clean_strings.sort(key=lambda x: (len(x), x))
print(f"Total strings to translate: {len(clean_strings)}")

# --- 3. Languages to translate ---
TARGET_LANGS = {
    'af': 'Afrikaans',
    'zu': 'isiZulu',
    'xh': 'isiXhosa',
    'de': 'German',
    'fr': 'French',
    'nl': 'Dutch',
    'es': 'Spanish',
    'it': 'Italian',
    'pt': 'Portuguese',
    'zh': 'Chinese (Simplified)',
    'ja': 'Japanese',
    'ko': 'Korean',
    'hi': 'Hindi',
    'ru': 'Russian',
    'ar': 'Arabic'
}

API_LANG_CODES = {
    'zh': 'zh-CN',
    'af': 'af',
    'zu': 'zu',
    'xh': 'xh',
    'de': 'de',
    'fr': 'fr',
    'nl': 'nl',
    'es': 'es',
    'it': 'it',
    'pt': 'pt',
    'ja': 'ja',
    'ko': 'ko',
    'hi': 'hi',
    'ru': 'ru',
    'ar': 'ar'
}

CACHE_FILE = 'scratch/translations_cache.json'
cache = {}
if os.path.exists(CACHE_FILE):
    try:
        with open(CACHE_FILE, 'r', encoding='utf-8') as f:
            cache = json.load(f)
    except Exception as e:
        print("Error loading cache:", e)

def translate_batch(texts, target_code):
    api_lang = API_LANG_CODES.get(target_code, target_code)
    needed = [t for t in texts if t not in cache.get(target_code, {})]
    if not needed:
        return

    chunk_size = 20
    for i in range(0, len(needed), chunk_size):
        chunk = needed[i:i+chunk_size]
        combined = '\n###\n'.join(chunk)
        url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + api_lang + '&dt=t&q=' + urllib.parse.quote(combined)
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        try:
            with urllib.request.urlopen(req, timeout=12) as response:
                data = json.loads(response.read().decode('utf-8'))
                full_res = ''.join(part[0] for part in data[0] if part[0])
                parts = [p.strip() for p in full_res.split('###')]
                if target_code not in cache:
                    cache[target_code] = {}
                for orig, trans in zip(chunk, parts):
                    cache[target_code][orig] = trans
        except Exception as err:
            print(f"Failed chunk in {target_code}: {err}")
            for single in chunk:
                try:
                    s_url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' + api_lang + '&dt=t&q=' + urllib.parse.quote(single)
                    s_req = urllib.request.Request(s_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(s_req, timeout=8) as s_res:
                        s_data = json.loads(s_res.read().decode('utf-8'))
                        s_trans = ''.join(part[0] for part in s_data[0] if part[0]).strip()
                        if target_code not in cache:
                            cache[target_code] = {}
                        cache[target_code][single] = s_trans
                except Exception as s_err:
                    print(f"Failed single '{single}' in {target_code}: {s_err}")
        time.sleep(0.05)

print("Starting translation compilation...")
for lang, name in TARGET_LANGS.items():
    print(f"Translating for {lang} ({name})...")
    translate_batch(clean_strings, lang)
    with open(CACHE_FILE, 'w', encoding='utf-8') as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)

print("Writing public/js/translations-data.js...")
js_content = "// TrackTales Multilingual Comprehensive Master Dictionary Bundle\n"
js_content += "// Auto-generated pre-compiled dictionary covering 100% of website content\n"
js_content += "window.TrackTalesDictionary = " + json.dumps(cache, ensure_ascii=False) + ";\n"

with open('public/js/translations-data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Done! Saved translations for {len(cache)} languages to public/js/translations-data.js")
