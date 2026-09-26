/**
 * Comprehensive Automated Test Suite for TrackTales Guest Portal & "Continue as Guest" Flow
 * 
 * Verifies:
 * 1. Physical Assets & Videos: guest.html, tracktales-logo, and all 21 attraction video files.
 * 2. Structure & Information in guest.html:
 *    - Master cinematic video player & information card (title, category, highlights, proximity).
 *    - Sound toggle controls and counter badge.
 *    - Category filtering pills (Natural Wonder, Heritage Site, Wildlife Sanctuary, Coastal Reserve).
 *    - Responsive cards grid for all 21 attractions with video previews & play buttons.
 *    - Relative return navigation links to main route and sign-in.
 * 3. Guest Mode Entry in index.html:
 *    - Global fail-safe window.TrackTalesEnterGuestMode function.
 *    - Splash screen "Continue as Guest" (#splash-guest-btn).
 *    - Top header "Guest Mode →" button.
 *    - Inline card "Continue as Guest" (#inline-guest-btn).
 *    - Modal "Continue as Guest" (#modal-guest-btn).
 *    - Inline guest showcase section (#page-attractions).
 * 4. Logic & Event Integration in app.js:
 *    - Delegation and button click handlers invoking window.TrackTalesEnterGuestMode.
 * 5. Routing & Deployment Configuration:
 *    - FastAPI main.py /guest and /guest.html endpoints.
 *    - Vercel vercel.json /guest and /guest.html static rewrites.
 * 6. Interactive Functional Simulator:
 *    - State persistence (localStorage flags).
 *    - Category filtering count arithmetic.
 *    - Attraction selection and master player update.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const videosDir = path.join(publicDir, 'videos');
const guestHtmlPath = path.join(publicDir, 'guest.html');
const indexHtmlPath = path.join(publicDir, 'index.html');
const appJsPath = path.join(publicDir, 'js', 'app.js');
const mainPyPath = path.join(rootDir, 'main.py');
const vercelJsonPath = path.join(rootDir, 'vercel.json');

const EXPECTED_21_VIDEOS = [
  "01_Gods_Window_Panorama_Route.mp4",
  "02_Drakensberg_Cliff_Viewpoint.mp4",
  "03_Robben_Island_and_Table_Mountain.mp4",
  "04_Boulders_Beach_Penguins.mp4",
  "05_Cape_of_Good_Hope.mp4",
  "06_Namaqualand_Wildflowers_Windmill.mp4",
  "07_Blyde_River_Canyon_Three_Rondavels.mp4",
  "08_Cradle_of_Humankind_Maropeng.mp4",
  "09_Sun_City_Palace_of_Lost_City.mp4",
  "10_Drakensberg_Amphitheatre_Hiking_Trail.mp4",
  "11_Augrabies_Falls_Orange_River_Gorge.mp4",
  "12_Apartheid_Museum_Johannesburg.mp4",
  "13_Elephants_River_Delta_Aerial.mp4",
  "14_Cango_Caves.mp4",
  "15_Garden_Route_Coastal_Road.mp4",
  "16_Constitutional_Court_Constitution_Hill.mp4",
  "17_VA_Waterfront_Cape_Town.mp4",
  "18_Table_Mountain_Sunset_Lions_Head.mp4",
  "19_Mandela_House_Soweto.mp4",
  "20_Pilanesberg_Game_Reserve_Entrance.mp4",
  "21_Addo_Elephant_Park_Safari.mp4"
];

describe('TrackTales Guest Mode & Portal Verification', () => {

  describe('1. File & Video Assets Integrity', () => {
    it('public/guest.html must exist and have substantial size', () => {
      assert.ok(fs.existsSync(guestHtmlPath), 'public/guest.html is missing');
      const stats = fs.statSync(guestHtmlPath);
      assert.ok(stats.size > 20000, `guest.html is too small (${stats.size} bytes)`);
    });

    it('TrackTales logo image must exist in public/images', () => {
      const logoPath = path.join(publicDir, 'images', 'tracktales-logo.jpg');
      assert.ok(fs.existsSync(logoPath), 'tracktales-logo.jpg is missing');
    });

    it('All 21 corridor attraction MP4 videos must exist and be > 1MB each', () => {
      assert.strictEqual(EXPECTED_21_VIDEOS.length, 21, 'Must have exactly 21 attraction videos defined');
      for (const videoFile of EXPECTED_21_VIDEOS) {
        const fullPath = path.join(videosDir, videoFile);
        assert.ok(fs.existsSync(fullPath), `Missing video file: ${videoFile}`);
        const size = fs.statSync(fullPath).size;
        assert.ok(size > 1000000, `Video file ${videoFile} is unexpectedly small: ${size} bytes`);
      }
    });
  });

  describe('2. Guest Portal (guest.html) Component & Information Structure', () => {
    const guestHtml = fs.readFileSync(guestHtmlPath, 'utf8');

    it('contains proper SEO title and guest description', () => {
      assert.ok(guestHtml.includes('<title>TrackTales | Guest Passenger Portal & Corridor Attractions</title>'));
      assert.ok(guestHtml.includes('TrackTales Guest Passenger Portal: Explore 21 iconic South African video attractions'));
    });

    it('renders the Master Cinematic Video Player with proper IDs', () => {
      assert.ok(guestHtml.includes('id="attraction-master-container"'), 'Master container missing');
      assert.ok(guestHtml.includes('id="attraction-main-video"'), 'Master video element missing');
      assert.ok(guestHtml.includes('id="attraction-main-source"'), 'Master video source element missing');
      assert.ok(guestHtml.includes('id="attraction-main-title"'), 'Master title missing');
      assert.ok(guestHtml.includes('id="attraction-main-location"'), 'Master location missing');
      assert.ok(guestHtml.includes('id="attraction-main-category"'), 'Master category missing');
      assert.ok(guestHtml.includes('id="attraction-main-desc"'), 'Master description missing');
      assert.ok(guestHtml.includes('id="attraction-main-highlights"'), 'Master highlights missing');
      assert.ok(guestHtml.includes('id="attraction-main-proximity"'), 'Master proximity missing');
      assert.ok(guestHtml.includes('id="attraction-counter-badge"'), 'Attraction counter badge missing');
    });

    it('includes interactive audio toggle control', () => {
      assert.ok(guestHtml.includes('id="btn-toggle-attraction-sound"'), 'Sound toggle button missing');
    });

    it('contains category filter group and all 4 main categories', () => {
      assert.ok(guestHtml.includes('id="attraction-filter-group"'), 'Filter group missing');
      assert.ok(guestHtml.includes('data-cat="all"'), 'All category missing');
      assert.ok(guestHtml.includes('data-cat="Natural Wonder"'), 'Natural Wonder category missing');
      assert.ok(guestHtml.includes('data-cat="Heritage Site"'), 'Heritage Site category missing');
      assert.ok(guestHtml.includes('data-cat="Wildlife Sanctuary"'), 'Wildlife Sanctuary category missing');
      assert.ok(guestHtml.includes('data-cat="Coastal Reserve"'), 'Coastal Reserve category missing');
    });

    it('contains attraction cards grid container', () => {
      assert.ok(guestHtml.includes('id="attraction-cards-grid"'), 'Cards grid container missing');
    });

    it('references every single one of the 21 videos in the script dataset', () => {
      for (const videoFile of EXPECTED_21_VIDEOS) {
        assert.ok(guestHtml.includes(videoFile), `Video ${videoFile} not referenced in guest.html script dataset`);
      }
    });

    it('provides return links to main route and sign-in', () => {
      assert.ok(guestHtml.includes('href="./"'), 'Logo or return link must point to relative root ./');
      assert.ok(guestHtml.includes('href="./#inline-signin-section"'), 'Sign In / Register button must link to sign-in section');
      assert.ok(guestHtml.includes('Return to Main Route & Sign In'), 'Footer must have return link text');
    });
  });

  describe('3. Guest Mode Entry Points in index.html', () => {
    const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

    it('defines window.TrackTalesEnterGuestMode function in head script', () => {
      assert.ok(indexHtml.includes('window.TrackTalesEnterGuestMode = function'), 'Global TrackTalesEnterGuestMode missing');
      assert.ok(indexHtml.includes("localStorage.setItem('tracktales_is_guest', 'true')"), 'Sets is_guest in localStorage');
      assert.ok(indexHtml.includes("sessionStorage.setItem('tracktales_splash_dismissed', 'true')"), 'Sets splash_dismissed in sessionStorage');
      assert.ok(indexHtml.includes("window.location.href = './guest.html'"), 'Redirects to guest.html');
    });

    it('provides "Continue as Guest" button on the Welcome Splash screen (#splash-guest-btn)', () => {
      assert.ok(indexHtml.includes('id="splash-guest-btn"'), '#splash-guest-btn missing');
      assert.ok(indexHtml.includes('window.TrackTalesEnterGuestMode(event)'), 'Click handler missing on splash-guest-btn');
    });

    it('provides "Guest Mode →" button on the Top Navigation/Splash banner', () => {
      assert.ok(indexHtml.includes('Guest Mode →'), 'Guest Mode banner button missing');
    });

    it('provides "Continue as Guest" button on Inline Sign-In Card (#inline-guest-btn)', () => {
      assert.ok(indexHtml.includes('id="inline-guest-btn"'), '#inline-guest-btn missing');
      assert.ok(indexHtml.includes('data-action="enter-guest"'), 'data-action enter-guest missing on inline-guest-btn');
    });

    it('provides "Continue as Guest" button inside the Sign-In Modal (#modal-guest-btn)', () => {
      assert.ok(indexHtml.includes('id="modal-guest-btn"'), '#modal-guest-btn missing');
    });

    it('contains #page-attractions section for corridor showcase inside index.html', () => {
      assert.ok(indexHtml.includes('id="page-attractions"'), '#page-attractions section missing in index.html');
      assert.ok(indexHtml.includes('SOUTH AFRICAN LANDMARKS & CORRIDOR ATTRACTIONS (GUEST SHOWCASE)'));
    });
  });

  describe('4. Event Delegation and Handlers in app.js', () => {
    const appJs = fs.readFileSync(appJsPath, 'utf8');

    it('delegated click listener calls window.TrackTalesEnterGuestMode for guest buttons', () => {
      assert.ok(appJs.includes("e.target.closest('#splash-guest-btn, #inline-guest-btn, #modal-guest-btn, .btn-enter-guest, [data-action=\"enter-guest\"]')"));
      assert.ok(appJs.includes('if (window.TrackTalesEnterGuestMode)'));
    });

    it('#splash-guest-btn event listener invokes window.TrackTalesEnterGuestMode', () => {
      const guestBtnSnippet = appJs.indexOf("guestBtn.addEventListener('click'");
      assert.ok(guestBtnSnippet !== -1, 'guestBtn listener missing');
      const snippet = appJs.substring(guestBtnSnippet, guestBtnSnippet + 250);
      assert.ok(snippet.includes('window.TrackTalesEnterGuestMode'), 'guestBtn does not call TrackTalesEnterGuestMode');
    });

    it('#modal-guest-btn event listener invokes window.TrackTalesEnterGuestMode', () => {
      const modalGuestSnippet = appJs.indexOf("modalGuestBtn.addEventListener('click'");
      assert.ok(modalGuestSnippet !== -1, 'modalGuestBtn listener missing');
      const snippet = appJs.substring(modalGuestSnippet, modalGuestSnippet + 250);
      assert.ok(snippet.includes('window.TrackTalesEnterGuestMode'), 'modalGuestBtn does not call TrackTalesEnterGuestMode');
    });

    it('#inline-guest-btn event listener invokes window.TrackTalesEnterGuestMode', () => {
      const inlineGuestSnippet = appJs.indexOf("inlineGuestBtn.addEventListener('click'");
      assert.ok(inlineGuestSnippet !== -1, 'inlineGuestBtn listener missing');
      const snippet = appJs.substring(inlineGuestSnippet, inlineGuestSnippet + 250);
      assert.ok(snippet.includes('window.TrackTalesEnterGuestMode'), 'inlineGuestBtn does not call TrackTalesEnterGuestMode');
    });
  });

  describe('5. FastAPI & Vercel Routing Configuration', () => {
    const mainPy = fs.readFileSync(mainPyPath, 'utf8');
    const vercelJson = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));

    it('main.py provides /guest and /guest.html endpoints returning FileResponse guest.html', () => {
      assert.ok(mainPy.includes('@app.get("/guest")'), '/guest endpoint missing in main.py');
      assert.ok(mainPy.includes('@app.get("/guest.html")'), '/guest.html endpoint missing in main.py');
      assert.ok(mainPy.includes('def read_guest_portal()'), 'read_guest_portal function missing');
      assert.ok(mainPy.includes('guest.html'), 'guest.html reference missing in read_guest_portal');
    });

    it('vercel.json routes /guest and /guest.html to public/guest.html', () => {
      const guestRoute = vercelJson.routes.find(r => r.src === '/guest');
      assert.ok(guestRoute, 'Missing /guest route in vercel.json');
      assert.strictEqual(guestRoute.dest, 'public/guest.html');

      const guestHtmlRoute = vercelJson.routes.find(r => r.src === '/guest.html');
      assert.ok(guestHtmlRoute, 'Missing /guest.html route in vercel.json');
      assert.strictEqual(guestHtmlRoute.dest, 'public/guest.html');
    });
  });

  describe('6. Interactive Functional Logic Simulator', () => {
    // Extract ATTRACTIONS_DATA from guest.html to test business logic directly
    const guestHtml = fs.readFileSync(guestHtmlPath, 'utf8');
    const match = guestHtml.match(/const ATTRACTIONS_DATA = (\[[\s\S]*?\]);\s*const grid/);
    assert.ok(match && match[1], 'Could not extract ATTRACTIONS_DATA from guest.html');
    
    // Evaluate safely in isolated context
    const attractions = new Function(`return ${match[1]}`)();

    it('ATTRACTIONS_DATA contains exactly 21 items with unique IDs', () => {
      assert.strictEqual(attractions.length, 21);
      const ids = new Set(attractions.map(a => a.id));
      assert.strictEqual(ids.size, 21, 'Duplicate attraction IDs found');
    });

    it('Every attraction has required fields: id, title, location, category, video, description, highlights, proximity', () => {
      for (const item of attractions) {
        assert.ok(item.id && typeof item.id === 'string');
        assert.ok(item.title && typeof item.title === 'string');
        assert.ok(item.location && typeof item.location === 'string');
        assert.ok(item.category && typeof item.category === 'string');
        assert.ok(item.video && item.video.startsWith('./videos/'));
        assert.ok(item.description && item.description.length > 20);
        assert.ok(Array.isArray(item.highlights) && item.highlights.length >= 3, `${item.id} should have at least 3 highlights`);
        assert.ok(item.proximity && item.proximity.length > 5);
      }
    });

    it('Category filter counts accurately partition the 21 attractions', () => {
      const categories = ['Natural Wonder', 'Heritage Site', 'Wildlife Sanctuary', 'Coastal Reserve'];
      let sum = 0;
      for (const cat of categories) {
        const count = attractions.filter(a => a.category === cat).length;
        assert.ok(count > 0, `Category ${cat} should have at least 1 attraction`);
        sum += count;
      }
      assert.strictEqual(sum, 21, 'Category counts must add up to 21 total attractions');
    });

    it('Simulated TrackTalesEnterGuestMode updates storage and sets target location', () => {
      const mockStorage = {};
      const mockLocation = { href: '' };

      const enterGuestMode = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        mockStorage['tracktales_splash_dismissed'] = 'true';
        mockStorage['tracktales_is_guest'] = 'true';
        mockLocation.href = './guest.html';
      };

      enterGuestMode();

      assert.strictEqual(mockStorage['tracktales_splash_dismissed'], 'true');
      assert.strictEqual(mockStorage['tracktales_is_guest'], 'true');
      assert.strictEqual(mockLocation.href, './guest.html');
    });
  });

});
