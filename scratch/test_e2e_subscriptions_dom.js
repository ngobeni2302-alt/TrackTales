// E2E DOM test verifying all 4 subscription plans, locked/unlocked states, and train-specific dossiers
const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'app.js'), 'utf8');

// Mock browser globals
global.window = global;
global.document = {
  _elements: {},
  getElementById(id) {
    if (!this._elements[id]) {
      this._elements[id] = {
        id,
        className: '',
        classList: {
          classes: new Set(),
          add(...c) { c.forEach(x => this.classes.add(x)); },
          remove(...c) { c.forEach(x => this.classes.delete(x)); },
          contains(x) { return this.classes.has(x); }
        },
        innerHTML: '',
        textContent: '',
        style: {},
        attributes: {},
        setAttribute(k, v) { this.attributes[k] = v; },
        getAttribute(k) { return this.attributes[k]; },
        querySelector() { return null; },
        querySelectorAll() { return []; },
        addEventListener(event, fn) { this[`on${event}`] = fn; }
      };
    }
    return this._elements[id];
  },
  querySelectorAll() { return []; },
  addEventListener() {}
};

global.localStorage = {
  store: {},
  getItem(k) { return this.store[k] || null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; },
  clear() { this.store = {}; }
};

global.alert = function (msg) {
  console.log(`[ALERT] ${msg}`);
};

global.lucide = {
  createIcons() {}
};

// Execute app.js
eval(appJs);

console.log("=== RUNNING SUBSCRIPTION MATRIX TESTS ===");

const renderSub = window.TrackTalesRenderSubscriptionFeatures;
if (typeof renderSub !== 'function') {
  console.error("FAIL: window.TrackTalesRenderSubscriptionFeatures is not defined!");
  process.exit(1);
}

// TEST 1: Free Plan
console.log("\n[TEST 1] Verifying FREE PLAN (R0)");
renderSub('free', 'blue-train');
const vaultSec = document.getElementById('premium-vault-section');
const audioSec = document.getElementById('audio-companion-section');
const masterSec = document.getElementById('master-historian-section');
const statusBarName = document.getElementById('stories-active-sub-name');

if (vaultSec.innerHTML.includes('LOCKED FEATURE · PREMIUM JOURNEY PACK')) {
  console.log("PASS: Historical Vault is properly LOCKED for Free plan.");
} else {
  console.error("FAIL: Historical Vault should be locked for Free plan!");
  process.exit(1);
}

if (audioSec.innerHTML.includes('LOCKED FEATURE · AUDIO EXPERIENCE')) {
  console.log("PASS: Audio Companion is properly LOCKED for Free plan.");
} else {
  console.error("FAIL: Audio Companion should be locked for Free plan!");
  process.exit(1);
}

if (masterSec.innerHTML.includes('Master Historian Challenge (+250 PTS) Locked')) {
  console.log("PASS: Master Historian Challenge is properly LOCKED for Free plan.");
} else {
  console.error("FAIL: Master Historian Challenge should be locked for Free plan!");
  process.exit(1);
}

if (statusBarName.textContent.includes('Free Journey (R0)')) {
  console.log("PASS: Status bar displays 'Free Journey (R0)'.");
} else {
  console.error("FAIL: Status bar incorrect:", statusBarName.textContent);
  process.exit(1);
}

// TEST 2: Premium Journey Pack (R79)
console.log("\n[TEST 2] Verifying PREMIUM JOURNEY PACK (R79)");
renderSub('premium-pack', 'blue-train');
if (vaultSec.innerHTML.includes('PREMIUM ARCHIVAL VAULT UNLOCKED') && vaultSec.innerHTML.includes('1946 Wartime Gold Bullion Secret Runs')) {
  console.log("PASS: Historical Vault is UNLOCKED with Blue Train 1946 Gold Bullion dossiers!");
} else {
  console.error("FAIL: Historical Vault should be unlocked with Blue Train dossiers!");
  process.exit(1);
}

if (audioSec.innerHTML.includes('LOCKED FEATURE · AUDIO EXPERIENCE')) {
  console.log("PASS: Audio Companion remains LOCKED for Premium Pack only.");
} else {
  console.error("FAIL: Audio Companion should remain locked for Premium Pack!");
  process.exit(1);
}

if (masterSec.innerHTML.includes('Master Historian Challenge (+250 PTS)') && masterSec.innerHTML.includes('The 24K Gold Glazing')) {
  console.log("PASS: Master Historian Challenge is UNLOCKED with Blue Train trivia!");
} else {
  console.error("FAIL: Master Historian Challenge should be unlocked for Premium Pack!");
  process.exit(1);
}

// TEST 3: Audio Experience (R49)
console.log("\n[TEST 3] Verifying AUDIO EXPERIENCE (R49)");
renderSub('audio-exp', 'rovos-rail');
if (vaultSec.innerHTML.includes('LOCKED FEATURE · PREMIUM JOURNEY PACK')) {
  console.log("PASS: Historical Vault is LOCKED for Audio Experience plan.");
} else {
  console.error("FAIL: Historical Vault should be locked for Audio Experience!");
  process.exit(1);
}

if (audioSec.innerHTML.includes('AUDIO EXPERIENCE PASS ACTIVE') && audioSec.innerHTML.includes('Narrator James') && audioSec.innerHTML.includes('Ambient Soundscape Mixer')) {
  console.log("PASS: Audio Companion is UNLOCKED with voice selectors, equalizer, and soundscape mixer!");
} else {
  console.error("FAIL: Audio Companion should be unlocked for Audio Experience!");
  process.exit(1);
}

// TEST 4: Future Membership / VIP Pass (R149)
console.log("\n[TEST 4] Verifying FUTURE MEMBERSHIP / VIP PASS (R149)");
renderSub('membership', 'rovos-rail');
if (vaultSec.innerHTML.includes('PREMIUM ARCHIVAL VAULT UNLOCKED') && vaultSec.innerHTML.includes('The Witbank Steam Graveyard Resurrection')) {
  console.log("PASS: Historical Vault is UNLOCKED with Rovos Rail Witbank Steam Graveyard dossiers!");
} else {
  console.error("FAIL: Historical Vault should be unlocked for VIP Membership!");
  process.exit(1);
}

if (audioSec.innerHTML.includes('AUDIO EXPERIENCE PASS ACTIVE')) {
  console.log("PASS: Audio Companion is UNLOCKED simultaneously for VIP Membership!");
} else {
  console.error("FAIL: Audio Companion should be unlocked for VIP Membership!");
  process.exit(1);
}

if (masterSec.innerHTML.includes('Steam Graveyard Salvage')) {
  console.log("PASS: Master Historian Challenge is UNLOCKED with Rovos Rail trivia for VIP Membership!");
} else {
  console.error("FAIL: Master Historian Challenge should be unlocked for VIP Membership!");
  process.exit(1);
}

console.log("\n>>> ALL 4 SUBSCRIPTION PLAN MATRIX TESTS PASSED WITH 100% ACCURACY! <<<");
