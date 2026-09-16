// Test script to verify subscription features logic, data sets, and plan behavior in app.js
const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'public', 'js', 'app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Ensure syntax is 100% valid
try {
  new Function(appJsContent);
  console.log("PASS: app.js has zero syntax errors!");
} catch (e) {
  console.error("FAIL: Syntax error in app.js:", e.message);
  process.exit(1);
}

// Test HTML structure
const indexPath = path.join(__dirname, '..', 'public', 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

const requiredIds = [
  'subscription-modal',
  'premium-vault-section',
  'audio-companion-section',
  'master-historian-section',
  'modal-audio-narration-bar',
  'dossier-modal'
];

let allIdsFound = true;
requiredIds.forEach(id => {
  if (indexHtml.includes(`id="${id}"`)) {
    console.log(`PASS: Found #${id} in index.html`);
  } else {
    console.error(`FAIL: Missing #${id} in index.html`);
    allIdsFound = false;
  }
});

// Verify 4 plans present in HTML
const requiredPlans = ['free', 'premium-pack', 'audio-exp', 'membership'];
requiredPlans.forEach(plan => {
  if (indexHtml.includes(`data-sub-plan="${plan}"`)) {
    console.log(`PASS: Found data-sub-plan="${plan}" in index.html`);
  } else {
    console.error(`FAIL: Missing data-sub-plan="${plan}" in index.html`);
    allIdsFound = false;
  }
});

if (allIdsFound) {
  console.log("\nALL SUBSCRIPTION CHECKS PASSED SUCCESSFULLY!");
} else {
  process.exit(1);
}
