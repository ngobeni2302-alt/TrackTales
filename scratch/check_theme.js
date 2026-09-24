const fs = require('fs');

const js = fs.readFileSync('public/js/app.js', 'utf-8');
const html = fs.readFileSync('public/index.html', 'utf-8');
const css = fs.readFileSync('public/css/styles.css', 'utf-8');

console.log('--- Theme matches in JS ---');
const jsMatches = js.match(/.*theme.*/gi) || [];
console.log('JS theme lines count:', jsMatches.length);
console.log('First 5 JS theme lines:', jsMatches.slice(0, 5));

console.log('\n--- Theme toggle button in HTML ---');
const btnTheme = html.match(/.*theme.*/gi) || [];
console.log('HTML theme lines count:', btnTheme.length);
console.log('HTML theme snippets:', btnTheme.slice(0, 5));

console.log('\n--- Dark mode in CSS ---');
const cssDark = css.match(/.*dark.*/gi) || [];
console.log('CSS dark count:', cssDark.length);
console.log('First 5 CSS dark lines:', cssDark.slice(0, 5));
