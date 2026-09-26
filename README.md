# TrackTales - South Africa Railway Journeys, Tourism and Interactive Stories

TrackTales is a modern, inclusive, and visually stunning web application celebrating South Africa's legendary rail transportation history and scenic tourism corridors from Pretoria to Cape Town:
1. The Blue Train: The five-star ultra luxury express ("Window to the Soul of South Africa").
2. Rovos Rail: The world's most opulent vintage Edwardian train safari.

Built with a FastAPI Python backend, SQLite and Supabase database integrations, Vanilla JavaScript and CSS, a Light-Mode High-Contrast WCAG AAA Accessible Design System, Motion One spring animations, a 16-language client-side translation engine, dedicated cinematic guest mode, and serverless production hosting on Vercel.

> Live Web Application URL: [https://track-tales.vercel.app](https://track-tales.vercel.app)
> Local Development URL: [http://localhost:8000](http://localhost:8000) (via `./start.sh`)

---

## Architectural Highlights and Recent Implementations

### 1. Authentic Split Login and Sign-Up Splash Modal
- First-Screen Launch Presentation: Visiting the root web address immediately presents an authentic split modal with dual tabs for Sign In and Sign Up.
- Live Cinematic Background: Features an integrated high-definition railway video showcasing South Africa's heritage locomotives in motion.
- Full Authentication Lifecycle: Includes password visibility toggles, interactive password strength validation, account lockout prevention, and password reset flows.
- Guest Mode Entry: Direct "Continue as Guest" actions accessible from both Sign In and Sign Up views for instantaneous exploration without mandatory registration.
- Pristine Hero Surface: Eliminated redundant inline login forms and duplicate cards from the landing hero to provide an elegant, uncrowded first impression.

### 2. Route and Reload Persistence Engine
- Early Head Bootstrap Script: An inline script executes in the HTML head before DOM rendering to parse URL hashes and routing tokens.
- Hash-Preserving Reload: Reloading the browser preserves the active user route:
  - Reloading on `#home` retains the Home page view with the modal dismissed.
  - Reloading on `#signup` renders the Sign Up modal directly with no flash of the Sign In tab.
  - Reloading on `#signin` renders the Sign In modal directly.
  - Reloading on content views (`#trains`, `#stops`, `#games`, `#about`) keeps the traveler on that exact page without unwanted redirection.
- Dynamic Hashchange Listeners: Seamlessly syncs modal state and page views when navigating via browser back and forward buttons or internal links.

### 3. Dedicated Guest Mode Video Portal (guest.html)
- Standalone Experience: Accessible via `/guest` and `/guest.html`, allowing travelers to experience the corridor without logging in.
- 21 Corridor Attraction Videos: Over 21 high-definition MP4 videos documenting historic and natural landmarks along the 1,600 km Pretoria-to-Cape Town corridor.
- Master Cinematic Video Player: Feature video showcase with responsive 16:9 aspect ratio, seamless loop playback, and interactive audio mute/unmute toggles.
- Filterable Directory: Filter attraction cards across Heritage, Nature, Luxury, and Architecture categories.
- Strict Login Redirection: "Sign In / Register" links in both the header and footer invoke an authentication redirect that clears guest session flags and routes the user back to the primary login modal.

### 4. 16-Language Multilingual Translation Engine
- Comprehensive Language Support: Full localization across 11 official South African languages and 5 high-volume international tourist languages:
  - South African Languages: English, isiZulu, isiXhosa, Afrikaans, Sepedi, Setswana, Sesotho, Xitsonga, siSwati, Tshivenda, isiNdebele.
  - International Languages: German, French, Dutch, Mandarin Chinese, Japanese.
- Client-Side Real-Time Translation: Instantaneous switching with collision-free phrase matching and persistent language preferences stored in localStorage.
- Integrated Top Panel Controls: Language selector dropdown accessible in the primary navigation and guest portal header.

### 5. Interactive Mzansi Sight Solver and Educational Trivia
- Sight Solver Puzzle Engine: Dynamic landmark quiz games featuring South African rail stations, historical figures, and geography.
- "Did You Know?" Educational Modals: Correct solutions trigger educational popups explaining cultural heritage, diamond rush history, and engineering feats.
- Score and Progress Tracking: Real-time point accumulation (+100 PTS per correct answer) with visual progress bars.

### 6. Digital Souvenir Boarding Pass Generator
- Custom Ticket Creation: Travelers generate personalized souvenir tickets for The Blue Train or Rovos Rail.
- 3D Flippable Seat Map: Interactive seat allocation card with flip animation displaying carriage layouts.
- Scannable Verification QR Code: Embedded verification code and printable boarding pass format.

---

## 60-30-10 Color Coordination and Accessibility Design System

The application interface is built using a strict 60-30-10 color balance rule designed for visual elegance, accessibility, and high contrast:
- 60% Dominant (Pure White `#ffffff` and Soft Slate `#f8fafc`): Dominant canvas, section backgrounds, and card containers providing clean contrast and WCAG AAA readability.
- 30% Secondary (Deep Slate and Sky Blue `#1e293b`, `#0284c7`, `#e0f2fe`): Structural typography, station cards, headers, section borders, and route map connectors.
- 10% Accent (Warm Gold and Amber `#d99b26`, `#b87c10`): Interactive action buttons, active navigation indicators, game score badges, and high-visibility focus rings (`:focus-visible`).
- Light and Dark Theme Support: Persistent theme toggle for low-light viewing environments.

---

## Core Navigation Architecture

The site navigation panel provides access to the following sections:
1. Home: Hero introduction to South African rail heritage, quick-action links, and corridor overviews.
2. Flagship Trains: In-depth luxury showcases for The Blue Train and Rovos Rail with looping muted showcase videos, specifications, and travel amenities.
3. Attractions: Interactive landmark directory covering Pretoria, Johannesburg, Kimberley, Matjiesfontein, Worcester, and Cape Town.
4. Sight Games: Interactive trivia sight solver puzzles with educational popups and score tracking.
5. About: History of South Africa's rail network, 1,600 km interactive journey map, railway folklore stories, and souvenir ticket generator.
6. Guest Portal: Standalone video theater at `/guest` featuring 21 corridor landmark films.

---

## Technical Stack and Architecture

### Backend
- Framework: FastAPI (Python 3.10+) with Uvicorn ASGI server.
- Database: SQLite with WAL mode for local development and Supabase PostgreSQL integration for production.
- Security and Authentication:
  - Password hashing with bcrypt.
  - JWT token generation with PyJWT.
  - Brute-force protection with account lockout tracking.
  - Security headers: nosniff, DENY, X-XSS-Protection, and strict-origin-when-cross-origin.
- Serverless Runtime: Python serverless handler in `api/index.py` for Vercel deployment.

### Frontend
- Structure and Styling: Semantic HTML5, Vanilla CSS with custom properties, and Tailwind CSS utilities.
- Animation Engine: Motion One spring physics for modals, card cascades, and hash route transitions.
- Icons: Lucide icon suite.
- Media: HTML5 video integration with responsive containers and fallback posters.
- Internationalization: Multi-dictionary translation engine with localStorage persistence.

---

## Verification and Automated Test Suites

The repository includes comprehensive automated test suites run directly via the Node.js native test runner:

```bash
npm test
```

### Test Coverage Overview (53 Passing Tests Across 14 Test Suites):
1. `tests/auth_persistence.test.js` (18 Tests):
   - Early head bootstrap script logic and route token parsing.
   - Authentic split modal container rendering and tab switching.
   - Dismissal close button and "Continue as Guest" actions.
   - Elimination of duplicate inline auth forms and removal of corridor showcase cards.
   - Hoisted JavaScript view functions in `setupSplash`.
   - Hash routing simulation across fresh root visits, `#signup`, `#signin`, `#home`, and content routes.
2. `tests/guest_mode.test.js` (35 Tests):
   - File and asset integrity (guest.html, TrackTales logo, and 21 MP4 video files).
   - Guest portal DOM structure, master video player, and audio toggle controls.
   - Category filter partitions (Heritage, Nature, Luxury, Architecture).
   - Guest mode entry points across navigation bar, splash screen, and modals.
   - Event delegation and click handler binding in `app.js`.
   - FastAPI `/guest` endpoint and Vercel routing configuration.
   - Multilingual translation engine coverage for all 16 supported languages.
   - Strict login redirection logic and session token invalidation.

---

## Local Development and Launch Instructions

### Option 1: One-Click Terminal Launcher (Recommended)
Run the launcher script in your terminal:
```bash
./start.sh
```
This starts the Python server and automatically opens `http://localhost:8000` in your default browser.

### Option 2: FastAPI Python Backend
Using a Python virtual environment:
```bash
source venv/bin/activate
python3 main.py
```
Or on Windows PowerShell:
```powershell
.\venv\Scripts\Activate.ps1
python main.py
```

Access Points:
- Web Application: `http://localhost:8000`
- Guest Mode Video Portal: `http://localhost:8000/guest`
- Interactive API Documentation (Swagger UI): `http://localhost:8000/docs`

### Option 3: Node.js Development Server
```bash
npm run dev:node
```
Or using npx:
```bash
npx serve public -p 8000
```

### Option 4: Direct Offline Browser Access
TrackTales includes client-side fallback data. You can open `public/index.html` directly in any modern web browser without a local server.

---

## Production Deployment Configuration

TrackTales is configured for continuous serverless deployment on Vercel via `vercel.json`:
- API Route: `/api/(.*)` routes to `api/index.py` using `@vercel/python`.
- Static Asset Paths: `/js/`, `/css/`, `/images/`, `/videos/` route directly to `public/`.
- Guest Mode Route: `/guest` and `/guest.html` map directly to `public/guest.html`.
- SPA Fallback: `/(.*)` routes to `public/index.html`.

Deploy updates by pushing to the connected git repository or running:
```bash
vercel --prod
```

---

## Flagship Luxury Trains Comparison

| Train Line | Category | Speed and Duration | Key Route Stops | Signature Luxury Highlight |
| :--- | :--- | :--- | :--- | :--- |
| The Blue Train | Ultra Luxury Express | 90 km/h (31 Hours) | Pretoria -> Kimberley -> Cape Town | 24/7 Butler Service, Marble Baths, Fine Dining |
| Rovos Rail | Vintage Edwardian Safari | 60 km/h (48 Hours) | Pretoria -> Matjiesfontein -> Cape Town | Open Balcony Observation Car, Victorian Excursions |

---

## Project Structure

```
TrackTales/
├── main.py                          # FastAPI server entry point and REST endpoints
├── database.py                      # Database models, SQLite/Supabase operations, and auth helpers
├── auth.py                          # JWT token verification and dependency functions
├── api/
│   └── index.py                     # Vercel Python serverless entry point
├── public/
│   ├── index.html                   # Primary multi-page application with split auth modal
│   ├── guest.html                   # Dedicated Guest Mode portal with 21 attraction videos
│   ├── css/
│   │   └── styles.css               # WCAG AAA Light/Dark design system and animations
│   ├── js/
│   │   ├── app.js                   # Application router, splash logic, games, and UI controller
│   │   ├── translations-data.js     # Primary 16-language translation dictionaries
│   │   ├── guest-translations-data.js # Guest portal translation dictionaries
│   │   └── translation-engine.js    # Client-side translation engine
│   ├── images/                      # Optimized image assets and logos
│   └── videos/                      # 21 attraction videos and flagship train showcase reels
├── tests/
│   ├── auth_persistence.test.js     # Test suite for auth modal, persistence, and hero layout
│   └── guest_mode.test.js           # Test suite for guest mode, video assets, and translations
├── requirements.txt                 # Python backend dependencies
├── vercel.json                      # Vercel deployment routes and static rewrites
├── package.json                     # NPM scripts, test runner, and dependencies
├── start.sh                         # One-click startup script
└── README.md                        # Project documentation
```

---

Built for the Geekulcha Annual Hackathon ("Build for Use") celebrating South African railway history, scenic tourism, and digital accessibility.
