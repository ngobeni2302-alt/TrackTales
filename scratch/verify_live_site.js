const http = require('http');

http.get('http://localhost:8000/', (res) => {
  console.log('HTTP STATUS:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('1. Hero mute/play buttons present:', data.includes('heroMuteBtn') || data.includes('heroPlayBtn'));
    console.log('2. Geekulcha / Hackathon present:', data.includes('Geekulcha') || data.includes('Hackathon 2026'));
    console.log('3. Dashed line SVG present:', data.includes('stroke-dasharray="6 6"'));
    console.log('4. Voice Log nav tab present:', data.includes('data-page="voice"'));
    console.log('5. Voice Studio panel section present:', data.includes('id="page-voice"'));
    console.log('6. Voice Visualizer Canvas present:', data.includes('id="voiceVisualizerCanvas"'));
    const emojiRegex = /\p{Extended_Pictographic}|[★☆➔➜➤]/gu;
    const matches = data.match(emojiRegex);
    console.log('7. Emojis found in index.html:', matches ? matches.length : 0);
  });
}).on('error', (err) => {
  console.error('HTTP Error:', err.message);
});
