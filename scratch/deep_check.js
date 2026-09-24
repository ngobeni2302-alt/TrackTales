const fs = require('fs');

const js = fs.readFileSync('public/js/app.js', 'utf-8');
const html = fs.readFileSync('public/index.html', 'utf-8');

console.log('--- Checking Video for Train ---');
const videoMatches = js.match(/video.*src|src.*mp4/gi);
console.log(videoMatches ? videoMatches.slice(0, 10) : 'None');

console.log('\n--- Checking Stop Touch Modal Video ---');
const stopVideoModal = /stop.*video|video.*modal|play.*touch|modal.*video/gi.test(js);
console.log('Stop Video Modal:', stopVideoModal);

console.log('\n--- Checking Stories Section ---');
const storiesIdx = html.indexOf('id="stories"');
if (storiesIdx !== -1) {
  console.log('Stories HTML snippet:', html.slice(storiesIdx, storiesIdx + 500));
}

console.log('\n--- Checking Rail Track Panel ---');
const railIdx = html.indexOf('rail');
console.log('Rail in HTML:', railIdx !== -1);
if (railIdx !== -1) {
  console.log('Rail snippet:', html.slice(railIdx, railIdx + 200));
}
