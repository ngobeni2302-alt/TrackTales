# 🚂 TrackTales - South Africa Railway Journeys & Stories

**TrackTales** is a modern, visually stunning web application celebrating South Africa’s legendary rail lines traveling from **Pretoria to Cape Town**:
1. **The Blue Train** – The five-star luxury express ("Window to the Soul of South Africa").
2. **Rovos Rail** – The world's most opulent vintage Edwardian train safari.
3. **Shosholoza Meyl** – The passionate, authentic passenger train connecting communities across Mzansi.

Built with a curated **Blue, Green, and White** color theme, **FastAPI** backend, and seamless **Vercel** serverless readiness.

---

## 🎨 Color Palette & Design System

The application design is built around three core primary tones representing South Africa's natural beauty and rail heritage:
- **Blue (`#005691`, `#0b192c`)**: Represents the iconic royal blue carriages of The Blue Train, coastal ocean views of Cape Town, and deep twilight skies of the Karoo.
- **Green (`#0e382c`, `#10b981`)**: Represents the lush Highveld, emerald Jacaranda leaves of Pretoria, winelands of the Hex River Valley, and safari wilderness.
- **White (`#ffffff`, `#f8fafc`)**: Crisp, modern typography, glassmorphic cards, and clean UI contrast.
- **Gold (`#d4af37`)**: Luxury accents for five-star suites, heritage badges, and souvenir boarding passes.

---

## ✨ Features & Highlights

- **🗺️ Interactive Pretoria to Cape Town Route Map**:
  - Live timeline node graph tracking the **1,600 km corridor**.
  - Train line filter (The Blue Train, Rovos Rail, Shosholoza Meyl) highlighting specific stopovers.
  - Interactive stop inspector displaying station history, calling trains, distance, and **regional food & wine pairings** (e.g. Karoo Lamb in Matjiesfontein, Pinotage in Winelands).
- **🏛️ Stop Attractions Directory**:
  - Detailed attraction cards around every major stop (**Pretoria, Johannesburg, Kimberley, Matjiesfontein, Worcester, Cape Town**).
  - Highlights landmarks like Kimberley’s **Big Hole Mine Museum**, Union Buildings, Lord Milner Hotel, Table Mountain, and Constitution Hill.
- **🔊 Railway Soundscape Synthesizer ("Sounds of Mzansi Rails")**:
  - Built-in Web Audio API sound engine synthesizing real-time steam whistles, rhythmic Karoo track chugs, night desert wind, and Blue Train lounge jazz.
- **🎫 Souvenir Digital Boarding Pass Generator**:
  - Customize and generate printable/downloadable souvenir tickets with passenger name, train choice, cabin suite, date, carriage, seat number, and barcode.
- **📖 Rail Folklore & Heritage Reader**:
  - Modal viewer featuring historical stories of how gold, diamonds, and visionaries forged South Africa’s rail network.

---

## 🚀 How to Run the Web Application

You can launch TrackTales in **three easy ways**:

### ⚡ Easiest 1-Click Launch (Recommended)

Simply run:
```bash
./start.sh
```
*(This starts the server and automatically opens your web browser to `http://localhost:8000`)*

---

### Option 1: FastAPI Python Backend Manual Launch

A Python virtual environment (`venv`) with all required packages (`fastapi`, `uvicorn`, `pydantic`) has already been set up for you in the project directory!

#### Method A (Using the pre-installed Virtual Environment):
```bash
./venv/bin/python3 main.py
```
*Or activate the environment first:*
```bash
source venv/bin/activate
python3 main.py
```

#### Method B (Setting up a new environment or global install):
If creating a fresh virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 main.py
```

*Or installing packages directly with system pip:*
```bash
pip3 install -r requirements.txt --break-system-packages
python3 main.py
```

#### Accessing the App:
- Open your web browser and navigate to: **`http://localhost:8000`**
- Interactive API Documentation (Swagger UI): **`http://localhost:8000/docs`**

---

### Option 2: Node.js / JavaScript Server

If you prefer Node.js / JavaScript tooling:

1. **Start Local Static Server**:
   ```bash
   npm run dev:node
   ```
   *or using npx:*
   ```bash
   npx serve public -p 8000
   ```

2. **Access the App**:
   Open **`http://localhost:8000`** in your browser.

---

### Option 3: Direct Browser Launch (Offline Mode)

TrackTales includes built-in offline client fallback data. You can simply double-click or open **`public/index.html`** directly in any modern web browser without running any terminal server!

---

## ⚡ Deployment to Vercel

TrackTales is pre-configured for 1-click deployment on **Vercel**:

1. **Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel
   ```
2. **Git Integration**:
   - Push this repository to GitHub / GitLab.
   - Import the repository in [Vercel Dashboard](https://vercel.com).
   - Vercel will automatically detect `vercel.json` and deploy both the Python serverless API (`api/index.py`) and static frontend files (`public/`).

---

## 📂 Project Structure

```
TrackTales/
├── main.py              # FastAPI server entry point & REST endpoints
├── api/
│   └── index.py         # Vercel Python serverless handler
├── public/
│   ├── index.html       # Single-page HTML application layout
│   ├── css/
│   │   └── styles.css   # Custom CSS design system (Blue, Green, White)
│   └── js/
│       └── app.js       # Client app logic, route map, audio engine & ticket generator
├── requirements.txt     # Python backend dependencies
├── venv/                # Python virtual environment (pre-configured)
├── vercel.json          # Vercel deployment routes and build config
├── package.json         # NPM scripts and metadata
└── README.md            # Project documentation and guide
```

---

## 🚂 Featured Trains Summary

| Train Line | Category | Speed / Duration | Key Route Stops | Signature Highlight |
| :--- | :--- | :--- | :--- | :--- |
| **The Blue Train** | Ultra Luxury Express | 90 km/h (31 Hours) | Pretoria ➔ Kimberley ➔ Cape Town | 24/7 Butler Service & Marble En-suite Baths |
| **Rovos Rail** | Vintage Edwardian Safari | 60 km/h (48 Hours) | Pretoria ➔ Matjiesfontein ➔ Cape Town | Open Balcony Observation Car & Gala Dinners |
| **Shosholoza Meyl** | Passenger & Tourist Rail | 80 km/h (26 Hours) | Pretoria ➔ Jo'burg ➔ Kimberley ➔ Cape Town | Authentic Mzansi Hospitality & Sleeper Berths |

---

*Created with ❤️ for South African railway enthusiasts and travelers.*
