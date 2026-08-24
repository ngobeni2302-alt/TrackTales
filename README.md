# TrackTales - South Africa Railway Journeys, Tourism & Interactive Stories

**TrackTales** is a modern, inclusive, and visually stunning web application celebrating South Africa’s legendary rail transportation history and scenic tourism corridors from **Pretoria to Cape Town**:
1. **The Blue Train** : The five-star ultra luxury express ("Window to the Soul of South Africa").
2. **Rovos Rail** : The world's most opulent vintage Edwardian train safari.

Built with a **FastAPI** Python backend, **Vanilla JavaScript & CSS**, a **Light-Mode High-Contrast WCAG AAA Accessible Design System**, and live deployed production hosting on **Vercel**.

> 🌐 **Live Web Application URL**: **[https://track-tales.vercel.app](https://track-tales.vercel.app)**  
> 💻 **Local Development URL**: **[http://localhost:8000](http://localhost:8000)** (via `./start.sh`)

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

## How to Access & Open the Web Application

TrackTales can be accessed directly online via the deployed web application or launched locally for development:

---

### 🌐 Live Deployed Web Application (Recommended)

Now that TrackTales is deployed live on **Vercel**, you can open and use the web application directly in your browser:

1. **Live Deployed Web Link**: **[https://track-tales.vercel.app](https://track-tales.vercel.app)** *(or your Vercel project URL)*
2. **Cross-Device Access**: Open on any modern desktop browser, tablet, or mobile phone.
3. **Instant Full Functionality**: Access all flagship train showcases, sights & attractions directory, interactive Mzansi Sight Solver games, and the digital souvenir boarding pass generator directly online.

---

### 💻 Local Development & Launch Options

If you want to run or modify TrackTales locally on your machine, you can launch it using any of the following options:

#### Option 1: Easiest 1-Click Launch (Recommended for Local Dev)
Simply run the launcher script in your terminal:
```bash
./start.sh
```
*(Starts the Python server and automatically opens your default web browser to `http://localhost:8000`)*

#### Option 2: FastAPI Python Backend Launch
A Python virtual environment (`venv`) with all required packages (`fastapi`, `uvicorn`, `pydantic`) is pre-installed in the repository:

##### Method A (Using the pre-installed Virtual Environment):
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
TrackTales includes full client-side fallback data. Double-click or open **`public/index.html`** directly in any web browser without starting a background terminal server!

---

## Deployment & Hosting Details

TrackTales is fully configured for serverless production deployment on **Vercel**:

- **Serverless API Engine**: `api/index.py` handles API requests (`/api/trains`, `/api/routes`, etc.) using Vercel Python serverless runtime.
- **Static Asset Delivery**: `public/` directory assets are served with edge CDN performance and instant caching.
- **Deploying Updates**: Run `vercel` or `vercel --prod` from the terminal, or connect this repository to your Vercel Dashboard for automatic deployment on push.

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
