# TrackTales - South Africa Railway Journeys, Tourism & Interactive Stories

**TrackTales** is a modern, inclusive, and visually stunning web application celebrating South Africa’s legendary rail transportation history and scenic tourism corridors from **Pretoria to Cape Town**:
1. **The Blue Train**: The five-star ultra luxury express ("Window to the Soul of South Africa").
2. **Rovos Rail**: The world's most opulent vintage Edwardian train safari.
3. **Shosholoza Meyl**: Authentic long-distance passenger train connecting South Africa's heartland.

Built with a **FastAPI** Python backend, **Vanilla JavaScript & CSS**, a **Light-Mode High-Contrast WCAG AAA Accessible Design System**, **Motion One** spring animations, and live deployed production hosting on **Vercel**.

> 🌐 **Live Web Application URL**: **[https://track-tales.vercel.app](https://track-tales.vercel.app)**  
> 💻 **Local Development URL**: **[http://localhost:8000](http://localhost:8000)** (via `./start.sh`)

---

## Key Features & Highlights

- **Motion One Animation Engine**: Enhanced micro-interactions, spring-based modal popups, smooth hash route transitions, and staggered card cascade animations.
- **Fail-Safe Loading Splash**: Fast, optimized splash screen loading sequence equipped with auto-dismiss fail-safe timers for responsive entry.
- **Persistent Auth & Passenger Portal**: Streamlined user login and logout management powered by browser local storage with clear session status displays.
- **Interactive Mzansi Sight Solver & Trivia**: Landmark discovery games with educational pop-up modals, score tracking, and achievement progress.
- **Digital Souvenir Boarding Pass Generator**: Interactive ticket generator with seat allocation maps and scannable QR verification codes.
- **WCAG AAA High-Contrast Accessibility**: Standardized 60-30-10 color rule with dark and light mode toggle support.

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
2. **Flagship Trains**: Compare luxury express details, speeds, and amenities for The Blue Train, Rovos Rail, and Shosholoza Meyl.
3. **Attractions**: Browse landmark sights along the Pretoria to Cape Town rail corridor.
4. **Sight Games**: Interactive trivia sight solver puzzles and "Did You Know?" educational pop-ups.
5. **About**: Dedicated about page, interactive Pretoria-Cape Town route map, digital boarding pass generator, and rail folklore stories.

### 1. Home Page
- **Hero Section**: Gateway to South Africa railway tourism with interactive CTA buttons.
- **Explore Portal Showcase**: Interactive cards linking directly to Flagship Trains, Attractions, Sight Games, and About.

### 2. Flagship Trains Page (Advertising Luxury Trains)
- **Dedicated Showcase**: Displays in-depth luxury advertisements for South Africa's flagship trains: **The Blue Train** (Ultra Luxury Express), **Rovos Rail** (Vintage Edwardian Safari), and **Shosholoza Meyl** (Passenger Express).
- **Luxury Specs & Highlights**: Speed, travel duration, 24/7 butler service, open balcony observation car, and fine dining details.
- **Reserved Backend Integration Space**: Clear, structured containers reserved for live trail feeds, stop schedules, and cabin availability.

### 3. Attractions Directory Page
- Curated landmark directory showcasing South Africa's sights along the rail line (Kimberley Big Hole, Union Buildings, Lord Milner Hotel, Table Mountain, Hex River Valley Winelands).
- Interactive city filter buttons (Pretoria, Johannesburg, Kimberley, Matjiesfontein, Worcester, Cape Town) and 3D flippable attraction cards.

### 4. Interactive Games Page (Mzansi Sight Solver & "Did You Know?" Pop-ups)
- **Interactive Sight Puzzles**: Solve trivia and landmark puzzles about South African rail stops (+100 PTS score tracker & progress bar).
- **"Did You Know?" Pop-Up Modal**: Correctly solving a sight puzzle triggers an educational pop-up revealing South African tourism, geography, and rail folklore facts.

### 5. About Page (About TrackTales, SA Tourism, Route Map & Souvenir Tickets)
- **TrackTales Mission**: Explains the platform's vision connecting heritage rail history with modern digital travel.
- **South Africa Tourism & Rail Transportation**: History of how the 1870s diamond rush in Kimberley and gold rush in Johannesburg established Mzansi's rail network.
- **Why Travel South Africa By Rail?**: Cultural preserved stops, culinary & wine pairings, and eco-friendly travel insights.
- **Interactive Journey Map**: Node graph tracking the **1,600 km corridor** across 6 major station stops (**Pretoria, Johannesburg, Kimberley, Matjiesfontein, Worcester, Cape Town**).
- **Souvenir Digital Boarding Pass Generator**: Generate, print, or download personalized souvenir tickets with scannable QR code and 3D flippable seat allocation map.
- **Railway Heritage Stories**: Read folklore and stories of how gold, diamonds, and visionaries forged South Africa’s rails.

---

## How to Access & Open the Web Application

TrackTales can be accessed directly online via the deployed web application or launched locally for development:

---

### 🌐 Live Deployed Web Application (Recommended)

TrackTales is deployed live on **Vercel** and can be accessed directly in your web browser:

1. **Live Deployed Web Link**: **[https://track-tales.vercel.app](https://track-tales.vercel.app)**
2. **Cross-Device Access**: Optimized for desktop browsers, tablets, and mobile devices.
3. **Instant Full Functionality**: Access flagship train showcases, sights directory, interactive trivia games, and the boarding pass generator online.

---

### 💻 Local Development & Launch Options

To run or modify TrackTales locally, launch it using any of the following methods:

#### Option 1: Easiest 1-Click Launch (Recommended for Local Dev)
Simply run the launcher script in your terminal:
```bash
./start.sh
```
*(Starts the Python server and automatically opens your default web browser to `http://localhost:8000`)*

#### Option 2: FastAPI Python Backend Launch
A Python virtual environment (`venv`) with all required packages (`fastapi`, `uvicorn`, `pydantic`) is pre-installed in the repository:

##### Method A (Using pre-installed Virtual Environment):
```bash
./venv/bin/python3 main.py
```
*Or activate the environment first:*
```bash
source venv/bin/activate
python3 main.py
```

##### Method B (Using system pip):
```bash
pip3 install -r requirements.txt --break-system-packages
python3 main.py
```

##### Accessing Local Server:
- Web Application: **`http://localhost:8000`**
- Interactive API Documentation (Swagger UI): **`http://localhost:8000/docs`**

#### Option 3: Node.js / JavaScript Server Launch
```bash
npm run dev:node
```
*Or using npx:*
```bash
npx serve public -p 8000
```

#### Option 4: Direct Browser Offline Launch
TrackTales includes full client-side fallback data. Double-click or open **`public/index.html`** directly in any browser without running a local server!

---

## Deployment & Vercel Configuration

TrackTales is configured for serverless production deployment on **Vercel**:

- **Serverless API Engine**: `api/index.py` handles API endpoints (`/api/trains`, `/api/routes`, etc.) using Vercel Python serverless runtime.
- **Explicit Static Asset Routing**: `vercel.json` maps static paths (`/js/`, `/css/`, `/images/`, `/videos/`) directly to static assets, preventing SPA fallback interference.
- **Static CDN Asset Delivery**: `public/` directory assets are delivered via high-performance edge CDN.
- **Deploying Updates**: Run `vercel` or `vercel --prod` from the terminal, or push commits to the connected git repository for automatic deployment.

---

## Project Structure

```
TrackTales/
├── main.py              # FastAPI server entry point & REST endpoints (/api/trains, /api/routes, etc.)
├── api/
│   └── index.py         # Vercel Python serverless entry point
├── public/
│   ├── index.html       # Multi-page SPA layout (Home, Flagship Trains, Attractions, Games, About)
│   ├── css/
│   │   └── styles.css   # WCAG AAA Light/Dark design system & CSS keyframe animations
│   └── js/
│       └── app.js       # Page router, train loader splash, games engine, and auth modal
├── requirements.txt     # Python backend dependencies
├── start.sh             # 1-Click launcher script
├── vercel.json          # Vercel deployment & static asset routing config
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
