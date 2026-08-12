# TrackTales - South Africa Railway Journeys, Tourism & Interactive Stories

**TrackTales** is a modern, inclusive, and visually stunning web application celebrating South Africa’s legendary rail transportation history and scenic tourism corridors from **Pretoria to Cape Town**:
1. **The Blue Train** – The five-star ultra luxury express ("Window to the Soul of South Africa").
2. **Rovos Rail** – The world's most opulent vintage Edwardian train safari.
3. **Shosholoza Meyl** – The passionate, authentic passenger express connecting communities across Mzansi.

Built with a **FastAPI** Python backend, **Vanilla JavaScript & CSS**, a **White-Dominant WCAG AAA Accessible Design System**, and seamless **Vercel** serverless readiness.

---

## 60-30-10 Color Coordination & Accessibility Design System

The application interface is built using a strict **60-30-10 color balance rule** designed for visual elegance, accessibility, young and elderly users, and individuals with color perception needs or sensitive eyes:
- **60% Dominant (Pure White `#ffffff` & `#f8fafc`)**: Dominant canvas, section backgrounds, and card containers providing clean contrast and WCAG AAA readability.
- **30% Secondary (Light Blue / Sky Blue `#38bdf8`, `#e0f2fe`, `#0284c7`)**: Secondary structural elements, navigation bar tinting, station cards, headers, section borders, and route map track connectors.
- **10% Accent (Baby Blue `#bae6fd`, `#7dd3fc`, `#a5f3fc`)**: Interactive action buttons, active navigation indicators, game score badges, micro-animations, and high-visibility focus rings (`:focus-visible`).
- **Light & Dark Mode Support**: Includes persistent theme toggle for low-light environments.

---

## Key Pages & Navigation Architecture

The site navigation panel is organized in the following order:
1. **Home**: Discover Mzansi through the Magic of Rail and explore section highlights.
2. **Flagship Trains**: Compare luxury express details, speeds, and amenities for The Blue Train and Rovos Rail.
3. **Attractions**: Browse landmark sights along the Pretoria to Cape Town rail corridor.
4. **Sight Games**: Interactive trivia sight solver puzzles and "Did You Know?" educational pop-ups.
5. **About**: Dedicated about page, interactive Pretoria-Cape Town route map, digital boarding pass generator, and rail folklore stories.

### 1. Home Page
- **Hero Section**: Gateway to South Africa railway tourism with interactive CTA buttons.
- **Explore Portal Showcase**: Overview cards linking to Flagship Trains, Attractions, Sight Games, and About.

### 2. Flagship Trains Page (Advertising Luxury Trains)
- **Dedicated Showcase**: Displays in-depth luxury advertisements for South Africa's 2 flagship trains: **The Blue Train** (Ultra Luxury Express) and **Rovos Rail** (Vintage Edwardian Safari).
- **Luxury Specs & Highlights**: Speed, travel duration, 24/7 butler service, open balcony observation car, and fine dining details.
- **Reserved Backend Integration Space**: Clear, structured containers reserved for the backend team to dynamically stream live trail feeds, stop schedules, and cabin availability.

### 3. Attractions Directory Page
- Curated landmark directory showcasing South Africa's sights along the rail line (e.g. Kimberley Big Hole, Union Buildings, Lord Milner Hotel, Table Mountain, Hex River Valley Winelands).
- Interactive city filter buttons (Pretoria, Johannesburg, Kimberley, Matjiesfontein, Worcester, Cape Town) and 3D flippable attraction cards.

### 4. Interactive Games Page (Mzansi Sight Solver & "Did You Know?" Pop-ups)
- **Interactive Sight Puzzles**: Solve trivia and landmark puzzles about South African rail stops (+100 PTS score tracker & progress bar).
- **"Did You Know?" Pop-Up Modal**: Correctly solving a sight puzzle triggers an educational pop-up revealing fascinating South African tourism, geography, and rail folklore facts.

### 5. About Page (About TrackTales, SA Tourism, Route Map & Souvenir Tickets)
- **TrackTales Mission**: Explains the platform's vision connecting heritage rail history with modern digital travel.
- **South Africa Tourism & Rail Transportation**: History of how the 1870s diamond rush in Kimberley and gold rush in Johannesburg established Mzansi's rail network.
- **Why Travel South Africa By Rail?**: Cultural preserved stops, culinary & wine pairings, and eco-friendly travel insights.
- **Interactive Journey Map**: Node graph tracking the **1,600 km corridor** across 6 major station stops (**Pretoria, Johannesburg, Kimberley, Matjiesfontein, Worcester, Cape Town**).
- **Souvenir Digital Boarding Pass Generator**: Generate, print, or download personalized souvenir tickets with scannable QR code and 3D flippable seat allocation map.
- **Railway Heritage Stories**: Read folklore and stories of how gold, diamonds, and visionaries forged South Africa’s rails.

---

## How to Run the Web Application

You can launch TrackTales in **three easy ways**:

### Easiest 1-Click Launch (Recommended)

Simply run:
```bash
./start.sh
```
*(This starts the server and automatically opens your web browser to `http://localhost:8000`)*

---

### Option 1: FastAPI Python Backend Launch

A Python virtual environment (`venv`) with all required packages (`fastapi`, `uvicorn`, `pydantic`) is pre-installed in the project directory:

#### Method A (Using the pre-installed Virtual Environment):
```bash
./venv/bin/python3 main.py
```
*Or activate the environment first:*
```bash
source venv/bin/activate
python3 main.py
```

#### Method B (Using system pip):
```bash
pip3 install -r requirements.txt --break-system-packages
python3 main.py
```

#### Accessing the App:
- Web Application: **`http://localhost:8000`**
- Interactive API Documentation (Swagger UI): **`http://localhost:8000/docs`**

---

### Option 2: Node.js / JavaScript Server

```bash
npm run dev:node
```
*or using npx:*
```bash
npx serve public -p 8000
```

---

### Option 3: Direct Browser Launch (Offline Fallback Mode)

TrackTales includes client-side fallback data. Double-click or open **`public/index.html`** directly in any modern browser without running a terminal server!

---

## Deployment to Vercel

TrackTales is pre-configured for serverless deployment on **Vercel**:

```bash
vercel
```
Or connect this repository to the [Vercel Dashboard](https://vercel.com). Vercel will automatically detect `vercel.json` and deploy both the Python serverless API (`api/index.py`) and static frontend files (`public/`).

---

## Project Structure

```
TrackTales/
├── main.py              # FastAPI server entry point & REST endpoints (/api/trains, /api/routes, etc.)
├── api/
│   └── index.py         # Vercel Python serverless entry point
├── public/
│   ├── index.html       # Multi-page layout (Home, Flagship Trains, Attractions, Games, About)
│   ├── css/
│   │   └── styles.css   # WCAG AAA Light/Dark design system & CSS keyframe animations
│   └── js/
│       └── app.js       # Page router, train loader splash, games engine, and login modal
├── requirements.txt     # Python backend dependencies
├── start.sh             # 1-Click launcher script
├── vercel.json          # Vercel deployment routing config
├── package.json         # NPM scripts and project metadata
└── README.md            # Project documentation
```

---

## Flagship Trains Summary

| Train Line | Category | Speed / Duration | Key Route Stops | Signature Luxury Highlight |
| :--- | :--- | :--- | :--- | :--- |
| **The Blue Train** | Ultra Luxury Express | 90 km/h (31 Hours) | Pretoria -> Kimberley -> Cape Town | 24/7 Butler Service & Marble En-suite Baths |
| **Rovos Rail** | Vintage Edwardian Safari | 60 km/h (48 Hours) | Pretoria -> Matjiesfontein -> Cape Town | Open Balcony Observation Terrace & Gala Dinners |
| **Shosholoza Meyl** | Passenger & Tourist Express | 80 km/h (26 Hours) | Pretoria -> Jo'burg -> Kimberley -> Cape Town | Authentic Mzansi Hospitality & Sleeper Compartments |

---

*A Geekulcha Motivated Hackathon Web Application built for the Geekulcha Annual Hackathon 2026 ("Build for Use") celebrating South African railway history, tourism, and travel.*
