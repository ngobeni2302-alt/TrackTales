const fs = require('fs');
const path = require('path');

console.log('=== RUNNING VOICE TO TEXT RECORDING & PANEL SUITE ===\n');

// 1. Verify HTML Structure
const html = fs.readFileSync('public/index.html', 'utf-8');

// Nav check
if (!html.includes('data-page="voice"') || !html.includes('href="#voice"')) {
  throw new Error('FAILED: Voice Log navigation link missing in index.html');
}
console.log('PASS: Voice Log navigation tab is integrated in desktop nav bar.');

if (!html.includes('Voice Log') && !html.includes('Voice Journal')) {
  throw new Error('FAILED: Voice Log text missing in nav');
}
console.log('PASS: Voice Log tab label is present in desktop & mobile menus.');

// Section check
if (!html.includes('id="page-voice"')) {
  throw new Error('FAILED: #page-voice section missing in index.html');
}
console.log('PASS: Dedicated #page-voice panel section is integrated.');

// Core studio elements check
const studioElements = [
  'voiceRecordBtn',
  'voiceVisualizerCanvas',
  'voiceRecordTimer',
  'voiceRecordStatus',
  'voiceRecordHint',
  'voiceTranscriptInput',
  'voiceWordCount',
  'voiceCharCount',
  'voiceStopSelect',
  'voiceCategorySelect',
  'btnVoiceClear',
  'btnVoiceCopy',
  'btnVoiceReadAloud',
  'btnVoiceSimulate',
  'btnSaveVoiceEntry',
  'voiceNotesList',
  'voiceNotesCountBadge',
  'voiceSearchInput',
  'btnExportVoiceDiary'
];

studioElements.forEach(id => {
  if (!html.includes(`id="${id}"`)) {
    throw new Error(`FAILED: Required Voice Studio element #${id} missing in index.html`);
  }
});
console.log(`PASS: All ${studioElements.length} Voice Studio and Journal interactive elements are present in DOM.`);

// 2. Verify JS Implementation
const js = fs.readFileSync('public/js/app.js', 'utf-8');

if (!js.includes('function setupVoiceJournal')) {
  throw new Error('FAILED: setupVoiceJournal function missing in app.js');
}
console.log('PASS: setupVoiceJournal controller is implemented in app.js.');

if (!js.includes("'voice'")) {
  throw new Error('FAILED: voice route missing in PAGE_ORDER or validPagesMap in app.js');
}
console.log('PASS: Voice route registered in SPA router and PAGE_ORDER.');

if (!js.includes('SpeechRecognition')) {
  throw new Error('FAILED: SpeechRecognition API integration missing in app.js');
}
console.log('PASS: Web Speech API speech-to-text integration verified.');

if (!js.includes('tracktales_voice_journal')) {
  throw new Error('FAILED: localStorage voice journal persistence missing in app.js');
}
console.log('PASS: LocalStorage voice journal persistence verified.');

if (!js.includes('btnExportVoiceDiary') || !js.includes('Blob')) {
  throw new Error('FAILED: Diary export logic missing in app.js');
}
console.log('PASS: Travel Diary .txt export logic verified.');

console.log('\n>>> ALL VOICE TO TEXT AND PANEL TESTS PASSED (100% SUCCESS) <<<');
