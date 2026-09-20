const http = require('http');

http.get('http://localhost:8000/', (res) => {
  console.log(`Server HTTP Status: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`Received ${data.length} bytes.`);
    const hasGPS = data.includes('id="gpsModal"');
    const hasAccess = data.includes('id="accessibilityModal"');
    const hasSOS = data.includes('id="emergencyModal"');
    const hasGames = data.includes('id="games-mode-tabs"');
    const hasScrollToExplore = data.toLowerCase().includes('scroll to explore');

    console.log(`Contains gpsModal: ${hasGPS}`);
    console.log(`Contains accessibilityModal: ${hasAccess}`);
    console.log(`Contains emergencyModal: ${hasSOS}`);
    console.log(`Contains games-mode-tabs: ${hasGames}`);
    console.log(`Contains "Scroll to explore" (should be false): ${hasScrollToExplore}`);

    if (res.statusCode === 200 && hasGPS && hasAccess && hasSOS && hasGames && !hasScrollToExplore) {
      console.log('\n[SUCCESS] Live server is responding with all requested features perfectly!');
      process.exit(0);
    } else {
      console.error('\n[FAILURE] Missing components on live server.');
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('Server request error:', err.message);
  process.exit(1);
});
