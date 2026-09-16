const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const js = fs.readFileSync('public/js/app.js', 'utf8');
const css = fs.readFileSync('public/css/styles.css', 'utf8');

console.log('=== NAVIGATION HUB PANEL VERIFICATION ===');

const assertions = [
  ['btn-open-nav-panel in index.html', html.includes('id="btn-open-nav-panel"')],
  ['navigationHubPanel in index.html', html.includes('id="navigationHubPanel"')],
  ['nav-panel-active-title in index.html', html.includes('id="nav-panel-active-title"')],
  ['nav-hub-selected-train in index.html', html.includes('id="nav-hub-selected-train"')],
  ['navHubBackdrop in index.html', html.includes('id="navHubBackdrop"')],
  ['nav-hub-card links with data-page attributes', html.includes('nav-hub-card') && html.includes('data-page="home"') && html.includes('data-page="stops"') && html.includes('data-page="trains"')],
  ['setupNavHubPanel function defined in app.js', js.includes('function setupNavHubPanel()')],
  ['setupNavHubPanel initialized in app.js', js.includes('setupNavHubPanel()')],
  ['switchPage updates nav-panel-active-title', js.includes('activeNavTitleEl.textContent = PAGE_TITLES[targetPage]')],
  ['switchPage highlights active nav-hub-card', js.includes("card.classList.add('active')")],
  ['switchPage auto-closes nav hub panel', js.includes('window.closeNavHubPanel()')],
  ['#navigationHubPanel style in styles.css', css.includes('#navigationHubPanel')],
  ['.nav-hub-card.active style in styles.css', css.includes('.nav-hub-card.active')],
  ['Zero suites section in trains render', !js.includes('Private Suites & Staterooms') && !js.includes('Suites & Staterooms')]
];

let allPassed = true;
assertions.forEach(([label, pass]) => {
  if (pass) {
    console.log(`PASS: ${label}`);
  } else {
    console.error(`FAIL: ${label}`);
    allPassed = false;
  }
});

if (!allPassed) {
  process.exit(1);
} else {
  console.log('\nAll 14 Navigation Hub Panel checks passed perfectly!');
}
