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
      route_summary: "Pretoria ➔ Kimberley ➔ Cape Town",
      primary_color: "#0e382c",
      description: "Recapturing the romance of a bygone era with restored 1920s Edwardian wood-paneled suites, open observation cars, and formal gala dinners.",
      highlights: ["Open Balcony Carriage", "Formal Dress Dinners", "High Tea Lounge"],
      image_url: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80"
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
      train_calls: "The Blue Train, Rovos Rail",
      stay: "1-2 Days Departure Hub",
      local_dish: "Gauteng Style Braai & Chakalaka paired with Craft Lager",
      img: "https://images.unsplash.com/photo-1577971132997-c10be9372519?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "kimberley",
      stop_number: 2,
      name: "Kimberley (The Diamond City)",
      province: "Northern Cape Province",
      distance_km: 645,
      description: "Famous worldwide for the 1870s Diamond Rush. Home to 'The Big Hole'—the largest hand-dug excavation on earth—and vintage tramways.",
      train_calls: "The Blue Train, Rovos Rail",
      stay: "Stopover Tour (3-4 Hours)",
      local_dish: "Northern Cape Biltong & Kalahari Truffle Tart",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "cape-town",
      stop_number: 3,
      name: "Cape Town (The Mother City)",
      province: "Western Cape Province",
      distance_km: 1600,
      description: "The spectacular coastal terminus. Framed by Table Mountain, Atlantic oceans, colorful heritage quarters, and world-class culinary scenes.",
      train_calls: "The Blue Train, Rovos Rail",
      stay: "Final Destination / 3-5 Days",
      local_dish: "Traditional Cape Malay Bobotie & Snoek Braai with Chenin Blanc",
      img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const FALLBACK_ATTRACTIONS = [
    { id: "a1", city: "pretoria", title: "Union Buildings & Mandela Statue", category: "History & Heritage", rating: 4.9, desc: "Terraced gardens overlooking Pretoria with a 9m statue of Nelson Mandela.", img: "https://images.unsplash.com/photo-1577971132997-c10be9372519?auto=format&fit=crop&w=600&q=80" },
    { id: "a3", city: "kimberley", title: "The Big Hole & Mine Museum", category: "Landmark", rating: 4.9, desc: "World's largest hand-dug diamond crater with original vaults.", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80" },
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

  // --- Navigation Controls (Desktop Slider & Mobile/Tablet Side Panel) ---
  function setupNavigation() {
    const mobileBtn = document.getElementById('mobile-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    const closeBtn = document.getElementById('nav-drawer-close-btn');
    const backdrop = document.getElementById('nav-drawer-backdrop');

    function openSidePanel() {
      if (navMenu) navMenu.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
      if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      if (window.lucide) lucide.createIcons();
    }

    function closeSidePanel() {
      if (navMenu) navMenu.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
      if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    window.closeMobileDrawer = closeSidePanel;

    let lastToggleTime = 0;

    function handleToggle(e) {
      const now = Date.now();
      if (now - lastToggleTime < 400) return; // Prevent double-trigger from touchstart + click on mobile
      lastToggleTime = now;

      if (e && e.cancelable && e.type === 'touchstart') {
        e.preventDefault();
      }

      if (navMenu) {
        if (navMenu.classList.contains('active')) {
          closeSidePanel();
        } else {
          openSidePanel();
        }
      }
    }

    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', handleToggle);
      mobileBtn.addEventListener('touchstart', handleToggle, { passive: false });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeSidePanel);
      closeBtn.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        closeSidePanel();
      }, { passive: false });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closeSidePanel);
      backdrop.addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        closeSidePanel();
      }, { passive: false });
    }

    if (navMenu) {
      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeSidePanel);
        link.addEventListener('touchend', closeSidePanel);
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        closeSidePanel();
      }
    });
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
    const desktopBtn = document.getElementById('theme-toggle');
    const mobileCheckbox = document.getElementById('mobile-theme-checkbox');
    const mobileText = document.getElementById('mobile-theme-text');
    const mobileIconContainer = document.getElementById('mobile-theme-icon-container');

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      if (desktopBtn) {
        desktopBtn.innerHTML = theme === 'light' 
          ? '<i data-lucide="moon"></i>' 
          : '<i data-lucide="sun"></i>';
      }

      if (mobileCheckbox) {
        mobileCheckbox.checked = (theme === 'light');
      }

      if (mobileText) {
        mobileText.textContent = theme === 'light' ? 'Light Mode' : 'Dark Mode';
      }

      if (mobileIconContainer) {
        mobileIconContainer.innerHTML = theme === 'light' 
          ? '<i data-lucide="sun"></i>' 
          : '<i data-lucide="moon"></i>';
      }

      if (window.lucide) lucide.createIcons();
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    const toggleTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
    };

    if (desktopBtn) desktopBtn.addEventListener('click', toggleTheme);
    if (mobileCheckbox) {
      mobileCheckbox.addEventListener('change', () => {
        const nextTheme = mobileCheckbox.checked ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }

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
        rewardStatus.innerHTML = `<strong>Passport complete!</strong> Congratulations! You've collected all 6 South Africa route stamps!`;
      }
    } else {
      if (rewardBox) rewardBox.classList.remove('completed');
      if (rewardStatus) {
        rewardStatus.textContent = `Collect stamps at all ${totalStops} route stops to complete your South Africa Tourist Passport! (${collectedStops}/${totalStops} collected)`;
      }
    }

    if (window.lucide) lucide.createIcons();
  }

  function checkPassportCompletion() {
    const totalStops = Object.keys(STOPS_STAMP_CONFIG).length;
    const collectedStops = Object.keys(passportData.stops || {}).length;
    if (collectedStops === totalStops) {
      console.log("Passport complete! All stamps collected.");
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

  // --- 1. Video Loading Splash Screen Controller ---
  function setupLoadingSplash() {
    const splash = document.getElementById('train-loading-splash');
    const fill = document.getElementById('splash-progress-fill');
    const video = document.getElementById('splash-video');
    const audioBtn = document.getElementById('splash-audio-toggle');
    const skipBtn = document.getElementById('splash-skip-btn');
    const statusText = document.getElementById('splash-status-text');

    if (!splash) return;

    // Trigger video play safely (handle browser autoplay policies)
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log("Video autoplay initialized in muted state or waiting for user interaction:", err);
        });
      }
    }

    // Sound toggle control handler
    if (audioBtn && video) {
      audioBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        if (!video.muted) {
          video.play().catch(e => console.log("Play on unmute:", e));
        }
        if (video.muted) {
          audioBtn.innerHTML = '<i data-lucide="volume-x"></i> <span>Sound Off</span>';
        } else {
          audioBtn.innerHTML = '<i data-lucide="volume-2"></i> <span>Sound On</span>';
        }
        if (window.lucide) lucide.createIcons();
      });
    }

    // Unmute sound on first click on splash screen during loading if user wants audio
    const enableAudioOnInteraction = () => {
      if (video && video.muted && audioBtn) {
        video.muted = false;
        video.play().catch(e => console.log("Unmute on interaction:", e));
        audioBtn.innerHTML = '<i data-lucide="volume-2"></i> <span>Sound On</span>';
        if (window.lucide) lucide.createIcons();
      }
    };
    splash.addEventListener('click', enableAudioOnInteraction, { once: true });

    let isDismissed = false;
    const dismissSplash = () => {
      if (isDismissed) return;
      isDismissed = true;
      
      // CRITICAL: Stop loading video & mute sound immediately when loading completes
      if (video) {
        try {
          video.pause();
          video.muted = true;
          video.currentTime = 0;
        } catch (e) {
          console.log("Error pausing loading video:", e);
        }
      }

      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
      }, 600);
    };

    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissSplash();
      });
    }

    // Dynamic progress bar & status updates over 8 seconds (8,000 ms)
    let progress = 0;
    const statusMessages = [
      "Starting TrackTales Locomotive Engine...",
      "Loading Luxury Express Lines (The Blue Train & Rovos Rail)...",
      "Fetching South African Landmark Sights & Attractions...",
      "Preparing TrackTales Railway Portal...",
      "Ready for TrackTales!"
    ];

    const TOTAL_DURATION_MS = 8000; // 8 Seconds duration
    const INTERVAL_MS = 80;
    const INCREMENT = 100 / (TOTAL_DURATION_MS / INTERVAL_MS); // 1% per 80ms = 8 seconds

    const interval = setInterval(() => {
      progress += INCREMENT;
      if (progress > 100) progress = 100;
      if (fill) fill.style.width = progress + '%';

      if (statusText) {
        const msgIdx = Math.min(Math.floor((progress / 100) * statusMessages.length), statusMessages.length - 1);
        statusText.textContent = statusMessages[msgIdx];
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          dismissSplash();
        }, 200);
      }
    }, INTERVAL_MS);
  }

  // --- 2. Page Router Navigation with UI Systems Principles ---
  function setupPageNavigation() {
    const pageViews = document.querySelectorAll('.page-view');
    const navLinks = document.querySelectorAll('a.nav-page-link');
    const desktopNavMenu = document.getElementById('nav-menu-desktop');
    const scrollContainer = document.getElementById('nav-scroll-container');
    const chevronLeft = document.getElementById('nav-chevron-left');
    const chevronRight = document.getElementById('nav-chevron-right');
    
    // Create sliding active tab indicator element if it doesn't exist (desktop only)
    let navIndicator = document.getElementById('nav-slider-indicator');
    if (!navIndicator && desktopNavMenu) {
      navIndicator = document.createElement('div');
      navIndicator.id = 'nav-slider-indicator';
      navIndicator.className = 'nav-slider-indicator';
      desktopNavMenu.appendChild(navIndicator);
    }

    const PAGE_ORDER = ['home', 'trains', 'attractions', 'games', 'about'];
    let currentPage = 'home';

    function updateNavIndicator(targetPage, isSlow) {
      if (!navIndicator || !desktopNavMenu) return;
      const activeLink = desktopNavMenu.querySelector(`a[data-page="${targetPage}"]`);
      if (activeLink) {
        const menuRect = desktopNavMenu.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();

        const offsetLeft = linkRect.left - menuRect.left;
        const width = linkRect.width;

        // Apply speed class: Left to Right = slow (0.85s), Right to Left = fast (0.22s)
        if (isSlow) {
          navIndicator.classList.remove('slide-fast');
          navIndicator.classList.add('slide-slow');
        } else {
          navIndicator.classList.remove('slide-slow');
          navIndicator.classList.add('slide-fast');
        }

        navIndicator.style.transform = `translateX(${offsetLeft}px)`;
        navIndicator.style.width = `${width}px`;
        navIndicator.style.opacity = '1';

        // Auto-scroll tab into view if cut off
        if (scrollContainer) {
          const containerLeft = scrollContainer.scrollLeft;
          const containerWidth = scrollContainer.clientWidth;
          const itemLeft = activeLink.offsetLeft;
          const itemWidth = activeLink.clientWidth;

          if (itemLeft < containerLeft) {
            scrollContainer.scrollTo({ left: itemLeft - 20, behavior: 'smooth' });
          } else if (itemLeft + itemWidth > containerLeft + containerWidth) {
            scrollContainer.scrollTo({ left: itemLeft + itemWidth - containerWidth + 20, behavior: 'smooth' });
          }
        }
      }
    }

    function switchPage(pageId) {
      let targetPage = pageId.replace('#', '');
      if (!targetPage || !document.getElementById('page-' + targetPage)) {
        targetPage = 'home';
      }

      if (targetPage === currentPage) {
        updateNavIndicator(targetPage, true);
        return;
      }

      const prevIndex = PAGE_ORDER.indexOf(currentPage);
      const targetIndex = PAGE_ORDER.indexOf(targetPage);

      // Determine Direction & Speed:
      // Moving Left to Right (targetIndex > prevIndex) -> SLOW (0.85s)
      // Moving Right to Left (targetIndex < prevIndex) -> FAST (0.22s)
      const isSlow = targetIndex > prevIndex;

      currentPage = targetPage;

      // Update Nav Links active class & ARIA attributes
      navLinks.forEach((link, idx) => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === targetPage) {
          link.classList.add('active');
          link.setAttribute('aria-selected', 'true');
          link.setAttribute('tabindex', '0');
        } else {
          link.classList.remove('active');
          link.setAttribute('aria-selected', 'false');
          link.setAttribute('tabindex', '-1');
        }
      });

      updateNavIndicator(targetPage, isSlow);

      // Rule: "Content never cuts. Fade out. Pause 80 milliseconds. Fade in."
      const currentActivePage = document.querySelector('.page-view.active');
      if (currentActivePage) {
        currentActivePage.style.transition = 'opacity 0.08s ease-out';
        currentActivePage.style.opacity = '0';
      }

      setTimeout(() => {
        pageViews.forEach(page => {
          page.classList.remove('slide-left-to-right-slow', 'slide-right-to-left-fast');
          page.style.opacity = '';
          page.style.transition = '';
          if (page.id === 'page-' + targetPage) {
            page.classList.add('active');
            
            // Motion One page transition fade-in
            if (window.motion) {
              window.motion.animate(page, { opacity: [0, 1], y: [12, 0] }, { duration: 0.35, ease: "ease-out" });
              
              // If page is trains, stagger trains card cascade
              if (targetPage === 'trains') {
                const trainCards = page.querySelectorAll('.train-card');
                if (trainCards.length > 0) {
                  window.motion.animate(
                    trainCards,
                    { opacity: [0, 1], y: [20, 0] },
                    { delay: window.motion.stagger(0.08), duration: 0.45, ease: "ease-out" }
                  );
                }
              }
              // If page is attractions, stagger attractions card cascade
              if (targetPage === 'attractions') {
                const attractionCards = page.querySelectorAll('.attraction-card');
                if (attractionCards.length > 0) {
                  window.motion.animate(
                    attractionCards,
                    { opacity: [0, 1], y: [20, 0] },
                    { delay: window.motion.stagger(0.06), duration: 0.45, ease: "ease-out" }
                  );
                }
              }
            } else {
              if (isSlow) {
                page.classList.add('slide-left-to-right-slow');
              } else {
                page.classList.add('slide-right-to-left-fast');
              }
            }
          } else {
            page.classList.remove('active');
          }
        });
      }, 80); // 80ms pause matching video transcription rule

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Keyboard Shortcuts ("Arrows move between tabs. Home jumps first, end jumps last.")
    document.addEventListener('keydown', (e) => {
      // Only handle if focus is inside nav links
      if (!document.activeElement || !document.activeElement.classList.contains('nav-page-link')) return;

      const currentIndex = PAGE_ORDER.indexOf(currentPage);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % PAGE_ORDER.length;
        const targetPage = PAGE_ORDER[nextIndex];
        const nextLink = document.querySelector(`a.nav-page-link[data-page="${targetPage}"]`);
        if (nextLink) nextLink.focus();
        switchPage(targetPage);
        window.location.hash = targetPage;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + PAGE_ORDER.length) % PAGE_ORDER.length;
        const targetPage = PAGE_ORDER[prevIndex];
        const prevLink = document.querySelector(`a.nav-page-link[data-page="${targetPage}"]`);
        if (prevLink) prevLink.focus();
        switchPage(targetPage);
        window.location.hash = targetPage;
      } else if (e.key === 'Home') {
        e.preventDefault();
        const targetPage = PAGE_ORDER[0];
        const firstLink = document.querySelector(`a.nav-page-link[data-page="${targetPage}"]`);
        if (firstLink) firstLink.focus();
        switchPage(targetPage);
        window.location.hash = targetPage;
      } else if (e.key === 'End') {
        e.preventDefault();
        const targetPage = PAGE_ORDER[PAGE_ORDER.length - 1];
        const lastLink = document.querySelector(`a.nav-page-link[data-page="${targetPage}"]`);
        if (lastLink) lastLink.focus();
        switchPage(targetPage);
        window.location.hash = targetPage;
      }
    });

    // Desktop Chevrons scroll handlers
    if (chevronLeft && scrollContainer) {
      chevronLeft.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -140, behavior: 'smooth' });
      });
    }
    if (chevronRight && scrollContainer) {
      chevronRight.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 140, behavior: 'smooth' });
      });
    }

    // Initial position on load & window resize listener
    window.addEventListener('resize', () => updateNavIndicator(currentPage, true));
    setTimeout(() => updateNavIndicator(currentPage, true), 100);

    // Bind click events globally to all page links and about-card showcase cards
    document.querySelectorAll('.nav-page-link, .about-card').forEach(item => {
      item.addEventListener('click', (e) => {
        const target = item.getAttribute('data-page');
        if (target) {
          e.preventDefault();
          e.stopPropagation();
          switchPage(target);
          window.location.hash = target;
          if (window.closeMobileDrawer) {
            window.closeMobileDrawer();
          }
        }
      });
    });

    // Redirect clean URL paths to their corresponding hash routes for SPA compatibility
    const cleanPath = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
    const hash = window.location.hash;
    
    const validPagesMap = {
      'home': 'home',
      'trains': 'trains',
      'attractions': 'attractions',
      'games': 'games',
      'sightgames': 'games',
      'slightgames': 'games',
      'about': 'about'
    };

    if (cleanPath in validPagesMap) {
      const targetHash = validPagesMap[cleanPath];
      // If there is no hash, set the correct hash to trigger the SPA router
      if (!hash) {
        window.location.hash = '#' + targetHash;
      }
    }

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
    const mobileOpenBtn = document.getElementById('mobile-drawer-login-btn');
    const closeBtn = document.getElementById('login-modal-close');
    const form = document.getElementById('login-form');

    let isAuthenticated = false;

    // Initialize default credentials in localStorage if not already present
    if (!localStorage.getItem('tracktales_users')) {
      const defaultUsers = {
        'sipho.ndlovu@tracktales.co.za': 'tracktales2026'
      };
      localStorage.setItem('tracktales_users', JSON.stringify(defaultUsers));
    }

    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const toSignupBtn = document.getElementById('toggle-to-signup');
    const toLoginBtn = document.getElementById('toggle-to-login');

    if (toSignupBtn && loginSection && signupSection) {
      toSignupBtn.addEventListener('click', () => {
        loginSection.style.display = 'none';
        signupSection.style.display = 'block';
      });
    }

    if (toLoginBtn && loginSection && signupSection) {
      toLoginBtn.addEventListener('click', () => {
        signupSection.style.display = 'none';
        loginSection.style.display = 'block';
      });
    }

    // Set up password visibility toggling
    document.querySelectorAll('.btn-toggle-password').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        const icon = btn.querySelector('.eye-icon');
        if (input && icon) {
          if (input.type === 'password') {
            input.type = 'text';
            icon.setAttribute('data-lucide', 'eye-off');
          } else {
            input.type = 'password';
            icon.setAttribute('data-lucide', 'eye');
          }
          if (window.lucide) lucide.createIcons();
        }
      });
    });

    const initialPrefill = () => {
      const lastUser = localStorage.getItem('last_user') || '';
      const lastPass = localStorage.getItem('last_password') || '';
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      if (emailInput) emailInput.value = lastUser;
      if (passInput) passInput.value = lastPass;
    };
    initialPrefill();

    const handleCloseLogin = () => {
      if (window.motion) {
        const content = modal.querySelector('.modal-content');
        Promise.all([
          window.motion.animate(content, { opacity: 0, scale: 0.94, y: 15 }, { duration: 0.2 }).finished,
          window.motion.animate(modal, { opacity: 0 }, { duration: 0.18 }).finished
        ]).then(() => {
          modal.classList.remove('active');
          modal.style.opacity = '';
          content.style.opacity = '';
          content.style.transform = '';
        });
      } else {
        modal.classList.remove('active');
      }
    };

    function handleOpenLogin() {
      if (window.closeMobileDrawer) {
        window.closeMobileDrawer();
      }
      if (isAuthenticated) {
        // Sign Out action
        isAuthenticated = false;
        if (openBtn) openBtn.innerHTML = '<i data-lucide="user-check"></i> <span>Sign In</span>';
        if (mobileOpenBtn) mobileOpenBtn.innerHTML = '<i data-lucide="user-check"></i> <span>Sign In</span>';
        if (window.lucide) lucide.createIcons();
        alert("You have been signed out of TrackTales Passenger Portal.");
      } else {
        // Default modal to sign-up section when opening
        if (loginSection) loginSection.style.display = 'none';
        if (signupSection) signupSection.style.display = 'block';
        // Reset password input types to password
        document.querySelectorAll('.password-group input').forEach(input => {
          input.type = 'password';
        });
        document.querySelectorAll('.btn-toggle-password .eye-icon').forEach(icon => {
          icon.setAttribute('data-lucide', 'eye');
        });
        initialPrefill();
        if (window.lucide) lucide.createIcons();
        
        if (modal) {
          modal.classList.add('active');
          if (window.motion) {
            const content = modal.querySelector('.modal-content');
            window.motion.animate(modal, { opacity: [0, 1] }, { duration: 0.25 });
            window.motion.animate(
              content,
              { opacity: [0, 1], scale: [0.93, 1], y: [25, 0] },
              { duration: 0.45, ease: window.motion.spring({ stiffness: 140, damping: 16 }) }
            );
          }
        }
      }
    }

    if (openBtn) openBtn.addEventListener('click', handleOpenLogin);
    if (mobileOpenBtn) mobileOpenBtn.addEventListener('click', handleOpenLogin);

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', handleCloseLogin);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) handleCloseLogin();
      });
    }

    // Sign Up form handler
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value.trim().toLowerCase();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (password !== confirmPassword) {
          alert("Passwords do not match! Please check and try again.");
          return;
        }

        const users = JSON.parse(localStorage.getItem('tracktales_users') || '{}');
        if (users[email]) {
          alert("An account with this email address already exists!");
          return;
        }

        // Register new user
        users[email] = password;
        localStorage.setItem('tracktales_users', JSON.stringify(users));
        localStorage.setItem('last_user', email);
        localStorage.setItem('last_password', password);

        alert("Account created successfully! You are now logged in.");

        handleCloseLogin();
        isAuthenticated = true;

        if (openBtn) openBtn.innerHTML = `<i data-lucide="user-check"></i> <span>Sign Out</span>`;
        if (mobileOpenBtn) mobileOpenBtn.innerHTML = `<i data-lucide="log-out"></i> <span>Sign Out</span>`;
        if (window.lucide) lucide.createIcons();

        signupForm.reset();
      });
    }

    // Sign In form handler
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const password = document.getElementById('login-password').value;
        const label = document.getElementById('login-btn-label');

        if (label) label.textContent = "Authenticating Passenger...";

        setTimeout(() => {
          const users = JSON.parse(localStorage.getItem('tracktales_users') || '{}');
          
          if (!users[email] || users[email] !== password) {
            alert("Invalid email or password! Please try again.");
            if (label) label.textContent = "Sign In to TrackTales";
            return;
          }

          handleCloseLogin();
          isAuthenticated = true;

          localStorage.setItem('last_user', email);
          localStorage.setItem('last_password', password);

          if (label) label.textContent = "Sign In to TrackTales";
          if (openBtn) openBtn.innerHTML = `<i data-lucide="user-check"></i> <span>Sign Out</span>`;
          if (mobileOpenBtn) mobileOpenBtn.innerHTML = `<i data-lucide="log-out"></i> <span>Sign Out</span>`;
          if (window.lucide) lucide.createIcons();
          
          alert(`Welcome aboard TrackTales Passenger Portal! Login successful.`);
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
          ${solvedPuzzles.has(puzzle.id) ? '[Solved] ' : ''}Sight ${idx + 1}
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
          overlay.innerHTML = `<span>Sight Solved!</span>`;
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
              overlay.innerHTML = `<span>Sight Solved!</span>`;
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

