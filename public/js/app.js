/* ==========================================================================
   TrackTales - Client Application JavaScript
   Features: Dynamic API Integration, Fallback Data, Interactive Route Map,
             Web Audio API Rail Soundscape, Ticket Generator, Story Reader Modal
   ========================================================================== */

(function () {
  'use strict';

  // --- Fallback Data (Guarantees app works offline or when opened directly in browser) ---
  const FALLBACK_TRAINS = [
    {
      id: "blue-train",
      name: "The Blue Train",
      tagline: "A Window to the Soul of South Africa",
      category: "Ultra Luxury Express",
      speed: "90 km/h",
      duration: "31 Hours",
      route_summary: "Pretoria ➔ Kimberley ➔ Cape Town",
      primary_color: "#005691",
      description: "The Blue Train has been synonymous with luxury rail travel since 1946. Experience 24/7 butler service, marble bathrooms, and gourmet fine dining across 1,600 km.",
      highlights: ["Butler Service", "Marble En-suite Baths", "5-Course Fine Dining", "Kimberley Big Hole Tour"],
      image_url: "https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "rovos-rail",
      name: "Rovos Rail",
      tagline: "The Most Luxurious Train in the World",
      category: "Vintage Edwardian Safari",
      speed: "60 km/h",
      duration: "48 Hours",
      route_summary: "Pretoria ➔ Highveld ➔ Matjiesfontein ➔ Cape Town",
      primary_color: "#0e382c",
      description: "Recapturing the romance of a bygone era with restored 1920s Edwardian wood-paneled suites, open observation cars, and formal gala dinners.",
      highlights: ["Open Balcony Carriage", "Formal Dress Dinners", "Matjiesfontein Excursion", "High Tea Lounge"],
      image_url: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "shosholoza-meyl",
      name: "Shosholoza Meyl",
      tagline: "The Soul of Mzansi Passenger Express",
      category: "Authentic Passenger & Tourist Rail",
      speed: "80 km/h",
      duration: "26 Hours",
      route_summary: "Pretoria ➔ Johannesburg ➔ Kimberley ➔ Worcester ➔ Cape Town",
      primary_color: "#0088cc",
      description: "Connecting everyday South Africans and curious travelers across Mzansi with comfortable sleeper compartments and authentic local cuisine.",
      highlights: ["Affordable Sleeper Berths", "Communal Dining Car", "Karoo Vistas", "Warm Mzansi Hospitality"],
      image_url: "https://images.unsplash.com/photo-1515165562839-978bbcf18277?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const FALLBACK_STOPS = [
    {
      id: "pretoria",
      stop_number: 1,
      name: "Pretoria (Capital Park & Park Station)",
      province: "Gauteng Province",
      distance_km: 0,
      description: "The Jacaranda City and northern terminus of the Pretoria to Cape Town rail corridor. Home to historic Victorian rail yards and grand sandstone architecture.",
      train_calls: "The Blue Train, Rovos Rail, Shosholoza Meyl",
      stay: "1-2 Days Departure Hub",
      local_dish: "Gauteng Style Braai & Chakalaka paired with Craft Lager",
      img: "https://images.unsplash.com/photo-1577971132997-c10be9372519?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "johannesburg",
      stop_number: 2,
      name: "Johannesburg (Egoli / City of Gold)",
      province: "Gauteng Province",
      distance_km: 60,
      description: "South Africa's economic powerhouse born during the 1886 gold rush. A vibrant metropolis of art, history, and urban energy.",
      train_calls: "Shosholoza Meyl",
      stay: "1 Day Transit",
      local_dish: "Kota (Spatlo) & Rooibos Iced Tea",
      img: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "kimberley",
      stop_number: 3,
      name: "Kimberley (The Diamond City)",
      province: "Northern Cape Province",
      distance_km: 645,
      description: "Famous worldwide for the 1870s Diamond Rush. Home to 'The Big Hole'—the largest hand-dug excavation on earth—and vintage tramways.",
      train_calls: "The Blue Train, Rovos Rail, Shosholoza Meyl",
      stay: "Stopover Tour (3-4 Hours)",
      local_dish: "Northern Cape Biltong & Kalahari Truffle Tart",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "matjiesfontein",
      stop_number: 4,
      name: "Matjiesfontein (Karoo Oasis)",
      province: "Western Cape Province",
      distance_km: 1300,
      description: "A fairytale Victorian village frozen in time in the Great Karoo desert. Founded in 1884 as a railway refreshment stop.",
      train_calls: "The Blue Train, Rovos Rail",
      stay: "Excursion Stop (2-3 Hours)",
      local_dish: "Karoo Roast Lamb with Rosemary & Port Wine",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "worcester",
      stop_number: 5,
      name: "Worcester & Hex River Valley",
      province: "Western Cape Province",
      distance_km: 1480,
      description: "Gateway to the Cape Winelands nestled beneath majestic mountain peaks and lush table grape vineyards.",
      train_calls: "Shosholoza Meyl",
      stay: "Scenic Valley Transit",
      local_dish: "Cape Winelands Pinotage & Dried Fruit Platter",
      img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "cape-town",
      stop_number: 6,
      name: "Cape Town (The Mother City)",
      province: "Western Cape Province",
      distance_km: 1600,
      description: "The spectacular coastal terminus. Framed by Table Mountain, Atlantic oceans, colorful heritage quarters, and world-class culinary scenes.",
      train_calls: "The Blue Train, Rovos Rail, Shosholoza Meyl",
      stay: "Final Destination / 3-5 Days",
      local_dish: "Traditional Cape Malay Bobotie & Snoek Braai with Chenin Blanc",
      img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const FALLBACK_ATTRACTIONS = [
    { id: "a1", city: "pretoria", title: "Union Buildings & Mandela Statue", category: "History & Heritage", rating: 4.9, desc: "Terraced gardens overlooking Pretoria with a 9m statue of Nelson Mandela.", img: "https://images.unsplash.com/photo-1577971132997-c10be9372519?auto=format&fit=crop&w=600&q=80" },
    { id: "a2", city: "johannesburg", title: "Constitution Hill", category: "Human Rights", rating: 4.9, desc: "Former prison holding Mandela, now South Africa's highest court.", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80" },
    { id: "a3", city: "kimberley", title: "The Big Hole & Mine Museum", category: "Landmark", rating: 4.9, desc: "World's largest hand-dug diamond crater with original vaults.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80" },
    { id: "a4", city: "matjiesfontein", title: "Lord Milner Hotel & Red Bus", category: "Victorian Heritage", rating: 4.8, desc: "Historic 1899 hotel and Karoo stargazing haven.", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" },
    { id: "a5", city: "worcester", title: "Hex River Valley Wine Route", category: "Wine & Nature", rating: 4.8, desc: "Breathtaking autumn vineyards and mountain rail pass.", img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=80" },
    { id: "a6", city: "cape-town", title: "Table Mountain Aerial Cableway", category: "Natural Wonder", rating: 5.0, desc: "Ascend to Table Mountain summit in a 360-degree rotating cable car.", img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80" }
  ];

  const FALLBACK_STORIES = [
    {
      id: "story-1",
      title: "The Golden Track: How Diamonds & Gold Built South Africa's Railway",
      author: "Rail History Heritage Trust",
      read_time: "4 min read",
      summary: "In the 1870s, the discovery of diamonds in Kimberley sparked an urgent engineering race across the Karoo desert.",
      content: "Before steam locomotives reached Kimberley in 1885, travel from Cape Town required a multi-week journey by ox-wagon across scorched Karoo terrain. The arrival of the iron horse transformed South Africa. Engineering marvels like the Hex River Pass carved manually through solid rock allowed heavy machinery to reach the mines and birthed South Africa's industrial spine."
    },
    {
      id: "story-2",
      title: "The Blue Train Legacy: 75+ Years of Presidential Romance",
      author: "TrackTales Archives",
      read_time: "3 min read",
      summary: "Originally dubbed the 'Union Limited' in 1923, the train acquired its iconic royal blue coat during World War II.",
      content: "Kings, queens, statesmen, and cultural icons have stepped onto the deep pile carpets of The Blue Train. From Nelson Mandela hosting foreign dignitaries to Hollywood stars watching Karoo sunsets, the train remains a floating sanctuary of 5-star hospitality."
    },
    {
      id: "story-3",
      title: "Rohan Vos & The Legend of Rovos Rail",
      author: "African Rail Gazette",
      read_time: "5 min read",
      summary: "How one man's passion for restoring vintage steam engines created the world's most opulent train safari company.",
      content: "In 1989, Rohan Vos bought vintage carriage shells with the dream of family steam trips. That project blossomed into Rovos Rail. Today, skilled artisans in Pretoria meticulously hand-restore 1920s Edwardian timber interiors and brass lamps, preserving the Golden Age of rail travel."
    }
  ];

  // --- App State ---
  let appData = {
    trains: FALLBACK_TRAINS,
    stops: FALLBACK_STOPS,
    attractions: FALLBACK_ATTRACTIONS,
    stories: FALLBACK_STORIES
  };

  // --- Initialize App ---
  document.addEventListener('DOMContentLoaded', () => {
    fetchApiData();
    setupNavigation();
    setupRouteMapControls();
    setupAttractionFilters();
    setupSoundEngine();
    setupTicketForm();
    setupStoryModal();
  });

  // --- Fetch API Data with Fallback ---
  async function fetchApiData() {
    try {
      const trainsRes = await fetch('/api/trains');
      if (trainsRes.ok) {
        const json = await trainsRes.json();
        if (json.data) appData.trains = json.data;
      }
    } catch (e) {
      console.log('Using local fallback train data');
    }

    try {
      const routesRes = await fetch('/api/routes');
      if (routesRes.ok) {
        const json = await routesRes.json();
        if (json.data) appData.stops = json.data;
      }
    } catch (e) {
      console.log('Using local fallback route data');
    }

    try {
      const attractionsRes = await fetch('/api/attractions');
      if (attractionsRes.ok) {
        const json = await attractionsRes.json();
        if (json.data) appData.attractions = json.data;
      }
    } catch (e) {
      console.log('Using local fallback attractions data');
    }

    try {
      const storiesRes = await fetch('/api/stories');
      if (storiesRes.ok) {
        const json = await storiesRes.json();
        if (json.data) appData.stories = json.data;
      }
    } catch (e) {
      console.log('Using local fallback stories data');
    }

    renderTrains();
    renderAttractions('all');
    renderStories();
  }

  // --- Navigation Controls ---
  function setupNavigation() {
    const mobileBtn = document.getElementById('mobile-toggle-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });

      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
      });
    }
  }

  // --- Route Map Interactive Logic ---
  function setupRouteMapControls() {
    const trainFilterBtns = document.querySelectorAll('.train-select-btn');
    const stopNodes = document.querySelectorAll('.stop-node');
    const activeLine = document.getElementById('route-line-active');

    // Train filter switcher
    trainFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        trainFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const trainFilter = btn.getAttribute('data-train-filter');
        updateRouteMapForTrain(trainFilter);
      });
    });

    // Stop node selection
    stopNodes.forEach((node, index) => {
      node.addEventListener('click', () => {
        stopNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');

        const stopId = node.getAttribute('data-stop-id');
        displayStopDetails(stopId);

        // Update animated active line length
        if (activeLine) {
          const pct = (index / (stopNodes.length - 1)) * 100;
          activeLine.style.width = `${pct}%`;
        }
      });
    });
  }

  function updateRouteMapForTrain(trainFilter) {
    const stopNodes = document.querySelectorAll('.stop-node');
    stopNodes.forEach(node => {
      const stopId = node.getAttribute('data-stop-id');
      const stopObj = appData.stops.find(s => s.id === stopId);
      if (!stopObj) return;

      if (trainFilter === 'all') {
        node.style.opacity = '1';
      } else {
        const trainNameMap = {
          'blue-train': 'The Blue Train',
          'rovos-rail': 'Rovos Rail',
          'shosholoza-meyl': 'Shosholoza Meyl'
        };
        const targetTrain = trainNameMap[trainFilter];
        const trainCallsStr = Array.isArray(stopObj.train_calls) ? stopObj.train_calls.join(', ') : stopObj.train_calls;

        if (trainCallsStr && trainCallsStr.includes(targetTrain)) {
          node.style.opacity = '1';
        } else {
          node.style.opacity = '0.35';
        }
      }
    });
  }

  function displayStopDetails(stopId) {
    const stopObj = appData.stops.find(s => s.id === stopId);
    if (!stopObj) return;

    document.getElementById('stop-name').textContent = stopObj.name;
    document.getElementById('stop-province').textContent = stopObj.province;
    document.getElementById('stop-distance').textContent = `${stopObj.distance_km} km from Pretoria`;
    document.getElementById('stop-desc').textContent = stopObj.description;
    
    const trainCalls = Array.isArray(stopObj.train_calls) ? stopObj.train_calls.join(', ') : stopObj.train_calls;
    document.getElementById('stop-calling-trains').textContent = trainCalls;
    document.getElementById('stop-stay').textContent = stopObj.stay || stopObj.recommended_stay || '1 Day';
    document.getElementById('stop-cuisine').textContent = stopObj.local_dish;

    if (stopObj.img) {
      document.getElementById('stop-img').src = stopObj.img;
    }
  }

  // --- Render 3 Trains ---
  function renderTrains() {
    const container = document.getElementById('trains-container');
    if (!container) return;

    container.innerHTML = appData.trains.map(train => `
      <div class="train-card">
        <div class="train-card-img-wrap">
          <img src="${train.image_url}" alt="${train.name}" class="train-card-img">
          <div class="train-card-overlay">
            <span class="badge ${train.id === 'blue-train' ? 'badge-blue' : train.id === 'rovos-rail' ? 'badge-gold' : 'badge-green'}">
              ${train.category}
            </span>
          </div>
        </div>
        <div class="train-card-body">
          <h3>${train.name}</h3>
          <p style="color: var(--accent-gold); font-size: 0.9rem; font-style: italic; margin-bottom: 0.8rem;">"${train.tagline}"</p>
          <p>${train.description}</p>
          
          <ul class="train-specs-list">
            <li><span class="icon">⚡</span> <strong>Speed:</strong> ${train.speed}</li>
            <li><span class="icon">⏱️</span> <strong>Journey:</strong> ${train.duration}</li>
            <li><span class="icon">📍</span> <strong>Route:</strong> ${train.route_summary}</li>
          </ul>

          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${(train.highlights || []).slice(0, 3).map(h => `<span class="badge badge-green" style="font-size: 0.75rem;">${h}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- Attractions Filtering ---
  function setupAttractionFilters() {
    const filterBtns = document.querySelectorAll('#attraction-city-filters .filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const city = btn.getAttribute('data-city');
        renderAttractions(city);
      });
    });
  }

  function renderAttractions(city) {
    const container = document.getElementById('attractions-container');
    if (!container) return;

    let items = appData.attractions;
    if (city !== 'all') {
      items = appData.attractions.filter(a => a.city.toLowerCase().replace(/\s+/g, '-') === city || a.stop_id === city);
    }

    if (items.length === 0) {
      container.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No attractions listed for this stop.</p>`;
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="attraction-card">
        <img src="${item.img || item.image_url}" alt="${item.title}" class="attraction-img">
        <div class="attraction-body">
          <div class="attraction-meta">
            <span>📍 ${item.city.toUpperCase()}</span>
            <span>⭐ ${item.rating || '4.9'}</span>
          </div>
          <h4 class="attraction-title">${item.title}</h4>
          <p class="attraction-desc">${item.desc || item.description}</p>
          <span class="badge badge-blue" style="font-size: 0.75rem;">${item.category}</span>
        </div>
      </div>
    `).join('');
  }

  // --- Web Audio API Rail Sound Engine ---
  function setupSoundEngine() {
    const playBtn = document.getElementById('audio-play-toggle');
    const nowPlayingLabel = document.getElementById('sound-now-playing');
    const presetBtns = document.querySelectorAll('.track-btn');
    const heroBtnSound = document.getElementById('hero-btn-sound');

    let audioCtx = null;
    let isPlaying = false;
    let currentPreset = 'chug';
    let oscillator = null;
    let gainNode = null;
    let intervalId = null;

    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }

    function playSound() {
      initAudio();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      isPlaying = true;
      playBtn.textContent = '⏸';
      nowPlayingLabel.textContent = `Status: Playing (${currentPreset.toUpperCase()})`;

      if (currentPreset === 'chug') {
        playChugEffect();
      } else if (currentPreset === 'whistle') {
        playWhistleEffect();
      } else if (currentPreset === 'wind') {
        playWindEffect();
      } else {
        playLoungeEffect();
      }
    }

    function stopSound() {
      isPlaying = false;
      playBtn.textContent = '▶';
      nowPlayingLabel.textContent = 'Status: Muted';
      if (intervalId) clearInterval(intervalId);
      if (gainNode) gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    }

    playBtn.addEventListener('click', () => {
      if (isPlaying) stopSound();
      else playSound();
    });

    if (heroBtnSound) {
      heroBtnSound.addEventListener('click', () => {
        document.getElementById('soundscape').scrollIntoView({ behavior: 'smooth' });
        if (!isPlaying) playSound();
      });
    }

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPreset = btn.getAttribute('data-sound');

        if (isPlaying) {
          stopSound();
          playSound();
        }
      });
    });

    // Synthesized sound effects using Web Audio API
    function playChugEffect() {
      if (intervalId) clearInterval(intervalId);
      let count = 0;
      intervalId = setInterval(() => {
        if (!isPlaying) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(count % 2 === 0 ? 90 : 60, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
        count++;
      }, 250);
    }

    function playWhistleEffect() {
      if (intervalId) clearInterval(intervalId);
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.frequency.setValueAtTime(520, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(650, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 2.5);
      osc2.stop(audioCtx.currentTime + 2.5);
    }

    function playWindEffect() {
      if (intervalId) clearInterval(intervalId);
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 3.0);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 3.0);
    }

    function playLoungeEffect() {
      if (intervalId) clearInterval(intervalId);
      const notes = [261.63, 329.63, 392.00, 523.25]; // C major chord notes
      let idx = 0;
      intervalId = setInterval(() => {
        if (!isPlaying) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(notes[idx % notes.length], audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
        idx++;
      }, 500);
    }
  }

  // --- Ticket Generator Form Logic ---
  function setupTicketForm() {
    const form = document.getElementById('ticket-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const passengerName = document.getElementById('input-passenger-name').value || 'Sipho Ndlovu';
      const trainId = document.getElementById('select-train').value;
      const cabinType = document.getElementById('select-cabin').value;
      const travelDate = document.getElementById('input-date').value;

      const payload = {
        passenger_name: passengerName,
        train_id: trainId,
        cabin_type: cabinType,
        travel_date: travelDate,
        passengers_count: 1
      };

      try {
        const res = await fetch('/api/ticket', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const json = await res.json();
          if (json.ticket) {
            updateBoardingPassUI(json.ticket);
            return;
          }
        }
      } catch (err) {
        console.log('Using local ticket generator fallback');
      }

      // Offline fallback generator
      const trainMap = {
        'blue-train': 'The Blue Train',
        'rovos-rail': 'Rovos Rail',
        'shosholoza-meyl': 'Shosholoza Meyl'
      };
      const mockTicket = {
        ticket_id: `TT-${Math.random().toString(36).substr(2, 7).toUpperCase()}`,
        passenger_name: passengerName,
        train_name: trainMap[trainId] || 'The Blue Train',
        cabin_type: cabinType,
        travel_date: travelDate,
        seat_number: `CAR-0${Math.floor(Math.random()*4)+1} / SEAT ${Math.floor(Math.random()*20)+1}A`
      };
      updateBoardingPassUI(mockTicket);
    });
  }

  function updateBoardingPassUI(ticket) {
    document.getElementById('pass-train-title').textContent = ticket.train_name;
    document.getElementById('pass-name').textContent = ticket.passenger_name;
    document.getElementById('pass-id').textContent = ticket.ticket_id;
    document.getElementById('pass-cabin').textContent = ticket.cabin_type;
    document.getElementById('pass-date').textContent = ticket.travel_date;
    document.getElementById('pass-seat').textContent = ticket.seat_number || 'CAR-02 / SEAT 08B';
    document.getElementById('pass-barcode').textContent = `||| ${ticket.ticket_id} |||`;

    const card = document.getElementById('boarding-pass-card');
    card.style.animation = 'none';
    card.offsetHeight; // trigger reflow
    card.style.animation = 'floatCard 0.6s ease';
  }

  // --- Render Stories & Modal ---
  function renderStories() {
    const container = document.getElementById('stories-container');
    if (!container) return;

    container.innerHTML = appData.stories.map(story => `
      <div class="train-card" style="cursor: pointer;" onclick="openStoryModal('${story.id}')">
        <div class="train-card-body">
          <span class="badge badge-gold" style="margin-bottom: 0.8rem; align-self: flex-start;">${story.read_time}</span>
          <h3>${story.title}</h3>
          <p style="font-size: 0.88rem; color: var(--green-light); margin-bottom: 0.8rem;">By ${story.author}</p>
          <p>${story.summary}</p>
          <span class="badge badge-blue" style="margin-top: 1rem; align-self: flex-start;">Read Full Tale ➔</span>
        </div>
      </div>
    `).join('');
  }

  function setupStoryModal() {
    const modal = document.getElementById('story-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('active'));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }

    window.openStoryModal = function (storyId) {
      const story = appData.stories.find(s => s.id === storyId);
      if (!story) return;

      document.getElementById('modal-title').textContent = story.title;
      document.getElementById('modal-author').textContent = `By ${story.author}`;
      document.getElementById('modal-read-time').textContent = story.read_time;
      document.getElementById('modal-body').textContent = story.content;

      modal.classList.add('active');
    };
  }

})();
