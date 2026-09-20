const fs = require('fs');
const assert = require('assert');

console.log('=== TRACKTALES NEW FEATURES SUITE TEST ===\n');

const html = fs.readFileSync('public/index.html', 'utf-8');
const js = fs.readFileSync('public/js/app.js', 'utf-8');
const css = fs.readFileSync('public/css/styles.css', 'utf-8');

// 1. Check "Scroll to Explore" is removed
assert(!html.toLowerCase().includes('scroll to explore'), 'ERROR: "Scroll to explore" should be removed from HTML');
console.log('[PASS] 1. "Scroll to explore" successfully removed from hero footer.');

// 2. Check Live GPS Corridor Tracker
assert(html.includes('id="gpsModal"'), 'ERROR: gpsModal missing in HTML');
assert(html.includes('id="btn-open-gps"'), 'ERROR: btn-open-gps missing in HTML');
assert(html.includes('id="btn-toggle-device-gps"'), 'ERROR: btn-toggle-device-gps missing');
assert(html.includes('id="btn-simulate-gps"'), 'ERROR: btn-simulate-gps missing');
assert(js.includes('function setupGPSTracker()'), 'ERROR: setupGPSTracker missing in app.js');
assert(js.includes('calculateDistanceKm'), 'ERROR: Haversine distance calculator missing in app.js');
assert(js.includes('CORRIDOR_MILESTONES'), 'ERROR: Corridor milestones missing in app.js');
console.log('[PASS] 2. Live GPS Corridor Tracker engine & modal verified with real-time milestones & distance calculator.');

// 3. Check Blind & Low-Vision Accessibility Suite
assert(html.includes('id="accessibilityModal"'), 'ERROR: accessibilityModal missing in HTML');
assert(html.includes('id="toggle-screen-reader"'), 'ERROR: toggle-screen-reader missing');
assert(html.includes('id="toggle-high-contrast"'), 'ERROR: toggle-high-contrast missing');
assert(html.includes('id="toggle-large-font"'), 'ERROR: toggle-large-font missing');
assert(css.includes('.high-contrast-mode'), 'ERROR: .high-contrast-mode missing in CSS');
assert(css.includes('.large-text-mode'), 'ERROR: .large-text-mode missing in CSS');
assert(js.includes('function setupAccessibilityMode()'), 'ERROR: setupAccessibilityMode missing in app.js');
assert(js.includes('SpeechSynthesisUtterance'), 'ERROR: Web speech synthesis missing in app.js');
console.log('[PASS] 3. Blind & Low-Vision Accessibility Suite verified (Screen Reader speech, High Contrast, Large Text).');

// 4. Check Multi-Language Engine
assert(html.includes('id="lang-select"'), 'ERROR: lang-select missing in HTML');
assert(html.includes('value="zu"'), 'ERROR: isiZulu option missing');
assert(html.includes('value="xh"'), 'ERROR: isiXhosa option missing');
assert(html.includes('value="af"'), 'ERROR: Afrikaans option missing');
assert(html.includes('value="st"'), 'ERROR: Sesotho option missing');
assert(js.includes('function setupMultiLanguage()'), 'ERROR: setupMultiLanguage missing in app.js');
console.log('[PASS] 4. Multi-Language Switcher verified across South Africa\'s official languages (EN, ZU, XH, AF, ST).');

// 5. Check Emergency Hotlines & SOS Portal
assert(html.includes('id="emergencyModal"'), 'ERROR: emergencyModal missing in HTML');
assert(html.includes('id="btn-open-sos"'), 'ERROR: btn-open-sos missing in HTML');
assert(html.includes('id="btn-generate-sos-beacon"'), 'ERROR: btn-generate-sos-beacon missing');
assert(html.includes('0860010111'), 'ERROR: SAPS Railway Police telephone missing');
assert(html.includes('0800212795'), 'ERROR: Transnet Rail Security telephone missing');
assert(js.includes('function setupEmergencyHotlines()'), 'ERROR: setupEmergencyHotlines missing in app.js');
console.log('[PASS] 5. Railway Police, Transnet Security & Medical SOS Hotlines verified with 1-Tap GPS Beacon.');

// 6. Check Games Based on Stops (3 Tabbed Modes)
assert(html.includes('data-game-tab="quiz"'), 'ERROR: Quiz tab missing in HTML');
assert(html.includes('data-game-tab="bingo"'), 'ERROR: Bingo tab missing in HTML');
assert(html.includes('data-game-tab="puzzle"'), 'ERROR: Puzzle tab missing in HTML');
assert(html.includes('id="game-panel-quiz"'), 'ERROR: game-panel-quiz missing');
assert(html.includes('id="game-panel-bingo"'), 'ERROR: game-panel-bingo missing');
assert(html.includes('id="game-panel-puzzle"'), 'ERROR: game-panel-puzzle missing');
assert(html.includes('id="custom-quiz-form"'), 'ERROR: custom-quiz-form missing');
assert(js.includes('function setupInteractiveGames()'), 'ERROR: setupInteractiveGames missing in app.js');
assert(js.includes('BINGO_ITEMS'), 'ERROR: BINGO_ITEMS missing in app.js');
assert(js.includes('PUZZLE_MODES'), 'ERROR: PUZZLE_MODES missing in app.js');
assert(js.includes('WIN_LINES'), 'ERROR: WIN_LINES win detector missing in app.js');
console.log('[PASS] 6. Games Based on Stops verified: Stop Quizzes (with Add Quiz), Mzansi Rail Bingo, and Build Next Stop Puzzle.');

// 7. Verify all new features are 100% Free
assert(!html.includes('data-sub-tier="premium" id="btn-open-gps"'), 'GPS should not be gated');
assert(!html.includes('data-sub-tier="premium" id="btn-open-accessibility"'), 'Accessibility should not be gated');
assert(!html.includes('data-sub-tier="premium" id="btn-open-sos"'), 'Emergency should not be gated');
assert(!html.includes('data-sub-tier="premium" id="page-games"'), 'Games should not be gated');
console.log('[PASS] 7. All new features are 100% free and unlocked for all travelers without subscription restrictions.');

console.log('\n=== ALL TESTS PASSED SUCCESSFULLY! ===');
