/* ==========================================================================
   TrackTales - Client Application JavaScript
   Features: Dynamic API Integration, Fallback Data, Interactive Route Map,
             Web Audio API Rail Soundscape, Ticket Generator, Story Reader Modal
   ========================================================================== */

(function () {
  'use strict';

  if (window.TrackTalesAppInitialized) return;
  window.TrackTalesAppInitialized = true;

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

  // --- Passport State ---
  let passportData = {
    stops: {},
    stories: {},
    sounds: {}
  };

  // --- Initialize App ---
  document.addEventListener('DOMContentLoaded', () => {
    setupLoadingSplash();
    loadPassport();
    fetchApiData();
    setupNavigation();
    setupPageNavigation();
    setupLoginModal();
    setupGamesEngine();
    setupRouteMapControls();
    setupAttractionFilters();
    setupSoundEngine();
    setupTicketForm();
    setupTicketFlip();
    setupThemeToggle();
    setupDownloadTicket();
    setupStoryModal();
    setupPassportModal();
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
    if (window.lucide) {
      lucide.createIcons();
    }
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

    collectStamp('stops', stopId);
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
            <li><span class="icon"><i data-lucide="zap"></i></span> <strong>Speed:</strong> ${train.speed}</li>
            <li><span class="icon"><i data-lucide="clock"></i></span> <strong>Journey:</strong> ${train.duration}</li>
            <li><span class="icon"><i data-lucide="map-pin"></i></span> <strong>Route:</strong> ${train.route_summary}</li>
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
      <div class="attraction-flip-container" tabindex="0" role="button" aria-label="${item.title}. Hover or focus to reveal details.">
        <div class="attraction-flip-inner">
          
          <!-- FRONT FACE: Photo and Basic Info -->
          <div class="attraction-card-face attraction-front-face">
            <div class="attraction-img-wrap">
              <img src="${item.img || item.image_url}" alt="${item.title}">
            </div>
            <div class="attraction-card-info">
              <div class="attraction-meta" style="margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; color: var(--green-mint); display: inline-flex; align-items: center; gap: 0.2rem;"><i data-lucide="map-pin" style="width: 12px; height: 12px;"></i> ${item.city.toUpperCase()}</span>
                <span style="font-size: 0.75rem; color: var(--accent-gold); display: inline-flex; align-items: center; gap: 0.2rem;"><i data-lucide="star" style="width: 12px; height: 12px; fill: var(--accent-gold); stroke: var(--accent-gold);"></i> ${item.rating || '4.9'}</span>
              </div>
              <h4 class="attraction-title" style="font-size: 1.15rem; margin-bottom: 0.4rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: var(--font-heading);">${item.title}</h4>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                <span class="badge badge-blue" style="font-size: 0.7rem; padding: 0.2rem 0.6rem;">${item.category}</span>
                <span style="font-size: 0.75rem; color: var(--text-muted); font-style: italic; display: inline-flex; align-items: center; gap: 0.2rem;">Hover to Flip <i data-lucide="arrow-right" style="width: 10px; height: 10px;"></i></span>
              </div>
            </div>
          </div>
          
          <!-- BACK FACE: Blurb/Details -->
          <div class="attraction-card-face attraction-back-face">
            <div class="attraction-card-back-content">
              <span class="badge badge-gold" style="align-self: flex-start; font-size: 0.7rem; margin-bottom: 0.5rem;">${item.category}</span>
              <h4>${item.title}</h4>
              <p>${item.desc || item.description}</p>
            </div>
            <div style="border-top: 1px dashed rgba(255, 255, 255, 0.15); padding-top: 0.8rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--green-light);">
              <span style="display: inline-flex; align-items: center; gap: 0.2rem;"><i data-lucide="star" style="width: 12px; height: 12px; fill: var(--accent-gold); stroke: var(--accent-gold);"></i> Rating: ${item.rating || '4.9'} / 5.0</span>
              <span style="font-size: 0.75rem; color: var(--text-muted); font-style: italic;">Roll off to Flip back</span>
            </div>
          </div>

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

    let analyserNode = null;
    const canvas = document.getElementById('sound-visualizer');
    const canvasCtx = canvas ? canvas.getContext('2d') : null;
    let drawVisualId = null;

    // Render static silent line initially
    if (canvas && canvasCtx) {
      setTimeout(drawInitialFlatline, 100);
      window.addEventListener('resize', drawInitialFlatline);
    }

    function drawInitialFlatline() {
      if (!canvas || !canvasCtx) return;
      const width = canvas.width = canvas.offsetWidth;
      const height = canvas.height = canvas.offsetHeight;
      canvasCtx.fillStyle = '#0f1c30';
      canvasCtx.fillRect(0, 0, width, height);
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgba(0, 168, 255, 0.4)';
      canvasCtx.beginPath();
      canvasCtx.moveTo(0, height / 2);
      canvasCtx.lineTo(width, height / 2);
      canvasCtx.stroke();
    }

    function drawVisualizer() {
      if (!canvas || !canvasCtx) return;
      const bufferLength = analyserNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const width = canvas.width = canvas.offsetWidth;
      const height = canvas.height = canvas.offsetHeight;

      function draw() {
        if (!isPlaying) {
          drawInitialFlatline();
          drawVisualId = requestAnimationFrame(draw);
          return;
        }

        drawVisualId = requestAnimationFrame(draw);
        analyserNode.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = '#0f1c30';
        canvasCtx.fillRect(0, 0, width, height);

        canvasCtx.lineWidth = 3;
        const gradient = canvasCtx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, '#00a8ff');
        gradient.addColorStop(0.5, '#10b981');
        gradient.addColorStop(1, '#00a8ff');
        canvasCtx.strokeStyle = gradient;

        canvasCtx.beginPath();
        const sliceWidth = width * 1.0 / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = v * height / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        canvasCtx.lineTo(width, height / 2);
        canvasCtx.stroke();
      }

      draw();
    }

    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyserNode = audioCtx.createAnalyser();
        analyserNode.fftSize = 256;
        analyserNode.connect(audioCtx.destination);
        if (canvas && canvasCtx) {
          drawVisualizer();
        }
      }
    }

    function playSound() {
      initAudio();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      isPlaying = true;
      playBtn.innerHTML = '<i data-lucide="pause"></i>';
      if (window.lucide) lucide.createIcons();
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

      collectStamp('sounds', currentPreset);
    }

    function stopSound() {
      isPlaying = false;
      playBtn.innerHTML = '<i data-lucide="play"></i>';
      if (window.lucide) lucide.createIcons();
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
        gain.connect(analyserNode || audioCtx.destination);
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
      gain.connect(analyserNode || audioCtx.destination);

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
      gain.connect(analyserNode || audioCtx.destination);
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
        gain.connect(analyserNode || audioCtx.destination);
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
    const skeleton = document.getElementById('skeleton-overlay');
    const announcer = document.getElementById('boarding-pass-announcer');

    if (skeleton) {
      skeleton.classList.add('active');
    }
    if (announcer) {
      announcer.textContent = "Processing and generating your souvenir boarding ticket. Please wait.";
    }

    setTimeout(() => {
      // Populate fields
      document.getElementById('pass-train-title').textContent = ticket.train_name;
      document.getElementById('pass-name').textContent = ticket.passenger_name;
      document.getElementById('pass-id').textContent = ticket.ticket_id;
      document.getElementById('pass-cabin').textContent = ticket.cabin_type;
      document.getElementById('pass-date').textContent = ticket.travel_date;
      document.getElementById('pass-seat').textContent = ticket.seat_number || 'CAR-02 / SEAT 08B';
      document.getElementById('pass-barcode').textContent = `||| ${ticket.ticket_id} |||`;

      // Update Back of Card QR Data Text
      const qrData = ticket.qr_code_data || `TRACKTALES:${ticket.ticket_id}:${ticket.train_id || 'blue-train'}:${ticket.passenger_name}`;
      const qrTextElement = document.getElementById('pass-qr-data');
      if (qrTextElement) {
        qrTextElement.textContent = qrData;
      }

      // Generate real scannable QR code via qrcode.js
      const qrContainer = document.getElementById('pass-qr-code');
      if (qrContainer && window.QRCode) {
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, {
          text: qrData,
          width: 120,
          height: 120,
          colorDark: '#0b192c',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });
      }

      // Render seat map carriage grid visualizer
      renderSeatMap(ticket.seat_number || 'CAR-02 / SEAT 08B');

      // Hide loading skeleton
      if (skeleton) {
        skeleton.classList.remove('active');
      }
      
      if (window.lucide) {
        lucide.createIcons();
      }
      
      if (announcer) {
        announcer.textContent = `Boarding pass generated successfully for ${ticket.passenger_name}. Showing front of ticket.`;
      }

      // Pulse animation
      const container = document.getElementById('boarding-pass-container');
      if (container) {
        container.style.animation = 'none';
        container.offsetHeight; // trigger reflow
        container.style.animation = 'ticketPulse 0.5s ease-out';
      }

      // Settle details, make sure it is showing front first
      const inner = document.getElementById('boarding-pass-inner');
      if (inner) {
        inner.classList.remove('flipped');
        
        // Auto-flip reveal sequence: wait 800ms, flip to back, wait 1800ms, flip to front
        setTimeout(() => {
          inner.classList.add('flipped');
          if (announcer) {
            announcer.textContent = "Auto-flipping ticket to reveal scannable boarding QR code and carriage seat allocation.";
          }
          
          setTimeout(() => {
            inner.classList.remove('flipped');
            if (announcer) {
              announcer.textContent = "Auto-flipping ticket back to main front details.";
            }
          }, 2000);
        }, 800);
      }
    }, 1000); // 1 second loading delay simulation
  }

  // --- Ticket Card Flip Controller & A11y ---
  function setupTicketFlip() {
    const container = document.getElementById('boarding-pass-container');
    const inner = document.getElementById('boarding-pass-inner');
    const announcer = document.getElementById('boarding-pass-announcer');
    
    if (container && inner) {
      const toggleFlip = () => {
        const willBeFlipped = !inner.classList.contains('flipped');
        inner.classList.toggle('flipped');
        if (announcer) {
          announcer.textContent = willBeFlipped 
            ? "Flipped boarding pass card. Showing transit verification rules and scannable QR code on the back." 
            : "Flipped boarding pass card. Showing main ticket details on the front.";
        }
      };

      container.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('button')) {
          return;
        }
        toggleFlip();
      });

      inner.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault(); // Prevent page scrolling
          toggleFlip();
        }
      });
    }
  }

  // --- Render Carriage Seat Map Grid ---
  function renderSeatMap(selectedSeat) {
    const grid = document.getElementById('seat-map-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    let targetSeat = '';
    if (selectedSeat) {
      const match = selectedSeat.match(/SEAT\s+(\d+[A-Z])/i);
      if (match) {
        targetSeat = match[1].toUpperCase();
      } else {
        const directMatch = selectedSeat.match(/(\d+[A-Z])/i);
        if (directMatch) {
          targetSeat = directMatch[1].toUpperCase();
        }
      }
    }
    
    // Generate rows 1-12, seats A & B
    for (let row = 1; row <= 12; row++) {
      ['A', 'B'].forEach(col => {
        const seatId = `${row}${col}`;
        const node = document.createElement('div');
        node.className = 'seat-node';
        node.textContent = seatId;
        if (seatId === targetSeat) {
          node.className = 'seat-node active';
        }
        grid.appendChild(node);
      });
    }
  }

  // --- Light / Dark Theme Toggler ---
  function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    toggleBtn.innerHTML = savedTheme === 'light' 
      ? '<i data-lucide="moon"></i>' 
      : '<i data-lucide="sun"></i>';
    if (window.lucide) lucide.createIcons();

    toggleBtn.addEventListener('click', () => {
      const nowTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nowTheme);
      localStorage.setItem('theme', nowTheme);
      toggleBtn.innerHTML = nowTheme === 'light' 
        ? '<i data-lucide="moon"></i>' 
        : '<i data-lucide="sun"></i>';
      if (window.lucide) lucide.createIcons();
    });
  }

  // --- HTML2Canvas Ticket Exporter ---
  function setupDownloadTicket() {
    const downloadBtn = document.getElementById('btn-download-ticket');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', () => {
      const inner = document.getElementById('boarding-pass-inner');
      if (!inner || !window.html2canvas) return;

      const wasFlipped = inner.classList.contains('flipped');
      inner.classList.remove('flipped');
      
      const frontElement = inner.querySelector('.pass-front');
      if (!frontElement) return;

      // Wait brief moment for flip back transition to end before capture
      setTimeout(() => {
        html2canvas(frontElement, {
          backgroundColor: null,
          scale: 2,
          logging: false,
          useCORS: true
        }).then(canvas => {
          const image = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          const passengerName = (document.getElementById('pass-name').textContent || 'Souvenir').replace(/\s+/g, '_');
          link.download = `TrackTales_BoardingPass_${passengerName}.png`;
          link.href = image;
          link.click();
          
          if (wasFlipped) {
            inner.classList.add('flipped');
          }
        }).catch(err => {
          console.error("html2canvas export failed:", err);
          if (wasFlipped) {
            inner.classList.add('flipped');
          }
        });
      }, 300);
    });
  }

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
          <span class="badge badge-blue" style="margin-top: 1rem; align-self: flex-start; display: inline-flex; align-items: center; gap: 0.4rem;">
            <span>Read Full Tale</span>
            <i data-lucide="arrow-right"></i>
          </span>
        </div>
      </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
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
      collectStamp('stories', storyId);
    };
  }

  // --- Passport System Functions ---
  const STOPS_STAMP_CONFIG = {
    'pretoria': { code: 'PRY', name: 'Pretoria' },
    'johannesburg': { code: 'JHB', name: 'Jo\'burg' },
    'kimberley': { code: 'KIM', name: 'Kimberley' },
    'matjiesfontein': { code: 'MJF', name: 'Matjies' },
    'worcester': { code: 'WOC', name: 'Worcester' },
    'cape-town': { code: 'CPT', name: 'Cape Town' }
  };

  function loadPassport() {
    try {
      const data = localStorage.getItem('tracktales_passport');
      if (data) {
        passportData = JSON.parse(data);
      }
    } catch (e) {
      console.error("Failed to load passport storage:", e);
    }
  }

  function savePassport() {
    try {
      localStorage.setItem('tracktales_passport', JSON.stringify(passportData));
    } catch (e) {
      console.error("Failed to save passport storage:", e);
    }
  }

  function collectStamp(type, id) {
    if (!passportData[type]) passportData[type] = {};
    if (passportData[type][id]) return; // Already collected
    
    // Set formatted date
    const dateStr = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
    
    passportData[type][id] = dateStr;
    savePassport();
    renderPassportUI();

    // Trigger visual checks and completions
    if (type === 'stops') {
      checkPassportCompletion();
    }
  }

  function renderPassportUI() {
    // 1. Render Route Stops Stamps
    const stopsGrid = document.getElementById('stamp-grid-stops');
    if (stopsGrid) {
      stopsGrid.innerHTML = Object.keys(STOPS_STAMP_CONFIG).map(stopId => {
        const conf = STOPS_STAMP_CONFIG[stopId];
        const isCollected = passportData.stops && passportData.stops[stopId];
        const dateVal = isCollected ? passportData.stops[stopId] : '';
        
        return `
          <div class="stamp-item stamp-${stopId} ${isCollected ? 'active' : ''}" title="${isCollected ? 'Collected on ' + dateVal : 'Stop locked. Visit this stop on the Route Map to stamp your passport.'}">
            <div class="lock-icon"><i data-lucide="lock"></i></div>
            <div class="stamp-item-label">${conf.name}</div>
            <div class="stamp-item-code">${conf.code}</div>
            <div class="stamp-item-date">${dateVal}</div>
          </div>
        `;
      }).join('');
    }

    // 2. Render Stories counters
    const storiesGrid = document.getElementById('stamp-grid-stories');
    if (storiesGrid) {
      storiesGrid.innerHTML = appData.stories.map(story => {
        const isCollected = passportData.stories && passportData.stories[story.id];
        return `
          <div class="stamp-mini-item ${isCollected ? 'active' : ''}">
            <span>${story.title}</span>
            <span class="mini-check"><i data-lucide="${isCollected ? 'check-circle' : 'circle'}"></i></span>
          </div>
        `;
      }).join('');
    }

    // 3. Render Sounds counters
    const soundsGrid = document.getElementById('stamp-grid-sounds');
    if (soundsGrid) {
      const soundLabels = {
        'chug': 'Karoo Track Chug',
        'whistle': 'Steam Whistle',
        'wind': 'Karoo Night Wind',
        'lounge': 'Lounge Jazz ambient'
      };
      soundsGrid.innerHTML = Object.keys(soundLabels).map(soundId => {
        const isCollected = passportData.sounds && passportData.sounds[soundId];
        return `
          <div class="stamp-mini-item ${isCollected ? 'active' : ''}">
            <span>${soundLabels[soundId]}</span>
            <span class="mini-check"><i data-lucide="${isCollected ? 'check-circle' : 'circle'}"></i></span>
          </div>
        `;
      }).join('');
    }

    // Check completion and update reward panel
    const totalStops = Object.keys(STOPS_STAMP_CONFIG).length;
    const collectedStops = Object.keys(passportData.stops || {}).length;
    const rewardBox = document.getElementById('passport-reward');
    const rewardStatus = document.getElementById('passport-reward-status');

    if (collectedStops === totalStops) {
      if (rewardBox) rewardBox.classList.add('completed');
      if (rewardStatus) {
        rewardStatus.innerHTML = `<strong>Passport complete!</strong> You've unlocked the golden ticket border reward. Check your Boarding Pass display!`;
      }
      
      const passFrontElement = document.querySelector('.boarding-pass.pass-front');
      if (passFrontElement) {
        passFrontElement.classList.add('gold-border');
      }
    } else {
      if (rewardBox) rewardBox.classList.remove('completed');
      if (rewardStatus) {
        rewardStatus.textContent = `Collect stamps at all ${totalStops} route stops to unlock a Golden Boarding Ticket frame and completion glow! (${collectedStops}/${totalStops} collected)`;
      }
      const passFrontElement = document.querySelector('.boarding-pass.pass-front');
      if (passFrontElement) {
        passFrontElement.classList.remove('gold-border');
      }
    }

    if (window.lucide) lucide.createIcons();
  }

  function checkPassportCompletion() {
    const totalStops = Object.keys(STOPS_STAMP_CONFIG).length;
    const collectedStops = Object.keys(passportData.stops || {}).length;
    if (collectedStops === totalStops) {
      // Trigger Completion animation on Boarding pass
      const container = document.getElementById('boarding-pass-container');
      if (container) {
        container.style.animation = 'none';
        container.offsetHeight; // trigger reflow
        container.style.animation = 'ticketPulse 0.8s ease-out';
      }
    }
  }

  function setupPassportModal() {
    const modal = document.getElementById('passport-modal');
    const openBtn = document.getElementById('btn-open-passport');
    const closeBtn = document.getElementById('passport-close-btn');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => {
        renderPassportUI();
        modal.classList.add('active');
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('active'));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }
    
    // Initial UI render on app boot
    renderPassportUI();
  }

  // --- 1. Animated Train Loading Splash Screen ---
  function setupLoadingSplash() {
    const splash = document.getElementById('train-loading-splash');
    const fill = document.getElementById('splash-progress-fill');
    if (!splash || !fill) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 15;
      if (progress > 100) progress = 100;
      fill.style.width = progress + '%';
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          splash.classList.add('fade-out');
          setTimeout(() => {
            splash.style.display = 'none';
          }, 500);
        }, 300);
      }
    }, 100);
  }

  // --- 2. Page Router Navigation ---
  function setupPageNavigation() {
    const pageViews = document.querySelectorAll('.page-view');
    const navLinks = document.querySelectorAll('.nav-page-link');

    function switchPage(pageId) {
      let targetPage = pageId.replace('#', '');
      if (!targetPage || !document.getElementById('page-' + targetPage)) {
        targetPage = 'home';
      }

      pageViews.forEach(page => {
        if (page.id === 'page-' + targetPage) {
          page.classList.add('active');
        } else {
          page.classList.remove('active');
        }
      });

      navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === targetPage) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const target = link.getAttribute('data-page');
        if (target) {
          e.preventDefault();
          switchPage(target);
          window.location.hash = target;
        }
      });
    });

    if (window.location.hash) {
      switchPage(window.location.hash);
    }

    window.addEventListener('hashchange', () => {
      if (window.location.hash) {
        switchPage(window.location.hash);
      }
    });
  }

  // --- 3. Animated Train Login Modal ---
  function setupLoginModal() {
    const modal = document.getElementById('login-modal');
    const openBtn = document.getElementById('btn-open-login');
    const closeBtn = document.getElementById('login-modal-close');
    const form = document.getElementById('login-form');
    const demoBtn = document.getElementById('btn-demo-login');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => modal.classList.add('active'));
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('active'));
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }

    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        const emailInput = document.getElementById('login-email');
        const ticketInput = document.getElementById('login-ticket-id');
        const passInput = document.getElementById('login-password');
        if (emailInput) emailInput.value = 'sipho.ndlovu@tracktales.co.za';
        if (ticketInput) ticketInput.value = 'TT-89A4B2C';
        if (passInput) passInput.value = 'tracktales2026';
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const label = document.getElementById('login-btn-label');
        if (label) label.textContent = "Authenticating Passenger...";
        setTimeout(() => {
          modal.classList.remove('active');
          if (label) label.textContent = "Sign In to TrackTales";
          if (openBtn) openBtn.innerHTML = '<i data-lucide="user-check"></i> <span>Welcome, Sipho!</span>';
          if (window.lucide) lucide.createIcons();
          alert("Welcome aboard TrackTales Passenger Portal, Sipho Ndlovu! Ticket reference TT-89A4B2C verified.");
        }, 800);
      });
    }
  }

  // --- 4. Interactive Sight Solver Puzzles & "Did You Know?" Pop-Up Modal ---
  const SIGHT_PUZZLES = [
    {
      id: "puzzle-1",
      city: "Kimberley Sight Solver",
      points: 100,
      title: "Sight Puzzle 1: The Giant Hand-Dug Excavation",
      prompt: "Which world-famous diamond mining crater in Kimberley was hand-dug by 50,000 miners between 1871 and 1914?",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      options: [
        "The Big Hole (Kimberley Mine Museum)",
        "Cullinan Diamond Gorge",
        "Pilanesberg Volcanic Crater",
        "Ookiep Copper Pit"
      ],
      correctIndex: 0,
      location: "Kimberley, Northern Cape",
      fact: "Did you know? The Big Hole in Kimberley produced 2,722 kilograms (14.5 million carats) of diamonds, including the world-famous 83.5-carat 'Star of South Africa'!"
    },
    {
      id: "puzzle-2",
      city: "Pretoria Sight Solver",
      points: 100,
      title: "Sight Puzzle 2: Grand Sandstone Seat of Power",
      prompt: "Which sandstone architectural masterpiece in Pretoria serves as the official seat of the South African government?",
      img: "https://images.unsplash.com/photo-1577971132997-c10be9372519?auto=format&fit=crop&w=800&q=80",
      options: [
        "Voortrekker Heritage Monument",
        "The Union Buildings & Mandela Statue",
        "Freedom Park Sanctuary",
        "Melrose House Palace"
      ],
      correctIndex: 1,
      location: "Pretoria, Gauteng",
      fact: "Did you know? Designed by Sir Herbert Baker in 1913, the Union Buildings feature a 9-metre bronze statue of Nelson Mandela with open arms symbolizing national unity!"
    },
    {
      id: "puzzle-3",
      city: "Matjiesfontein Sight Solver",
      points: 100,
      title: "Sight Puzzle 3: Karoo Victorian Rail Oasis",
      prompt: "Which Victorian rail outpost in the Karoo desert boasts a 19th-century hotel frequented by Cecil Rhodes and Olive Schreiner?",
      img: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80",
      options: [
        "Lord Milner Hotel (Matjiesfontein)",
        "Prince Albert Karoo Manor",
        "Beaufort West Station Lodge",
        "Touws River Railway Depot"
      ],
      correctIndex: 0,
      location: "Matjiesfontein, Western Cape",
      fact: "Did you know? Matjiesfontein was the first village in South Africa to have electric streetlamps in 1890 and served as a British military headquarters during the Boer War!"
    },
    {
      id: "puzzle-4",
      city: "Cape Town Sight Solver",
      points: 100,
      title: "Sight Puzzle 4: World Heritage Flat Mountain",
      prompt: "Which iconic flat-topped mountain overlooking Table Bay and Table Mountain National Park is one of the New 7 Wonders of Nature?",
      img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
      options: [
        "Lion's Head Peak",
        "Devil's Peak Crest",
        "Table Mountain & Cableway",
        "Chapman's Peak Cliff"
      ],
      correctIndex: 2,
      location: "Cape Town, Western Cape",
      fact: "Did you know? Table Mountain is estimated to be 260 million years old—six times older than the Himalayas—and hosts over 2,200 unique plant species!"
    },
    {
      id: "puzzle-5",
      city: "Worcester Sight Solver",
      points: 100,
      title: "Sight Puzzle 5: Valley of Table Grapes",
      prompt: "Which lush Western Cape valley along the rail line is world-renowned for its table grapes, wine estates, and snow-capped winter peaks?",
      img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80",
      options: [
        "Hex River Valley Winelands",
        "Franschhoek Pass",
        "Breedekloof Valley",
        "Paarl Rock Corridor"
      ],
      correctIndex: 0,
      location: "Worcester, Western Cape",
      fact: "Did you know? The Hex River Valley produces over 70% of South Africa's export table grapes and is famous for the local folklore legend of the Hex River Witch!"
    }
  ];

  let gameScore = 0;
  let currentPuzzleIdx = 0;
  const solvedPuzzles = new Set();

  function setupGamesEngine() {
    const puzzleTabsContainer = document.getElementById('game-puzzle-buttons');
    const optionsContainer = document.getElementById('game-options-grid');
    const dykModal = document.getElementById('did-you-know-modal');
    const dykClose = document.getElementById('dyk-modal-close');
    const dykNextBtn = document.getElementById('dyk-btn-next-puzzle');
    const resetBtn = document.getElementById('btn-reset-game');

    if (!puzzleTabsContainer || !optionsContainer) return;

    // Render puzzle selection tabs
    function renderPuzzleTabs() {
      puzzleTabsContainer.innerHTML = SIGHT_PUZZLES.map((puzzle, idx) => `
        <button class="puzzle-tab-btn ${idx === currentPuzzleIdx ? 'active' : ''} ${solvedPuzzles.has(puzzle.id) ? 'solved' : ''}" data-puzzle-idx="${idx}">
          ${solvedPuzzles.has(puzzle.id) ? '✓ ' : ''}Sight ${idx + 1}
        </button>
      `).join('');

      puzzleTabsContainer.querySelectorAll('.puzzle-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          currentPuzzleIdx = parseInt(btn.getAttribute('data-puzzle-idx'), 10);
          renderActivePuzzle();
          renderPuzzleTabs();
        });
      });
    }

    // Render active puzzle sight card
    function renderActivePuzzle() {
      const puzzle = SIGHT_PUZZLES[currentPuzzleIdx];
      if (!puzzle) return;

      document.getElementById('game-sight-city').textContent = puzzle.city;
      document.getElementById('game-sight-pts').textContent = `+${puzzle.points} PTS`;
      document.getElementById('game-sight-img').src = puzzle.img;
      document.getElementById('game-question-title').textContent = puzzle.title;
      document.getElementById('game-question-prompt').textContent = puzzle.prompt;

      const overlay = document.getElementById('game-sight-status-overlay');
      const feedbackMsg = document.getElementById('game-feedback-msg');
      if (feedbackMsg) feedbackMsg.textContent = '';

      if (solvedPuzzles.has(puzzle.id)) {
        if (overlay) {
          overlay.style.opacity = '1';
          overlay.classList.add('solved');
          overlay.innerHTML = `<span>✓ Sight Solved!</span>`;
        }
      } else {
        if (overlay) {
          overlay.style.opacity = '0';
          overlay.classList.remove('solved');
        }
      }

      optionsContainer.innerHTML = puzzle.options.map((opt, optIdx) => `
        <button class="game-opt-btn" data-opt-idx="${optIdx}" ${solvedPuzzles.has(puzzle.id) ? 'disabled' : ''}>
          <span>${opt}</span>
          <i data-lucide="chevron-right"></i>
        </button>
      `).join('');

      if (window.lucide) lucide.createIcons();

      optionsContainer.querySelectorAll('.game-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const chosenIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
          if (chosenIdx === puzzle.correctIndex) {
            btn.classList.add('correct');
            solvedPuzzles.add(puzzle.id);
            gameScore += puzzle.points;
            updateScoreUI();
            renderPuzzleTabs();

            if (overlay) {
              overlay.style.opacity = '1';
              overlay.classList.add('solved');
              overlay.innerHTML = `<span>✓ Sight Solved!</span>`;
            }

            // Trigger DID YOU KNOW? Pop-Up Modal
            setTimeout(() => {
              openDidYouKnowModal(puzzle);
            }, 500);

          } else {
            btn.classList.add('wrong');
            if (feedbackMsg) {
              feedbackMsg.textContent = "Not quite! Give it another try.";
              feedbackMsg.style.color = "#ef4444";
            }
          }
        });
      });
    }

    function updateScoreUI() {
      const scoreEl = document.getElementById('game-score');
      const countEl = document.getElementById('game-solved-count');
      if (scoreEl) scoreEl.textContent = gameScore;
      if (countEl) countEl.textContent = solvedPuzzles.size;
    }

    function openDidYouKnowModal(puzzle) {
      if (!dykModal) return;
      document.getElementById('dyk-fact-text').textContent = puzzle.fact;
      const metaInfo = document.getElementById('dyk-meta-info');
      if (metaInfo) {
        metaInfo.innerHTML = `
          <div><i data-lucide="map-pin" style="width: 14px; height: 14px; color: var(--primary-green);"></i> <strong>Location:</strong> ${puzzle.location}</div>
          <div><i data-lucide="train" style="width: 14px; height: 14px; color: var(--primary-blue);"></i> <strong>Rail Status:</strong> Verified Sight Attraction</div>
        `;
      }
      dykModal.classList.add('active');
      if (window.lucide) lucide.createIcons();
    }

    if (dykClose && dykModal) {
      dykClose.addEventListener('click', () => dykModal.classList.remove('active'));
      dykModal.addEventListener('click', (e) => {
        if (e.target === dykModal) dykModal.classList.remove('active');
      });
    }

    if (dykNextBtn && dykModal) {
      dykNextBtn.addEventListener('click', () => {
        dykModal.classList.remove('active');
        if (currentPuzzleIdx < SIGHT_PUZZLES.length - 1) {
          currentPuzzleIdx++;
          renderActivePuzzle();
          renderPuzzleTabs();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        gameScore = 0;
        solvedPuzzles.clear();
        currentPuzzleIdx = 0;
        updateScoreUI();
        renderPuzzleTabs();
        renderActivePuzzle();
      });
    }

    renderPuzzleTabs();
    renderActivePuzzle();
  }

})();

