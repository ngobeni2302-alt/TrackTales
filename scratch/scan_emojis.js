const fs = require('fs');
const files = ['public/index.html', 'public/js/app.js', 'public/css/styles.css', 'public/train_guide.html', 'public/admin.html', 'public/login.html'];
// Match all Unicode emoji characters, symbols, pictographs, transport symbols, etc.
const emojiRegex = /\p{Extended_Pictographic}|[★☆➔➜➤]/gu;

files.forEach(f => {
  if (fs.existsSync(f)) {
    const lines = fs.readFileSync(f, 'utf-8').split('\n');
    lines.forEach((line, idx) => {
      const matches = line.match(emojiRegex);
      if (matches) {
        console.log(`${f}:${idx + 1}: [${matches.join(', ')}] -> ${line.trim()}`);
      }
    });
  }
});
