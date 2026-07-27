const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'TrackTales Content API', timestamp: new Date().toISOString() });
});

// Serve static frontend build if dist folder exists
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Express 5 wildcard fallback route using regex match
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.send('TrackTales Backend API is running. Access /api/routes or run Vite dev frontend.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚂 TrackTales Content API Server running on port ${PORT}`);
  console.log(`📡 Endpoints available: http://localhost:${PORT}/api/routes`);
  console.log(`📦 Offline Journey Pack: http://localhost:${PORT}/api/companion/journey-pack`);
});
