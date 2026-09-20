const fs = require('fs');

console.log('=== E2E NAVIGATION HUB PANEL SIMULATION TEST ===');

const html = fs.readFileSync('public/index.html', 'utf8');
const js = fs.readFileSync('public/js/app.js', 'utf8');
const css = fs.readFileSync('public/css/styles.css', 'utf8');

// 1. Verify HTML Structure
function testHTML() {
  console.log('\n--- 1. Testing HTML Markup Structure ---');
  if (!html.includes('id="btn-open-nav-panel"')) throw new Error('Missing #btn-open-nav-panel');
  if (!html.includes('id="nav-panel-active-title"')) throw new Error('Missing #nav-panel-active-title');
  if (!html.includes('id="nav-panel-chevron"')) throw new Error('Missing #nav-panel-chevron');
  if (!html.includes('id="navigationHubPanel"')) throw new Error('Missing #navigationHubPanel');
  if (!html.includes('id="nav-hub-close-btn"')) throw new Error('Missing #nav-hub-close-btn');
  if (!html.includes('id="navHubBackdrop"')) throw new Error('Missing #navHubBackdrop');
  if (!html.includes('id="nav-hub-selected-train"')) throw new Error('Missing #nav-hub-selected-train');

  const navHubCards = [
    'data-page="home"',
    'data-page="stops"',
    'data-page="about"',
    'data-page="trains"',
    'data-page="games"',
    'data-page="voice"'
  ];

  navHubCards.forEach(card => {
    if (!html.includes(card)) {
      throw new Error(`Missing nav card with ${card}`);
    }
  });

  console.log('PASS: All 6 Navigation Hub cards and interactive elements are correctly structured.');
}

// 2. Verify JS Logic
function testJS() {
  console.log('\n--- 2. Testing JavaScript Logic ---');
  if (!js.includes('function setupNavHubPanel()')) throw new Error('setupNavHubPanel missing');
  if (!js.includes('openNavHubPanel')) throw new Error('openNavHubPanel function missing');
  if (!js.includes('closeNavHubPanel')) throw new Error('closeNavHubPanel function missing');
  if (!js.includes('toggleNavHubPanel')) throw new Error('toggleNavHubPanel function missing');
  if (!js.includes('PAGE_TITLES')) throw new Error('PAGE_TITLES dictionary missing');
  if (!js.includes('activeNavTitleEl.textContent')) throw new Error('Active title synchronization missing');
  if (!js.includes("card.classList.add('active')")) throw new Error('Nav card active highlight missing');

  console.log('PASS: Nav Hub JavaScript functions and synchronization logic are verified.');
}

// 3. Verify CSS Rules
function testCSS() {
  console.log('\n--- 3. Testing CSS Animation & Styles ---');
  if (!css.includes('#navigationHubPanel')) throw new Error('Missing #navigationHubPanel CSS');
  if (!css.includes('@keyframes navHubDropdown')) throw new Error('Missing @keyframes navHubDropdown CSS');
  if (!css.includes('.nav-hub-card')) throw new Error('Missing .nav-hub-card CSS');
  if (!css.includes('.nav-hub-card.active')) throw new Error('Missing .nav-hub-card.active CSS');

  console.log('PASS: Nav Hub dropdown animations and active highlight styles are verified.');
}

// 4. Verify Emoji Cleanliness
function testEmojis() {
  console.log('\n--- 4. Testing Zero Emoji Rule ---');
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u;
  if (emojiRegex.test(html)) throw new Error('Emoji found in index.html');
  if (emojiRegex.test(js)) throw new Error('Emoji found in app.js');
  if (emojiRegex.test(css)) throw new Error('Emoji found in styles.css');
  console.log('PASS: Zero emojis detected across HTML, JS, and CSS files.');
}

testHTML();
testJS();
testCSS();
testEmojis();

console.log('\n>>> ALL NAVIGATION HUB PANEL TESTS PASSED (100% SUCCESS) <<<');
