const fs = require('fs');
const path = require('path');

// Simple DOM Mock Environment for Node.js
class ElementMock {
  constructor(tagName, id = '') {
    this.tagName = tagName;
    this.id = id;
    this.className = '';
    this.classList = {
      add: (...cls) => {
        const set = new Set(this.className.split(' ').filter(Boolean));
        cls.forEach(c => set.add(c));
        this.className = Array.from(set).join(' ');
      },
      remove: (...cls) => {
        const set = new Set(this.className.split(' ').filter(Boolean));
        cls.forEach(c => set.delete(c));
        this.className = Array.from(set).join(' ');
      },
      contains: (c) => this.className.split(' ').includes(c)
    };
    this.children = [];
    this.parentElement = null;
    this.innerHTMLValue = '';
    this.textContentValue = '';
    this.attributes = {};
    this.eventListeners = {};
    this.style = {};
  }

  get textContent() {
    if (this.textContentValue) return this.textContentValue;
    if (this.innerHTMLValue) return this.innerHTMLValue.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
    return this.children.map(c => c.textContent).join(' ');
  }

  set textContent(val) {
    this.textContentValue = val;
    this.innerHTMLValue = val;
  }

  get innerHTML() {
    return this.innerHTMLValue;
  }

  set innerHTML(val) {
    this.innerHTMLValue = val;
    this.textContentValue = '';
  }

  setAttribute(k, v) {
    this.attributes[k] = v;
  }

  getAttribute(k) {
    return this.attributes[k] || null;
  }

  querySelector(sel) {
    return this.querySelectorAll(sel)[0] || null;
  }

  querySelectorAll(sel) {
    const results = [];
    const check = (el) => {
      if (sel.startsWith('#') && el.id === sel.slice(1)) results.push(el);
      else if (sel.startsWith('.') && el.classList.contains(sel.slice(1))) results.push(el);
      else if (sel.toLowerCase() === el.tagName.toLowerCase()) results.push(el);
      else if (sel.includes('[') && sel.includes(']')) {
        const match = sel.match(/\[([a-zA-Z0-9_-]+)="?([^"\]]+)"?\]/);
        if (match && el.getAttribute(match[1]) === match[2]) results.push(el);
        const attrOnly = sel.match(/\[([a-zA-Z0-9_-]+)\]/);
        if (attrOnly && el.getAttribute(attrOnly[1])) results.push(el);
      }
      el.children.forEach(check);
    };
    this.children.forEach(check);
    return results;
  }

  addEventListener(evt, fn) {
    if (!this.eventListeners[evt]) this.eventListeners[evt] = [];
    this.eventListeners[evt].push(fn);
  }

  scrollIntoView() {}
}

const elementsById = {};

function createEl(tag, id, parent = null) {
  const el = new ElementMock(tag, id);
  el.parentElement = parent;
  if (id) elementsById[id] = el;
  if (parent) parent.children.push(el);
  return el;
}

// Build Document Mock Structure
const root = createEl('body', 'body');
const navBadge = createEl('div', 'nav-train-badge', root);
const navBadgeIcon = createEl('i', '', navBadge);
const navLabel = createEl('span', 'nav-train-label', navBadge);

const mobileBadge = createEl('div', 'mobile-train-badge', root);
const mobileLabel = createEl('span', 'mobile-train-label', mobileBadge);

const heroCatTag = createEl('span', 'hero-category-tag', root);
const heroDesc = createEl('p', 'hero-train-description', root);
const heroStats = createEl('div', 'hero-train-stats', root);

const trainsContainer = createEl('div', 'trains-container', root);
const trainsBadgeParent = createEl('div', 'trains-active-badge-tag', root);
const trainsBadge = createEl('span', 'trains-section-badge', trainsBadgeParent);
const trainsTitle = createEl('h2', 'trains-section-title', root);
const trainsSubtitle = createEl('p', 'trains-section-subtitle', root);

const storiesContainer = createEl('div', 'stories-container', root);
const storiesTitle = createEl('h2', 'stories-section-title', root);
const storiesSubtitle = createEl('p', 'stories-section-subtitle', root);

const stopsGrid = createEl('div', 'corridor-stops-grid', root);
const corridorTagParent = createEl('div', 'stops-corridor-tag-container', root);
const corridorTag = createEl('span', 'stops-corridor-tag', corridorTagParent);
const corridorSubtitle = createEl('p', 'stops-corridor-subtitle', root);

const splashModal = createEl('div', 'train-loading-splash', root);

const localStorageMock = {
  data: { 'tracktales_selected_train': 'blue-train' },
  getItem: (k) => localStorageMock.data[k] || null,
  setItem: (k, v) => { localStorageMock.data[k] = v; },
  removeItem: (k) => { delete localStorageMock.data[k]; },
  clear: () => { localStorageMock.data = {}; }
};

const domListeners = [];

global.document = {
  getElementById: (id) => elementsById[id] || null,
  querySelectorAll: (sel) => root.querySelectorAll(sel),
  querySelector: (sel) => root.querySelector(sel),
  addEventListener: (evt, fn) => {
    if (evt === 'DOMContentLoaded') domListeners.push(fn);
  },
  body: root
};
global.window = {
  localStorage: localStorageMock,
  lucide: { createIcons: () => {} },
  location: { href: '/' },
  addEventListener: () => {}
};
global.lucide = { createIcons: () => {} };
global.localStorage = localStorageMock;

// Load app code
const appCode = fs.readFileSync(path.join(__dirname, '../public/js/app.js'), 'utf-8');
eval(appCode);

// Trigger DOMContentLoaded
domListeners.forEach(fn => fn());

async function runTests() {
  console.log('--- 1. Testing Initial Render for Blue Train ---');
  if (typeof window.TrackTalesSetSelectedTrain === 'function') {
    window.TrackTalesSetSelectedTrain('blue-train');
  }

  console.log('Nav Train Label:', navLabel.textContent);
  if (!navLabel.textContent.includes('The Blue Train')) throw new Error('Failed nav label: ' + navLabel.textContent);

  console.log('Hero Category Tag:', heroCatTag.textContent);
  if (!heroCatTag.textContent.includes('THE BLUE TRAIN')) throw new Error('Failed hero tag');

  console.log('Modes Title:', trainsTitle.textContent);
  console.log('Modes Content preview:', trainsContainer.innerHTML.slice(0, 120));
  if (!trainsContainer.innerHTML.includes('Luxury Suite') || !trainsContainer.innerHTML.includes('De Luxe Suite')) {
    throw new Error('Failed Blue Train suites');
  }
  if (trainsContainer.innerHTML.includes('Royal Suite')) {
    throw new Error('Rovos Rail suites appeared in Blue Train view');
  }

  console.log('Stories Content preview:', storiesContainer.innerHTML.slice(0, 120));
  if (!storiesContainer.innerHTML.includes('The Blue Train Legacy')) {
    throw new Error('Failed Blue Train stories');
  }
  if (storiesContainer.innerHTML.includes('Rohan Vos & The Legend of Rovos Rail')) {
    throw new Error('Rovos Rail stories appeared in Blue Train stories');
  }

  console.log('Stops Corridor Tag:', corridorTag.textContent);
  if (!corridorTag.textContent.includes('THE BLUE TRAIN')) {
    throw new Error('Failed corridor stops tag');
  }

  console.log('\n--- 2. Testing Switch to Rovos Rail ---');
  window.TrackTalesSetSelectedTrain('rovos-rail');

  console.log('Nav Train Label after switch:', navLabel.textContent);
  if (!navLabel.textContent.includes('Rovos Rail')) throw new Error('Failed nav label for Rovos');

  console.log('Hero Category Tag after switch:', heroCatTag.textContent);
  if (!heroCatTag.textContent.includes('ROVOS RAIL SAFARI')) throw new Error('Failed hero tag for Rovos');

  console.log('Modes Title after switch:', trainsTitle.textContent);
  if (!trainsContainer.innerHTML.includes('Royal Suite') || !trainsContainer.innerHTML.includes('Pullman Suite')) {
    throw new Error('Failed Rovos Rail suites');
  }
  if (trainsContainer.innerHTML.includes('Luxury Suite')) {
    throw new Error('Blue Train suites appeared in Rovos Rail view');
  }

  console.log('Stories Content after switch:', storiesContainer.innerHTML.slice(0, 120));
  if (!storiesContainer.innerHTML.includes('Rohan Vos & The Legend of Rovos Rail')) {
    throw new Error('Failed Rovos Rail stories');
  }
  if (storiesContainer.innerHTML.includes('The Blue Train Legacy')) {
    throw new Error('Blue Train stories appeared in Rovos Rail stories');
  }

  console.log('Stops Corridor Tag after switch:', corridorTag.textContent);
  if (!corridorTag.textContent.includes('ROVOS RAIL SAFARI')) {
    throw new Error('Failed corridor stops tag for Rovos');
  }

  console.log('\n>>> SUCCESS! All views strictly and exclusively display only the selected train information! <<<');
}

runTests().catch(e => {
  console.error('Test Failed:', e);
  process.exit(1);
});
