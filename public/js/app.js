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
  // --- Fallback Data (Guarantees app works offline or when opened directly in browser) ---
  const FALLBACK_TRAINS = [
    {
      id: "blue-train",
      name: "The Blue Train",
      tagline: "A Window to the Soul of South Africa",
      category: "Ultra Luxury Express",
      speed: "90 km/h (Smooth Luxury Travel)",
      duration: "31 Hours (1,600 km)",
      frequency: "Weekly Departures",
      route_summary: "Southbound: Pretoria (Irene/Park) to Kimberley to Cape Town",
      departure_hub: "Pretoria Park Station / Irene Lounge (09:00 AM)",
      arrival_hub: "Cape Town Station (17:30 PM Day 2)",
      primary_color: "#005691",
      secondary_color: "#D99B26",
      description: "The Blue Train has been synonymous with luxury rail travel since 1946. On the southbound journey from Pretoria to Cape Town, passengers disembark for a scheduled main off-train excursion in Kimberley, featuring a guided tour of the famous Big Hole and the Open Diamond Mine Museum. (Note: On northbound trips from Cape Town to Pretoria, the train stops at the historic town of Matjiesfontein).",
      highlights: [
        "Kimberley Big Hole & Diamond Mine Museum Guided Tour",
        "24/7 Dedicated Personal Butler Service in Every Suite",
        "En-suite marble bathrooms with full-sized bathtubs",
        "Gourmet 5-course dining with silver service & fine Cape wine pairings",
        "Gentlemen's Club Car with Cuban cigars & fine cognacs"
      ],
      scenery_highlights: [
        {
          title: "The Great Karoo Sunset & Desert Horizons",
          vantage: "Observation Car Panoramic Lounge",
          time_window: "Late Afternoon to Golden Hour",
          icon: "sun",
          desc: "Experience the infinite flat-topped kopjes and acacia silhouettes of the Karoo bathed in glowing crimson and gold through floor-to-ceiling panoramic glass.",
          tips: "Arrive at the Observation Car 30 minutes before twilight for prime armchair seating."
        },
        {
          title: "Hex River Mountain Pass & Railway Tunnels",
          vantage: "Club Car & Lounge Windows",
          time_window: "Morning Descent into Western Cape",
          icon: "mountain",
          desc: "Marvel as the train snakes through towering sandstone ranges and the 13.5 km tunnel system into emerald vineyard valleys.",
          tips: "Sit on the right side of the lounge car for sheer mountain ravine views."
        },
        {
          title: "Kamfers Dam Flamingo Salt Pans",
          vantage: "Panoramic Windows & Dining Car",
          time_window: "Approaching Kimberley Rail Junction",
          icon: "compass",
          desc: "Witness tens of thousands of lesser flamingos tinting the salt pan waters in pastel pink right along the rail tracks.",
          tips: "Have your camera ready as flocks take flight in waves alongside the train."
        },
        {
          title: "Highveld Open Goldfields & Grasslands",
          vantage: "Panoramic Lounge & Club Car",
          time_window: "Pretoria & Gauteng Departure",
          icon: "layers",
          desc: "Watch the rolling high-altitude savannah and historic mine dumps transition into the wide-open expanse of the central plateau.",
          tips: "Best enjoyed with morning espresso as the train reaches cruising speed."
        }
      ],
      dining: [
        {
          title: "5-Course Gourmet Silver Service",
          icon: "utensils",
          desc: "Master chefs prepare fresh South African cuisine including Karoo lamb, Knysna oysters, and Cape Malay fusion, served on fine china with crystal glassware and sommelier wine pairings."
        },
        {
          title: "The Lounge Car & High Tea",
          icon: "coffee",
          desc: "Plush velvet seating, wide panoramic windows, and classical music create the perfect setting for afternoon high tea with handcrafted patisseries."
        },
        {
          title: "The Club Car",
          icon: "wine",
          desc: "An intimate gentlemen's club atmosphere with warm wood paneling, fine vintage cognacs, Cuban cigars, and a curated library."
        }
      ],
      locomotive_heritage: {
        title: "Dual-Power High-Speed Rail Engineering",
        specs: [
          { label: "Cruising Speed", val: "90 km/h (Smooth Air-Suspension)" },
          { label: "Locomotive Power", val: "Dual Electric & Diesel-Electric" },
          { label: "Acoustic Glass", val: "Gold-Coated Thermal Double Glazing" },
          { label: "Presidential History", val: "75+ Years · Mandela & World Monarchs" }
        ],
        desc: "Equipped with specialized air-cushioned suspension bogies and gold-dusted insulated double-pane windows, The Blue Train glides almost silently across South Africa's rugged Karoo terrain."
      },
      image_url: "/images/blue-train.jpg"
    },
    {
      id: "rovos-rail",
      name: "Rovos Rail Safari",
      tagline: "The Most Luxurious Train in the World",
      category: "Vintage Edwardian Safari",
      speed: "60 km/h (Nostalgic Slow Travel)",
      duration: "3 Days / 48 Hours (1,600 km)",
      frequency: "Bi-Weekly Departures",
      route_summary: "Capital Park (Pretoria) to Highveld to Kimberley to Karoo to Matjiesfontein to Cape Town",
      departure_hub: "Rovos Private Station, Capital Park (10:00 AM)",
      arrival_hub: "Cape Town Station, Platform 24 (17:00 PM Day 3)",
      primary_color: "#0e382c",
      secondary_color: "#c5a059",
      description: "Established in 1989 by Rohan Vos, Rovos Rail covers approximately 1,600 kilometers over 3 days from Pretoria (Capital Park) to Cape Town. It features two main off-train excursion stops: Kimberley (to view the Big Hole and Diamond Mine Museum) and the perfectly preserved 19th-century Victorian railway village of Matjiesfontein. The route traverses the gold-rich Highveld grasslands, the vast semi-desert of The Great Karoo, and the dramatic mountain passes and tunnels of the Hex River Valley.",
      highlights: [
        "Kimberley Excursion: Big Hole & Underground/Surface Diamond Mine Museum",
        "Matjiesfontein Excursion: Preserved 19th-century Victorian Railway Village & Lord Milner Hotel",
        "Open-air balcony on the rear Observation Car for 360° photography",
        "Formal evening dinners with jacket & tie / evening gown dress code",
        "Restored vintage Class 19D & 25NC steam locomotives"
      ],
      scenery_highlights: [
        {
          title: "Open-Air Balcony Sunset & Stargazing",
          vantage: "Rear Open Observation Balcony",
          time_window: "Twilight to Deep Desert Night",
          icon: "sparkles",
          desc: "Step onto the open teak balcony at the very rear of the train. Feel the crisp Karoo air and watch the tracks vanish under a starry Milky Way.",
          tips: "The open balcony offers 100% glare-free photography and an immersive soundscape."
        },
        {
          title: "Hex River Mountain Viaducts & 4 Tunnels",
          vantage: "Observation Car & Teak Balcony",
          time_window: "Day 3 Morning Winelands Descent",
          icon: "mountain",
          desc: "The vintage train negotiates the steep 1-in-40 gradient through 4 historic mountain tunnels with views over Cape Dutch homesteads.",
          tips: "The rear balcony provides stunning views of the curved train winding across stone viaducts."
        },
        {
          title: "Matjiesfontein Victorian Desert Village",
          vantage: "Observation Lounge & Open Balcony",
          time_window: "Afternoon Arrival in Little Karoo",
          icon: "compass",
          desc: "Glide into the preserved 19th-century railway village of Matjiesfontein, framed by the rugged Witteberge peaks and cast-iron lamps.",
          tips: "Listen for the traditional bugle call summoning passengers to the platform."
        },
        {
          title: "Vaal River Crossing & Maize Triangle",
          vantage: "1920s Dining Car & Suites",
          time_window: "Day 1 Afternoon Highveld Transit",
          icon: "wind",
          desc: "Cross the Vaal River border into the Free State plains, watching springbok and native birdlife scatter across the grasslands.",
          tips: "Keep watch from the wood-framed picture windows during afternoon high tea."
        }
      ],
      dining: [
        {
          title: "1920s Edwardian Dining Car",
          icon: "utensils",
          desc: "Victorian elegance, fine crisp linen, silver cutlery, and formal evening dress code paired with South African vintage reserve wines."
        },
        {
          title: "Rear Observation Car & Open Balcony",
          icon: "camera",
          desc: "Open-air rear balcony allowing fresh Karoo air and unobstructed 360-degree photography of mountain passes and wildlife."
        },
        {
          title: "Non-Smoking Lounge & Bar",
          icon: "wine",
          desc: "Deep leather armchairs, cocktail bar service, afternoon teas, and sweeping panoramic views across the Highveld and Great Karoo."
        }
      ],
      locomotive_heritage: {
        title: "Vintage Steam & Edwardian Restoration Legacy",
        specs: [
          { label: "Cruising Speed", val: "60 km/h (Nostalgic Slow Rail)" },
          { label: "Locomotive Heritage", val: "Restored Class 19D & 25NC Steam" },
          { label: "Artisan Workshops", val: "Capital Park Steam Locomotive Yards" },
          { label: "Max Passenger Capacity", val: "72 Guests in Period Luxury" }
        ],
        desc: "Every Rovos Rail carriage has been painstakingly hand-restored at the Capital Park steam depot in Pretoria by dedicated craftsmen, preserving Edwardian woodcraft and brass craftsmanship."
      },
      image_url: "/images/rovos-rail.jpg"
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
      description: "Famous worldwide for the 1870s Diamond Rush. Home to 'The Big Hole', the largest hand-dug excavation on earth, and vintage tramways.",
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
      train_id: "all",
      title: "The Golden Track: How Diamonds & Gold Built South Africa's Railway",
      author: "Rail History Heritage Trust",
      read_time: "4 min read",
      summary: "In the 1870s, the discovery of diamonds in Kimberley sparked an urgent engineering race across the Karoo desert.",
      content: "Before steam locomotives reached Kimberley in 1885, travel from Cape Town required a multi-week journey by ox-wagon across scorched Karoo terrain. The arrival of the iron horse transformed South Africa. Engineering marvels like the Hex River Pass carved manually through solid rock allowed heavy machinery to reach the mines and birthed South Africa's industrial spine."
    },
    {
      id: "story-2",
      train_id: "blue-train",
      title: "The Blue Train Legacy: 75+ Years of Presidential Romance",
      author: "TrackTales Archives",
      read_time: "3 min read",
      summary: "Originally dubbed the 'Union Limited' in 1923, the train acquired its iconic royal blue coat during World War II.",
      content: "Kings, queens, statesmen, and cultural icons have stepped onto the deep pile carpets of The Blue Train. From Nelson Mandela hosting foreign dignitaries to Hollywood stars watching Karoo sunsets, the train remains a floating sanctuary of 5-star hospitality."
    },
    {
      id: "story-3",
      train_id: "rovos-rail",
      title: "Rohan Vos & The Legend of Rovos Rail",
      author: "African Rail Gazette",
      read_time: "5 min read",
      summary: "How one man's passion for restoring vintage steam engines created the world's most opulent train safari company.",
      content: "In 1989, Rohan Vos bought vintage carriage shells with the dream of family steam trips. That project blossomed into Rovos Rail. Today, skilled artisans in Pretoria meticulously hand-restore 1920s Edwardian timber interiors and brass lamps, preserving the Golden Age of rail travel."
    },
    {
      id: "story-4",
      train_id: "blue-train",
      title: "Gourmet on the Rails: 5-Star Culinary Mastery",
      author: "Cape Epicure Review",
      read_time: "3 min read",
      summary: "Inside the silver-service galley kitchens serving Karoo lamb, Knysna oysters, and award-winning Cape vintages at 90 km/h.",
      content: "The chefs aboard The Blue Train prepare fresh fine-dining dishes in motion. Each evening, passengers don formal attire for a silver-service feast featuring Karoo lamb noisettes, Knysna oysters, and Cape Malay desserts, paired with rare reserve vintages from Stellenbosch and Franschhoek."
    },
    {
      id: "story-5",
      train_id: "rovos-rail",
      title: "Capital Park Workshop: Breathing Life Into Vintage Steam",
      author: "Steam & Heritage Gazette",
      read_time: "4 min read",
      summary: "How master craftsmen at Capital Park restore 1920s Edwardian carriages and historic steam locomotives.",
      content: "At Rovos Rail's headquarters in Capital Park, Pretoria, over 100 artisans meticulously restore teak wood window frames, hand-polish solid brass lamps, and rebuild vintage Class 19D and 25NC steam locomotives. Every carriage carries the spirit of the Golden Age of African exploration."
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
    const safeExec = (fn, name) => {
      try {
        fn();
      } catch (err) {
        console.warn(`[TrackTales] Warning in ${name}:`, err);
      }
    };

    safeExec(setupLoadingSplash, 'setupLoadingSplash');
    safeExec(setupSubscriptionManager, 'setupSubscriptionManager');
    safeExec(loadPassport, 'loadPassport');
    safeExec(fetchApiData, 'fetchApiData');
    safeExec(setupNavigation, 'setupNavigation');
    safeExec(setupPageNavigation, 'setupPageNavigation');
    safeExec(setupLoginModal, 'setupLoginModal');
    safeExec(setupGamesEngine, 'setupGamesEngine');
    safeExec(setupRouteMapControls, 'setupRouteMapControls');
    safeExec(setupAttractionFilters, 'setupAttractionFilters');
    safeExec(setupTicketForm, 'setupTicketForm');
    safeExec(setupTicketFlip, 'setupTicketFlip');
    safeExec(setupThemeToggle, 'setupThemeToggle');
    safeExec(setupDownloadTicket, 'setupDownloadTicket');
    safeExec(setupStoryModal, 'setupStoryModal');
    safeExec(setupDossierModal, 'setupDossierModal');
    safeExec(setupAudioCompanion, 'setupAudioCompanion');
    safeExec(setupPassportModal, 'setupPassportModal');
    safeExec(setupHeroVideoControls, 'setupHeroVideoControls');
    safeExec(setupRoutePreviewModal, 'setupRoutePreviewModal');
    safeExec(setupMobileMenu, 'setupMobileMenu');
    safeExec(setupAnimatedTabs, 'setupAnimatedTabs');
    safeExec(setupMotionEntranceAnimations, 'setupMotionEntranceAnimations');
    safeExec(setup3DCanvasGlobe, 'setup3DCanvasGlobe');
    safeExec(setupCorridorStops, 'setupCorridorStops');
  });



  // --- Fetch API Data with Fallback ---
  async function fetchApiData() {
    try {
      const trainsRes = await fetch('/api/trains');
      if (trainsRes.ok) {
        const json = await trainsRes.json();
        if (json.data && json.data.length) {
          // Merge API data with rich suites and dining metadata
          appData.trains = json.data.map(apiTrain => {
            const fallback = FALLBACK_TRAINS.find(ft => ft.id === apiTrain.id);
            return fallback ? { ...fallback, ...apiTrain, suites: fallback.suites, dining: fallback.dining, locomotive_heritage: fallback.locomotive_heritage } : apiTrain;
          });
        }
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
        if (json.data) {
          appData.stories = FALLBACK_STORIES;
        }
      }
    } catch (e) {
      console.log('Using local fallback stories data');
    }

    const currentTrainId = localStorage.getItem('tracktales_selected_train') || 'blue-train';
    renderHomeHero(currentTrainId);
    renderTrains(currentTrainId);
    renderAttractions('all');
    renderStories(currentTrainId);
    
    const activeSub = localStorage.getItem('tracktales_subscription') || 'free';
    if (typeof window.TrackTalesRenderSubscriptionFeatures === 'function') {
      window.TrackTalesRenderSubscriptionFeatures(activeSub, currentTrainId);
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  window.TrackTalesSetSelectedTrain = function (trainId) {
    localStorage.setItem('tracktales_selected_train', trainId);
    renderHomeHero(trainId);
    renderTrains(trainId);
    renderStories(trainId);
    if (typeof window.TrackTalesRenderCorridorCards === 'function') {
      window.TrackTalesRenderCorridorCards(trainId);
    }
    const activeSub = localStorage.getItem('tracktales_subscription') || 'free';
    if (typeof window.TrackTalesRenderSubscriptionFeatures === 'function') {
      window.TrackTalesRenderSubscriptionFeatures(activeSub, trainId);
    }
    if (typeof window.TrackTalesUpdateVoiceStudioTrain === 'function') {
      window.TrackTalesUpdateVoiceStudioTrain();
    }
    const navTrainLabel = document.getElementById('nav-train-label');
    const mobileTrainLabel = document.getElementById('mobile-train-label');
    const navHubSelectedTrain = document.getElementById('nav-hub-selected-train');
    const isBlue = trainId === 'blue-train';
    if (navTrainLabel) navTrainLabel.textContent = isBlue ? 'The Blue Train' : 'Rovos Rail';
    if (mobileTrainLabel) mobileTrainLabel.textContent = isBlue ? 'The Blue Train' : 'Rovos Rail';
    if (navHubSelectedTrain) navHubSelectedTrain.textContent = isBlue ? 'The Blue Train' : 'Rovos Rail';

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  };

  // --- Dynamic Home Hero Rendering for Selected Train ---
  function renderHomeHero(trainId) {
    const isBlue = trainId === 'blue-train';
    const tagEl = document.getElementById('hero-category-tag');
    const descEl = document.getElementById('hero-train-description');
    const statsEl = document.getElementById('hero-train-stats');

    if (tagEl) {
      tagEl.textContent = isBlue 
        ? 'PRETORIA TO CAPE TOWN CORRIDOR · THE BLUE TRAIN' 
        : 'CAPITAL PARK TO CAPE TOWN CORRIDOR · ROVOS RAIL SAFARI';
      tagEl.className = isBlue ? 'text-[#B87C10]' : 'text-[#2A9D8F]';
    }

    if (descEl) {
      descEl.textContent = isBlue
        ? 'A luxury rail ticket for this route can cost tens of thousands of Rand. TrackTales traces the same line—a 1,600 km 5-star spectrum running from the Highveld through Kimberley to the Atlantic ocean.'
        : 'Step aboard "The Most Luxurious Train in the World". An extraordinary 3-day, 1,600 km vintage Edwardian journey spanning the golden Highveld, Kimberley diamond mines, the Great Karoo, and Matjiesfontein.';
    }

    if (statsEl) {
      if (isBlue) {
        statsEl.innerHTML = `
          <span class="flex items-center gap-2"><i data-lucide="route" class="w-3.5 h-3.5 text-[#B87C10]"></i> 1,600 km</span>
          <span class="flex items-center gap-2"><i data-lucide="clock" class="w-3.5 h-3.5 text-[#B87C10]"></i> 31 Hours Express</span>
          <span class="flex items-center gap-2"><i data-lucide="zap" class="w-3.5 h-3.5 text-[#B87C10]"></i> 90 km/h Air-Suspension</span>
          <span class="flex items-center gap-2"><i data-lucide="gem" class="w-3.5 h-3.5 text-[#B87C10]"></i> Kimberley Diamond Excursion</span>
        `;
      } else {
        statsEl.innerHTML = `
          <span class="flex items-center gap-2"><i data-lucide="route" class="w-3.5 h-3.5 text-[#2A9D8F]"></i> 1,600 km</span>
          <span class="flex items-center gap-2"><i data-lucide="clock" class="w-3.5 h-3.5 text-[#2A9D8F]"></i> 3 Days / 48 Hours</span>
          <span class="flex items-center gap-2"><i data-lucide="flame" class="w-3.5 h-3.5 text-[#2A9D8F]"></i> 60 km/h Restored Steam</span>
          <span class="flex items-center gap-2"><i data-lucide="landmark" class="w-3.5 h-3.5 text-[#2A9D8F]"></i> Kimberley & Matjiesfontein</span>
        `;
      }
    }
    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
  }

  // --- Dynamic Modes / Flagship Showcase Rendering for Selected Train ONLY ---
  function renderTrains(trainId) {
    const container = document.getElementById('trains-container');
    const badgeEl = document.getElementById('trains-section-badge');
    const titleEl = document.getElementById('trains-section-title');
    const subtitleEl = document.getElementById('trains-section-subtitle');

    const train = (appData.trains || FALLBACK_TRAINS).find(t => t.id === trainId) || FALLBACK_TRAINS[0];
    const isBlue = train.id === 'blue-train';
    const otherTrainId = isBlue ? 'rovos-rail' : 'blue-train';
    const otherTrainName = isBlue ? 'Rovos Rail Safari' : 'The Blue Train';
    const accentColor = isBlue ? '#D99B26' : '#2A9D8F';
    const accentDark = isBlue ? '#B87C10' : '#1F7A6F';

    if (badgeEl) {
      badgeEl.textContent = `SELECTED TRAIN: ${train.name.toUpperCase()}`;
      if (badgeEl.parentElement) {
        badgeEl.parentElement.className = `inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${isBlue ? 'bg-[#D99B26]/10 border-[#D99B26]/30 text-[#B87C10]' : 'bg-[#2A9D8F]/10 border-[#2A9D8F]/30 text-[#2A9D8F]'} font-mono text-xs font-bold tracking-widest uppercase mb-4 shadow-sm`;
      }
    }

    if (titleEl) {
      titleEl.innerHTML = isBlue 
        ? `The <span class="text-[#B87C10] italic font-serif">Blue Train</span>` 
        : `Rovos <span class="text-[#2A9D8F] italic font-serif">Rail Safari</span>`;
    }

    if (subtitleEl) {
      subtitleEl.textContent = train.tagline + ' · Complete luxury suites, dining, and specifications for your selected train journey.';
    }

    if (!container) return;

    // Scenery & Viewing Highlights HTML
    const sceneryHighlights = train.scenery_highlights || (isBlue ? [
      {
        title: "The Great Karoo Sunset & Desert Horizons",
        vantage: "Observation Car Panoramic Lounge",
        time_window: "Late Afternoon to Golden Hour",
        icon: "sun",
        desc: "Experience the infinite flat-topped kopjes and acacia silhouettes of the Karoo bathed in glowing crimson and gold through floor-to-ceiling panoramic glass.",
        tips: "Arrive at the Observation Car 30 minutes before twilight for prime armchair seating."
      },
      {
        title: "Hex River Mountain Pass & Railway Tunnels",
        vantage: "Club Car & Lounge Windows",
        time_window: "Morning Descent into Western Cape",
        icon: "mountain",
        desc: "Marvel as the train snakes through towering sandstone ranges and the 13.5 km tunnel system into emerald vineyard valleys.",
        tips: "Sit on the right side of the lounge car for sheer mountain ravine views."
      },
      {
        title: "Kamfers Dam Flamingo Salt Pans",
        vantage: "Panoramic Windows & Dining Car",
        time_window: "Approaching Kimberley Rail Junction",
        icon: "compass",
        desc: "Witness tens of thousands of lesser flamingos tinting the salt pan waters in pastel pink right along the rail tracks.",
        tips: "Have your camera ready as flocks take flight in waves alongside the train."
      },
      {
        title: "Highveld Open Goldfields & Grasslands",
        vantage: "Panoramic Lounge & Club Car",
        time_window: "Pretoria & Gauteng Departure",
        icon: "layers",
        desc: "Watch the rolling high-altitude savannah and historic mine dumps transition into the wide-open expanse of the central plateau.",
        tips: "Best enjoyed with morning espresso as the train reaches cruising speed."
      }
    ] : [
      {
        title: "Open-Air Balcony Sunset & Stargazing",
        vantage: "Rear Open Observation Balcony",
        time_window: "Twilight to Deep Desert Night",
        icon: "sparkles",
        desc: "Step onto the open teak balcony at the very rear of the train. Feel the crisp Karoo air and watch the tracks vanish under a starry Milky Way.",
        tips: "The open balcony offers 100% glare-free photography and an immersive soundscape."
      },
      {
        title: "Hex River Mountain Viaducts & 4 Tunnels",
        vantage: "Observation Car & Teak Balcony",
        time_window: "Day 3 Morning Winelands Descent",
        icon: "mountain",
        desc: "The vintage train negotiates the steep 1-in-40 gradient through 4 historic mountain tunnels with views over Cape Dutch homesteads.",
        tips: "The rear balcony provides stunning views of the curved train winding across stone viaducts."
      },
      {
        title: "Matjiesfontein Victorian Desert Village",
        vantage: "Observation Lounge & Open Balcony",
        time_window: "Afternoon Arrival in Little Karoo",
        icon: "compass",
        desc: "Glide into the preserved 19th-century railway village of Matjiesfontein, framed by the rugged Witteberge peaks and cast-iron lamps.",
        tips: "Listen for the traditional bugle call summoning passengers to the platform."
      },
      {
        title: "Vaal River Crossing & Maize Triangle",
        vantage: "1920s Dining Car & Suites",
        time_window: "Day 1 Afternoon Highveld Transit",
        icon: "wind",
        desc: "Cross the Vaal River border into the Free State plains, watching springbok and native birdlife scatter across the grasslands.",
        tips: "Keep watch from the wood-framed picture windows during afternoon high tea."
      }
    ]);

    const sceneryHTML = sceneryHighlights.map(item => `
      <div class="glass-card p-6 sm:p-7 rounded-3xl border border-black/10 flex flex-col justify-between hover:border-[${accentColor}]/50 transition-all shadow-sm group text-left">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3.5">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${isBlue ? 'bg-[#D99B26]/15 text-[#B87C10] border border-[#D99B26]/30' : 'bg-[#2A9D8F]/15 text-[#2A9D8F] border border-[#2A9D8F]/30'} flex items-center gap-1.5">
              <i data-lucide="${item.icon || 'eye'}" class="w-3.5 h-3.5"></i>
              <span>${item.vantage}</span>
            </span>
            <span class="text-[11px] font-mono text-[#78716C] font-semibold">${item.time_window}</span>
          </div>

          <h4 class="font-heading font-bold text-lg sm:text-xl text-[#0A0C10] mb-2.5 group-hover:text-[${accentColor}] transition-colors leading-snug">
            ${item.title}
          </h4>

          <p class="text-xs sm:text-sm text-[#111827] font-medium leading-relaxed font-sans mb-4">
            ${item.desc}
          </p>
        </div>

        <div class="pt-3 border-t border-black/10 bg-black/[0.02] -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 p-4 sm:p-5 rounded-b-3xl mt-2">
          <div class="flex items-start gap-2 text-xs font-sans text-[#44403C]">
            <i data-lucide="compass" class="w-4 h-4 text-[${accentColor}] shrink-0 mt-0.5"></i>
            <div>
              <strong class="font-mono text-[10px] uppercase font-bold text-[#0A0C10] block">Vantage Point Tip</strong>
              <span>${item.tips}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Dining HTML
    const diningHTML = (train.dining || []).map(item => `
      <div class="glass-card p-6 rounded-2xl border border-black/10 text-left hover:border-[${accentColor}]/50 transition-all shadow-sm flex flex-col justify-between">
        <div class="flex items-center gap-3.5 mb-4">
          <div class="w-10 h-10 rounded-xl ${isBlue ? 'bg-[#D99B26]/15 text-[#B87C10] border border-[#D99B26]/30' : 'bg-[#2A9D8F]/15 text-[#2A9D8F] border border-[#2A9D8F]/30'} flex items-center justify-center">
            <i data-lucide="${item.icon || 'utensils'}" class="w-5 h-5"></i>
          </div>
          <h4 class="font-heading font-bold text-lg text-[#0A0C10] leading-snug">${item.title}</h4>
        </div>
        <p class="text-sm text-[#111827] font-medium leading-relaxed font-sans">${item.desc}</p>
      </div>
    `).join('');

    // Locomotive Specs HTML
    const specsHTML = (train.locomotive_heritage?.specs || []).map(s => `
      <div class="p-4 rounded-xl bg-black/5 border border-black/10 text-left">
        <span class="text-[10px] font-mono font-bold text-[#78716C] uppercase tracking-wider block mb-1">${s.label}</span>
        <span class="text-sm font-mono font-extrabold text-[#0A0C10]">${s.val}</span>
      </div>
    `).join('');

    // Full Container HTML
    container.innerHTML = `
      <!-- TOP HERO SPOTLIGHT CARD -->
      <div class="glass-card p-8 sm:p-12 rounded-3xl border border-black/15 shadow-xl relative overflow-hidden text-left">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div class="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div class="flex flex-wrap items-center gap-2.5 mb-4">
                <span class="px-3.5 py-1 rounded-full text-xs font-mono font-extrabold uppercase ${isBlue ? 'bg-[#D99B26]/20 text-[#B87C10] border border-[#D99B26]/40' : 'bg-[#2A9D8F]/20 text-[#2A9D8F] border border-[#2A9D8F]/40'}">
                  ${train.category}
                </span>
                <span class="text-xs font-mono text-[#78716C] font-semibold">${train.frequency}</span>
              </div>

              <h3 class="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A0C10] mb-2">${train.name}</h3>
              <p class="text-sm font-serif italic ${isBlue ? 'text-[#B87C10]' : 'text-[#2A9D8F]'} font-bold mb-5">${train.tagline}</p>
              <p class="text-base text-[#111827] font-medium leading-relaxed mb-6 font-sans">${train.description}</p>
            </div>

            <!-- Quick Specs Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-black/15 font-mono text-xs">
              <div class="p-3 rounded-xl bg-black/5 border border-black/10">
                <span class="text-[10px] text-[#78716C] uppercase block font-bold">Speed</span>
                <span class="font-bold text-[#0A0C10]">${train.speed}</span>
              </div>
              <div class="p-3 rounded-xl bg-black/5 border border-black/10">
                <span class="text-[10px] text-[#78716C] uppercase block font-bold">Duration</span>
                <span class="font-bold text-[#0A0C10]">${train.duration}</span>
              </div>
              <div class="p-3 rounded-xl bg-black/5 border border-black/10 col-span-2 sm:col-span-1">
                <span class="text-[10px] text-[#78716C] uppercase block font-bold">Corridor</span>
                <span class="font-bold text-[#0A0C10]">1,600 km</span>
              </div>
            </div>

            <!-- Departure & Arrival Hubs -->
            <div class="mt-4 p-4 rounded-xl ${isBlue ? 'bg-[#D99B26]/10 border border-[#D99B26]/25' : 'bg-[#2A9D8F]/10 border border-[#2A9D8F]/25'} text-xs font-mono">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span class="text-[10px] font-bold uppercase text-[#78716C] block">Departure Hub</span>
                  <span class="font-bold text-[#0A0C10]">${train.departure_hub}</span>
                </div>
                <div>
                  <span class="text-[10px] font-bold uppercase text-[#78716C] block">Terminus Station</span>
                  <span class="font-bold text-[#0A0C10]">${train.arrival_hub}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 flex flex-col gap-4">
            <div class="relative rounded-2xl overflow-hidden aspect-[4/3] border border-black/15 shadow-md">
              <img src="${train.image_url}" alt="${train.name}" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <span class="text-white font-mono text-xs font-bold tracking-wider uppercase">${train.route_summary}</span>
              </div>
            </div>

            <!-- Highlights Checklist -->
            <div class="p-5 rounded-2xl bg-white/80 border border-black/10">
              <span class="text-[11px] font-mono font-bold text-[#0A0C10] uppercase tracking-wider block mb-3">Signature Experience Highlights</span>
              <ul class="space-y-2 text-xs font-sans text-[#111827] font-medium">
                ${(train.highlights || []).map(h => `
                  <li class="flex items-start gap-2">
                    <i data-lucide="check-circle-2" class="w-4 h-4 text-[${accentColor}] flex-shrink-0 mt-0.5"></i>
                    <span>${h}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>

        </div>
      </div>

      <!-- SECTION 2: CORRIDOR SCENERY & VIEWING HIGHLIGHTS -->
      <div class="text-left mt-12">
        <div class="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span class="text-xs font-mono font-bold text-[${accentColor}] uppercase tracking-widest block">Scenic Splendor &amp; Vantage Points</span>
            <h3 class="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A0C10]">Corridor Scenery &amp; Viewing Highlights</h3>
          </div>
          <span class="text-xs font-mono text-[#78716C] font-semibold">Pretoria to Cape Town · 1,600 km</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${sceneryHTML}
        </div>
      </div>

      <!-- SECTION 3: ONBOARD GASTRONOMY & LOUNGE CARS -->
      <div class="text-left mt-12">
        <div class="mb-6">
          <span class="text-xs font-mono font-bold text-[${accentColor}] uppercase tracking-widest block">Culinary &amp; Social</span>
          <h3 class="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A0C10]">Onboard Fine Dining &amp; Lounges</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${diningHTML}
        </div>
      </div>

      <!-- SECTION 4: LOCOMOTIVE & ENGINEERING HERITAGE -->
      <div class="text-left mt-12 glass-card p-8 rounded-3xl border border-black/15 shadow-sm">
        <div class="mb-6">
          <span class="text-xs font-mono font-bold text-[${accentColor}] uppercase tracking-widest block">Technical Specs & History</span>
          <h3 class="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A0C10]">${train.locomotive_heritage?.title || 'Locomotive Engineering'}</h3>
          <p class="text-sm text-[#111827] font-medium leading-relaxed font-sans max-w-3xl mt-2">${train.locomotive_heritage?.desc || ''}</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          ${specsHTML}
        </div>
      </div>

      <!-- INTERACTIVE TRAIN SWITCHER BANNER -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white/90 border border-black/15 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6 text-left mt-12">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl ${isBlue ? 'bg-[#2A9D8F]/20 text-[#2A9D8F]' : 'bg-[#D99B26]/20 text-[#B87C10]'} flex items-center justify-center flex-shrink-0">
            <i data-lucide="shuffle" class="w-6 h-6"></i>
          </div>
          <div>
            <h4 class="font-heading font-bold text-lg text-[#0A0C10]">Switch to ${otherTrainName}?</h4>
            <p class="text-xs text-[#78716C] font-sans">Toggle your view anytime to explore South Africa's other premier luxury rail journey.</p>
          </div>
        </div>
        <button id="btn-switch-train-action" class="px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white shadow-md hover:scale-105 transition-all flex items-center gap-2 flex-shrink-0 ${isBlue ? 'bg-[#2A9D8F] hover:bg-[#238276]' : 'bg-[#D99B26] hover:bg-[#B87C10]'}" data-target-train="${otherTrainId}">
          <i data-lucide="train" class="w-4 h-4"></i> Switch to ${otherTrainName}
        </button>
      </div>
    `;

    // Attach switch button handler
    const switchBtn = document.getElementById('btn-switch-train-action');
    if (switchBtn) {
      switchBtn.addEventListener('click', () => {
        const target = switchBtn.getAttribute('data-target-train');
        if (window.TrackTalesSetSelectedTrain) {
          window.TrackTalesSetSelectedTrain(target);
          const section = document.getElementById('page-trains');
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  const STORY_EXPANDED_CONTEXT = `
This journey is best understood as a chain of decisions rather than a single dramatic moment. Engineers, railway workers, station staff, cooks, guides, and passengers each shaped what the route became. A timetable might appear simple on paper, but behind every departure were surveys, maintenance inspections, water supplies, repair workshops, and people who knew how to read the changing conditions of the land. The railway succeeded when all of those small systems worked together.

The landscape also carried its own history. The Highveld opened into broad grasslands and old mining country. Kimberley connected the story of diamonds with the movement of machinery and people. Beyond the junctions, the Karoo demanded patience: long horizons, dry air, sudden weather, and stations separated by great distances. Near the Western Cape, the route tightened into valleys and mountain passes before reaching vineyards, suburbs, and the Atlantic edge. Each section gave the journey a different character.

Local communities were never merely scenery. They supplied labour, food, services, stories, and knowledge of the terrain. Railway towns grew around sidings and water points, and many families built their working lives around the arrival and departure of trains. Some places prospered when the main line stopped there; others were left behind when routes changed. Remembering those differences makes the heritage more honest and gives the journey more depth than a simple catalogue of luxury.

Preservation is therefore an active responsibility. A carriage, locomotive, station, or dining tradition survives only when people repair it, document it, teach its skills, and make room for new audiences. Modern passengers can enjoy polished wood, old photographs, careful meals, and wide views while also asking whose work made the experience possible. The past becomes useful when it is treated as evidence, not decoration.

As the train moves, details gather into memory: a platform lamp in the evening, a meal served while the horizon turns gold, a workshop door opening before sunrise, or the sound of wheels changing rhythm on a bridge. These moments connect technology with place. They show why railway stories remain powerful in South Africa: the track is infrastructure, archive, workplace, viewpoint, and meeting place at once. A full journey does not simply pass through history. It gives history time to unfold.`;

  function getFullStoryText(story) {
    return `${story.content || ''}${STORY_EXPANDED_CONTEXT}`.trim();
  }

  function getStoryReadTime(story) {
    const fullText = `${story.summary || ''} ${getFullStoryText(story)}`.trim();
    const wordCount = fullText ? fullText.split(/\s+/).length : 0;
    return `${Math.max(5, Math.ceil(wordCount / 150))} min read`;
  }

  function formatStoryContent(text) {
    const paragraphs = String(text || '').split(/\n\s*\n/).filter(Boolean);
    return paragraphs.map(paragraph => `<p>${paragraph.trim()}</p>`).join('');
  }

  // --- Dynamic Stories Archive for Selected Train ---
  function renderStories(trainId) {
    const container = document.getElementById('stories-container');
    const titleEl = document.getElementById('stories-section-title');
    const subtitleEl = document.getElementById('stories-section-subtitle');

    const isBlue = trainId === 'blue-train';
    const trainName = isBlue ? 'The Blue Train' : 'Rovos Rail';
    const accentColor = isBlue ? '#D99B26' : '#2A9D8F';

    if (titleEl) {
      titleEl.innerHTML = `Journey <span class="${isBlue ? 'text-[#B87C10]' : 'text-[#2A9D8F]'} italic font-serif">Stories</span>`;
    }

    if (subtitleEl) {
      subtitleEl.textContent = `Archival stories, engineering milestones, and folklore specifically for ${trainName}.`;
    }

    if (!container) return;

    const allStories = appData.stories || FALLBACK_STORIES;
    const filteredStories = allStories.filter(s => s.train_id === 'all' || s.train_id === trainId);

    container.innerHTML = filteredStories.map(story => `
      <div class="glass-card p-8 rounded-3xl border border-black/10 flex flex-col justify-between text-left hover:border-[${accentColor}]/60 transition-all shadow-sm group">
        <div>
          <div class="flex items-center justify-between gap-2 mb-4">
            <span class="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${story.train_id === 'all' ? 'bg-[#4A52B0]/15 text-[#4A52B0] border border-[#4A52B0]/30' : (isBlue ? 'bg-[#D99B26]/15 text-[#B87C10] border border-[#D99B26]/30' : 'bg-[#2A9D8F]/15 text-[#2A9D8F] border border-[#2A9D8F]/30')}">
              ${story.train_id === 'all' ? 'Corridor Heritage' : trainName}
            </span>
            <span class="text-xs font-mono text-[#78716C] font-semibold">${getStoryReadTime(story)}</span>
          </div>

          <h3 class="font-heading font-bold text-xl text-[#0A0C10] mb-3 group-hover:text-[${accentColor}] transition-colors leading-snug">
            ${story.title}
          </h3>

          <p class="text-xs font-mono text-[#78716C] mb-4 font-semibold">By ${story.author}</p>
          <p class="text-sm text-[#111827] font-medium leading-relaxed font-sans mb-6">${story.summary}</p>
        </div>

        <button class="w-full py-3 rounded-xl bg-black/5 hover:bg-[${accentColor}] hover:text-white border border-black/10 font-mono text-xs font-bold uppercase tracking-wider text-[#0A0C10] transition-all flex items-center justify-center gap-2 btn-read-story" data-story-id="${story.id}">
          <i data-lucide="book-open" class="w-4 h-4"></i> Read Full Story
        </button>
      </div>
    `).join('');

    // Attach read handlers
    container.querySelectorAll('.btn-read-story').forEach(btn => {
      btn.addEventListener('click', () => {
        const sId = btn.getAttribute('data-story-id');
        if (window.openStoryModal) {
          window.openStoryModal(sId);
        }
      });
    });

    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
  }

  // --- Dynamic Attractions Rendering ---
  function renderAttractions(cityFilter) {
    const container = document.getElementById('attractions-grid');
    if (!container) return;

    let items = appData.attractions || FALLBACK_ATTRACTIONS;
    if (cityFilter && cityFilter !== 'all') {
      items = items.filter(a => a.city === cityFilter);
    }

    container.innerHTML = items.map(item => `
      <div class="glass-card p-6 rounded-2xl border border-black/10 text-left hover:border-[#D99B26]/50 transition-all shadow-sm">
        <div class="relative rounded-xl overflow-hidden aspect-video mb-4 border border-black/10">
          <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover">
          <span class="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/70 text-white font-mono text-[10px] font-bold inline-flex items-center gap-1"><i data-lucide="star" class="w-3 h-3 text-[#D99B26] fill-[#D99B26]"></i> ${item.rating}</span>
        </div>
        <span class="text-[10px] font-mono font-bold text-[#D99B26] uppercase tracking-wider block mb-1">${item.category}</span>
        <h4 class="font-heading font-bold text-lg text-[#0A0C10] mb-2">${item.title}</h4>
        <p class="text-xs text-[#111827] font-medium leading-relaxed font-sans">${item.desc}</p>
      </div>
    `).join('');

    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
  }

  // --- Story Reader Modal Setup ---
  function setupStoryModal() {
    const modal = document.getElementById('story-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (!modal) return;

    window.openStoryModal = function (storyId) {
      const story = (appData.stories || FALLBACK_STORIES).find(s => s.id === storyId);
      if (!story) return;

      const titleEl = document.getElementById('modal-title');
      const authorEl = document.getElementById('modal-author');
      const readTimeEl = document.getElementById('modal-read-time');
      const bodyEl = document.getElementById('modal-body');
      const audioBar = document.getElementById('modal-audio-narration-bar');

      if (titleEl) titleEl.textContent = story.title;
      if (authorEl) authorEl.textContent = `By ${story.author}`;
      if (readTimeEl) readTimeEl.textContent = getStoryReadTime(story);
      if (bodyEl) {
        bodyEl.innerHTML = `<p class="font-serif text-base leading-relaxed mb-4 text-[#78716C] italic font-semibold">${story.summary}</p><div class="space-y-4 text-sm leading-relaxed">${formatStoryContent(getFullStoryText(story))}</div>`;
        bodyEl.lang = window.TrackTalesLanguageCode || localStorage.getItem('tracktales_lang') || 'en';
      }

      // Story narration follows the active subscription entitlement.
      if (audioBar) {
        const activeSub = localStorage.getItem('tracktales_subscription') || 'free';
        const hasAudio = activeSub === 'audio-exp' || activeSub === 'membership';

        if (hasAudio) {
          audioBar.className = 'mb-5 p-4 rounded-2xl bg-[#2A9D8F]/10 border border-[#2A9D8F]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-left';
          audioBar.innerHTML = `
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center shrink-0 shadow-md">
                <i data-lucide="headphones" class="w-5 h-5"></i>
              </div>
              <div>
                <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2A9D8F] block">Audio Companion Unlocked</span>
                <span class="text-xs font-bold text-[#1C1917]">Listen to complete story narration</span>
              </div>
            </div>
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <button type="button" id="modal-audio-play-btn" class="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#2A9D8F] text-white font-mono text-xs font-bold uppercase hover:bg-[#238276] transition-all flex items-center justify-center gap-2 shadow-sm" data-reading="false">
                <i data-lucide="play" class="w-3.5 h-3.5"></i>
                <span id="modal-audio-play-label">Play Audio</span>
              </button>
            </div>
          `;

          const playBtn = document.getElementById('modal-audio-play-btn');
          const playLabel = document.getElementById('modal-audio-play-label');

          if (playBtn) {
            playBtn.addEventListener('click', () => {
              if (window.TrackTalesSpeakText) {
                const fullText = `${story.title}. By ${story.author}. ${story.summary}. ${getFullStoryText(story)}`;
                const isCurrentlyReading = playBtn.getAttribute('data-reading') === 'true';

                if (isCurrentlyReading) {
                  window.TrackTalesStopSpeech();
                  playBtn.setAttribute('data-reading', 'false');
                  if (playLabel) playLabel.textContent = 'Play Audio';
                  playBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
                  playBtn.classList.add('bg-[#2A9D8F]', 'hover:bg-[#238276]');
                } else {
                  window.TrackTalesSpeakText(fullText, () => {
                    playBtn.setAttribute('data-reading', 'false');
                    if (playLabel) playLabel.textContent = 'Play Audio';
                    playBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
                    playBtn.classList.add('bg-[#2A9D8F]', 'hover:bg-[#238276]');
                  });
                  playBtn.setAttribute('data-reading', 'true');
                  if (playLabel) playLabel.textContent = 'Stop Audio';
                  playBtn.classList.remove('bg-[#2A9D8F]', 'hover:bg-[#238276]');
                  playBtn.classList.add('bg-red-600', 'hover:bg-red-700');
                }
                if (window.lucide) lucide.createIcons();
              }
            });
          }
        } else {
          audioBar.className = 'mb-5 p-3.5 rounded-2xl bg-black/5 border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-left';
          audioBar.innerHTML = `
            <div class="flex items-center gap-2.5">
              <i data-lucide="lock" class="w-4 h-4 text-[#78716C]"></i>
              <span class="text-xs text-[#78716C] font-mono">Audio narration locked for this story.</span>
            </div>
            <button type="button" id="modal-audio-unlock-btn" class="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-[#2A9D8F] text-white font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-[#238276] transition-all flex items-center justify-center gap-1.5 shadow-sm">
              <i data-lucide="crown" class="w-3 h-3"></i>
              <span>Unlock Audio Pass (R49)</span>
            </button>
          `;

          const unlockBtn = document.getElementById('modal-audio-unlock-btn');
          if (unlockBtn) {
            unlockBtn.addEventListener('click', () => {
              closeStoryModal();
              if (window.TrackTalesOpenSubscriptionModal) {
                window.TrackTalesOpenSubscriptionModal('audio-exp');
              }
            });
          }
        }
      }

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
    };

    function closeStoryModal() {
      if (window.TrackTalesStopSpeech) {
        window.TrackTalesStopSpeech();
      }
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeStoryModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeStoryModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeStoryModal();
      }
    });
  }
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
          'rovos-rail': 'Rovos Rail'
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
        'rovos-rail': 'Rovos Rail'
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

  // --- Single Light Mode Enforcer ---
  function setupThemeToggle() {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
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

  // --- 1. Video Loading Splash Screen & Passenger Auth Card Controller ---
  function setupLoadingSplash() {
    const splash = document.getElementById('train-loading-splash');
    const video = document.getElementById('splash-video');
    const cardPanelVideo = document.getElementById('card-panel-video');
    const audioBtn = document.getElementById('splash-sound-toggle-btn');
    const skipBtn = document.getElementById('splash-skip-btn');
    const guestBtn = document.getElementById('splash-guest-btn');

    if (!splash) return;

    // Trigger videos play safely
    [video, cardPanelVideo].forEach(v => {
      if (v) {
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.log("Video autoplay muted state:", err);
          });
        }
      }
    });

    // Sound toggle control handler
    if (audioBtn && video) {
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        if (!video.muted) {
          video.play().catch(e => console.log("Play on unmute:", e));
          audioBtn.innerHTML = '<i data-lucide="volume-2" class="w-4 h-4"></i> <span>Sound On</span>';
        } else {
          audioBtn.innerHTML = '<i data-lucide="volume-x" class="w-4 h-4"></i> <span>Sound Off</span>';
        }
        if (window.lucide) lucide.createIcons();
      });
    }

    let isDismissed = false;
    const dismissSplash = () => {
      if (isDismissed) return;
      isDismissed = true;
      
      if (video) {
        try {
          video.pause();
          video.muted = true;
          video.currentTime = 0;
        } catch (e) {
          console.log("Error pausing splash video:", e);
        }
      }

      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
      }, 500);
    };

    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissSplash();
      });
    }

    if (guestBtn) {
      guestBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissSplash();
      });
    }

    // --- Tab / Screen Switcher Logic ---
    const toSignupLink = document.getElementById('splash-to-signup-link');
    const toSigninLink = document.getElementById('splash-to-signin-link');
    const signinContent = document.getElementById('splash-signin-content');
    const signupContent = document.getElementById('splash-signup-content');
    const loggedInContent = document.getElementById('splash-logged-in-content');
    const authAlert = document.getElementById('splash-auth-alert');
    const forgotPassBtn = document.getElementById('splash-forgot-pass-btn');

    const showAlert = (msg, type = 'info') => {
      if (!authAlert) return;
      authAlert.classList.remove('hidden', 'bg-red-500/10', 'border-red-500/30', 'text-red-700', 'bg-[#D99B26]/15', 'border-[#D99B26]/35', 'text-[#A86F12]', 'bg-[#FAF8F5]', 'border-[#EBE5D9]', 'text-[#1C1917]');
      if (type === 'error') {
        authAlert.classList.add('bg-red-500/10', 'border-red-500/30', 'text-red-700');
      } else if (type === 'success') {
        authAlert.classList.add('bg-[#D99B26]/15', 'border-[#D99B26]/35', 'text-[#A86F12]');
      } else {
        authAlert.classList.add('bg-[#FAF8F5]', 'border-[#EBE5D9]', 'text-[#1C1917]');
      }
      authAlert.textContent = msg;
    };

    const hideAlert = () => {
      if (authAlert) authAlert.classList.add('hidden');
    };

    const showSignIn = () => {
      hideAlert();
      if (signinContent) signinContent.classList.remove('hidden');
      if (signupContent) signupContent.classList.add('hidden');
    };

    const showSignUp = () => {
      hideAlert();
      if (signupContent) signupContent.classList.remove('hidden');
      if (signinContent) signinContent.classList.add('hidden');
    };

    if (toSignupLink) toSignupLink.addEventListener('click', showSignUp);
    if (toSigninLink) toSigninLink.addEventListener('click', showSignIn);

    if (forgotPassBtn) {
      forgotPassBtn.addEventListener('click', () => {
        const email = document.getElementById('splash-signin-email').value.trim();
        if (!email) {
          showAlert("Please enter your registered email address above to reset password.", "info");
        } else {
          showAlert(`Password reset link sent to ${email}. Please check your inbox.`, "success");
        }
      });
    }

    // --- User Registration & Preference Storage Engine ---
    const getRegisteredUserRecord = (email) => {
      if (!email) return null;
      const cleanEmail = email.trim().toLowerCase();
      try {
        const users = JSON.parse(localStorage.getItem('tracktales_users') || '{}');
        const user = users[cleanEmail];
        if (!user) return null;
        if (typeof user === 'string') {
          return {
            name: cleanEmail.split('@')[0].replace('.', ' '),
            email: cleanEmail,
            password: user,
            preferred_train: localStorage.getItem('tracktales_selected_train') || 'blue-train',
            created_at: new Date().toISOString()
          };
        }
        return user;
      } catch (e) {
        console.error("Error reading registered user record:", e);
        return null;
      }
    };

    const saveRegisteredUserRecord = (userData) => {
      try {
        const users = JSON.parse(localStorage.getItem('tracktales_users') || '{}');
        const cleanEmail = userData.email.trim().toLowerCase();
        users[cleanEmail] = {
          name: userData.name || cleanEmail.split('@')[0].replace('.', ' '),
          email: cleanEmail,
          password: userData.password,
          preferred_train: userData.preferred_train || 'blue-train',
          created_at: userData.created_at || (users[cleanEmail] && users[cleanEmail].created_at) || new Date().toISOString()
        };
        localStorage.setItem('tracktales_users', JSON.stringify(users));
        return users[cleanEmail];
      } catch (e) {
        console.error("Failed to save user record:", e);
        return null;
      }
    };

    // Seed default passenger accounts if not present
    const seedDefaultPassengers = () => {
      try {
        const users = JSON.parse(localStorage.getItem('tracktales_users') || '{}');
        let changed = false;

        if (!users['passenger@tracktales.co.za'] || typeof users['passenger@tracktales.co.za'] === 'string') {
          users['passenger@tracktales.co.za'] = {
            name: 'Standard Passenger',
            email: 'passenger@tracktales.co.za',
            password: typeof users['passenger@tracktales.co.za'] === 'string' ? users['passenger@tracktales.co.za'] : 'tracktales2026',
            preferred_train: 'blue-train',
            created_at: new Date().toISOString()
          };
          changed = true;
        }

        if (!users['sipho.ndlovu@tracktales.co.za'] || typeof users['sipho.ndlovu@tracktales.co.za'] === 'string') {
          users['sipho.ndlovu@tracktales.co.za'] = {
            name: 'Sipho Ndlovu',
            email: 'sipho.ndlovu@tracktales.co.za',
            password: typeof users['sipho.ndlovu@tracktales.co.za'] === 'string' ? users['sipho.ndlovu@tracktales.co.za'] : 'tracktales2026',
            preferred_train: 'rovos-rail',
            created_at: new Date().toISOString()
          };
          changed = true;
        }

        if (changed) {
          localStorage.setItem('tracktales_users', JSON.stringify(users));
        }
      } catch (e) {
        console.error("Error seeding default passengers:", e);
      }
    };
    seedDefaultPassengers();

    // Check Active Session on Splash Load
    const updateSplashSessionUI = () => {
      const loggedUser = JSON.parse(localStorage.getItem('tracktales_logged_user') || 'null');
      if (loggedUser && (loggedUser.name || loggedUser.email)) {
        if (signinContent) signinContent.classList.add('hidden');
        if (signupContent) signupContent.classList.add('hidden');
        if (loggedInContent) loggedInContent.classList.remove('hidden');

        const userNameEl = document.getElementById('splash-user-name');
        const userEmailEl = document.getElementById('splash-user-email');
        if (userNameEl) userNameEl.textContent = `Welcome Back, ${loggedUser.name || loggedUser.email}!`;
        if (userEmailEl) userEmailEl.textContent = loggedUser.email || '';
      } else {
        if (loggedInContent) loggedInContent.classList.add('hidden');
        showSignIn();
      }
    };
    updateSplashSessionUI();

    // Proceed to app as logged in user button
    const enterAsUserBtn = document.getElementById('splash-enter-as-user-btn');
    if (enterAsUserBtn) {
      enterAsUserBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dismissSplash();
      });
    }

    // --- Complete Clean Sign Out and Automatic Reload Logic ---
    const handleSignOutAndReload = (reloadPage = true) => {
      // 1. Remove active session and saved credentials so no prefill occurs
      localStorage.removeItem('tracktales_logged_user');
      localStorage.removeItem('last_user');
      localStorage.removeItem('last_password');

      // 2. Clear all input fields across both splash and modal forms
      const inputIds = [
        'splash-signin-email', 'splash-signin-password',
        'splash-signup-name', 'splash-signup-email', 'splash-signup-password', 'splash-signup-confirm-password',
        'login-email', 'login-password',
        'signup-name', 'signup-email', 'signup-password', 'signup-confirm-password'
      ];
      inputIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });

      // 3. Reset all forms
      const formIds = ['splash-signin-form', 'splash-signup-form', 'login-form', 'signup-form'];
      formIds.forEach(id => {
        const f = document.getElementById(id);
        if (f) f.reset();
      });

      // 4. Hide all saved journey pass banners and restore manual train selectors
      const splashBanner = document.getElementById('splash-signin-saved-pass-banner');
      const splashTrainContainer = document.getElementById('splash-signin-train-selector-container');
      if (splashBanner) splashBanner.classList.add('hidden');
      if (splashTrainContainer) splashTrainContainer.classList.remove('hidden');

      const modalBanner = document.getElementById('login-saved-pass-banner');
      const modalTrainContainer = document.getElementById('login-train-selector-container');
      if (modalBanner) modalBanner.classList.add('hidden');
      if (modalTrainContainer) modalTrainContainer.classList.remove('hidden');

      // 5. Hide secondary modal if open
      const loginModal = document.getElementById('login-modal');
      if (loginModal) {
        loginModal.classList.add('hidden');
        loginModal.style.display = 'none';
      }

      // 6. Reset UI navbar sign-in buttons
      const openBtn = document.getElementById('btn-open-login');
      const desktopLabel = document.getElementById('desktop-login-label');
      const mobileOpenBtn = document.getElementById('mobile-drawer-login-btn');
      if (desktopLabel) desktopLabel.textContent = "Sign In";
      if (openBtn) openBtn.innerHTML = `<i data-lucide="user-check" class="w-4 h-4 text-[#D99B26]"></i> <span id="desktop-login-label">Sign In</span>`;
      if (mobileOpenBtn) mobileOpenBtn.innerHTML = `<i data-lucide="user-check" class="w-4 h-4"></i> <span>Sign In / Account</span>`;
      if (window.lucide) lucide.createIcons();

      // 7. Reset selected train to default
      setSelectedTrain('blue-train');

      // 8. Always automatically reload cleanly directly to the login splash page with zero information
      window.location.href = '/';
    };
    window.TrackTalesSignOutAndReload = handleSignOutAndReload;

    // Splash Sign Out button
    const splashSignoutBtn = document.getElementById('splash-signout-btn');
    if (splashSignoutBtn) {
      splashSignoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSignOutAndReload(true);
      });
    }

    // --- Interactive 2-Train Selection State & Synchronization ---
    let selectedTrain = localStorage.getItem('tracktales_selected_train') || 'blue-train';

    const setSelectedTrain = (trainId) => {
      selectedTrain = trainId;
      localStorage.setItem('tracktales_selected_train', trainId);

      const isBlue = trainId === 'blue-train';
      const trainName = isBlue ? 'The Blue Train' : 'Rovos Rail Safari';

      // 1. Update all train choice buttons across forms and modals
      const trainChoiceBtns = document.querySelectorAll('.splash-train-choice-btn');
      trainChoiceBtns.forEach(btn => {
        const btnTrain = btn.getAttribute('data-train-choice');
        const radioCircle = btn.querySelector('.train-choice-radio');
        const checkIcon = btn.querySelector('i');

        if (btnTrain === trainId) {
          btn.classList.add('active');
          if (btnTrain === 'blue-train') {
            btn.classList.add('active-blue', 'bg-[#D99B26]/15', 'border-[#D99B26]');
            btn.classList.remove('active-rovos', 'border-[#E7E2D8]', 'bg-white/70');
            if (radioCircle) {
              radioCircle.className = "train-choice-radio w-3.5 h-3.5 rounded-full border-2 border-[#D99B26] bg-[#D99B26] flex items-center justify-center";
            }
          } else {
            btn.classList.add('active-rovos', 'bg-[#2A9D8F]/15', 'border-[#2A9D8F]');
            btn.classList.remove('active-blue', 'border-[#E7E2D8]', 'bg-white/70');
            if (radioCircle) {
              radioCircle.className = "train-choice-radio w-3.5 h-3.5 rounded-full border-2 border-[#2A9D8F] bg-[#2A9D8F] flex items-center justify-center";
            }
          }
          if (checkIcon) checkIcon.classList.remove('hidden');
        } else {
          btn.classList.remove('active', 'active-blue', 'active-rovos', 'bg-[#D99B26]/15', 'bg-[#2A9D8F]/15', 'border-[#D99B26]', 'border-[#2A9D8F]');
          btn.classList.add('border-[#E7E2D8]', 'bg-white/70');
          if (radioCircle) {
            radioCircle.className = "train-choice-radio w-3.5 h-3.5 rounded-full border-2 border-[#D6CFC7] bg-transparent flex items-center justify-center";
          }
          if (checkIcon) checkIcon.classList.add('hidden');
        }
      });

      // 2. Update train labels in signin/signup/logged-in views
      const signinTrainLabel = document.getElementById('splash-signin-train-label');
      const signupTrainLabel = document.getElementById('splash-signup-train-label');
      const loggedInTrainBadge = document.getElementById('splash-logged-in-train-badge');

      if (signinTrainLabel) {
        signinTrainLabel.textContent = trainName;
        signinTrainLabel.className = `text-[10px] font-mono font-bold ${isBlue ? 'text-[#D99B26]' : 'text-[#2A9D8F]'}`;
      }
      if (signupTrainLabel) {
        signupTrainLabel.textContent = trainName;
        signupTrainLabel.className = `text-[10px] font-mono font-bold ${isBlue ? 'text-[#D99B26]' : 'text-[#2A9D8F]'}`;
      }
      if (loggedInTrainBadge) {
        loggedInTrainBadge.textContent = trainName;
        loggedInTrainBadge.className = `text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full uppercase text-white ${isBlue ? 'bg-[#D99B26]' : 'bg-[#2A9D8F]'}`;
      }

      // 3. Update Nav Bar & Mobile Drawer Train Badges
      const navTrainLabel = document.getElementById('nav-train-label');
      const navTrainBadge = document.getElementById('nav-train-badge');
      const mobileTrainLabel = document.getElementById('mobile-train-label');
      const mobileTrainBadge = document.getElementById('mobile-train-badge');
      const shortTrainName = isBlue ? 'The Blue Train' : 'Rovos Rail';

      if (navTrainLabel) navTrainLabel.textContent = shortTrainName;
      const navHubSelectedTrain = document.getElementById('nav-hub-selected-train');
      if (navHubSelectedTrain) navHubSelectedTrain.textContent = shortTrainName;
      if (navTrainBadge) {
        navTrainBadge.className = `glass-button px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs font-mono text-[#0A0C10] flex items-center gap-1.5 shadow-sm ${isBlue ? 'border-[#D99B26]/40 bg-[#D99B26]/10' : 'border-[#2A9D8F]/40 bg-[#2A9D8F]/10'}`;
        const icon = navTrainBadge.querySelector('i');
        if (icon) icon.className = `w-3.5 h-3.5 ${isBlue ? 'text-[#D99B26]' : 'text-[#2A9D8F]'}`;
      }

      if (mobileTrainLabel) {
        mobileTrainLabel.textContent = shortTrainName;
        mobileTrainLabel.className = `text-[10px] font-bold uppercase ${isBlue ? 'text-[#D99B26]' : 'text-[#2A9D8F]'}`;
      }
      if (mobileTrainBadge) {
        mobileTrainBadge.className = `py-3 px-4 rounded-lg border text-[#0A0C10] flex items-center justify-between font-semibold ${isBlue ? 'bg-[#D99B26]/10 border-[#D99B26]/30' : 'bg-[#2A9D8F]/10 border-[#2A9D8F]/30'}`;
      }

      // 4. Update Right Panel Interactive Cards
      const cardBlue = document.getElementById('splash-card-blue');
      const cardRovos = document.getElementById('splash-card-rovos');

      if (cardBlue && cardRovos) {
        if (isBlue) {
          cardBlue.classList.add('selected-blue');
          cardBlue.classList.remove('unselected');

          cardRovos.classList.remove('selected-rovos');
          cardRovos.classList.add('unselected');
        } else {
          cardRovos.classList.add('selected-rovos');
          cardRovos.classList.remove('unselected');

          cardBlue.classList.remove('selected-blue');
          cardBlue.classList.add('unselected');
        }
      }

      // 5. Sync Ticket Form dropdown if present
      const selectTrainInput = document.getElementById('select-train');
      if (selectTrainInput) {
        selectTrainInput.value = trainId;
      }

      // 6. Sync Route Map train filter if present
      const trainFilterBtns = document.querySelectorAll('.train-select-btn');
      trainFilterBtns.forEach(btn => {
        if (btn.getAttribute('data-train-filter') === trainId) {
          btn.classList.add('active');
        } else if (btn.getAttribute('data-train-filter') !== 'all') {
          btn.classList.remove('active');
        }
      });

      // 7. Dynamic re-rendering across all platform views for the selected train ONLY!
      if (typeof renderHomeHero === 'function') {
        renderHomeHero(trainId);
      }
      if (typeof renderTrains === 'function') {
        renderTrains(trainId);
      }
      if (typeof renderStories === 'function') {
        renderStories(trainId);
      }
      const activeSub = localStorage.getItem('tracktales_subscription') || 'free';
      if (typeof window.TrackTalesRenderSubscriptionFeatures === 'function') {
        window.TrackTalesRenderSubscriptionFeatures(activeSub, trainId);
      }
      if (typeof window.TrackTalesRenderCorridorCards === 'function') {
        window.TrackTalesRenderCorridorCards(trainId);
      }

      if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
    };

    // Expose helpers globally for cross-module integration
    window.TrackTalesSetSelectedTrain = setSelectedTrain;
    window.TrackTalesGetRegisteredUser = getRegisteredUserRecord;
    window.TrackTalesSaveRegisteredUser = saveRegisteredUserRecord;

    // --- Dynamic Passenger Recognition Engine ---
    const updatePassengerRecognition = (email, bannerId, nameId, selectorContainerId) => {
      const banner = document.getElementById(bannerId);
      const nameEl = document.getElementById(nameId);
      const selectorContainer = document.getElementById(selectorContainerId);
      
      const user = getRegisteredUserRecord(email);
      if (user && user.preferred_train) {
        const isBlue = user.preferred_train === 'blue-train';
        const trainName = isBlue ? 'The Blue Train (Ultra Luxury)' : 'Rovos Rail Safari (Edwardian Safari)';
        
        // Auto-select their registered train preference
        setSelectedTrain(user.preferred_train);
        
        if (banner && nameEl) {
          nameEl.textContent = trainName;
          nameEl.className = `font-bold font-sans ${isBlue ? 'text-[#D99B26]' : 'text-[#2A9D8F]'}`;
          
          if (isBlue) {
            banner.className = 'p-3 rounded-2xl bg-[#D99B26]/10 border border-[#D99B26]/30 flex items-center justify-between text-xs transition-all';
          } else {
            banner.className = 'p-3 rounded-2xl bg-[#2A9D8F]/10 border border-[#2A9D8F]/30 flex items-center justify-between text-xs transition-all';
          }
          
          banner.classList.remove('hidden');
        }
        
        // Hide the train selector so user doesn't have to select a train anymore!
        if (selectorContainer) {
          selectorContainer.classList.add('hidden');
        }
      } else {
        if (banner) {
          banner.classList.add('hidden');
        }
        // Show manual train selector for new/unregistered users
        if (selectorContainer) {
          selectorContainer.classList.remove('hidden');
        }
      }
    };
    window.TrackTalesUpdatePassengerRecognition = updatePassengerRecognition;

    // Real-time listener for passenger recognition on Sign In email typing
    const splashEmailInput = document.getElementById('splash-signin-email');
    if (splashEmailInput) {
      const handleSplashEmailCheck = () => {
        updatePassengerRecognition(
          splashEmailInput.value,
          'splash-signin-saved-pass-banner',
          'splash-signin-saved-pass-name',
          'splash-signin-train-selector-container'
        );
      };
      splashEmailInput.addEventListener('input', handleSplashEmailCheck);
      splashEmailInput.addEventListener('change', handleSplashEmailCheck);
      splashEmailInput.addEventListener('keyup', handleSplashEmailCheck);
      splashEmailInput.addEventListener('paste', () => setTimeout(handleSplashEmailCheck, 40));
    }

    // Quick Demo Credentials Auto-Fill
    const demoFillBtn = document.getElementById('splash-demo-fill-btn');
    if (demoFillBtn) {
      demoFillBtn.addEventListener('click', () => {
        const emailInput = document.getElementById('splash-signin-email');
        const passInput = document.getElementById('splash-signin-password');
        if (emailInput) emailInput.value = 'passenger@tracktales.co.za';
        if (passInput) passInput.value = 'tracktales2026';
        updatePassengerRecognition(
          'passenger@tracktales.co.za',
          'splash-signin-saved-pass-banner',
          'splash-signin-saved-pass-name',
          'splash-signin-train-selector-container'
        );
        showAlert("Demo passenger credentials loaded! Registered pass recognized.", "success");
      });
    }

    // Attach click listeners to train choices across splash screen and modal
    document.querySelectorAll('.splash-train-choice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const train = btn.getAttribute('data-train-choice');
        if (train) setSelectedTrain(train);
      });
    });

    document.querySelectorAll('.splash-train-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const train = card.getAttribute('data-train-choice');
        if (train) {
          setSelectedTrain(train);
        }
      });
    });

    // Delegated click listener as fail-safe for any child element clicks
    document.addEventListener('click', (e) => {
      const choiceEl = e.target.closest('[data-train-choice]');
      if (choiceEl) {
        const train = choiceEl.getAttribute('data-train-choice');
        if (train) {
          setSelectedTrain(train);
        }
      }
    });

    // Initialize with stored or default train
    setSelectedTrain(selectedTrain);

    // --- Sign In Form Submission ---
    const splashSigninForm = document.getElementById('splash-signin-form');
    if (splashSigninForm) {
      splashSigninForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('splash-signin-email').value.trim().toLowerCase();
        const password = document.getElementById('splash-signin-password').value;
        const btnLabel = document.getElementById('splash-signin-btn-label');
        const rememberMe = document.getElementById('splash-remember-me');

        if (btnLabel) btnLabel.textContent = "Authenticating...";

        setTimeout(() => {
          const userRecord = getRegisteredUserRecord(email);
          
          if (!userRecord || userRecord.password !== password) {
            showAlert("Incorrect email or password! Please check your credentials.", "error");
            if (btnLabel) btnLabel.textContent = "SIGN IN";
            return;
          }

          // Use the registered user's saved train preference automatically!
          const rememberedTrain = userRecord.preferred_train || selectedTrain || 'blue-train';
          setSelectedTrain(rememberedTrain);

          const displayName = userRecord.name || email.split('@')[0].replace('.', ' ').toUpperCase();
          const userObj = {
            name: displayName,
            email: email,
            preferred_train: rememberedTrain
          };

          localStorage.setItem('tracktales_logged_user', JSON.stringify(userObj));
          localStorage.setItem('tracktales_selected_train', rememberedTrain);

          if (!rememberMe || rememberMe.checked) {
            localStorage.setItem('last_user', email);
            localStorage.setItem('last_password', password);
          } else {
            localStorage.removeItem('last_user');
            localStorage.removeItem('last_password');
          }

          const openBtn = document.getElementById('btn-open-login');
          const desktopLabel = document.getElementById('desktop-login-label');
          if (desktopLabel) desktopLabel.textContent = "Sign Out";
          if (openBtn) openBtn.innerHTML = `<i data-lucide="log-out" class="w-4 h-4 text-[#D99B26]"></i> <span id="desktop-login-label">Sign Out</span>`;
          if (window.lucide) lucide.createIcons();

          const chosenTrainName = rememberedTrain === 'blue-train' ? 'The Blue Train' : 'Rovos Rail Safari';
          showAlert(`Welcome aboard, ${displayName}! Boarding your registered journey on ${chosenTrainName}...`, "success");

          setTimeout(() => {
            dismissSplash();
            if (window.TrackTalesOpenSubscriptionModal) {
              setTimeout(() => {
                window.TrackTalesOpenSubscriptionModal();
              }, 350);
            }
          }, 450);
        }, 300);
      });
    }

    // --- Sign Up Form Submission ---
    const splashSignupForm = document.getElementById('splash-signup-form');
    if (splashSignupForm) {
      splashSignupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('splash-signup-name').value.trim();
        const email = document.getElementById('splash-signup-email').value.trim().toLowerCase();
        const password = document.getElementById('splash-signup-password').value;
        const confirmPassword = document.getElementById('splash-signup-confirm-password').value;
        const btnLabel = document.getElementById('splash-signup-btn-label');

        if (password !== confirmPassword) {
          showAlert("Passwords do not match!", "error");
          return;
        }

        const existingRecord = getRegisteredUserRecord(email);
        if (existingRecord) {
          showAlert("An account with this email already exists! Switching to Sign In...", "error");
          showSignIn();
          const emailInput = document.getElementById('splash-signin-email');
          if (emailInput) {
            emailInput.value = email;
            updatePassengerRecognition(
              email,
              'splash-signin-saved-pass-banner',
              'splash-signin-saved-pass-name',
              'splash-signin-train-selector-container'
            );
          }
          return;
        }

        if (btnLabel) btnLabel.textContent = "Registering Passport...";

        setTimeout(() => {
          // Save full user profile with their selected train preference
          const savedUser = saveRegisteredUserRecord({
            name: name || email.split('@')[0],
            email: email,
            password: password,
            preferred_train: selectedTrain,
            created_at: new Date().toISOString()
          });
          
          const displayName = savedUser.name || name || email.split('@')[0];
          const userObj = {
            name: displayName,
            email: email,
            preferred_train: selectedTrain
          };

          localStorage.setItem('tracktales_logged_user', JSON.stringify(userObj));
          localStorage.setItem('tracktales_selected_train', selectedTrain);
          localStorage.setItem('last_user', email);
          localStorage.setItem('last_password', password);

          const openBtn = document.getElementById('btn-open-login');
          const desktopLabel = document.getElementById('desktop-login-label');
          if (desktopLabel) desktopLabel.textContent = "Sign Out";
          if (openBtn) openBtn.innerHTML = `<i data-lucide="log-out" class="w-4 h-4 text-[#D99B26]"></i> <span id="desktop-login-label">Sign Out</span>`;
          if (window.lucide) lucide.createIcons();

          const chosenTrainName = selectedTrain === 'blue-train' ? 'The Blue Train' : 'Rovos Rail Safari';
          showAlert(`Welcome, ${displayName}! Your pass for ${chosenTrainName} is safely saved. Boarding...`, "success");

          setTimeout(() => {
            dismissSplash();
            if (window.TrackTalesOpenSubscriptionModal) {
              setTimeout(() => {
                window.TrackTalesOpenSubscriptionModal();
              }, 350);
            }
          }, 450);
        }, 300);
      });
    }

    if (window.lucide) lucide.createIcons();
  }

  // ==========================================================================
  // --- 2. PASSENGER JOURNEY SUBSCRIPTION ENGINE & DYNAMIC FEATURE MANAGER ---
  // ==========================================================================
  
  const SUBSCRIPTION_PLANS = {
    'free': {
      id: 'free',
      name: 'Free Journey',
      price: 'R0',
      price_val: 0,
      badge: 'Free',
      purpose: 'Acquisition + product discovery',
      description: 'Route map, selected stops, selected stories & station trivia.',
      hasVault: false,
      hasAudio: false,
      hasMasterQuiz: false,
      color: '#78716C'
    },
    'premium-pack': {
      id: 'premium-pack',
      name: 'Premium Journey Pack',
      price: 'R79',
      price_val: 79,
      badge: 'Premium (R79)',
      purpose: 'Primary first revenue test',
      description: 'Full route story set, deeper historical content & archival dossiers, extra trivia/collections.',
      hasVault: true,
      hasAudio: false,
      hasMasterQuiz: true,
      color: '#D99B26'
    },
    'audio-exp': {
      id: 'audio-exp',
      name: 'Audio Experience',
      price: 'R49',
      price_val: 49,
      badge: 'Audio (R49)',
      purpose: 'Second willingness-to-pay test',
      description: 'Narrated / listenable version of selected journey stories with speech synthesizer and soundscapes.',
      hasVault: false,
      hasAudio: true,
      hasMasterQuiz: false,
      color: '#2A9D8F'
    },
    'membership': {
      id: 'membership',
      name: 'Future Membership',
      price: 'R149',
      price_val: 149,
      badge: 'VIP All-Access',
      purpose: 'Retention model after repeat demand is proven',
      description: 'Ongoing access to multiple premium experiences (Deeper Vault + Narrated Audio + VIP Pass).',
      hasVault: true,
      hasAudio: true,
      hasMasterQuiz: true,
      color: '#4A52B0'
    }
  };

  // --- Deeper Historical Archival Dossiers (Filtered Per Selected Train) ---
  const PREMIUM_HISTORICAL_DOSSIERS = {
    'blue-train': [
      {
        id: 'bt-dossier-1',
        code: 'DOSSIER REF: ZA-BT-1946',
        badge: 'TOP SECRET · DECLASSIFIED ARCHIVE',
        title: '1946 Wartime Gold Bullion Secret Runs',
        subtitle: 'Classified Nighttime Operations from Pretoria to Simon\'s Town Naval Dock',
        date: 'August 1946 · Union Limited Era',
        read_time: '4 min archive',
        img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        caption: 'Gold bullion transport ledger & armored train blueprint',
        summary: 'Under absolute radio silence, The Blue Train\'s predecessor carried tons of South African Reserve Bank gold bullion through the Karoo to Royal Navy cruisers.',
        content: `In the aftermath of World War II, the South African Reserve Bank and the British Admiralty conducted classified gold movements across the subcontinent. Disguised as ordinary scheduled passenger expresses, armored baggage cars were reinforced with triple-layered Swedish steel plate.\n\nGuarded by an elite detachment of Railway Police armed with .303 Lee-Enfield rifles, the train navigated the 1,600 km corridor in total blackout, extinguishing all external lanterns while racing through the Karoo desert. The gold was transferred directly into the holds of HMS Vanguard and HMS Nelson at Simon's Town dockyard, funding crucial post-war sterling stabilization.`
      },
      {
        id: 'bt-dossier-2',
        code: 'DOSSIER REF: ZA-BT-1972',
        badge: 'TECHNICAL SCHEMATICS · UNION CARRIAGE & WAGON',
        title: 'Air-Cushioned High-Speed Bogie & 24K Gold Acoustic Glazing',
        subtitle: 'Engineering Marvels Built in Nigel, Transvaal for 90 km/h Luxury Glide',
        date: '1972 Technical Commission · Nigel Works',
        read_time: '5 min archive',
        img: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
        caption: 'Nigel Engineering Works technical schematics & gold vapor deposition testing',
        summary: 'How South African aerospace metallurgists vaporized pure 24-karat gold onto double-glazed window glass to withstand 45°C Karoo heatwaves and block track reverberation.',
        content: `In 1972, South African Railways commissioned Union Carriage & Wagon (UCW) in Nigel to build the most technically advanced luxury train in existence. The challenge: insulating passengers from the extreme 45°C temperature swings and desert soundwaves of the Great Karoo.\n\nEngineers developed a proprietary vacuum chamber deposition technique, coating outer window panes with a microscopic 0.05-micron layer of vaporized 24-karat gold. This reflected 90% of solar infrared radiation while maintaining perfect optical clarity. Combined with secondary pneumatic air-suspension bogies that automatically compensate for track curves, The Blue Train delivers a glide so smooth that full glasses of champagne in the dining car never spill a drop.`
      },
      {
        id: 'bt-dossier-3',
        code: 'DOSSIER REF: ZA-BT-1963',
        badge: 'POLICE ARCHIVES · DECLASSIFIED INVESTIGATION',
        title: 'The Great Karoo Midnight Diamond Vault Attempt',
        subtitle: 'The 1963 Beaufort West Express Safe Heist That Revolutionized Train Security',
        date: 'November 1963 · Beaufort West Crossing',
        read_time: '3 min archive',
        img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        caption: 'Railway Police evidence archive & reinforced master safe design',
        summary: 'A dramatic attempted midnight safe burglary during the transit between Kimberley and Beaufort West, resulting in the creation of today\'s ultra-secure en-suite digital vaults.',
        content: `On a cold midnight in November 1963, an international syndicate boarded The Blue Train at Kimberley under aliases, intending to breach the merchant courier safe in carriage 4. As the train steamed through the Karoo, the syndicate attempted to neutralize the safe locks using specialized oxyacetylene torches.\n\nThe vigilant night conductor noticed abnormal current fluctuations in the dining car electrical circuit and immediately pulled the Westinghouse emergency brake cord. The train came to a screeching halt 15 km outside Beaufort West, where Railway Police surrounded the carriage. The attempt failed completely and directly influenced modern electronic biometric safes fitted across all suites today.`
      }
    ],
    'rovos-rail': [
      {
        id: 'rr-dossier-1',
        code: 'DOSSIER REF: ZA-RR-1986',
        badge: 'LOCOMOTIVE ARCHIVES · FOUNDER\'S MISSION',
        title: 'The Witbank Steam Graveyard Resurrection',
        subtitle: 'How Rohan Vos Rescued Abandoned 1920s Steam Giants from the Scrap Heap',
        date: '1986–1989 · Witbank & Capital Park Yards',
        read_time: '4 min archive',
        img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
        caption: 'Restoration workshop logs at Capital Park Steam Depot',
        summary: 'The audacious founding story of scouting derelict coal yards and industrial scrap heaps to rescue Class 19D and Class 25NC steam locomotives destined for the furnace.',
        content: `In 1986, when South African Railways was rapidly retiring and scrapping its steam locomotive fleet in favor of diesel and electric traction, Rohan Vos saw an irreplaceable part of human history disappearing.\n\nTraveling across remote coal mines in Witbank, scrap merchant depots in Bloemfontein, and derelict roundhouses in Natal, Vos bought abandoned Class 19D and Class 25NC locomotives for scrap metal value. Transported to the Capital Park railway workshops in Pretoria, over 100 master mechanics, boiler-makers, and timber artisans spent three intensive years hand-machining parts and re-tubing boilers, creating the magnificent operational steam fleet that powers Rovos Rail today.`
      },
      {
        id: 'rr-dossier-2',
        code: 'DOSSIER REF: ZA-RR-1899',
        badge: 'MILITARY ARCHIVES · WAR TELEGRAPH RECORDS',
        title: '1899 Anglo-Boer War Military Telegraphs of Matjiesfontein',
        subtitle: 'Original Transmissions Between Lord Milner and British Command Headquarters',
        date: 'October 1899 · Matjiesfontein Rail Depot',
        read_time: '5 min archive',
        img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        caption: 'Declassified 1899 Lord Milner telegraph transcript & military train orders',
        summary: 'Declassified telegram transmissions documenting armored steam train patrols and military supply lines headquartered at the historic Lord Milner Hotel.',
        content: `During the Anglo-Boer War (1899–1902), the remote Karoo railway village of Matjiesfontein was converted into the primary British Western Cape military headquarters under Major-General Douglas Haig and Lord Roberts.\n\nOver 12,000 imperial troops and 20,000 horses camped on the village outskirts, while the hotel's Victorian turret was equipped with a signaling heliograph mirror. Declassified railway dispatch records reveal the deployment of custom armored steam locomotives, clad with 12mm boiler iron and Maxim machine guns, tasked with defending the vital 1,600 km telegraph wires and water reservoirs along the rail corridor.`
      },
      {
        id: 'rr-dossier-3',
        code: 'DOSSIER REF: ZA-RR-1920',
        badge: 'ARTISAN DOSSIER · VINTAGE WOODCRAFT',
        title: 'The Edwardian Teak Carriage Restoration Logs',
        subtitle: 'Meticulous 1920s Mahogany, Brass Lathe, and Teak Timber Rebuilding Records',
        date: 'Artisan Archives · Capital Park Workshops',
        read_time: '4 min archive',
        img: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
        caption: 'Handcrafted teak carriage panelling & antique brass fitting registers',
        summary: 'Detailed restoration records showing the painstaking artisan techniques used to preserve original 1920s Edwardian wood panelling and brass filigree.',
        content: `Every Rovos Rail carriage has an individual history, with some car shells dating back to 1911 built for royalty, private mining magnates, and colonial governors. In the Capital Park workshops, each carriage is stripped down to its bare iron chassis.\n\nMaster cabinetmakers meticulously source aged Burmese teak and African mahogany, hand-planing and applying seven coats of marine-grade spar varnish. Antique brass lamp brackets, Victorian porcelain washbasins, and clawfoot tubs are restored by hand. The result is an authentic living museum where travelers experience true Golden Age opulence.`
      }
    ]
  };

  // --- Master Historian Bonus Questions (Filtered Per Selected Train) ---
  const MASTER_HISTORIAN_CHALLENGES = {
    'blue-train': [
      {
        id: 'mh-bt-1',
        title: 'Master Challenge 1: The 24K Gold Glazing',
        prompt: 'What precious material is microscopically vaporized onto The Blue Train\'s double-glazed windows to block 90% of Karoo solar heat?',
        options: ['24-Karat Pure Gold', 'Platinum-Silver Alloy', 'Cobalt Blue Oxide', 'Titanium Quartz'],
        correctIndex: 0,
        fact: 'Correct! The Blue Train windows feature 24K gold vapor deposition, creating its signature warm reflective glow while keeping the interior cool in 45°C Karoo summers.',
        pts: 250
      },
      {
        id: 'mh-bt-2',
        title: 'Master Challenge 2: The Royal Livery',
        prompt: 'In which year did the Union Limited express officially adopt its iconic royal blue livery and become "The Blue Train"?',
        options: ['1946 (Post-WWII Inauguration)', '1923 (Steam Era)', '1960 (Republic Era)', '1985 (Digital Era)'],
        correctIndex: 0,
        fact: 'Spot on! In 1946, South African Railways repainted the rolling stock in distinctive royal blue and cream, officially christening it The Blue Train.',
        pts: 250
      }
    ],
    'rovos-rail': [
      {
        id: 'mh-rr-1',
        title: 'Master Challenge 1: Steam Graveyard Salvage',
        prompt: 'Which famous South African coal mining district was the primary source for Rohan Vos\'s rescued Class 19D steam engines in 1986?',
        options: ['Witbank Coalfield', 'Dundee Iron Range', 'Kimberley Diamond Basin', 'Saldanha Bay Yard'],
        correctIndex: 0,
        fact: 'Excellent! Rohan Vos scouted Witbank\'s industrial scrap yards to rescue the iconic Class 19D and Class 25NC steam locomotives.',
        pts: 250
      },
      {
        id: 'mh-rr-2',
        title: 'Master Challenge 2: Victorian Rail Oasis',
        prompt: 'Which preserved Victorian railway village along the Rovos Rail route was the first in South Africa to have electric streetlights in 1890?',
        options: ['Matjiesfontein', 'Beaufort West', 'Touws River', 'De Aar'],
        correctIndex: 0,
        fact: 'Correct! Logan\'s oasis at Matjiesfontein had electric streetlights installed in 1890, years ahead of major South African cities!',
        pts: 250
      }
    ]
  };

  // --- Dynamic Subscription Feature Renderer ---
  function renderSubscriptionFeatures(planId, trainId) {
    const currentPlanId = planId || localStorage.getItem('tracktales_subscription') || 'free';
    const currentTrainId = trainId || localStorage.getItem('tracktales_selected_train') || 'blue-train';
    const plan = SUBSCRIPTION_PLANS[currentPlanId] || SUBSCRIPTION_PLANS['free'];
    const isBlue = currentTrainId === 'blue-train';
    const trainName = isBlue ? 'The Blue Train' : 'Rovos Rail';

    // 1. Render Status Bar on Stories Page
    const subStatusBar = document.getElementById('stories-sub-status-bar');
    const activeSubName = document.getElementById('stories-active-sub-name');
    if (subStatusBar && activeSubName) {
      activeSubName.textContent = `${plan.name} (${plan.price})`;
      if (currentPlanId === 'free') {
        subStatusBar.className = 'max-w-xl mx-auto mb-8 p-3 rounded-2xl border border-[#EBE5D9] bg-[#FAF8F5] flex items-center justify-between text-xs font-mono transition-all';
      } else if (currentPlanId === 'premium-pack') {
        subStatusBar.className = 'max-w-xl mx-auto mb-8 p-3 rounded-2xl border border-[#D99B26]/40 bg-[#D99B26]/10 flex items-center justify-between text-xs font-mono transition-all';
      } else if (currentPlanId === 'audio-exp') {
        subStatusBar.className = 'max-w-xl mx-auto mb-8 p-3 rounded-2xl border border-[#2A9D8F]/40 bg-[#2A9D8F]/10 flex items-center justify-between text-xs font-mono transition-all';
      } else {
        subStatusBar.className = 'max-w-xl mx-auto mb-8 p-3 rounded-2xl border border-[#4A52B0]/40 bg-[#4A52B0]/10 flex items-center justify-between text-xs font-mono transition-all';
      }
    }

    const upgradeFromStoriesBtn = document.getElementById('btn-upgrade-from-stories');
    if (upgradeFromStoriesBtn) {
      upgradeFromStoriesBtn.onclick = () => {
        if (window.TrackTalesOpenSubscriptionModal) window.TrackTalesOpenSubscriptionModal();
      };
    }

    // 2. Render Deeper Historical Content Vault Section (#premium-vault-section)
    const vaultSection = document.getElementById('premium-vault-section');
    if (vaultSection) {
      const dossiers = PREMIUM_HISTORICAL_DOSSIERS[currentTrainId] || PREMIUM_HISTORICAL_DOSSIERS['blue-train'];

      if (plan.hasVault) {
        // UNLOCKED VIEW: Full Archival Dossiers
        vaultSection.innerHTML = `
          <div class="glass-card p-8 sm:p-10 rounded-3xl border-2 border-[#D99B26]/40 shadow-xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF8F5] text-left">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#EBE5D9]">
              <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono bg-[#D99B26]/20 text-[#B87C10] border border-[#D99B26]/40 uppercase font-extrabold tracking-wider mb-2">
                  <i data-lucide="shield-check" class="w-3.5 h-3.5 text-[#D99B26]"></i>
                  <span>PREMIUM ARCHIVAL VAULT UNLOCKED · ${trainName.toUpperCase()}</span>
                </div>
                <h3 class="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A0C10]">
                  Deeper Historical <span class="text-[#B87C10] italic font-serif">Archival Dossiers</span>
                </h3>
                <p class="text-xs text-[#78716C] font-sans mt-1">
                  Access declassified rail ledgers, wartime secret runs, and blueprint schematics for ${trainName}.
                </p>
              </div>
              <span class="text-xs font-mono font-bold text-[#B87C10] px-3.5 py-1.5 rounded-xl bg-[#D99B26]/15 border border-[#D99B26]/30 shrink-0">
                ${dossiers.length} Declassified Files
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${dossiers.map(dossier => `
                <div class="p-6 rounded-2xl bg-white border border-[#EBE5D9] hover:border-[#D99B26] transition-all duration-300 shadow-sm flex flex-col justify-between group">
                  <div>
                    <div class="relative rounded-xl overflow-hidden aspect-[16/10] mb-4 border border-[#EBE5D9]">
                      <img src="${dossier.img}" alt="${dossier.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                      <span class="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 text-white font-mono text-[9px] font-bold tracking-wider">
                        ${dossier.code}
                      </span>
                    </div>

                    <div class="flex items-center justify-between gap-2 mb-2">
                      <span class="text-[9px] font-mono font-extrabold uppercase text-[#B87C10] tracking-wider">${dossier.date}</span>
                      <span class="text-[10px] font-mono text-[#78716C]">${dossier.read_time}</span>
                    </div>

                    <h4 class="font-heading font-bold text-lg text-[#0A0C10] mb-2 leading-snug group-hover:text-[#B87C10] transition-colors">
                      ${dossier.title}
                    </h4>

                    <p class="text-xs text-[#44403C] font-sans leading-relaxed mb-6">
                      ${dossier.summary}
                    </p>
                  </div>

                  <button class="w-full py-2.5 rounded-xl bg-[#D99B26]/15 hover:bg-[#D99B26] text-[#B87C10] hover:text-white border border-[#D99B26]/30 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 btn-inspect-dossier" data-dossier-id="${dossier.id}">
                    <i data-lucide="file-text" class="w-4 h-4"></i>
                    <span>Inspect Dossier</span>
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        `;

        // Attach dossier modal triggers
        vaultSection.querySelectorAll('.btn-inspect-dossier').forEach(btn => {
          btn.addEventListener('click', () => {
            const dossierId = btn.getAttribute('data-dossier-id');
            if (window.openDossierModal) window.openDossierModal(dossierId);
          });
        });

      } else {
        // LOCKED VIEW: Teaser Card with Upgrade Trigger
        vaultSection.innerHTML = `
          <div class="glass-card p-8 sm:p-10 rounded-3xl border border-dashed border-[#D99B26]/50 bg-gradient-to-b from-[#FAF8F5] to-[#F5F2EA] text-left relative overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 rounded-2xl bg-[#D99B26]/15 border border-[#D99B26]/30 text-[#D99B26] flex items-center justify-center shrink-0 shadow-sm">
                  <i data-lucide="lock" class="w-7 h-7"></i>
                </div>
                <div>
                  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono bg-[#D99B26]/15 text-[#B87C10] border border-[#D99B26]/30 uppercase font-extrabold tracking-wider mb-2">
                    <span>LOCKED FEATURE · PREMIUM JOURNEY PACK & VIP MEMBERSHIP</span>
                  </div>
                  <h3 class="font-heading font-extrabold text-2xl text-[#0A0C10] mb-2">
                    Deeper Historical Content & Archival Vault
                  </h3>
                  <p class="text-xs text-[#78716C] font-sans max-w-xl leading-relaxed">
                    Unlock declassified 1946 wartime gold bullion transport runs, 24K gold acoustic glazing engineering schematics, and historic telegrams for ${trainName}.
                  </p>
                </div>
              </div>

              <button type="button" id="btn-unlock-vault-cta" class="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-[#D99B26] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#C98B1E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D99B26]/20 shrink-0">
                <i data-lucide="crown" class="w-4 h-4"></i>
                <span>Unlock Historical Vault (R79)</span>
              </button>
            </div>
          </div>
        `;

        const unlockVaultBtn = document.getElementById('btn-unlock-vault-cta');
        if (unlockVaultBtn) {
          unlockVaultBtn.addEventListener('click', () => {
            if (window.TrackTalesOpenSubscriptionModal) window.TrackTalesOpenSubscriptionModal('premium-pack');
          });
        }
      }
    }

    // 3. Render Audio Story Companion Section (#audio-companion-section)
    const audioSection = document.getElementById('audio-companion-section');
    if (audioSection) {
      if (plan.hasAudio) {
        // UNLOCKED VIEW: Full Speech Synthesis & Ambient Soundscape Station
        audioSection.innerHTML = `
          <div class="glass-card p-8 sm:p-10 rounded-3xl border-2 border-[#2A9D8F]/40 shadow-xl bg-gradient-to-b from-[#F2FAF9] to-[#FAF8F5] text-left">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#EBE5D9]">
              <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono bg-[#2A9D8F]/20 text-[#2A9D8F] border border-[#2A9D8F]/40 uppercase font-extrabold tracking-wider mb-2">
                  <i data-lucide="headphones" class="w-3.5 h-3.5 text-[#2A9D8F]"></i>
                  <span>AUDIO EXPERIENCE PASS ACTIVE · ${trainName.toUpperCase()}</span>
                </div>
                <h3 class="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A0C10]">
                  Narrated Journey <span class="text-[#2A9D8F] italic font-serif">Audio Companion</span>
                </h3>
                <p class="text-xs text-[#78716C] font-sans mt-1">
                  Listen to live speech-synthesized narration of heritage stories, commentary, and ambient rail soundscapes.
                </p>
              </div>

              <!-- Animated Equalizer Waveform -->
              <div id="audio-equalizer-bars" class="flex items-center gap-1.5 h-8 px-4 py-1.5 rounded-2xl bg-white border border-[#2A9D8F]/30 shadow-sm shrink-0">
                <span class="w-1.5 h-4 bg-[#2A9D8F] rounded-full animate-pulse"></span>
                <span class="w-1.5 h-7 bg-[#2A9D8F] rounded-full animate-bounce"></span>
                <span class="w-1.5 h-3 bg-[#2A9D8F] rounded-full animate-pulse"></span>
                <span class="w-1.5 h-6 bg-[#2A9D8F] rounded-full animate-bounce"></span>
                <span class="w-1.5 h-5 bg-[#2A9D8F] rounded-full animate-pulse"></span>
                <span class="text-[10px] font-mono text-[#2A9D8F] font-bold ml-1.5" id="audio-eq-status">READY</span>
              </div>
            </div>

            <!-- Interactive Narration Console -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <!-- Left: Player Controls & Voice Selection -->
              <div class="lg:col-span-7 space-y-5">
                
                <!-- Story Select Dropdown -->
                <div>
                  <label class="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#78716C] mb-1.5">Select Journey Story to Listen:</label>
                  <select id="audio-story-selector" class="w-full p-3 rounded-xl bg-white border border-[#D6CFC7] font-sans text-xs font-semibold text-[#1C1917] focus:outline-none focus:border-[#2A9D8F]">
                    ${(appData.stories || FALLBACK_STORIES).filter(s => s.train_id === 'all' || s.train_id === currentTrainId).map(s => `
                      <option value="${s.id}">${s.title} (${s.read_time})</option>
                    `).join('')}
                  </select>
                </div>

                <!-- Voice Actor Profile Select -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button type="button" data-voice-profile="james" class="audio-voice-btn p-2.5 rounded-xl border-2 border-[#2A9D8F] bg-[#2A9D8F]/10 text-left transition-all active">
                    <span class="text-[10px] font-mono font-bold uppercase block text-[#2A9D8F]">Narrator James</span>
                    <span class="text-[9px] text-[#78716C] font-sans">Heritage Historian</span>
                  </button>
                  <button type="button" data-voice-profile="thandi" class="audio-voice-btn p-2.5 rounded-xl border-2 border-[#E7E2D8] bg-white text-left transition-all hover:border-[#2A9D8F]">
                    <span class="text-[10px] font-mono font-bold uppercase block text-[#1C1917]">Narrator Thandi</span>
                    <span class="text-[9px] text-[#78716C] font-sans">Karoo Explorer</span>
                  </button>
                  <button type="button" data-voice-profile="willem" class="audio-voice-btn p-2.5 rounded-xl border-2 border-[#E7E2D8] bg-white text-left transition-all hover:border-[#2A9D8F]">
                    <span class="text-[10px] font-mono font-bold uppercase block text-[#1C1917]">Narrator Willem</span>
                    <span class="text-[9px] text-[#78716C] font-sans">Steam Master</span>
                  </button>
                </div>

                <!-- Playback Action Row -->
                <div class="flex flex-wrap items-center gap-3 pt-2">
                  <button type="button" id="btn-audio-play-main" class="px-6 py-3.5 rounded-2xl bg-[#2A9D8F] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#238276] transition-all flex items-center gap-2 shadow-md">
                    <i data-lucide="play" class="w-4 h-4"></i>
                    <span id="audio-play-main-label">Play Story Audio</span>
                  </button>
                  <button type="button" id="btn-audio-stop-main" class="px-4 py-3.5 rounded-2xl border border-[#D6CFC7] text-[#44403C] font-mono text-xs font-bold uppercase hover:bg-black/5 transition-all flex items-center gap-1.5">
                    <i data-lucide="square" class="w-3.5 h-3.5"></i>
                    <span>Stop</span>
                  </button>

                  <!-- Speed Controls -->
                  <div class="flex items-center gap-1 ml-auto font-mono text-[10px] font-bold">
                    <span class="text-[#78716C] mr-1">Speed:</span>
                    <button type="button" data-speed="1.0" class="audio-speed-btn px-2.5 py-1.5 rounded-lg border-2 border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#2A9D8F] active">1.0x</button>
                    <button type="button" data-speed="1.25" class="audio-speed-btn px-2.5 py-1.5 rounded-lg border border-[#D6CFC7] bg-white text-[#78716C] hover:border-[#2A9D8F]">1.25x</button>
                    <button type="button" data-speed="1.5" class="audio-speed-btn px-2.5 py-1.5 rounded-lg border border-[#D6CFC7] bg-white text-[#78716C] hover:border-[#2A9D8F]">1.5x</button>
                  </div>
                </div>

              </div>

              <!-- Right: Ambient Rail Soundscape Generator -->
              <div class="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#EBE5D9] shadow-sm text-left space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2A9D8F]">Ambient Soundscape Mixer</span>
                  <span class="text-[9px] font-mono text-[#78716C] font-semibold">Web Audio Synthesizer</span>
                </div>

                <div class="space-y-2.5">
                  <button type="button" data-soundscape="chug" class="soundscape-btn w-full p-3 rounded-xl border text-xs font-sans font-semibold transition-all flex items-center justify-between border-[#EBE5D9] hover:border-[#2A9D8F] text-[#1C1917]">
                    <span class="flex items-center gap-2"><i data-lucide="train" class="w-4 h-4 text-[#2A9D8F]"></i> Karoo Track Chug & Steam</span>
                    <i data-lucide="volume-2" class="w-4 h-4 text-[#78716C]"></i>
                  </button>
                  <button type="button" data-soundscape="wind" class="soundscape-btn w-full p-3 rounded-xl border text-xs font-sans font-semibold transition-all flex items-center justify-between border-[#EBE5D9] hover:border-[#2A9D8F] text-[#1C1917]">
                    <span class="flex items-center gap-2"><i data-lucide="wind" class="w-4 h-4 text-[#2A9D8F]"></i> Great Karoo Desert Wind</span>
                    <i data-lucide="volume-2" class="w-4 h-4 text-[#78716C]"></i>
                  </button>
                  <button type="button" data-soundscape="lounge" class="soundscape-btn w-full p-3 rounded-xl border text-xs font-sans font-semibold transition-all flex items-center justify-between border-[#EBE5D9] hover:border-[#2A9D8F] text-[#1C1917]">
                    <span class="flex items-center gap-2"><i data-lucide="music" class="w-4 h-4 text-[#2A9D8F]"></i> Luxury Salon Cello & Piano</span>
                    <i data-lucide="volume-2" class="w-4 h-4 text-[#78716C]"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
        `;

        // Re-attach audio station events
        if (typeof window.TrackTalesSetupAudioStationEvents === 'function') {
          window.TrackTalesSetupAudioStationEvents();
        }

      } else {
        // LOCKED VIEW: Teaser Card with Upgrade Trigger
        audioSection.innerHTML = `
          <div class="glass-card p-8 sm:p-10 rounded-3xl border border-dashed border-[#2A9D8F]/50 bg-gradient-to-b from-[#FAF8F5] to-[#F0F8F6] text-left relative overflow-hidden">
            <div class="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 rounded-2xl bg-[#2A9D8F]/15 border border-[#2A9D8F]/30 text-[#2A9D8F] flex items-center justify-center shrink-0 shadow-sm">
                  <i data-lucide="headphones" class="w-7 h-7"></i>
                </div>
                <div>
                  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono bg-[#2A9D8F]/15 text-[#2A9D8F] border border-[#2A9D8F]/30 uppercase font-extrabold tracking-wider mb-2">
                    <span>LOCKED FEATURE · AUDIO EXPERIENCE & VIP MEMBERSHIP</span>
                  </div>
                  <h3 class="font-heading font-extrabold text-2xl text-[#0A0C10] mb-2">
                    Narrated / Listenable Journey Audio Companion
                  </h3>
                  <p class="text-xs text-[#78716C] font-sans max-w-xl leading-relaxed">
                    Unlock natural speech synthesis narrations of South Africa rail stories, voice actor profiles, and ambient Karoo soundscapes for ${trainName}.
                  </p>
                </div>
              </div>

              <button type="button" id="btn-unlock-audio-cta" class="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-[#2A9D8F] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#238276] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#2A9D8F]/20 shrink-0">
                <i data-lucide="headphones" class="w-4 h-4"></i>
                <span>Unlock Audio Pass (R49)</span>
              </button>
            </div>
          </div>
        `;

        const unlockAudioBtn = document.getElementById('btn-unlock-audio-cta');
        if (unlockAudioBtn) {
          unlockAudioBtn.addEventListener('click', () => {
            if (window.TrackTalesOpenSubscriptionModal) window.TrackTalesOpenSubscriptionModal('audio-exp');
          });
        }
      }
    }

    // 4. Render Master Historian Challenge on Games Page (#master-historian-section)
    const masterSection = document.getElementById('master-historian-section');
    if (masterSection) {
      const challenges = MASTER_HISTORIAN_CHALLENGES[currentTrainId] || MASTER_HISTORIAN_CHALLENGES['blue-train'];

      if (plan.hasMasterQuiz) {
        masterSection.innerHTML = `
          <div class="glass-card p-8 rounded-3xl border-2 border-[#D99B26]/40 shadow-xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF8F5] text-left">
            <div class="flex items-center justify-between mb-6 pb-4 border-b border-[#EBE5D9]">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#D99B26] text-white flex items-center justify-center shadow-md">
                  <i data-lucide="award" class="w-5 h-5"></i>
                </div>
                <div>
                  <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#B87C10] block">PREMIUM BONUS CHALLENGE</span>
                  <h3 class="font-heading font-extrabold text-xl text-[#0A0C10]">Master Historian Challenge (+250 PTS)</h3>
                </div>
              </div>
              <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#D99B26]/20 text-[#B87C10] border border-[#D99B26]/40">
                +250 PTS
              </span>
            </div>

            <div id="master-challenge-container" class="space-y-6">
              ${challenges.map((c, idx) => `
                <div class="p-6 rounded-2xl bg-white border border-[#EBE5D9] shadow-sm master-q-block" data-q-id="${c.id}">
                  <h4 class="font-heading font-bold text-base text-[#0A0C10] mb-2">${c.title}</h4>
                  <p class="text-xs text-[#44403C] font-sans mb-4">${c.prompt}</p>
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    ${c.options.map((opt, optIdx) => `
                      <button type="button" class="master-opt-btn p-3 rounded-xl border text-left text-xs font-sans font-semibold transition-all hover:border-[#D99B26]" data-opt-idx="${optIdx}" data-correct="${c.correctIndex === optIdx}">
                        ${opt}
                      </button>
                    `).join('')}
                  </div>

                  <div class="master-q-feedback hidden mt-3 p-3 rounded-xl text-xs font-mono font-bold"></div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

        // Attach master quiz button listeners
        masterSection.querySelectorAll('.master-opt-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const isCorrect = btn.getAttribute('data-correct') === 'true';
            const block = btn.closest('.master-q-block');
            const feedback = block.querySelector('.master-q-feedback');
            const allBtns = block.querySelectorAll('.master-opt-btn');

            allBtns.forEach(b => b.disabled = true);

            if (isCorrect) {
              btn.classList.add('bg-emerald-500', 'text-white', 'border-emerald-500');
              if (feedback) {
                feedback.classList.remove('hidden', 'bg-red-500/10', 'text-red-700', 'border-red-500/30');
                feedback.classList.add('bg-emerald-500/10', 'text-emerald-700', 'border', 'border-emerald-500/30');
                feedback.textContent = 'Correct! +250 PTS awarded. Master Historian stamp added to passport.';
              }
              const scoreEl = document.getElementById('game-score');
              if (scoreEl) {
                const cur = parseInt(scoreEl.textContent || '0', 10);
                scoreEl.textContent = cur + 250;
              }
            } else {
              btn.classList.add('bg-red-500', 'text-white', 'border-red-500');
              if (feedback) {
                feedback.classList.remove('hidden', 'bg-emerald-500/10', 'text-emerald-700', 'border-emerald-500/30');
                feedback.classList.add('bg-red-500/10', 'text-red-700', 'border', 'border-red-500/30');
                feedback.textContent = 'Not quite! The correct answer was option 1.';
              }
            }
          });
        });

      } else {
        masterSection.innerHTML = `
          <div class="glass-card p-6 rounded-3xl border border-dashed border-[#D99B26]/40 bg-[#FAF8F5] text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <i data-lucide="lock" class="w-6 h-6 text-[#D99B26]"></i>
              <div>
                <h4 class="font-heading font-bold text-base text-[#0A0C10]">Master Historian Challenge (+250 PTS) Locked</h4>
                <p class="text-xs text-[#78716C] font-sans">Available with Premium Journey Pack (R79) or VIP Membership.</p>
              </div>
            </div>
            <button type="button" class="btn-unlock-quiz-cta px-4 py-2 rounded-xl bg-[#D99B26] text-white font-mono text-xs font-bold uppercase hover:bg-[#C98B1E] transition-all">
              Unlock Challenge
            </button>
          </div>
        `;

        const unlockQuizBtn = masterSection.querySelector('.btn-unlock-quiz-cta');
        if (unlockQuizBtn) {
          unlockQuizBtn.addEventListener('click', () => {
            if (window.TrackTalesOpenSubscriptionModal) window.TrackTalesOpenSubscriptionModal('premium-pack');
          });
        }
      }
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  window.TrackTalesRenderSubscriptionFeatures = renderSubscriptionFeatures;

  // --- Declassified Archival Dossier Modal Setup ---
  function setupDossierModal() {
    const modal = document.getElementById('dossier-modal');
    const closeBtn = document.getElementById('dossier-modal-close');

    if (!modal) return;

    window.openDossierModal = function (dossierId) {
      const currentTrain = localStorage.getItem('tracktales_selected_train') || 'blue-train';
      const allDossiers = (PREMIUM_HISTORICAL_DOSSIERS[currentTrain] || []).concat(
        currentTrain === 'blue-train' ? PREMIUM_HISTORICAL_DOSSIERS['rovos-rail'] : PREMIUM_HISTORICAL_DOSSIERS['blue-train']
      );

      const dossier = allDossiers.find(d => d.id === dossierId);
      if (!dossier) return;

      const titleEl = document.getElementById('dossier-title');
      const subtitleEl = document.getElementById('dossier-subtitle');
      const codeEl = document.getElementById('dossier-code');
      const imgEl = document.getElementById('dossier-img');
      const captionEl = document.getElementById('dossier-caption');
      const bodyEl = document.getElementById('dossier-body');

      if (titleEl) titleEl.textContent = dossier.title;
      if (subtitleEl) subtitleEl.textContent = dossier.subtitle;
      if (codeEl) codeEl.textContent = dossier.code;
      if (imgEl) imgEl.src = dossier.img;
      if (captionEl) captionEl.textContent = dossier.caption;
      if (bodyEl) {
        bodyEl.innerHTML = dossier.content.split('\n\n').map(p => `<p class="leading-relaxed">${p}</p>`).join('');
      }

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      if (window.lucide) lucide.createIcons();
    };

    function closeDossierModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeDossierModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeDossierModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeDossierModal();
      }
    });
  }

  // --- Live Web Speech Synthesis & Ambient Soundscape Controller ---
  function setupAudioCompanion() {
    let currentSpeed = 1.0;
    let selectedVoiceProfile = 'james';
    let isSpeaking = false;
    let synthUtterance = null;

    // Web Speech Synthesis Helpers
    window.TrackTalesSpeakText = function (text, onEndCallback) {
      if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
        alert("Web Speech API is not supported in this browser. Please use Chrome, Edge, or Safari.");
        return;
      }

      const speechEngine = window.speechSynthesis;
      speechEngine.cancel();
      if (typeof speechEngine.resume === 'function') speechEngine.resume();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = currentSpeed;
      utterance.lang = window.TrackTalesGetSpeechLanguage ? window.TrackTalesGetSpeechLanguage() : 'en-ZA';

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const speechLanguage = utterance.lang.toLowerCase();
        const regionalVoice = voices.find(v => v.lang && v.lang.toLowerCase() === speechLanguage) ||
          voices.find(v => v.lang && v.lang.toLowerCase().startsWith(speechLanguage.split('-')[0]));
        if (selectedVoiceProfile === 'thandi') {
          utterance.voice = regionalVoice || voices.find(v => v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Google UK English Female')) || voices[0];
          utterance.pitch = 1.1;
        } else if (selectedVoiceProfile === 'willem') {
          utterance.voice = regionalVoice || voices.find(v => v.name.includes('David') || v.name.includes('George')) || voices[0];
          utterance.pitch = 0.85;
        } else {
          utterance.voice = regionalVoice || voices.find(v => v.lang.includes('en-GB') || v.name.includes('James') || v.name.includes('Natural')) || voices[0];
          utterance.pitch = 0.95;
        }
        if (!regionalVoice && utterance.voice && utterance.voice.lang) {
          utterance.lang = utterance.voice.lang;
        }
      } else {
        utterance.lang = 'en-US';
      }

      const eqStatus = document.getElementById('audio-eq-status');
      if (eqStatus) eqStatus.textContent = 'PLAYING';

      utterance.onend = () => {
        isSpeaking = false;
        if (eqStatus) eqStatus.textContent = 'READY';
        const playBtnLabel = document.getElementById('audio-play-main-label');
        if (playBtnLabel) playBtnLabel.textContent = 'Play Story Audio';
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        isSpeaking = false;
        if (eqStatus) eqStatus.textContent = 'READY';
        if (onEndCallback) onEndCallback();
      };

      synthUtterance = utterance;
      isSpeaking = true;
      speechEngine.speak(utterance);
    };

    window.TrackTalesStopSpeech = function () {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      isSpeaking = false;
      const eqStatus = document.getElementById('audio-eq-status');
      if (eqStatus) eqStatus.textContent = 'READY';
    };

    // Ambient Web Audio Rail Sound Generator
    let activeAudioContext = null;
    let activeSoundNode = null;

    function playSoundscape(type) {
      if (activeSoundNode) {
        try { activeSoundNode.stop(); } catch (e) {}
        activeSoundNode = null;
      }

      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!activeAudioContext) activeAudioContext = new AudioCtx();
        if (activeAudioContext.state === 'suspended') activeAudioContext.resume();

        const osc = activeAudioContext.createOscillator();
        const gain = activeAudioContext.createGain();

        if (type === 'chug') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(65, activeAudioContext.currentTime);
          gain.gain.setValueAtTime(0.08, activeAudioContext.currentTime);
        } else if (type === 'wind') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(180, activeAudioContext.currentTime);
          gain.gain.setValueAtTime(0.05, activeAudioContext.currentTime);
        } else {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(440, activeAudioContext.currentTime);
          gain.gain.setValueAtTime(0.04, activeAudioContext.currentTime);
        }

        osc.connect(gain);
        gain.connect(activeAudioContext.destination);
        osc.start();
        activeSoundNode = osc;

        // Auto fade-out after 8 seconds
        setTimeout(() => {
          try {
            gain.gain.exponentialRampToValueAtTime(0.0001, activeAudioContext.currentTime + 1.5);
            setTimeout(() => { try { osc.stop(); } catch (e) {} }, 1600);
          } catch (e) {}
        }, 6000);

      } catch (e) {
        console.log("Web Audio not available:", e);
      }
    }

    // Attach dynamic station listeners
    window.TrackTalesSetupAudioStationEvents = function () {
      const playMainBtn = document.getElementById('btn-audio-play-main');
      const stopMainBtn = document.getElementById('btn-audio-stop-main');
      const playMainLabel = document.getElementById('audio-play-main-label');
      const storySelector = document.getElementById('audio-story-selector');
      const voiceBtns = document.querySelectorAll('.audio-voice-btn');
      const speedBtns = document.querySelectorAll('.audio-speed-btn');
      const soundscapeBtns = document.querySelectorAll('.soundscape-btn');

      if (playMainBtn) {
        playMainBtn.onclick = () => {
          if (isSpeaking) {
            window.TrackTalesStopSpeech();
            if (playMainLabel) playMainLabel.textContent = 'Play Story Audio';
          } else {
            const selectedStoryId = storySelector ? storySelector.value : null;
            const story = (appData.stories || FALLBACK_STORIES).find(s => s.id === selectedStoryId) || (appData.stories || FALLBACK_STORIES)[0];
            if (story) {
              const narration = `${story.title}. By ${story.author}. ${story.summary}. ${story.content}`;
              window.TrackTalesSpeakText(narration, () => {
                if (playMainLabel) playMainLabel.textContent = 'Play Story Audio';
              });
              if (playMainLabel) playMainLabel.textContent = 'Stop Narration';
            }
          }
        };
      }

      if (stopMainBtn) {
        stopMainBtn.onclick = () => {
          window.TrackTalesStopSpeech();
          if (playMainLabel) playMainLabel.textContent = 'Play Story Audio';
        };
      }

      voiceBtns.forEach(btn => {
        btn.onclick = () => {
          voiceBtns.forEach(b => {
            b.classList.remove('active', 'border-[#2A9D8F]', 'bg-[#2A9D8F]/10');
            b.classList.add('border-[#E7E2D8]', 'bg-white');
            const titleSpan = b.querySelector('span:first-child');
            if (titleSpan) titleSpan.className = 'text-[10px] font-mono font-bold uppercase block text-[#1C1917]';
          });
          btn.classList.add('active', 'border-[#2A9D8F]', 'bg-[#2A9D8F]/10');
          btn.classList.remove('border-[#E7E2D8]', 'bg-white');
          const activeTitle = btn.querySelector('span:first-child');
          if (activeTitle) activeTitle.className = 'text-[10px] font-mono font-bold uppercase block text-[#2A9D8F]';

          selectedVoiceProfile = btn.getAttribute('data-voice-profile') || 'james';
          if (isSpeaking) {
            window.TrackTalesStopSpeech();
            if (playMainLabel) playMainLabel.textContent = 'Play Story Audio';
          }
        };
      });

      speedBtns.forEach(btn => {
        btn.onclick = () => {
          speedBtns.forEach(b => {
            b.classList.remove('active', 'border-2', 'border-[#2A9D8F]', 'bg-[#2A9D8F]/10', 'text-[#2A9D8F]');
            b.classList.add('border', 'border-[#D6CFC7]', 'bg-white', 'text-[#78716C]');
          });
          btn.classList.add('active', 'border-2', 'border-[#2A9D8F]', 'bg-[#2A9D8F]/10', 'text-[#2A9D8F]');
          btn.classList.remove('border', 'border-[#D6CFC7]', 'bg-white', 'text-[#78716C]');

          currentSpeed = parseFloat(btn.getAttribute('data-speed') || '1.0');
        };
      });

      soundscapeBtns.forEach(btn => {
        btn.onclick = () => {
          const type = btn.getAttribute('data-soundscape');
          playSoundscape(type);
          btn.classList.add('bg-[#2A9D8F]/15', 'border-[#2A9D8F]');
          setTimeout(() => btn.classList.remove('bg-[#2A9D8F]/15', 'border-[#2A9D8F]'), 2000);
        };
      });
    };
  }

  // --- Main Subscription Manager Modal Controller ---
  function setupSubscriptionManager() {
    const subModal = document.getElementById('subscription-modal');
    const closeBtn = document.getElementById('subscription-modal-close');
    const skipBtn = document.getElementById('subscription-skip-btn');
    const confirmBtn = document.getElementById('subscription-confirm-btn');
    const tierNameDisplay = document.getElementById('subscription-selected-tier-name');
    const btnLabel = document.getElementById('subscription-btn-label');
    const navSubBtn = document.getElementById('btn-open-subscriptions');
    const navSubLabel = document.getElementById('nav-subscription-label');
    const mobileSubBtn = document.getElementById('mobile-subscriptions-btn');
    const mobileSubLabel = document.getElementById('mobile-subscription-label');
    const subCards = document.querySelectorAll('.subscription-card');

    let currentSelectedPlan = localStorage.getItem('tracktales_subscription') || 'free';

    const updateNavBadges = (planId) => {
      const plan = SUBSCRIPTION_PLANS[planId] || SUBSCRIPTION_PLANS['free'];
      if (navSubLabel) {
        navSubLabel.textContent = `Pass: ${plan.badge}`;
      }
      if (mobileSubLabel) {
        mobileSubLabel.textContent = plan.badge;
      }
    };

    const setSelectedPlanUI = (planId) => {
      currentSelectedPlan = planId;
      const plan = SUBSCRIPTION_PLANS[planId] || SUBSCRIPTION_PLANS['free'];

      subCards.forEach(card => {
        const cardPlan = card.getAttribute('data-sub-plan');
        const radioCircle = card.querySelector('.sub-radio');
        const checkIcon = card.querySelector('.sub-radio i');

        if (cardPlan === planId) {
          card.classList.add('active');
          if (radioCircle) {
            radioCircle.className = `sub-radio w-4 h-4 rounded-full border-2 ${cardPlan === 'audio-exp' ? 'border-[#2A9D8F] bg-[#2A9D8F]' : (cardPlan === 'membership' ? 'border-[#4A52B0] bg-[#4A52B0]' : 'border-[#D99B26] bg-[#D99B26]')} flex items-center justify-center`;
          }
          if (checkIcon) checkIcon.classList.remove('hidden');
        } else {
          card.classList.remove('active');
          if (radioCircle) {
            radioCircle.className = 'sub-radio w-4 h-4 rounded-full border-2 border-[#D6CFC7] bg-transparent flex items-center justify-center';
          }
          if (checkIcon) checkIcon.classList.add('hidden');
        }
      });

      if (tierNameDisplay) {
        tierNameDisplay.textContent = `${plan.name} (${plan.price})`;
        tierNameDisplay.className = `font-bold ${planId === 'audio-exp' ? 'text-[#2A9D8F]' : (planId === 'membership' ? 'text-[#4A52B0]' : 'text-[#D99B26]')}`;
      }

      if (btnLabel) {
        if (planId === 'free') {
          btnLabel.textContent = 'Continue Free';
        } else {
          btnLabel.textContent = `Activate for ${plan.price}`;
        }
      }

      if (window.lucide) lucide.createIcons();
    };

    const openSubscriptionModal = (presetPlan) => {
      if (presetPlan && SUBSCRIPTION_PLANS[presetPlan]) {
        setSelectedPlanUI(presetPlan);
      } else {
        const stored = localStorage.getItem('tracktales_subscription') || 'premium-pack';
        setSelectedPlanUI(stored);
      }
      if (subModal) {
        subModal.classList.remove('hidden');
        subModal.style.display = 'flex';
      }
      if (window.lucide) lucide.createIcons();
    };

    const closeSubscriptionModal = () => {
      if (subModal) {
        subModal.classList.add('hidden');
        subModal.style.display = 'none';
      }
    };

    const confirmSubscription = (planId) => {
      const targetPlan = planId || currentSelectedPlan || 'free';
      const plan = SUBSCRIPTION_PLANS[targetPlan] || SUBSCRIPTION_PLANS['free'];
      const trainId = localStorage.getItem('tracktales_selected_train') || 'blue-train';

      localStorage.setItem('tracktales_subscription', targetPlan);

      try {
        const loggedUser = JSON.parse(localStorage.getItem('tracktales_logged_user') || 'null');
        if (loggedUser) {
          loggedUser.subscription = targetPlan;
          localStorage.setItem('tracktales_logged_user', JSON.stringify(loggedUser));
        }
      } catch (e) {}

      updateNavBadges(targetPlan);
      renderSubscriptionFeatures(targetPlan, trainId);
      closeSubscriptionModal();

      if (targetPlan === 'free') {
        alert("Standard Free Journey Pass is active. Enjoy your South Africa rail exploration!");
      } else {
        alert(`${plan.name} (${plan.price}) activated! Enhanced stories, archival dossiers, audio companion, and corridor features are unlocked.`);
      }
    };

    // Attach click events on subscription cards
    subCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const plan = card.getAttribute('data-sub-plan');
        if (plan) setSelectedPlanUI(plan);
      });
    });

    if (confirmBtn) {
      confirmBtn.addEventListener('click', (e) => {
        e.preventDefault();
        confirmSubscription(currentSelectedPlan);
      });
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        confirmSubscription('free');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeSubscriptionModal();
      });
    }

    if (subModal) {
      subModal.addEventListener('click', (e) => {
        if (e.target === subModal) closeSubscriptionModal();
      });
    }

    if (navSubBtn) {
      navSubBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openSubscriptionModal();
      });
    }

    if (mobileSubBtn) {
      mobileSubBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.closeMobileDrawer) window.closeMobileDrawer();
        openSubscriptionModal();
      });
    }

    // Initialize nav badge and features on boot
    updateNavBadges(currentSelectedPlan);
    setSelectedPlanUI(currentSelectedPlan);

    const initialTrain = localStorage.getItem('tracktales_selected_train') || 'blue-train';
    renderSubscriptionFeatures(currentSelectedPlan, initialTrain);

    window.TrackTalesOpenSubscriptionModal = openSubscriptionModal;
    window.TrackTalesCloseSubscriptionModal = closeSubscriptionModal;
    window.TrackTalesRenderSubscriptionFeatures = renderSubscriptionFeatures;
  }

  // --- 3. Page Router Navigation with UI Systems Principles ---
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

    const PAGE_ORDER = ['home', 'stops', 'about', 'trains', 'games', 'voice'];
    let currentPage = 'home';

    function updateNavIndicator(targetPage, isSlow) {
      if (navIndicator && desktopNavMenu) {
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

      // Synchronize animated sliding indicator on modern nav bar (#nav-tabs-container)
      const tabsContainer = document.getElementById('nav-tabs-container');
      const tabsIndicator = document.getElementById('nav-tab-indicator');
      if (tabsContainer && tabsIndicator) {
        const matchingTab = tabsContainer.querySelector(`a[data-page="${targetPage}"]`);
        if (matchingTab) {
          const containerRect = tabsContainer.getBoundingClientRect();
          const tabRect = matchingTab.getBoundingClientRect();
          tabsIndicator.style.left = `${tabRect.left - containerRect.left}px`;
          tabsIndicator.style.width = `${tabRect.width}px`;
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

      // Synchronize Corridor Navigation Hub Panel Trigger Title & Active Cards
      const PAGE_TITLES = {
        'home': 'The Route',
        'stops': 'Corridor Stops',
        'about': 'Stories & Vault',
        'trains': 'Flagship Modes',
        'games': 'Corridor Games',
        'voice': 'Voice Journal'
      };
      const activeNavTitleEl = document.getElementById('nav-panel-active-title');
      if (activeNavTitleEl) {
        activeNavTitleEl.textContent = PAGE_TITLES[targetPage] || 'The Route';
      }

      document.querySelectorAll('.nav-hub-card').forEach(card => {
        if (card.getAttribute('data-page') === targetPage) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });

      document.querySelectorAll('.nav-hub-rail-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-page') === targetPage);
      });

      if (window.closeNavHubPanel) {
        window.closeNavHubPanel();
      }

      updateNavIndicator(targetPage, isSlow);

      // Hero Video Background & "Watch The Journey Unfold" are strictly isolated to "The Route" (#home)
      const bgVideoLayer = document.getElementById('heroVideoBgLayer');
      if (bgVideoLayer) {
        if (targetPage === 'home') {
          bgVideoLayer.style.display = 'block';
        } else {
          bgVideoLayer.style.display = 'none';
        }
      }

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
              // If page is stops, stagger stop card cascade
              if (targetPage === 'stops') {
                const stopCards = page.querySelectorAll('.corridor-stop-card');
                if (stopCards.length > 0) {
                  window.motion.animate(
                    stopCards,
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
          // Set base SPA hash route (e.g. /#trains instead of keeping subpath)
          window.location.href = '/#' + target;
          if (window.closeMobileDrawer) {
            window.closeMobileDrawer();
          }
        }
      });
    });

    // Redirect clean URL paths to base SPA hash routes for clean navigation
    const cleanPath = (window.location && window.location.pathname ? window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase() : '');
    const hash = (window.location && window.location.hash ? window.location.hash : '');
    
    const validPagesMap = {
      'home': 'home',
      'stops': 'stops',
      'trains': 'trains',
      'attractions': 'stops',
      'sights': 'stops',
      'games': 'games',
      'sightgames': 'games',
      'slightgames': 'games',
      'voice': 'voice',
      'journal': 'voice',
      'voicelog': 'voice',
      'notes': 'voice',
      'about': 'about'
    };

    if (cleanPath in validPagesMap) {
      const targetHash = validPagesMap[cleanPath];
      // If we are not already on the base path with the correct hash, redirect
      if (cleanPath !== '' || hash !== '#' + targetHash) {
        window.location.replace('/#' + targetHash);
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

  // --- 3. Passenger Sign In & Sign Up Modal with Storage Persistence ---
  function setupLoginModal() {
    const modal = document.getElementById('login-modal');
    const openBtn = document.getElementById('btn-open-login');
    const mobileOpenBtn = document.getElementById('mobile-drawer-login-btn');
    const closeBtn = document.getElementById('login-modal-close');
    const form = document.getElementById('login-form');

    let isAuthenticated = false;

    // Helper functions access
    const getUserRecord = window.TrackTalesGetRegisteredUser || ((email) => {
      try {
        const users = JSON.parse(localStorage.getItem('tracktales_users') || '{}');
        const u = users[email.toLowerCase()];
        if (!u) return null;
        if (typeof u === 'string') return { email: email, password: u, preferred_train: 'blue-train', name: email.split('@')[0] };
        return u;
      } catch (e) { return null; }
    });

    const saveUserRecord = window.TrackTalesSaveRegisteredUser || ((userData) => {
      try {
        const users = JSON.parse(localStorage.getItem('tracktales_users') || '{}');
        const cleanEmail = userData.email.trim().toLowerCase();
        users[cleanEmail] = {
          name: userData.name || cleanEmail.split('@')[0],
          email: cleanEmail,
          password: userData.password,
          preferred_train: userData.preferred_train || 'blue-train',
          created_at: userData.created_at || new Date().toISOString()
        };
        localStorage.setItem('tracktales_users', JSON.stringify(users));
        return users[cleanEmail];
      } catch (e) { return null; }
    });

    const setTrainGlobal = window.TrackTalesSetSelectedTrain || ((trainId) => {
      localStorage.setItem('tracktales_selected_train', trainId);
    });

    // Real-time passenger recognition for Login Modal
    const updateModalPassengerRecognition = (email) => {
      if (window.TrackTalesUpdatePassengerRecognition) {
        window.TrackTalesUpdatePassengerRecognition(
          email,
          'login-saved-pass-banner',
          'login-saved-pass-name',
          'login-train-selector-container'
        );
      } else {
        const banner = document.getElementById('login-saved-pass-banner');
        const nameEl = document.getElementById('login-saved-pass-name');
        const selectorContainer = document.getElementById('login-train-selector-container');
        const user = getUserRecord(email);

        if (user && user.preferred_train) {
          const isBlue = user.preferred_train === 'blue-train';
          const trainName = isBlue ? 'The Blue Train (Ultra Luxury)' : 'Rovos Rail Safari (Edwardian Safari)';
          setTrainGlobal(user.preferred_train);
          if (banner && nameEl) {
            nameEl.textContent = trainName;
            nameEl.className = `font-bold font-sans ${isBlue ? 'text-[#D99B26]' : 'text-[#2A9D8F]'}`;
            banner.classList.remove('hidden');
          }
          if (selectorContainer) selectorContainer.classList.add('hidden');
        } else {
          if (banner) banner.classList.add('hidden');
          if (selectorContainer) selectorContainer.classList.remove('hidden');
        }
      }
    };

    const modalEmailInput = document.getElementById('login-email');
    if (modalEmailInput) {
      modalEmailInput.addEventListener('input', () => updateModalPassengerRecognition(modalEmailInput.value));
      modalEmailInput.addEventListener('change', () => updateModalPassengerRecognition(modalEmailInput.value));
      modalEmailInput.addEventListener('keyup', () => updateModalPassengerRecognition(modalEmailInput.value));
      modalEmailInput.addEventListener('paste', () => setTimeout(() => updateModalPassengerRecognition(modalEmailInput.value), 40));
    }

    // Restore persistent active user session or perform automatic login setup if saved user exists
    const checkActiveSession = () => {
      const loggedUser = localStorage.getItem('tracktales_logged_user');
      const lastUser = localStorage.getItem('last_user');
      const lastPass = localStorage.getItem('last_password');

      if (loggedUser || (lastUser && lastPass)) {
        const userRecord = lastUser ? getUserRecord(lastUser) : null;
        if (loggedUser || (userRecord && userRecord.password === lastPass)) {
          isAuthenticated = true;
          if (!loggedUser && lastUser && userRecord) {
            localStorage.setItem('tracktales_logged_user', JSON.stringify({
              name: userRecord.name || lastUser.split('@')[0],
              email: lastUser,
              preferred_train: userRecord.preferred_train || 'blue-train'
            }));
          }
          const desktopLabel = document.getElementById('desktop-login-label');
          if (desktopLabel) desktopLabel.textContent = "Sign Out";
          if (openBtn) openBtn.innerHTML = `<i data-lucide="log-out" class="w-4 h-4 text-[#D99B26]"></i> <span id="desktop-login-label">Sign Out</span>`;
          if (mobileOpenBtn) mobileOpenBtn.innerHTML = `<i data-lucide="log-out" class="w-4 h-4"></i> <span>Sign Out</span>`;
          if (window.lucide) lucide.createIcons();
        }
      }
    };
    checkActiveSession();

    const loginSection = document.getElementById('login-section');
    const signupSection = document.getElementById('signup-section');
    const toSignupBtn = document.getElementById('toggle-to-signup');
    const toLoginBtn = document.getElementById('toggle-to-login');

    if (toSignupBtn && loginSection && signupSection) {
      toSignupBtn.addEventListener('click', () => {
        loginSection.classList.add('hidden');
        signupSection.classList.remove('hidden');
      });
    }

    if (toLoginBtn && loginSection && signupSection) {
      toLoginBtn.addEventListener('click', () => {
        signupSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
        const emailInput = document.getElementById('login-email');
        if (emailInput && emailInput.value) {
          updateModalPassengerRecognition(emailInput.value);
        }
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
      if (lastUser) {
        updateModalPassengerRecognition(lastUser);
      }
    };

    const handleCloseLogin = () => {
      if (modal) modal.classList.add('hidden');
    };

    function handleOpenLogin(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (window.closeMobileDrawer) {
        window.closeMobileDrawer();
      }
      // Automatically reload to the main login page with zero information filled in
      if (window.TrackTalesSignOutAndReload) {
        window.TrackTalesSignOutAndReload(true);
      } else {
        localStorage.removeItem('tracktales_logged_user');
        localStorage.removeItem('last_user');
        localStorage.removeItem('last_password');
        window.location.href = '/';
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

    // Sign Up form handler in Modal
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim().toLowerCase();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (password !== confirmPassword) {
          alert("Passwords do not match! Please check and try again.");
          return;
        }

        const existingRecord = getUserRecord(email);
        if (existingRecord) {
          alert("An account with this email address already exists! Switching to Sign In...");
          if (loginSection) loginSection.classList.remove('hidden');
          if (signupSection) signupSection.classList.add('hidden');
          const emailInput = document.getElementById('login-email');
          if (emailInput) {
            emailInput.value = email;
            updateModalPassengerRecognition(email);
          }
          return;
        }

        // Store new user details with preferred train into localStorage
        const currentSelectedTrain = localStorage.getItem('tracktales_selected_train') || 'blue-train';
        const savedUser = saveUserRecord({
          name: name || email.split('@')[0],
          email: email,
          password: password,
          preferred_train: currentSelectedTrain,
          created_at: new Date().toISOString()
        });

        localStorage.setItem('tracktales_logged_user', JSON.stringify({
          name: savedUser.name || name || email.split('@')[0],
          email: email,
          preferred_train: currentSelectedTrain
        }));
        localStorage.setItem('tracktales_selected_train', currentSelectedTrain);
        localStorage.setItem('last_user', email);
        localStorage.setItem('last_password', password);

        const chosenTrainName = currentSelectedTrain === 'blue-train' ? 'The Blue Train' : 'Rovos Rail Safari';
        alert(`Welcome, ${name || email}! Your TrackTales pass for ${chosenTrainName} is saved and active.`);

        handleCloseLogin();
        isAuthenticated = true;

        if (openBtn) openBtn.innerHTML = `<i data-lucide="log-out" class="w-4 h-4 text-[#D99B26]"></i> <span id="desktop-login-label">Sign Out</span>`;
        if (mobileOpenBtn) mobileOpenBtn.innerHTML = `<i data-lucide="log-out" class="w-4 h-4"></i> <span>Sign Out</span>`;
        if (window.lucide) lucide.createIcons();

        signupForm.reset();
      });
    }

    // Sign In form handler in Modal
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const password = document.getElementById('login-password').value;
        const label = document.getElementById('login-btn-label');

        if (label) label.textContent = "Authenticating...";

        setTimeout(() => {
          const userRecord = getUserRecord(email);
          
          if (!userRecord || userRecord.password !== password) {
            alert("Invalid email or password! Please check your credentials or create a new account.");
            if (label) label.textContent = "Sign In";
            return;
          }

          // Persist active logged in session with registered train preference
          const rememberedTrain = userRecord.preferred_train || localStorage.getItem('tracktales_selected_train') || 'blue-train';
          setTrainGlobal(rememberedTrain);

          const displayName = userRecord.name || email.split('@')[0].replace('.', ' ').toUpperCase();
          localStorage.setItem('tracktales_logged_user', JSON.stringify({
            name: displayName,
            email: email,
            preferred_train: rememberedTrain
          }));
          localStorage.setItem('tracktales_selected_train', rememberedTrain);
          localStorage.setItem('last_user', email);
          localStorage.setItem('last_password', password);

          handleCloseLogin();
          isAuthenticated = true;

          if (label) label.textContent = "Sign In";
          if (openBtn) openBtn.innerHTML = `<i data-lucide="log-out" class="w-4 h-4 text-[#D99B26]"></i> <span id="desktop-login-label">Sign Out</span>`;
          if (mobileOpenBtn) mobileOpenBtn.innerHTML = `<i data-lucide="log-out" class="w-4 h-4"></i> <span>Sign Out</span>`;
          if (window.lucide) lucide.createIcons();
          
          const chosenTrainName = rememberedTrain === 'blue-train' ? 'The Blue Train' : 'Rovos Rail Safari';
          alert(`Welcome back, ${displayName}! Your registered pass for ${chosenTrainName} is active.`);
        }, 350);
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
      fact: "Did you know? Table Mountain is estimated to be 260 million years old, six times older than the Himalayas, and hosts over 2,200 unique plant species!"
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

  // --- Hero Section Background Video Controls & Cinematic Zoom ---
  function setupHeroVideoControls() {
    const video = document.getElementById('heroVideo');
    const muteBtn = document.getElementById('heroMuteBtn');
    const playBtn = document.getElementById('heroPlayBtn');
    const muteIcon = document.getElementById('heroMuteIcon');
    const muteText = document.getElementById('heroMuteText');
    const playIcon = document.getElementById('heroPlayIcon');
    const playText = document.getElementById('heroPlayText');

    if (!video) return;

    // Set playbackRate to 0.75 for smooth cinematic ambient feel
    video.playbackRate = 0.75;

    // Trigger Zoom-in-to-pull-back sequence: remove .zoomed-in after ~100ms
    setTimeout(() => {
      video.classList.remove('zoomed-in');
    }, 100);

    if (muteBtn) {
      const syncMuteUI = () => {
        if (muteIcon && muteText) {
          if (video.muted) {
            muteIcon.setAttribute('data-lucide', 'volume-x');
            muteText.textContent = 'UNMUTE';
          } else {
            muteIcon.setAttribute('data-lucide', 'volume-2');
            muteText.textContent = 'MUTE';
          }
          if (window.lucide) lucide.createIcons();
        }
      };

      // Ensure initial UI matches video state
      syncMuteUI();

      muteBtn.addEventListener('click', () => {
        if (video.muted) {
          video.muted = false;
          video.volume = 1.0;
          video.play().catch(e => console.log('Video play on unmute:', e));
        } else {
          video.muted = true;
        }
        syncMuteUI();
      });
    }

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (video.paused) {
          video.play();
          if (playIcon && playText) {
            playIcon.setAttribute('data-lucide', 'pause');
            playText.textContent = 'PAUSE';
          }
        } else {
          video.pause();
          if (playIcon && playText) {
            playIcon.setAttribute('data-lucide', 'play');
            playText.textContent = 'PLAY';
          }
        }
        if (window.lucide) lucide.createIcons();
      });
    }
  }

  // --- Route Preview Video Modal Handlers with Escape Dismissal ---
  function setupRoutePreviewModal() {
    const modal = document.getElementById('videoModal');
    const openBtn = document.getElementById('watchRouteBtn');
    const closeBtn = document.getElementById('closeVideoModal');
    const modalVideo = document.getElementById('modalVideo');
    const playJourneyBtn = document.getElementById('playJourneyBtn');

    function openModal() {
      if (!modal) return;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      if (modalVideo) {
        modalVideo.play().catch(e => console.log('Modal video play:', e));
      }
      if (window.lucide) lucide.createIcons();
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.remove('flex');
      modal.classList.add('hidden');
      if (modalVideo) {
        modalVideo.pause();
      }
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // Dismiss modal on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    const scrollToRoute = (e) => {
      e.preventDefault();
      const target = document.getElementById('page-attractions') || document.getElementById('main-content');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (playJourneyBtn) playJourneyBtn.addEventListener('click', scrollToRoute);
  }

  // --- Mobile Menu Toggle ---
  function setupMobileMenu() {
    const btn = document.getElementById('mobile-toggle-btn');
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('mobileMenuIcon');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const isHidden = menu.classList.contains('hidden');
      if (isHidden) {
        menu.classList.remove('hidden');
        if (icon) icon.setAttribute('data-lucide', 'x');
      } else {
        menu.classList.add('hidden');
        if (icon) icon.setAttribute('data-lucide', 'menu');
      }
      if (window.lucide) lucide.createIcons();
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        if (icon) icon.setAttribute('data-lucide', 'menu');
        if (window.lucide) lucide.createIcons();
      });
    });
  }

  // --- Corridor Navigation Hub Panel Controller ---
  function setupNavHubPanel() {
    const btnOpen = document.getElementById('btn-open-nav-panel');
    const panel = document.getElementById('navigationHubPanel');
    const backdrop = document.getElementById('navHubBackdrop');
    const closeBtn = document.getElementById('nav-hub-close-btn');
    const chevron = document.getElementById('nav-panel-chevron');
    const selectedTrainEl = document.getElementById('nav-hub-selected-train');

    if (!btnOpen || !panel) return;

    function syncTrainBadge() {
      if (selectedTrainEl) {
        const activeTrain = localStorage.getItem('tracktales_selected_train') || 'blue-train';
        selectedTrainEl.textContent = activeTrain === 'rovos-rail' ? 'Rovos Rail' : 'The Blue Train';
      }
    }

    function openNavHubPanel() {
      panel.classList.remove('hidden');
      panel.classList.add('active');
      if (backdrop) backdrop.classList.remove('hidden');
      if (backdrop) backdrop.classList.add('active');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
      btnOpen.setAttribute('aria-expanded', 'true');
      syncTrainBadge();
      
      if (window.motion && window.motion.animate) {
        window.motion.animate(panel, { opacity: [0, 1], y: [-10, 0] }, { duration: 0.22, ease: "ease-out" });
      }
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }

    function closeNavHubPanel() {
      panel.classList.add('hidden');
      panel.classList.remove('active');
      if (backdrop) backdrop.classList.add('hidden');
      if (backdrop) backdrop.classList.remove('active');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
      btnOpen.setAttribute('aria-expanded', 'false');
    }

    function toggleNavHubPanel() {
      const isHidden = panel.classList.contains('hidden');
      if (isHidden) {
        openNavHubPanel();
      } else {
        closeNavHubPanel();
      }
    }

    window.openNavHubPanel = openNavHubPanel;
    window.closeNavHubPanel = closeNavHubPanel;
    window.toggleNavHubPanel = toggleNavHubPanel;

    btnOpen.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleNavHubPanel();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeNavHubPanel();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        closeNavHubPanel();
      });
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.classList.contains('hidden')) {
        closeNavHubPanel();
      }
    });

    // Close when clicking any nav link inside the hub
    panel.querySelectorAll('.nav-page-link').forEach(link => {
      link.addEventListener('click', () => {
        closeNavHubPanel();
      });
    });

    // Initial badge sync
    syncTrainBadge();
  }

  // --- Motion One Entrance Animations (Staggered with Video Pull-Back) ---
  function setupMotionEntranceAnimations() {
    if (!window.motion || !window.motion.animate) return;
    const { animate } = window.motion;

    try {
      // Stagger headline and CTA entrance ~0.3s after camera pull-back starts
      animate('.hero-typography-col', 
        { opacity: [0, 1], transform: ['translateY(35px)', 'translateY(0px)'] },
        { duration: 1.2, delay: 0.3, easing: 'ease-out' }
      );
    } catch (e) {
      console.log('Motion One entrance animation shim fallback:', e);
    }
  }


  // --- Interactive 3D Canvas Globe Engine ---
  function setup3DCanvasGlobe() {
    const canvas = document.getElementById('hero3DCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth || 300;
    let height = canvas.height = canvas.offsetHeight || 300;

    let rotationAngle = 0;
    let pulseWave = 0;
    let isPulsing = false;

    // TrackTales Spectrum Colors
    const spectrumColors = ['#4a9a63', '#e0a83e', '#dd6a3e', '#b8447a', '#5b64c9', '#22a39a'];

    // Particles array floating in globe
    const particles = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 160,
        y: (Math.random() - 0.5) * 160,
        z: (Math.random() - 0.5) * 160,
        size: Math.random() * 2.5 + 1,
        color: spectrumColors[Math.floor(Math.random() * spectrumColors.length)]
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.38;

      rotationAngle += 0.012;

      // 1. Draw outer ambient glow
      const outerGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.6, centerX, centerY, radius * 1.3);
      outerGlow.addColorStop(0, 'rgba(224, 168, 62, 0.15)');
      outerGlow.addColorStop(0.7, 'rgba(34, 163, 154, 0.08)');
      outerGlow.addColorStop(1, 'rgba(18, 20, 28, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Translucent Glass Sphere Body
      const sphereGrad = ctx.createRadialGradient(centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.1, centerX, centerY, radius);
      sphereGrad.addColorStop(0, 'rgba(244, 239, 228, 0.2)');
      sphereGrad.addColorStop(0.5, 'rgba(224, 168, 62, 0.06)');
      sphereGrad.addColorStop(0.85, 'rgba(18, 20, 28, 0.4)');
      sphereGrad.addColorStop(1, 'rgba(224, 168, 62, 0.35)');

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(244, 239, 228, 0.3)';
      ctx.stroke();

      // 3. Draw Orbiting Spectrum Ring
      const ringRadiusX = radius * 0.85;
      const ringRadiusY = radius * 0.3;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(0.35); // tilt angle

      const ringGrad = ctx.createLinearGradient(-ringRadiusX, 0, ringRadiusX, 0);
      ringGrad.addColorStop(0, '#4a9a63');
      ringGrad.addColorStop(0.2, '#e0a83e');
      ringGrad.addColorStop(0.4, '#dd6a3e');
      ringGrad.addColorStop(0.6, '#b8447a');
      ringGrad.addColorStop(0.8, '#5b64c9');
      ringGrad.addColorStop(1, '#22a39a');

      ctx.beginPath();
      ctx.ellipse(0, 0, ringRadiusX, ringRadiusY, 0, 0, Math.PI * 2);
      ctx.lineWidth = 3;
      ctx.strokeStyle = ringGrad;
      ctx.shadowColor = 'rgba(224, 168, 62, 0.6)';
      ctx.shadowBlur = 12;
      ctx.stroke();

      // 4. Draw Orbiting Train Node Marker along ring
      const nodeAngle = rotationAngle * 1.5;
      const trainX = Math.cos(nodeAngle) * ringRadiusX;
      const trainY = Math.sin(nodeAngle) * ringRadiusY;

      ctx.beginPath();
      ctx.arc(trainX, trainY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#e0a83e';
      ctx.shadowColor = '#e0a83e';
      ctx.shadowBlur = 15;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(trainX, trainY, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();

      // 5. Draw 3D Floating Particles inside globe
      particles.forEach(p => {
        const cos = Math.cos(0.008);
        const sin = Math.sin(0.008);
        const rx = p.x * cos - p.z * sin;
        const rz = p.z * cos + p.x * sin;
        p.x = rx;
        p.z = rz;

        const screenX = centerX + p.x;
        const screenY = centerY + p.y;
        const alpha = (p.z + 160) / 320 * 0.7 + 0.2;

        ctx.beginPath();
        ctx.arc(screenX, screenY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // 6. Draw Pulse Wave on click
      if (isPulsing) {
        pulseWave += 3;
        if (pulseWave > radius * 1.2) {
          isPulsing = false;
          pulseWave = 0;
        } else {
          ctx.beginPath();
          ctx.arc(centerX, centerY, pulseWave, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(224, 168, 62, ${1 - pulseWave / (radius * 1.2)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // 7. Glass Rim Highlight arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 2, Math.PI * 1.15, Math.PI * 1.65);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();

      requestAnimationFrame(render);
    }

    canvas.addEventListener('click', () => {
      isPulsing = true;
      pulseWave = 10;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth || 300;
      height = canvas.height = canvas.offsetHeight || 300;
    });

    render();
  }

  // --- Corridor Stops Data & Cinematic Interaction Engine (Customized Per Selected Train) ---
  const BLUE_TRAIN_CORRIDOR_STOPS = [
    {
      id: "pretoria-terminus",
      name: "Pretoria Station Lounge",
      category: "scheduled",
      badge: "ORIGIN HUB",
      province: "Gauteng",
      distance_km: 0,
      stop_time: "09:00 AM Departure · The Blue Train Lounge",
      teaser: "Check-in at the dedicated Blue Train pre-departure lounge at Pretoria Station. Champagne, live pianist, and butler baggage check-in before boarding.",
      video: "/videos/Purple_leaves_falling_on_street_202608261538.mp4",
      img: "https://images.unsplash.com/photo-1577971132997-c10be9372519?auto=format&fit=crop&w=800&q=80",
      vector: "bottom"
    },
    {
      id: "johannesburg-park",
      name: "Johannesburg Gold Hub",
      category: "passthrough",
      badge: "PASS-THROUGH",
      province: "Gauteng",
      distance_km: 68,
      stop_time: "Express Pass-through · 10:30 AM",
      teaser: "Gliding across the Witwatersrand gold belt at 90 km/h with sound-insulated double gold-tinted acoustic windows.",
      img: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=800&q=80",
      vector: "side"
    },
    {
      id: "kimberley-junction",
      name: "Kimberley Diamond Mine",
      category: "scheduled",
      badge: "MAIN EXCURSION",
      province: "Northern Cape",
      distance_km: 645,
      stop_time: "Scheduled Excursion · 2.5 Hours",
      teaser: "Southbound passengers disembark for an exclusive guided tour of Kimberley's Big Hole, the Diamond Museum, and a glass of sherry at the historic Kimberley Club.",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      vector: "depth"
    },
    {
      id: "de-aar-hub",
      name: "De Aar Karoo Hub",
      category: "passthrough",
      badge: "PASS-THROUGH",
      province: "Northern Cape",
      distance_km: 810,
      stop_time: "Karoo Night Transit · 22:15 PM",
      teaser: "Passing through the historic desert rail junction under starlit skies while guests enjoy 5-course silver service dining.",
      img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      vector: "bottom"
    },
    {
      id: "hex-river-pass",
      name: "Hex River Mountain Valley",
      category: "passthrough",
      badge: "PASS-THROUGH",
      province: "Western Cape",
      distance_km: 1480,
      stop_time: "Scenic Morning Pass-through · 11:00 AM",
      teaser: "Sweeping views of emerald vineyards and towering mountain passes during morning champagne brunch in the lounge car.",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      vector: "depth"
    },
    {
      id: "cape-town-terminus",
      name: "Cape Town Station",
      category: "scheduled",
      badge: "TERMINUS ARRIVAL",
      province: "Western Cape",
      distance_km: 1600,
      stop_time: "17:30 PM Arrival · Day 2 Terminus",
      teaser: "Grand arrival beneath Table Mountain. Personal butlers escort guests and luggage directly to private chauffeur transfers.",
      img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
      vector: "side"
    }
  ];

  const ROVOS_RAIL_CORRIDOR_STOPS = [
    {
      id: "pretoria-terminus",
      name: "Capital Park Private Station",
      category: "scheduled",
      badge: "PRIVATE STATION HUB",
      province: "Gauteng",
      distance_km: 0,
      stop_time: "10:00 AM Departure · Rovos Headquarters",
      teaser: "Departing from Rovos Rail's private colonial-style station and railway museum in Capital Park, with red carpet boarding and sparkling wine.",
      video: "/videos/Purple_leaves_falling_on_street_202608261538.mp4",
      img: "https://images.unsplash.com/photo-1577971132997-c10be9372519?auto=format&fit=crop&w=800&q=80",
      vector: "bottom"
    },
    {
      id: "kimberley-junction",
      name: "Kimberley Diamond Village",
      category: "scheduled",
      badge: "OFF-TRAIN EXCURSION",
      province: "Northern Cape",
      distance_km: 645,
      stop_time: "Scheduled Excursion · 2 Hours",
      teaser: "Arrive in Kimberley for a city tour, visit the Big Hole and Diamond Mine Museum, exploring the world's greatest diamond rush.",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      vector: "depth"
    },
    {
      id: "de-aar-hub",
      name: "De Aar Steam Junction",
      category: "passthrough",
      badge: "PASS-THROUGH",
      province: "Northern Cape",
      distance_km: 810,
      stop_time: "Technical Steam Halt · Karoo",
      teaser: "The central railway crossroads of the Great Karoo desert where vintage locomotives service water tanks under the Southern Cross.",
      img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      vector: "bottom"
    },
    {
      id: "matjiesfontein-oasis",
      name: "Matjiesfontein Victorian Village",
      category: "scheduled",
      badge: "OFF-TRAIN EXCURSION",
      province: "Western Cape",
      distance_km: 1320,
      stop_time: "Scheduled Excursion · 2 Hours",
      teaser: "Guests disembark for a 2-hour walking tour of this 1890s Victorian village frozen in time, visiting the Lord Milner Hotel, car museum, and historic rail bar.",
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      vector: "side"
    },
    {
      id: "hex-river-pass",
      name: "Hex River Pass & Tunnels",
      category: "passthrough",
      badge: "PASS-THROUGH",
      province: "Western Cape",
      distance_km: 1480,
      stop_time: "Spectacular Mountain Descent",
      teaser: "Enjoy 360-degree photography from the open-air rear observation balcony as the train descends 750 metres through mountain tunnels into Cape Winelands.",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      vector: "depth"
    },
    {
      id: "cape-town-terminus",
      name: "Cape Town Platform 24",
      category: "scheduled",
      badge: "TERMINUS ARRIVAL",
      province: "Western Cape",
      distance_km: 1600,
      stop_time: "17:00 PM Day 3 Arrival · Platform 24",
      teaser: "Grand arrival at Cape Town Station's private Platform 24 after a 3-day slow-travel journey across the African subcontinent.",
      img: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
      vector: "side"
    }
  ];

  function setupCorridorStops() {
    const gridContainer = document.getElementById('corridor-stops-grid');
    const filterButtons = document.querySelectorAll('#corridor-filter-group .corridor-filter-pill');
    const signalLine = document.getElementById('corridor-signal-line');
    const corridorTag = document.getElementById('stops-corridor-tag');
    const corridorSubtitle = document.getElementById('stops-corridor-subtitle');
    
    if (!gridContainer) return;

    let activeFilter = 'all';

    function getStopsForCurrentTrain(trainId) {
      const activeTrain = trainId || localStorage.getItem('tracktales_selected_train') || 'blue-train';
      return activeTrain === 'blue-train' ? BLUE_TRAIN_CORRIDOR_STOPS : ROVOS_RAIL_CORRIDOR_STOPS;
    }

    function renderCards(filterType, isTransition = false) {
      const activeTrain = localStorage.getItem('tracktales_selected_train') || 'blue-train';
      const isBlue = activeTrain === 'blue-train';
      const trainStops = getStopsForCurrentTrain(activeTrain);

      if (corridorTag) {
        corridorTag.textContent = isBlue 
          ? 'SELECTED TRAIN: THE BLUE TRAIN (31-HR EXPRESS CORRIDOR)' 
          : 'SELECTED TRAIN: ROVOS RAIL SAFARI (3-DAY EDWARDIAN CORRIDOR)';
        if (corridorTag.parentElement) {
          corridorTag.parentElement.className = `inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${isBlue ? 'bg-[#D99B26]/10 border-[#D99B26]/30 text-[#B87C10]' : 'bg-[#2A9D8F]/10 border-[#2A9D8F]/30 text-[#2A9D8F]'} font-mono text-xs font-bold tracking-widest uppercase mb-4 shadow-sm`;
        }
      }

      if (corridorSubtitle) {
        corridorSubtitle.textContent = isBlue
          ? 'Live route map and scheduled stops for The Blue Train from Pretoria Lounge to Cape Town with the Kimberley Diamond excursion.'
          : 'Live route map and scheduled stops for Rovos Rail Safari from Capital Park to Cape Town with Kimberley and Matjiesfontein excursions.';
      }

      let filtered = trainStops;
      if (filterType !== 'all') {
        filtered = trainStops.filter(s => s.category === filterType);
      }

      if (isTransition) {
        // Physical reaction: current cards peel away into depth first
        const currentCards = gridContainer.querySelectorAll('.corridor-stop-card');
        currentCards.forEach(card => {
          card.classList.add('card-peel-away');
        });

        // Trigger signal line beam pulse animation
        if (signalLine) {
          signalLine.classList.remove('active');
          void signalLine.offsetWidth; // trigger reflow
          signalLine.classList.add('active');
        }

        setTimeout(() => {
          buildGridHTML(filtered);
        }, 320);
      } else {
        buildGridHTML(filtered);
      }
    }

    // Expose for external calls when train switches
    window.TrackTalesRenderCorridorCards = function (trainId) {
      renderCards(activeFilter, true);
    };

    function buildGridHTML(stopsList) {
      gridContainer.innerHTML = stopsList.map((stop, index) => {
        const isPretoria = stop.id === 'pretoria-terminus';
        const vectorClass = `enter-${stop.vector || 'bottom'}`;
        const delayMs = index * 70;

        const mediaHTML = stop.video ? `
          <video src="${stop.video}" 
                 poster="${stop.img}" 
                 autoplay 
                 loop 
                 muted 
                 playsinline 
                 aria-hidden="true" 
                 class="corridor-card-video corridor-card-img">
          </video>
        ` : `
          <img src="${stop.img}" alt="${stop.name}" class="corridor-card-img" />
        `;

        return `
          <div class="corridor-stop-card ${vectorClass}" 
               data-stop-id="${stop.id}" 
               data-category="${stop.category}"
               style="animation-delay: ${delayMs}ms;"
               tabindex="0" 
               role="button" 
               aria-label="${stop.name}, ${stop.province}, ${stop.distance_km} kilometers. ${stop.teaser}">
            
            <div class="corridor-card-media">
              <span class="corridor-badge ${stop.category === 'scheduled' ? 'corridor-badge-scheduled' : 'corridor-badge-passthrough'}">
                ${stop.badge}
              </span>
              ${mediaHTML}
              <div class="corridor-card-gradient"></div>
            </div>

            <div class="corridor-card-body">
              <div class="corridor-card-footer-info">
                <h3 class="corridor-card-title">${stop.name}</h3>
                <div class="corridor-card-meta">
                  <i data-lucide="map-pin" style="width: 13px; height: 13px;"></i>
                  <span>${stop.province.toUpperCase()} · ${stop.distance_km} KM</span>
                </div>
              </div>

              <!-- Hover / Focus Reveal Block (Hidden by default, reveals smoothly on :hover / :focus-within) -->
              <div class="corridor-card-reveal-block">
                <div class="corridor-card-stoptime">
                  <i data-lucide="clock" style="width: 12px; height: 12px;"></i>
                  <span>${stop.stop_time}</span>
                </div>
                <p class="corridor-card-teaser">${stop.teaser}</p>
              </div>

              <!-- Static CTA Line (Visible by default, fades out on hover/focus-within) -->
              <div class="corridor-card-cta">
                <span>${isPretoria ? 'Click to Expand Station Story' : 'Hover to Read Story'}</span>
                <i data-lucide="arrow-right" style="width: 12px; height: 12px;"></i>
              </div>
            </div>
          </div>
        `;
      }).join('');

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }

      attachCardEventListeners();
    }

    function attachCardEventListeners() {
      const cards = gridContainer.querySelectorAll('.corridor-stop-card');

      cards.forEach(card => {
        const stopId = card.getAttribute('data-stop-id');

        // 3D Tilt & Parallax Physics Engine
        card.addEventListener('mouseenter', () => {
          const video = card.querySelector('video');
          if (video && video.paused) {
            video.play().catch(() => {});
          }
        });

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -12; // tilt up/down
          const rotateY = ((x - centerX) / centerX) * 12;  // tilt left/right

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
          card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
          card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

          // Apply neighbor dimming effect to focus attention
          cards.forEach(other => {
            if (other !== card) {
              other.classList.add('neighbor-dimmed');
            } else {
              other.classList.remove('neighbor-dimmed');
            }
          });
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
          cards.forEach(other => other.classList.remove('neighbor-dimmed'));
        });

        // Click / Tap Event Logic
        card.addEventListener('click', () => {
          if (stopId === 'pretoria-terminus') {
            openPretoriaFeatureModal();
          } else {
            // Mobile or tap physical bounce feedback
            card.style.transform = 'perspective(1000px) translateZ(40px) rotateX(-5deg)';
            setTimeout(() => { card.style.transform = ''; }, 600);
          }
        });

        // Accessibility Keyboard Trigger (Enter or Space)
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (stopId === 'pretoria-terminus') {
              openPretoriaFeatureModal();
            }
          }
        });
      });
    }

    // Filter Pills Event Handlers
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        activeFilter = filter;
        renderCards(filter, true);
      });
    });

    // Initial render
    renderCards('all');

    // Setup Pretoria modal handlers
    setupPretoriaFeatureModal();
  }

  function setupPretoriaFeatureModal() {
    const overlay = document.getElementById('pretoria-feature-overlay');
    const closeBtn = document.getElementById('pretoria-close-btn');
    const collapseCta = document.getElementById('pretoria-collapse-cta');

    if (!overlay) return;

    window.openPretoriaFeatureModal = function () {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      const featureVideo = overlay.querySelector('video');
      if (featureVideo) {
        featureVideo.currentTime = 0;
        featureVideo.play().catch(() => {});
      }
      if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
    };

    function closePretoriaModal() {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closePretoriaModal);
    if (collapseCta) collapseCta.addEventListener('click', closePretoriaModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePretoriaModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closePretoriaModal();
      }
    });
  }

  // --- 12. PASSENGER VOICE-TO-TEXT RECORDING STUDIO & JOURNEY JOURNAL ---
  function setupVoiceJournal() {
    const recordBtn = document.getElementById('voiceRecordBtn');
    const recordIcon = document.getElementById('voiceRecordIcon');
    const pulseRing = document.getElementById('voiceRecordPulseRing');
    const timerEl = document.getElementById('voiceRecordTimer');
    const statusEl = document.getElementById('voiceRecordStatus');
    const hintEl = document.getElementById('voiceRecordHint');
    const transcriptInput = document.getElementById('voiceTranscriptInput');
    const wordCountEl = document.getElementById('voiceWordCount');
    const charCountEl = document.getElementById('voiceCharCount');
    const canvas = document.getElementById('voiceVisualizerCanvas');
    const trainBadge = document.getElementById('voice-studio-train-badge');
    const stopSelect = document.getElementById('voiceStopSelect');
    const categorySelect = document.getElementById('voiceCategorySelect');

    const clearBtn = document.getElementById('btnVoiceClear');
    const copyBtn = document.getElementById('btnVoiceCopy');
    const readAloudBtn = document.getElementById('btnVoiceReadAloud');
    const simulateBtn = document.getElementById('btnVoiceSimulate');
    const saveBtn = document.getElementById('btnSaveVoiceEntry');

    const searchInput = document.getElementById('voiceSearchInput');
    const filterBtns = document.querySelectorAll('.voice-filter-btn');
    const notesList = document.getElementById('voiceNotesList');
    const countBadge = document.getElementById('voiceNotesCountBadge');
    const exportBtn = document.getElementById('btnExportVoiceDiary');

    if (!recordBtn || !transcriptInput) return;

    let isRecording = false;
    let recognition = null;
    let timerInterval = null;
    let recordSeconds = 0;
    let audioContext = null;
    let analyser = null;
    let dataArray = null;
    let visualizerAnimationId = null;
    let audioStream = null;
    let activeFilter = 'all';
    let isSpeakingReadBack = false;

    // Authentic preloaded sample journal entries along the corridor
    const DEFAULT_VOICE_ENTRIES = [
      {
        id: 'voice-sample-1',
        trainId: 'blue-train',
        trainName: 'The Blue Train',
        stop: 'Kimberley Big Hole',
        category: 'Sights & Scenery',
        date: '14 Sep 2026, 14:35',
        timestamp: Date.now() - 86400000 * 2,
        text: 'We just disembarked at Kimberley for the off-train excursion. Standing at the edge of the Big Hole is breathtaking. You can feel the sheer history of the 50,000 miners who dug this by hand. Heading back to the lounge car for high tea and champagne now.'
      },
      {
        id: 'voice-sample-2',
        trainId: 'blue-train',
        trainName: 'The Blue Train',
        stop: 'The Great Karoo',
        category: 'Route Reflection',
        date: '15 Sep 2026, 06:45',
        timestamp: Date.now() - 86400000 * 1.5,
        text: 'Waking up to the sunrise over the Karoo is an experience unlike any other. The golden glow across the vast scrubland while the train glides silently along the tracks. The butler just brought fresh South African filter coffee to the suite.'
      },
      {
        id: 'voice-sample-3',
        trainId: 'rovos-rail',
        trainName: 'Rovos Rail Safari',
        stop: 'Matjiesfontein Village',
        category: 'Historical Observation',
        date: '12 Sep 2026, 11:20',
        timestamp: Date.now() - 86400000 * 3,
        text: 'Strolling down the gravel street of Matjiesfontein feels like stepping directly into 1890. The Victorian lampposts and Lord Milner Hotel are impeccably preserved. The vintage steam whistle echoing off the mountains as we board the observation car is unforgettable.'
      },
      {
        id: 'voice-sample-4',
        trainId: 'rovos-rail',
        trainName: 'Rovos Rail Safari',
        stop: 'Hex River Valley',
        category: 'Dining & Lounge Memory',
        date: '13 Sep 2026, 16:15',
        timestamp: Date.now() - 86400000 * 1,
        text: 'Traversing the Hex River Valley mountain passes right now from the open-air observation balcony. The vineyard colors and towering peaks are magnificent. The sommelier is pairing local Western Cape Pinotage with Karoo lamb for dinner tonight.'
      }
    ];

    // Load or initialize entries from localStorage
    function getStoredEntries() {
      try {
        const raw = localStorage.getItem('tracktales_voice_journal');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
      localStorage.setItem('tracktales_voice_journal', JSON.stringify(DEFAULT_VOICE_ENTRIES));
      return [...DEFAULT_VOICE_ENTRIES];
    }

    function saveEntries(entries) {
      try {
        localStorage.setItem('tracktales_voice_journal', JSON.stringify(entries));
      } catch (e) {}
      renderJournalList();
    }

    // Sync selected train badge in Voice Studio
    function updateStudioTrainBadge() {
      const currentTrain = localStorage.getItem('tracktales_selected_train') || 'blue-train';
      const isBlue = currentTrain === 'blue-train';
      if (trainBadge) {
        trainBadge.textContent = isBlue ? 'The Blue Train Journey' : 'Rovos Rail Safari Journey';
        trainBadge.className = `font-mono text-xs font-bold ${isBlue ? 'text-[#005691]' : 'text-[#0e382c]'} uppercase`;
      }
    }
    updateStudioTrainBadge();

    // Canvas Waveform Visualizer
    function startVisualizer() {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;

      let wavePhase = 0;

      function renderFrame() {
        ctx.clearRect(0, 0, width, height);

        // Background subtle fill
        ctx.fillStyle = 'rgba(248, 246, 240, 0.9)';
        ctx.fillRect(0, 0, width, height);

        if (isRecording) {
          const barsCount = 28;
          const barWidth = (width / barsCount) - 3;

          for (let i = 0; i < barsCount; i++) {
            let magnitude = 0;
            if (dataArray && analyser) {
              analyser.getByteFrequencyData(dataArray);
              const val = dataArray[i % dataArray.length];
              magnitude = (val / 255) * (height * 0.85);
            } else {
              // Simulated dynamic waveform
              magnitude = Math.sin(wavePhase + i * 0.35) * (height * 0.35) + Math.sin(wavePhase * 1.5 + i * 0.2) * (height * 0.25) + (height * 0.3);
              magnitude = Math.max(8, Math.min(height * 0.9, magnitude));
            }

            const x = i * (barWidth + 3) + 2;
            const y = (height - magnitude) / 2;

            const grad = ctx.createLinearGradient(0, y, 0, y + magnitude);
            grad.addColorStop(0, '#D99B26');
            grad.addColorStop(0.5, '#E0A83E');
            grad.addColorStop(1, '#C85028');

            ctx.fillStyle = grad;
            ctx.beginPath();
            if (ctx.roundRect) {
              ctx.roundRect(x, y, barWidth, magnitude, 3);
            } else {
              ctx.rect(x, y, barWidth, magnitude);
            }
            ctx.fill();
          }

          wavePhase += 0.15;
          visualizerAnimationId = requestAnimationFrame(renderFrame);
        } else {
          // Idle ambient resting line
          ctx.strokeStyle = '#D9CFC7';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, height / 2);
          for (let x = 0; x < width; x += 10) {
            const y = height / 2 + Math.sin(x * 0.05 + wavePhase) * 2;
            ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      renderFrame();
    }

    function stopVisualizer() {
      if (visualizerAnimationId) {
        cancelAnimationFrame(visualizerAnimationId);
        visualizerAnimationId = null;
      }
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(248, 246, 240, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#D9CFC7';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      }
    }
    stopVisualizer();

    // Timer format helpers
    function formatTime(secs) {
      const m = Math.floor(secs / 60).toString().padStart(2, '0');
      const s = (secs % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }

    function updateCounts() {
      const text = (transcriptInput.value || '').trim();
      const words = text ? text.split(/\s+/).length : 0;
      const chars = text.length;
      if (wordCountEl) wordCountEl.textContent = words;
      if (charCountEl) charCountEl.textContent = chars;
    }
    transcriptInput.addEventListener('input', updateCounts);

    // Initialize Web Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    function startRecording() {
      isRecording = true;
      recordSeconds = 0;
      if (timerEl) timerEl.textContent = '00:00';
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        recordSeconds++;
        if (timerEl) timerEl.textContent = formatTime(recordSeconds);
      }, 1000);

      // UI state
      if (pulseRing) pulseRing.classList.remove('hidden');
      if (recordBtn) {
        recordBtn.classList.remove('from-[#D99B26]', 'to-[#E0A83E]');
        recordBtn.classList.add('from-red-500', 'to-red-600', 'shadow-red-500/40');
      }
      if (recordIcon) recordIcon.setAttribute('data-lucide', 'square');
      if (statusEl) {
        statusEl.innerHTML = '<span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> <span class="text-red-600 font-bold">Listening... Speak clearly</span>';
      }
      if (hintEl) {
        hintEl.textContent = 'Recording Active (Tap to Stop)';
        hintEl.classList.remove('text-[#D99B26]');
        hintEl.classList.add('text-red-600');
      }
      if (window.lucide) lucide.createIcons();

      // Audio stream for visualizer
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
          audioStream = stream;
          try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioCtx();
            const source = audioContext.createMediaStreamSource(stream);
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 64;
            dataArray = new Uint8Array(analyser.frequencyBinCount);
            source.connect(analyser);
          } catch (err) {}
          startVisualizer();
        }).catch(() => {
          startVisualizer();
        });
      } else {
        startVisualizer();
      }

      if (SpeechRecognition) {
        try {
          recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = window.TrackTalesGetSpeechLanguage ? window.TrackTalesGetSpeechLanguage() : 'en-ZA';

          let baseTranscript = transcriptInput.value ? transcriptInput.value + ' ' : '';

          recognition.onresult = (event) => {
            let interim = '';
            let final = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                final += event.results[i][0].transcript;
              } else {
                interim += event.results[i][0].transcript;
              }
            }
            if (final) baseTranscript += final + ' ';
            transcriptInput.value = (baseTranscript + interim).trim();
            updateCounts();
          };

          recognition.onerror = (e) => {
            console.log('Speech recognition event:', e.error);
            if (e.error === 'not-allowed') {
              if (statusEl) statusEl.innerHTML = '<span class="text-red-500 font-bold">Mic permission blocked</span>';
            }
          };

          recognition.onend = () => {
            if (isRecording) {
              try { recognition.start(); } catch (err) {}
            }
          };

          recognition.start();
        } catch (e) {
          console.warn('SpeechRecognition initialization shim:', e);
        }
      } else {
        if (statusEl) {
          statusEl.innerHTML = '<span class="text-[#D99B26] font-bold">Ready to record</span>';
        }
      }
    }

    function stopRecording() {
      isRecording = false;
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      if (pulseRing) pulseRing.classList.add('hidden');
      if (recordBtn) {
        recordBtn.classList.remove('from-red-500', 'to-red-600', 'shadow-red-500/40');
        recordBtn.classList.add('from-[#D99B26]', 'to-[#E0A83E]');
      }
      if (recordIcon) recordIcon.setAttribute('data-lucide', 'mic');
      if (statusEl) {
        statusEl.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-[#2E7D46]"></i> <span class="text-[#2E7D46] font-bold">Transcription Complete</span>';
      }
      if (hintEl) {
        hintEl.textContent = 'Tap Mic to Speak';
        hintEl.classList.remove('text-red-600');
        hintEl.classList.add('text-[#D99B26]');
      }
      if (window.lucide) lucide.createIcons();

      if (recognition) {
        try { recognition.stop(); } catch (e) {}
        recognition = null;
      }

      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
        audioStream = null;
      }
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().catch(() => {});
        audioContext = null;
      }
      stopVisualizer();
      updateCounts();
    }

    recordBtn.addEventListener('click', () => {
      if (!isRecording) {
        startRecording();
      } else {
        stopRecording();
      }
    });

    // Simulated dictation scripts
    const SIMULATED_PASSENGER_SCRIPTS = [
      "Gliding through the Hex River Valley tunnels right now. The vineyards are turning golden under the late afternoon Cape sun. The luxury and calm on board is truly remarkable.",
      "Just had lunch in the dining car. Five-course silver service with fresh Karoo lamb and sommelier paired wine. The landscape rolling past the panoramic windows makes every bite feel historic.",
      "Arriving into Kimberley station. You can see the historic Victorian station architecture and the diamond museum across the tracks. Looking forward to the guided Big Hole excursion.",
      "The quiet expanse of the Great Karoo under a starry night sky from the observation lounge. The gentle rhythm of the rails is the ultimate relaxation."
    ];

    if (simulateBtn) {
      simulateBtn.addEventListener('click', () => {
        if (isRecording) stopRecording();
        const script = SIMULATED_PASSENGER_SCRIPTS[Math.floor(Math.random() * SIMULATED_PASSENGER_SCRIPTS.length)];
        transcriptInput.value = '';
        updateCounts();

        if (statusEl) statusEl.innerHTML = '<span class="text-[#D99B26] font-bold">Simulating Voice Stream...</span>';
        if (hintEl) hintEl.textContent = 'Streaming Dictation';
        startRecording();

        const words = script.split(' ');
        let idx = 0;
        const interval = setInterval(() => {
          if (idx < words.length) {
            transcriptInput.value += (idx === 0 ? '' : ' ') + words[idx];
            updateCounts();
            idx++;
          } else {
            clearInterval(interval);
            stopRecording();
          }
        }, 160);
      });
    }

    // Clear transcript
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (isRecording) stopRecording();
        transcriptInput.value = '';
        updateCounts();
        if (statusEl) statusEl.innerHTML = '<i data-lucide="mic-off" class="w-3.5 h-3.5 text-[#78716C]"></i> Ready to Record';
        if (window.lucide) lucide.createIcons();
      });
    }

    // Copy transcript
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = transcriptInput.value.trim();
        if (!text) {
          alert('No transcript to copy. Speak or simulate a voice note first!');
          return;
        }
        navigator.clipboard.writeText(text).then(() => {
          const original = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600"></i> Copied!';
          if (window.lucide) lucide.createIcons();
          setTimeout(() => {
            copyBtn.innerHTML = original;
            if (window.lucide) lucide.createIcons();
          }, 2000);
        });
      });
    }

    // Read Back / Web Speech Synthesis
    if (readAloudBtn) {
      readAloudBtn.addEventListener('click', () => {
        const text = transcriptInput.value.trim();
        if (!text) {
          alert('No spoken transcript to read back. Record or type your notes first!');
          return;
        }

        if (window.speechSynthesis) {
          if (isSpeakingReadBack) {
            window.speechSynthesis.cancel();
            isSpeakingReadBack = false;
            readAloudBtn.innerHTML = '<i data-lucide="volume-2" class="w-3.5 h-3.5 text-[#4A52B0]"></i> Read Back';
            if (window.lucide) lucide.createIcons();
            return;
          }

          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 0.95;
          utterance.pitch = 1.0;
          
          utterance.onstart = () => {
            isSpeakingReadBack = true;
            readAloudBtn.innerHTML = '<i data-lucide="square" class="w-3.5 h-3.5 text-red-500"></i> Stop Reading';
            if (window.lucide) lucide.createIcons();
          };

          utterance.onend = () => {
            isSpeakingReadBack = false;
            readAloudBtn.innerHTML = '<i data-lucide="volume-2" class="w-3.5 h-3.5 text-[#4A52B0]"></i> Read Back';
            if (window.lucide) lucide.createIcons();
          };

          utterance.onerror = () => {
            isSpeakingReadBack = false;
            readAloudBtn.innerHTML = '<i data-lucide="volume-2" class="w-3.5 h-3.5 text-[#4A52B0]"></i> Read Back';
            if (window.lucide) lucide.createIcons();
          };

          window.speechSynthesis.speak(utterance);
        } else {
          alert('Speech synthesis is not supported in this browser.');
        }
      });
    }

    // Save Voice Entry to Journal
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const text = transcriptInput.value.trim();
        if (!text) {
          alert('Please record or enter a voice transcript before saving.');
          return;
        }

        const currentTrain = localStorage.getItem('tracktales_selected_train') || 'blue-train';
        const trainName = currentTrain === 'blue-train' ? 'The Blue Train' : 'Rovos Rail Safari';
        const stop = stopSelect ? stopSelect.value : 'Corridor Route';
        const category = categorySelect ? categorySelect.value : 'Route Reflection';

        const now = new Date();
        const dateStr = now.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' +
          now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const newEntry = {
          id: 'voice-' + Date.now(),
          trainId: currentTrain,
          trainName: trainName,
          stop: stop,
          category: category,
          date: dateStr,
          timestamp: Date.now(),
          text: text
        };

        const entries = getStoredEntries();
        entries.unshift(newEntry);
        saveEntries(entries);

        transcriptInput.value = '';
        updateCounts();
        if (isRecording) stopRecording();

        if (statusEl) statusEl.innerHTML = '<i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600"></i> <span class="text-emerald-700 font-bold">Saved to Journal!</span>';
        if (window.lucide) lucide.createIcons();

        setTimeout(() => {
          const firstCard = notesList.querySelector('.voice-entry-card');
          if (firstCard) {
            firstCard.classList.add('ring-2', 'ring-[#D99B26]', 'shadow-lg');
            setTimeout(() => firstCard.classList.remove('ring-2', 'ring-[#D99B26]', 'shadow-lg'), 2500);
          }
        }, 100);
      });
    }

    // Render Saved Journal Feed
    function renderJournalList() {
      if (!notesList) return;
      const entries = getStoredEntries();
      const query = (searchInput && searchInput.value ? searchInput.value.toLowerCase().trim() : '');

      let filtered = entries.filter(item => {
        const matchesFilter = activeFilter === 'all' || item.trainId === activeFilter;
        const matchesQuery = !query || 
          item.text.toLowerCase().includes(query) || 
          item.stop.toLowerCase().includes(query) || 
          item.category.toLowerCase().includes(query) || 
          item.trainName.toLowerCase().includes(query);
        return matchesFilter && matchesQuery;
      });

      if (countBadge) {
        countBadge.textContent = `${filtered.length} Entr${filtered.length === 1 ? 'y' : 'ies'}`;
      }

      if (filtered.length === 0) {
        notesList.innerHTML = `
          <div class="glass-card p-8 rounded-2xl border border-black/10 text-center text-xs font-mono text-[#78716C]">
            <i data-lucide="mic-off" class="w-8 h-8 mx-auto text-[#D99B26]/60 mb-2"></i>
            <p class="font-bold text-[#0A0C10] mb-1">No voice journal entries found</p>
            <p>Record your spoken memories above to see your transcribed notes here.</p>
          </div>
        `;
        if (window.lucide) lucide.createIcons();
        return;
      }

      notesList.innerHTML = filtered.map(item => {
        const isBlue = item.trainId === 'blue-train';
        return `
          <div class="voice-entry-card glass-card p-5 rounded-2xl border border-black/10 hover:border-[#D99B26]/50 transition-all text-left relative group">
            
            <!-- Top Card Badges -->
            <div class="flex items-center justify-between gap-2 mb-2.5">
              <span class="px-2.5 py-0.5 rounded-full ${isBlue ? 'bg-[#005691]/10 text-[#005691] border border-[#005691]/20' : 'bg-[#0e382c]/10 text-[#0e382c] border border-[#0e382c]/20'} font-mono text-[10px] font-bold">
                ${item.trainName}
              </span>
              <span class="font-mono text-[10px] text-[#78716C] font-semibold">${item.date}</span>
            </div>

            <!-- Stop & Category -->
            <div class="flex items-center gap-2 mb-2 font-mono text-xs">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#D99B26] shrink-0"></i>
              <strong class="text-[#0A0C10] font-bold text-xs">${item.stop}</strong>
              <span class="text-[#78716C]">·</span>
              <span class="text-[10px] uppercase font-bold text-[#78716C] px-2 py-0.5 rounded bg-black/5">${item.category}</span>
            </div>

            <!-- Transcribed Text Quote -->
            <div class="p-3.5 rounded-xl bg-black/[0.02] border-l-2 border-[#D99B26] mb-3 text-xs font-sans text-[#111827] leading-relaxed">
              "${item.text}"
            </div>

            <!-- Action Buttons Toolbar -->
            <div class="flex items-center justify-between pt-2 border-t border-black/5 font-mono text-[11px]">
              <span class="text-[#78716C] text-[10px]">${item.text.split(' ').length} words</span>
              
              <div class="flex items-center gap-2">
                <button data-play-entry="${item.id}" class="btn-play-voice-entry p-1.5 rounded-lg hover:bg-[#D99B26]/10 text-[#0A0C10] hover:text-[#D99B26] transition-colors cursor-pointer" title="Listen to entry">
                  <i data-lucide="volume-2" class="w-4 h-4"></i>
                </button>

                <button data-copy-entry="${item.id}" class="btn-copy-voice-entry p-1.5 rounded-lg hover:bg-black/5 text-[#0A0C10] hover:text-[#D99B26] transition-colors cursor-pointer" title="Copy text">
                  <i data-lucide="copy" class="w-4 h-4"></i>
                </button>

                <button data-delete-entry="${item.id}" class="btn-delete-voice-entry p-1.5 rounded-lg hover:bg-red-50 text-[#78716C] hover:text-red-600 transition-colors cursor-pointer" title="Delete entry">
                  <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
              </div>
            </div>

          </div>
        `;
      }).join('');

      if (window.lucide) lucide.createIcons();

      // Attach action listeners for entries
      notesList.querySelectorAll('.btn-play-voice-entry').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const id = btn.getAttribute('data-play-entry');
          const entry = entries.find(x => x.id === id);
          if (!entry || !window.speechSynthesis) return;

          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(entry.text);
          u.rate = 0.95;
          window.speechSynthesis.speak(u);
        });
      });

      notesList.querySelectorAll('.btn-copy-voice-entry').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const id = btn.getAttribute('data-copy-entry');
          const entry = entries.find(x => x.id === id);
          if (entry) {
            navigator.clipboard.writeText(entry.text).then(() => {
              btn.innerHTML = '<i data-lucide="check" class="w-4 h-4 text-emerald-600"></i>';
              if (window.lucide) lucide.createIcons();
              setTimeout(() => {
                btn.innerHTML = '<i data-lucide="copy" class="w-4 h-4"></i>';
                if (window.lucide) lucide.createIcons();
              }, 1800);
            });
          }
        });
      });

      notesList.querySelectorAll('.btn-delete-voice-entry').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const id = btn.getAttribute('data-delete-entry');
          if (confirm('Delete this voice journal entry?')) {
            const current = getStoredEntries().filter(x => x.id !== id);
            saveEntries(current);
          }
        });
      });
    }

    // Filter Button Handlers
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-[#0A0C10]', 'text-white', 'active');
          b.classList.add('bg-black/5', 'text-[#0A0C10]');
        });
        btn.classList.add('bg-[#0A0C10]', 'text-white', 'active');
        btn.classList.remove('bg-black/5');
        activeFilter = btn.getAttribute('data-voice-filter') || 'all';
        renderJournalList();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', renderJournalList);
    }

    // Export All Logs as .txt Travel Diary
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const entries = getStoredEntries();
        if (entries.length === 0) {
          alert('No journal entries to export.');
          return;
        }

        let content = '============================================================\n';
        content += 'TRACKTALES PASSENGER VOICE JOURNAL & CORRIDOR DIARY\n';
        content += 'Pretoria to Cape Town Rail Corridor (1,600 km)\n';
        content += `Exported: ${new Date().toLocaleString('en-ZA')}\n`;
        content += '============================================================\n\n';

        entries.forEach((e, idx) => {
          content += `[ENTRY ${idx + 1}] - ${e.trainName} | ${e.stop}\n`;
          content += `Category: ${e.category} | Date: ${e.date}\n`;
          content += `Transcript:\n"${e.text}"\n\n`;
          content += '------------------------------------------------------------\n\n';
        });

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `TrackTales_Passenger_Voice_Journal_${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }

    // Initial render of journal
    renderJournalList();

    // Export global trigger for train changes
    window.TrackTalesUpdateVoiceStudioTrain = updateStudioTrainBadge;
  }

  // ==========================================================================
  // 1. LIVE GPS CORRIDOR TRACKER ENGINE (100% Free · Real-Time Geolocation)
  // ==========================================================================
  function setupGPSTracker() {
    const gpsModal = document.getElementById('gpsModal');
    const openBtns = [document.getElementById('btn-open-gps'), document.getElementById('mobile-gps-btn')].filter(Boolean);
    const closeBtn = document.getElementById('gps-modal-close');
    const toggleGpsBtn = document.getElementById('btn-toggle-device-gps');
    const toggleGpsLabel = document.getElementById('btn-toggle-gps-label');
    const simulateBtn = document.getElementById('btn-simulate-gps');
    const simulateLabel = document.getElementById('btn-simulate-gps-label');
    const copyCoordsBtn = document.getElementById('btn-copy-gps-coords');

    const latEl = document.getElementById('gps-lat');
    const lngEl = document.getElementById('gps-lng');
    const speedEl = document.getElementById('gps-speed');
    const headingEl = document.getElementById('gps-heading');
    const accuracyEl = document.getElementById('gps-accuracy-badge');
    const statusTextEl = document.getElementById('gps-status-text');
    const pulseDotEl = document.getElementById('gps-pulse-dot');
    const nearestNameEl = document.getElementById('gps-nearest-name');
    const nearestDescEl = document.getElementById('gps-nearest-desc');
    const nearestDistanceEl = document.getElementById('gps-nearest-distance');
    const corridorPctEl = document.getElementById('gps-corridor-pct');
    const progressBarEl = document.getElementById('gps-progress-bar');
    const milestonesListEl = document.getElementById('gps-milestones-list');
    const navGpsLabel = document.getElementById('nav-gps-label');
    const navGpsIcon = document.getElementById('nav-gps-icon');

    // Key Corridor Stops with Coordinates along the 1,600 km line
    const CORRIDOR_MILESTONES = [
      { id: 'pretoria', name: 'Pretoria Capital Park Terminal', province: 'Gauteng', km: 0, lat: -25.7461, lng: 28.1881, desc: 'Northern luxury terminus for The Blue Train and Rovos Rail.' },
      { id: 'johannesburg', name: 'Johannesburg Gold Reef Belt', province: 'Gauteng', km: 60, lat: -26.2041, lng: 28.0473, desc: 'Witwatersrand gold reef crossroads and inland industrial hub.' },
      { id: 'kimberley', name: 'Kimberley Big Hole & Diamond Mine', province: 'Northern Cape', km: 500, lat: -28.7419, lng: 24.7719, desc: 'Diamond rush open-mine museum & Victorian railway club excursion.' },
      { id: 'deaar', name: 'De Aar Railway Junction', province: 'Northern Cape', km: 750, lat: -30.6500, lng: 24.0167, desc: 'Historic steam crossroads of southern Africa.' },
      { id: 'beaufortwest', name: 'Beaufort West (The Great Karoo)', province: 'Western Cape', km: 1050, lat: -32.3567, lng: 22.5833, desc: 'Heart of the vast Karoo semi-desert, sheep farms, and fossil plains.' },
      { id: 'matjiesfontein', name: 'Matjiesfontein Victorian Village', province: 'Western Cape', km: 1320, lat: -33.2306, lng: 20.5822, desc: '19th-century colonial railway oasis & Lord Milner Hotel.' },
      { id: 'hexriver', name: 'Hex River Valley Mountain Pass', province: 'Western Cape', km: 1450, lat: -33.4833, lng: 19.6667, desc: 'Dramatic mountain railway tunnels, spirals, and lush vineyards.' },
      { id: 'capetown', name: 'Cape Town Central Terminus', province: 'Western Cape', km: 1600, lat: -33.9249, lng: 18.4241, desc: 'Atlantic coastal terminus resting beneath Table Mountain.' }
    ];

    let watchId = null;
    let isTracking = false;
    let isSimulating = false;
    let simulationTimer = null;
    let currentSimIndex = 0;
    let lastKnownCoords = { lat: -25.7461, lng: 28.1881, name: 'Pretoria Capital Park' };

    // Calculate Geodesic Distance via Haversine Formula (KM)
    function calculateDistanceKm(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.round(R * c * 10) / 10;
    }

    // Modal Visibility Helpers
    function openModal() {
      if (!gpsModal) return;
      gpsModal.classList.remove('hidden');
      gpsModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      if (!isTracking && !isSimulating) {
        startTracking();
      }
    }

    function closeModal() {
      if (!gpsModal) return;
      gpsModal.classList.add('hidden');
      gpsModal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    }));

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (gpsModal) {
      gpsModal.addEventListener('click', (e) => {
        if (e.target === gpsModal) closeModal();
      });
    }

    // Update GPS Display with Coordinates & Corridor Landmark Proximity
    function updateGPSData(lat, lng, accuracy = 15, speed = null, heading = null) {
      lastKnownCoords = { lat, lng };

      if (latEl) latEl.textContent = lat.toFixed(4) + '° S';
      if (lngEl) lngEl.textContent = lng.toFixed(4) + '° E';
      if (accuracyEl) accuracyEl.textContent = `Accuracy: ±${Math.round(accuracy)}m`;
      if (speedEl) speedEl.textContent = speed ? `${Math.round(speed * 3.6)} km/h` : '85 km/h (Express)';
      if (headingEl) headingEl.textContent = heading ? `${Math.round(heading)}° SW` : 'Southbound';

      // Find Distances to All Corridor Milestones
      const distances = CORRIDOR_MILESTONES.map(stop => {
        const dist = calculateDistanceKm(lat, lng, stop.lat, stop.lng);
        return { ...stop, distanceKm: dist };
      });

      // Sort by proximity
      const sorted = [...distances].sort((a, b) => a.distanceKm - b.distanceKm);
      const nearest = sorted[0];
      lastKnownCoords.name = nearest.name;

      if (nearestNameEl) nearestNameEl.textContent = nearest.name;
      if (nearestDescEl) nearestDescEl.textContent = `${nearest.province} · ${nearest.desc}`;
      if (nearestDistanceEl) {
        nearestDistanceEl.textContent = nearest.distanceKm < 2 ? 'At Landmark' : `${nearest.distanceKm} km away`;
      }

      // Calculate Corridor Progress %
      const pretoriaDist = calculateDistanceKm(lat, lng, CORRIDOR_MILESTONES[0].lat, CORRIDOR_MILESTONES[0].lng);
      const capetownDist = calculateDistanceKm(lat, lng, CORRIDOR_MILESTONES[7].lat, CORRIDOR_MILESTONES[7].lng);
      const approxProgress = Math.min(100, Math.max(0, Math.round((pretoriaDist / (pretoriaDist + capetownDist)) * 100)));

      if (corridorPctEl) corridorPctEl.textContent = `${approxProgress}% (${nearest.km} km traversed)`;
      if (progressBarEl) progressBarEl.style.width = `${approxProgress}%`;

      // Render Milestone Proximity Matrix
      if (milestonesListEl) {
        milestonesListEl.innerHTML = distances.map(stop => {
          const isNearest = stop.id === nearest.id;
          const isPassed = stop.km < nearest.km;
          return `
            <div class="p-2.5 rounded-xl ${isNearest ? 'bg-[#D99B26]/15 border border-[#D99B26]' : 'bg-white border border-[#E7E2D8]'} flex items-center justify-between">
              <div class="flex items-center gap-2">
                <i data-lucide="${isNearest ? 'map-pin' : isPassed ? 'check-circle' : 'circle'}" class="w-3.5 h-3.5 ${isNearest ? 'text-[#D99B26]' : isPassed ? 'text-[#2E7D46]' : 'text-[#78716C]'}"></i>
                <span class="${isNearest ? 'font-bold text-[#0A0C10]' : 'text-[#44403C]'}">${stop.name}</span>
              </div>
              <span class="text-[11px] font-bold ${isNearest ? 'text-[#D99B26]' : 'text-[#78716C]'}">
                ${isNearest ? 'NEAREST · ' + stop.distanceKm + ' km' : stop.distanceKm + ' km'}
              </span>
            </div>
          `;
        }).join('');
        if (window.lucide) lucide.createIcons();
      }

      // Update Nav Bar GPS Badge
      if (navGpsLabel) {
        navGpsLabel.textContent = `GPS: ${nearest.name.split(' ')[0]}`;
      }
      if (navGpsIcon) {
        navGpsIcon.classList.add('text-[#2E7D46]');
      }
    }

    // Geolocation API Tracker
    function startTracking() {
      if (isSimulating) stopSimulation();

      if (!('geolocation' in navigator)) {
        if (statusTextEl) statusTextEl.textContent = 'Geolocation not supported by browser.';
        return;
      }

      isTracking = true;
      if (toggleGpsLabel) toggleGpsLabel.textContent = 'Stop Live GPS';
      if (statusTextEl) statusTextEl.textContent = 'Live Geolocation Active';
      if (pulseDotEl) pulseDotEl.className = 'w-2.5 h-2.5 rounded-full bg-[#2E7D46] animate-pulse';

      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, accuracy, speed, heading } = pos.coords;
          updateGPSData(latitude, longitude, accuracy, speed, heading);
        },
        (err) => {
          console.warn('GPS Error/Fallback to Corridor Simulation:', err.message);
          if (statusTextEl) statusTextEl.textContent = 'GPS Permission Denied · Simulated Corridor';
          // Fallback to initial stop coordinates so user can test seamlessly
          updateGPSData(CORRIDOR_MILESTONES[0].lat, CORRIDOR_MILESTONES[0].lng, 25, 25, 180);
        },
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
    }

    function stopTracking() {
      isTracking = false;
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
      }
      if (toggleGpsLabel) toggleGpsLabel.textContent = 'Enable Live GPS';
      if (statusTextEl) statusTextEl.textContent = 'GPS Standby: Tap Enable';
      if (pulseDotEl) pulseDotEl.className = 'w-2.5 h-2.5 rounded-full bg-[#78716C]';
      if (navGpsLabel) navGpsLabel.textContent = 'GPS: Off';
    }

    if (toggleGpsBtn) {
      toggleGpsBtn.addEventListener('click', () => {
        if (isTracking) stopTracking();
        else startTracking();
      });
    }

    // Simulation Runner (Pretoria -> Cape Town Express Journey)
    function startSimulation() {
      if (isTracking) stopTracking();
      isSimulating = true;
      if (simulateLabel) simulateLabel.textContent = 'Pause Ride';
      if (statusTextEl) statusTextEl.textContent = 'Simulated Rail Express Active (85 km/h)';
      if (pulseDotEl) pulseDotEl.className = 'w-2.5 h-2.5 rounded-full bg-[#D99B26] animate-pulse';

      simulationTimer = setInterval(() => {
        const stop = CORRIDOR_MILESTONES[currentSimIndex];
        updateGPSData(stop.lat, stop.lng, 10, 24, 210);
        currentSimIndex = (currentSimIndex + 1) % CORRIDOR_MILESTONES.length;
      }, 2500);

      // Trigger first immediately
      const initial = CORRIDOR_MILESTONES[currentSimIndex];
      updateGPSData(initial.lat, initial.lng, 10, 24, 210);
      currentSimIndex = (currentSimIndex + 1) % CORRIDOR_MILESTONES.length;
    }

    function stopSimulation() {
      isSimulating = false;
      if (simulationTimer) {
        clearInterval(simulationTimer);
        simulationTimer = null;
      }
      if (simulateLabel) simulateLabel.textContent = 'Simulate Ride';
      if (statusTextEl) statusTextEl.textContent = 'Simulation Paused';
    }

    if (simulateBtn) {
      simulateBtn.addEventListener('click', () => {
        if (isSimulating) stopSimulation();
        else startSimulation();
      });
    }

    // Share / Copy Location
    if (copyCoordsBtn) {
      copyCoordsBtn.addEventListener('click', () => {
        const msg = `[TrackTales Rail Companion]\nMy Location: ${lastKnownCoords.name}\nCoordinates: ${lastKnownCoords.lat.toFixed(4)}, ${lastKnownCoords.lng.toFixed(4)}\nRoute: Pretoria to Cape Town Corridor (1,600 km)`;
        navigator.clipboard.writeText(msg).then(() => {
          copyCoordsBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600"></i> Location Copied!';
          if (window.lucide) lucide.createIcons();
          setTimeout(() => {
            copyCoordsBtn.innerHTML = '<i data-lucide="copy" class="w-3.5 h-3.5"></i> Share Location';
            if (window.lucide) lucide.createIcons();
          }, 2000);
        });
      });
    }

    // Expose global accessor for SOS Distress Beacon generator
    window.TrackTalesGetGPSLocation = () => lastKnownCoords;
  }


  // ==========================================================================
  // 2. ACCESSIBILITY SUITE ENGINE FOR BLIND & LOW-VISION TRAVELERS
  // ==========================================================================
  function setupAccessibilityMode() {
    const modal = document.getElementById('accessibilityModal');
    const openBtns = [document.getElementById('btn-open-accessibility'), document.getElementById('mobile-accessibility-btn')].filter(Boolean);
    const closeBtn = document.getElementById('accessibility-modal-close');
    const toggleScreenReader = document.getElementById('toggle-screen-reader');
    const toggleHighContrast = document.getElementById('toggle-high-contrast');
    const toggleLargeFont = document.getElementById('toggle-large-font');
    const speechRateInput = document.getElementById('accessibility-speech-rate');
    const speechRateLabel = document.getElementById('speech-rate-label');
    const readPageBtn = document.getElementById('btn-read-current-page');
    const stopSpeechBtn = document.getElementById('btn-stop-all-speech');

    let isScreenReaderActive = false;
    let speechRate = 1.0;

    // Speech Synthesizer Helper
    function speakText(text, interrupt = true) {
      if (!('speechSynthesis' in window) || !text) return;
      if (interrupt) window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speechRate;
      utterance.pitch = 1.0;
      utterance.lang = window.TrackTalesGetSpeechLanguage ? window.TrackTalesGetSpeechLanguage() : 'en-ZA';
      window.speechSynthesis.speak(utterance);
    }

    // Modal Helpers
    function openModal() {
      if (!modal) return;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      if (isScreenReaderActive) {
        speakText('Accessibility Settings Portal opened. Choose screen reader audio, high contrast, or large text scaling.');
      }
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    }));

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    // 1. Screen Reader Audio Narrator Toggle
    if (toggleScreenReader) {
      toggleScreenReader.addEventListener('change', (e) => {
        isScreenReaderActive = e.target.checked;
        if (isScreenReaderActive) {
          speakText('Screen Reader Audio Narrator Enabled. Buttons and sections will be announced as you interact.');
          attachScreenReaderListeners();
        } else {
          speakText('Screen Reader Audio Narrator Disabled.');
          window.speechSynthesis.cancel();
        }
      });
    }

    // Make each setting row a click target while preserving native checkbox behavior.
    [
      ['toggle-screen-reader', 'Screen Reader Audio Narrator'],
      ['toggle-high-contrast', 'High Contrast Dark Canvas'],
      ['toggle-large-font', 'Large Font Scaling']
    ].forEach(([id, label]) => {
      const input = document.getElementById(id);
      const card = input ? input.closest('[data-a11y-setting-card]') : null;
      if (!input || !card) return;
      card.addEventListener('click', (event) => {
        if (event.target.closest('input, label')) return;
        input.click();
      });
      card.setAttribute('aria-label', label);
    });

    function attachScreenReaderListeners() {
      // Announce on hover/focus across buttons and navigation links
      document.querySelectorAll('button, a, select, input, .corridor-stop-card, .bingo-cell').forEach(el => {
        if (el.dataset.hasA11yListener) return;
        el.dataset.hasA11yListener = 'true';

        const announce = () => {
          if (!isScreenReaderActive) return;
          const label = el.getAttribute('aria-label') || el.getAttribute('title') || el.innerText || el.placeholder || 'Interactive control';
          if (label && label.trim().length > 0) {
            speakText(label.trim().slice(0, 120), false);
          }
        };

        el.addEventListener('focus', announce);
        el.addEventListener('mouseenter', announce);
      });
    }

    // 2. High Contrast Theme Toggle
    if (toggleHighContrast) {
      const savedContrast = localStorage.getItem('tracktales_contrast') === 'high';
      if (savedContrast) {
        toggleHighContrast.checked = true;
        document.body.classList.add('high-contrast-mode');
      }

      toggleHighContrast.addEventListener('change', (e) => {
        if (e.target.checked) {
          document.body.classList.add('high-contrast-mode');
          localStorage.setItem('tracktales_contrast', 'high');
          if (isScreenReaderActive) speakText('High Contrast Dark Mode Activated.');
        } else {
          document.body.classList.remove('high-contrast-mode');
          localStorage.setItem('tracktales_contrast', 'standard');
          if (isScreenReaderActive) speakText('Standard Light Theme Restored.');
        }
      });
    }

    // 3. Large Font Scaling Toggle
    if (toggleLargeFont) {
      const savedFont = localStorage.getItem('tracktales_font_scale') === 'large';
      if (savedFont) {
        toggleLargeFont.checked = true;
        document.body.classList.add('large-text-mode');
      }

      toggleLargeFont.addEventListener('change', (e) => {
        if (e.target.checked) {
          document.body.classList.add('large-text-mode');
          localStorage.setItem('tracktales_font_scale', 'large');
          if (isScreenReaderActive) speakText('Large Font Scaling Activated.');
        } else {
          document.body.classList.remove('large-text-mode');
          localStorage.setItem('tracktales_font_scale', 'standard');
          if (isScreenReaderActive) speakText('Standard Font Scaling Restored.');
        }
      });
    }

    // 4. Speech Rate Slider
    if (speechRateInput && speechRateLabel) {
      speechRateInput.addEventListener('input', (e) => {
        speechRate = parseFloat(e.target.value);
        speechRateLabel.textContent = `${speechRate}x (${speechRate < 1 ? 'Slower' : speechRate > 1 ? 'Faster' : 'Normal'})`;
        speakText(`Speech rate set to ${speechRate} speed.`);
      });
    }

    // 5. Read Aloud Current Active Page
    if (readPageBtn) {
      readPageBtn.addEventListener('click', () => {
        const activePage = document.querySelector('.page-view.active') || document.getElementById('page-home');
        if (!activePage) return;
        const headings = Array.from(activePage.querySelectorAll('h1, h2, h3, p')).map(el => el.innerText).filter(Boolean);
        const textToRead = headings.slice(0, 5).join('. ');
        speakText(textToRead || 'Now viewing TrackTales Pretoria to Cape Town rail companion.');
      });
    }

    if (stopSpeechBtn) {
      stopSpeechBtn.addEventListener('click', () => {
        if (window.TrackTalesStopSpeech) window.TrackTalesStopSpeech();
        if (window.speechSynthesis) window.speechSynthesis.cancel();
      });
    }

    window.TrackTalesAnnounce = (text) => {
      if (isScreenReaderActive) speakText(text);
    };
  }


  // ==========================================================================
  // 3. MULTI-LANGUAGE ENGINE (EN, ZU, XH, AF, ST)
  // ==========================================================================
  function setupMultiLanguage() {
    const langSelect = document.getElementById('lang-select');
    if (!langSelect) return;

    const TRANSLATIONS = {
      en: {
        hero_tag: 'PRETORIA TO CAPE TOWN CORRIDOR · THE BLUE TRAIN',
        hero_h1: 'Watch The Journey',
        hero_h1_sub: 'Unfold.',
        hero_desc: 'A luxury rail ticket for this route can cost tens of thousands of Rand. TrackTales traces the same line a spectrum that runs from the Highveld to the Atlantic.',
        stops_tag: 'SOUTH AFRICAN RAIL HERITAGE · PRETORIA TO CAPE TOWN',
        stops_title: 'Corridor Stops',
        stops_desc: 'An immersive living journey tracing historic stations, mountain passes, and Karoo desert junctions along Mzansi\'s iconic 1,600 km rail corridor.'
      },
      zu: {
        hero_tag: 'UMZILA OSUSUKA E-PRETORIA UYA E-KAPA · ISITIMELA ESIBLUU',
        hero_h1: 'Bukela Uhambo',
        hero_h1_sub: 'Lwembuleka.',
        hero_desc: 'Ithikithi lesitimela esisezingeni eliphezulu lingabiza izinkulungwane zamaRandi. I-TrackTales ilandelela lowo mzila omuhle kusukela eHighveld kuya olwandle.',
        stops_tag: 'UMLANDO WEZITIMELA WASENINGIZIMU AFRIKA · PRETORIA KUYA EKAPA',
        stops_title: 'Izitobhi Zomzila',
        stops_desc: 'Uhambo olubukhoma olulandelela iziteshi zomlando, izintaba, nezindawo zeKaroo ebangeni elingamakhilomitha angu-1,600.'
      },
      xh: {
        hero_tag: 'INDLELA ESUSUKA ETPRETORIA ISINGA EKAPA · ITRENI EBLUU',
        hero_h1: 'Bukela Uhambo',
        hero_h1_sub: 'Lutyhilwa.',
        hero_desc: 'Itikiti likaloliwe wokunethezeka linokubiza amawaka eerandi. I-TrackTales ilandela lo mzila mhle ukusuka eHighveld ukuya e-Atlantic.',
        stops_tag: 'ILIFA LIKALOLIWE WASENINGIZIMU AFRIKA · PRETORIA UKUYA EKAPA',
        stops_title: 'Izitishi Zomzila',
        stops_desc: 'Uhambo olutyhila izitishi zembali, iindledlana zeentaba kunye namathafa aseKaroo kumgama ongamakhilomitha ayi-1,600.'
      },
      af: {
        hero_tag: 'PRETORIA NA KAAPSTAD KORRIDOR · DIE BLOU TREIN',
        hero_h1: 'Kyk Hoe Die Reis',
        hero_h1_sub: 'Ontvou.',
        hero_desc: '\'n Luukse treinkaartjie vir hierdie roete kan tienduisende Rand kos. TrackTales volg dieselfde lyn van die Hoëveld tot by die Atlantiese Oseaan.',
        stops_tag: 'SUID-AFRIKAANSE SPOORWEGERFENIS · PRETORIA NA KAAPSTAD',
        stops_title: 'Korridor-haltes',
        stops_desc: '\'n Meeslepende lewende reis wat historiese stasies, bergklowe en Karoo-aansluitings langs Mzansi se ikoniese 1,600 km spoorlyn volg.'
      },
      st: {
        hero_tag: 'TSELA HO TSOHA PRETORIA HO YA CAPE TOWN · TERENE YA BLUE',
        hero_h1: 'Shebella Leeto',
        hero_h1_sub: 'Le Senoleha.',
        hero_desc: 'Tekete ya terene ya mabothobotho e ka bitsa dikete tsa Diranta. TrackTales e latela tsela e ntle ho tloha Highveld ho ya Atlantic.',
        stops_tag: 'LEFA LA DITERENE LA AFRIKA BORWA · PRETORIA HO YA CAPE TOWN',
        stops_title: 'Diteishene tsa Tsela',
        stops_desc: 'Leeto le hlakileng le salang morao diteishene tsa nalane, ditsela tsa dithaba, le mahoatata a Karoo tseleng ya 1,600 km.'
      },
      tn: {
        hero_tag: 'MOKELO WA PRETORIA GO YA CAPE TOWN · TERENE YA BLUE',
        hero_h1: 'Bona Loeto',
        hero_h1_sub: 'Lo Bula.',
        hero_desc: 'TrackTales e latela seporo sa Pretoria go ya Cape Town go ralala Highveld, Karoo le Atlantic.',
        stops_tag: 'BOSWA JWA SEPORO SA AFRIKA BORWA · PRETORIA GO YA CAPE TOWN',
        stops_title: 'Diteishene tsa Tsela',
        stops_desc: 'Loeto lo lo tshelang lo latela diteishene tsa bogologolo, dithaba le naga ya Karoo mo seporong sa 1,600 km.'
      },
      nso: {
        hero_tag: 'MOKGWA WA TERENE GO TLOGA PRETORIA GO YA CAPE TOWN · TERENE YA BLUE',
        hero_h1: 'Bogela Leeto',
        hero_h1_sub: 'Le Bula.',
        hero_desc: 'TrackTales e latela tsela ya terene go tloga Highveld go ya lewatleng la Atlantic.',
        stops_tag: 'BOHWA BJA TERENE AFRIKA BORWA · PRETORIA GO YA CAPE TOWN',
        stops_title: 'Diteishene tša Tsela',
        stops_desc: 'Leeto le latela diteishene tša histori, dithaba le naga ya Karoo tseleng ya 1,600 km.'
      },
      ts: {
        hero_tag: 'NDLELA YA PRETORIA KUYA CAPE TOWN · TERENE YA BLUE',
        hero_h1: 'Languta Riendzo',
        hero_h1_sub: 'Ri Pfuleka.',
        hero_desc: 'TrackTales yi landzela ndlela ya xitimela ku suka Highveld ku ya lwandle ra Atlantic.',
        stops_tag: 'NDHAVUKO WA XITIMELA XA AFRIKA-DZONGA · PRETORIA KUYA CAPE TOWN',
        stops_title: 'Switichi swa Ndlela',
        stops_desc: 'Riendzo leri hanyaka ri landzela switichi swa khale, tintshava ni ndhawu ya Karoo eka ndlela ya 1,600 km.'
      },
      ss: {
        hero_tag: 'UMGCA WE-PRETORIA KUYA ECAPE TOWN · SITIMELA LESILUHLAZA',
        hero_h1: 'Buka Luhambo',
        hero_h1_sub: 'Luvuleka.',
        hero_desc: 'I-TrackTales ilandzela indlela yesitimela isuka eHighveld iye e-Atlantic.',
        stops_tag: 'LIFA LEMAGUGU ESITIMELA ENINGIZIMU AFRIKA · PRETORIA KUYA ECAPE TOWN',
        stops_title: 'Titeshi Temgca',
        stops_desc: 'Luhambo lolulandzela titeshi temlandvo, tindlela tetintsaba nendzawo yaseKaroo emgceni lo-1,600 km.'
      },
      ve: {
        hero_tag: 'NDILA YA PRETORIA U YA CAPE TOWN · TSHITIMELA TSHITSHU',
        hero_h1: 'Lavhelesa Lwendo',
        hero_h1_sub: 'Lu A Vhea.',
        hero_desc: 'TrackTales i tevhela ndila ya tshitimela u bva Highveld u ya Atlantic.',
        stops_tag: 'VHUṰALI HA ZWITSHIMELA AFRIKA TSHIPEMBE · PRETORIA U YA CAPE TOWN',
        stops_title: 'Zwiteshi zwa Ndila',
        stops_desc: 'Lwendo lu tevhela zwiteshi zwa kale, thavha na fhethu ha Karoo kha ndila ya 1,600 km.'
      },
      nr: {
        hero_tag: 'INDLELA YEPRETORIA EYA ECAPE TOWN · ISITIMELA ESILUHLAZA',
        hero_h1: 'Bukela Uhambo',
        hero_h1_sub: 'Luyavuleka.',
        hero_desc: 'I-TrackTales ilandela indlela yesitimela ukusuka eHighveld ukuya e-Atlantic.',
        stops_tag: 'ILIFA LEZIMOTO ZESITIMELA E-AFRIKA ESINGEZANSI · PRETORIA KUYA ECAPE TOWN',
        stops_title: 'Izitishi Zendlela',
        stops_desc: 'Uhambo olulandela izitishi zomlando, izintaba nendawo yaseKaroo endleleni engamakhilomitha ayi-1,600.'
      }
    };

    const SPEECH_LANGUAGES = {
      en: 'en-ZA', zu: 'zu-ZA', xh: 'xh-ZA', af: 'af-ZA', st: 'st-ZA',
      tn: 'tn-ZA', nso: 'nso-ZA', ts: 'ts-ZA', ss: 'ss-ZA', ve: 've-ZA', nr: 'nr-ZA'
    };

    window.TrackTalesGetSpeechLanguage = () => SPEECH_LANGUAGES[window.TrackTalesLanguageCode || 'en'] || 'en-ZA';

    function applyLanguage(code) {
      const dict = TRANSLATIONS[code] || TRANSLATIONS.en;
      
      const heroTag = document.getElementById('hero-category-tag');
      const heroDesc = document.getElementById('hero-train-description');
      const stopsTag = document.getElementById('stops-header-corridor-tag');
      const stopsTitle = document.getElementById('stops-heading-title');
      const stopsDesc = document.getElementById('stops-header-subtitle');

      if (heroTag) heroTag.textContent = dict.hero_tag;
      if (heroDesc) heroDesc.textContent = dict.hero_desc;
      if (stopsTag) stopsTag.textContent = dict.stops_tag;
      if (stopsTitle) stopsTitle.innerHTML = dict.stops_title.split(' ')[0] + ' <span class="text-[#D99B26] italic font-serif">' + (dict.stops_title.split(' ')[1] || '') + '</span>';
      if (stopsDesc) stopsDesc.textContent = dict.stops_desc;

      window.TrackTalesLanguageCode = code;
      document.documentElement.lang = code;
      localStorage.setItem('tracktales_lang', code);
      if (window.TrackTalesAnnounce) {
        window.TrackTalesAnnounce(`Language switched to ${langSelect.options[langSelect.selectedIndex].text}`);
      }
    }

    langSelect.addEventListener('change', (e) => {
      applyLanguage(e.target.value);
    });

    const savedLang = localStorage.getItem('tracktales_lang');
    if (savedLang && TRANSLATIONS[savedLang]) {
      langSelect.value = savedLang;
      applyLanguage(savedLang);
    }
  }


  // ==========================================================================
  // 4. EMERGENCY HOTLINES & PASSENGER SOS ENGINE
  // ==========================================================================
  function setupEmergencyHotlines() {
    const modal = document.getElementById('emergencyModal');
    const openBtns = [document.getElementById('btn-open-sos'), document.getElementById('mobile-sos-btn')].filter(Boolean);
    const closeBtn = document.getElementById('emergency-modal-close');
    const genBeaconBtn = document.getElementById('btn-generate-sos-beacon');
    const beaconOutput = document.getElementById('sos-beacon-output');

    function openModal() {
      if (!modal) return;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      if (window.TrackTalesAnnounce) {
        window.TrackTalesAnnounce('Emergency Hotline Portal Opened. Direct numbers for SAPS Railway Police, Transnet Security, and SOS Beacon generator.');
      }
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    }));

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }

    if (genBeaconBtn && beaconOutput) {
      genBeaconBtn.addEventListener('click', () => {
        const coords = window.TrackTalesGetGPSLocation ? window.TrackTalesGetGPSLocation() : { lat: -28.7419, lng: 24.7719, name: 'Kimberley Corridor' };
        const now = new Date().toLocaleString('en-ZA');
        
        const beaconMsg = `[EMERGENCY SOS - TRACKTALES RAIL PASSENGER]\nTime: ${now}\nCoordinates: Lat ${coords.lat.toFixed(4)}, Lng ${coords.lng.toFixed(4)}\nNearest Station: ${coords.name}\nRoute: Pretoria to Cape Town 1,600 km Rail Corridor\nRequest: Urgent Security / Medical Dispatch needed.`;

        beaconOutput.textContent = beaconMsg;
        beaconOutput.classList.remove('hidden');

        navigator.clipboard.writeText(beaconMsg).then(() => {
          genBeaconBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-white"></i> SOS Message Copied!';
          if (window.lucide) lucide.createIcons();
          setTimeout(() => {
            genBeaconBtn.innerHTML = '<i data-lucide="send" class="w-3.5 h-3.5"></i> Copy GPS SOS Message';
            if (window.lucide) lucide.createIcons();
          }, 2500);
        });
      });
    }
  }


  // ==========================================================================
  // 5. RICH 3-MODE INTERACTIVE GAMES ENGINE (100% Free · No Subscription Required)
  // ==========================================================================
  function setupInteractiveGames() {
    // Mode Switcher Tabs
    const tabBtns = document.querySelectorAll('.game-tab-btn');
    const panelQuiz = document.getElementById('game-panel-quiz');
    const panelBingo = document.getElementById('game-panel-bingo');
    const panelPuzzle = document.getElementById('game-panel-puzzle');

    const totalScoreEl = document.getElementById('game-total-score');
    const completedCountEl = document.getElementById('game-completed-count');
    const streakCountEl = document.getElementById('game-streak-count');
    const resetMasterBtn = document.getElementById('btn-master-reset-games');

    let totalScore = parseInt(localStorage.getItem('tracktales_games_score') || '0', 10);
    let completedChallenges = parseInt(localStorage.getItem('tracktales_games_completed') || '0', 10);
    let streakCount = parseInt(localStorage.getItem('tracktales_games_streak') || '0', 10);

    function updateScoreboard() {
      if (totalScoreEl) totalScoreEl.textContent = totalScore;
      if (completedCountEl) completedCountEl.textContent = completedChallenges;
      if (streakCountEl) streakCountEl.textContent = streakCount;

      localStorage.setItem('tracktales_games_score', totalScore.toString());
      localStorage.setItem('tracktales_games_completed', completedChallenges.toString());
      localStorage.setItem('tracktales_games_streak', streakCount.toString());
    }

    updateScoreboard();

    // Tab Navigation
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-game-tab');
        tabBtns.forEach(b => {
          b.classList.remove('active', 'bg-[#C85028]', 'text-white', 'shadow-sm');
          b.classList.add('bg-transparent', 'text-[#111827]');
        });
        btn.classList.add('active', 'bg-[#C85028]', 'text-white', 'shadow-sm');
        btn.classList.remove('bg-transparent', 'text-[#111827]');

        if (panelQuiz) panelQuiz.classList.toggle('hidden', mode !== 'quiz');
        if (panelBingo) panelBingo.classList.toggle('hidden', mode !== 'bingo');
        if (panelPuzzle) panelPuzzle.classList.toggle('hidden', mode !== 'puzzle');

        if (window.TrackTalesAnnounce) {
          window.TrackTalesAnnounce(`Switched game mode to ${btn.innerText}`);
        }
      });
    });

    if (resetMasterBtn) {
      resetMasterBtn.addEventListener('click', () => {
        if (confirm('Reset all corridor game scores, bingo stamps, and puzzle sequences?')) {
          totalScore = 0;
          completedChallenges = 0;
          streakCount = 0;
          updateScoreboard();
          initBingoGrid();
          initPuzzleSequence();
          renderQuizQuestion(0);
        }
      });
    }

    // ------------------------------------------------------------------------
    // MODE 1: STOP-BY-STOP TRIVIA QUIZ & CUSTOM QUIZ BUILDER
    // ------------------------------------------------------------------------
    const STOP_QUIZZES = [
      {
        stop: 'Pretoria Terminus',
        badge: 'Stop 1: Pretoria Terminus',
        image: 'https://images.unsplash.com/photo-1577971132997-c10be9372519?auto=format&fit=crop&w=800&q=80',
        caption: 'Pretoria Jacaranda City & Victorian Rail Works',
        question: 'Which historic Pretoria terminus serves as the northern luxury hub for The Blue Train and Rovos Rail?',
        options: ['Capital Park Station', 'Park Station Johannesburg', 'Centurion Gautrain Hub', 'Mamelodi Depot'],
        correctIndex: 0,
        points: 100,
        explanation: 'Pretoria Capital Park was built in Victorian style and has welcomed discerning rail travelers traversing across southern Africa since the late 19th century.'
      },
      {
        stop: 'Kimberley Big Hole',
        badge: 'Stop 2: Kimberley Big Hole',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        caption: 'Kimberley Diamond Vaults & Historic Crater',
        question: 'How many diamond miners hand-dug the massive Kimberley Big Hole between 1871 and 1914?',
        options: ['Approximately 50,000 miners', 'Around 2,000 miners', 'Over 500,000 miners', 'Only 500 miners'],
        correctIndex: 0,
        points: 100,
        explanation: 'Between 1871 and 1914, roughly 50,000 miners excavated the Big Hole entirely by pick and shovel, yielding over 2,720 kilograms of diamonds.'
      },
      {
        stop: 'De Aar Junction',
        badge: 'Stop 3: De Aar Junction',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
        caption: 'De Aar Steam Crossroads of Southern Africa',
        question: 'Why did De Aar historically earn fame across southern Africa\'s rail network?',
        options: ['It is the second most important railway junction connecting inland lines', 'It was the site of the first South African gold strike', 'It hosted the 1994 presidential inauguration', 'It is the highest mountain peak in the Karoo'],
        correctIndex: 0,
        points: 100,
        explanation: 'De Aar features over 110 kilometers of railway track lines and 29 rail tracks in its central classification yard, earning its title as the steam crossroads of southern Africa.'
      },
      {
        stop: 'The Great Karoo',
        badge: 'Stop 4: The Great Karoo Desert',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        caption: 'Vast Great Karoo Desert Plains & Starry Skies',
        question: 'What distinctive acoustic engineering keeps The Blue Train passenger cabins whisper-quiet through the windy Karoo?',
        options: ['Gold-coated acoustic double glazing windows', 'Lead plates installed under carpets', 'Wooden sound baffles', 'Rubber locomotive wheels'],
        correctIndex: 0,
        points: 100,
        explanation: 'Gold dust is laminated inside the double-glazed panoramic windows to reflect desert solar heat and isolate external railway sounds for supreme comfort.'
      },
      {
        stop: 'Matjiesfontein Village',
        badge: 'Stop 5: Matjiesfontein Village',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        caption: 'Preserved 1890 Victorian Railway Village',
        question: 'Which legendary Victorian hotel in Matjiesfontein hosted Lord Randolph Churchill and Cecil John Rhodes?',
        options: ['The Lord Milner Hotel', 'The Mount Nelson Hotel', 'The Carlton Hotel', 'The Cape Marine Lodge'],
        correctIndex: 0,
        points: 100,
        explanation: 'The Lord Milner Hotel was completed in 1899 and served as a military hospital and social hub during the Anglo-Boer war.'
      },
      {
        stop: 'Cape Town Terminus',
        badge: 'Stop 6: Cape Town Terminus',
        image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
        caption: 'Cape Town Terminus in the shadow of Table Mountain',
        question: 'What is the total rail distance traversed from Pretoria to Cape Town on this legendary journey?',
        options: ['1,600 Kilometers', '850 Kilometers', '3,200 Kilometers', '500 Kilometers'],
        correctIndex: 0,
        points: 100,
        explanation: 'The full luxury rail corridor extends 1,600 kilometers across 4 provinces, taking 31 hours on The Blue Train and 3 days on Rovos Rail.'
      }
    ];

    let currentQuizIndex = 0;
    const quizStopBadge = document.getElementById('quiz-stop-badge');
    const quizProgressLabel = document.getElementById('quiz-progress-label');
    const quizPointsBadge = document.getElementById('quiz-points-badge');
    const quizImg = document.getElementById('quiz-image');
    const quizCaption = document.getElementById('quiz-image-caption');
    const quizTitle = document.getElementById('quiz-question-title');
    const quizOptionsGrid = document.getElementById('quiz-options-grid');
    const quizFeedbackBox = document.getElementById('quiz-feedback-box');
    const quizPrevBtn = document.getElementById('btn-quiz-prev');
    const quizNextBtn = document.getElementById('btn-quiz-next');
    const toggleCustomQuizBtn = document.getElementById('btn-toggle-custom-quiz');
    const customQuizWrapper = document.getElementById('custom-quiz-form-wrapper');
    const customQuizForm = document.getElementById('custom-quiz-form');
    const cancelCustomQuizBtn = document.getElementById('btn-cancel-custom-quiz');

    function renderQuizQuestion(index) {
      currentQuizIndex = index;
      const q = STOP_QUIZZES[currentQuizIndex];
      if (!q) return;

      if (quizStopBadge) quizStopBadge.textContent = q.badge;
      if (quizProgressLabel) quizProgressLabel.textContent = `Question ${currentQuizIndex + 1} of ${STOP_QUIZZES.length}`;
      if (quizPointsBadge) quizPointsBadge.textContent = `+${q.points} PTS`;
      if (quizImg) quizImg.src = q.image;
      if (quizCaption) quizCaption.textContent = q.caption;
      if (quizTitle) quizTitle.textContent = q.question;
      if (quizFeedbackBox) {
        quizFeedbackBox.classList.add('hidden');
        quizFeedbackBox.innerHTML = '';
      }

      if (quizOptionsGrid) {
        quizOptionsGrid.innerHTML = q.options.map((opt, i) => `
          <button type="button" data-quiz-opt="${i}" class="quiz-option-btn p-3.5 sm:p-4 rounded-2xl border-2 border-[#E7E2D8] bg-white hover:border-[#C85028]/60 hover:bg-[#FFF9F6] text-left transition-all flex items-center justify-between group cursor-pointer">
            <span class="text-xs sm:text-sm font-sans font-bold text-[#1C1917] group-hover:text-[#C85028]">${opt}</span>
            <span class="w-6 h-6 rounded-full border border-black/15 bg-black/5 group-hover:border-[#C85028] flex items-center justify-center text-[10px] font-mono font-bold text-[#78716C] group-hover:text-[#C85028]">
              ${String.fromCharCode(65 + i)}
            </span>
          </button>
        `).join('');

        quizOptionsGrid.querySelectorAll('.quiz-option-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const selectedIdx = parseInt(btn.getAttribute('data-quiz-opt'), 10);
            handleQuizAnswer(selectedIdx, q);
          });
        });
      }
    }

    function handleQuizAnswer(selectedIdx, q) {
      const isCorrect = selectedIdx === q.correctIndex;
      const optionBtns = quizOptionsGrid.querySelectorAll('.quiz-option-btn');
      
      optionBtns.forEach((b, idx) => {
        b.disabled = true;
        b.classList.remove('cursor-pointer');
        if (idx === q.correctIndex) {
          b.className = 'quiz-option-btn p-3.5 sm:p-4 rounded-2xl border-2 border-[#2E7D46] bg-[#2E7D46]/10 text-left transition-all flex items-center justify-between';
          b.innerHTML += '<i data-lucide="check" class="w-5 h-5 text-[#2E7D46]"></i>';
        } else if (idx === selectedIdx && !isCorrect) {
          b.className = 'quiz-option-btn p-3.5 sm:p-4 rounded-2xl border-2 border-red-500 bg-red-50 text-left transition-all flex items-center justify-between';
          b.innerHTML += '<i data-lucide="x" class="w-5 h-5 text-red-600"></i>';
        }
      });

      if (quizFeedbackBox) {
        quizFeedbackBox.classList.remove('hidden');
        if (isCorrect) {
          totalScore += q.points;
          completedChallenges += 1;
          streakCount += 1;
          updateScoreboard();

          quizFeedbackBox.className = 'p-4 rounded-xl border border-[#2E7D46]/30 bg-[#2E7D46]/10 text-[#2E7D46] text-xs font-sans text-left space-y-1';
          quizFeedbackBox.innerHTML = `
            <div class="font-bold flex items-center gap-1.5"><i data-lucide="check-circle" class="w-4 h-4"></i> Correct! +${q.points} Points Awarded.</div>
            <div>${q.explanation}</div>
          `;
          if (window.TrackTalesAnnounce) {
            window.TrackTalesAnnounce(`Correct answer! +${q.points} points. ${q.explanation}`);
          }
        } else {
          streakCount = 0;
          updateScoreboard();

          quizFeedbackBox.className = 'p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-sans text-left space-y-1';
          quizFeedbackBox.innerHTML = `
            <div class="font-bold flex items-center gap-1.5"><i data-lucide="alert-circle" class="w-4 h-4"></i> Not quite right!</div>
            <div>${q.explanation}</div>
          `;
          if (window.TrackTalesAnnounce) {
            window.TrackTalesAnnounce(`Incorrect. ${q.explanation}`);
          }
        }
        if (window.lucide) lucide.createIcons();
      }
    }

    if (quizPrevBtn) {
      quizPrevBtn.addEventListener('click', () => {
        const prev = (currentQuizIndex - 1 + STOP_QUIZZES.length) % STOP_QUIZZES.length;
        renderQuizQuestion(prev);
      });
    }

    if (quizNextBtn) {
      quizNextBtn.addEventListener('click', () => {
        const next = (currentQuizIndex + 1) % STOP_QUIZZES.length;
        renderQuizQuestion(next);
      });
    }

    if (toggleCustomQuizBtn && customQuizWrapper) {
      toggleCustomQuizBtn.addEventListener('click', () => {
        customQuizWrapper.classList.toggle('hidden');
      });
    }

    if (cancelCustomQuizBtn && customQuizWrapper) {
      cancelCustomQuizBtn.addEventListener('click', () => {
        customQuizWrapper.classList.add('hidden');
      });
    }

    if (customQuizForm) {
      customQuizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const stop = document.getElementById('custom-quiz-stop').value.trim();
        const pts = parseInt(document.getElementById('custom-quiz-pts').value, 10);
        const question = document.getElementById('custom-quiz-question').value.trim();
        const correct = document.getElementById('custom-quiz-correct').value.trim();
        const wrong1 = document.getElementById('custom-quiz-wrong1').value.trim();
        const wrong2 = document.getElementById('custom-quiz-wrong2').value.trim();
        const wrong3 = document.getElementById('custom-quiz-wrong3').value.trim();
        const explanation = document.getElementById('custom-quiz-explanation').value.trim() || 'Custom community question for the rail corridor.';

        const newQ = {
          stop,
          badge: `Custom Stop: ${stop}`,
          image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
          caption: `Community Corridor Trivia for ${stop}`,
          question,
          options: [correct, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5),
          correctIndex: 0,
          points: pts,
          explanation
        };

        // Locate correct index after shuffle
        newQ.correctIndex = newQ.options.indexOf(correct);

        STOP_QUIZZES.unshift(newQ);
        customQuizForm.reset();
        customQuizWrapper.classList.add('hidden');
        renderQuizQuestion(0);
        alert('Custom stop quiz added successfully! It is now loaded as Question 1.');
      });
    }

    // Render first quiz
    renderQuizQuestion(0);

    // ------------------------------------------------------------------------
    // MODE 2: MZANSI RAIL CORRIDOR BINGO (3x3 Interactive Card)
    // ------------------------------------------------------------------------
    const BINGO_ITEMS = [
      { id: 'b0', label: 'Pretoria Jacarandas', icon: 'tree-pine', desc: 'Purple blooms along Capital Park' },
      { id: 'b1', label: 'Kimberley Diamond Pit', icon: 'gem', desc: 'Hand-excavated Big Hole crater' },
      { id: 'b2', label: 'Karoo Windmill', icon: 'wind', desc: 'Classic farm windmill in the veld' },
      { id: 'b3', label: 'Great Karoo Desert Sky', icon: 'moon', desc: 'Vast starry desert nightscape' },
      { id: 'b4', label: 'Blue Locomotive', icon: 'train', desc: 'Flagship dual-electric engine (FREE)' },
      { id: 'b5', label: 'Lord Milner Hotel', icon: 'landmark', desc: 'Victorian turret in Matjiesfontein' },
      { id: 'b6', label: 'Hex River Vineyards', icon: 'grape', desc: 'Lush mountain wine valleys' },
      { id: 'b7', label: 'Springbok Wildlife Herd', icon: 'paw-print', desc: 'Mzansi national animal in the plains' },
      { id: 'b8', label: 'Table Mountain Peak', icon: 'mountain', desc: 'Flat-top coastal landmark in Cape Town' }
    ];

    let bingoState = [false, false, false, false, true, false, false, false, false]; // Center is marked by default
    let bingoWon = false;

    const bingoGridContainer = document.getElementById('bingo-grid-container');
    const bingoWinBanner = document.getElementById('bingo-win-banner');
    const bingoMarkedCountEl = document.getElementById('bingo-marked-count');
    const bingoStatusTextEl = document.getElementById('bingo-status-text');
    const btnResetBingo = document.getElementById('btn-reset-bingo');
    const btnShuffleBingo = document.getElementById('btn-shuffle-bingo');

    function initBingoGrid() {
      if (!bingoGridContainer) return;
      bingoWon = false;
      if (bingoWinBanner) bingoWinBanner.classList.add('hidden');

      bingoGridContainer.innerHTML = BINGO_ITEMS.map((item, idx) => {
        const isMarked = bingoState[idx];
        return `
          <button type="button" data-bingo-idx="${idx}" class="bingo-cell p-3 sm:p-4 rounded-2xl border-2 ${isMarked ? 'marked' : 'border-[#E7E2D8] bg-white hover:border-[#D99B26]/60'} flex flex-col items-center justify-center text-center transition-all cursor-pointer aspect-square shadow-sm">
            <div class="w-8 h-8 rounded-full ${isMarked ? 'bg-white/20 text-white' : 'bg-[#D99B26]/10 text-[#D99B26]'} flex items-center justify-center mb-1.5">
              <i data-lucide="${item.icon}" class="w-4 h-4"></i>
            </div>
            <strong class="text-[11px] sm:text-xs font-heading font-bold leading-tight ${isMarked ? 'text-white' : 'text-[#0A0C10]'}">${item.label}</strong>
            <span class="text-[9px] font-mono ${isMarked ? 'text-white/90' : 'text-[#78716C]'} mt-0.5">${idx === 4 ? 'FREE STAMP' : 'Tap to Stamp'}</span>
          </button>
        `;
      }).join('');

      if (window.lucide) lucide.createIcons();

      bingoGridContainer.querySelectorAll('.bingo-cell').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-bingo-idx'), 10);
          toggleBingoCell(idx);
        });
      });

      updateBingoStatus();
    }

    function toggleBingoCell(idx) {
      bingoState[idx] = !bingoState[idx];
      initBingoGrid();
      checkBingoWin();
    }

    function checkBingoWin() {
      // 8 Winning Lines: 3 Rows, 3 Cols, 2 Diagonals
      const WIN_LINES = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];

      const hasWon = WIN_LINES.some(line => line.every(idx => bingoState[idx]));

      if (hasWon && !bingoWon) {
        bingoWon = true;
        totalScore += 250;
        completedChallenges += 1;
        streakCount += 1;
        updateScoreboard();

        if (bingoWinBanner) bingoWinBanner.classList.remove('hidden');
        if (bingoStatusTextEl) bingoStatusTextEl.textContent = 'BINGO COMPLETED! +250 PTS';

        if (window.TrackTalesAnnounce) {
          window.TrackTalesAnnounce('Bingo! You completed 3 in a row across the rail corridor. 250 points awarded!');
        }
      }
    }

    function updateBingoStatus() {
      const count = bingoState.filter(Boolean).length;
      if (bingoMarkedCountEl) bingoMarkedCountEl.textContent = count;
      if (bingoStatusTextEl && !bingoWon) {
        bingoStatusTextEl.textContent = count > 0 ? `${count} Sights Stamped` : 'Tap cells to stamp';
      }
    }

    if (btnResetBingo) {
      btnResetBingo.addEventListener('click', () => {
        bingoState = [false, false, false, false, true, false, false, false, false];
        initBingoGrid();
      });
    }

    if (btnShuffleBingo) {
      btnShuffleBingo.addEventListener('click', () => {
        BINGO_ITEMS.sort(() => Math.random() - 0.5);
        bingoState = [false, false, false, false, true, false, false, false, false];
        initBingoGrid();
      });
    }

    initBingoGrid();

    // ------------------------------------------------------------------------
    // MODE 3: BUILD NEXT STOP VIA PUZZLE (Interactive Route Sequencer)
    // ------------------------------------------------------------------------
    const PUZZLE_MODES = [
      {
        id: 'route',
        title: 'Pretoria to Cape Town Route Assembler',
        desc: 'Place the 6 corridor stops in geographic order from Departure Hub (Pretoria) to Atlantic Terminus (Cape Town).',
        correctSequence: ['Pretoria', 'Kimberley', 'De Aar', 'Beaufort West', 'Matjiesfontein', 'Cape Town'],
        pool: ['Matjiesfontein', 'Kimberley', 'Cape Town', 'Pretoria', 'Beaufort West', 'De Aar'],
        triviaUnlock: 'Engineering Fact: The 1,600 km railway route crosses from high-altitude Highveld (1,300m above sea level) down through the Hex River Valley to sea level at Table Bay.'
      },
      {
        id: 'train_cars',
        title: 'Flagship Luxury Express Coach Assembler',
        desc: 'Assemble the 5 luxury train carriages in correct order from Engine to End Observation Deck.',
        correctSequence: ['Locomotive Engine', 'Luxury Sleeper Suite', 'Dining Saloon', 'Lounge Car', 'Observation Carriage'],
        pool: ['Observation Carriage', 'Locomotive Engine', 'Lounge Car', 'Luxury Sleeper Suite', 'Dining Saloon'],
        triviaUnlock: 'Engineering Fact: The Blue Train Observation Car features floor-to-ceiling glass panoramic windows and rear-facing lounge seating for viewing the Karoo desert sunset.'
      }
    ];

    let currentPuzzleModeIdx = 0;
    let puzzleUserSlots = [];
    let puzzleAvailablePieces = [];

    const puzzleModeLabel = document.getElementById('puzzle-mode-label');
    const puzzleModeSwitchBtn = document.getElementById('btn-puzzle-mode-switch');
    const puzzleObjTitle = document.getElementById('puzzle-objective-title');
    const puzzleObjDesc = document.getElementById('puzzle-objective-desc');
    const puzzleTargetSlots = document.getElementById('puzzle-target-slots');
    const puzzlePiecesPool = document.getElementById('puzzle-pieces-pool');
    const puzzleFeedbackBanner = document.getElementById('puzzle-feedback-banner');
    const btnResetPuzzle = document.getElementById('btn-reset-puzzle');
    const btnVerifyPuzzle = document.getElementById('btn-verify-puzzle');

    function initPuzzleSequence() {
      const mode = PUZZLE_MODES[currentPuzzleModeIdx];
      if (!mode) return;

      if (puzzleModeLabel) puzzleModeLabel.textContent = `Switch: ${mode.id === 'route' ? 'Coach Sequence' : 'Route Sequence'}`;
      if (puzzleObjTitle) puzzleObjTitle.textContent = mode.title;
      if (puzzleObjDesc) puzzleObjDesc.textContent = mode.desc;
      if (puzzleFeedbackBanner) {
        puzzleFeedbackBanner.classList.add('hidden');
        puzzleFeedbackBanner.innerHTML = '';
      }

      puzzleUserSlots = new Array(mode.correctSequence.length).fill(null);
      puzzleAvailablePieces = [...mode.pool];

      renderPuzzleUI();
    }

    function renderPuzzleUI() {
      const mode = PUZZLE_MODES[currentPuzzleModeIdx];

      // Render Target Slots
      if (puzzleTargetSlots) {
        puzzleTargetSlots.innerHTML = puzzleUserSlots.map((item, idx) => `
          <button type="button" data-slot-idx="${idx}" class="puzzle-slot p-3 rounded-2xl border-2 ${item ? 'border-[#4A52B0] bg-[#4A52B0]/10' : 'border-dashed border-black/20 bg-black/[0.02]'} flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[75px]">
            <span class="text-[9px] font-mono uppercase font-bold text-[#78716C] mb-1">Slot ${idx + 1}</span>
            <strong class="text-xs font-heading font-bold ${item ? 'text-[#4A52B0]' : 'text-[#A8A29E]'}">
              ${item || 'Drop Here'}
            </strong>
          </button>
        `).join('');

        puzzleTargetSlots.querySelectorAll('.puzzle-slot').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-slot-idx'), 10);
            const val = puzzleUserSlots[idx];
            if (val) {
              // Return to pool
              puzzleUserSlots[idx] = null;
              puzzleAvailablePieces.push(val);
              renderPuzzleUI();
            }
          });
        });
      }

      // Render Available Piece Pool
      if (puzzlePiecesPool) {
        puzzlePiecesPool.innerHTML = puzzleAvailablePieces.map((piece, idx) => `
          <button type="button" data-piece-idx="${idx}" class="puzzle-item px-4 py-2.5 rounded-xl border-2 border-[#D99B26] bg-white hover:bg-[#FFF9EE] text-[#0A0C10] font-mono text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer">
            <i data-lucide="plus" class="w-3.5 h-3.5 text-[#D99B26]"></i>
            <span>${piece}</span>
          </button>
        `).join('');

        if (window.lucide) lucide.createIcons();

        puzzlePiecesPool.querySelectorAll('.puzzle-item').forEach(btn => {
          btn.addEventListener('click', () => {
            const pieceIdx = parseInt(btn.getAttribute('data-piece-idx'), 10);
            const piece = puzzleAvailablePieces[pieceIdx];
            // Find first empty slot
            const firstEmpty = puzzleUserSlots.indexOf(null);
            if (firstEmpty !== -1) {
              puzzleUserSlots[firstEmpty] = piece;
              puzzleAvailablePieces.splice(pieceIdx, 1);
              renderPuzzleUI();
            }
          });
        });
      }
    }

    if (btnVerifyPuzzle) {
      btnVerifyPuzzle.addEventListener('click', () => {
        const mode = PUZZLE_MODES[currentPuzzleModeIdx];
        const isComplete = puzzleUserSlots.every(Boolean);

        if (!isComplete) {
          if (puzzleFeedbackBanner) {
            puzzleFeedbackBanner.className = 'mb-6 p-4 rounded-2xl border border-[#D99B26]/30 bg-[#FFF9EE] text-[#B87C10] text-xs font-sans text-left';
            puzzleFeedbackBanner.innerHTML = '<div class="font-bold flex items-center gap-1.5"><i data-lucide="info" class="w-4 h-4"></i> Incomplete Assembly</div>Please fill all sequence slots before verifying.';
            puzzleFeedbackBanner.classList.remove('hidden');
            if (window.lucide) lucide.createIcons();
          }
          return;
        }

        const isCorrect = puzzleUserSlots.every((val, idx) => val === mode.correctSequence[idx]);

        if (isCorrect) {
          totalScore += 150;
          completedChallenges += 1;
          streakCount += 1;
          updateScoreboard();

          if (puzzleFeedbackBanner) {
            puzzleFeedbackBanner.className = 'mb-6 p-4 rounded-2xl border border-[#2E7D46]/40 bg-[#2E7D46]/10 text-[#2E7D46] text-xs font-sans text-left space-y-1.5';
            puzzleFeedbackBanner.innerHTML = `
              <div class="font-bold text-sm flex items-center gap-1.5"><i data-lucide="check-circle" class="w-4 h-4"></i> Perfect Assembly! +150 Points Awarded.</div>
              <div>${mode.triviaUnlock}</div>
            `;
            puzzleFeedbackBanner.classList.remove('hidden');
            if (window.lucide) lucide.createIcons();
          }

          if (window.TrackTalesAnnounce) {
            window.TrackTalesAnnounce(`Correctly assembled! ${mode.triviaUnlock}`);
          }
        } else {
          streakCount = 0;
          updateScoreboard();

          if (puzzleFeedbackBanner) {
            puzzleFeedbackBanner.className = 'mb-6 p-4 rounded-2xl border border-red-200 bg-red-50 text-red-700 text-xs font-sans text-left space-y-1';
            puzzleFeedbackBanner.innerHTML = `
              <div class="font-bold flex items-center gap-1.5"><i data-lucide="alert-circle" class="w-4 h-4"></i> Incorrect Sequence</div>
              <div>Some pieces are out of geographical order. Tap a placed slot to return it to the piece pool and try again!</div>
            `;
            puzzleFeedbackBanner.classList.remove('hidden');
            if (window.lucide) lucide.createIcons();
          }
        }
      });
    }

    if (btnResetPuzzle) {
      btnResetPuzzle.addEventListener('click', initPuzzleSequence);
    }

    if (puzzleModeSwitchBtn) {
      puzzleModeSwitchBtn.addEventListener('click', () => {
        currentPuzzleModeIdx = (currentPuzzleModeIdx + 1) % PUZZLE_MODES.length;
        initPuzzleSequence();
      });
    }

    initPuzzleSequence();
  }

  // --- Initialize All Features on Load ---
  try { setupMobileMenu(); } catch (e) { console.error(e); }
  try { setupNavHubPanel(); } catch (e) { console.error(e); }
  try { setupHeroVideoControls(); } catch (e) { console.error(e); }
  try { setupRoutePreviewModal(); } catch (e) { console.error(e); }
  try { setupMotionEntranceAnimations(); } catch (e) { console.error(e); }
  try { setup3DCanvasGlobe(); } catch (e) { console.error(e); }
  try { setupStoryModal(); } catch (e) { console.error(e); }
  try { setupCorridorStops(); } catch (e) { console.error(e); }
  try { setupVoiceJournal(); } catch (e) { console.error(e); }
  try { setupGPSTracker(); } catch (e) { console.error(e); }
  try { setupAccessibilityMode(); } catch (e) { console.error(e); }
  try { setupMultiLanguage(); } catch (e) { console.error(e); }
  try { setupEmergencyHotlines(); } catch (e) { console.error(e); }
  try { setupInteractiveGames(); } catch (e) { console.error(e); }

})();




