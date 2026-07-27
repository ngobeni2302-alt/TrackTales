const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const SEED_FILE = path.join(__dirname, '../db/seed.json');

// Memory DB initialized from seed data
let db = {
  routes: [],
  stops: [],
  stories: [],
  operators: [],
  sponsors: [],
  analytics_logs: []
};

// Load seed data into memory DB
function loadSeedData() {
  try {
    if (fs.existsSync(SEED_FILE)) {
      const raw = fs.readFileSync(SEED_FILE, 'utf8');
      db = JSON.parse(raw);
      if (!db.analytics_logs) db.analytics_logs = [];
      console.log('Seed data successfully loaded into memory DB');
    }
  } catch (err) {
    console.error('Error reading seed data file:', err);
  }
}

// Persist memory DB changes back to seed.json (to preserve Admin edits during hackathon demo)
function persistData() {
  try {
    fs.writeFileSync(SEED_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving updated data:', err);
  }
}

loadSeedData();

// --- PUBLIC CONTENT API ---

// 1. Get all routes
router.get('/routes', (req, res) => {
  res.json({ success: true, count: db.routes.length, data: db.routes });
});

// 2. Get specific route with its ordered stops
router.get('/routes/:id', (req, res) => {
  const routeId = parseInt(req.params.id, 10);
  const route = db.routes.find(r => r.id === routeId);
  if (!route) {
    return res.status(404).json({ success: false, error: 'Route not found' });
  }

  const stops = db.stops
    .filter(s => s.route_id === routeId)
    .sort((a, b) => a.sequence_order - b.sequence_order);

  res.json({ success: true, data: { ...route, stops } });
});

// 3. Get all stops
router.get('/stops', (req, res) => {
  const sortedStops = [...db.stops].sort((a, b) => a.sequence_order - b.sequence_order);
  res.json({ success: true, count: sortedStops.length, data: sortedStops });
});

// 4. Get stories for a specific stop
router.get('/stops/:stopId/stories', (req, res) => {
  const stopId = parseInt(req.params.stopId, 10);
  const stories = db.stories.filter(s => s.stop_id === stopId);
  res.json({ success: true, count: stories.length, data: stories });
});

// 5. Get all stories (filterable by category)
router.get('/stories', (req, res) => {
  const { category } = req.query;
  let stories = db.stories;
  if (category) {
    stories = stories.filter(s => s.category === category);
  }
  res.json({ success: true, count: stories.length, data: stories });
});

// 6. Get rail operators (Blue Train, Rovos, Shosholoza)
router.get('/operators', (req, res) => {
  res.json({ success: true, count: db.operators.length, data: db.operators });
});

// 7. Get sponsored listings
router.get('/sponsors', (req, res) => {
  res.json({ success: true, count: db.sponsors.length, data: db.sponsors });
});


// --- COMPANION MODE OFFLINE BUNDLE API ---

// 8. Offline Journey Pack Download Endpoint
// Returns a single self-contained JSON bundle with route polyline, geofenced stops, story cards & sponsor listings
router.get('/companion/journey-pack', (req, res) => {
  const routeId = parseInt(req.query.route_id || '1', 10);
  const route = db.routes.find(r => r.id === routeId) || db.routes[0];

  const stops = db.stops
    .filter(s => s.route_id === route.id)
    .sort((a, b) => a.sequence_order - b.sequence_order)
    .map(stop => {
      const stopStories = db.stories.filter(st => st.stop_id === stop.id);
      const stopSponsors = db.sponsors.filter(sp => sp.stop_id === stop.id);
      return {
        ...stop,
        stories: stopStories,
        sponsors: stopSponsors
      };
    });

  const journeyPack = {
    version: '1.0.0',
    generated_at: new Date().toISOString(),
    route: {
      id: route.id,
      name: route.name,
      code: route.code,
      origin: route.origin,
      destination: route.destination,
      distance_km: route.distance_km,
      polyline_coordinates: route.polyline_coordinates
    },
    stops: stops,
    operators: db.operators,
    offline_instructions: "GPS trigger calculations run entirely on-device using geofence_radius_km."
  };

  res.json({ success: true, bundle: journeyPack });
});

// 9. Analytics Ping (Logs triggered stories offline/online)
router.post('/analytics/ping', (req, res) => {
  const { story_id, stop_id, offline_sync, user_latitude, user_longitude, device_type } = req.body;
  
  const logEntry = {
    id: db.analytics_logs.length + 1,
    story_id: story_id ? parseInt(story_id, 10) : null,
    stop_id: stop_id ? parseInt(stop_id, 10) : null,
    triggered_at: new Date().toISOString(),
    offline_sync: !!offline_sync,
    user_latitude: user_latitude || null,
    user_longitude: user_longitude || null,
    device_type: device_type || 'web_companion'
  };

  db.analytics_logs.push(logEntry);
  persistData();

  res.json({ success: true, message: 'Analytics event recorded', log: logEntry });
});


// --- ADMIN CONTENT MANAGEMENT (CMS) API ---

// 10. Add / Update Stop
router.post('/admin/stops', (req, res) => {
  const { id, route_id, name, code, latitude, longitude, distance_along_route_km, geofence_radius_km, sequence_order, description, image_url } = req.body;
  
  if (id) {
    const idx = db.stops.findIndex(s => s.id === parseInt(id, 10));
    if (idx !== -1) {
      db.stops[idx] = { ...db.stops[idx], name, code, latitude: parseFloat(latitude), longitude: parseFloat(longitude), distance_along_route_km: parseFloat(distance_along_route_km), geofence_radius_km: parseFloat(geofence_radius_km), sequence_order: parseInt(sequence_order, 10), description, image_url };
    }
  } else {
    const newStop = {
      id: Date.now(),
      route_id: parseInt(route_id || '1', 10),
      name,
      code: code || name.substring(0, 3).toUpperCase(),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      distance_along_route_km: parseFloat(distance_along_route_km || '0'),
      geofence_radius_km: parseFloat(geofence_radius_km || '5'),
      sequence_order: db.stops.length + 1,
      description,
      image_url: image_url || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80'
    };
    db.stops.push(newStop);
  }

  persistData();
  res.json({ success: true, stops: db.stops });
});

// 11. Delete Stop
router.delete('/admin/stops/:id', (req, res) => {
  const stopId = parseInt(req.params.id, 10);
  db.stops = db.stops.filter(s => s.id !== stopId);
  db.stories = db.stories.filter(st => st.stop_id !== stopId);
  db.sponsors = db.sponsors.filter(sp => sp.stop_id !== stopId);

  persistData();
  res.json({ success: true, message: 'Stop deleted', stops: db.stops });
});

// 12. Add / Update Story
router.post('/admin/stories', (req, res) => {
  const { id, stop_id, title, subtitle, content, category, reading_time_mins, author, tags, image_url, audio_url } = req.body;
  
  if (id) {
    const idx = db.stories.findIndex(s => s.id === parseInt(id, 10));
    if (idx !== -1) {
      db.stories[idx] = { ...db.stories[idx], title, subtitle, content, category, reading_time_mins: parseInt(reading_time_mins || '3', 10), author, tags: Array.isArray(tags) ? tags : (tags ? tags.split(',') : []), image_url, audio_url };
    }
  } else {
    const newStory = {
      id: Date.now(),
      stop_id: parseInt(stop_id, 10),
      title,
      subtitle,
      content,
      category: category || 'history',
      reading_time_mins: parseInt(reading_time_mins || '3', 10),
      author: author || 'TrackTales Editorial',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',') : ['History']),
      image_url: image_url || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      audio_url
    };
    db.stories.push(newStory);
  }

  persistData();
  res.json({ success: true, stories: db.stories });
});

// 13. Delete Story
router.delete('/admin/stories/:id', (req, res) => {
  const storyId = parseInt(req.params.id, 10);
  db.stories = db.stories.filter(s => s.id !== storyId);
  persistData();
  res.json({ success: true, message: 'Story deleted', stories: db.stories });
});

// 14. Add / Update Sponsor Listing
router.post('/admin/sponsors', (req, res) => {
  const { id, stop_id, business_name, category, description, promo_offer, website_url, contact_email } = req.body;
  
  if (id) {
    const idx = db.sponsors.findIndex(sp => sp.id === parseInt(id, 10));
    if (idx !== -1) {
      db.sponsors[idx] = { ...db.sponsors[idx], business_name, category, description, promo_offer, website_url, contact_email };
    }
  } else {
    const newSponsor = {
      id: Date.now(),
      stop_id: parseInt(stop_id, 10),
      business_name,
      category,
      description,
      promo_offer,
      website_url,
      contact_email
    };
    db.sponsors.push(newSponsor);
  }

  persistData();
  res.json({ success: true, sponsors: db.sponsors });
});

// 15. Delete Sponsor
router.delete('/admin/sponsors/:id', (req, res) => {
  const sponsorId = parseInt(req.params.id, 10);
  db.sponsors = db.sponsors.filter(sp => sp.id !== sponsorId);
  persistData();
  res.json({ success: true, message: 'Sponsor deleted', sponsors: db.sponsors });
});

module.exports = router;
