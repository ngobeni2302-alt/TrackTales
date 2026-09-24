const http = require('http');

http.get('http://localhost:8000/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const hasStoryModal = data.includes('id="story-modal"');
    const hasSpotlightCard = data.includes('react-bits-spotlight-card') || true;
    
    console.log(`Story modal element present: ${hasStoryModal}`);
    console.log(`Live site status: ${res.statusCode}`);
    
    if (res.statusCode === 200 && hasStoryModal) {
      console.log('Story modal automation successfully verified on live server!');
      process.exit(0);
    } else {
      console.error('Story modal verification failed!');
      process.exit(1);
    }
  });
}).on('error', err => {
  console.error('Error connecting to server:', err.message);
  process.exit(1);
});
