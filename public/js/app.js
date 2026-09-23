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

  // --- Multilingual Story Translations Engine (16 Supported Languages) ---
  const STORY_TRANSLATIONS = {
    'story-1': {
      zu: {
        title: "Umzila Wegolide: Indlela Amadayimane Negolide Abakha Ngayo Isitimela",
        author: "Inhlangano Yemlando Yezitimela",
        summary: "Ngawo-1870, ukutholakala kwamadayimane e-Kimberley kwaqala umncintiswano wezobunjiniyela ngaphesheya kwehlane lase-Karoo.",
        content: "Phambi kokuba izitimela zeze e-Kimberley ngo-1885, uhambo luphuma e-Kapa lwathatha amaviki amaningi ngezinqola zezinkomo. Ukufika kwesitimela kwaguqula iNingizimu Afrika ngezobunjiniyela ze-Hex River Pass ezambiwa ngesandla emawalandi wedwala ukuze imishini esindayo ifike emayini."
      },
      xh: {
        title: "Umzila Wegolide: Indlela Iteku Negolide Ezakha Ngayo Uloliwe",
        author: "Umbutho Wembane Yololiwe",
        summary: "Ngosuku lwe-1870, ukufunyanwa kwezinto zexabiso eKimberley kwaza nenkqubo entsha kanjineli kulo lonke ilizwe laseKaroo.",
        content: "Phesheya kohambo lokufika kwezo loliwe eKimberley ngo-1885, indlela yaseKapa yayithatha iiveki ezininzi ngeenqwelo zeenkomo. Ukufika kweloliwe kutshintshe uMzantsi Afrika kakhulu kunye neendledlana zaseHex River Pass."
      },
      af: {
        title: "Die Goue Spoor: Hoe Diamante & Goud Suid-Afrika se Spoorweë Gebou Het",
        author: "Spoorwegerfenisstigting",
        summary: "In die 1870's het die ontdekking van diamante in Kimberley 'n dringende ingenieursresies oor die Karoo ontketen.",
        content: "Voordat stoomlokomotiewe Kimberley in 1885 bereik het, het reis vanaf Kaapstad weke met ossewaens oor die Karoo geneem. Die koms van die ysterperd het Suid-Afrika ingrypend verander. Ingenieurswonders soos die Hexrivierpas het swaar masjinerie na die myne gebring."
      },
      st: {
        title: "Tsela ya Gauta: Ka moo Ditaemane le Gauta di Ahileng ka teng Seporo",
        author: "Lefapha la Nalane ya Diterene",
        summary: "Lilemong tsa bo-1870, ho sibolloa ha ditaemane e Kimberley ho ile hoa simolla lebelo la boenjinihere lehoatateng la Karoo.",
        content: "Pele diterene tsa mouoane di fihla Kimberley ka 1885, leeto ho tloha Cape Town le ne le nka libeke tse ngata ka dikariki tsa dikgomo. Ho fihla ha terene ho ile hoa fetola Afrika Borwa le litsela tsa Hex River Pass."
      },
      tn: {
        title: "Tsela ya Gauta: Ka fa Ditaemane le Gauta di Agileng ka teng Seporo",
        author: "Mosekaseki wa Boswa jwa Seporo",
        summary: "Mo dingwageng tsa bo-1870, go bonwa ga ditaemane kwa Kimberley go ne ga simolola kgaisano ya boenjinihere mo nageng ya Karoo.",
        content: "Pele diterene di goroga kwa Kimberley ka 1885, loeto go tswa Cape Town lo ne lo tsaya dibeke ka dikoloi tsa dikgomo. Terene e ne ya fetola Afrika Borwa fela thata."
      },
      nso: {
        title: "Tsela ya Gauta: Ka moo Ditaemane le Gauta di Agilego ka gona Terene",
        author: "Mokgatlo wa Bohwa bja Terene",
        summary: "Leminageng ya bo-1870, go hwetswa ga ditaemane lehella la Kimberley go thomile lebelo la boenjinihere lehamong la Karoo.",
        content: "Pele diterene di fihla Kimberley ka 1885, leeto go tloga Cape Town le ne le tsea dibeke tše ntši. Terene e feditše ya fetola Afrika Borwa."
      },
      ts: {
        title: "Ndlela ya Nsuku: Ndlela leyi Tiyimane ni Nsuku swi Akeke ha yona Xitimela",
        author: "Vhuvi Byi wa Khale bya Switimela",
        summary: "Eka malembe ya bo-1870, ku kumiwa ka tiyimane eKimberley swi sungule phikizano ya vuenjhiniyera eka mananga ya Karoo.",
        content: "Loko xitimela xi nga se fika eKimberley hi 1885, riendzo ku suka eCape Town a ri teka mavhiki yo tala hi tigolonyi ta tihomu. Ku fika ka xitimela swi cincile Afrika-Dzonga."
      },
      ss: {
        title: "Umgboco Welegolide: Indlela Emadayimane Neligolide Latakha Ngayo Isitimela",
        author: "Inhlangano Yemlandvo Wesitimela",
        summary: "Nga-1870, kutfolakala kwemadayimane eKimberley kwacala umncintiswano webunjiniyela ehalaneni laseKaroo.",
        content: "Ngembi kwekutsi titimela tifike eKimberley nga-1885, luhambo lolusuka eCape Town belutsatsa emaviki lamanyenti. Kufika kwesitimela kwagucula Ningizimu Afrika."
      },
      ve: {
        title: "Ndila ya Musuku: Ka mvelele ya Dzaimane na Musuku zwo fhataho Tshitimela",
        author: "Khoro ya Vhufa ha Zwitimela",
        summary: "Kha minwaha ya 1870, u wanala ha dzaimane Kimberley zwo thoma phikizano ya vhuinjiniere lundani lwa Karoo.",
        content: "Musi zwitimela zvisi athu u swika Kimberley nga 1885, lwendo u bva Cape Town lwo dzhia dzivhege dzinzhi. U swika ha tshitimela zwo shandukisa Afrika Tshipembe."
      },
      nr: {
        title: "Indlela Yegolide: Indlela Amadayimane Negolide Abakha Ngayo Isitimela",
        author: "Isebe LemiBhalo YeZitimela",
        summary: "Ngeminyaka yo-1870, ukutholakala kwamadayimane e-Kimberley kwathoma umphikiswano wezobunjiniyela e-Karoo.",
        content: "Ngaphambi kobana izitimela zifike e-Kimberley ngo-1885, uhambo olusuka e-Cape Town beluthatha amaviki amanengi. Ukufika kwesitimela kwatjhugulula i-Afrika Esingezansi."
      },
      de: {
        title: "Die goldene Spur: Wie Diamanten & Gold Südafrikas Eisenbahn bauten",
        author: "Eisenbahnerbe-Stiftung",
        summary: "In den 1870er Jahren löste der Fund von Diamanten in Kimberley ein technisches Wettrüsten in der Karoo-Wüste aus.",
        content: "Bevor 1885 die ersten Dampflokomotiven Kimberley erreichten, dauerte die Reise von Kapstadt mit dem Ochsenwagen Wochen durch die glühende Karoo. Das Eintreffen der Eisenbahn verwandelte Südafrika. Ingenieurswunder wie der Hex-River-Pass ermöglichten den Transport schwerer Maschinen zu den Minen."
      },
      fr: {
        title: "La voie dorée : Comment les diamants et l'or ont bâti le chemin de fer d'Afrique du Sud",
        author: "Fondation du patrimoine ferroviaire",
        summary: "Dans les années 1870, la découverte de diamants à Kimberley a déclenché une course d'ingénierie à travers le désert du Karoo.",
        content: "Avant l'arrivée de la vapeur à Kimberley en 1885, le voyage depuis Le Cap prenait des semaines en chariot à bœufs. L'arrivée du cheval de fer a transformé l'Afrique du Sud. Des prouesses comme le col de la Hex River ont permis aux machines lourdes d'atteindre les mines."
      },
      nl: {
        title: "Het Gouden Spoor: Hoe diamanten & goud de spoorwegen van Zuid-Afrika bouwden",
        author: "Spoorwegerfgoed Stichting",
        summary: "In de jaren 1870 ontketende de vondst van diamanten in Kimberley een ingenieuse strijd door de Karoo-woestijn.",
        content: "Voordat stoomtreinen Kimberley in 1885 bereikten, duurde de reis vanuit Kaapstad weken met de ossewa. De komst van het ijzeren paard veranderde Zuid-Afrika voorgoed. Ingenieurswonderen zoals de Hexrivierpas brachten zware machines naar de mijnen."
      },
      es: {
        title: "La Vía Dorada: Cómo los diamantes y el oro construyeron el ferrocarril de Sudáfrica",
        author: "Fundación del Patrimonio Ferroviario",
        summary: "En la década de 1870, el descubrimiento de diamantes en Kimberley desató una carrera de ingeniería en el desierto del Karoo.",
        content: "Antes de que la locomotora llegara a Kimberley en 1885, viajar desde Ciudad del Cabo requería semanas en carro de bueyes. La llegada del tren de hierro transformó a Sudáfrica. Hazañas como el paso del río Hex permitieron trasladar maquinaria pesada a las minas."
      },
      it: {
        title: "La Via Dorata: Come diamanti e oro hanno costruito la ferrovia del Sudafrica",
        author: "Fondazione Patrimonio Ferroviario",
        summary: "Negli anni 1870, la scoperta di diamanti a Kimberley scatenò una corsa ingegneristica attraverso il deserto del Karoo.",
        content: "Prima che le locomotive a vapore raggiungessero Kimberley nel 1885, il viaggio da Città del Capo richiedeva settimane in carro a buoi. L'arrivo del cavallo di ferro trasformò il Sudafrica."
      },
      pt: {
        title: "Trilho de Ouro: Como diamantes e ouro construíram a ferrovia da África do Sul",
        author: "Fundação do Patrimônio Ferroviário",
        summary: "Na década de 1870, a descoberta de diamantes em Kimberley desencadeou uma corrida de engenharia pelo deserto do Karoo.",
        content: "Antes de as locomotivas chegarem a Kimberley em 1885, a viagem a partir da Cidade do Cabo levava semanas em carros de bois. A chegada do cavalo de ferro transformou a África do Sul."
      },
      zh: {
        title: "黄金轨道：钻石与黄金如何塑造南非铁路",
        author: "铁路历史遗产基金会",
        summary: "1870年代，金伯利钻石的发现引发了一场穿越卡鲁沙漠的重大工程竞赛。",
        content: "在1885年蒸汽机车抵达金伯利之前，从开普敦出发需要乘坐数周的牛车穿越酷热的卡鲁地区。钢铁战马的到来彻底改变了南非，像海克斯河隘口这样的工程奇迹使得重型机械得以运抵矿区。"
      },
      ja: {
        title: "黄金の線路：ダイヤモンドと金が築いた南アフリカ鉄道",
        author: "鉄道歴史遺産トラスト",
        summary: "1870年代、キンバリーでのダイヤモンド発見がカルー砂漠を越える大規模な鉄道建設競走を引き起こしました。",
        content: "1885年に蒸気機関車がキンバリーに到達する前、ケープタウンからの旅は牛車で数週間を要しました。鉄の馬の到来は南アフリカを一変させ、ヘックス川峠のような建築の奇跡が鉱山へ重型機械を運び込みました。"
      },
      ko: {
        title: "황금의 선로: 다이아몬드와 금이 세운 남아프리카 철도",
        author: "철도 역사 유산 재단",
        summary: "1870년대 킴벌리에서 다이아몬드가 발견되면서 카루 사막을 관통하는 철도 엔지니어링 경주가 시작되었습니다.",
        content: "1885년 증기 기관차가 킴벌리에 도착하기 전에는 케이프타운에서 우마차로 수주일에 걸쳐 이동해야 했습니다. 철마의 도입은 남아프리카를 근본적으로 바꾸어 놓았습니다."
      },
      hi: {
        title: "द गोल्डन ट्रैक: कैसे हीरे और सोने ने दक्षिण अफ्रीका के रेलवे का निर्माण किया",
        author: "रेल इतिहास विरासत ट्रस्ट",
        summary: "1870 के दशक में, किम्बरली में हीरों की खोज ने कारू रेगिस्तान में एक इंजीनियरिंग दौड़ शुरू की।",
        content: "1885 में किम्बरली तक भाप इंजनों के पहुँचने से पहले, केप टाउन से यात्रा में हफ़्तों बैलगाड़ी का सफ़र लगता था। लोहे के घोड़े के आगमन ने दक्षिण अफ्रीका को बदल दिया।"
      },
      ru: {
        title: "Золотой путь: Как алмазы и золото построили железные дороги ЮАР",
        author: "Фонд железнодорожного наследия",
        summary: "В 1870-х годах открытие алмазов в Кимберли вызвало настоящую инженерную гонку через пустыню Кару.",
        content: "До того как паровозы достигли Кимберли в 1885 году, путешествие из Кейптауна занимало недели на волах. Появление железной дороги навсегда изменило Южную Африку."
      },
      ar: {
        title: "المسار الذهبي: كيف بنى الألماس والذهب سكك حديد جنوب أفريقيا",
        author: "مؤسسة تراث تاريخ السكك الحديدية",
        summary: "في سبعينيات القرن التاسع عشر، أدى اكتشاف الألماس في كيمبرلي إلى سباق هندسي عبر صحراء كارو.",
        content: "قبل وصول القاطرات البخارية إلى كيمبرلي عام 1885، كانت الرحلة من كيب تاون تستغرق أسابيع بواسطة عربات الثيران. أحدث وصول الحصان الحديدي تحولاً جذرياً في جنوب أفريقيا."
      }
    },
    'story-2': {
      zu: {
        title: "Umlando We-Blue Train: Iminyaka Engaphezu Kwema-75 Yezikhashana Zobukhosi",
        author: "Amalungelo e-TrackTales",
        summary: "Ekuqaleni yaziwa ngokuthi 'Union Limited' ngo-1923, isitimela sathola umbala waso oluhlaza sasemoyeni phakathi ne-World War II.",
        content: "Amakhosi, amadoda nabafazi abasezingeni eliphezulu bahambe ekhaphethini elide lase-Blue Train. Kusukela u-Nelson Mandela amukela izivakashi zakwamanye amazwe kuyo, isitimela sihlala singcwele sazamukeli."
      },
      xh: {
        title: "Ilifa le-Blue Train: Iminyaka engama-75+ Yothando Lwasemsebenzini",
        author: "Amagunya e-TrackTales",
        summary: "Ekuqaleni yabizwa ngokuba 'Union Limited' ngo-1923, itreni yafumana idyasi yayo ebluu eyaziwayo evekini yeWorld War II.",
        content: "Oukumkani, ookumkanikazi nabaphathi bee-ofisi babe kwikhaphethi ze-Blue Train. Ukusuka ku-Nelson Mandela osingatha abakhenkethi basemzini, le treni iseyindawo enobubele obuphezulu."
      },
      af: {
        title: "Die Blou Trein se Erfenis: 75+ Jaar van Presidensiële Romanse",
        author: "TrackTales Argiewe",
        summary: "Oorspronklik genoem die 'Union Limited' in 1923, het die trein sy ikoniese koningsblou kleur gedurende die Tweede Wêreldoorlog gekry.",
        content: "Konings, koninginne, staatsmanne en kultuurikone het op die diep mat van Die Blou Trein getree. Van Nelson Mandela wat buitelandse ampsdraers ontvang het tot Hollywood-sterre wat Karoo-sonsondergange aanskou het."
      },
      st: {
        title: "Lefa la Terene ya Blue: Dilemo tse fetang 75 tsa Borena",
        author: "Diphallo tsa TrackTales",
        summary: "E ne e bitsoa 'Union Limited' ka 1923, terene e ile ea fumana mebala e meputsoa ea borena nakong ea Ntoa ea II ea Lefatše.",
        content: "Marena, mafumahali le baetapele ba ile ba tsamaea likhapeteng tsa Terene ea Blue. Ho tloha ho Nelson Mandela ha a amogela baeti ba machaba, terene e ntse e le sebaka sa mabothobotho."
      },
      tn: {
        title: "Boswa jwa Terene ya Blue: Dingwaga di le 75+ tsa Borena",
        author: "Polokelo ya TrackTales",
        summary: "E bidiwa 'Union Limited' ka 1923, terene e ne ya tsaya mmala o moputswa wa borena mo Ntweng ya II ya Lefatse.",
        content: "Dikgosi le baetapele ba tsamaile mo dikhapeteng tsa Terene ya Blue. Go tswa ho Nelson Mandela go ya kwa baeting ba machaba."
      },
      nso: {
        title: "Bohwa bja Terene ya Blue: Mengwaga e fetago 75 ya Borena",
        author: "Bobolokelo bja TrackTales",
        summary: "E be e bitšwa 'Union Limited' ka 1923, terene e amogetše mmala o moputswa nakong ya Ntwa ya II ya Lefase.",
        content: "Marena le baetapele ba tsamaile godimo ga dikhapete tša Terene ya Blue."
      },
      ts: {
        title: "Ndhavuko wa Terene ya Blue: Malembe yo tlula 75 ya Vuhosi",
        author: "Vuhlayiselo bya TrackTales",
        summary: "Eka masungulo a ri 'Union Limited' hi 1923, xitimela xi kumile muvala wa wasi lowu vangamaka hi Nyimpi ya Vumbirhi ya Misava.",
        content: "Tihosi ni varhangeri va fambile eka makhaphethi ya Terene ya Blue."
      },
      ss: {
        title: "Lifa leSitimela lesiluhlaza: Iminyaka lengetulu kwe-75 yeBukhosi",
        author: "Imibhalo ye-TrackTales",
        summary: "Ekucaleni besibitwa ngekutsi 'Union Limited' ngo-1923, sitimela satfola umbala wesiluhlaza eNtweni yesiBili yeMhlaba.",
        content: "Emakhosi nebaholi behamba emakhaphetini eSitimela lesiLuhlaza."
      },
      ve: {
        title: "Vhufa ha Tshitimela Tshitshu: Minwaha ya u fhira 75 ya Vhuhosi",
        author: "Vhulungelo ha TrackTales",
        summary: "Tsho thoma u vhidzwa 'Union Limited' nga 1923, tshitimela tsho wana muvhala wa lutombo u fhiraho Nndwa ya vhuvhili ya Shango.",
        content: "Mahosi na vharangaphanda vho tshimbila kha khaphethi ya Tshitimela Tshitshu."
      },
      nr: {
        title: "Ilifa Lesitimela Esiluhlaza: Iminyaka Engaphezu Kwee-75 Yebukhosi",
        author: "Umsunguli we-TrackTales",
        summary: "Ekuqaleni sabizwa ngokobana 'Union Limited' ngo-1923, isitimela sahlobiswa ngombala oluhlaza okwesibhakabhaka eNtweni yesiBili yePasi.",
        content: "Amakhosi nabaphathi bahamba ekhaphethini lesitimela esiluhlaza."
      },
      de: {
        title: "Das Erbe des Blauen Zuges: 75+ Jahre präsidentielle Eleganz",
        author: "TrackTales Archiv",
        summary: "1923 als 'Union Limited' getauft, erhielt der Zug im Zweiten Weltkrieg seinen ikonischen blauen Anstrich.",
        content: "Könige, Staatsmänner und Kulturikonen wandelten auf den Teppichen des Blauen Zuges. Von Nelson Mandela bis hin zu Filmstars bleibt der Zug ein schwimmendes Heiligtum der 5-Sterne-Gastfreundschaft."
      },
      fr: {
        title: "L'héritage du Blue Train : Plus de 75 ans de romance présidentielle",
        author: "Archives TrackTales",
        summary: "Initialement nommé 'Union Limited' en 1923, le train a reçu sa couleur bleu roi pendant la Seconde Guerre mondiale.",
        content: "Rois, reines et chefs d'État ont foulé les tapis moelleux du Blue Train. De Nelson Mandela accueillant des dignitaires aux stars d'Hollywood admirant les couchers de soleil du Karoo."
      },
      nl: {
        title: "Het Erfgoed van The Blue Train: 75+ jaar koninklijke grandeur",
        author: "TrackTales Archieven",
        summary: "Oorspronkelijk 'Union Limited' genoemd in 1923, kreeg de trein zijn iconische blauwe kleur tijdens WOII.",
        content: "Koningen, koninginnen en staatslieden stapten op de tapijten van The Blue Train. Van Nelson Mandela tot Hollywood-sterren, de trein blijft een vliegend 5-sterren heiligdom."
      },
      es: {
        title: "El Legado del Tren Azul: Más de 75 años de elegancia presidencial",
        author: "Archivos TrackTales",
        summary: "Bautizado en 1923 como 'Union Limited', el tren adquirió su icónico color azul durante la Segunda Guerra Mundial.",
        content: "Reyes, reinas y mandatarios han recorrido los pasillos del Tren Azul. Desde Nelson Mandela recibiendo dignatarios hasta estrellas de Hollywood viendo atardeceres en el Karoo."
      },
      it: {
        title: "L'Eredità del Blue Train: Oltre 75 anni di eleganza presidenziale",
        author: "Archivi TrackTales",
        summary: "Nato nel 1923 come 'Union Limited', il treno acquistò il suo iconico colore blu durante la Seconda Guerra Mondiale.",
        content: "Re, regine e statisti hanno passeggiato sui tappeti del Blue Train. Da Nelson Mandela alle star di Hollywood, il treno rimane un santuario a 5 stelle."
      },
      pt: {
        title: "O Legado do Blue Train: Mais de 75 anos de elegância presidencial",
        author: "Arquivos TrackTales",
        summary: "Originalmente chamado 'Union Limited' em 1923, o trem adquiriu sua icônica cor azul durante a Segunda Guerra Mundial.",
        content: "Reis, rainhas e estadistas caminharam pelos tapetes do Blue Train. De Nelson Mandela a estrelas de Hollywood, o trem permanece um santuário de luxo."
      },
      zh: {
        title: "蓝色列车传奇：75年以上的总统级奢华典范",
        author: "TrackTales 档案馆",
        summary: "1923年最初被称为“联合限时号”，该列车在第二次世界大战期间披上了标志性的皇室蓝涂装。",
        content: "国王、王后、政要和文化巨擘都曾踏上蓝色列车的新厚地毯。从纳尔逊·曼德拉在此款待外国元首，到好莱坞巨星在此欣赏卡鲁夕阳，列车始终是五星级礼遇的移动圣殿。"
      },
      ja: {
        title: "ブルートレインの遺産：75年以上の大統領級エレガンス",
        author: "TrackTales アーカイブ",
        summary: "1923年に「ユニオン・リミテッド」として誕生し、第二次世界大戦中に象徴的なロイヤルブルーの塗装をまといました。",
        content: "国王、女王、政治家、文化人がブルートレインの絨毯を踏みしめてきました。ネルソン・マンデラが国賓を迎えた場所から、ハリウッドスターがカルーの夕日を眺める場所まで、今も5つ星の動くオアシスであり続けています。"
      },
      ko: {
        title: "블루 트레인의 유산: 75년 이상의 대통령급 럭셔리 여정",
        author: "TrackTales 아카이브",
        summary: "1923년 '유니온 리미티드'로 시작해 제2차 세계대전 중 특유의 로열 블루 외관을 갖추게 되었습니다.",
        content: "국왕, 여왕, 국가원수 및 문화계 인사들이 블루 트레인의 카페트를 거닐었습니다. 넬슨 만델라가 국빈을 맞이하던 순간부터 할리우드 스타들의 카루 일몰 감상까지, 최고의 5성급 안식처로 남아 있습니다."
      },
      hi: {
        title: "द ब्लू ट्रेन की विरासत: 75+ वर्षों का अध्यक्षीय लालित्य",
        author: "TrackTales अभिलेखागार",
        summary: "1923 में मूल रूप से 'यूनियन लिमिटेड' नाम दिया गया, ट्रेन ने द्वितीय विश्व युद्ध के दौरान अपना प्रतिष्ठित नीला रंग हासिल किया।",
        content: "राजाओं, रानियों और राजनेताओं ने द ब्लू ट्रेन के कालीनों पर कदम रखा है। नेल्सन मंडेला द्वारा विदेशी गणमान्य व्यक्तियों की मेजबानी करने से लेकर कारू के सूर्यास्त देखने वाले हॉलीवुड सितारों तक।"
      },
      ru: {
        title: "Наследие Blue Train: Более 75 лет президентского величия",
        author: "Архивы TrackTales",
        summary: "Первоначально названный 'Union Limited' в 1923 году, поезд получил свой фирменный синий цвет в годы Второй мировой войны.",
        content: "Короли, королевы и государственные деятели ступали по коврам поезда Blue Train. От Нельсона Манделы до голливудских звезд — поезд остается передвижным 5-звездочным оазисом."
      },
      ar: {
        title: "إرث القطار الأزرق: أكثر من 75 عاماً من الفخامة الرئاسية",
        author: "أرشيف TrackTales",
        summary: "سمي في البداية 'يونايتد ليمتد' عام 1923، وحصل القطار على طلاءه الأزرق الملكي الأيقوني خلال الحرب العالمية الثانية.",
        content: "مشى الملوك والملكات ورجال الدولة على سجادة القطار الأزرق الفاخرة. من استضافة نيلسون مانديلا لكبار الشخصيات إلى نجوم هوليوود الذين شاهدوا غروب الشمس في كارو."
      }
    },
    'story-3': {
      zu: {
        title: "U-Rohan Vos Nemlando Ye-Rovos Rail",
        author: "Iphephandaba Zezitimela e-Afrika",
        summary: "Indlela intshisekelo yendoda eyodwa yokuvuselela izitimela zakudala eyakha ngayo inkampani yezitimela zewaneli phambili emhlabeni.",
        content: "Ngo-1989, u-Rohan Vos wathenga izimoto zezitimela zakudala enombono wohambo lomndeni. Lowo msebenzi wakhula waba i-Rovos Rail ezibazisayo nezibani zethusi e-Pretoria."
      },
      xh: {
        title: "URohan Vos Nembali ye-Rovos Rail",
        author: "Ipepha le-Rail e-Afrika",
        summary: "Indlela uthando lomntu omnye lokulungisa iinjini ze-steam ezindala olwadala ngayo inkampani yotyelelo ngololiwe enobubele.",
        content: "Ngo-1989, uRohan Vos wathenga izitimela zakudala ngeliphupha lohambo lomsapho. Loo projekthi yaba yi-Rovos Rail ePretoria."
      },
      af: {
        title: "Rohan Vos & Die Legende van Rovos Rail",
        author: "Afrikaanse Spoorwegkoerant",
        summary: "Hoe een man se passie vir die restourasie van vintage stoomwaens die wêreld se mees opulente treinsafari-maatskappy geskep het.",
        content: "In 1989 het Rohan Vos vintage treinwaens gekoop met die droom van familiestoomreise. Daardie projek het ontwikkel in Rovos Rail."
      },
      st: {
        title: "Rohan Vos le Pale ea Rovos Rail",
        author: "Koranta ea Diterene tsa Afrika",
        summary: "Ka moo takatso ea monna a le mong ea ho nchafatsa diterene tsa khale e hlahisitseng khampani e kholo ea diterene ho la lefatše.",
        content: "Ka 1989, Rohan Vos o ile a reka likariki tsa khale tsa terene ho fihlela toro ea leeto le leapa. Morero oo oa hlahisa Rovos Rail."
      },
      tn: {
        title: "Rohan Vos le Pale ya Rovos Rail",
        author: "Kuranta ya Diterene tsa Afrika",
        summary: "Ka fa keletso ya monna a le mong ya go tsosa diterene tsa bogologolo e tlhodileng khamphani e kgolo ya diterene.",
        content: "Ka 1989, Rohan Vos o rekile dikariki tsa bogologolo mme ka moso ya nna Rovos Rail."
      },
      nso: {
        title: "Rohan Vos le Pale ya Rovos Rail",
        author: "Kuranta ya Terene ya Afrika",
        summary: "Ka moo thagafalo ya monna a tee ya go renoveta diterene tša kgale e hlotšego khampani e kgolo ya diterene.",
        content: "Ka 1989, Rohan Vos o rekile diterene tša kgale tša ba Rovos Rail."
      },
      ts: {
        title: "Rohan Vos ni Muxaka wa Rovos Rail",
        author: "Nhlanganelo ya Switimela ya Afrika",
        summary: "Ndlela leyi ku navela ka wanuna un'we eka ku pfuxeta switimela swa khale swi tumbuluxeke khamphani leyikulu ya switimela.",
        content: "Hi 1989, Rohan Vos u xavile switimela swa khale swi humesa Rovos Rail."
      },
      ss: {
        title: "Rohan Vos neMlandvo weRovos Rail",
        author: "Tindzaba teSitimela e-Afrika",
        summary: "Indlela inshisekelo yekuvuselela titimela takadzeni leyakha ngayo inkampani lekhulu ye-Rovos Rail.",
        content: "Ngo-1989, Rohan Vos watsenga titimela takadzeni mase kuba yi-Rovos Rail."
      },
      ve: {
        title: "Rohan Vos na Ngano ya Rovos Rail",
        author: "Gurannwenda ya Zwitimela u bva Afrika",
        summary: "Ka mvelele ya lufuno lwa munna muthihi lwa u vhuedzedza zwitimela zwa kale zwo fhataho khamphani khulwane ya Rovos Rail.",
        content: "Nga 1989, Rohan Vos o renga zwitimela zwa kale nahone zwa mbo vha Rovos Rail."
      },
      nr: {
        title: "URohan Vos Nomlando we-Rovos Rail",
        author: "Ikoranta yeZitimela e-Afrika",
        summary: "Indlela ikhanuko yomuntu munye yokuvuselela iinjini zakudala eyakha ngayo inkampani ye-Rovos Rail.",
        content: "Ngo-1989, u-Rohan Vos wathenga iinqola zakudala mase kwaba yi-Rovos Rail e-Pretoria."
      },
      de: {
        title: "Rohan Vos & Die Legende von Rovos Rail",
        author: "Afrikanische Eisenbahn-Zeitung",
        summary: "Wie die Leidenschaft eines Mannes für die Restaurierung alter Dampfzüge das luxuriöseste Zugsafari-Unternehmen erschuf.",
        content: "1989 kaufte Rohan Vos historische Zugwagons mit dem Traum von Familienreisen. Daraus wurde Rovos Rail. Heute restaurieren Handwerker in Pretoria Edwardianische Holzinterieurs und Messinglampen in Handarbeit."
      },
      fr: {
        title: "Rohan Vos et la légende de Rovos Rail",
        author: "Gazette ferroviaire africaine",
        summary: "Comment la passion d'un homme pour la restauration de wagons anciens a créé la compagnie de safaris ferroviaires la plus luxueuse au monde.",
        content: "En 1989, Rohan Vos a acheté des wagons anciens pour voyager en famille. Ce projet s'est transformé en Rovos Rail. Aujourd'hui, les artisans de Pretoria restaurent à la main les intérieurs en bois et les lampes en laiton."
      },
      nl: {
        title: "Rohan Vos & De Legende van Rovos Rail",
        author: "Afrikaanse Spoorwegkrant",
        summary: "Hoe de passie van één man voor het restaureren van stoomtreinen 's werelds meest luxueuze treinsafari-bedrijf creëerde.",
        content: "In 1989 kocht Rohan Vos historische rijtuigen voor familiereizen. Dat project groeide uit tot Rovos Rail. Tegenwoordig restaureren vaklieden in Pretoria edwardiaanse houten interieurs met de hand."
      },
      es: {
        title: "Rohan Vos y la leyenda de Rovos Rail",
        author: "Gaceta Ferroviaria Africana",
        summary: "Cómo la pasión de un hombre por restaurar vagones antiguos creó la empresa de safaris en tren más lujosa del mundo.",
        content: "En 1989, Rohan Vos compró vagones de época para viajes familiares. Ese proyecto se convirtió en Rovos Rail. Hoy en día, artesanos en Pretoria restauran a mano interiores de madera del periodo eduardiano y lámparas de latón."
      },
      it: {
        title: "Rohan Vos e la Leggenda di Rovos Rail",
        author: "Gazzetta Ferroviaria Africana",
        summary: "Come la passione di un uomo nel restaurare vecchie carrozze a vapore ha creato la società di safari in treno più lussuosa del mondo.",
        content: "Nel 1989, Rohan Vos acquistò carrozze d'epoca per viaggi di famiglia, dando vita a Rovos Rail. Oggi artigiani a Pretoria restaurano a mano interni in legno edwardiano e lampade in ottone."
      },
      pt: {
        title: "Rohan Vos e a Lenda do Rovos Rail",
        author: "Gazeta Ferroviária Africana",
        summary: "Como a paixão de um homem por restaurar locomotivas a vapor criou a empresa de safári de trem mais luxuosa do mundo.",
        content: "Em 1989, Rohan Vos comprou vagões antigos para viagens em família. Esse projeto tornou-se o Rovos Rail. Hoje, artesãos em Pretória restauram à mão interiores de madeira e lâmpadas de latão."
      },
      zh: {
        title: "罗汉·沃斯与洛沃斯铁路的传奇",
        author: "非洲铁路报",
        summary: "一个人对修复复古蒸汽火车的热情如何缔造了世界上最奢华的列车游猎公司。",
        content: "1989年，罗汉·沃斯购买了复古车厢，本想用于家庭旅行。这一项目最终发展成为著名的洛沃斯铁路。如今在比勒陀利亚，手工技师们精心修复1920年代爱德华时代的木质内饰与黄铜灯具。"
      },
      ja: {
        title: "ロハン・ボスとロボス・レールの伝説",
        author: "アフリカン・レイル・ガゼット",
        summary: "ヴィンテージ蒸気機関車の修復にかける一人の男の情熱が、世界最高峰の豪華列車サファリ企業を生み出しました。",
        content: "1989年、ロハン・ボスは家族旅行の夢を抱いて古びた客車を購入し、それがロボス・レールへと結実しました。現在プレトリアの職人達が1920年代のエドワーディアン調の木造内装と真鍮ランプを丁寧に手作業で復元しています。"
      },
      ko: {
        title: "로한 보스와 로보스 레일의 전설",
        author: "아프리카 철도 저널",
        summary: "클래식 증기 기관차를 복원하려는 한 남자의 열정이 세계에서 가장 호화로운 철도 사파리 회사를 만들었습니다.",
        content: "1989년 로한 보스는 가족 여행을 위해 오랜 객차를 매입하였고, 이 프로젝트는 로보스 레일로 발전했습니다. 오늘날 프레토리아의 장인들은 1920년대 에드워드 양식의 목재 인테리어와 황동 램프를 정성껏 수작업으로 복원합니다."
      },
      hi: {
        title: "रोहन वोस और रोवोस रेल की किंवदंती",
        author: "अफ्रीकी रेल गजट",
        summary: "पुराने भाप इंजनों को बहाल करने के एक व्यक्ति के जुनून ने दुनिया की सबसे शानदार ट्रेन सफारी कंपनी कैसे बनाई।",
        content: "1989 में, रोहन वोस ने पारिवारिक यात्राओं के सपने के साथ पुराने डिब्बे खरीदे। वह परियोजना रोवोस रेल में बदल गई। आज प्रिटोरिया में कारीगर सागौन के लकड़ी के अंदरूनी हिस्सों और पीतल के लैंपों को हाथ से बहाल करते हैं।"
      },
      ru: {
        title: "Рохан Вос и легенда Rovos Rail",
        author: "Африканская железнодорожная газета",
        summary: "Как страсть одного человека к реставрации старинных паровозов создала самую роскошную компанию железнодорожных сафари в мире.",
        content: "В 1989 году Рохан Вос купил старинные вагоны для семейных поездок, и этот проект вырос в Rovos Rail. Сегодня мастера в Претории вручную восстанавливают эдвардианские деревянные интерьеры и латунные лампы."
      },
      ar: {
        title: "روهان فوس وأسطورة روفوس ريل",
        author: "جريدة السكك الحديدية الأفريقية",
        summary: "كيف أن شغف رجل واحد بترميم القاطرات البخارية القديمة أنشأ أفخم شركة رحلات سفاري بالقطار في العالم.",
        content: "في عام 1989، اشترى روهان فوس عربات قطار قديمة بهدف الرحلات العائلية، وتطورت تلك الفكرة إلى روفوس ريل. واليوم يرمم الحرفيون في بريتوريا الديكورات الخشبية القديمة والمصابيح النحاسية يدوياً."
      }
    },
    'story-4': {
      zu: {
        title: "Ukudla Okuconsisa Amathe Ezitimeneni: Ukupheka Kwamapulani Asezingeni Eliphezulu",
        author: "Inhlangano Yezokudla Yase-Kapa",
        summary: "Ngaleyo ndlela amakhishi azitimeneni apheka inyama ye-Karoo lamb nokudla okumnandi ngenkathi isitimela sihamba nge-90 km/h.",
        content: "Abapheki kuyo i-Blue Train balungisa ukudla okusha ngenkathi kuphanyazwa. Njalo kusihlwa, abagibeli bagqoka okusezingeni eliphezulu ukudla inyama yewundlu lase-Karoo neminye imino."
      },
      xh: {
        title: "Ukutya Okumangalisayo Ololiwe: Umpheki Osenyangweni",
        author: "Iphepha Lokuhlola Ukutya laseKapa",
        summary: "Kukhikhini zeloliwe apho kuphekwa khona inyama ye-Karoo lamb xa iloliwe ihamba nge-90 km/h.",
        content: "Abapheki be-Blue Train balungiselela ukutya okutsha xa itreni ihamba. Rhatya ngalinye abakhweli banxiba kakuhle ukutya ukutya okumnandi kakhulu."
      },
      af: {
        title: "Spysenyse op die Spoor: 5-Ster Kulinêre Meesterskap",
        author: "Kaapse Fynproewer Resensie",
        summary: "Binne die silwerdiens-kombuise wat Karoo-lam, Knysna-osters en bekroonde Kaapse wyne teen 90 km/h bedien.",
        content: "Sjefs aan boord van Die Blou Trein berei vars fynproewersgeregte in beweging voor. Elke aand trek passasiers formeel aan vir 'n silwerdiensbanket met Karoo-lam en fyn wyne."
      },
      st: {
        title: "Lijo tsa Mabothobotho Tereneng: Bonono ba ho Pheha ba 5-Star",
        author: "Tlhahlobo ea Lijo tsa Cape",
        summary: "Ka har'a likhitla tsa terene tse servang nama ea Karoo lamb le beine tsa Cape ka lebelo la 90 km/h.",
        content: "Baphehi ba Terene ea Blue ba pheha lijo tse ncha nakong ea leeto. Mantsiboea mang le mang baeti ba apara hantle bakeng sa lijo tsa vesebole."
      },
      tn: {
        title: "Dijo tsa Mabothobotho mo Tereneng: Go Apeha ga 5-Star",
        author: "Tshekatsheko ya Dijo tsa Cape",
        summary: "Mo nkung ya terene e e servang nama ya Karoo lamb le beine tsa Cape ka 90 km/h.",
        content: "Baapei mo Tereneng ya Blue ba apeha dijo tse di ncha mo loetong."
      },
      nso: {
        title: "Dijo tša Mabothobotho Tereneng: Bongaka bja ho Apeha bja 5-Star",
        author: "Tshekatsheko ya Dijo tsa Cape",
        summary: "Ka khitšhing ya terene ye e servago nama ya Karoo lamb le beine tsa Cape ka 90 km/h.",
        content: "Baapei ba Terene ya Blue ba apeha dijo tša mabothobotho nakong ya leeto."
      },
      ts: {
        title: "Swakudya swo Ziya eka Xitimela: Vutshila bya 5-Star bya ho Sweka",
        author: "Nxopaxopo wa Swakudya wa Cape",
        summary: "Endzeni ka khichi ya xitimela leyi phakulaka nyama ya Karoo lamb ni vhinyo ya Cape hi 90 km/h.",
        content: "Vasweki eka Terene ya Blue va sweka swakudya swo tsakisa hi nkarhi wa riendzo."
      },
      ss: {
        title: "Kudla lokumnandzi eSitimeleni: Vuciko be-5-Star Lekupheka",
        author: "Inhlolovo yeKudla yaseCape",
        summary: "Ekhatsi ekhishini lesitimela lelesevisa inyama yeKaroo lamb novelini yaseCape nge-90 km/h.",
        content: "Bapeki basesitimeleni lesiluhlaza bapheka kudla lokusha ngesikhatsi luhambo luhamba."
      },
      ve: {
        title: "Zwiliwa zwa Vhudi kha Tshitimela: Vhutsila ha 5-Star ha u Bika",
        author: "Tseduluso ya Zwiliwa ya Cape",
        summary: "Nga ngomu ha khitshi ya tshitimela ine ya nnea nama ya Karoo lamb na waini ya Cape nga 90 km/h.",
        content: "Vhabiki kha Tshitimela Tshitshu vha bika zwiliwa zwiswa musi tshitimela tshi tshi khou tshimbila."
      },
      nr: {
        title: "Ukudla Okunandi Esitimeleni: Ukupheka Kwephelo le-5-Star",
        author: "Ikoranta yoKudla yase-Cape",
        summary: "Ngaphakathi kwekhishi lesitimela elipheka inyama ye-Karoo lamb newayini yase-Cape nge-90 km/h.",
        content: "Abapheki beSitimela Esiluhlaza balungisa ukudla okutjha nakuhambwako."
      },
      de: {
        title: "Gastronomie auf Schienen: 5-Sterne Kulinaria",
        author: "Cape Epicure Review",
        summary: "Kulinarische Meisterwerke in der Silber-Gourmetküche bei 90 km/h mit Karoo-Lamm und Kap-Weinen.",
        content: "Die Köche an Bord des Blauen Zuges bereiten frische Gourmetgerichte während der Fahrt zu. Jeden Abend kleiden sich die Passagiere formell für ein Bankett mit Karoo-Lamm und erlesenen Weinen aus Stellenbosch."
      },
      fr: {
        title: "Gastronomie sur rails : Maîtrise culinaire 5 étoiles",
        author: "Cape Epicure Review",
        summary: "Dans les cuisines servant agneau du Karoo, huîtres de Knysna et grands crus du Cap à 90 km/h.",
        content: "Les chefs à bord du Blue Train préparent des mets raffinés en mouvement. Chaque soir, les passagers revêtent des tenues de soirée pour un festin au service d'argent."
      },
      nl: {
        title: "Culinaire hoogstandjes op de rails: 5-sterren gastronomie",
        author: "Cape Epicure Review",
        summary: "In de keukens die Karoo-lam, Knysna-oesters en topwijnen uit de Kaap serveren bij 90 km/u.",
        content: "De sjefs aan boord van The Blue Train bereiden verse gerechten in volle vaart. Elke avond kleden passagiers zich formeel voor een banket met Karoo-lam en fijne wijnen."
      },
      es: {
        title: "Gastronomía sobre rieles: Maestría culinaria de 5 estrellas",
        author: "Cape Epicure Review",
        summary: "En las cocinas que sirven cordero de Karoo, ostras de Knysna y vinos de alta gama a 90 km/h.",
        content: "Los chefs a bordo del Tren Azul preparan platos de alta cocina en movimiento. Cada noche, los pasajeros se visten de etiqueta para un banquete de servicio de plata."
      },
      it: {
        title: "Gastronomia su rotaie: Maestria culinaria a 5 stelle",
        author: "Cape Epicure Review",
        summary: "Nelle cucine di bordo che servono agnello del Karoo, ostriche di Knysna e pregiati vini del Capo a 90 km/h.",
        content: "Gli chef a bordo del Blue Train preparano raffinate prelibatezze in movimento. Ogni sera i passeggeri indossano abiti formali per un banchetto con servizio in argento."
      },
      pt: {
        title: "Gastronomia nos trilhos: Maestria culinária 5 estrelas",
        author: "Cape Epicure Review",
        summary: "Nas cozinhas que servem cordeiro do Karoo, ostras de Knysna e vinhos premiados a 90 km/h.",
        content: "Os chefs a bordo do Blue Train preparam pratos sofisticados em pleno movimento. Todas as noites, os passageiros vestem-se formalmente para um banquete."
      },
      zh: {
        title: "铁轨上的饕餮盛宴：五星级烹饪艺术",
        author: "开普美食评论",
        summary: "在以时速90公里行驶的列车银盘厨房内，享用卡鲁羊肉、克尼斯纳生蚝与获奖名酒。",
        content: "蓝色列车上的大厨在列车行驶中现场烹饪新鲜的高级料理。每天傍晚，乘客们身着正装享用银盘大餐，品味卡鲁嫩羊排与斯泰伦博斯风味佳酿。"
      },
      ja: {
        title: "線路上の美食：5つ星の料理芸術",
        author: "ケープ・エピキュア・レビュー",
        summary: "時速90kmで走る車内で、カルーラム、ナイズナ・オイスター、銘醸ワインを提供するシルバーサービスの厨房。",
        content: "ブルートレインのシェフ達は走行中に新鮮な極上料理を調理します。毎晩、乗客はフォーマルな装いに身を包み、カルーラムや選り好みのワインを堪能します。"
      },
      ko: {
        title: "레일 위의 미식: 5성급 파인 다이닝",
        author: "케이프 에피큐어 리뷰",
        summary: "시속 90km로 달리는 열차에서 카루 램, 나이즈나 굴, 최고급 케이프 와인을 선사하는 실버 서비스 주방.",
        content: "블루 트레인의 셰프들은 이동 중에 신선한 최고급 요리를 준비합니다. 매일 저녁 승객들은 드레스 코드를 갖추고 카루 램과 최고급 와인이 어우러진 실버 서비스 만찬에 참여합니다."
      },
      hi: {
        title: "पटरियों पर व्यंजन: 5-स्टार पाक कला",
        author: "केप एपिक्योर समीक्षा",
        summary: "90 किमी/घंटे की रफ्तार से कारू मेमने, नाइसना सीप और केप वाइन परोसने वाली रसोई के भीतर।",
        content: "द ब्लू ट्रेन के शेफ़ चलती ट्रेन में ताज़ा बेहतरीन व्यंजन तैयार करते हैं। हर शाम, यात्री चांदी की सेवा वाली दावत के लिए औपचारिक पोशाक पहनते हैं।"
      },
      ru: {
        title: "Гастрономия на рельсах: 5-звездочное кулинарное мастерство",
        author: "Обзор Cape Epicure",
        summary: "В кухнях поезда, подающих ягнятину Кару, устрицы Кнайсна и элитные вина Капского региона на скорости 90 км/ч.",
        content: "Шеф-повара на борту Blue Train готовят изысканные блюда прямо во время движения. Каждый вечер пассажиры надевают вечерние наряды для изысканного банкета."
      },
      ar: {
        title: "طهي فاخر على السكك الحديدية: فنون طهي 5 نجوم",
        author: "مجلة كيب إبيكيو",
        summary: "داخل مطابخ تقديم لحم ضأن كارو ومحار نايسنا ونبيذ الكيب الفاخر بسرعة 90 كم/ساعة.",
        content: "يطهو الطهاة على متن القطار الأزرق أطباقاً فاخرة طازجة أثناء حركة القطار. في كل مساء، يرتدي الركاب الملابس الرسمية لحضور مأدبة فاخرة."
      }
    },
    'story-5': {
      zu: {
        title: "Ishabhu lase-Capital Park: Ukunikeza Impilo Ezitimeneni Zakudala Ze-Steam",
        author: "Gazethi Yezitimela Zomlando",
        summary: "Indlela abasunguli bekhono e-Capital Park abavuselela ngayo izimoto zangomnyaka we-1920 nezitimela ze-steam.",
        content: "Ekhaya le-Rovos Rail e-Capital Park, e-Pretoria, abacwali abangaphezu kwe-100 bavuselela ama-fremu amapulangwe e-teak nokuhlanza izibani zethusi ngezitimela ze-Class 19D ne-25NC."
      },
      xh: {
        title: "I-Capital Park Workshop: Ukunika Ubomi kwi-Steam zakudala",
        author: "Ipepha le-Steam neLifa",
        summary: "Indlela abasebenzi eCapital Park abalungisa ngayo izitimela zakudala nezitimela ze-steam.",
        content: "Kwi-ofisi ye-Rovos Rail eCapital Park, ePretoria, abasebenzi abangaphezu kwe-100 balungisa iincango zethala nokucoca izibane zethusi kwi-steam ezindala."
      },
      af: {
        title: "Capital Park Werkswinkel: Nuwe Lewe vir Vintage Stoom",
        author: "Stoom & Erfenis Koerant",
        summary: "Hoe meesterambagslui by Capital Park 1920's Edwardiaanse waens en historiese stoomlokomotiewe restoureer.",
        content: "By Rovos Rail se hoofkwartier in Capital Park, Pretoria, restoureer meer as 100 ambagslui teakhoutvensterrame en poleer koperlampe vir Klas 19D en 25NC stoomlokomotiewe."
      },
      st: {
        title: "Wokshopo ea Capital Park: Ho Fana ka Bophelo ho Diterene tsa Khale",
        author: "Koranta ea Diterene le Lefa",
        summary: "Ka moo baahi ba Capital Park ba nchafatsang likariki tsa 1920 le diterene tsa mouoane ka teng.",
        content: "Ntlo-khōlō ea Rovos Rail e Capital Park, Pretoria, e na le basebetsi ba fetang 100 ba nchafatsang lehong le mabone a koporo bakeng sa diterene tsa khale."
      },
      tn: {
        title: "Wokshopo ya Capital Park: Go Fana ka Botshelo mo Ditereneng tsa Bogologolo",
        author: "Kuranta ya Diterene tsa Boswa",
        summary: "Ka fa batseki ba Capital Park ba ba nchafatsang diterene tsa 1920 tsa mouoane.",
        content: "Kwa ntlokgolo ya Rovos Rail kwa Capital Park, Pretoria, babereki ba feta 100 ba ba nchafatsang dikariki tsa bogologolo."
      },
      nso: {
        title: "Wokshopo ya Capital Park: Go Fana ka Bophelo Tereneng tša Kgale",
        author: "Kuranta ya Terene ya Bohwa",
        summary: "Ka moo baahi ba Capital Park ba renovetago diterene tša 1920 tša mouoane.",
        content: "Hedikwata ya Rovos Rail e Capital Park, Pretoria, e na le babereki ba fetago 100 ba renovetago lehung le mabone a koporo."
      },
      ts: {
        title: "Wokshopu ya Capital Park: Ku Nyika Vutomi eka Switimela swa Khale",
        author: "Muxaka wa Switimela swa Ndhavuko",
        summary: "Ndlela leyi vatshila eCapital Park va pfuxetaka switimela swa 1920 swa mpfhuka.",
        content: "Eka ntsindza wa Rovos Rail eCapital Park, Pretoria, vatshila vo tlula 100 va pfuxeta mhandzi ni timbone ta nsuku txa xitimela."
      },
      ss: {
        title: "I-Capital Park Workshop: Kuniye Bupilo eSitimeleni leba-Steam",
        author: "Indzaba yeSitimela neLifa",
        summary: "Indlela bentzi base-Capital Park lekuhlobisa titimela taka-1920 tema-steam.",
        content: "Ema-ofisini e-Rovos Rail eCapital Park, Pretoria, bentzi labangetulu kwa-100 bahlobisa titimela takadzeni tema-steam."
      },
      ve: {
        title: "Wokshopu ya Capital Park: U Nnea Vhutshilo kha Zwitimela zwa Kale",
        author: "Gurannwenda ya Zwitimela zwa Vhufa",
        summary: "Ka mvelele ya vhashumi Capital Park vha vhuedzedzaho zwitimela zwa 1920 zwa steam.",
        content: "Khuluwanesho ya Rovos Rail Capital Park, Pretoria, i na vhashumi vha fhiraho 100 vhane vha khou vhuedzedza zwitimela zwa steam."
      },
      nr: {
        title: "I-Workshop ye-Capital Park: Ukunikela Ipilweni kwiZitimela zakudala",
        author: "Ikoranta yeZitimela zaKudala",
        summary: "Indlela abasebenzi e-Capital Park abavuselela ngayo iinqola zabo-1920 neenzini ze-steam.",
        content: "Ekhaya le-Rovos Rail e-Capital Park, e-Pretoria, abasebenzi abangaphezu kwe-100 bavuselela iinqola zakudala neemfremu zomthi mase bahlobise neenzini ze-steam."
      },
      de: {
        title: "Werkstatt Capital Park: Neues Leben für historische Dampfloks",
        author: "Dampf & Erbe Zeitung",
        summary: "Wie Meisterhandwerker in Capital Park Wagons der 1920er Jahre und Dampflokomotiven restaurieren.",
        content: "Im Hauptquartier von Rovos Rail in Capital Park, Pretoria, restaurieren über 100 Handwerker Teakholzfenster und Messinglampen für historische Dampflokomotiven der Klasse 19D und 25NC."
      },
      fr: {
        title: "Atelier de Capital Park : Donner vie aux anciennes locomotives à vapeur",
        author: "Gazette Vapeur & Patrimoine",
        summary: "Comment les maîtres artisans de Capital Park restaurent wagons des années 1920 et locomotives à vapeur.",
        content: "Au siège de Rovos Rail à Capital Park, Pretoria, plus de 100 artisans restaurent minutieusement cadres en teck et lampes en laiton pour les locomotives à vapeur historiques de classe 19D et 25NC."
      },
      nl: {
        title: "Capital Park Werkplaats: Nieuw leven voor historische stoomtreinen",
        author: "Stoom & Erfgoed Krant",
        summary: "Hoe meester-ambachtslieden in Capital Park 1920-rijtuigen en stoomlocomotieven restaureren.",
        content: "Op het hoofdkantoor van Rovos Rail in Capital Park, Pretoria, restaurieren meer dan 100 ambachtslieden teakhouten ramen en koperen lampen voor historische Class 19D en 25NC stoomlocomotieven."
      },
      es: {
        title: "Taller Capital Park: Dando vida a la locomotora de vapor clásica",
        author: "Gaceta de Vapor y Patrimonio",
        summary: "Cómo artesanos en Capital Park restauran vagones de los años 1920 y locomotoras históricas.",
        content: "En la sede de Rovos Rail en Capital Park, Pretoria, más de 100 artesanos restauran marcos de teca y pulen lámparas de latón para las históricas locomotoras de vapor de las clases 19D y 25NC."
      },
      it: {
        title: "Officina di Capital Park: Nuova vita ai treni a vapore d'epoca",
        author: "Gazzetta Vapore e Patrimonio",
        summary: "Come i maestri artigiani di Capital Park restaurano carrozze anni '20 e storiche locomotive a vapore.",
        content: "Nel quartier generale di Rovos Rail a Capital Park, Pretoria, oltre 100 artigiani restaurano infissi in teak e lampade in ottone per le storiche locomotive a vapore Classe 19D e 25NC."
      },
      pt: {
        title: "Oficina de Capital Park: Dando vida a locomotivas a vapor vintage",
        author: "Gazeta de Vapor e Patrimônio",
        summary: "Como mestres artesãos em Capital Park restauram vagões dos anos 1920 e locomotivas históricas.",
        content: "Na sede do Rovos Rail em Capital Park, Pretória, mais de 100 artesãos restauram caixilhos de teca e polem lâmpadas de latão para as históricas locomotivas a vapor das classes 19D e 25NC."
      },
      zh: {
        title: "首都公园车间：为复古蒸汽机车赋予新生",
        author: "蒸汽与遗产报",
        summary: "首都公园的工匠大师们如何精心修复1920年代爱德华时代的车厢与历史蒸汽机车。",
        content: "在比勒陀利亚首都公园的洛沃斯铁路总部，100多名工匠精心修复柚木窗框，抛光纯黄铜灯具，重建历史悠久的19D与25NC级蒸汽机车。"
      },
      ja: {
        title: "キャピタル・パーク工房：ヴィンテージ蒸気機関車に息吹を",
        author: "スチーム＆ヘリテージ・ガゼット",
        summary: "キャピタル・パークの熟練職人が1920年代の客車や歴史的蒸気機関車をどのように修復しているか。",
        content: "プレトリアのキャピタル・パークにあるロボス・レール本社では、100名以上の職人がチーク材の窓枠や真鍮ランプを磨き上げ、歴史的なClass 19Dや25NC蒸気機関車を再構築しています。"
      },
      ko: {
        title: "캐피털 파크 워크숍: 클래식 증기 기관차에 새 숨결을",
        author: "증기 및 유산 저널",
        summary: "캐피털 파크의 숙련된 장인들이 1920년대 객차와 역사적인 증기 기관차를 복원하는 과정.",
        content: "프레토리아 캐피털 파크의 로보스 레일 본사에서는 100여 명의 장인들이 티크 목재 창틀과 황동 램프를 정성껏 복원하고 클래식 19D 및 25NC 증기 기관차를 재건합니다."
      },
      hi: {
        title: "कैपिटल पार्क वर्कशॉप: विंटेज स्टीम इंजनों में नई जान फूंकना",
        author: "स्टीम एंड हेरिटेज गजट",
        summary: "कैपिटल पार्क के मास्टर कारीगर 1920 के दशक के डिब्बों और ऐतिहासिक भाप इंजनों को कैसे बहाल करते हैं।",
        content: "प्रिटोरिया के कैपिटल पार्क में रोवोस रेल के मुख्यालय में, 100 से अधिक कारीगर सागौन की लकड़ी के फ़्रेम और पीतल के लैंपों को चमकाते हैं और क्लास 19D इंजनों का पुनर्निर्माण करते हैं।"
      },
      ru: {
        title: "Мастерская Капитал Парк: Новая жизнь старинных паровозов",
        author: "Газета «Паровозное наследие»",
        summary: "Как мастера в Капитал Парке реставрируют вагоны 1920-х годов и исторические паровозы.",
        content: "В штаб-квартире Rovos Rail в Претории более 100 мастеров реставрируют тиковые рамы и полируют латунные лампы для исторических паровозов серий 19D и 25NC."
      },
      ar: {
        title: "ورشة كابيتال بارك: إحياء القاطرات البخارية القديمة",
        author: "جريدة البخار والتراث",
        summary: "كيف يرمم الحرفيون في كابيتال بارك عربات عشرينيات القرن الماضي والقاطرات البخارية التاريخية.",
        content: "في مقر روفوس ريل في كابيتال بارك ببريتوريا، يرمم أكثر من 100 حرفي إطارات خشب التك والمصابيح النحاسية ويقوّون قاطرات البخار الكلاسيكية."
      }
    }
  };

  function getStoryInLanguage(story, langCode) {
    if (!story) return story;
    const lang = langCode || window.TrackTalesLanguageCode || localStorage.getItem('tracktales_lang') || 'en';
    if (lang === 'en' || !STORY_TRANSLATIONS[story.id] || !STORY_TRANSLATIONS[story.id][lang]) {
      return story;
    }
    const tr = STORY_TRANSLATIONS[story.id][lang];
    return {
      ...story,
      title: tr.title || story.title,
      summary: tr.summary || story.summary,
      content: tr.content || story.content,
      author: tr.author || story.author
    };
  }

  // --- Multilingual Archival Dossiers Translations Engine ---
  const DOSSIER_TRANSLATIONS = {
    'bt-dossier-1': {
      zu: {
        title: "1946 Ukuhambisa Isihloko Sasebukhosini Segolide Sempi",
        subtitle: "Imisebenzi Yasebusuku Ephephile E-Pretoria Kuya e-Simon's Town Naval Dock",
        summary: "Ngaphansi kokuthula komsakazo, isitimela esasengaphambili kwaso i-Blue Train sasithwala amatoni egolide e-Reserve Bank ngaphesheya kwe-Karoo."
      },
      xh: {
        title: "1946 Ukuthutha Igolide Semfazwe Esifihlakeleyo",
        subtitle: "Imisebenzi Yasebusuku ePretoria ukuya e-Simon's Town Naval Dock",
        summary: "Ngaphandle konxibelelwano, eyangaphambili ye-Blue Train yayithatha igolide eninzi ye-Reserve Bank ngaphaya kweKaroo."
      },
      af: {
        title: "1946 Oorlogstyd Goudstaaf Geheime Vervoer",
        subtitle: "Geklassifiseerde Nagbedrywighede vanaf Pretoria na Simonstad Vlootdok",
        summary: "Onder absolute radiostilte het Die Blou Trein se voorganger tonne Suid-Afrikaanse Reserwebank-goud deur die Karoo vervoer."
      },
      st: {
        title: "1946 Leeto la Sephiri la Gauta ea Ntoa",
        subtitle: "Tsosoloso ea Bosiu ho tloha Pretoria ho ya Simon's Town Naval Dock",
        summary: "Tlas'a tholo ea radiyo, terene pele ho Blue Train e ile ea jara litone tsa gauta ea Reserve Bank ho parola Karoo."
      },
      tn: {
        title: "1946 Loeto lwa Sephiri lwa Gauta ya Ntwa",
        summary: "Ntle le seromamowa, terene ya pele ho Blue Train e ne ya tsaya gauta ya Reserve Bank go ralala Karoo."
      },
      nso: {
        title: "1946 Leeto la Sephiri la Gauta ya Ntwa",
        summary: "Ntle le dithulaganyo tša radiyo, terene ya pele ga Blue Train e rwele gauta ya Reserve Bank go ralala Karoo."
      },
      ts: {
        title: "1946 Riendzo ra Xihundla ra Nsuku wa Nyimpi",
        summary: "Eka ku mihela ka moya, xitimela xa khale xa Blue Train xi rhwale ti-ton ta nsuku wa Reserve Bank eka mananga ya Karoo."
      },
      ss: {
        title: "1946 Luhambo lweFihlo leGolide yeNtfo",
        summary: "Ngaphandle kwekukhuluma kwasemoyeni, sitimela lesingaphambili kwe-Blue Train belutsatsa igolide ye-Reserve Bank ngeKaroo."
      },
      ve: {
        title: "1946 Lwendo lwa Tshiphiri lwa Musuku wa Nndwa",
        summary: "Musi hu si na muya wa nndwa, tshitimela tsha kale tsha Blue Train tsho hwala musuku wa Reserve Bank lundani lwa Karoo."
      },
      nr: {
        title: "1946 Ukuthuthwa kweGolide yeNtweni eFihliweko",
        summary: "Ngaphandle kwemiyalezo yomoya, isitimela sangaphambili se-Blue Train beluthatha igolide ye-Reserve Bank e-Karoo."
      }
    },
    'bt-dossier-2': {
      zu: {
        title: "Izibani Ezinombala Wegolide We-24K Nokundiza Kwe-Speed",
        summary: "Indlela abasunguli banjiniyela baseNingizimu Afrika abafake ngayo igolide elingama-24K kumafasitela ukuze bavikele ukushisa kwasemathangeni e-Karoo."
      },
      xh: {
        title: "Iglasi e-24K Yegolide Nezitimela Ezinesantya Esiphezulu",
        summary: "Indlela iinjineli zaseMzantsi Afrika ezabeka ngayo igolide ye-24K kwiifestile zololiwe ukuthintela ubushushu baseKaroo."
      },
      af: {
        title: "Lugkussing Hoëspoed-bogie & 24K Goud Akustiese Beglasing",
        summary: "Hoe Suid-Afrikaanse ingenieurs suiwer 24-karaat goud op dubbelglasvensters geëns het om 45°C Karoo-hittegolwe te trotseer."
      },
      st: {
        title: "Metsi a Gauta ea 24K le Lintlha tsa Terene ea Lebelo",
        summary: "Ka moo baenjinihere ba hlahisitseng gauta ea 24K fensetereng ho thibela mofuthu o moholo oa lehoatata la Karoo."
      },
      tn: {
        title: "Dipone tsa Gauta ya 24K le Diterene tsa Lebelo",
        summary: "Ka fa baenjinihere ba dirileng gauta mo difensetereng tsa terene go thibela mogote wa Karoo."
      },
      nso: {
        title: "Metsi a Gauta ya 24K le Diterene tša Lebelo",
        summary: "Ka moo baenjinihere ba tsentseng gauta ya 24K lifensetereng go thibela mofutho wa Karoo."
      },
      ts: {
        title: "Swayitimani swa Nsuku wa 24K ni Xitimela xa Rivilo",
        summary: "Ndlela leyi vaenjhiniyera va vekeke nsuku wa 24K eka mahlelo ya mafasitere ku sivela hisa ra Karoo."
      },
      ss: {
        title: "Emafasitela eGolide le-24K neSitimela seLuhlobo loLuphakeme",
        summary: "Indlela baenjiniyela labafaka ngayo igolide le-24K emafasiteleni kute kuvikelwe kushisa kwaseKaroo."
      },
      ve: {
        title: "Zwipilili zwa Musuku wa 24K na Tshitimela tsha Luuvho",
        summary: "Ka mvelele ye vhainjiniere vha vhea musuku wa 24K kha mafasitere u thivhela mufhiso wa Karoo."
      },
      nr: {
        title: "Amagilasi weGolide le-24K neZitimela zeSipidi",
        summary: "Indlela ababunjiniyela abafaka ngayo igolide le-24K emafasitereni ukususa ukutjhisa kwe-Karoo."
      }
    },
    'bt-dossier-3': {
      zu: {
        title: "Umzamo Wokweba Igolide E-Karoo Ebusuku ngo-1963",
        summary: "Umzamo omkhulu wokubulala isisefo ebusuku phakathi kwe-Kimberley ne-Beaufort West owaholela ekuvikelekeni kwanamuhla."
      },
      xh: {
        title: "Ulingo lokuQhekeza i-Vault ye-Diamond eKaroo ngo-1963",
        summary: "Ulingo olumangalisayo ebusuku phakathi kweKimberley neBeaufort West olwenza ukuba kusebenze ukhuseleko olutsha kakhulu."
      },
      af: {
        title: "Die Groot Karoo Middernag Diamantkluise Poging",
        summary: "'n Dramatiese poging tot middernagtelike kluisbraak tydens die rit tussen Kimberley en Beaufort-Wes."
      },
      st: {
        title: "Lekatiko la ho utswa Gauta e Karoo ka 1963",
        summary: "Lekatiko le leholo la bosiu pakeng tsa Kimberley le Beaufort West le hlotseng tsamaiso e ncha ea tshireletso."
      },
      tn: {
        title: "Leko la go utswa Ditaemane mo Karoo ka 1963",
        summary: "Leko le legolo la bosigo fa gare ga Kimberley le Beaufort West le le tlhodileng tshireletso e ntshwa."
      },
      nso: {
        title: "Leko la go utswa Ditaemane Karoo ka 1963",
        summary: "Leko le legolo la bosego gare ga Kimberley le Beaufort West le le hlotšego tshireletso ye ntšha."
      },
      ts: {
        title: "Ku ringeta ku yiva Tiyimane eKaroo hi 1963",
        summary: "Ku ringeta lokukulu ka vusiku exikarhi ka Kimberley ni Beaufort West loku tswaleke vuhlayiseki byintshwa."
      },
      ss: {
        title: "EmaZamo yekutswela Emadayimane eKaroo ngo-1963",
        summary: "Emazamo lamakhulu ebusuku emkhatsini weKimberley neBeaufort West lakha kuvikeleka lokusha."
      },
      ve: {
        title: "U lingedza u tswa Dzaimane Karoo nga 1963",
        summary: "U lingedza vhukuma vhukati ha Kimberley na Beaufort West ha u ita vhutsireledzi vhuswa."
      },
      nr: {
        title: "Umlingo wokuTjhwathula Amadayimane e-Karoo ngo-1963",
        summary: "Umlingo omkhulu ebusuku hlangana kwe-Kimberley ne-Beaufort West owalethe ukuvikeleka okutjha."
      }
    },
    'rr-dossier-1': {
      zu: {
        title: "Ukuvuselelwa Kwezitimela Zakudala Ze-Steam e-Witbank",
        summary: "Umlando oyingqayizivele wokuhlula phansi izimoto zezitimela nezimayini e-Witbank nase-Capital Park ngezandla zabaqeqeshi."
      },
      xh: {
        title: "Ukuvuselelwa kwe-Steam e-Witbank ku-Capital Park",
        summary: "Ibali elibonisa indlela uRohan Vos ahlangula ngayo iinjini ze-steam ezindala kwi-Witbank n e-Capital Park."
      },
      af: {
        title: "Die Witbank Stoom Kerkhof Herreseining",
        summary: "Die waaghalsige stigtersverhaal van die redding van Klas 19D en Klas 25NC stoomlokomotiewe wat vir die smeltoond bestem was."
      },
      st: {
        title: "Nchafatso ea Diterene tsa Khale tsa Witbank",
        summary: "Pale e kholo ea ho pholosa diterene tsa mouoane tsa Class 19D le Class 25NC Capital Park."
      },
      tn: {
        title: "Tsosoloso ya Diterene tsa Bogologolo mo Witbank",
        summary: "Pale ya go boloka diterene tsa mouoane tsa Class 19D le 25NC kwa Capital Park."
      },
      nso: {
        title: "Renovetšo ya Diterene tša Kgale tša Witbank",
        summary: "Kanegelo ya go phološa diterene tša mouoane tša Class 19D le 25NC Capital Park."
      },
      ts: {
        title: "Ku Pfuxetiwa ka Switimela swa Khale eWitbank",
        summary: "Mhungu lowukulu wa ku ponisa switimela swa 19D ni 25NC eCapital Park."
      },
      ss: {
        title: "Kuvuselelwa kweTitimela te-Steam eWitbank",
        summary: "Indzaba yekusindzisa titimela tema-steam te-Class 19D ne-25NC eCapital Park."
      },
      ve: {
        title: "U Vhuedzedza Zwitimela zwa Steam Witbank",
        summary: "Ngano khulwane ya u lamulela zwitimela zwa 19D na 25NC Capital Park."
      },
      nr: {
        title: "Ukuvuseleleka kweZitimela ze-Steam e-Witbank",
        summary: "Indaba yokuhlangula izitimela ze-Class 19D ne-25NC e-Capital Park."
      }
    },
    'rr-dossier-2': {
      zu: {
        title: "Imibhalo Yemfanelo Yempi Yase-Matjiesfontein ngo-1899",
        summary: "I-Telegraph yesikhathi sempi ye-Anglo-Boer eyashicilelwa phakathi kuka-Lord Milner nekomkhulu lezempi."
      },
      xh: {
        title: "Imithombo ye-Telegraph ye-Anglo-Boer War eMatjiesfontein",
        summary: "Imithombo yoqobo kaLord Milner nabaphathi basemantshingeni ngo-1899 eMatjiesfontein."
      },
      af: {
        title: "1899 Anglo-Boereoorlog Militêre Telegrawe van Matjiesfontein",
        summary: "Oorspronklike transmissies tussen Lord Milner en die Britse Hoofkwartier."
      },
      st: {
        title: "Meqolo ea Ntoa ea Anglo-Boer Matjiesfontein ka 1899",
        summary: "Meleko ea pele pakeng tsa Lord Milner le ntlo-khōlō ea ntoa Matjiesfontein."
      },
      tn: {
        title: "Makwalo a Ntwa ya Anglo-Boer kwa Matjiesfontein ka 1899",
        summary: "Makwalo a ntlha gare ga Lord Milner le diofisi tsa ntwa kwa Matjiesfontein."
      },
      nso: {
        title: "Mangwalo a Ntwa ya Anglo-Boer Matjiesfontein ka 1899",
        summary: "Mangwalo a ntlha gare ga Lord Milner le ntlokgolo ya ntwa."
      },
      ts: {
        title: "Papila ra Nyimpi ya Anglo-Boer eMatjiesfontein hi 1899",
        summary: "Mamapila ya ntiyiso exikarhi ka Lord Milner ni ntsindza wa nyimpi."
      },
      ss: {
        title: "Ema-Telegraph ye-Anglo-Boer War eMatjiesfontein ngo-1899",
        summary: "Imibhalo yamambala emkhatsini wa-Lord Milner ne-hhovisi lenkhulu yentfo."
      },
      ve: {
        title: "Zwiberetshi zwa Nndwa ya Anglo-Boer Matjiesfontein nga 1899",
        summary: "Zwiberetshi zwa vhukuma vhukati ha Lord Milner na ofisi khulwane ya nndwa."
      },
      nr: {
        title: "Imilayezo yeNtweni ya-1899 e-Matjiesfontein",
        summary: "Imilayezo yamambala hlangana kuka-Lord Milner nabaphathi be-ntweni."
      }
    },
    'rr-dossier-3': {
      zu: {
        title: "I-Log Yezimoto Zamapulangwe Ze-Edwardian Ze-Teak",
        summary: "Amaphepha nabaqeqeshi bezobuciko abavuselela amapulangwe e-teak angomnyaka we-1920 e-Capital Park."
      },
      xh: {
        title: "I-Log ye-Edwardian Teak Carriage Restoration",
        summary: "Imithetho yokulungiswa kweefremu zeenkuni zakudala zaseCapital Park Workshops."
      },
      af: {
        title: "Die Edwardiaanse Teakhout Wa Restourasie Logs",
        summary: "Gedetailleerde restourasieverslae wat die meesterambagstegnieke toon wat gebruik is om 1920's houtpanele te bewaar."
      },
      st: {
        title: "Litlaleho tsa ho Nchafatsa Diterene tsa Lehong tsa Edwardian",
        summary: "Litlaleho tse hlakileng tsa ho nchafatsa lehong la teak la bo-1920 Capital Park."
      },
      tn: {
        title: "Pego ya go Nchafatsa Diterene tsa Edwardian Teak",
        summary: "Dipego tsa go dira dikariki tsa lehung la 1920 kwa Capital Park Workshops."
      },
      nso: {
        title: "Pego ya go Renoveta Diterene tša Lehung tša Edwardian",
        summary: "Dipego tša go renoveta diphanele tša lehung tša 1920 Capital Park."
      },
      ts: {
        title: "Rhekhodo ya ku Pfuxeta Milenge ya Mhandzi ya Edwardian",
        summary: "Tirhekhodo ta ku pfuxeta mhandzi ya 1920 eCapital Park Workshops."
      },
      ss: {
        title: "Imibhalo yeKuhlobisa Titimela temPahla te-Edwardian Teak",
        summary: "Imibhalo yekulungisa emapulangwe e-teak taka-1920 eCapital Park."
      },
      ve: {
        title: "Zwirekhodo zwa u Vhuedzedza Zwithu zwa Muri wa Edwardian",
        summary: "Zwirekhodo zwa u vhuedzedza muri wa 1920 Capital Park Workshops."
      },
      nr: {
        title: "Amarekhodi wokuVuselela iinQola zeMthi ze-Edwardian",
        summary: "Amarekhodi wokulungisa iinqola zomthi ze-1920 e-Capital Park Workshops."
      }
    }
  };

  function getDossierInLanguage(dossier, langCode) {
    if (!dossier) return dossier;
    const lang = langCode || window.TrackTalesLanguageCode || localStorage.getItem('tracktales_lang') || 'en';
    if (lang === 'en' || !DOSSIER_TRANSLATIONS[dossier.id] || !DOSSIER_TRANSLATIONS[dossier.id][lang]) {
      return dossier;
    }
    const tr = DOSSIER_TRANSLATIONS[dossier.id][lang];
    return {
      ...dossier,
      title: tr.title || dossier.title,
      summary: tr.summary || dossier.summary,
      subtitle: tr.subtitle || dossier.subtitle
    };
  }

  const TRAIN_TRANSLATIONS = {
    'blue-train': {
      zu: {
        name: 'Isitimela Esibluu (The Blue Train)',
        tagline: 'Iwindi LoMphefumulo WaseNingizimu Afrika',
        category: 'Isitimela Esibizayo Sesezingeni Eliphezulu',
        speed: '90 km/h (Uhambo Olushelelayo Nolupholile)',
        duration: 'Izora Ezingu-31 (1,600 km)',
        description: 'Isitimela Esibluu sekuwulokhu kuyisibonakaliso sohambo lwesitimela esisezingeni eliphezulu kusukela ngo-1946. Ekuhambeni okuya eningizimu ukusuka ePretoria kuya eKapa, abagibeli behla eKimberley ukubuka iBig Hole nomnyuziyamu wedayimane.',
        departure_hub: 'Isiteshi sasePretoria Park / Irene Lounge (09:00 AM)',
        arrival_hub: 'Isiteshi saseKapa (17:30 PM Usuku 2)',
        highlights: [
          'Uhambo oluqondisiwe eKimberley Big Hole naseNyuziyamu yeDayimane',
          'Inkonzo yomsebenzi omkhulu (Butler) ama-awa angu-24 kuyo yonke indlu',
          'Amagumbi okugeza emabula anezindawo zokugeza eziphelele',
          'Ukudla okunomsoco kwezifundo ezinye zi-5 ezihambisana newayini',
          'Imoto yebha yama-Gentlemen ezihlinzeka ngecigar nekonyaki'
        ]
      },
      xh: {
        name: 'ITreni Ebluu (The Blue Train)',
        tagline: 'Ifestile yomphefumlo waseMzantsi Afrika',
        category: 'ITreni ye-Luxury Express',
        speed: '90 km/h (Uhambo Oluntofontofo)',
        duration: 'Iiyure zi-31 (1,600 km)',
        description: 'ITreni Ebluu ibiyeyona treni inethezekileyo kwasusela ngo-1946. Uhambo oluya emzantsi ukusuka ePretoria isinga eKapa lubandakanya ukuma eKimberley ukubuka iBig Hole.',
        departure_hub: 'Isitishi sasePretoria Park / Irene Lounge (09:00 AM)',
        arrival_hub: 'Isitishi saseKapa (17:30 PM Usuku 2)',
        highlights: [
          'Uhambo olukhokelwayo eKimberley Big Hole nemyuziyam yedayimani',
          'Inkonzo ye-Butler ezinikeleyo ii-24/7 kuyo yonke isuti',
          'Amagumbi okuhlamba emarmore anezitya zokuhlamba ezizeleyo',
          'Izidlo ezihle ze-5-course gourmets ezihamba newayini entsha',
          'I-Club Car ene-Cuban cigars nekonyaki vito'
        ]
      },
      af: {
        name: 'Die Blou Trein',
        tagline: '\'n Venster na die Ziel van Suid-Afrika',
        category: 'Ultra Luukse Sneltrein',
        speed: '90 km/h (Gerieflike Luukse Reis)',
        duration: '31 Uur (1,600 km)',
        description: 'Die Blou Trein is sedert 1946 sinoniem met luukse treinreise. Op die suidwaartse reis vanaf Pretoria na Kaapstad stap passasiers af in Kimberley vir \'n begeleide toer van die beroemde Groot Gat.',
        departure_hub: 'Pretoria Park-stasie / Irene Lounge (09:00)',
        arrival_hub: 'Kaapstad-stasie (17:30 Dag 2)',
        highlights: [
          'Begeleide toer van Kimberley se Groot Gat en Diamantmuseum',
          '24/7 Toegewyde persoonlike butlerdiens in elke suite',
          'En-suite marmerbadkamers met volle grootte baddens',
          'Fynproewer 5-gang etes met silwerdiens en Kaapse wynpassing',
          'Herenklub-swaaiwa met Kubaanse sigare en edel kognak'
        ]
      },
      de: {
        name: 'Der Blaue Zug (The Blue Train)',
        tagline: 'Ein Fenster zur Seele Südafrikas',
        category: 'Ultra-Luxus-Express',
        speed: '90 km/h (Sanftes Luxusreisen)',
        duration: '31 Stunden (1.600 km)',
        description: 'Der Blaue Zug steht seit 1946 für luxuriöse Zugreisen. Auf der Fahrt nach Süden von Pretoria nach Kapstadt nehmen die Passagiere an einem geführten Ausflug in Kimberley teil, um das berühmte Big Hole zu besuchen.',
        departure_hub: 'Bahnhof Pretoria Park / Irene Lounge (09:00 Uhr)',
        arrival_hub: 'Bahnhof Kapstadt (17:30 Uhr Tag 2)',
        highlights: [
          'Geführte Tour durch das Big Hole & Diamantenmuseum in Kimberley',
          '24/7 Persönlicher Butler-Service in jeder Suite',
          'En-suite Marmorbäder mit vollgestatteten Badewannen',
          'Gourmet 5-Gänge-Menü mit Silberservice & edler Weinbegleitung',
          'Herren-Clubwagen mit kubanischen Zigarren & edlem Cognac'
        ]
      },
      fr: {
        name: 'Le Train Bleu (The Blue Train)',
        tagline: 'Une Fenêtre sur l\'Âme de l\'Afrique du Sud',
        category: 'Express de Grand Luxe',
        speed: '90 km/h (Voyage de Luxe Fluide)',
        duration: '31 Heures (1 600 km)',
        description: 'Le Train Bleu est synonyme de voyage ferroviaire de luxe depuis 1946. Lors du trajet vers le sud de Pretoria à Le Cap, les passagers bénéficient d\'une excursion guidée à Kimberley pour visiter le fameux Big Hole.',
        departure_hub: 'Gare de Pretoria Park / Salon Irene (09h00)',
        arrival_hub: 'Gare de Le Cap (17h30 Jour 2)',
        highlights: [
          'Visite guidée du Big Hole et du Musée de la Mine de Diamant à Kimberley',
          'Service de majordome personnel dédié 24h/24 et 7j/7 dans chaque suite',
          'Salles de bains en marbre attenantes avec baignoires',
          'Dîner gastronomique 5 services avec service d\'argent et vins fins du Cap',
          'Voiture-salon Club avec cigares cubains et cognacs d\'exception'
        ]
      },
      nl: {
        name: 'De Blauwe Trein (The Blue Train)',
        tagline: 'Een Venster op de Ziel van Zuid-Afrika',
        category: 'Ultra Luxe Express',
        speed: '90 km/h (Comfortabel Luxe Reizen)',
        duration: '31 Uur (1.600 km)',
        description: 'De Blauwe Trein staat sinds 1946 synoniem voor luxe treinreizen. Op de zuidwaartse reis van Pretoria naar Kaapstad maken passagiers een begeleide excursie in Kimberley bij het beroemde Big Hole.',
        departure_hub: 'Pretoria Park Station / Irene Lounge (09:00 uur)',
        arrival_hub: 'Kaapstad Station (17:30 uur Dag 2)',
        highlights: [
          'Rondleiding door het beroemde Big Hole & Diamantmuseum in Kimberley',
          '24/7 Toegewijde persoonlijke butler-service in elke suite',
          'En-suite marmeren badkamers met ligbad',
          'Gastronomisch 5-gangendiner met zilverservice en wijnarrangement',
          'Heren Clubwagon met Cubaanse sigaren en fijne cognac'
        ]
      },
      es: {
        name: 'El Tren Azul (The Blue Train)',
        tagline: 'Una Ventana al Alma de Sudáfrica',
        category: 'Expreso de Gran Lujo',
        speed: '90 km/h (Viaje de Lujo Suave)',
        duration: '31 Horas (1,600 km)',
        description: 'El Tren Azul ha sido sinónimo de viajes en tren de lujo desde 1946. En el viaje hacia el sur desde Pretoria a Ciudad del Cabo, los pasajeros disfrutan de una excursión guiada en Kimberley para ver el famoso Big Hole.',
        departure_hub: 'Estación Pretoria Park / Salón Irene (09:00 AM)',
        arrival_hub: 'Estación de Ciudad del Cabo (17:30 PM Día 2)',
        highlights: [
          'Visita guiada al Big Hole y Museo de la Mina de Diamantes en Kimberley',
          'Servicio de mayordomo personal dedicado 24/7 en cada suite',
          'Baños de mármol en suite con bañeras completas',
          'Cena gourmet de 5 tiempos con servicio de plata y maridaje de vinos',
          'Coche Club para caballeros con puros cubanos y coñac fino'
        ]
      },
      it: {
        name: 'Il Treno Blu (The Blue Train)',
        tagline: 'Una Finestra sull\'Anima del Sudafrica',
        category: 'Espresso di Gran Lusso',
        speed: '90 km/h (Viaggio di Lusso Fluido)',
        duration: '31 Ore (1.600 km)',
        description: 'Il Treno Blu è sinonimo di viaggi ferroviari di lusso dal 1946. Durante il viaggio verso sud da Pretoria a Città del Capo, i passeggeri effettuano un\'escursione guidata a Kimberley presso il famoso Big Hole.',
        departure_hub: 'Stazione di Pretoria Park / Irene Lounge (09:00)',
        arrival_hub: 'Stazione di Città del Capo (17:30 Giorno 2)',
        highlights: [
          'Visita guidata al Big Hole e Museo della Miniera di Diamanti di Kimberley',
          'Servizio maggiordomo personale dedicato 24/7 in ogni suite',
          'Bagni in marmo en-suite con vasche da bagno',
          'Cena gourmet da 5 portate con servizio d\'argento e abbinamento vini',
          'Carrozza Club per gentiluomini con sigari cubani e cognac pregiati'
        ]
      },
      pt: {
        name: 'O Comboio Azul (The Blue Train)',
        tagline: 'Uma Janela para a Alma da África do Sul',
        category: 'Expresso de Ultra Luxo',
        speed: '90 km/h (Viagem de Luxo Suave)',
        duration: '31 Horas (1.600 km)',
        description: 'O Comboio Azul é sinónimo de viagens de comboio de luxo desde 1946. Na viagem rumo ao sul de Pretoria para a Cidade do Cabo, os passageiros desfrutam de uma excursão guiada em Kimberley para ver o famoso Big Hole.',
        departure_hub: 'Estação de Pretoria Park / Salão Irene (09:00)',
        arrival_hub: 'Estação da Cidade do Cabo (17:30 Dia 2)',
        highlights: [
          'Passeio guiado ao Big Hole e Museu da Mina de Diamantes em Kimberley',
          'Serviço de mordomo pessoal dedicado 24/7 em cada suite',
          'Casas de banho em mármore en-suite com banheiras',
          'Jantar gourmet de 5 pratos com serviço de prata e harmonização de vinhos',
          'Carruagem Club com charutos cubanos e conhaques finos'
        ]
      },
      zh: {
        name: '蓝色列车 (The Blue Train)',
        tagline: '通往南非灵魂之窗',
        category: '顶级豪华快车',
        speed: '90 公里/小时 (平稳舒适的奢华之旅)',
        duration: '31 小时 (1,600 公里)',
        description: '自1946年以来，蓝色列车一直是奢华铁路旅行的代名词。在从比勒陀利亚前往开普敦的南行旅途中，乘客将在金伯利下车，由专业导游带领游览著名的“大洞”（Big Hole）及钻石矿博物馆。',
        departure_hub: '比勒陀利亚朴克车站 / 艾琳贵宾厅 (09:00)',
        arrival_hub: '开普敦车站 (第2天 17:30)',
        highlights: [
          '金伯利大洞与钻石矿山博物馆导览游',
          '每间套房配备24/7专属私人管家服务',
          '附设全尺寸浴缸的奢华大理石独立浴室',
          '5道菜高级银器晚宴及开普敦名酒搭配',
          '配备古巴雪茄与顶级干邑的绅士俱乐部车厢'
        ]
      },
      ja: {
        name: 'ブルー・トレイン (The Blue Train)',
        tagline: '南アフリカの魂を映す車窓',
        category: 'ウルトラ・ラグジュアリー特急',
        speed: '90 km/h (スムーズで快適なラグジュアリー走行)',
        duration: '31 時間 (1,600 km)',
        description: 'ブルー・トレインは1946年以来、豪華列車の代名詞となっています。プレトリアからケープタウンへの南行の旅では、キンバリーで途中下車し、有名なビッグホールとダイヤモンド鉱山博物館のガイド付きツアーをお楽しみいただけます。',
        departure_hub: 'プレトリア・パーク駅 / アイリーン・ラウンジ (09:00)',
        arrival_hub: 'ケープタウン駅 (2日目 17:30)',
        highlights: [
          'キンバリーのビッグホール＆ダイヤモンド鉱山博物館ツアー',
          '全客室に24時間対応の専属バトラーサービス',
          'フルサイズバスタブ付きの大理石バスタブ付きバスルーム',
          '銀食器で味わう5コースの豪華ディナーとケープワインペアリング',
          'キューバ産シガーと高級コニャックを備えたクラブカー'
        ]
      },
      ko: {
        name: '블루 트레인 (The Blue Train)',
        tagline: '남아프리카 공화국의 영혼을 담은 창문',
        category: '울트라 럭셔리 특급 열차',
        speed: '90 km/h (부드럽고 편안한 럭셔리 주행)',
        duration: '31 시간 (1,600 km)',
        description: '블루 트레인은 1946년 이래 럭셔리 기차 여행의 대명사였습니다. 프리토리아에서 케이프타운으로 향하는 하행선 여정 중 승객들은 킴벌리에 내려 유명한 빅 홀과 다이아몬드 광산 박물관 가이드 투어를 가집니다.',
        departure_hub: '프리토리아 파크역 / 아이린 라운지 (09:00 AM)',
        arrival_hub: '케이프타운역 (2일차 17:30 PM)',
        highlights: [
          '킴벌리 빅 홀 및 다이아몬드 광산 박물관 가이드 투어',
          '모든 스위트룸 24/7 전담 개인 버틀러 서비스',
          '대형 욕조가 구비된 대리석 전용 욕실',
          '은식기로 제공되는 5코스 고급 정찬 및 케ープ 와인 페어링',
          '쿠바 시가와 고급 코냑이 마련된 클럽 카'
        ]
      },
      hi: {
        name: 'द ब्लू ट्रेन (The Blue Train)',
        tagline: 'दक्षिण अफ्रीका की आत्मा की खिड़की',
        category: 'अल्ट्रा लक्जरी एक्सप्रेस',
        speed: '90 किमी/घंटा (आरामदायक लक्जरी यात्रा)',
        duration: '31 घंटे (1,600 किमी)',
        description: 'द ब्लू ट्रेन 1946 से लक्जरी रेल यात्रा का पर्याय रही है। प्रिटोरिया से केप टाउन की दक्षिण दिशा की यात्रा पर, यात्री प्रसिद्ध बिग होल और डायमंड माइन संग्रहालय के निर्देशित दौरे के लिए किम्बरली में उतरते हैं।',
        departure_hub: 'प्रिटोरिया पार्क स्टेशन / आइरीन लाउंज (09:00 AM)',
        arrival_hub: 'केप टाउन स्टेशन (17:30 PM दिन 2)',
        highlights: [
          'किम्बरली बिग होल और डायमंड माइन संग्रहालय का निर्देशित दौरा',
          'हर सुइट में 24/7 समर्पित व्यक्तिगत बटलर सेवा',
          'संगमरमर के स्नानघर पूर्ण आकार के बाथटब के साथ',
          'सिल्वर सर्विस और वाइन के साथ 5-कोर्स लक्जरी डिनर',
          'क्यूबन सिगार और फाइन कॉन्यैक के साथ क्लब कार'
        ]
      },
      ru: {
        name: 'Голубой Поезд (The Blue Train)',
        tagline: 'Окно в Душу Южной Африки',
        category: 'Ультра-Люкс Экспресс',
        speed: '90 км/ч (Плавное Люксовое Путешествие)',
        duration: '31 Час (1 600 км)',
        description: 'Голубой поезд с 1946 года является синонимом роскошных железнодорожных путешествий. Во время южного путешествия из Претории в Кейптаун пассажиры совершают экскурсию в Кимберли с посещением знаменитой Большой дыры.',
        departure_hub: 'Вокзал Претория Парк / Зал Айрин (09:00)',
        arrival_hub: 'Вокзал Кейптаун (17:30 День 2)',
        highlights: [
          'Экскурсия к Большой дыре и Музею алмазных копей в Кимберли',
          '24/7 Персональный дворецкий в каждом люксе',
          'Мраморные ванные комнаты с полноценной ванной',
          'Изысканный ужин из 5 блюд с серебряным сервизом и вином',
          'Клубный вагон с кубинскими сигарами и элитным коньяком'
        ]
      },
      ar: {
        name: 'القطار الأزرق (The Blue Train)',
        tagline: 'نافذة على روح جنوب إفريقيا',
        category: 'قطار سريّع فاخر للغاية',
        speed: '90 كم/ساعة (سفر فاخر ومريح)',
        duration: '31 ساعة (1600 كم)',
        description: 'كان القطار الأزرق مرادفًا للسفر الفاخر عبر السكك الحديدية منذ عام 1946. في الرحلة المتجهة جنوبًا من بريتوريا إلى كيب تاون، ينزل الركاب في كيمبرلي في جولة مع مرشد لرؤية الثقب الكبير الشهير ومتحف مناجم الألماس.',
        departure_hub: 'محطة بريتوريا بارك / صالة إيرين (09:00 صباحًا)',
        arrival_hub: 'محطة كيب تاون (17:30 مساءً اليوم الثاني)',
        highlights: [
          'جولة مع مرشد في الثقب الكبير ومتحف مناجم الألماس في كيمبرلي',
          'خدمة نخب كبار الشخصيات (خادم شخصي) 24/7 في كل جناح',
          'حمام رخامي خاص يحتوي على حوض استحمام كامل',
          'عشاء فاخر مكون من 5 أطباق مع خدمة فضية ومشروبات مختارة',
          'عربة نادٍ خاصة تحتوي على السيجار الكوبي والكونياك الفاخر'
        ]
      }
    }
  };

  function getSceneryHighlightsInLanguage(trainId, langCode) {
    const isBlue = trainId === 'blue-train';
    const lang = langCode || 'en';

    const blueScenery = {
      af: [
        { title: "Die Groot Karoo Sonsondergang & Wüstenhorisonne", vantage: "Panorama-sitkamer van die Waarnemingswa", time_window: "Laat Midden-namiddag tot Goue Uur", icon: "sun", desc: "Ervaar die oneindige platkoppies en akasia-silhoeëtte van die Karoo in 'n gloeiende purper en goud deur panoramiese glas van vloer tot plafon.", tips: "Daag 30 minute voor skemer by die waarnemingswa op vir uitstekende leunstoel-sitplekke." },
        { title: "Hexrivier Bergpas & Spoorweėtunnels", vantage: "Klubwa & Sitkamervensters", time_window: "Oggend Afkoms na die Wes-Kaap", icon: "mountain", desc: "Bewonder hoe die trein deur toringhoë sandsteenreekse en die 13,5 km-tunnelsisteem na smaragagtige wingerdvalleie kronkel.", tips: "Sit aan die regterkant van die sitkamerwa vir 'n pragtige uitsig oor die bergravyn." },
        { title: "Kamfersdam Flamingo Soutpanne", vantage: "Panoramiese Vensters & Eetwa", time_window: "Benadering tot Kimberley Spoorwegaansluiting", icon: "compass", desc: "Sien tienduisende kleiner flaminke wat die soutpanwaters in pastelpienk kleur reg langs die spoorlyn.", tips: "Hê jou kamera gereed wanneer swerms in golwe langs die trein opstyg." },
        { title: "Hoëveld Oop Goudvelde & Grasvelde", vantage: "Panoramiese Sitkamer & Klubwa", time_window: "Pretoria & Gauteng Vertrek", icon: "layers", desc: "Aanskou die rolled hoë-hoogte savanne en historiese mynhope wat oorgaan in die wye oop uitgestrektheid van die sentrale plato.", tips: "Beste geniet met oggend-espresso terwyl die trein kruisspoed bereik." }
      ],
      zu: [
        { title: "Ukushona KweLanga eKaroo Ne-Horizons YaseHlathini", vantage: "Indlu Yokubuka Ene-Panoramic Glass", time_window: "Ntambama Kuya Ekolweni Lwegolide", icon: "sun", desc: "Zizwe izintaba ezingapheli ne-akasia zaseKaroo ezikhanya ngokubomvu negolide ngengilazi esuka phansi kuya phezulu.", tips: "Fika endlini yokubuka imizuzu engu-30 ngaphambi kokuhlwa ukuze uthole izihlalo ezinhle." },
        { title: "Izintaba Ze-Hex River Nezinqolobane Zesitimela", vantage: "Amawindi Endlu Yeklabhu Nesitolo", time_window: "Ekuseni Okuya eNyakatho Kapa", icon: "mountain", desc: "Bukela isitimela sizulazula ezintabeni zesanti nezinqolobane zamakhilomitha angu-13.5 eziya emijondolo yewayini.", tips: "Hlala ngakwesokudla sendlu ye-lounge ukubuka imifula yezintaba." },
        { title: "Amadamu Ase-Kamfers Dam Ama-Flamingo", vantage: "Amawindi Endlu Yokudla", time_window: "Eduze Neziteshi Zesitimela saseKimberley", icon: "compass", desc: "Bona amawaka ama-flamingos ekhanyisa amanzi ngombala opinki eduze nomzila wesitimela.", tips: "Lungiselela ikhamera yakho njengoba izinyoni zindiza eduze kwesitimela." },
        { title: "Amasimu Egolide Nezinkundla Zase-Highveld", vantage: "Indlu Yokubuka Neklabhu", time_window: "Ukusuka ePretoria naseGauteng", icon: "layers", desc: "Bukela i-savannah ephakeme nomlando wezimayini ujulise indawo enkulu yasekhaya.", tips: "Kumnandi kakhulu nge-espresso yakusasa lapho isitimela sifinyelela ijubane lwaso." }
      ],
      xh: [
        { title: "Ukutshona Kwelanga e-Karoo Ne-Horizons Yasentlango", vantage: "Ikhabhin Yokubukela Ene-Glass", time_window: "Malanga Ukusa Kwiyure yegolide", icon: "sun", desc: "Ziva iintlaba ezingapheliyo ze-Karoo ezikhanya ngombala obomvu negolide ngengilazi ukusuka phantsi ukuya phezulu.", tips: "Fika kwikhabhin yokubukela imizuzu engu-30 ngaphambi kokutshona kwelanga." },
        { title: "Intaba ze-Hex River Nemingxuma Ye-Treni", vantage: "Ifestile Ze-Club Car", time_window: "Kwakusasa Ukuya eNtshona Kapa", icon: "mountain", desc: "Buka itreni izulazula ezintabeni nasekuhambeni kwemingxuma ye-13.5 km eziya kwiintlambo zeediliya.", tips: "Hlala kwicala lasekunene le-lounge ukuze ubone imilambo yezintaba." },
        { title: "Amadama e-Kamfers Dam Ama-Flamingo", vantage: "Ifestile Panorama Ne-Dining Car", time_window: "Ukondela kwi-Junction yaseKimberley", icon: "compass", desc: "Bona amawakawaka ee-flamingos ezitshintsha umbala wamanzi ngombala opinki eceleni komzila.", tips: "Yiba nekhamera yakho ilungile xa iintaka ziphakamela phezulu eceleni kwenetreni." },
        { title: "Amalimi Egolide e-Highveld ne-Grasslands", vantage: "I-Panoramic Lounge ne-Club Car", time_window: "Ukusuka ePretoria ne-Gauteng", icon: "layers", desc: "Buka i-savannah ye-Highveld kunye neendawo zemigodi ezindala zitshintsha ziye kwithafa elikhulu centro.", tips: "Kumnandi nge-espresso yakusasa xa itreni ifikelela kuisantya esiphezulu." }
      ],
      de: [
        { title: "Sonnenuntergang in der Großen Karoo & Wüstenhorizonte", vantage: "Panoramalounge des Aussichtswagens", time_window: "Später Nachmittag bis Goldene Stunde", icon: "sun", desc: "Erleben Sie die unendlichen Inselberge und Akaziensilhouetten der Karoo in glühendem Purpur und Gold durch bodentiefes Panoramaglas.", tips: "Seien Sie 30 Minuten vor der Dämmerung im Aussichtswagen für die besten Sesselplätze." },
        { title: "Hex River Bergpass & Eisenbahntunnel", vantage: "Clubwagen- & Loungefenster", time_window: "Morgendliche Fahrt ins Westkap", icon: "mountain", desc: "Staunen Sie, wie sich der Zug durch mächtige Sandsteingebirge und das 13,5 km lange Tunnelsystem in smaragdgrüne Weinbautäler schlängelt.", tips: "Sitzen Sie auf der rechten Seite des Lounge-Wagens für spektakuläre Schluchtenblicke." },
        { title: "Kamfers Dam Flamingo-Salzseen", vantage: "Panoramafenster & Speisewagen", time_window: "Annäherung an den Bahnknotenpunkt Kimberley", icon: "compass", desc: "Beobachten Sie zehntausende Zwergflamingos, die das Wasser der Salzpfanne direkt neben den Gleisen in Pastellrosa tauchen.", tips: "Halten Sie Ihre Kamera bereit, wenn Schwärme in Wellen neben dem Zug aufsteigen." },
        { title: "Highveld Goldfelder & Grasland", vantage: "Panoramalounge & Clubwagen", time_window: "Abfahrt in Pretoria & Gauteng", icon: "layers", desc: "Sehen Sie zu, wie die hügelige Hochland-Savanne und historischen Minenhalden in die weite Ebene des zentralen Plateaus übergehen.", tips: "Am besten bei einem morgendlichen Espresso zu genießen, wenn der Zug Reisegeschwindigkeit erreicht." }
      ],
      fr: [
        { title: "Coucher de Soleil sur le Grand Karoo & Horizons du Désert", vantage: "Voiture-Salon Panoramique", time_window: "Fin d'Après-midi à l'Heure Dorée", icon: "sun", desc: "Admirez les inselbergs infinis et les silhouettes d'acacias du Karoo baignés de pourpre et d'or à travers d'immenses baies vitrées.", tips: "Arrivez à la voiture panoramique 30 minutes avant le crépuscule pour les meilleurs fauteuils." },
        { title: "Col de la Hex River & Tunnels Ferroviaires", vantage: "Voiture-Club & Fenêtres du Salon", time_window: "Descente Matinale vers le Cap-Occidental", icon: "mountain", desc: "Émerveillez-vous devant le train serpentant à travers les montagnes de grès et le système de tunnels de 13,5 km menant aux vallées viticoles.", tips: "Asseyez-vous du côté droit du salon pour une vue vertigineuse sur les ravins." },
        { title: "Marais Salants aux Flamingos de Kamfers Dam", vantage: "Baies Panoramiques & Voiture-Restaurant", time_window: "Approche de la Jonction de Kimberley", icon: "compass", desc: "Observez des dizaines de milliers de flamants roses teinter les eaux en rose pastel juste le long de la voie ferrée.", tips: "Préparez votre appareil photo lorsque les vols s'envolent en vagues le long du train." },
        { title: "Champs d'Or du Highveld & Prairie", vantage: "Salon Panoramique & Voiture-Club", time_window: "Départ de Pretoria & Gauteng", icon: "layers", desc: "Regardez la savane d'altitude et les anciens terrils céder la place à l'immensité du plateau central.", tips: "À savourer avec un espresso matinal pendant que le train atteint sa vitesse de croisière." }
      ],
      nl: [
        { title: "Grote Karoo Zonsondergang & Woestijnhorizons", vantage: "Panoramalounge Observatiewagon", time_window: "Namiddag tot Gouden Uur", icon: "sun", desc: "Ervaar de oneindige tafelbergen en acaciasilhoeëtten van de Karoo in gloeiend purper en goud door vloer-tot-plafond glas.", tips: "Kom 30 minuten voor zonsondergang naar de observatiewagon voor de beste fauteuils." },
        { title: "Hexrivier Bergpas & Spoorwegtunnels", vantage: "Clubwagon & Lounge Ramen", time_window: "Ochtend Afdaling naar West-Kaap", icon: "mountain", desc: "Bewonder hoe de trein door steile zandsteenketens en het 13,5 km lange tunnelsysteem naar smaragdgroene wijndalen kronkelt.", tips: "Zit aan de rechterkant van de loungewagon voor een spectaculair uitzicht op de bergkloof." },
        { title: "Kamfersdam Flamingo Zoutpannen", vantage: "Panoramaramen & Eetwagon", time_window: "Nadering van Kimberley Spoorwegknooppunt", icon: "compass", desc: "Aanschouw tienduizenden kleine flamingo's die het water van de zoutpan in pastelroze kleuren direct langs het spoor.", tips: "Houd je camera gereed als zwermen in golven langs de trein opstijgen." },
        { title: "Hoogveld Goudvelden & Graslanden", vantage: "Panoramalounge & Clubwagon", time_window: "Pretoria & Gauteng Vertrek", icon: "layers", desc: "Zie de glooiende hooglandsavanne en historische mijnhopen overgaan in de weidse vlakte van het centrale plateau.", tips: "Het beste te genieten met een ochtendespresso als de trein op cruisesnelheid komt." }
      ],
      es: [
        { title: "Atardecer en el Gran Karoo y Horizontes del Desierto", vantage: "Salón Panorámico del Coche Observatorio", time_window: "Tarde hasta la Hora Dorada", icon: "sun", desc: "Contemple las infinitas colinas y siluetas de acacias del Karoo bañadas en púrpura y oro a través de ventanales panorámicos de piso a techo.", tips: "Llegue al coche observatorio 30 minutos antes del atardecer para asegurar los mejores sillones." },
        { title: "Paso de Montaña Hex River y Túneles Ferroviarios", vantage: "Coche Club y Ventanales del Salón", time_window: "Descenso Matutino al Cabo Occidental", icon: "mountain", desc: "Maravíllese mientras el tren serpentea entre cordilleras de arenisca y el sistema de túneles de 13.5 km hacia valles de viñedos verde esmeralda.", tips: "Siéntese en el lado derecho del coche salón para disfrutar de vistas impresionantes del desfiladero." },
        { title: "Salinas de Flamingos de Kamfers Dam", vantage: "Ventanales Panorámicos y Coche Comedor", time_window: "Aproximación al Empalme de Kimberley", icon: "compass", desc: "Presencie decenas de miles de flamencos tiñendo las aguas saladas en rosa pastel justo al lado de las vías.", tips: "Tenga su cámara lista cuando las bandadas alcancen el vuelo junto al tren." },
        { title: "Campos de Oro y Pastizales del Highveld", vantage: "Salón Panorámico y Coche Club", time_window: "Salida de Pretoria y Gauteng", icon: "layers", desc: "Observe la sabana de gran altitud y las históricas minas dar paso a la vasta extensión de la meseta central.", tips: "Ideal para disfrutar con un café expreso matutino mientras el tren alcanza velocidad de crucero." }
      ],
      it: [
        { title: "Tramonto nel Grande Karoo & Orizzonti del Deserto", vantage: "Lounge Panoramica della Carrozza Osservatorio", time_window: "Tardo Pomeriggio fino all'Ora Dorata", icon: "sun", desc: "Vivi le infinite colline e le sagome di acacia del Karoo immerse in un rosso porpora e oro attraverso vetrate a tutta altezza.", tips: "Arriva nella carrozza osservatorio 30 minuti prima del tramonto per i posti migliori." },
        { title: "Passo Montano Hex River & Gallerie Ferroviarie", vantage: "Finestre Carrozza Club & Lounge", time_window: "Discesa Mattutina verso il Capo Occidentale", icon: "mountain", desc: "Ammira il treno che serpeggia tra imponenti catene di arenaria e il sistema di gallerie di 13,5 km verso valli di vigneti smeraldo.", tips: "Siediti sul lato destro della carrozza lounge per una vista mozzafiato sulle gole." },
        { title: "Saline dei Fenicotteri di Kamfers Dam", vantage: "Finestre Panoramiche & Carrozza Ristorante", time_window: "Avvicinamento allo Snodo di Kimberley", icon: "compass", desc: "Osserva decine di migliaia di fenicotteri rosa che tingono le acque della salina di rosa pastello proprio accanto ai binari.", tips: "Tieni la fotocamera pronta quando gli stormi prendono il volo a fianco del treno." },
        { title: "Campi Dorati & Praterie dell'Highveld", vantage: "Lounge Panoramica & Carrozza Club", time_window: "Partenza da Pretoria e Gauteng", icon: "layers", desc: "Guarda la savana ad alta quota e i cumuli delle miniere storiche cedere il passo alla vasta distesa dell'altopiano centrale.", tips: "Da gustare con un espresso mattutino mentre il treno raggiunge la velocità di crociera." }
      ],
      pt: [
        { title: "Pôr do Sol no Grande Karoo & Horizontes do Deserto", vantage: "Salão Panorâmico da Carruagem Observatório", time_window: "Fim da Tarde até à Hora Dourada", icon: "sun", desc: "Sinta as infinitas colinas e silhuetas de acácia do Karoo banhadas em púrpura e ouro através de janelas panorâmicas do chão ao teto.", tips: "Chegue à carruagem observatório 30 minutos antes do anoitecer para obter os melhores lugares." },
        { title: "Desfiladeiro Hex River & Túneis Ferroviários", vantage: "Janelas da Carruagem Club & Salão", time_window: "Descida Matinal para o Cabo Ocidental", icon: "mountain", desc: "Maravilhe-se enquanto o comboio serpenteia pelas cordilheiras de arenito e pelo sistema de túneis de 13,5 km até vales de vinhedos verde-esmeralda.", tips: "Sente-se do lado direito da carruagem salão para vistas deslumbrantes da ravina." },
        { title: "Salinas de Flamingos de Kamfers Dam", vantage: "Janelas Panorâmicas & Carruagem Restaurante", time_window: "Aproximação ao Cruzamento de Kimberley", icon: "compass", desc: "Testemunhe dezenas de milhares de flamingos tingindo as águas salgadas em rosa pastel mesmo ao lado dos carris.", tips: "Tenha a câmara pronta quando os bandos levantarem voo em ondas ao lado do comboio." },
        { title: "Campos de Ouro & Pastagens do Highveld", vantage: "Salão Panorâmico & Carruagem Club", time_window: "Partida de Pretoria & Gauteng", icon: "layers", desc: "Observe a savana de alta altitude e os depósitos mineiros históricos a dar lugar à vasta extensão do planalto central.", tips: "Excelente para desfrutar com um café matinal enquanto o comboio atinge a velocidade de cruzeiro." }
      ],
      zh: [
        { title: "大卡鲁日落与沙漠地平线", vantage: "全景观览车厢包厢", time_window: "傍晚至黄金时刻", icon: "sun", desc: "透过落地全景玻璃，尽情体验卡鲁高原无尽平顶山丘与金合欢树剪影在夕阳余晖下染上的深红与金色。", tips: "请于黄昏前30分钟到达观景车厢，以抢占舒适的靠窗沙发座位。" },
        { title: "海克斯河山谷隘口与铁路隧道群", vantage: "俱乐部车厢与观景窗", time_window: "晨间降落至西开普省", icon: "mountain", desc: "赞叹列车蜿蜒穿过雄伟的砂岩山脉以及长达13.5公里的隧道系统，驶入翡翠般的葡萄园山谷。", tips: "坐在休息车厢右侧，可欣赏山谷峡谷的壮丽全景。" },
        { title: "坎弗斯水坝火烈鸟盐沼", vantage: "全景车窗与餐车", time_window: "接近金伯利铁路枢纽", icon: "compass", desc: "亲眼目睹数万只小火烈鸟将铁轨旁边的盐沼水域染成梦幻的淡粉红色。", tips: "当鸟群沿铁路线成群起飞时，请务必准备好相机。" },
        { title: "高地广阔金矿区与草原", vantage: "全景休息室与俱乐部车厢", time_window: "比勒陀利亚与豪登省出发", icon: "layers", desc: "看着起伏的高原草原和历史悠久的矿山废石堆逐渐过渡为中央高原的浩瀚天地。", tips: "当列车达到巡航速度时，品尝一杯晨间浓缩咖啡效果最佳。" }
      ],
      ja: [
        { title: "グレート・カルーの夕日と砂漠の水平線", vantage: "展望車パノラマラウンジ", time_window: "夕方からゴールデンアワー", icon: "sun", desc: "天井から床までのパノラマ玻璃越しに、夕陽の赤と金に染まるカルーの平頂山やアカシアのシルエットをご堪能ください。", tips: "黄昏の30分前に展望車へお越しいただくと、特等席のアームチェアを確保できます。" },
        { title: "ヘックス・リバー山脈峠と鉄道トンネル群", vantage: "クラブカー＆ラウンジ窓", time_window: "朝の西ケープ州への降下", icon: "mountain", desc: "列車がそびえ立つ砂岩山脈と13.5kmのトンネル群を抜け、エメラルド色の葡萄畑の谷へと進む様子をご覧ください。", tips: "渓谷の絶景を楽しむには、ラウンジカーの右側の席がおすすめです。" },
        { title: "カムファーズ・ダムのフラミンゴ塩湖", vantage: "パノラマウィンドウ＆ダイニングカー", time_window: "キンバリー分岐点への接近", icon: "compass", desc: "線路のすぐ脇にある塩湖の水面をパステルピンクに染める何万羽ものフラミンゴの群れを目撃できます。", tips: "鳥の群れが列車と並んで飛び立つ瞬間に備えて、カメラをご用意ください。" },
        { title: "ハイベルドの金鉱地帯と大草原", vantage: "パノラマラウンジ＆クラブカー", time_window: "プレトリア＆ハウテン出発", icon: "layers", desc: "高地のサバンナと歴史的な鉱山跡が、中央 plateau の大草原へと移り変わる風景をお楽しみください。", tips: "列車が巡航速度に達した頃、モーニングエスプレッソと共にお楽しみいただくのが最高です。" }
      ],
      ko: [
        { title: "그레이트 카루의 일몰과 사막의 지평선", vantage: "전망차 파노라마 라운지", time_window: "늦은 오후부터 골든 아워", icon: "sun", desc: "바닥에서 천장까지 연결된 파노라마 유리창을 통해 붉은빛과 금빛으로 물드는 카루의 아카시아 실루엣을 감상하세요.", tips: "일몰 30분 전에 전망차에 도착하시면 최고의 창가 안락의자를 확보하실 수 있습니다." },
        { title: "헥스 리버 산악 고개 및 철도 터널", vantage: "클럽 카 및 라운지 창가", time_window: "아침 웨스턴 케이프 진입", icon: "mountain", desc: "열차가 장엄한 사암 산맥과 13.5 km 터널 구간을 지나 에메랄드빛 포도밭 계곡으로 굽이쳐 들어가는 장관을 확인하세요.", tips: "계곡 절경을 감상하시려면 라운지 카 오른쪽 좌석에 앉으시는 것이 좋습니다." },
        { title: "캄퍼스 담 플라밍고 염호", vantage: "파노라마 창문 및 식당차", time_window: "킴벌리 분기점 진입 시", icon: "compass", desc: "수만 마리의 플라밍고가 철로 바로 옆 염호 수면을 파스텔 핑크빛으로 물들이는 장관을 목격하세요.", tips: "새 떼가 열차와 함께 날아오를 때를 대비해 카메라를 준비해 두세요." },
        { title: "하이벨드 금광 지대와 초원", vantage: "파노라마 라운지 및 클럽 카", time_window: "프리토리아 및 하우텡 출발", icon: "layers", desc: "완만한 고지대 사바나와 역사적인 광산 지대가 중앙 고원의 광활한 대지로 변해가는 모습을 관찰하세요.", tips: "열차가 정상 속도에 도달했을 때 모닝 에스프레소와 함께 즐기시는 것을 추천합니다." }
      ],
      hi: [
        { title: "ग्रेट करू सूर्यास्त और रेगिस्तानी क्षितिज", vantage: "ऑब्जर्वेशन कार पैनोरमिक लाउंज", time_window: "देर दोपहर से सुनहरा घंटा", icon: "sun", desc: "फर्श से छत तक कांच की खिड़कियों के माध्यम से करू के लाल और सुनहरे रंग में रंगे विशाल पहाड़ियों और बबूल के पेड़ों के दृश्यों का अनुभव करें।", tips: "सर्वोत्तम आर्मचेयर बैठने के लिए गोधूलि से 30 मिनट पहले ऑब्जर्वेशन कार में पहुँचें।" },
        { title: "हेक्स रिवर माउंटेन पास और रेलवे सुरंगे", vantage: "क्लब कार और लाउंज खिड़कियां", time_window: "सुबह पश्चिमी केप में उतरना", icon: "mountain", desc: "बलुआ पत्थर की पर्वत श्रृंखलाओं और 13.5 किमी सुरंग प्रणाली के माध्यम से अंगूर के बागों की घाटियों में गुजरती ट्रेन को देखकर चकित हों।", tips: "पहाड़ी घाटी के दृश्यों के लिए लाउंज कार के दाहिने तरफ बैठें।" },
        { title: "कामफर्स डैम फ्लेमिंगो साल्ट पैन", vantage: "पैनोरमिक खिड़कियां और डाइनिंग कार", time_window: "किम्बरली रेल जंक्शन के पास", icon: "compass", desc: "रेल की पटरियों के ठीक साथ खारे पानी को गुलाबी रंग में रंगने वाले हजारों फ्लेमिंगो पक्षियों को देखें।", tips: "जब पक्षी ट्रेन के साथ उड़ान भरें तो अपना कैमरा तैयार रखें।" },
        { title: "हाईवेल्ड सोने के मैदान और घास के मैदान", vantage: "पैनोरमिक लाउंज और क्लब कार", time_window: "प्रिटोरिया और गोटेंग प्रस्थान", icon: "layers", desc: "ऊंचाई वाले सवाना और ऐतिहासिक खदानों को मध्य पठार के विशाल मैदान में बदलते देखें।", tips: "सुबह के एस्प्रेसो के साथ सबसे अच्छा आनंद लिया जाता है जब ट्रेन अपनी गति पकड़ती है।" }
      ],
      ru: [
        { title: "Закат в Великом Кару и Пустынные Горизонты", vantage: "Панорамный Салон Вагона-Обсерватории", time_window: "Поздний Дневной Свет - Золотой Час", icon: "sun", desc: "Насладитесь бескрайними холмами и силуэтами акаций Кару, окрашенными в пурпурные и золотые тона сквозь панорамные окна от пола до потолка.", tips: "Приходите в вагон-обсерваторию за 30 минут до заката, чтобы занять лучшие кресла." },
        { title: "Горный Перевал Хекс-Ривер и Железнодорожные Тоннели", vantage: "Окна Клубного Вагона и Салона", time_window: "Утренний Спуск в Западный Кап", icon: "mountain", desc: "Полюбуйтесь, как поезд извивается среди величественных песчаниковых гор и 13,5-километровой системы тоннелей к виноградным долинам.", tips: "Садитесь с правой стороны вагона-салона, чтобы увидеть ущелья во всей красоте." },
        { title: "Солончаки Фламинго в Камферс-Дам", vantage: "Панорамные Окна и Вагон-Ресторан", time_window: "Приближение к Железнодорожному Узлу Кимберли", icon: "compass", desc: "Узрите десятки тысяч малых фламинго, окрашивающих воды солончака в пастельно-розовый цвет прямо вдоль путей.", tips: "Держите камеру наготове, когда стаи взлетают волнами вдоль поезда." },
        { title: "Золотые Поля и Злаковые Равнины Хайвелда", vantage: "Панорамный Салон и Клубный Вагон", time_window: "Отправление из Претории и Гаутенга", icon: "layers", desc: "Наблюдайте, как высокогорная саванна и исторические терриконы сменяются бескрайними просторами центрального плато.", tips: "Лучше всего наслаждаться утренним эспрессо, когда поезд набирает крейсерскую скорость." }
      ],
      ar: [
        { title: "غروب الشمس في كارو الكبرى وآفاق الصحراء", vantage: "صالة عربة المراقبة البانورامية", time_window: "أواخر بعد الظهر إلى الساعة الذهبية", icon: "sun", desc: "استمتع بمشاهدة التلال الشاسعة وظلال أشجار الأكاسيا في كارو المغطاة باللون القرمزي والذهبي عبر نوافذ بانورامية من الأرض إلى السقف.", tips: "وصل إلى عربة المراقبة قبل 30 دقيقة من الغروب للحصول على أفضل المقاعد." },
        { title: "ممر جبل هيكس ريفر وأنفاق السكك الحديدية", vantage: "نوافذ عربة النادي والصالة", time_window: "النزول الصباحي إلى كيب الغربية", icon: "mountain", desc: "اندهش عندما يلتف القطار بين سلاسل الجبال الرملية الشاهقة ونظام الأنفاق البالغ طوله 13.5 كم إلى وديان مزارع الكروم.", tips: "اجلس على الجانب الأيمن من عربة الصالة لمشاهدة الممرات الجبلية المذهلة." },
        { title: "بحيرة فلامنجو في سد كامفرز", vantage: "نوافذ بانورامية وعربة الطعام", time_window: "الاقتراب من تقاطع سكة حديد كيمبرلي", icon: "compass", desc: "شاهد عشرات الآلاف من طيور الفلامنجو تلون مياه البحيرة باللون الوردي الفاتح بجوار مسارات القطار مباشرة.", tips: "اجعل كاميرتك جاهزة عندما تطير أسراب الطيور بجانب القطار." },
        { title: "حقول الذهب والمراعي في هايفيلد", vantage: "صالة بانورامية وعربة النادي", time_window: "المغادرة من بريتوريا وهاوتينج", icon: "layers", desc: "شاهد السافانا المرتفعة ومناجم الذهب التاريخية وهي تتحول إلى المساحة الشاسعة للهضبة المركزية.", tips: "يفضل الاستمتاع بها مع قهوة إسبريسو الصباح عندما يصل القطار إلى سرعته الكاملة." }
      ]
    };

    if (isBlue) {
      return blueScenery[lang] || [
        { title: "The Great Karoo Sunset & Desert Horizons", vantage: "Observation Car Panoramic Lounge", time_window: "Late Afternoon to Golden Hour", icon: "sun", desc: "Experience the infinite flat-topped kopjes and acacia silhouettes of the Karoo bathed in glowing crimson and gold through floor-to-ceiling panoramic glass.", tips: "Arrive at the Observation Car 30 minutes before twilight for prime armchair seating." },
        { title: "Hex River Mountain Pass & Railway Tunnels", vantage: "Club Car & Lounge Windows", time_window: "Morning Descent into Western Cape", icon: "mountain", desc: "Marvel as the train snakes through towering sandstone ranges and the 13.5 km tunnel system into emerald vineyard valleys.", tips: "Sit on the right side of the lounge car for sheer mountain ravine views." },
        { title: "Kamfers Dam Flamingo Salt Pans", vantage: "Panoramic Windows & Dining Car", time_window: "Approaching Kimberley Rail Junction", icon: "compass", desc: "Witness tens of thousands of lesser flamingos tinting the salt pan waters in pastel pink right along the rail tracks.", tips: "Have your camera ready as flocks take flight in waves alongside the train." },
        { title: "Highveld Open Goldfields & Grasslands", vantage: "Panoramic Lounge & Club Car", time_window: "Pretoria & Gauteng Departure", icon: "layers", desc: "Watch the rolling high-altitude savannah and historic mine dumps transition into the wide-open expanse of the central plateau.", tips: "Best enjoyed with morning espresso as the train reaches cruising speed." }
      ];
    } else {
      return [
        { title: "Open-Air Balcony Sunset & Stargazing", vantage: "Rear Open Observation Balcony", time_window: "Twilight to Deep Desert Night", icon: "sparkles", desc: "Step onto the open teak balcony at the very rear of the train. Feel the crisp Karoo air and watch the tracks vanish under a starry Milky Way.", tips: "The open balcony offers 100% glare-free photography and an immersive soundscape." },
        { title: "Hex River Mountain Viaducts & 4 Tunnels", vantage: "Observation Car & Teak Balcony", time_window: "Day 3 Morning Winelands Descent", icon: "mountain", desc: "The vintage train negotiates the steep 1-in-40 gradient through 4 historic mountain tunnels with views over Cape Dutch homesteads.", tips: "The rear balcony provides stunning views of the curved train winding across stone viaducts." },
        { title: "Matjiesfontein Victorian Desert Village", vantage: "Observation Lounge & Open Balcony", time_window: "Afternoon Arrival in Little Karoo", icon: "compass", desc: "Glide into the preserved 19th-century railway village of Matjiesfontein, framed by the rugged Witteberge peaks and cast-iron lamps.", tips: "Listen for the traditional bugle call summoning passengers to the platform." },
        { title: "Vaal River Crossing & Maize Triangle", vantage: "1920s Dining Car & Suites", time_window: "Day 1 Afternoon Highveld Transit", icon: "wind", desc: "Cross the Vaal River border into the Free State plains, watching springbok and native birdlife scatter across the grasslands.", tips: "Keep watch from the wood-framed picture windows during afternoon high tea." }
      ];
    }
  }

  function getDiningInLanguage(trainId, langCode) {
    const isBlue = trainId === 'blue-train';
    const lang = langCode || 'en';

    const blueDining = {
      af: [
        { title: "5-Gang Fynproewer Silwerdiens", icon: "utensils", desc: "Sjefs van wêreldgehalte berei vars Suid-Afrikaanse geregte voor, insluitend Karoolamsvleis, Knysna-oesters en Kaaps-Maleise fusie, bedien op fyn porselein met kristalglasware en wynpassings." },
        { title: "Die Swaaiwa & Hoëtee", icon: "coffee", desc: "Weelderige fluweelsitplekke, wye panoramiese vensters en klassieke musiek skep die perfekte opset vir middaaghoëtee met handgemaakte gebak." },
        { title: "Die Klubwa", icon: "wine", desc: "'n Intieme herenklub-atmosfeer met warm houtpanele, edel ou kognak, Kubaanse sigare en 'n geanotateerde biblioteek." }
      ],
      zu: [
        { title: "Inkonzo Yevesi LezoKudla NeWayini ze-5-Course", icon: "utensils", desc: "Abapheki abakhulu balungisa ukudla okusha kwaseNingizimu Afrika okufaka iwundlu laseKaroo, izimbaza zaseKnysna, ne-Cape Malay fusion, kulethwa emaphathini amahle aphalazelwe ngengilazi yekristalu newayini." },
        { title: "Imoto Yelounge & Iti Eliphakeme", icon: "coffee", desc: "Izihlalo zevelvet ezithambile, amafasitela abukekayo anombono omkhulu, nomculo wasendulo kudala indawo enhle yetiye lantambama namakhekhe athandekayo." },
        { title: "Imoto YeKlabhu", icon: "wine", desc: "Indawo esondelelene yeklabhu yamadoda enezimbambo zokhuni ezifudumele, amakhonyakhile anamathuba amadala, ama-cigars aseCuba, nomtapo wolwazi ocwaningiwe." }
      ],
      xh: [
        { title: "Izidlo ezikhethekileyo ze-5-Course Silver Service", icon: "utensils", desc: "Aabapheki abaphezulu balungisa ukudla okutsha kwaseMzantsi Afrika kubandakanya iyakala laseKaroo, iimbaza zaseKnysna, nentlanganisela yaseCape Malay, inikezelwa kwimiphetho ye-china nakwiiglasi zekristale." },
        { title: "I-Lounge Car ne-High Tea", icon: "coffee", desc: "Izihlalo ze-velvet ezithambileyo, iifestile ezinkulu, nomculo weklasiki udala indawo egqibeleleyo yeti yasemva kwemini namakhekhe abunjwe ngezandla." },
        { title: "I-Club Car", icon: "wine", desc: "Indawo eyodwa yeklabhu yamadoda enemiqadi yomthi efudumeleyo, iikonyaki ezindala ezintle, iisikali zaseCuba, nethala leencwadi elikhethiweyo." }
      ],
      de: [
        { title: "5-Gänge-Gourmet-Silberservice", icon: "utensils", desc: "Meisterköche bereiten frische südafrikanische Küche zu, darunter Karoo-Lamm, Knysna-Austern und Cape-Malay-Fusion, serviert auf feinstem Porzellan mit Kristallgläsern und passenden Weinen." },
        { title: "Der Salongewagen & Nachmittagstee", icon: "coffee", desc: "Edle Samtsitze, große Panoramafenster und klassische Musik schaffen die perfekte Kulisse für den Nachmittagstee mit handgefertigter Patisserie." },
        { title: "Der Clubwagen", icon: "wine", desc: "Eine intime Herrenclub-Atmosphäre mit warmer Holzvertäfelung, edlem Vintage-Cognac, kubanischen Zigarren und einer kuratierten Bibliothek." }
      ],
      fr: [
        { title: "Service en Argent Gastronomique 5 Plats", icon: "utensils", desc: "Des chefs cuisiniers préparent une cuisine sud-africaine fraîche incluant l'agneau du Karoo, les huîtres de Knysna et la fusion Cape Malay, servie sur porcelaine fine avec verrerie en cristal et accords mets-vins." },
        { title: "Voiture-Salon & Thé de l'Après-Midi", icon: "coffee", desc: "Des sièges en velours moelleux, de larges baies panoramiques et de la musique classique créent le cadre parfait pour le thé de l'après-midi accompagné de pâtisseries artisanales." },
        { title: "Voiture-Club", icon: "wine", desc: "Une atmosphère intime de club pour gentlemen avec de chaleureux lambris en bois, des cognacs millésimés raffinés, des cigares cubains et une bibliothèque sélectionnée." }
      ],
      nl: [
        { title: "5-Gangen Gastronomische Zilverservice", icon: "utensils", desc: "Chef-koks bereiden verse Zuid-Afrikaanse gerechten, waaronder Karoo-lamsvlees, Knysna-oesters en Cape Malay-fusie, geserveerd op fijn porselein met kristallen glazen en bijpassende wijnen." },
        { title: "Het Rijtuig & High Tea", icon: "coffee", desc: "Zachte fluwelen stoelen, brede panoramische ramen en klassieke muziek creëren de perfecte sfeer voor afternoon high tea met ambachtelijk gebak." },
        { title: "De Clubcar", icon: "wine", desc: "Een intieme herenclubsfeer met warme houtpanelen, fijne vintage cognacs, Cubaanse sigaren en een gecureerde bibliotheek." }
      ],
      es: [
        { title: "Servicio de Plata Gourmet de 5 Tiempos", icon: "utensils", desc: "Chefs galardonados preparan gastronomía sudafricana fresca como cordero de Karoo, ostras de Knysna y fusión Cape Malay, servida en vajilla fina con cristalería y maridaje de vinos." },
        { title: "Coche Salón y Té de la Tarde", icon: "coffee", desc: "Asientos de terciopelo, amplios ventanales panorámicos y música clásica crean el ambiente perfecto para el té de la tarde con repostería artesanal." },
        { title: "El Coche Club", icon: "wine", desc: "Un ambiente íntimo de club con paneles de madera cálida, finos coñacs añejos, puros cubanos y una biblioteca seleccionada." }
      ],
      it: [
        { title: "Servizio d'Argento Gourmet a 5 Portate", icon: "utensils", desc: "Master chef preparano una fresca cucina sudafricana tra cui agnello del Karoo, ostriche di Knysna e fusion Cape Malay, serviti su porcellane fini con bicchieri di cristallo e abbinamenti di vini." },
        { title: "Carrozza Lounge & Tè del Pomeriggio", icon: "coffee", desc: "Morbide sedute in velluto, ampie vetrate panoramiche e musica classica creano l'atmosfera perfetta per il tè del pomeriggio accompagnato da pasticceria artigianale." },
        { title: "La Carrozza Club", icon: "wine", desc: "Un'intima atmosfera da club per gentiluomini con caldi pannelli in legno, pregiati cognac d'epoca, sigari cubani e una biblioteca selezionata." }
      ],
      pt: [
        { title: "Serviço de Prata Gourmet de 5 Pratos", icon: "utensils", desc: "Chefs renomados preparam gastronomia sul-africana fresca incluindo cordeiro do Karoo, ostras de Knysna e fusão Cape Malay, servida em porcelana fina com copos de cristal e harmonização de vinhos." },
        { title: "Carruagem Lounge & Chá da Tarde", icon: "coffee", desc: "Assentos de veludo, amplas janelas panorâmicas e música clássica criam o cenário perfeito para o chá da tarde com pastelaria artesanal." },
        { title: "A Carruagem Club", icon: "wine", desc: "Um ambiente íntimo de clube para cavalheiros com painéis de madeira acolhedores, conhaques vintage finos, charutos cubanos e uma biblioteca selecionada." }
      ],
      zh: [
        { title: "五道菜尊贵银器餐饮服务", icon: "utensils", desc: "名厨精心烹制包括卡鲁羊肉、克尼斯纳蚝和开普马来融合料理在内的精美南非美食，使用精美瓷器、水晶高脚杯并搭配侍酒师推荐佳酿。" },
        { title: "全景休息车厢与下午茶", icon: "coffee", desc: "长绒天鹅绒座椅、宽阔的全景车窗和古典音乐，为享用手作精致糕点的下午茶营造出完美氛围。" },
        { title: "绅士俱乐部车厢", icon: "wine", desc: "私密高雅的绅士俱乐部氛围，配备温馨的木质壁板、珍藏名贵干邑、古巴雪茄以及精选图书馆。" }
      ],
      ja: [
        { title: "5コース・高貴なシルバーディナーサービス", icon: "utensils", desc: "カルー産子羊、克尼斯纳牡蛎、ケープ・マレー・フュージョンなど、南アフリカの新鮮な厳選食材を最高級磁器とクリスタルグラス、ソムリエ厳選ワインと共にご提供。" },
        { title: "ラウンジカー＆アフタヌーンティー", icon: "coffee", desc: "豪華なベルベットシート、広大なパノラマウィンドウ、クラシック音楽が、ハンドメイドの洋菓子と共にいただく午後のハイティーの最高のひとときを演出します。" },
        { title: "ザ・クラブカー", icon: "wine", desc: "温かみのある木目調パネル、ヴィンテージコニャック、キューバ産シガー、厳選されたライブラリーを備えた上質な紳士クラブの雰囲気を演出。" }
      ],
      ko: [
        { title: "5코스 고품격 실버 서비스 식사", icon: "utensils", desc: "마스터 셰프가 카루 양고기, 니스나 굴, 케이프 말레이 퓨전 등 신선한 남아프리카 요리를 최고급 도자기와 크리스탈 글라스, 소믈리에 와인 페어링과 함께 준비합니다." },
        { title: "라운지 카 & 하이 티", icon: "coffee", desc: "폭신한 벨벳 좌석, 넓은 파노라마 창문, 클래식 음악이 수제 패티세리와 함께 즐기는 애프터눈 하이 티의 완벽한 분위기를 연출합니다." },
        { title: "더 클럽 카", icon: "wine", desc: "따뜻한 원목 패널, 고급 빈티지 코냑, 쿠바 시가, 엄선된 라이브러리를 갖춘 아늑한 젠틀맨 클럽 분위기를 제공합니다." }
      ],
      hi: [
        { title: "5-कोर्स लक्जरी सिल्वर सर्विस डाइनिंग", icon: "utensils", desc: "मास्टर शेफ करू मेमने, नाइस्ना सीप और केप मलय व्यंजन सहित ताजा दक्षिण अफ्रीकी व्यंजन तैयार करते हैं, जो ठीक चीनी मिट्टी के बर्तनों और वाइन के साथ परोसे जाते हैं।" },
        { title: "द लाउंज कार और हाई टी", icon: "coffee", desc: "आलीशान मखमली बैठने की जगह, चौड़ी पैनोरमिक खिड़कियां और शास्त्रीय संगीत दोपहर की चाय और हस्तनिर्मित पेस्ट्री के लिए सही माहौल बनाते हैं।" },
        { title: "द क्लब कार", icon: "wine", desc: "लकड़ी की सजावट, पुरानी कोन्याक, क्यूबा सिगार और एक क्यूरेटेड पुस्तकालय के साथ एक अंतरंग पुरुषों का क्लब माहौल।" }
      ],
      ru: [
        { title: "Gourmet Silver Service из 5 Блюд", icon: "utensils", desc: "Шеф-повара готовят свежие блюда южноафриканской кухни, включая ягненка Кару, найсненских устриц и фьюжн Кейп-Малай, подаваемые на изысканном фарфоре с хрусталем и вином." },
        { title: "Вагон-Салон и Дневной Чай", icon: "coffee", desc: "Бархатные кресла, панорамные окна и классическая музыка создают идеальную атмосферу для послеполуденного чаепития с авторской выпечкой." },
        { title: "Вагон-Клуб", icon: "wine", desc: "Уютная атмосфера джентльменского клуба с деревянными панелями, выдержанным коньяком, кубинскими сигарами и библиотекой." }
      ],
      ar: [
        { title: "خدمة الفضة الفاخرة مكونة من 5 أطباق", icon: "utensils", desc: "يطهو كبار الطهاة المأكولات الفاخرة من جنوب أفريقيا بما في ذلك لحم الضأن والمحار، وتُقدم على أدوات صينية فاخرة وزجاج كريستالي." },
        { title: "عربة الاستراحة وشاي بعد الظهيرة", icon: "coffee", desc: "مقاعد مخملية فاخرة، ونوافذ بانورامية واسعة، وموسيقى كلاسيكية تخلق الأجواء المثالية لشاي بعد الظهيرة مع الحلويات." },
        { title: "عربة النادي", icon: "wine", desc: "أجواء نادي السادة الخاص مع ألواح خشبية دافئة، والمشروبات الفاخرة، والسجائر الكوبية، ومكتبة منتقاة." }
      ]
    };

    if (isBlue) {
      return blueDining[lang] || [
        { title: "5-Course Gourmet Silver Service", icon: "utensils", desc: "Master chefs prepare fresh South African cuisine including Karoo lamb, Knysna oysters, and Cape Malay fusion, served on fine china with crystal glassware and sommelier wine pairings." },
        { title: "The Lounge Car & High Tea", icon: "coffee", desc: "Plush velvet seating, wide panoramic windows, and classical music create the perfect setting for afternoon high tea with handcrafted patisseries." },
        { title: "The Club Car", icon: "wine", desc: "An intimate gentlemen's club atmosphere with warm wood paneling, fine vintage cognacs, Cuban cigars, and a curated library." }
      ];
    }
    return [
      { title: "1920s Dining Saloon & Fine Cape Wines", icon: "utensils", desc: "Pre-1950s teak-paneled dining car with period-style victorian tableware, roasted Karoo venison, and award-winning Stellenbosch vintages." },
      { title: "Observation Lounge & Afternoon High Tea", icon: "coffee", desc: "Deep leather armchairs, open-air rear balcony, and freshly baked scones served during afternoon Karoo transit." },
      { title: "Gentlemen's Club Lounge & Library", icon: "wine", desc: "Polished mahogany paneling, single malt whiskies, cigars, and vintage rail map archives for discerning travelers." }
    ];
  }

  function getLocomotiveHeritageInLanguage(trainId, langCode) {
    const isBlue = trainId === 'blue-train';
    const lang = langCode || 'en';

    const blueHeritage = {
      af: {
        title: "Dubbelkrag Hoëspoed-spoorweningenieurswese",
        desc: "Toegerus met gespesialiseerde luggeveerde draaistelle en goudgecoate dubbelglasvensters, gly Die Blou Trein bijkans geruisloos oor Suid-Afrika se ruwe Karoo-terrein.",
        specs: [
          { label: "Kruisspoed", val: "90 km/h (Gladde Lugvering)" },
          { label: "Lokomotiefkrag", val: "Dubbel Elektries & Dieselelektries" },
          { label: "Akoestiese Glas", val: "Goudgecoate Termiese Dubbelglas" },
          { label: "Presidensiële Geskiedenis", val: "75+ Jaar · Mandela & Wêreldmonarge" }
        ]
      },
      zu: {
        title: "Ubunjiniyela Bamasitimela Anamandla Amabili Asheshayo",
        desc: "Ifakwe amabhogi akhethekile amisiwe anama-air-cushioned namafasitela anezingqimba ezimbili ezivikelwe ngegolide, Isitimela Esibluu sihamba ngomoya cishe ngokuthula ezindaweni ezimbi zaseKaroo eNingizimu Afrika.",
        specs: [
          { label: "Ijubane Lokuhamba", val: "90 km/h (Ukumiswa Komoya Okushelelayo)" },
          { label: "Amandla Esitimela", val: "Ugesi Osebenzisa Ugesi ne-Diesel" },
          { label: "Ingilazi Yomsindo", val: "Ingilazi Ekabili Eyalulwe ngeGolide" },
          { label: "Umlando WeziNhloko", val: "Imnyaka engu-75+ · U-Mandela nAbabusi" }
        ]
      },
      xh: {
        title: "Ubunjineli Bikaloliwe Onamandla Amabini Akhawulezayo",
        desc: "Ifakwe amavili akhethekileyo anomoya neefestile ezigqunywe ngegolide, ITreni Ebluu ihamba ngokungxola kancinci kummandla warhabaxa wemihlaba yaseKaroo.",
        specs: [
          { label: "Isantya Sokuqhuba", val: "90 km/h (Uhambo Olushelelayo)" },
          { label: "Amandla Kaloliwe", val: "I-Electric ne-Diesel-Electric" },
          { label: "Iglasi Yomsindo", val: "Iglasi Egcwelwe ngeGolide" },
          { label: "Imbali Yomongameli", val: "Iminyaka engu-75+ · U-Mandela noKumkani" }
        ]
      },
      de: {
        title: "Dual-Power Hochgeschwindigkeits-Eisenbahntechnik",
        desc: "Ausgestattet mit spezialisierten luftgefederten Drehgestellen und goldbeschichteten Doppelglasfenstern gleitet Der Blaue Zug nahezu lautlos über das raue Karoo-Terrain Südafrikas.",
        specs: [
          { label: "Reisegeschwindigkeit", val: "90 km/h (Sanfte Luftfederung)" },
          { label: "Lokomotivleistung", val: "Dual Elektro- & Diesel-Elektrisch" },
          { label: "Schallschutzglas", val: "Goldbeschichtete Doppelverglasung" },
          { label: "Präsidentengeschichte", val: "75+ Jahre · Mandela & Weltmonarchen" }
        ]
      },
      fr: {
        title: "Ingénierie Ferroviaire à Grande Vitesse Bi-Mode",
        desc: "Équipé de bogies à suspension pneumatique spécialisés et de vitres isolantes à double vitrage dorées à l'or fin, Le Train Bleu glisse presque silencieusement à travers le relief rocailleux du Karoo.",
        specs: [
          { label: "Vitesse de Croisière", val: "90 km/h (Suspension Pneumatique Douce)" },
          { label: "Puissance de la Locomotive", val: "Bi-Mode Électrique & Diesel-Électrique" },
          { label: "Verre Acoustique", val: "Double Vitrage Thermique Plaqué Or" },
          { label: "Histoire Présidentielle", val: "75+ Ans · Mandela & Monarques Mondiaux" }
        ]
      },
      nl: {
        title: "Dual-Power Hogesnelheidstrein Engineering",
        desc: "Uitgerust met gespecialiseerde luchtgeveerde draaistellen en goudgecoate dubbele ramen glijdt De Blauwe Trein vrijwel geluidloos over het ruige Karoo-terrein.",
        specs: [
          { label: "Cruisesnelheid", val: "90 km/u (Zachte Luchtvering)" },
          { label: "Locomotiefvermogen", val: "Dual Elektrisch & Diesel-Elektrisch" },
          { label: "Akoestisch Glas", val: "Goudgecoat Thermisch Dubbel Glas" },
          { label: "Presidentiële Historie", val: "75+ Jaar · Mandela & Wereldmonarchen" }
        ]
      },
      es: {
        title: "Ingeniería Ferroviaria Bi-Modo de Alta Velocidad",
        desc: "Equipado con bogies de suspensión neumática y ventanas térmicas de doble panel bañadas en oro, El Tren Azul se desliza casi en silencio por el terreno del Karoo.",
        specs: [
          { label: "Velocidad de Crucero", val: "90 km/h (Suspensión Neumática Suave)" },
          { label: "Potencia de la Locomotora", val: "Bi-Modo Eléctrico y Diésel-Eléctrico" },
          { label: "Cristal Acústico", val: "Doble Cristal Térmico con Baño de Oro" },
          { label: "Historia Presidencial", val: "75+ Años · Mandela y Monarcas Mundiales" }
        ]
      },
      it: {
        title: "Ingegneria Ferroviaria ad Alta Velocità Bi-Modale",
        desc: "Dotato di carrelli con sospensioni pneumatiche e finestrini a doppio vetro termico placcati in oro, Il Treno Blu scivola quasi in silenzio sul territorio del Karoo.",
        specs: [
          { label: "Velocità di Crociera", val: "90 km/h (Sospensioni Pneumatiche Fluidhe)" },
          { label: "Potenza Locomotiva", val: "Bi-Modale Elettrico e Diesel-Elettrico" },
          { label: "Vetro Acustico", val: "Doppio Vetro Termico Placcato Oro" },
          { label: "Storia Presidenziale", val: "75+ Anni · Mandela e Monarchi Mondiali" }
        ]
      },
      pt: {
        title: "Engenharia Ferroviária Bi-Modo de Alta Velocidade",
        desc: "Equipado com bogies de suspensão pneumática e janelas térmicas duplas revestidas a ouro, O Comboio Azul desliza quase em silêncio pelo terreno do Karoo.",
        specs: [
          { label: "Velocidade de Cruzeiro", val: "90 km/h (Suspensão Pneumática Suave)" },
          { label: "Potência da Locomotiva", val: "Bi-Modo Elétrico e Diesel-Elétrico" },
          { label: "Vidro Acústico", val: "Vidro Duplo Térmico com Revestimento a Ouro" },
          { label: "História Presidencial", val: "75+ Anos · Mandela e Monarcas Mundiais" }
        ]
      },
      zh: {
        title: "双动力高速铁路工程技术",
        desc: "蓝色列车配备专门的气垫悬挂转向架和镀金隔热双层玻璃车窗，在南非坎坷的卡鲁高原上近乎无声地平稳行驶。",
        specs: [
          { label: "巡航速度", val: "90 公里/小时 (平稳气垫悬挂)" },
          { label: "机车动力", val: "电力与柴电力双动力" },
          { label: "隔音玻璃", val: "镀金隔热双层真空玻璃" },
          { label: "总统与元首历史", val: "75+ 年历史 · 曼德拉与世界君主" }
        ]
      },
      ja: {
        title: "デュアルパワー高速鉄道工学",
        desc: "特殊なエアサスペンション台車と金粉コーティング二重断熱ガラスを備え、ザ・ブルー・トレインは荒々しいカルーの台地をほぼ無音で滑らかに走破します。",
        specs: [
          { label: "巡航速度", val: "90 km/h (滑らかなエアサスペンション)" },
          { label: "機関車動力", val: "電気＆ディーゼル電気のデュアル動力" },
          { label: "遮音ガラス", val: "金コーティング二重断熱遮音ガラス" },
          { label: "大統領・元首の歴史", val: "75年以上の歴史 · マンデラ氏や世界君主" }
        ]
      },
      ko: {
        title: "듀얼 파워 고속 철도 공학",
        desc: "특수 에어 쿠션 서스펜션 대차와 금분 코팅 이중 단열 유리창을 갖춘 더 블루 트레인은 남아프리카의 거친 카루 지형을 거의 무소음으로 미끄러지듯 주행합니다.",
        specs: [
          { label: "운행 속도", val: "90 km/h (부드러운 에어 서스펜션)" },
          { label: "기관차 동력", val: "전기 및 디젤-전기 듀얼 파워" },
          { label: "차음 유리", val: "금 코팅 이중 단열 차음 유리" },
          { label: "대통령 및 역사", val: "75년 이상의 역사 · 만델라 및 세계 국왕" }
        ]
      },
      hi: {
        title: "ड्यूल-पावर हाई-स्पीड रेल इंजीनियरिंग",
        desc: "विशेष एयर-कुशन सस्पेंशन और सोने की परत वाली इंसुलेटेड खिड़कियों से लैस, द ब्लू ट्रेन दक्षिण अफ्रीका के करू इलाके में लगभग चुपचाप चलती है।",
        specs: [
          { label: "क्रूज़िंग गति", val: "90 किमी/घंटा (स्मूथ एयर सस्पेंशन)" },
          { label: "लोकोमोटिव पावर", val: "ड्यूल इलेक्ट्रिक और डीजल-इलेक्ट्रिक" },
          { label: "ध्वनि इन्सुलेशन ग्लास", val: "गोल्ड-कोटेड डबल ग्लास" },
          { label: "राष्ट्रपति का इतिहास", val: "75+ वर्ष · मंडेला और विश्व राजा" }
        ]
      },
      ru: {
        title: "Двухрежимная Высокоскоростная Железнодорожная Инженерия",
        desc: "Оснащенный пневматическими тележками и двойными стеклами с золотым напылением, Синий Поезд бесшумно скользит по суровой местности Кару.",
        specs: [
          { label: "Крейсерская Скорость", val: "90 км/ч (Плавная Пневмоподвеска)" },
          { label: "Мощность Локомотива", val: "Двухрежимный Электро и Дизель-Электро" },
          { label: "Акустическое Стекло", val: "Двойной Стеклопакет с Напылением Золота" },
          { label: "Президентская История", val: "75+ Лет · Мандела и Монархи Мира" }
        ]
      },
      ar: {
        title: "هندسة السكك الحديدية عالية السرعة مزدوجة الطاقة",
        desc: "مزود بعربات تعليق هوائية خاصة ونوافذ مزدوجة عازلة مطلية بالذهب، ينزلق القطار الأزرق بهدوء تام عبر أراضي كارو.",
        specs: [
          { label: "سرعة الإبحار", val: "90 كم/ساعة (تعليق هوائي سلس)" },
          { label: "قوة القاطرة", val: "كهربائي مزدوج وديزل-كهربائي" },
          { label: "الزجاج العازل للصوت", val: "زجاج مزدوج عازل مطلي بالذهب" },
          { label: "التاريخ الرئاسي", val: "أكثر من 75 عاماً · مانديلا وملوك العالم" }
        ]
      }
    };

    if (isBlue) {
      return blueHeritage[lang] || {
        title: "Dual-Power High-Speed Rail Engineering",
        desc: "Equipped with specialized air-cushioned suspension bogies and gold-dusted insulated double-pane windows, The Blue Train glides almost silently across South Africa's rugged Karoo terrain.",
        specs: [
          { label: "Cruising Speed", val: "90 km/h (Smooth Air-Suspension)" },
          { label: "Locomotive Power", val: "Dual Electric & Diesel-Electric" },
          { label: "Acoustic Glass", val: "Gold-Coated Thermal Double Glazing" },
          { label: "Presidential History", val: "75+ Years · Mandela & World Monarchs" }
        ]
      };
    }
    return {
      title: "Class 6 & 15E Steam & Diesel Heritage",
      desc: "Rovos Rail operates meticulously restored Class 6 and 15E vintage locomotives alongside modern diesel engines for heavy mountain grade ascents.",
      specs: [
        { label: "Cruising Speed", val: "60 km/h (Vintage Sightseeing)" },
        { label: "Locomotive Power", val: "Steam & Diesel Traction" },
        { label: "Craftsmanship", val: "Solid Teak & Brass Carriage Restorations" },
        { label: "Heritage Era", val: "1920s Vintage Rail Luxury" }
      ]
    };
  }

  function getTrainInLanguage(train, langCode) {
    if (!train) return train;
    const lang = langCode || window.TrackTalesLanguageCode || localStorage.getItem('tracktales_lang') || 'en';
    if (lang === 'en' || !TRAIN_TRANSLATIONS[train.id] || !TRAIN_TRANSLATIONS[train.id][lang]) {
      return {
        ...train,
        scenery_highlights: train.scenery_highlights || getSceneryHighlightsInLanguage(train.id, lang),
        dining: train.dining || getDiningInLanguage(train.id, lang),
        locomotive_heritage: train.locomotive_heritage || getLocomotiveHeritageInLanguage(train.id, lang)
      };
    }
    const tr = TRAIN_TRANSLATIONS[train.id][lang];
    return {
      ...train,
      name: tr.name || train.name,
      tagline: tr.tagline || train.tagline,
      category: tr.category || train.category,
      speed: tr.speed || train.speed,
      duration: tr.duration || train.duration,
      description: tr.description || train.description,
      departure_hub: tr.departure_hub || train.departure_hub,
      arrival_hub: tr.arrival_hub || train.arrival_hub,
      highlights: tr.highlights || train.highlights,
      scenery_highlights: tr.scenery_highlights || getSceneryHighlightsInLanguage(train.id, lang),
      dining: tr.dining || getDiningInLanguage(train.id, lang),
      locomotive_heritage: tr.locomotive_heritage || getLocomotiveHeritageInLanguage(train.id, lang)
    };
  }

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

    const langCode = window.TrackTalesLanguageCode || localStorage.getItem('tracktales_lang') || 'en';
    const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[langCode]) ? TRANSLATIONS[langCode] : {};

    if (tagEl) {
      if (isBlue) {
        tagEl.textContent = dict.hero_tag_blue || 'PRETORIA TO CAPE TOWN CORRIDOR · THE BLUE TRAIN';
      } else {
        tagEl.textContent = dict.hero_tag_rovos || 'CAPITAL PARK TO CAPE TOWN CORRIDOR · ROVOS RAIL SAFARI';
      }
      tagEl.className = isBlue ? 'text-[#B87C10]' : 'text-[#2A9D8F]';
    }

    if (descEl) {
      if (isBlue) {
        descEl.textContent = dict.hero_desc_blue || dict.hero_desc || 'A luxury rail ticket for this route can cost tens of thousands of Rand. TrackTales traces the same line—a 1,600 km 5-star spectrum running from the Highveld through Kimberley to the Atlantic ocean.';
      } else {
        descEl.textContent = dict.hero_desc_rovos || 'Step aboard "The Most Luxurious Train in the World". An extraordinary 3-day, 1,600 km vintage Edwardian journey spanning the golden Highveld, Kimberley diamond mines, the Great Karoo, and Matjiesfontein.';
      }
    }

    if (statsEl) {
      const routeText = dict.hero_stat_route || '1,600 km';
      const durationText = isBlue ? (dict.hero_stat_duration_blue || '31 Hours Express') : (dict.hero_stat_duration_rovos || '3 Days / 48 Hours');
      const speedText = isBlue ? (dict.hero_stat_speed_blue || '90 km/h Air-Suspension') : (dict.hero_stat_speed_rovos || '60 km/h Restored Steam');
      const excursionText = isBlue ? (dict.hero_stat_excursion_blue || 'Kimberley Diamond Excursion') : (dict.hero_stat_excursion_rovos || 'Kimberley & Matjiesfontein');

      if (isBlue) {
        statsEl.innerHTML = `
          <span class="flex items-center gap-2"><i data-lucide="route" class="w-3.5 h-3.5 text-[#B87C10]"></i> ${routeText}</span>
          <span class="flex items-center gap-2"><i data-lucide="clock" class="w-3.5 h-3.5 text-[#B87C10]"></i> ${durationText}</span>
          <span class="flex items-center gap-2"><i data-lucide="zap" class="w-3.5 h-3.5 text-[#B87C10]"></i> ${speedText}</span>
          <span class="flex items-center gap-2"><i data-lucide="gem" class="w-3.5 h-3.5 text-[#B87C10]"></i> ${excursionText}</span>
        `;
      } else {
        statsEl.innerHTML = `
          <span class="flex items-center gap-2"><i data-lucide="route" class="w-3.5 h-3.5 text-[#2A9D8F]"></i> ${routeText}</span>
          <span class="flex items-center gap-2"><i data-lucide="clock" class="w-3.5 h-3.5 text-[#2A9D8F]"></i> ${durationText}</span>
          <span class="flex items-center gap-2"><i data-lucide="flame" class="w-3.5 h-3.5 text-[#2A9D8F]"></i> ${speedText}</span>
          <span class="flex items-center gap-2"><i data-lucide="landmark" class="w-3.5 h-3.5 text-[#2A9D8F]"></i> ${excursionText}</span>
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

    const langCode = window.TrackTalesLanguageCode || localStorage.getItem('tracktales_lang') || 'en';
    const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[langCode]) ? TRANSLATIONS[langCode] : {};

    const rawTrain = (appData.trains || FALLBACK_TRAINS).find(t => t.id === trainId) || FALLBACK_TRAINS[0];
    const train = getTrainInLanguage(rawTrain, langCode);

    const isBlue = train.id === 'blue-train';
    const otherTrainId = isBlue ? 'rovos-rail' : 'blue-train';
    const otherTrainRaw = (appData.trains || FALLBACK_TRAINS).find(t => t.id === otherTrainId) || FALLBACK_TRAINS[1];
    const otherTrain = getTrainInLanguage(otherTrainRaw, langCode);
    const otherTrainName = otherTrain.name;
    const accentColor = isBlue ? '#D99B26' : '#2A9D8F';
    const accentDark = isBlue ? '#B87C10' : '#1F7A6F';

    if (badgeEl) {
      const selectedBadgeText = dict.trains_selected_badge || 'SELECTED TRAIN:';
      badgeEl.textContent = `${selectedBadgeText} ${train.name.toUpperCase()}`;
      if (badgeEl.parentElement) {
        badgeEl.parentElement.className = `inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${isBlue ? 'bg-[#D99B26]/10 border-[#D99B26]/30 text-[#B87C10]' : 'bg-[#2A9D8F]/10 border-[#2A9D8F]/30 text-[#2A9D8F]'} font-mono text-xs font-bold tracking-widest uppercase mb-4 shadow-sm`;
      }
    }

    if (titleEl) {
      if (isBlue) {
        titleEl.innerHTML = dict.trains_title_blue || `The <span class="text-[#B87C10] italic font-serif">Blue Train</span>`;
      } else {
        titleEl.innerHTML = dict.trains_title_rovos || `Rovos <span class="text-[#2A9D8F] italic font-serif">Rail Safari</span>`;
      }
    }

    if (subtitleEl) {
      subtitleEl.textContent = train.tagline + ' · ' + (dict.trains_subtitle_suffix || 'Complete luxury suites, dining, and specifications for your selected train journey.');
    }

    if (!container) return;

    // Scenery & Viewing Highlights HTML
    const sceneryHighlights = train.scenery_highlights || getSceneryHighlightsInLanguage(train.id, langCode);

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
              <strong class="font-mono text-[10px] uppercase font-bold text-[#0A0C10] block">${dict.label_vantage_tip || 'Vantage Point Tip'}</strong>
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
                <span class="text-xs font-mono text-[#78716C] font-semibold">${train.frequency || (isBlue ? 'Weekly Departures' : 'Scheduled Departures')}</span>
              </div>

              <h3 class="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A0C10] mb-2">${train.name}</h3>
              <p class="text-sm font-serif italic ${isBlue ? 'text-[#B87C10]' : 'text-[#2A9D8F]'} font-bold mb-5">${train.tagline}</p>
              <p class="text-base text-[#111827] font-medium leading-relaxed mb-6 font-sans">${train.description}</p>
            </div>

            <!-- Quick Specs Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-black/15 font-mono text-xs">
              <div class="p-3 rounded-xl bg-black/5 border border-black/10">
                <span class="text-[10px] text-[#78716C] uppercase block font-bold">${dict.label_speed || 'Speed'}</span>
                <span class="font-bold text-[#0A0C10]">${train.speed}</span>
              </div>
              <div class="p-3 rounded-xl bg-black/5 border border-black/10">
                <span class="text-[10px] text-[#78716C] uppercase block font-bold">${dict.label_duration || 'Duration'}</span>
                <span class="font-bold text-[#0A0C10]">${train.duration}</span>
              </div>
              <div class="p-3 rounded-xl bg-black/5 border border-black/10 col-span-2 sm:col-span-1">
                <span class="text-[10px] text-[#78716C] uppercase block font-bold">${dict.label_corridor || 'Corridor'}</span>
                <span class="font-bold text-[#0A0C10]">1,600 km</span>
              </div>
            </div>

            <!-- Departure & Arrival Hubs -->
            <div class="mt-4 p-4 rounded-xl ${isBlue ? 'bg-[#D99B26]/10 border border-[#D99B26]/25' : 'bg-[#2A9D8F]/10 border border-[#2A9D8F]/25'} text-xs font-mono">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span class="text-[10px] font-bold uppercase text-[#78716C] block">${dict.label_departure_hub || 'Departure Hub'}</span>
                  <span class="font-bold text-[#0A0C10]">${train.departure_hub}</span>
                </div>
                <div>
                  <span class="text-[10px] font-bold uppercase text-[#78716C] block">${dict.label_terminus_station || 'Terminus Station'}</span>
                  <span class="font-bold text-[#0A0C10]">${train.arrival_hub}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5 flex flex-col gap-4">
            <div class="relative rounded-2xl overflow-hidden aspect-[4/3] border border-black/15 shadow-md">
              <img src="${train.image_url}" alt="${train.name}" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <span class="text-white font-mono text-xs font-bold tracking-wider uppercase">${isBlue ? 'Southbound: Pretoria (Irene/Park) -> Kimberley -> Cape Town' : 'Southbound: Pretoria (Capital Park) -> Kimberley -> Matjiesfontein -> Cape Town'}</span>
              </div>
            </div>

            <!-- Highlights Checklist -->
            <div class="p-5 rounded-2xl bg-white/80 border border-black/10">
              <span class="text-[11px] font-mono font-bold text-[#0A0C10] uppercase tracking-wider block mb-3">${dict.trains_highlights_title || 'Signature Experience Highlights'}</span>
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
            <span class="text-xs font-mono font-bold text-[${accentColor}] uppercase tracking-widest block">${dict.trains_scenery_badge || 'Scenic Splendor & Vantage Points'}</span>
            <h3 class="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A0C10]">${dict.trains_scenery_title || 'Corridor Scenery & Viewing Highlights'}</h3>
          </div>
          <span class="text-xs font-mono text-[#78716C] font-semibold">${dict.trains_scenery_sub || 'Pretoria to Cape Town · 1,600 km'}</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${sceneryHTML}
        </div>
      </div>

      <!-- SECTION 3: ONBOARD GASTRONOMY & LOUNGE CARS -->
      <div class="text-left mt-12">
        <div class="mb-6">
          <span class="text-xs font-mono font-bold text-[${accentColor}] uppercase tracking-widest block">${dict.trains_culinary_badge || 'Culinary & Social'}</span>
          <h3 class="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A0C10]">${dict.trains_dining_title || 'Onboard Fine Dining & Lounges'}</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${diningHTML}
        </div>
      </div>

      <!-- SECTION 4: LOCOMOTIVE & ENGINEERING HERITAGE -->
      <div class="text-left mt-12 glass-card p-8 rounded-3xl border border-black/15 shadow-sm">
        <div class="mb-6">
          <span class="text-xs font-mono font-bold text-[${accentColor}] uppercase tracking-widest block">${dict.trains_specs_badge || 'Technical Specs & History'}</span>
          <h3 class="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A0C10]">${train.locomotive_heritage?.title || 'Locomotive Engineering'}</h3>
          <p class="text-sm text-[#111827] font-medium leading-relaxed font-sans max-w-3xl mt-2">${train.locomotive_heritage?.desc || ''}</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          ${specsHTML}
        </div>
      </div>
    `;

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  const STORY_EXPANDED_CONTEXT_MAP = {
    en: `This journey is best understood as a chain of decisions rather than a single dramatic moment. Engineers, railway workers, station staff, cooks, guides, and passengers each shaped what the route became. A timetable might appear simple on paper, but behind every departure were surveys, maintenance inspections, water supplies, repair workshops, and people who knew how to read the changing conditions of the land. The railway succeeded when all of those small systems worked together.

The landscape also carried its own history. The Highveld opened into broad grasslands and old mining country. Kimberley connected the story of diamonds with the movement of machinery and people. Beyond the junctions, the Karoo demanded patience: long horizons, dry air, sudden weather, and stations separated by great distances. Near the Western Cape, the route tightened into valleys and mountain passes before reaching vineyards, suburbs, and the Atlantic edge. Each section gave the journey a different character.

Local communities were never merely scenery. They supplied labour, food, services, stories, and knowledge of the terrain. Railway towns grew around sidings and water points, and many families built their working lives around the arrival and departure of trains. Some places prospered when the main line stopped there; others were left behind when routes changed. Remembering those differences makes the heritage more honest and gives the journey more depth than a simple catalogue of luxury.

Preservation is therefore an active responsibility. A carriage, locomotive, station, or dining tradition survives only when people repair it, document it, teach its skills, and make room for new audiences. Modern passengers can enjoy polished wood, old photographs, careful meals, and wide views while also asking whose work made the experience possible. The past becomes useful when it is treated as evidence, not decoration.

As the train moves, details gather into memory: a platform lamp in the evening, a meal served while the horizon turns gold, a workshop door opening before sunrise, or the sound of wheels changing rhythm on a bridge. These moments connect technology with place. They show why railway stories remain powerful in South Africa: the track is infrastructure, archive, workplace, viewpoint, and meeting place at once. A full journey does not simply pass through history. It gives history time to unfold.`,
    af: `Hierdie reis word die beste verstaan as 'n reeks besluite eerder as 'n enkele dramatiese oomblik. Ingenieurs, spoorwegwerkers, stasiepersoneel, kokke, gidse en passasiers het elkeen gevorm wat die roete geword het. 'n Roosterskema lyk dalk eenvoudig op papier, maar agter elke vertrek was daar opnames, onderhoudinspeksies, watervoorrade en herstelwerkswinkels.

Die landskap het ook sy eie geskiedenis gedra. Die Hoëveld het oopgegaan in breë grasvelde en ou myngebiede. Kimberley het die verhaal van diamante verbind met die beweging van masjinerie en mense. Die Karoo het geduld vereis: lang horisonne, droë lug en stasies wat deur groot afstande geskei is.

Plaaslike gemeenskappe was nooit bloot dekor nie. Hulle het arbeid, voedsel, dienste en stories verskaf. Spoorwegdorpe het rondom uitwykspore en waterpunte gegroei, en baie families het hul lewens rondom die koms en vertrek van treine gebou.

Bewaring is dus 'n aktiewe verantwoordelikheid. 'n Wa, lokomotief of stasie oorleef slegs wanneer mense dit herstel en dokumenteer. Passasiers kan vandag die afgeronde hout en pragtige uitsigte geniet terwyl hulle ook waardeer wie se werk hierdie ervaring moontlik gemaak het.`,
    zu: `Lolu hambo luqondakala kangcono njengomxokozelo wezinqumo kunomzuzu owodwa ocacile. Onjiniyela, abasebenzi bezitimela, abasebenzi beziteshi, abapheki nabagibeli basiza ekubunjweni kwalomzila. Uhlelo lungabonakala lulula ephepheni, kodwa emva kwakho konke ukuhamba kwakukhona ukuhlola nabasebenzi abanolwazi.

Indawo inomlando wayo ngokufanayo. I-Highveld yavuleka yaba amadlelo abanzi nezwane lezimayini ezindala. I-Kimberley yaxhumanisa indaba yamadayimane nokuhamba kwemishini nabantu. I-Karoo idinga ukubekezela ngebanga elide nesimo sezulu esitshashazayo.

Imiphakathi yasendaweni yayingesiwo umbukiso kuphela. Yanikeza abasebenzi, ukudla, izinsiza nezindaba. Amadolobha ezitimela akhula eduze kweziteshi namanzi, imindeni eminingi yakha impilo yayo ngokufika nokuhamba kwezitimela.

Ukugcinwa kwamagugu kungumsebenzi obalulekile. Inqola, isitimela noma isiteshi kuphila kuphela uma abantu bakulungisa futhi bakubhale phansi.`,
    xh: `Luhambo luqondakala ngcono njengothungelelwano lwezigqibo kunomzuzu omnye omangalisayo. Ababunjiniyela, abasebenzi bakaloliwe, abasebenzi bezitishi nabakhweli bancedise ekubunjweni kwalo mzila.

Iliizwe linembali yalo. I-Highveld ivuleke kwimimandla enengca nendawo zeemayini ezindala. I-Kimberley idibanise ibali lezinto zexabiso nohambo meenqwelwana nabantu. IKaroo idinga umonde ngemigama emide.

Abahlali bendawo abazange babe ngumbukiso nje. Banikeze ngomsebenzi, ukutya neempahla. Iidolophu zakhiwa kufupi nezitishi namanzi.

Ukugcina ilifa ngumsebenzi obalulekileyo. Iloliwe okanye isitishi siphila kuphela xa abantu besilungisa baze basibhale phantsi.`,
    de: `Diese Reise lässt sich am besten als eine Kette von Entscheidungen verstehen und nicht als ein einziger dramatischer Moment. Ingenieure, Eisenbahner, Bahnhofspersonal, Köche, Reiseleiter und Passagiere haben alle dazu beigetragen, was diese Route geworden ist. Ein Fahrplan mag auf dem Papier einfach erscheinen, aber hinter jeder Abfahrt steckten Vermessungen, Wartungsinspektionen, Wasserversorgung und Reparaturwerkstätten.

Auch die Landschaft trug ihre eigene Geschichte. Das Highveld öffnete sich in weite Graslandschaften und altes Bergbaugebiet. Kimberley verband die Geschichte der Diamanten mit der Bewegung von Maschinen und Menschen. Jenseits der Knotenpunkte verlangte die Karoo Geduld: weite Horizonte, trockene Luft und Bahnhöfe, die durch große Entfernungen getrennt waren.

Lokale Gemeinschaften waren nie bloß Kulisse. Sie lieferten Arbeit, Nahrung, Dienstleistungen, Geschichten und Geländekenntnisse. Eisenbahnstädte wuchsen um Ausweichgleise und Wasserstellen herum, und viele Familien bauten ihr Arbeitsleben um die Ankunft und Abfahrt von Zügen herum auf.

Denkmalpflege ist daher eine aktive Verantwortung. Ein Waggon, eine Lokomotive oder eine Bahnhofstradition überlebt nur, wenn Menschen sie reparieren, dokumentieren und Fähigkeiten weitergeben.`,
    fr: `Ce voyage se comprend mieux comme une chaîne de décisions plutôt que comme un seul moment dramatique. Ingénieurs, cheminots, personnel de gare, cuisiniers, guides et passagers ont tous contribué à façonner cet itinéraire. Un horaire peut sembler simple sur le papier, mais derrière chaque départ se trouvaient des relevés, des inspections d'entretien, des approvisionnements en eau et des ateliers de réparation.

Le paysage portait également sa propre histoire. Le Highveld s'ouvrait sur de vastes prairies et un ancien pays minier. Kimberley a lié l'histoire des diamants au mouvement des machines et des hommes. Au-delà des jonctions, le Karoo exigeait de la patience : de longs horizons, un air sec et des gares séparées par de grandes distances.

Les communautés locales n'ont jamais été un simple décor. Elles ont fourni du travail, de la nourriture, des services et des histoires. Les villes ferroviaires ont grandi autour des voies d'évitement et des points d'eau, et de nombreuses familles ont construit leur vie autour de l'arrivée et du départ des trains.

La préservation est donc une responsabilité active. Une voiture, une locomotive ou une tradition ferroviaire ne survit que si les gens la réparent, la documentent et transmettent ses compétences.`,
    nl: `Deze reis kan het beste worden begrepen als een reeks beslissingen in plaats van één enkel dramatisch moment. Ingenieurs, spoorwegarbeiders, stationspersoneel, koks en passagiers hebben allemaal bijgedragen aan wat de route is geworden. Een dienstregeling lijkt op papier misschien eenvoudig, maar achter elk vertrek schuilden inspecties, watervoorraden en reparatiewerkplaatsen.

Het landschap droeg ook zijn eigen geschiedenis. Het Hoogveld opende zich in uitgestrekte graslanden en oud mijnbouwgebied. Kimberley verbond het verhaal van diamanten met de beweging van machines en mensen. De Karoo vereiste geduld: verre horizonten, droge lucht en stations gescheiden door grote afstanden.

Lokale gemeenschappen waren nooit louter decor. Ze leverden arbeid, voedsel, diensten en verhalen. Spoorwegsteden groeiden rond passeersporen en waterpunten, en veel families bouwden hun leven op rond de aankomst en het vertrek van treinen.

Behoud is daarom een actieve verantwoordelijkheid. Een rijtuig, locomotief of station overleeft alleen als mensen het repareren, documenteren en vaardigheden doorgeven.`,
    es: `Este viaje se entiende mejor como una cadena de decisiones más que como un único momento dramático. Ingenieros, trabajadores ferroviarios, personal de estación, cocineros, guías y pasajeros contribuyeron a dar forma a esta ruta. Un horario puede parecer simple sobre el papel, pero detrás de cada salida había inspecciones, suministros de agua y talleres de reparación.

El paisaje también albergaba su propia historia. El Highveld se abría en amplias praderas y tierras mineras antiguas. Kimberley conectó la historia de los diamantes con el movimiento de maquinaria y personas. Más allá de los empalmes, el Karoo exigía paciencia: horizontes lejanos, aire seco y estaciones separadas por grandes distancias.

Las comunidades locales nunca fueron mero paisaje. Aportaron trabajo, comida, servicios e historias. Los pueblos ferroviarios crecieron alrededor de desvíos y puntos de agua, y muchas familias construyeron sus vidas en torno a la llegada y salida de los trenes.

La preservación es por tanto una responsabilidad activa. Un vagón, una locomotora o una estación solo sobreviven cuando la gente los repara, los documenta y transmite sus conocimientos.`,
    it: `Questo viaggio si comprende meglio come una catena di decisioni piuttosto che come un singolo momento drammatico. Ingegneri, ferrovieri, personale di stazione, cuochi, guide e passeggeri hanno tutti contribuito a plasmare questo percorso. Un orario può sembrare semplice sulla carta, ma dietro ogni partenza c'erano ispezioni, forniture d'acqua e officine di riparazione.

Il paesaggio portava con sé la propria storia. L'Highveld si apriva in ampie praterie e vecchie terre minerarie. Kimberley collegò la storia dei diamanti con il movimento di macchinari e persone. Il Karoo richiedeva pazienza: lunghi orizzonti, aria asciutta e stazioni separate da grandi distanze.

Le comunità locali non sono mai state un semplice scenario. Hanno fornito lavoro, cibo, servizi e storie. Le città ferroviarie sono cresciute attorno a scambi e punti d'acqua, e molte famiglie hanno costruito la propria vita attorno all'arrivo e alla partenza dei treni.

La conservazione è quindi una responsabilità attiva. Una carrozza, una locomotiva o una stazione sopravvivono solo quando le persone le riparano, le documentano e ne tramandano le competenze.`,
    pt: `Esta jornada é melhor compreendida como uma cadeia de decisões em vez de um único momento dramático. Engenheiros, ferroviários, funcionários de estação, cozinheiros, guias e passageiros ajudaram a moldar esta rota. Um horário pode parecer simples no papel, mas por trás de cada partida havia inspeções, suprimentos de água e oficinas de reparo.

A paisagem também carregava sua própria história. O Highveld abria-se em vastas pastagens e antigas terras de mineração. Kimberley conectou a história dos diamantes com o movimento de máquinas e pessoas. O Karoo exigia paciência: horizontes distantes, ar seco e estações separadas por grandes distâncias.

As comunidades locais nunca foram mero cenário. Elas forneceram trabalho, comida, serviços e histórias. As cidades ferroviárias cresceram ao redor de desvios e pontos de água, e muitas famílias construíram suas vidas ao redor da chegada e partida dos trens.

A preservação é, portanto, uma responsabilidade ativa. Um vagão, uma locomotiva ou uma estação só sobrevivem quando as pessoas os reparam, os documentam e transmitem suas habilidades.`,
    zh: `这段旅程最好被理解为一系列决策的延续，而非单一的戏剧性时刻。工程师、铁路工人、车站人员、厨师、导游和乘客共同塑造了这条路线的传奇。时刻表在纸面上看似简单，但每一次发车的背后都凝聚着线路勘测、检修维护、给水保供以及维修车间的辛勤付出。

沿途风光同样孕育着厚重历史。高原腹地向广袤无垠的大草原与古老矿区延伸；金伯利将钻石传奇与机械及人群的流动紧密相连；而在枢纽之外，卡鲁沙漠考验着人们的耐心——辽阔的平线、干燥的气候以及相隔甚远的车站。

当地社区绝非仅仅是沿途风景。他们提供了劳动力、餐饮服务、传奇故事与地理地形经验。许多铁路小镇围绕水源地和避让线发展壮大，无数家庭的生计紧紧围绕着列车的到发而运转。

因此，文化保护是一项长期的责任。唯有不断修复、记录并传承技能，车厢、机车与车站传统才能历久弥新。`,
    ja: `この旅は、単一のドラマチックな瞬間ではなく、意志決定の積み重ねとして理解されるべきです。エンジニア、鉄道作業員、駅員、料理人、ガイド、そして乗客が一体となってこのルートを創り上げました。ダイヤグラムは紙の上では単純に見えますが、すべての出発の陰には測量、点検、給水、修復工房のたゆまぬ努力がありました。

風景もまた自らの歴史を物語っています。ハイベルドは広大な草原と古くからの鉱山地帯へと開け、キンバリーはダイヤモンドの物語と機械や人々の移動を結びつけました。カルー砂漠は地平線と乾燥した空気、遠く離れた駅での忍耐を要求しました。

地元コミュニティは単なる車窓の風景ではありませんでした。労働力、食料、サービス、そして物語を提供しました。給水所や退避線の周りに鉄道の町が育ち、多くの家族が列車の発着とともに生活を築きました。

したがって、保存は積極的な責任です。客車、機関車、駅の tradition は、人々が修理し、記録し、技術を継承して初めて生き続けます。`,
    ko: `이 여정은 단 하나의 극적인 순간이라기보다는 여러 결정의 연속으로 이해하는 것이 가장 좋습니다. 엔지니어, 철도 승무원, 역 직원, 요리사, 가이드, 승객 모두가 이 노선의 역사를 함께 만들었습니다. 시간표는 종이 위에서 간단해 보일지 모르지만, 모든 출발 뒤에는 현장 조사, 정비 점검, 용수 공급, 수리 워크숍이 있었습니다.

경관 역시 독자적인 역사를 담고 있습니다. 하이벨트는 넓은 초원과 오래된 광산지대로 이어지며, 킴벌리는 다이아몬드 이야기와 기계 및 사람들의 이동을 연결했습니다. 카루 지대는 먼 지평선과 건조한 공기, 먼 거리로 떨어진 역들로 인내를 요구했습니다.

지역 사회는 결코 단순한 배경에 그치지 않았습니다. 노동력, 식량, 서비스, 이야기를 제공했습니다. 철도 마을은 수로와 신호장 주변에 형성되었고, 많은 가족이 열차의 도착과 출발을 중심으로 삶을 일구었습니다.

따라서 보존은 적극적인 책임입니다. 객차, 기관차, 역의 전통은 사람들이 이를 수리하고 기록하며 기술을 전수할 때 비로소 지속됩니다.`,
    hi: `इस यात्रा को एक नाटकीय क्षण के बजाय निर्णयों की एक श्रृंखला के रूप में सबसे अच्छी तरह समझा जाता है। इंजीनियरों, रेलवे कर्मचारियों, स्टेशन कर्मचारियों, रसोइयों, गाइडों और यात्रियों सभी ने मिलकर इस मार्ग को आकार दिया। एक समय सारणी कागज पर सरल लग सकती है, लेकिन हर प्रस्थान के पीछे निरीक्षण, रखरखाव, पानी की आपूर्ति और मरम्मत कार्यशालाएं थीं।

परिदृश्य का भी अपना इतिहास था। हाईवेल्ड व्यापक घास के मैदानों और पुराने खनन क्षेत्र में खुला। किम्बरली ने हीरों की कहानी को मशीनों और लोगों की आवाजाही से जोड़ा। कारू क्षेत्र में दूर के क्षितिज, शुष्क हवा और बड़ी दूरी पर स्थित स्टेशनों के साथ धैर्य की आवश्यकता थी।

स्थानीय समुदाय कभी केवल दृश्य नहीं थे। उन्होंने श्रम, भोजन, सेवाएं और कहानियां प्रदान कीं। रेलवे कस्बे पानी के बिंदुओं के आसपास विकसित हुए, और कई परिवारों ने ट्रेनों के आगमन और प्रस्थान के आसपास अपना जीवन बनाया।

इसलिए संरक्षण एक सक्रिय जिम्मेदारी है। एक डिब्बा, इंजन या स्टेशन परंपरा तभी जीवित रहती है जब लोग उसकी मरम्मत करते हैं, उसका दस्तावेजीकरण करते हैं और कौशल सिखाते हैं।`,
    ru: `Это путешествие лучше всего рассматривать как цепочку решений, а не как один драматический момент. Инженеры, железнодорожники, персонал станций, повара, гиды и пассажиры — каждый из них внес свой вклад в формирование этого маршрута. Расписание может казаться простым на бумаге, но за каждым отправлением стояли инспекции, водоснабжение и ремонтные мастерские.

Пейзаж также хранил свою историю. Хайвельд открывался широкими степями и старыми шахтерскими землями. Кимберли связал историю алмазов с движением техники и людей. Пустыня Кару требовала терпения: далекие горизонты, сухой воздух и станции, разделенные большими расстояниями.

Местные сообщества никогда не были просто декорацией. Они обеспечивали труд, еду, услуги и истории. Железнодорожные городки rosли вокруг разъездов и водокачек, и многие семьи строили свою жизнь вокруг прибытия и отправления поездов.

Поэтому сохранение — это активная ответственность. Вагон, паровоз или станция живут до тех пор, пока люди ремонтируют их, документируют и передают мастерство.`,
    ar: `من الأفضل فهم هذه الرحلة على أنها سلسلة من القرارات بدلاً من لحظة دراماتيكية واحدة. أسهم المهندسون وعمال السكك الحديدية وموظفو المحطات والطهاة والمرشدون والركاب في تشكيل هذا المسار. قد يبدو جدول المواعيد بسيطاً على الورق، ولكن وراء كل مغادرة كانت هناك عمليات تفتيش وصيانة وإمدادات مياه وورش إصلاح.

حملت المناظر الطبيعية أيضاً تاريخها الخاص. انفتحت الهضبة العليا على المراعي الواسعة ومناطق التعدين القديمة. ربطت كيمبرلي قصة الألماس بحركة الآلات والناس. تطلبت صحراء كارو الصبر: آفاق بعيدة، وهواء جاف، ومحطات تفصل بينها مسافات كبيرة.

لم تكن المجتمعات المحلية مجرد خلفية للمشهد. فقد قدمت العمالة والطعام والخدمات والقصص. نمت مدن السكك الحديدية حول تحويلات المسارات ونقاط المياه، وبنت العديد من العائلات حياتها حول وصول المغادرة والقطارات.

لذلك، تعد الحفاظ على التراث مسؤولية نشطة. لا تنجو العربة أو القاطرة أو المحطة إلا عندما يقوم الناس بإصلاحها وتوثيقها ونقل مهاراتها.`
  };

  function getFullStoryText(story) {
    const langCode = window.TrackTalesLanguageCode || localStorage.getItem('tracktales_lang') || 'en';
    const expanded = (STORY_EXPANDED_CONTEXT_MAP && STORY_EXPANDED_CONTEXT_MAP[langCode]) ? STORY_EXPANDED_CONTEXT_MAP[langCode] : STORY_EXPANDED_CONTEXT_MAP['en'];
    return `${story.content || ''}\n\n${expanded}`.trim();
  }

  function getStoryReadTime(story) {
    const fullText = `${story.summary || ''} ${getFullStoryText(story)}`.trim();
    const wordCount = fullText ? fullText.split(/\s+/).length : 0;
    const mins = Math.max(5, Math.ceil(wordCount / 150));
    const langCode = window.TrackTalesLanguageCode || localStorage.getItem('tracktales_lang') || 'en';
    const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[langCode]) ? TRANSLATIONS[langCode] : null;
    const suffix = (dict && dict.stories_min_read) ? dict.stories_min_read : 'min read';
    return `${mins} ${suffix}`;
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
    const langCode = window.TrackTalesLanguageCode || localStorage.getItem('tracktales_lang') || 'en';
    const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[langCode]) ? TRANSLATIONS[langCode] : null;

    if (titleEl) {
      if (dict && dict.stories_title) {
        titleEl.innerHTML = dict.stories_title;
      } else {
        titleEl.innerHTML = `Journey <span class="${isBlue ? 'text-[#B87C10]' : 'text-[#2A9D8F]'} italic font-serif">Stories</span>`;
      }
    }

    if (subtitleEl) {
      if (dict && dict.stories_sub) {
        subtitleEl.textContent = dict.stories_sub;
      } else {
        subtitleEl.textContent = `Archival stories, engineering milestones, and folklore specifically for ${trainName}.`;
      }
    }

    if (!container) return;

    const rawStories = appData.stories || FALLBACK_STORIES;
    const allStories = rawStories.map(s => getStoryInLanguage(s, langCode));
    const filteredStories = allStories.filter(s => s.train_id === 'all' || s.train_id === trainId);

    const readBtnLabel = (dict && dict.stories_read_story_btn) ? dict.stories_read_story_btn : 'Read Full Story';
    const byPrefix = (dict && dict.by_author) ? dict.by_author : 'By';

    container.innerHTML = filteredStories.map(story => `
      <div class="glass-card p-8 rounded-3xl border border-black/10 flex flex-col justify-between text-left hover:border-[${accentColor}]/60 transition-all shadow-sm group">
        <div>
          <div class="flex items-center justify-between gap-2 mb-4">
            <span class="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${story.train_id === 'all' ? 'bg-[#4A52B0]/15 text-[#4A52B0] border border-[#4A52B0]/30' : (isBlue ? 'bg-[#D99B26]/15 text-[#B87C10] border border-[#D99B26]/30' : 'bg-[#2A9D8F]/15 text-[#2A9D8F] border border-[#2A9D8F]/30')}">
              ${story.train_id === 'all' ? ((dict && dict.stories_heritage_tag) ? dict.stories_heritage_tag : 'Corridor Heritage') : trainName}
            </span>
            <span class="text-xs font-mono text-[#78716C] font-semibold">${getStoryReadTime(story)}</span>
          </div>

          <h3 class="font-heading font-bold text-xl text-[#0A0C10] mb-3 group-hover:text-[${accentColor}] transition-colors leading-snug">
            ${story.title}
          </h3>

          <p class="text-xs font-mono text-[#78716C] mb-4 font-semibold">${byPrefix} ${story.author}</p>
          <p class="text-sm text-[#111827] font-medium leading-relaxed font-sans mb-6">${story.summary}</p>
        </div>

        <button class="w-full py-3 rounded-xl bg-black/5 hover:bg-[${accentColor}] hover:text-white border border-black/10 font-mono text-xs font-bold uppercase tracking-wider text-[#0A0C10] transition-all flex items-center justify-center gap-2 btn-read-story" data-story-id="${story.id}">
          <i data-lucide="book-open" class="w-4 h-4"></i> ${readBtnLabel}
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
      const rawStory = (appData.stories || FALLBACK_STORIES).find(s => s.id === storyId);
      if (!rawStory) return;

      const langCode = window.TrackTalesLanguageCode || localStorage.getItem('tracktales_lang') || 'en';
      const story = getStoryInLanguage(rawStory, langCode);

      const titleEl = document.getElementById('modal-title');
      const authorEl = document.getElementById('modal-author');
      const readTimeEl = document.getElementById('modal-read-time');
      const bodyEl = document.getElementById('modal-body');
      const audioBar = document.getElementById('modal-audio-narration-bar');

      const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[langCode]) ? TRANSLATIONS[langCode] : {};
      const byPrefix = dict.by_author || 'By';

      if (titleEl) {
        titleEl.textContent = story.title;
        titleEl.setAttribute('data-story-id', story.id);
      }
      if (authorEl) authorEl.textContent = `${byPrefix} ${story.author}`;
      if (readTimeEl) readTimeEl.textContent = getStoryReadTime(story);
      if (bodyEl) {
        bodyEl.innerHTML = `<p class="font-serif text-base leading-relaxed mb-4 text-[#78716C] italic font-semibold">${story.summary}</p><div class="space-y-4 text-sm leading-relaxed">${formatStoryContent(getFullStoryText(story))}</div>`;
        bodyEl.lang = langCode;
      }

      // Story narration follows the active subscription entitlement.
      if (audioBar) {
        const activeSub = localStorage.getItem('tracktales_subscription') || 'free';
        const hasAudio = activeSub === 'audio-exp' || activeSub === 'membership';

        const audioUnlocked = dict.modal_audio_unlocked || 'Audio Companion Unlocked';
        const audioListenDesc = dict.modal_audio_listen_desc || 'Listen to complete story narration';
        const audioPlayLabelText = dict.modal_audio_play || 'Play Audio';
        const audioStopLabelText = dict.modal_audio_stop || 'Stop Audio';
        const audioLockedText = dict.modal_audio_locked || 'Audio narration locked for this story.';
        const audioUnlockBtnText = dict.modal_audio_unlock_btn || 'Unlock Audio Pass (R49)';

        if (hasAudio) {
          audioBar.className = 'mb-5 p-4 rounded-2xl bg-[#2A9D8F]/10 border border-[#2A9D8F]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-left';
          audioBar.innerHTML = `
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#2A9D8F] text-white flex items-center justify-center shrink-0 shadow-md">
                <i data-lucide="headphones" class="w-5 h-5"></i>
              </div>
              <div>
                <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2A9D8F] block">${audioUnlocked}</span>
                <span class="text-xs font-bold text-[#1C1917]">${audioListenDesc}</span>
              </div>
            </div>
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <button type="button" id="modal-audio-play-btn" class="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#2A9D8F] text-white font-mono text-xs font-bold uppercase hover:bg-[#238276] transition-all flex items-center justify-center gap-2 shadow-sm" data-reading="false">
                <i data-lucide="play" class="w-3.5 h-3.5"></i>
                <span id="modal-audio-play-label">${audioPlayLabelText}</span>
              </button>
            </div>
          `;

          const playBtn = document.getElementById('modal-audio-play-btn');
          const playLabel = document.getElementById('modal-audio-play-label');

          if (playBtn) {
            playBtn.addEventListener('click', () => {
              if (window.TrackTalesSpeakText) {
                const fullText = `${story.title}. ${byPrefix} ${story.author}. ${story.summary}. ${getFullStoryText(story)}`;
                const isCurrentlyReading = playBtn.getAttribute('data-reading') === 'true';

                if (isCurrentlyReading) {
                  window.TrackTalesStopSpeech();
                  playBtn.setAttribute('data-reading', 'false');
                  if (playLabel) playLabel.textContent = audioPlayLabelText;
                  playBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
                  playBtn.classList.add('bg-[#2A9D8F]', 'hover:bg-[#238276]');
                } else {
                  window.TrackTalesSpeakText(fullText, () => {
                    playBtn.setAttribute('data-reading', 'false');
                    if (playLabel) playLabel.textContent = audioPlayLabelText;
                    playBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
                    playBtn.classList.add('bg-[#2A9D8F]', 'hover:bg-[#238276]');
                  });
                  playBtn.setAttribute('data-reading', 'true');
                  if (playLabel) playLabel.textContent = audioStopLabelText;
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
              <span class="text-xs text-[#78716C] font-mono">${audioLockedText}</span>
            </div>
            <button type="button" id="modal-audio-unlock-btn" class="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-[#2A9D8F] text-white font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-[#238276] transition-all flex items-center justify-center gap-1.5 shadow-sm">
              <i data-lucide="crown" class="w-3 h-3"></i>
              <span>${audioUnlockBtnText}</span>
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

    const langCode = window.TrackTalesLanguageCode || localStorage.getItem('tracktales_lang') || 'en';
    const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[langCode]) ? TRANSLATIONS[langCode] : {};

    const rawTrain = (appData.trains || FALLBACK_TRAINS).find(t => t.id === currentTrainId) || FALLBACK_TRAINS[0];
    const train = getTrainInLanguage(rawTrain, langCode);
    const trainName = train.name;

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
      const rawDossiers = PREMIUM_HISTORICAL_DOSSIERS[currentTrainId] || PREMIUM_HISTORICAL_DOSSIERS['blue-train'];
      const dossiers = rawDossiers.map(d => getDossierInLanguage(d));

      if (plan.hasVault) {
        // UNLOCKED VIEW: Full Archival Dossiers
        vaultSection.innerHTML = `
          <div class="glass-card p-8 sm:p-10 rounded-3xl border-2 border-[#D99B26]/40 shadow-xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF8F5] text-left">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#EBE5D9]">
              <div>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono bg-[#D99B26]/20 text-[#B87C10] border border-[#D99B26]/40 uppercase font-extrabold tracking-wider mb-2">
                  <i data-lucide="shield-check" class="w-3.5 h-3.5 text-[#D99B26]"></i>
                  <span>${dict.vault_unlocked_badge || 'PREMIUM ARCHIVAL VAULT UNLOCKED'} · ${trainName.toUpperCase()}</span>
                </div>
                <h3 class="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A0C10]">
                  ${dict.vault_unlocked_title || 'Deeper Historical <span class="text-[#B87C10] italic font-serif">Archival Dossiers</span>'}
                </h3>
                <p class="text-xs text-[#78716C] font-sans mt-1">
                  ${dict.vault_unlocked_sub ? dict.vault_unlocked_sub.replace('{train}', trainName) : `Access declassified rail ledgers, wartime secret runs, and blueprint schematics for ${trainName}.`}
                </p>
              </div>
              <span class="text-xs font-mono font-bold text-[#B87C10] px-3.5 py-1.5 rounded-xl bg-[#D99B26]/15 border border-[#D99B26]/30 shrink-0">
                ${dossiers.length} ${dict.vault_declassified_files || 'Declassified Files'}
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
                    <span>${dict.btn_inspect_dossier || 'Inspect Dossier'}</span>
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
                    <span>${dict.vault_locked_badge || 'LOCKED FEATURE · PREMIUM JOURNEY PACK & VIP MEMBERSHIP'}</span>
                  </div>
                  <h3 class="font-heading font-extrabold text-2xl text-[#0A0C10] mb-2">
                    ${dict.vault_locked_title || 'Deeper Historical Content & Archival Vault'}
                  </h3>
                  <p class="text-xs text-[#78716C] font-sans max-w-xl leading-relaxed">
                    ${dict.vault_locked_sub ? dict.vault_locked_sub.replace('{train}', trainName) : `Unlock declassified 1946 wartime gold bullion transport runs, 24K gold acoustic glazing engineering schematics, and historic telegrams for ${trainName}.`}
                  </p>
                </div>
              </div>

              <button type="button" id="btn-unlock-vault-cta" class="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-[#D99B26] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#C98B1E] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D99B26]/20 shrink-0">
                <i data-lucide="crown" class="w-4 h-4"></i>
                <span>${dict.vault_locked_btn || 'Unlock Historical Vault (R79)'}</span>
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
                  <span>${dict.audio_active_badge || 'AUDIO EXPERIENCE PASS ACTIVE'} · ${trainName.toUpperCase()}</span>
                </div>
                <h3 class="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A0C10]">
                  ${dict.audio_active_title || 'Narrated Journey <span class="text-[#2A9D8F] italic font-serif">Audio Companion</span>'}
                </h3>
                <p class="text-xs text-[#78716C] font-sans mt-1">
                  ${dict.audio_active_sub || 'Listen to live speech-synthesized narration of heritage stories, commentary, and ambient rail soundscapes.'}
                </p>
              </div>

              <!-- Animated Equalizer Waveform -->
              <div id="audio-equalizer-bars" class="flex items-center gap-1.5 h-8 px-4 py-1.5 rounded-2xl bg-white border border-[#2A9D8F]/30 shadow-sm shrink-0">
                <span class="w-1.5 h-4 bg-[#2A9D8F] rounded-full animate-pulse"></span>
                <span class="w-1.5 h-7 bg-[#2A9D8F] rounded-full animate-bounce"></span>
                <span class="w-1.5 h-3 bg-[#2A9D8F] rounded-full animate-pulse"></span>
                <span class="w-1.5 h-6 bg-[#2A9D8F] rounded-full animate-bounce"></span>
                <span class="w-1.5 h-5 bg-[#2A9D8F] rounded-full animate-pulse"></span>
                <span class="text-[10px] font-mono text-[#2A9D8F] font-bold ml-1.5" id="audio-eq-status">${dict.audio_status_ready || 'READY'}</span>
              </div>
            </div>

            <!-- Interactive Narration Console -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <!-- Left: Player Controls & Voice Selection -->
              <div class="lg:col-span-7 space-y-5">
                
                <!-- Story Select Dropdown -->
                <div>
                  <label class="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#78716C] mb-1.5">${dict.audio_select_story_label || 'Select Journey Story to Listen:'}</label>
                  <select id="audio-story-selector" class="w-full p-3 rounded-xl bg-white border border-[#D6CFC7] font-sans text-xs font-semibold text-[#1C1917] focus:outline-none focus:border-[#2A9D8F]">
                    ${(appData.stories || FALLBACK_STORIES).filter(s => s.train_id === 'all' || s.train_id === currentTrainId).map(rawS => {
                      const s = getStoryInLanguage(rawS, langCode);
                      return `<option value="${s.id}">${s.title} (${s.read_time})</option>`;
                    }).join('')}
                  </select>
                </div>

                <!-- Voice Actor Profile Select -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button type="button" data-voice-profile="james" class="audio-voice-btn p-2.5 rounded-xl border-2 border-[#2A9D8F] bg-[#2A9D8F]/10 text-left transition-all active">
                    <span class="text-[10px] font-mono font-bold uppercase block text-[#2A9D8F]">${dict.narrator_james_name || 'Narrator James'}</span>
                    <span class="text-[9px] text-[#78716C] font-sans">${dict.narrator_james_role || 'Heritage Historian'}</span>
                  </button>
                  <button type="button" data-voice-profile="thandi" class="audio-voice-btn p-2.5 rounded-xl border-2 border-[#E7E2D8] bg-white text-left transition-all hover:border-[#2A9D8F]">
                    <span class="text-[10px] font-mono font-bold uppercase block text-[#1C1917]">${dict.narrator_thandi_name || 'Narrator Thandi'}</span>
                    <span class="text-[9px] text-[#78716C] font-sans">${dict.narrator_thandi_role || 'Karoo Explorer'}</span>
                  </button>
                  <button type="button" data-voice-profile="willem" class="audio-voice-btn p-2.5 rounded-xl border-2 border-[#E7E2D8] bg-white text-left transition-all hover:border-[#2A9D8F]">
                    <span class="text-[10px] font-mono font-bold uppercase block text-[#1C1917]">${dict.narrator_willem_name || 'Narrator Willem'}</span>
                    <span class="text-[9px] text-[#78716C] font-sans">${dict.narrator_willem_role || 'Steam Master'}</span>
                  </button>
                </div>

                <!-- Playback Action Row -->
                <div class="flex flex-wrap items-center gap-3 pt-2">
                  <button type="button" id="btn-audio-play-main" class="px-6 py-3.5 rounded-2xl bg-[#2A9D8F] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#238276] transition-all flex items-center gap-2 shadow-md">
                    <i data-lucide="play" class="w-4 h-4"></i>
                    <span id="audio-play-main-label">${dict.audio_btn_play || 'Play Story Audio'}</span>
                  </button>
                  <button type="button" id="btn-audio-stop-main" class="px-4 py-3.5 rounded-2xl border border-[#D6CFC7] text-[#44403C] font-mono text-xs font-bold uppercase hover:bg-black/5 transition-all flex items-center gap-1.5">
                    <i data-lucide="square" class="w-3.5 h-3.5"></i>
                    <span>${dict.audio_btn_stop || 'Stop'}</span>
                  </button>

                  <!-- Speed Controls -->
                  <div class="flex items-center gap-1 ml-auto font-mono text-[10px] font-bold">
                    <span class="text-[#78716C] mr-1">${dict.audio_speed_label || 'Speed:'}</span>
                    <button type="button" data-speed="1.0" class="audio-speed-btn px-2.5 py-1.5 rounded-lg border-2 border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#2A9D8F] active">1.0x</button>
                    <button type="button" data-speed="1.25" class="audio-speed-btn px-2.5 py-1.5 rounded-lg border border-[#D6CFC7] bg-white text-[#78716C] hover:border-[#2A9D8F]">1.25x</button>
                    <button type="button" data-speed="1.5" class="audio-speed-btn px-2.5 py-1.5 rounded-lg border border-[#D6CFC7] bg-white text-[#78716C] hover:border-[#2A9D8F]">1.5x</button>
                  </div>
                </div>

              </div>

              <!-- Right: Ambient Rail Soundscape Generator -->
              <div class="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#EBE5D9] shadow-sm text-left space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2A9D8F]">${dict.soundscape_mixer_title || 'Ambient Soundscape Mixer'}</span>
                  <span class="text-[9px] font-mono text-[#78716C] font-semibold">${dict.soundscape_synth_label || 'Web Audio Synthesizer'}</span>
                </div>

                <div class="space-y-2.5">
                  <button type="button" data-soundscape="chug" class="soundscape-btn w-full p-3 rounded-xl border text-xs font-sans font-semibold transition-all flex items-center justify-between border-[#EBE5D9] hover:border-[#2A9D8F] text-[#1C1917]">
                    <span class="flex items-center gap-2"><i data-lucide="train" class="w-4 h-4 text-[#2A9D8F]"></i> ${dict.soundscape_chug || 'Karoo Track Chug & Steam'}</span>
                    <i data-lucide="volume-2" class="w-4 h-4 text-[#78716C]"></i>
                  </button>
                  <button type="button" data-soundscape="wind" class="soundscape-btn w-full p-3 rounded-xl border text-xs font-sans font-semibold transition-all flex items-center justify-between border-[#EBE5D9] hover:border-[#2A9D8F] text-[#1C1917]">
                    <span class="flex items-center gap-2"><i data-lucide="wind" class="w-4 h-4 text-[#2A9D8F]"></i> ${dict.soundscape_wind || 'Great Karoo Desert Wind'}</span>
                    <i data-lucide="volume-2" class="w-4 h-4 text-[#78716C]"></i>
                  </button>
                  <button type="button" data-soundscape="lounge" class="soundscape-btn w-full p-3 rounded-xl border text-xs font-sans font-semibold transition-all flex items-center justify-between border-[#EBE5D9] hover:border-[#2A9D8F] text-[#1C1917]">
                    <span class="flex items-center gap-2"><i data-lucide="music" class="w-4 h-4 text-[#2A9D8F]"></i> ${dict.soundscape_lounge || 'Luxury Salon Cello & Piano'}</span>
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
                    <span>${dict.audio_locked_badge || 'LOCKED FEATURE · AUDIO EXPERIENCE & VIP MEMBERSHIP'}</span>
                  </div>
                  <h3 class="font-heading font-extrabold text-2xl text-[#0A0C10] mb-2">
                    ${dict.audio_locked_title || 'Narrated / Listenable Journey Audio Companion'}
                  </h3>
                  <p class="text-xs text-[#78716C] font-sans max-w-xl leading-relaxed">
                    ${dict.audio_locked_sub ? dict.audio_locked_sub.replace('{train}', trainName) : `Unlock natural speech synthesis narrations of South Africa rail stories, voice actor profiles, and ambient Karoo soundscapes for ${trainName}.`}
                  </p>
                </div>
              </div>

              <button type="button" id="btn-unlock-audio-cta" class="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-[#2A9D8F] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#238276] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#2A9D8F]/20 shrink-0">
                <i data-lucide="headphones" class="w-4 h-4"></i>
                <span>${dict.audio_locked_btn || 'Unlock Audio Pass (R49)'}</span>
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
            const rawStory = (appData.stories || FALLBACK_STORIES).find(s => s.id === selectedStoryId) || (appData.stories || FALLBACK_STORIES)[0];
            if (rawStory) {
              const langCode = window.TrackTalesLanguageCode || localStorage.getItem('tracktales_lang') || 'en';
              const dict = (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[langCode]) ? TRANSLATIONS[langCode] : {};
              const byPrefix = dict.by_author || 'By';
              const story = getStoryInLanguage(rawStory, langCode);
              const narration = `${story.title}. ${byPrefix} ${story.author}. ${story.summary}. ${getFullStoryText(story)}`;
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
        stops_desc: 'An immersive living journey tracing historic stations, mountain passes, and Karoo desert junctions along Mzansi\'s iconic 1,600 km rail corridor.',
        stories_title: 'Journey <span class="text-[#D99B26] italic font-serif">Stories</span>',
        stories_sub: 'Archival stories, engineering milestones, and folklore along South Africa\'s luxury corridor.',
        auth_welcome: 'Welcome',
        auth_welcome_sub: 'Sign in to access your South Africa rail companion pass.',
        auth_create: 'Create Account',
        auth_create_sub: 'Register for your TrackTales digital passport.',
        auth_signin_btn: 'SIGN IN',
        auth_signup_btn: 'CREATE ACCOUNT',
        email_ph: 'Email *',
        pass_ph: 'Password *',
        name_ph: 'Full Name *',
        confirm_pass_ph: 'Confirm Password *',
        nav_trigger: 'Navigate',
        nav_access: 'Access',
        nav_sos: 'SOS',
        nav_signin: 'Sign In',
        nav_signout: 'Sign Out',
        nav_hub_companion: 'CORRIDOR COMPANION',
        nav_hub_title: 'Navigation Hub Panel',
        nav_hub_subtitle: '1,600 km Pretoria to Cape Town',
        nav_card_route_title: 'The Route',
        nav_card_route_desc: 'Cinematic corridor overview & live interactive route.',
        nav_card_stops_title: 'Corridor Stops',
        nav_card_stops_desc: 'Living stations, mountain passes & Karoo desert junctions.',
        nav_card_stories_title: 'Stories & Vault',
        nav_card_stories_desc: 'Historic archives, secret dossiers & audio narrations.',
        nav_card_trains_title: 'Flagship Modes',
        nav_card_trains_desc: 'The Blue Train & Rovos Rail specifications & dining.',
        nav_card_games_title: 'Corridor Games',
        nav_card_games_desc: 'Stop quizzes, Mzansi Rail Bingo & build next stop puzzle.',
        nav_card_voice_title: 'Voice Journal',
        nav_card_voice_desc: 'Real-time speech-to-text dictation & passenger diary.',
        nav_hub_tap_hint: 'Tap any destination card to navigate',
        stories_badge: 'HERITAGE STORIES & ARCHIVES',
        stories_active_pass_label: 'Active Pass:',
        stories_change_pass_btn: 'Change Pass',
        stories_all_passes_label: 'Included in All Passes',
        stories_read_story_btn: 'Read Full Story',
        stories_min_read: 'min read',
        vault_locked_badge: 'LOCKED FEATURE · PREMIUM JOURNEY PACK & VIP MEMBERSHIP',
        vault_locked_title: 'Deeper Historical Content & Archival Vault',
        vault_locked_sub: 'Unlock declassified 1946 wartime gold bullion transport runs, 24K gold acoustic glazing engineering schematics, and historic telegrams for {train}.',
        vault_locked_btn: 'Unlock Historical Vault (R79)',
        audio_locked_badge: 'LOCKED FEATURE · AUDIO EXPERIENCE & VIP MEMBERSHIP',
        audio_locked_title: 'Narrated / Listenable Journey Audio Companion',
        audio_locked_sub: 'Unlock natural speech synthesis narrations of South Africa rail stories, voice actor profiles, and ambient Karoo soundscapes for {train}.',
        audio_locked_btn: 'Unlock Audio Pass (R49)',
        by_author: 'By',
        modal_audio_unlocked: 'Audio Companion Unlocked',
        modal_audio_listen_desc: 'Listen to complete story narration',
        modal_audio_play: 'Play Audio',
        modal_audio_stop: 'Stop Audio',
        modal_audio_locked: 'Audio narration locked for this story.',
        modal_audio_unlock_btn: 'Unlock Audio Pass (R49)',
        footer_tagline: 'REAL ROUTES. EXTRAORDINARY STORIES.',
        footer_desc: 'A digital storytelling companion for the Pretoria to Cape Town rail corridor celebrating the timeless heritage, scenery, and culture of South Africa\'s iconic railways.',
        footer_nav_heading: 'Navigation',
        footer_link_route: 'The Route',
        footer_link_trains: 'Flagship Trains',
        footer_link_sights: 'Sights & Landmarks',
        footer_link_puzzles: 'Sight Solver Puzzles',
        footer_link_voice: 'Voice Journal & Log',
        footer_link_heritage: 'Heritage & About',
        footer_corridor_heading: 'Corridor Journey',
        footer_corridor_desc: 'Traversing 1,600 km across South Africa\'s heartland from the Jacaranda City to Table Mountain.',
        footer_corridor_badge: 'Pretoria to Cape Town',
        footer_copyright: '© 2026 TrackTales. All rights reserved.',
        footer_corridor_tag: 'Pretoria to Cape Town Corridor',
        games_badge: 'CORRIDOR GAMES & SIGHT CHALLENGES',
        games_title: 'Games Based on <span class="text-[#C85028] italic font-serif">Stops</span>',
        games_subtitle: 'Interactive games celebrating South Africa\'s 1,600 km rail corridor. Play stop-by-stop trivia quizzes, stamp Mzansi Rail Bingo cards, and assemble the next stop with route puzzles.',
        game_tab_quiz: 'Stop Quizzes',
        game_tab_bingo: 'Mzansi Rail Bingo',
        game_tab_puzzle: 'Build Next Stop',
        score_label_score: 'CORRIDOR SCORE',
        score_unit_pts: 'pts',
        score_label_won: 'CHALLENGES WON',
        score_unit_completed: 'completed',
        score_label_streak: 'CORRIDOR STREAK',
        score_unit_in_a_row: 'in a row',
        btn_reset_games: 'Reset All Games',
        bingo_badge: '3X3 RAIL SIGHT GRID',
        bingo_title: 'Mzansi Rail Corridor Bingo',
        bingo_subtitle: 'Tap any landmark cell when spotted along your rail journey to stamp it. Complete any 3-in-a-row (horizontal, vertical, or diagonal) for a Bingo Win!',
        btn_reset_bingo: 'Reset Stamps',
        btn_new_bingo: 'New Card',
        puzzle_badge: 'INTERACTIVE ROUTE ASSEMBLER',
        puzzle_title: 'Build Next Stop via Puzzle',
        puzzle_subtitle: 'Sequence the rail corridor stations and flagship locomotive components from North to South in the correct geographic order.',
        puzzle_track_title: 'ASSEMBLED CORRIDOR TRACK (NORTH TO SOUTH)',
        puzzle_available_title: 'AVAILABLE STOP PIECES (TAP TO PLACE IN NEXT OPEN SLOT)',
        puzzle_btn_clear: 'Clear Slots',
        puzzle_btn_verify: 'VERIFY SEQUENCE',
        pillar_1_title: 'What is TrackTales?',
        pillar_1_desc: 'TrackTales is a digital companion for the Pretoria to Cape Town corridor, making luxury rail heritage accessible to everyone through stories, audio soundscapes, and sight solvers.',
        pillar_2_title: 'South Africa Tourism',
        pillar_2_desc: 'From Jacaranda streets in Pretoria and Kimberley diamond vaults to the starry Karoo night sky and Table Mountain\'s coastal peak, rail travel showcases Mzansi at its finest.',
        pillar_3_title: 'Rail Legacy',
        pillar_3_desc: 'Laid during the 1870s diamond rush, the Pretoria to Cape Town line connected inland hubs directly to coastal ports, creating legendary trains like The Blue Train and Rovos Rail.'
      },
      zu: {
        hero_tag: 'UMZILA OSUSUKA E-PRETORIA UYA E-KAPA · ISITIMELA ESIBLUU',
        hero_h1: 'Bukela Uhambo',
        hero_h1_sub: 'Lwembuleka.',
        hero_desc: 'Ithikithi lesitimela esisezingeni eliphezulu lingabiza izinkulungwane zamaRandi. I-TrackTales ilandelela lowo mzila omuhle kusukela eHighveld kuya olwandle.',
        stops_tag: 'UMLANDO WEZITIMELA WASENINGIZIMU AFRIKA · PRETORIA KUYA EKAPA',
        stops_title: 'Izitobhi Zomzila',
        stops_desc: 'Uhambo olubukhoma olulandelela iziteshi zomlando, izintaba, nezindawo zeKaroo ebangeni elingamakhilomitha angu-1,600.',
        stories_title: 'Izindaba <span class="text-[#D99B26] italic font-serif">Zohambo</span>',
        stories_sub: 'Izindaba zomlando, impumelelo yezobunjiniyela namagugu omzila wesitimela waseNingizimu Afrika.',
        auth_welcome: 'Siyakwamukela',
        auth_welcome_sub: 'Ngena ukuze uthole iphasipoti yakho yezitimela yaseNingizimu Afrika.',
        auth_create: 'Dala Inkwama/Akaunti',
        auth_create_sub: 'Bhalisa ngebhuku lakho ledijithali le-TrackTales.',
        auth_signin_btn: 'NGENA',
        auth_signup_btn: 'DALA AKAUNTI',
        email_ph: 'I-Imeyili *',
        pass_ph: 'Iphasiwedi *',
        name_ph: 'Igama Eliphelele *',
        confirm_pass_ph: 'Gcina Iphasiwedi *',
        nav_trigger: 'Zulalela',
        nav_access: 'Finyelela',
        nav_sos: 'SOS',
        nav_signin: 'Ngena',
        nav_signout: 'Phuma',
        nav_hub_companion: 'UMUZI WESITIMELA',
        nav_hub_title: 'I-Panel Yokuhamba',
        nav_hub_subtitle: '1,600 km Pretoria kuya eKapa',
        nav_card_route_title: 'Umzila',
        nav_card_route_desc: 'Ukubuyekezwa komzila wokubuka nemodi ebukhoma.',
        nav_card_stops_title: 'Izitobhi Zomzila',
        nav_card_stops_desc: 'Iziteshi zomlando, izintaba namahlane laseKaroo.',
        nav_card_stories_title: 'Izindaba Nemibhalo',
        nav_card_stories_desc: 'Amalungelo amagugu nesitimela ngezwi.',
        nav_card_trains_title: 'Izitimela Ezinkulu',
        nav_card_trains_desc: 'The Blue Train le-Rovos Rail nezokudla.',
        nav_card_games_title: 'Imidlalo Yezitimela',
        nav_card_games_desc: 'Imibuzo yezitobhi, Rail Bingo nesithombe.',
        nav_card_voice_title: 'Ijenali Yezwi',
        nav_card_voice_desc: 'Izwi lesikhathi sangempela namaphepha agibeli.',
        nav_hub_tap_hint: 'Thinta ikhadi ukuze uhambe',
        stories_badge: 'AMAGUGU NEZINDABA',
        stories_active_pass_label: 'Iphasipoti Elingena:',
        stories_change_pass_btn: 'Shintsha Iphasipoti',
        stories_all_passes_label: 'Kufakwe Kuwo Wonke Amaphasipoti',
        stories_read_story_btn: 'Funda Indaba Ephelele',
        stories_min_read: 'mimiz efunwayo',
        by_author: 'Ngu',
        modal_audio_unlocked: 'Umhlahlandlela Womhlaba Wonke Womsindo Uvuliwe',
        modal_audio_listen_desc: 'Lalela ukuxoxwa kwendaba ephelele',
        modal_audio_play: 'Dlala Umsindo',
        modal_audio_stop: 'Misa Umsindo',
        modal_audio_locked: 'Ukulalela kuka-audio kuvalelwe le ndaba.',
        modal_audio_unlock_btn: 'Vula Iphasipoti Yomsindo (R49)',
        footer_tagline: 'IMIZILA SIBILI. IZINDABA EZIMNANDI.',
        footer_desc: 'Umhlahlandlela wedijithali womzila wesitimela osuka ePretoria uya eKapa ogubha amagugu, ubuhle nendlela yokuphila yezitimela waseNingizimu Afrika.',
        footer_nav_heading: 'Ukuhamba',
        footer_link_route: 'Umzila',
        footer_link_trains: 'Izitimela Ezinkulu',
        footer_link_sights: 'Izindawo Nezikhumbuzo',
        footer_link_puzzles: 'Imidlalo Nezinselelo',
        footer_link_voice: 'Ijenali Yezwi',
        footer_link_heritage: 'Amagugu Nezokuxhumana',
        footer_corridor_heading: 'Uhambo Lwomzila',
        footer_corridor_desc: 'Kuhanjwa amakhilomitha angu-1,600 ukusuka ePretoria kuya kwiNtaba yeThebula.',
        footer_corridor_badge: 'Pretoria kuya eKapa',
        footer_copyright: '© 2026 TrackTales. Wonke amalungelo agodliwe.',
        footer_corridor_tag: 'Umzila wasePretoria kuya eKapa',
        games_badge: 'IMIDLALO YOMZILA WEZITIMELA',
        games_title: 'Imidlalo Okusekelwe <span class="text-[#C85028] italic font-serif">Kwezitobhi</span>',
        games_subtitle: 'Imidlalo yokubungaza umzila wesitimela waseNingizimu Afrika ongamakhilomitha angu-1,600. Dlala imibuzo yezitobhi, ugqamise amakhadi e-Bingo, nokuhlanganisa umzila.',
        game_tab_quiz: 'Imibuzo Yezitobhi',
        game_tab_bingo: 'Mzansi Rail Bingo',
        game_tab_puzzle: 'Yakha Isitobhi Esilandelayo',
        score_label_score: 'AMAPHUZU YOMZILA',
        score_unit_pts: 'pts',
        score_label_won: 'IZINSELELE EZIWONGWE',
        score_unit_completed: 'ziqediwe',
        score_label_streak: 'UHLELO LOMZILA',
        score_unit_in_a_row: 'ngokulandelana',
        btn_reset_games: 'Setha Kabusha Imidlalo',
        bingo_badge: '3X3 IHLELO LOKUBUKA',
        bingo_title: 'Mzansi Rail Corridor Bingo',
        bingo_subtitle: 'Thinta noma iyiphi indawo lapho ubona uhambo lwakho ukuze uyigqamise. Qedela 3 ngokulandelana ukuze uwine Bingo!',
        btn_reset_bingo: 'Setha Kabusha Izistampu',
        btn_new_bingo: 'Ikhadi Elisha',
        puzzle_badge: 'UHLANGANISA UMZILA',
        puzzle_title: 'Yakha Isitobhi Esilandelayo',
        puzzle_subtitle: 'Renga iziteshi zomzila nezimoto zesitimela kusukela enyakatho kuya eningizimu ngokulandelana kwendawo.',
        puzzle_track_title: 'UMZILA OWUHLANGANISIWE (ENYAKATHO KUYA ENINGIZIMU)',
        puzzle_available_title: 'IZINSIZA EZITHOLAKALAYO (THINTA UKUZE UFAKE ESIKHALENI)',
        puzzle_btn_clear: 'Sula Izikhala',
        puzzle_btn_verify: 'HLOLA UKULANDELANA',
        pillar_1_title: 'Yini i-TrackTales?',
        pillar_1_desc: 'I-TrackTales iwumhlahlandlela wedijithali osuka ePretoria uya eKapa, owenza amagugu ezitimela afinyeleleke kubo bonke ngezindaba omsindo.',
        pillar_2_title: 'Ezokuvakasha Eningizimu Afrika',
        pillar_2_desc: 'Kusukela emigwaqweni ye-Jacaranda e-Pretoria nase-Kimberley kuya esibhakabhakeni sase-Karoo nase-Ntabeni yeThebula, uhambo lwesitimela lubonisa ubuhle be-Mzansi.',
        pillar_3_title: 'Amagugu Ezitimela',
        pillar_3_desc: 'Yakhiwa ngeminyaka ya-1870, indlela yasePretoria kuya eKapa yaxhuma amadolobha angebanga olwandle, yakha izitimela ezidumile njenge-The Blue Train ne-Rovos Rail.'
      },
      xh: {
        hero_tag: 'INDLELA ESUSUKA ETPRETORIA ISINGA EKAPA · ITRENI EBLUU',
        hero_h1: 'Bukela Uhambo',
        hero_h1_sub: 'Lutyhilwa.',
        hero_desc: 'Itikiti likaloliwe wokunethezeka linokubiza amawaka eerandi. I-TrackTales ilandela lo mzila mhle ukusuka eHighveld ukuya e-Atlantic.',
        stops_tag: 'ILIFA LIKALOLIWE WASENINGIZIMU AFRIKA · PRETORIA UKUYA EKAPA',
        stops_title: 'Izitishi Zomzila',
        stops_desc: 'Uhambo olutyhila izitishi zembali, iindledlana zeentaba kunye namathafa aseKaroo kumgama ongamakhilomitha ayi-1,600.',
        stories_title: 'Ibali <span class="text-[#D99B26] italic font-serif">Lohambo</span>',
        stories_sub: 'Amabali embali, impumelelo kanjineli nelifa likaloliwe waseMzantsi Afrika.',
        auth_welcome: 'Wamkelekile',
        auth_welcome_sub: 'Ngena ukufumana iphasipoti yakho kaloliwe waseMzantsi Afrika.',
        auth_create: 'Vula Akaunti',
        auth_create_sub: 'Bhalisela iphasipoti yakho yawe-TrackTales.',
        auth_signin_btn: 'NGENA',
        auth_signup_btn: 'VULA AKAUNTI',
        email_ph: 'I-Imeleyi *',
        pass_ph: 'Igama lokugqitha *',
        name_ph: 'Amagama Apheleleyo *',
        confirm_pass_ph: 'Gqithisa Igama lokugqitha *',
        nav_trigger: 'Zulazula',
        nav_access: 'Fikelela',
        nav_sos: 'SOS',
        nav_signin: 'Ngena',
        nav_signout: 'Phuma',
        nav_hub_companion: 'IQABANE LIKALOLIWE',
        nav_hub_title: 'Ipani Yelololiwe',
        nav_hub_subtitle: '1,600 km Pretoria ukuya eKapa',
        nav_card_route_title: 'Indlela',
        nav_card_route_desc: 'Uhambo olubukekayo nebalazwe elibukhoma.',
        nav_card_stops_title: 'Izitishi Zomzila',
        nav_card_stops_desc: 'Izitishi zembali, iindledlana zeentaba neKaroo.',
        nav_card_stories_title: 'Amabali Nembali',
        nav_card_stories_desc: 'Ugcino lwembali namabali elirholayo.',
        nav_card_trains_title: 'Izitimela Ze-Luxury',
        nav_card_trains_desc: 'The Blue Train ne-Rovos Rail ezokutya.',
        nav_card_games_title: 'Imidlalo Kaloliwe',
        nav_card_games_desc: 'Imibuzo yezitishi ne-Rail Bingo.',
        nav_card_voice_title: 'Ijenali Yelizwi',
        nav_card_voice_desc: 'Izwi lesikolo neembali zabakhweli.',
        nav_hub_tap_hint: 'Cofa ikhadi ukuze uyokhangela',
        stories_badge: 'ILIFA LIKALOLIWE NAMABALI',
        stories_active_pass_label: 'Iphasipoti Esebrenzayo:',
        stories_change_pass_btn: 'Tshintsha Iphasipoti',
        stories_all_passes_label: 'Kufakwe Kuko Konke Iphasipoti',
        stories_read_story_btn: 'Funda Ibali Epheleleyo',
        stories_min_read: 'imiz yofundo',
        by_author: 'Ngu',
        modal_audio_unlocked: 'Iqabane Le-Audio Livuliwe',
        modal_audio_listen_desc: 'Mamela ukubaliswa kwebali epheleleyo',
        modal_audio_play: 'Dlalisa I-Audio',
        modal_audio_stop: 'Misa I-Audio',
        modal_audio_locked: 'Ukubaliswa kwe-audio kuvaliwe kule bali.',
        modal_audio_unlock_btn: 'Vula Iphasipoti Yomsindo (R49)',
        footer_tagline: 'IINDLELA NYANI. AMABALI AMANGALISAYO.',
        footer_desc: 'Iqabane ledijithali lomzila kaloliwe osuka ePretoria ukuya eKapa umbhiyozo welifa, imbonakalo nenkcubeko yakaloliwe waseMzantsi Afrika.',
        footer_nav_heading: 'Ukuzulazula',
        footer_link_route: 'Indlela',
        footer_link_trains: 'Izitimela Ze-Luxury',
        footer_link_sights: 'Izitishi Nezithombe',
        footer_link_puzzles: 'Imidlalo Neepuzzle',
        footer_link_voice: 'Ijenali Yelizwi',
        footer_link_heritage: 'Ilifa Malunga Nathi',
        footer_corridor_heading: 'Uhambo Lwomzila',
        footer_corridor_desc: 'Ukuhamba umgama ongamakhilomitha ayi-1,600 kusuka ePretoria ukuya e-Table Mountain.',
        footer_corridor_badge: 'Pretoria ukuya eKapa',
        footer_copyright: '© 2026 TrackTales. Onke amalungelo agcinwe.',
        footer_corridor_tag: 'Umzila wasePretoria ukuya eKapa',
        games_badge: 'IMIDLALO YOMZILA KALOLIWE',
        games_title: 'Imidlalo Esekelwe <span class="text-[#C85028] italic font-serif">Kwizitishi</span>',
        games_subtitle: 'Imidlalo yokubhiyoza umzila kaloliwe waseMzantsi Afrika ongamakhilomitha ayi-1,600. Dlala imibuzo yezitishi, ugqumise amakhadi e-Bingo, uhlanganise indlela.',
        game_tab_quiz: 'Imibuzo Yezitishi',
        game_tab_bingo: 'Mzansi Rail Bingo',
        game_tab_puzzle: 'Yakha Isitishi Esilandelayo',
        score_label_score: 'AMANQAKU YOMZILA',
        score_unit_pts: 'pts',
        score_label_won: 'IZINSELELO EZAPHENYIWEYO',
        score_unit_completed: 'zigqityiwe',
        score_label_streak: 'UHLELO LOKULANDELANA',
        score_unit_in_a_row: 'ngokulandelana',
        btn_reset_games: 'Seta Ngokutsha Imidlalo',
        bingo_badge: '3X3 ITHEYIBHILE YOKUBUKA',
        bingo_title: 'Mzansi Rail Corridor Bingo',
        bingo_subtitle: 'Cofa kuyo nayiphi na indawo xa uyibona kuhambo lwakho ukwenzela uyigqumise. Gqiba ezi-3 ngokulandelana ukuze uwine iBingo!',
        btn_reset_bingo: 'Seta Ngokutsha Izitembu',
        btn_new_bingo: 'Ikhadi Elitsha',
        puzzle_badge: 'UDIBANISO LWENDLELA',
        puzzle_title: 'Yakha Isitishi Esilandelayo',
        puzzle_subtitle: 'Cwangcisa izitishi zikaloliwe namalungu ukusuka entla ukuya ezantsi ngokomyalelo wendawo.',
        puzzle_track_title: 'INDLELA EDIBANISIWEYO (ENTLA UKUYA EZANTSI)',
        puzzle_available_title: 'IZINTO EZHLELIYO (COFA UKUZE UFAKE EKAZINI)',
        puzzle_btn_clear: 'Susa Izikroba',
        puzzle_btn_verify: 'HLOLA UKULANDELANA',
        pillar_1_title: 'Yintoni i-TrackTales?',
        pillar_1_desc: 'I-TrackTales liqabane ledijithali lasePretoria kuya eKapa, elenza ilifa likaloliwe lifikeleleke kubo bonke ngamabali namawala alawulwayo.',
        pillar_2_title: 'Ukotyelelo eMzantsi Afrika',
        pillar_2_desc: 'Kusukela kwizitalato ze-Jacaranda ePretoria naseKimberley kuya esibhakabhakeni saseKaroo naseNtabeni yeThebula, uhambo lwesitimela lubonisa ubuhle beMzantsi.',
        pillar_3_title: 'Ilifa Likaloliwe',
        pillar_3_desc: 'Yakhiwa ngeminyaka yoo-1870, le ndlela yaxhuma izixeko ezingaphakathi namazwe asentla, yavelisa izitimela ezidumileyo ezinjenge-The Blue Train ne-Rovos Rail.'
      },
      af: {
        hero_tag: 'PRETORIA NA KAAPSTAD KORRIDOR · DIE BLOU TREIN',
        hero_h1: 'Kyk Hoe Die Reis',
        hero_h1_sub: 'Ontvou.',
        hero_desc: '\'n Luukse treinkaartjie vir hierdie roete kan tienduisende Rand kos. TrackTales volg dieselfde lyn van die Hoëveld tot by die Atlantiese Oseaan.',
        stops_tag: 'SUID-AFRIKAANSE SPOORWEGERFENIS · PRETORIA NA KAAPSTAD',
        stops_title: 'Korridor-haltes',
        stops_desc: '\'n Meeslepende lewende reis wat historiese stasies, bergklowe en Karoo-aansluitings langs Mzansi se ikoniese 1,600 km spoorlyn volg.',
        stories_title: 'Reis <span class="text-[#D99B26] italic font-serif">Verhale</span>',
        stories_sub: 'Argiefverhale, ingenieursmylpale en spoorwegerfenis langs Suid-Afrika se luukse roete.',
        auth_welcome: 'Welkom',
        auth_welcome_sub: 'Teken in vir toegang tot jou Suid-Afrikaanse spoorwegpas.',
        auth_create: 'Skep Rekening',
        auth_create_sub: 'Registreer vir jou digitale TrackTales-paspoort.',
        auth_signin_btn: 'TEKEN IN',
        auth_signup_btn: 'SKEP REKENING',
        email_ph: 'E-pos *',
        pass_ph: 'Wagwoord *',
        name_ph: 'Volle Naam *',
        confirm_pass_ph: 'Bevestig Wagwoord *',
        nav_trigger: 'Navigeer',
        nav_access: 'Toegang',
        nav_sos: 'SOS',
        nav_signin: 'Teken In',
        nav_signout: 'Teken Uit',
        nav_hub_companion: 'KORRIDOR GIDS',
        nav_hub_title: 'Navigasie Paneel',
        nav_hub_subtitle: '1,600 km Pretoria na Kaapstad',
        nav_card_route_title: 'Die Roete',
        nav_card_route_desc: 'Kinematografiese oorsig & lewendige roete.',
        nav_card_stops_title: 'Korridor-haltes',
        nav_card_stops_desc: 'Historiese stasies, bergklowe & Karoo-woestyn.',
        nav_card_stories_title: 'Verhale & Argief',
        nav_card_stories_desc: 'Historiese argiewe, geheime dossiers & oudio.',
        nav_card_trains_title: 'Vlagskip Treine',
        nav_card_trains_desc: 'Die Blou Trein & Rovos Rail besonderhede.',
        nav_card_games_title: 'Korridor Speletjies',
        nav_card_games_desc: 'Vasvrae, Spoorweg Bingo & legkaarte.',
        nav_card_voice_title: 'Stem Joernaal',
        nav_card_voice_desc: 'Intydse stem-na-teks & passasiersdagboek.',
        nav_hub_tap_hint: 'Tik enige roetekaart om te navigeer',
        stories_badge: 'ERFENISVERHALE & ARGIEWE',
        stories_active_pass_label: 'Actiewe Pas:',
        stories_change_pass_btn: 'Verander Pas',
        stories_all_passes_label: 'Ingesluit by Alle Passe',
        stories_read_story_btn: 'Lees Volledige Verhaal',
        stories_min_read: 'min lees',
        by_author: 'Deur',
        modal_audio_unlocked: 'Oudio-metgesel Ontsluit',
        modal_audio_listen_desc: 'Luister na die volledige verhaalvertelling',
        modal_audio_play: 'Speel Oudio',
        modal_audio_stop: 'Stop Oudio',
        modal_audio_locked: 'Oudio-vertelling is gesluit vir hierdie verhaal.',
        modal_audio_unlock_btn: 'Ontsluit Oudiopas (R49)',
        footer_tagline: 'EGTE ROETES. BUITENGEWONE VERHALEN.',
        footer_desc: '\'n Digitale verhale-metgesel vir die spoorwegkorridor van Pretoria na Kaapstad wat die tydlose erfenis, landskap en kultuur van Suid-Afrika se ikoniese spoorweë vier.',
        footer_nav_heading: 'Navigasie',
        footer_link_route: 'Die Roete',
        footer_link_trains: 'Vlagskip Treine',
        footer_link_sights: 'Bezienswaardighede',
        footer_link_puzzles: 'Legkaarte & Speletjies',
        footer_link_voice: 'Stem Joernaal',
        footer_link_heritage: 'Erfenis & Oor Ons',
        footer_corridor_heading: 'Korridor Reis',
        footer_corridor_desc: '1.600 km deur die hart van Suid-Afrika van Pretoria na die Tafelberg.',
        footer_corridor_badge: 'Pretoria na Kaapstad',
        footer_copyright: '© 2026 TrackTales. Alle regte vorbehou.',
        footer_corridor_tag: 'Pretoria na Kaapstad Korridor',
        games_badge: 'INTERAKTIEWE KORRIDOR SPELETJIES',
        games_title: 'Speletjies Gebaseer op <span class="text-[#C85028] italic font-serif">Haltes</span>',
        games_subtitle: 'Interaktiewe speletjies ter viering van Suid-Afrika se 1,600 km spoorwegkorridor. Speel halte-vasvrae, stempel Mzansi Bingo-kaarte, en bou die volgende halte met legkaarte.',
        game_tab_quiz: 'Halte-vasvrae',
        game_tab_bingo: 'Mzansi Rail Bingo',
        game_tab_puzzle: 'Bou Volgende Halte',
        score_label_score: 'KORRIDOR TELLING',
        score_unit_pts: 'ptn',
        score_label_won: 'UITDAGINGS GEWEN',
        score_unit_completed: 'voltooi',
        score_label_streak: 'REEKS OP \'N RY',
        score_unit_in_a_row: 'op \'n ry',
        btn_reset_games: 'Herstel Alle Speletjies',
        bingo_badge: '3X3 SPOORWEGBESIENWAARDIGHEDE',
        bingo_title: 'Mzansi Rail Corridor Bingo',
        bingo_subtitle: 'Tik enige baken wanneer u dit op u treinreis sien om dit te stempel. Voltooi 3-op-\'n-ry vir \'n Bingo-oorwinning!',
        btn_reset_bingo: 'Herstel Stempels',
        btn_new_bingo: 'Nuwe Kaart',
        puzzle_badge: 'INTERAKTIEWE ROETE-SAMESTELLER',
        puzzle_title: 'Bou Volgende Halte via Legkaart',
        puzzle_subtitle: 'Rangskik spoorwegstasies en treinonderdele van Noord na Suid in die korrekte geografiese volgorde.',
        puzzle_track_title: 'GESAMESTELDE KORRIDORSPOOR (NOORD NA SUID)',
        puzzle_available_title: 'BESKIKBARE HALTESTUKKE (TIK OM IN SLEUF TE PLAAS)',
        puzzle_btn_clear: 'Maak Sleuwe Skoon',
        puzzle_btn_verify: 'KONTROLEER VOLGORDE',
        pillar_1_title: 'Wat is TrackTales?',
        pillar_1_desc: 'TrackTales is \'n digitale reisgenoot vir die Pretoria na Kaapstad-korridor wat luukse spoorwegerfenis toeganklik maak deur stories en klank.',
        pillar_2_title: 'Suid-Afrika Toerisme',
        pillar_2_desc: 'Van Jakarandastrate in Pretoria en Kimberley se diamantkluis tot die Karoo se sterrehemel en Tafelberg, wys spoorreis Mzansi op sy beste.',
        pillar_3_title: 'Spoorwegerfenis',
        pillar_3_desc: 'Gebou tydens die 1870\'s se diamantstormloop, het dielyn binnelandse spilpunte met kushawens verbind en legendariese treine soos Die Bloutrein en Rovos Rail geskep.'
      },
      st: {
        hero_tag: 'TSELA HO TSOHA PRETORIA HO YA CAPE TOWN · TERENE YA BLUE',
        hero_h1: 'Shebella Leeto',
        hero_h1_sub: 'Le Senoleha.',
        hero_desc: 'Tekete ya terene ya mabothobotho e ka bitsa dikete tsa Diranta. TrackTales e latela tsela e ntle ho tloha Highveld ho ya Atlantic.',
        stops_tag: 'LEFA LA DITERENE LA AFRIKA BORWA · PRETORIA HO YA CAPE TOWN',
        stops_title: 'Diteishene tsa Tsela',
        stops_desc: 'Leeto le hlakileng le salang morao diteishene tsa nalane, ditsela tsa dithaba, le mahoatata a Karoo tseleng ya 1,600 km.',
        stories_title: 'Dineano tsa <span class="text-[#D99B26] italic font-serif">Leeto</span>',
        stories_sub: 'Dineano tsa nalane le dikarolo tsa boenjinihere tsa diterene tsa Afrika Borwa.',
        auth_welcome: 'Re a go Amogela',
        auth_welcome_sub: 'Kena ho fumana pasepoto ea hau ea terene ea Afrika Borwa.',
        auth_create: 'Etsa Akaunthe',
        auth_create_sub: 'Ingolise bakeng sa pasepoto ea hau ea dijithali ea TrackTales.',
        auth_signin_btn: 'KENA',
        auth_signup_btn: 'ETSA AKAUNTHE',
        email_ph: 'Imeile *',
        pass_ph: 'Pasepoto *',
        name_ph: 'Lebitso ka Botlalo *',
        confirm_pass_ph: 'Netefatsa Pasepoto *',
        nav_trigger: 'Tsamaea',
        nav_access: 'Fumaneha',
        nav_sos: 'SOS',
        nav_signin: 'Kena',
        nav_signout: 'Tsoa',
        nav_hub_companion: 'MOPHELI EA TERENE',
        nav_hub_title: 'Panele ea Leeto',
        nav_hub_subtitle: '1,600 km Pretoria ho ya Cape Town',
        nav_card_route_title: 'Tsela',
        nav_card_route_desc: 'Kakaretso ea tsela le mebapa e phelang.',
        nav_card_stops_title: 'Diteishene tsa Tsela',
        nav_card_stops_desc: 'Diteishene tsa nalane, dithaba le Karoo.',
        nav_card_stories_title: 'Dineano le Polokelo',
        nav_card_stories_desc: 'Litlaleho tsa nalane le mantswe.',
        nav_card_trains_title: 'Diterene tsa Mabothobotho',
        nav_card_trains_desc: 'Terene ea Blue le Rovos Rail.',
        nav_card_games_title: 'Lipapali tsa Terene',
        nav_card_games_desc: 'Lipotso tsa diteishene le Bingo.',
        nav_card_voice_title: 'Bukana ea Lentswe',
        nav_card_voice_desc: 'Lentswe la nako ea sebele le buka.',
        nav_hub_tap_hint: 'Kanya karete ho tsamaea',
        stories_badge: 'LEFA LA DITERENE LE DINEANO',
        stories_active_pass_label: 'Pasepoto e Sebeletsang:',
        stories_change_pass_btn: 'Fetola Pasepoto',
        stories_all_passes_label: 'E Kenyelelitsoe ho Likarete Tsohle',
        stories_read_story_btn: 'Bala Neano e Cletseng',
        stories_min_read: 'mets ea ho bala',
        by_author: 'Ka',
        modal_audio_unlocked: 'Sebuhedi ba Lentswe bo Vutsweng',
        modal_audio_listen_desc: 'Mamela phetelo e tletseng ea neano',
        modal_audio_play: 'Bapala Lentswe',
        modal_audio_stop: 'Emisa Lentswe',
        modal_audio_locked: 'Phetelo ea lentswe e koetsoe bakeng sa neano ena.',
        modal_audio_unlock_btn: 'Bula Pasepoto ea Lentswe (R49)',
        footer_tagline: 'DITSELA TSA SEBELE. DINEANO TSA METSOTSO.',
        footer_desc: 'Mopheli ea dijithali oa tsela ea terene ho tloha Pretoria ho ya Cape Town e ketekoang lefa le setso sa Afrika Borwa.',
        footer_nav_heading: 'Tsela',
        footer_link_route: 'Tsela',
        footer_link_trains: 'Diterene tsa Mabothobotho',
        footer_link_sights: 'Liba le libo tsa Nalane',
        footer_link_puzzles: 'Lipapali tsa Tsela',
        footer_link_voice: 'Bukana ea Lentswe',
        footer_link_heritage: 'Lefa le ka Rona',
        footer_corridor_heading: 'Leeto la Tsela',
        footer_corridor_desc: 'Sebaka sa 1,600 km ho tloha Pretoria ho ya Table Mountain.',
        footer_corridor_badge: 'Pretoria ho ya Cape Town',
        footer_copyright: '© 2026 TrackTales. Likarete tsohle di bolokilwe.',
        footer_corridor_tag: 'Tsela ea Pretoria ho ya Cape Town'
      },
      tn: {
        hero_tag: 'MOKELO WA PRETORIA GO YA CAPE TOWN · TERENE YA BLUE',
        hero_h1: 'Bona Loeto',
        hero_h1_sub: 'Lo Bula.',
        hero_desc: 'TrackTales e latela seporo sa Pretoria go ya Cape Town go ralala Highveld, Karoo le Atlantic.',
        stops_tag: 'BOSWA JWA SEPORO SA AFRIKA BORWA · PRETORIA GO YA CAPE TOWN',
        stops_title: 'Diteishene tsa Tsela',
        stops_desc: 'Loeto lo lo tshelang lo latela diteishene tsa bogologolo, dithaba le naga ya Karoo mo seporong sa 1,600 km.',
        stories_title: 'Dineano tsa <span class="text-[#D99B26] italic font-serif">Loeto</span>',
        stories_sub: 'Dineano tsa bogologolo le boswa jwa seporo sa Afrika Borwa.',
        auth_welcome: 'Re a go Amogela',
        auth_welcome_sub: 'Tselana le go Tsena mo pasepotong ya gago ya terene.',
        auth_create: 'Tlhoma Akaunti',
        auth_create_sub: 'Ikwolise mo pasepotong ya dijithale ya TrackTales.',
        auth_signin_btn: 'TSENA',
        auth_signup_btn: 'TLHOMA AKAUNTI',
        email_ph: 'Imeile *',
        pass_ph: 'Lekwalo-phetsho *',
        name_ph: 'Leina ka Botlalo *',
        confirm_pass_ph: 'Tlhomamisa Lekwalo-phetsho *',
        nav_trigger: 'Zulatsela',
        nav_access: 'Tsena',
        nav_sos: 'SOS',
        nav_signin: 'Tsena',
        nav_signout: 'Tswa',
        nav_hub_companion: 'MOTSAMAISI WA SEPORO',
        nav_hub_title: 'Phanele ya Tsamao',
        nav_hub_subtitle: '1,600 km Pretoria go ya Cape Town',
        nav_card_route_title: 'Tsela',
        nav_card_route_desc: 'Tshekatsheko ya seporo le mmapa o o tshelang.',
        nav_card_stops_title: 'Diteishene tsa Tsela',
        nav_card_stops_desc: 'Diteishene tsa bogologolo le dikgala tsa Karoo.',
        nav_card_stories_title: 'Dineano le Polokelo',
        nav_card_stories_desc: 'Polokelo ya boswa jwa seporo le mantswe.',
        nav_card_trains_title: 'Diterene tsa Mabothobotho',
        nav_card_trains_desc: 'Terene ya Blue le Rovos Rail.',
        nav_card_games_title: 'Metshameko ya Seporo',
        nav_card_games_desc: 'Dipotso le Mzansi Rail Bingo.',
        nav_card_voice_title: 'Bukana ya Lentswe',
        nav_card_voice_desc: 'Lentswe la nako ya mmatota.',
        nav_hub_tap_hint: 'Kanya karete go tsamaea',
        stories_badge: 'BOSWA JWA SEPORO LE DINEANO',
        stories_active_pass_label: 'Pasepote e e Diregang:',
        stories_change_pass_btn: 'Fetola Pasepote',
        stories_all_passes_label: 'E Akaretswe mo Dipasepoteng Tsotlhe',
        stories_read_story_btn: 'Bala Neano ka Botlalo',
        stories_min_read: 'mots wa go bala',
        by_author: 'Ka',
        modal_audio_unlocked: 'Motsamaisi wa Lentswe o Bulegile',
        modal_audio_listen_desc: 'Reetsa kanelo e e tletseng ya neano',
        modal_audio_play: 'Tshameka Lentswe',
        modal_audio_stop: 'Emisa Lentswe',
        modal_audio_locked: 'Kanelo ya lentswe e tswetswe mo neanong e.',
        modal_audio_unlock_btn: 'Bula Pasepote ya Lentswe (R49)',
        footer_tagline: 'DISEPORO TSA SEBELE. DINEANO TSA BOGOLOGOLO.',
        footer_desc: 'Motsamaisi wa dijithale wa seporo sa Pretoria go ya Cape Town yo o ketekang boswa le setso sa seporo sa Afrika Borwa.',
        footer_nav_heading: 'Tsamao',
        footer_link_route: 'Tsela',
        footer_link_trains: 'Diterene tsa Mabothobotho',
        footer_link_sights: 'Dikgala le Diteishene',
        footer_link_puzzles: 'Metshameko ya Seporo',
        footer_link_voice: 'Bukana ya Lentswe',
        footer_link_heritage: 'Boswa le ka Rona',
        footer_corridor_heading: 'Loeto lo lo Tshelang',
        footer_corridor_desc: 'Loeto lwa 1,600 km go tswa Pretoria go ya Table Mountain.',
        footer_corridor_badge: 'Pretoria go ya Cape Town',
        footer_copyright: '© 2026 TrackTales. Ditshwanelo tsotlhe di bolokilwe.',
        footer_corridor_tag: 'Seporo sa Pretoria go ya Cape Town'
      },
      nso: {
        hero_tag: 'MOKGWA WA TERENE GO TLOGA PRETORIA GO YA CAPE TOWN · TERENE YA BLUE',
        hero_h1: 'Bogela Leeto',
        hero_h1_sub: 'Le Bula.',
        hero_desc: 'TrackTales e latela tsela ya terene go tloga Highveld go ya lewatleng la Atlantic.',
        stops_tag: 'BOHWA BJA TERENE AFRIKA BORWA · PRETORIA GO YA CAPE TOWN',
        stops_title: 'Diteishene tša Tsela',
        stops_desc: 'Leeto le latela diteishene tša histori, dithaba le naga ya Karoo tseleng ya 1,600 km.',
        stories_title: 'Di-konope tša <span class="text-[#D99B26] italic font-serif">Leeto</span>',
        stories_sub: 'Kanegelo tša histori le bohwa bja terene ya Afrika Borwa.',
        auth_welcome: 'O amogetšwe',
        auth_welcome_sub: 'Tsena go hwetša pasepoto ya gago ya terene.',
        auth_create: 'Hlama Akaunthi',
        auth_create_sub: 'Ingwadiše bakeng sa pasepoto ya gago ya dijithale.',
        auth_signin_btn: 'TSENA',
        auth_signup_btn: 'HLAMA AKAUNTHI',
        email_ph: 'Imeile *',
        pass_ph: 'Phentšhele *',
        name_ph: 'Leina ka Botlalo *',
        confirm_pass_ph: 'Tišetša Phentšhele *',
        nav_trigger: 'Hlahla',
        nav_access: 'Fihlelela',
        nav_sos: 'SOS',
        nav_signin: 'Tsena',
        nav_signout: 'Tšwa',
        nav_hub_companion: 'MOLEKANE WA TERENE',
        nav_hub_title: 'Phanele ya Tshepedišo',
        nav_hub_subtitle: '1,600 km Pretoria go ya Cape Town',
        nav_card_route_title: 'Tsela',
        nav_card_route_desc: 'Tekolo ya tsela ya terene le mmapa.',
        nav_card_stops_title: 'Diteishene tša Tsela',
        nav_card_stops_desc: 'Diteishene tša histori le lehamo la Karoo.',
        nav_card_stories_title: 'Dikanegelo le Bobolokelo',
        nav_card_stories_desc: 'Dikanegelo tša histori le mantšu.',
        nav_card_trains_title: 'Diterene tša Mabothobotho',
        nav_card_trains_desc: 'Terene ya Blue le Rovos Rail.',
        nav_card_games_title: 'Dipapadi tša Terene',
        nav_card_games_desc: 'Diphotšišo le Rail Bingo.',
        nav_card_voice_title: 'Puku ya Lentšu',
        nav_card_voice_desc: 'Lentšu la nako ya nnete le puku.',
        nav_hub_tap_hint: 'Kanya karata go sepela',
        stories_badge: 'BOHWA BJA TERENE LE DIKANEGELO',
        stories_active_pass_label: 'Pasepoto ye e Šomago:',
        stories_change_pass_btn: 'Fetola Pasepoto',
        stories_all_passes_label: 'E Akareditšwe ka Dipasepotong ka Moka',
        stories_read_story_btn: 'Bala Kanegelo ka Botlalo',
        stories_min_read: 'mets ya go bala',
        by_author: 'Ka',
        modal_audio_unlocked: 'Molekane wa Mantšu o Adegile',
        modal_audio_listen_desc: 'Theetša dikanegelo tša go tlala',
        modal_audio_play: 'Bapala Lentšu',
        modal_audio_stop: 'Emiša Lentšu',
        modal_audio_locked: 'Kano ya lentšu e tswaletswe kanegelo ye.',
        modal_audio_unlock_btn: 'Bula Pasepoto ya Lentšu (R49)',
        footer_tagline: 'DITSELA TŠA NNETE. DIKANEGELO TŠA KGETHEGILEHO.',
        footer_desc: 'Molekane wa dijithale wa tsela ya terene go tloga Pretoria go ya Cape Town yo a ketekago bohwa le setšo sa Afrika Borwa.',
        footer_nav_heading: 'Tshepedišo',
        footer_link_route: 'Tsela',
        footer_link_trains: 'Diterene tša Mabothobotho',
        footer_link_sights: 'Mafelo a Histori',
        footer_link_puzzles: 'Dipapadi tša Tsela',
        footer_link_voice: 'Puku ya Lentšu',
        footer_link_heritage: 'Bohwa le ka Rona',
        footer_corridor_heading: 'Leeto la Tsela',
        footer_corridor_desc: 'Leeto la 1,600 km go tloga Pretoria go ya Table Mountain.',
        footer_corridor_badge: 'Pretoria go ya Cape Town',
        footer_copyright: '© 2026 TrackTales. Ditokelo ka moka di bolokilwe.',
        footer_corridor_tag: 'Tsela ya Pretoria go ya Cape Town'
      },
      ts: {
        hero_tag: 'NDLELA YA PRETORIA KUYA CAPE TOWN · TERENE YA BLUE',
        hero_h1: 'Languta Riendzo',
        hero_h1_sub: 'Ri Pfuleka.',
        hero_desc: 'TrackTales yi landzela ndlela ya xitimela ku suka Highveld ku ya lwandle ra Atlantic.',
        stops_tag: 'NDHAVUKO WA XITIMELA XA AFRIKA-DZONGA · PRETORIA KUYA CAPE TOWN',
        stops_title: 'Switichi swa Ndlela',
        stops_desc: 'Riendzo leri hanyaka ri landzela switichi swa khale, tintshava ni ndhawu ya Karoo eka ndlela ya 1,600 km.',
        stories_title: 'Mavhungu ya <span class="text-[#D99B26] italic font-serif">Riendzo</span>',
        stories_sub: 'Mavhungu ya ndhavuko wa xitimela xa Afrika-Dzonga.',
        auth_welcome: 'U amukeriwile',
        auth_welcome_sub: 'Nghena ku kuma pasepoto ya xitimela xa Afrika-Dzonga.',
        auth_create: 'Tumbuluxa Akaunti',
        auth_create_sub: 'Tsalisa eka pasepoto ya dijithali ya TrackTales.',
        auth_signin_btn: 'NGHENA',
        auth_signup_btn: 'TUMBULUXA AKAUNTI',
        email_ph: 'Imeyili *',
        pass_ph: 'Rito-ro-pala *',
        name_ph: 'Vito Hi Xitalo *',
        confirm_pass_ph: 'Tiyisisa Rito-ro-pala *',
        nav_trigger: 'Komba',
        nav_access: 'Fikelela',
        nav_sos: 'SOS',
        nav_signin: 'Nghena',
        nav_signout: 'Huma',
        nav_hub_companion: 'MUNGHANA WA XITIMELA',
        nav_hub_title: 'Phanere ya Ku Famba',
        nav_hub_subtitle: '1,600 km Pretoria ku ya Cape Town',
        nav_card_route_title: 'Ndlela',
        nav_card_route_desc: 'Nkatsakanyo wa ndlela ni mepe lowu hanyaka.',
        nav_card_stops_title: 'Switichi swa Ndlela',
        nav_card_stops_desc: 'Switichi swa khale ni mananga ya Karoo.',
        nav_card_stories_title: 'Mavhungu ni Vuhlayiselo',
        nav_card_stories_desc: 'Mavhungu ya ndhavuko ni rito.',
        nav_card_trains_title: 'Switimela swa Vuhosi',
        nav_card_trains_desc: 'Terene ya Blue ni Rovos Rail.',
        nav_card_games_title: 'Mintlango ya Xitimela',
        nav_card_games_desc: 'Swivutiso ni Rail Bingo.',
        nav_card_voice_title: 'Puku ya Rito',
        nav_card_voice_desc: 'Rito ra nkarhi wa ntiyiso ni puku.',
        nav_hub_tap_hint: 'Phanya khadi ku famba',
        stories_badge: 'NDHAVUKO WA XITIMELA NI MAVHUNGU',
        stories_active_pass_label: 'Pasepoto Leyi Tirhaka:',
        stories_change_pass_btn: 'Cinca Pasepoto',
        stories_all_passes_label: 'Swi Kategoriwile eka Tiphasepoto Hinkwato',
        stories_read_story_btn: 'Hlaya Mhungu Hi Xitalo',
        stories_min_read: 'mimiz yo hlaya',
        by_author: 'Hi',
        modal_audio_unlocked: 'Munghana wa Rito u Pfulekile',
        modal_audio_listen_desc: 'Yingisela ku hlayiwa ka mhungu hinkwawo',
        modal_audio_play: 'Tlangisa Rito',
        modal_audio_stop: 'Yimisa Rito',
        modal_audio_locked: 'Ku hlayiwa ka rito ku pfariwile eka mhungu lowu.',
        modal_audio_unlock_btn: 'Pfula Pasepoto ya Rito (R49)',
        footer_tagline: 'TINDLELA TAHINE. MAVHUNGU YA NDHAVUKO.',
        footer_desc: 'Munghana wa dijithali wa ndlela ya xitimela ku suka Pretoria ku ya Cape Town lowu tlangelaka ndhavuko ni swivono swa Afrika-Dzonga.',
        footer_nav_heading: 'Ku Famba',
        footer_link_route: 'Ndlela',
        footer_link_trains: 'Switimela swa Vuhosi',
        footer_link_sights: 'Swivono ni Switichi',
        footer_link_puzzles: 'Mintlango ya Xitimela',
        footer_link_voice: 'Puku ya Rito',
        footer_link_heritage: 'Ndhavuko ni mo Hina',
        footer_corridor_heading: 'Riendzo ra Ndlela',
        footer_corridor_desc: 'Riendzo ra 1,600 km ku suka Pretoria ku ya Table Mountain.',
        footer_corridor_badge: 'Pretoria ku ya Cape Town',
        footer_copyright: '© 2026 TrackTales. Switokelo hinkwaswo swi hlayisiwile.',
        footer_corridor_tag: 'Ndlela ya Pretoria ku ya Cape Town'
      },
      ss: {
        hero_tag: 'UMGCA WE-PRETORIA KUYA ECAPE TOWN · SITIMELA LESILUHLAZA',
        hero_h1: 'Buka Luhambo',
        hero_h1_sub: 'Luvuleka.',
        hero_desc: 'I-TrackTales ilandzela indlela yesitimela isuka eHighveld iye e-Atlantic.',
        stops_tag: 'LIFA LEMAGUGU ESITIMELA ENINGIZIMU AFRIKA · PRETORIA KUYA ECAPE TOWN',
        stops_title: 'Titeshi Temgca',
        stops_desc: 'Luhambo lolulandzela titeshi temlandvo, tindlela tetintsaba nendzawo yaseKaroo emgceni lo-1,600 km.',
        stories_title: 'Tindzaba te <span class="text-[#D99B26] italic font-serif">Luhambo</span>',
        stories_sub: 'Tindzaba temlandvo nemagugu esitimela eNingizimu Afrika.',
        auth_welcome: 'Wamukelekile',
        auth_welcome_sub: 'Ngena kufumana iphasepoti yakho yesitimela.',
        auth_create: 'Yakha Akaunti',
        auth_create_sub: 'Bhalisa pasepoti yakho ye-TrackTales.',
        auth_signin_btn: 'NGENA',
        auth_signup_btn: 'YAKHA AKAUNTI',
        email_ph: 'I-Imeyili *',
        pass_ph: 'Iphaswedi *',
        name_ph: 'Ligama Leliphelele *',
        confirm_pass_ph: 'Cinisekisa Iphaswedi *',
        nav_trigger: 'Hamba',
        nav_access: 'Fikelela',
        nav_sos: 'SOS',
        nav_signin: 'Ngena',
        nav_signout: 'Phuma',
        nav_hub_companion: 'UPHETHE WESITIMELA',
        nav_hub_title: 'I-Paneli Yehambo',
        nav_hub_subtitle: '1,600 km Pretoria kuya eCape Town',
        nav_card_route_title: 'Indlela',
        nav_card_route_desc: 'Buka ye-corridor nemodi yebukhoma.',
        nav_card_stops_title: 'Titeshi Temgca',
        nav_card_stops_desc: 'Titeshi temlandvo nelihlandze laseKaroo.',
        nav_card_stories_title: 'Tindzaba neMibhalo',
        nav_card_stories_desc: 'Tindzaba temlandvo nelivi.',
        nav_card_trains_title: 'Titimbila teBukhosi',
        nav_card_trains_desc: 'The Blue Train ne-Rovos Rail.',
        nav_card_games_title: 'Timidlalo teSitimela',
        nav_card_games_desc: 'Timbuzo te-titeshi ne-Bingo.',
        nav_card_voice_title: 'Ijenali yeLivi',
        nav_card_voice_desc: 'Livi lesikhatsi samambala nelibhuku.',
        nav_hub_tap_hint: 'Thintsa khadi kuze uhambe',
        stories_badge: 'EMAGUGU WESITIMELA NETINDZABA',
        stories_active_pass_label: 'Iphasepoti Lesebentako:',
        stories_change_pass_btn: 'Gucula Iphasepoti',
        stories_all_passes_label: 'Kufakwe Kuto Tonke Tiphasepoti',
        stories_read_story_btn: 'Funda Indzaba Lenkhulu',
        stories_min_read: 'mimiz lekufundza',
        by_author: 'Ngu',
        modal_audio_unlocked: 'Livi Loluvuliwe',
        modal_audio_listen_desc: 'Lalela kucocwa kwendzaba lenkhulu',
        modal_audio_play: 'Dlala Livi',
        modal_audio_stop: 'Misa Livi',
        modal_audio_locked: 'Livi lokuphindza luvaliwe kule ndzaba.',
        modal_audio_unlock_btn: 'Vula Iphasepoti yeLivi (R49)',
        footer_tagline: 'INDLELA SIBILI. TINDZABA ETIMNANDI.',
        footer_desc: 'Mphatsi wedijithali wemgca wesitimela osuka ePretoria uya eCape Town ogubha emagugu nemphilo yeNingizimu Afrika.',
        footer_nav_heading: 'Hamba',
        footer_link_route: 'Indlela',
        footer_link_trains: 'Titimbila teBukhosi',
        footer_link_sights: 'Titeshi neTimbone',
        footer_link_puzzles: 'Timidlalo neTingcamu',
        footer_link_voice: 'Ijenali yeLivi',
        footer_link_heritage: 'Emagugu neKutsi Singobani',
        footer_corridor_heading: 'Luhambo lweMgca',
        footer_corridor_desc: 'Kuhanjwa amakhilomitha la-1,600 kusuka ePretoria kuya eTable Mountain.',
        footer_corridor_badge: 'Pretoria kuya eCape Town',
        footer_copyright: '© 2026 TrackTales. Emalungelo wonke agciniwe.',
        footer_corridor_tag: 'Umgca wasePretoria kuya eCape Town'
      },
      ve: {
        hero_tag: 'GUDO LA PRETORIA U YA CAPE TOWN · NTIMBILA YA BLUE',
        hero_h1: 'Wana Lwendo',
        hero_h1_sub: 'Lu Swika.',
        hero_desc: 'TrackTales i tevhela gudo la ntimbila u bva Highveld u swika lwanzheni lwa Atlantic.',
        stops_tag: 'VHUFA HA ZWITIMELA ZWA AFRIKA TSHITIKO · PRETORIA U YA CAPE TOWN',
        stops_title: 'Zwititshi zwa Gudo',
        stops_desc: 'Lwendo lune lwa tshila luhavho lwa zwititshi zwa divhazwakale, thavha na shango la Karoo mo 1,600 km.',
        stories_title: 'Zwifhiwa zwa <span class="text-[#D99B26] italic font-serif">Lwendo</span>',
        stories_sub: 'Zwidivhadzo zwa divhazwakale na vhufa ha zwitimela zwa Afrika Tshitiko.',
        auth_welcome: 'Vho ṱanganedzwa',
        auth_welcome_sub: 'Dzhenani u wana phasipoto yanu ya ntimbila ya Afrika Tshitiko.',
        auth_create: 'Sika Akhaunthi',
        auth_create_sub: 'Nwalisani kha phasipoto yanu ya dijithali ya TrackTales.',
        auth_signin_btn: 'DZHENANI',
        auth_signup_btn: 'SIKA AKHAUNTHI',
        email_ph: 'Imeili *',
        pass_ph: 'Phaswide *',
        name_ph: 'Dzina Nṱha *',
        confirm_pass_ph: 'Khwaṱhisedzani Phaswide *',
        nav_trigger: 'Genda',
        nav_access: 'Swikelela',
        nav_sos: 'SOS',
        nav_signin: 'Dzhenani',
        nav_signout: 'Bvani',
        nav_hub_companion: 'MUGENDI WA NTIMBILA',
        nav_hub_title: 'Phaneli ya Nyendelo',
        nav_hub_subtitle: '1,600 km Pretoria u ya Cape Town',
        nav_card_route_title: 'Gudo',
        nav_card_route_desc: 'Mbonalo ya gudo na mepe wa zwino.',
        nav_card_stops_title: 'Zwititshi zwa Gudo',
        nav_card_stops_desc: 'Zwititshi zwa divhazwakale na Karoo.',
        nav_card_stories_title: 'Dineano na Vhupululo',
        nav_card_stories_desc: 'Vhupululo ha vhufa na lipfi.',
        nav_card_trains_title: 'Zwitimela Zwhulwane',
        nav_card_trains_desc: 'Ntimbila ya Blue na Rovos Rail.',
        nav_card_games_title: 'Mitambo ya Ntimbila',
        nav_card_games_desc: 'Mbudziso na Rail Bingo.',
        nav_card_voice_title: 'Bugu ya Lipfi',
        nav_card_voice_desc: 'Lipfi la zwino na bugu ya mufhiri.',
        nav_hub_tap_hint: 'Kanya khathi u gendela',
        stories_badge: 'VHUFA HA NTIMBILA NA DINEANO',
        stories_active_pass_label: 'Phasipoto I Shumaho:',
        stories_change_pass_btn: 'Shandukisa Phasipoto',
        stories_all_passes_label: 'Zwo Katelwa kha Diphasipoto Dzoṱhe',
        stories_read_story_btn: 'Vhala Neano Nga Vhudalo',
        stories_min_read: 'mimiz ya u vhala',
        by_author: 'Nga',
        modal_audio_unlocked: 'Mugendi wa Lipfi Vho Vula',
        modal_audio_listen_desc: 'Thetshelesani u neanea ha neano nga vhudalo',
        modal_audio_play: 'Tshimbidzani Lipfi',
        modal_audio_stop: 'Imisani Lipfi',
        modal_audio_locked: 'U neanea ha lipfi zvo valwa kha neano eyi.',
        modal_audio_unlock_btn: 'Vulani Phasipoto ya Lipfi (R49)',
        footer_tagline: 'MAGUDO A CHICHI. DINEANO ZWAVHUDI.',
        footer_desc: 'Mugendi wa dijithali wa gudo la ntimbila u bva Pretoria u ya Cape Town ane a takalela vhufa ha Afrika Tshitiko.',
        footer_nav_heading: 'Nyendelo',
        footer_link_route: 'Gudo',
        footer_link_trains: 'Zwitimela Zwhulwane',
        footer_link_sights: 'Zwititshi na Mbonalo',
        footer_link_puzzles: 'Mitambo ya Ntimbila',
        footer_link_voice: 'Bugu ya Lipfi',
        footer_link_heritage: 'Vhufa na nga Rine',
        footer_corridor_heading: 'Lwendo lwa Gudo',
        footer_corridor_desc: 'Lwendo lwa 1,600 km u bva Pretoria u swika Table Mountain.',
        footer_corridor_badge: 'Pretoria u ya Cape Town',
        footer_copyright: '© 2026 TrackTales. Pfanelo dzoṱhe dzo vhukwa.',
        footer_corridor_tag: 'Gudo la Pretoria u ya Cape Town'
      },
      nr: {
        hero_tag: 'INDLELA ISUSUKA E-PRETORIA IYA E-CAPE TOWN · ISITIMELA ESIBLUU',
        hero_h1: 'Buka Ukukhamba',
        hero_h1_sub: 'Kuvuleka.',
        hero_desc: 'I-TrackTales ilandela indlela yesitimela isuka eHighveld iye elwandle lwe-Atlantic.',
        stops_tag: 'ILIFA LEZITIMELA ZE-AFRIKA SEZINGUMU · PRETORIA IYA ECAPE TOWN',
        stops_title: 'Izitishi Zendlela',
        stops_desc: 'Ukukhamba kokuthoma okulandela izitishi zomlando, iintaba ne-Karoo emadendaneni we-1,600 km.',
        stories_title: 'Iindaba zoku <span class="text-[#D99B26] italic font-serif">Khamba</span>',
        stories_sub: 'Iindaba zomlando nelifa lezitimela ze-Afrika Sezingumu.',
        auth_welcome: 'Umolekile',
        auth_welcome_sub: 'Ngena ukufumana iphasipoti yakho yesitimela.',
        auth_create: 'Vula Akhaunthi',
        auth_create_sub: 'Bhalisela iphasipoti yakho ye-TrackTales.',
        auth_signin_btn: 'NGENA',
        auth_signup_btn: 'VULA AKAUNTHI',
        email_ph: 'I-Imeyili *',
        pass_ph: 'Iphaswedi *',
        name_ph: 'Igama Eliphelele *',
        confirm_pass_ph: 'Qinisekisa Iphaswedi *',
        nav_trigger: 'Khamba',
        nav_access: 'Fikelela',
        nav_sos: 'SOS',
        nav_signin: 'Ngena',
        nav_signout: 'Phuma',
        nav_hub_companion: 'UMTHOMBI WESITIMELA',
        nav_hub_title: 'Ipaneli Yekhambo',
        nav_hub_subtitle: '1,600 km Pretoria iya eCape Town',
        nav_card_route_title: 'Indlela',
        nav_card_route_desc: 'Ukubuyekezwa kwendlela nesithombe samanje.',
        nav_card_stops_title: 'Izitishi Zendlela',
        nav_card_stops_desc: 'Izitishi zomlando nebhanga laseKaroo.',
        nav_card_stories_title: 'Iindaba Nezinto ezibulungekileko',
        nav_card_stories_desc: 'Iindaba zomlando nelizwi.',
        nav_card_trains_title: 'Izitimela Ezikhulu',
        nav_card_trains_desc: 'The Blue Train ne-Rovos Rail.',
        nav_card_games_title: 'Imidlalo Yesitimela',
        nav_card_games_desc: 'Imibuzo yezitishi ne-Bingo.',
        nav_card_voice_title: 'Ijenali Yelizwi',
        nav_card_voice_desc: 'Ilizwi lesikhathi samanje nebhuku.',
        nav_hub_tap_hint: 'Gandelela ikhadi ukukhamba',
        stories_badge: 'ILIFA LEZITIMELA NEINDABA',
        stories_active_pass_label: 'Iphasipoti Esebenzako:',
        stories_change_pass_btn: 'Tjhugulula Iphasipoti',
        stories_all_passes_label: 'Fakwe Kizo Zoke Iphasiwedi',
        stories_read_story_btn: 'Funda Indaba Epheleleko',
        stories_min_read: 'mimiz yokufunda',
        by_author: 'Ngu',
        modal_audio_unlocked: 'Ilizwi Elivuliweyo',
        modal_audio_listen_desc: 'Lalela ukucocwa kwendaba epheleleko',
        modal_audio_play: 'Dlala Ilizwi',
        modal_audio_stop: 'Jamisa Ilizwi',
        modal_audio_locked: 'Ukulalela kwelizwi kuvaliwe kule ndaba.',
        modal_audio_unlock_btn: 'Vula Iphasipoti Yelizwi (R49)',
        footer_tagline: 'IINDLELA ZAMAMBALA. IINDABA EZIROMAKAZAKO.',
        footer_desc: 'Umthombi wedijithali wendlela yesitimela osuka ePretoria iya eCape Town obuyekeza ilifa le-Afrika Sezingumu.',
        footer_nav_heading: 'Ukukhamba',
        footer_link_route: 'Indlela',
        footer_link_trains: 'Izitimela Ezikhulu',
        footer_link_sights: 'Izitishi Neendawo',
        footer_link_puzzles: 'Imidlalo Yesitimela',
        footer_link_voice: 'Ijenali Yelizwi',
        footer_link_heritage: 'Ilifa Ngingobani',
        footer_corridor_heading: 'Ukukhamba Kwendlela',
        footer_corridor_desc: 'Ukukhamba 1,600 km ukusuka ePretoria iya eTable Mountain.',
        footer_corridor_badge: 'Pretoria iya eCape Town',
        footer_copyright: '© 2026 TrackTales. Woke amalungelo abulungiwe.',
        footer_corridor_tag: 'Indlela yePretoria iya eCape Town'
      },
      it: {
        hero_tag: 'CORRIDOIO PRETORIA A CITTÀ DEL CAPO · IL TRENO BLU',
        hero_h1: 'Guarda Il Viaggio',
        hero_h1_sub: 'Rivelarsi.',
        hero_desc: 'Un biglietto del treno di lusso per questo percorso può costare decine di migliaia di Rand. TrackTales ripercorre questa linea iconica di 1.600 km dal Highveld all\'Atlantico.',
        stops_tag: 'PATRIMONIO FERROVIARIO DEL SUD AFRICA · PRETORIA A CITTÀ DEL CAPO',
        stops_title: 'Fermate del Corridoio',
        stops_desc: 'Un viaggio vivo e immersivo tra stazioni storiche, valichi montani e il deserto del Karoo.',
        stories_title: 'Storie di <span class="text-[#D99B26] italic font-serif">Viaggio</span>',
        stories_sub: 'Archivi storici, traguardi d\'ingegneria e folklore lungo il corridoio sudafricano.',
        auth_welcome: 'Benvenuto',
        auth_welcome_sub: 'Accedi per accedere al tuo pass ferroviario sudafricano.',
        auth_create: 'Crea Account',
        auth_create_sub: 'Registrati per il tuo passaporto digitale TrackTales.',
        auth_signin_btn: 'ACCEDI',
        auth_signup_btn: 'CREA ACCOUNT',
        email_ph: 'E-mail *',
        pass_ph: 'Password *',
        name_ph: 'Nome completo *',
        confirm_pass_ph: 'Conferma password *',
        nav_trigger: 'Naviga',
        nav_access: 'Accesso',
        nav_sos: 'SOS',
        nav_signin: 'Accedi',
        nav_signout: 'Esci',
        nav_hub_companion: 'COMPAGNO DI CORRIDOIO',
        nav_hub_title: 'Pannello di Navigazione',
        nav_hub_subtitle: '1.600 km Pretoria a Città del Capo',
        nav_card_route_title: 'Il Percorso',
        nav_card_route_desc: 'Panoramica cinematografica e mappa interattiva.',
        nav_card_stops_title: 'Fermate del Corridoio',
        nav_card_stops_desc: 'Stazioni storiche, passi montani e deserto del Karoo.',
        nav_card_stories_title: 'Storie e Archivi',
        nav_card_stories_desc: 'Archivi storici, dossier segreti e audio.',
        nav_card_trains_title: 'Treni Ammiraglia',
        nav_card_trains_desc: 'Il Treno Blu e Rovos Rail specifiche.',
        nav_card_games_title: 'Giochi del Corridoio',
        nav_card_games_desc: 'Quiz, Bingo ferroviario e puzzle.',
        nav_card_voice_title: 'Diario Vocale',
        nav_card_voice_desc: 'Dettatura vocale in tempo reale e diario di bordo.',
        nav_hub_tap_hint: 'Tocca una scheda per navigare',
        stories_badge: 'PATRIMONIO E ARCHIVI',
        stories_active_pass_label: 'Pass Attivo:',
        stories_change_pass_btn: 'Cambia Pass',
        stories_all_passes_label: 'Incluso in tutti i pass',
        stories_read_story_btn: 'Leggi Storia Completa',
        stories_min_read: 'min di lettura',
        by_author: 'Di',
        modal_audio_unlocked: 'Accompagnamento Audio Sbloccato',
        modal_audio_listen_desc: 'Ascolta la narrazione completa della storia',
        modal_audio_play: 'Riproduci Audio',
        modal_audio_stop: 'Interrompi Audio',
        modal_audio_locked: 'Narrazione audio bloccata per questa storia.',
        modal_audio_unlock_btn: 'Sblocca Pass Audio (R49)',
        footer_tagline: 'PERCORSI REALI. STORIE STRAORDINARIE.',
        footer_desc: 'Un compagno digitale per il corridoio ferroviario da Pretoria a Città del Capo che celebra il patrimonio del Sudafrica.',
        footer_nav_heading: 'Navigazione',
        footer_link_route: 'Il Percorso',
        footer_link_trains: 'Treni Ammiraglia',
        footer_link_sights: 'Luoghi di Interesse',
        footer_link_puzzles: 'Puzzle e Giochi',
        footer_link_voice: 'Diario Vocale',
        footer_link_heritage: 'Patrimonio e Info',
        footer_corridor_heading: 'Viaggio del Corridoio',
        footer_corridor_desc: '1.600 km attraverso il Sudafrica da Pretoria alla Table Mountain.',
        footer_corridor_badge: 'Pretoria a Città del Capo',
        footer_copyright: '© 2026 TrackTales. Tutti i diritti riservati.',
        footer_corridor_tag: 'Corridoio Pretoria a Città del Capo',
        rail_runners_tag: 'TRACKTALES · I CORRIDORI DEL TRENO',
        trains_selected_badge: 'TRENO SELEZIONATO:',
        trains_scenery_badge: 'SPLENDORE DEL PAESAGGIO E PUNTI PANORAMICI',
        trains_scenery_title: 'Paesaggi e Punti di Forza del Corridoio',
        trains_culinary_badge: 'ENOGASTRONOMIA E SOCIALITÀ',
        trains_dining_title: 'Ristorazione di Lusso e Salotti a Bordo',
        trains_specs_badge: 'SPECIFICHE TECNICHE E STORIA',
        trains_highlights_title: 'Esperienze Caratteristiche',
        label_speed: 'Velocità',
        label_duration: 'Durata',
        label_corridor: 'Corridoio',
        label_departure_hub: 'Stazione di Partenza',
        label_terminus_station: 'Stazione Capolinea',
        label_vantage_tip: 'Consiglio Panoramico'
      },
      pt: {
        hero_tag: 'CORREDOR PRETORIA A CIDADE DO CABO · O COMBOIO AZUL',
        hero_h1: 'Veja A Viagem',
        hero_h1_sub: 'A Revelar-se.',
        hero_desc: 'Um bilhete de comboio de luxo para esta rota pode custar dezenas de milhares de Rands. O TrackTales percorre esta linha icónica de 1.600 km do Highveld ao Atlântico.',
        stops_tag: 'PATRIMÓNIO FERROVIÁRIO DA ÁFRICA DO SUL · PRETORIA A CIDADE DO CABO',
        stops_title: 'Paragens do Corredor',
        stops_desc: 'Uma viagem viva e imersiva por estações históricas, desfiladeiros de montanha e o deserto do Karoo.',
        stories_title: 'Histórias de <span class="text-[#D99B26] italic font-serif">Viagem</span>',
        stories_sub: 'Arquivos históricos, marcos de engenharia e folclore ao longo do corredor ferroviário.',
        auth_welcome: 'Bem-vindo',
        auth_welcome_sub: 'Inicie sessão para aceder ao seu passe ferroviário sul-africano.',
        auth_create: 'Criar Conta',
        auth_create_sub: 'Registe-se para o seu passaporte digital TrackTales.',
        auth_signin_btn: 'INICIAR SESSÃO',
        auth_signup_btn: 'CRIAR CONTA',
        email_ph: 'E-mail *',
        pass_ph: 'Palavra-passe *',
        name_ph: 'Nome completo *',
        confirm_pass_ph: 'Confirmar palavra-passe *',
        nav_trigger: 'Navegar',
        nav_access: 'Acesso',
        nav_sos: 'SOS',
        nav_signin: 'Iniciar Sessão',
        nav_signout: 'Terminar Sessão',
        nav_hub_companion: 'ACOMPANHANTE DO CORREDOR',
        nav_hub_title: 'Painel de Navegação',
        nav_hub_subtitle: '1.600 km Pretoria a Cidade do Cabo',
        nav_card_route_title: 'A Rota',
        nav_card_route_desc: 'Visão geral cinematográfica e mapa interativo ao vivo.',
        nav_card_stops_title: 'Paragens do Corredor',
        nav_card_stops_desc: 'Estações históricas, desfiladeiros e deserto do Karoo.',
        nav_card_stories_title: 'Histórias e Arquivos',
        nav_card_stories_desc: 'Arquivos históricos, dossiês secretos e áudio.',
        nav_card_trains_title: 'Comboios Emblemáticos',
        nav_card_trains_desc: 'O Comboio Azul e Rovos Rail especificações.',
        nav_card_games_title: 'Jogos do Corredor',
        nav_card_games_desc: 'Questionários, Bingo ferroviário e puzzles.',
        nav_card_voice_title: 'Diário de Voz',
        nav_card_voice_desc: 'Ditado de voz em tempo real e diário de bordo.',
        nav_hub_tap_hint: 'Toque num cartão para navegar',
        stories_badge: 'PATRIMÓNIO E ARQUIVOS',
        stories_active_pass_label: 'Passe Ativo:',
        stories_change_pass_btn: 'Alterar Passe',
        stories_all_passes_label: 'Incluído em todos os passes',
        stories_read_story_btn: 'Ler História Completa',
        stories_min_read: 'min de leitura',
        by_author: 'Por',
        modal_audio_unlocked: 'Acompanhante de Áudio Desbloqueado',
        modal_audio_listen_desc: 'Ouça a narração completa da história',
        modal_audio_play: 'Reproduzir Áudio',
        modal_audio_stop: 'Parar Áudio',
        modal_audio_unlock_btn: 'Desbloquear Passe de Áudio (R49)',
        footer_tagline: 'ROTAS REAIS. HISTÓRIAS EXTRAORDINÁRIAS.',
        footer_desc: 'Um companheiro digital para o corredor ferroviário de Pretoria à Cidade do Cabo que celebra o património da África do Sul.',
        footer_nav_heading: 'Navegação',
        footer_link_route: 'A Rota',
        footer_link_trains: 'Comboios Emblemáticos',
        footer_link_sights: 'Locais de Interesse',
        footer_link_puzzles: 'Puzzles e Jogos',
        footer_link_voice: 'Diário de Voz',
        footer_link_heritage: 'Património e Sobre',
        footer_corridor_heading: 'Viagem do Corredor',
        footer_corridor_desc: '1.600 km através da África do Sul desde Pretoria até à Montanha da Mesa.',
        footer_corridor_badge: 'Pretoria a Cidade do Cabo',
        footer_copyright: '© 2026 TrackTales. Todos os direitos reservados.',
        footer_corridor_tag: 'Corredor Pretoria a Cidade do Cabo'
      },
      de: {
        hero_tag: 'KORRIDOR PRETORIA NACH KAPSTADT · DER BLAUE ZUG',
        hero_h1: 'Sehen Sie Die Reise',
        hero_h1_sub: 'Sich Entfalten.',
        hero_desc: 'Ein Luxuszugticket für diese Strecke kann Zehntausende Rand kosten. TrackTales verfolgt dieselbe ikonische 1.600 km lange Strecke vom Highveld bis zum Atlantik.',
        stops_tag: 'SÜDAFRIKANISCHES EISENBAHNERBE · PRETORIA NACH KAPSTADT',
        stops_title: 'Korridor Haltestellen',
        stops_desc: 'Eine fesselnde lebendige Reise entlang historischer Bahnhöfe, Bergpässe und Karoo-Wüstenknotenpunkte.',
        stories_title: 'Reise <span class="text-[#D99B26] italic font-serif">Geschichten</span>',
        stories_sub: 'Archivgeschichten, technische Meilensteine und Geschichten entlang Südafrikas Luxuskorridor.',
        auth_welcome: 'Willkommen',
        auth_welcome_sub: 'Melden Sie sich an, um auf Ihren südafrikanischen Bahnpass zuzugreifen.',
        auth_create: 'Konto Erstellen',
        auth_create_sub: 'Registrieren Sie sich für Ihren digitalen TrackTales-Pass.',
        auth_signin_btn: 'ANMELDEN',
        auth_signup_btn: 'KONTO ERSTELLEN',
        email_ph: 'E-Mail *',
        pass_ph: 'Passwort *',
        name_ph: 'Vollständiger Name *',
        confirm_pass_ph: 'Passwort Bestätigen *',
        nav_trigger: 'Navigieren',
        nav_access: 'Zugang',
        nav_sos: 'SOS',
        nav_signin: 'Anmelden',
        nav_signout: 'Abmelden',
        nav_hub_companion: 'KORRIDOR BEGLEITER',
        nav_hub_title: 'Navigationszentrale',
        nav_hub_subtitle: '1.600 km Pretoria nach Kapstadt',
        nav_card_route_title: 'Die Route',
        nav_card_route_desc: 'Kinematografische Übersicht & interaktive Live-Route.',
        nav_card_stops_title: 'Korridor Haltestellen',
        nav_card_stops_desc: 'Historische Bahnhöfe, Bergpässe & Karoo-Wüste.',
        nav_card_stories_title: 'Geschichten & Archiv',
        nav_card_stories_desc: 'Historische Archive, geheime Dossiers & Audio.',
        nav_card_trains_title: 'Flaggschiff-Züge',
        nav_card_trains_desc: 'Der Blaue Zug & Rovos Rail Spezifikationen.',
        nav_card_games_title: 'Korridor-Spiele',
        nav_card_games_desc: 'Quizfragen, Eisenbahn-Bingo & Puzzles.',
        nav_card_voice_title: 'Sprachjournal',
        nav_card_voice_desc: 'Echtzeit-Sprache-zu-Text & Passagiertagebuch.',
        nav_hub_tap_hint: 'Tippen Sie auf eine Karte, um zu navigieren',
        stories_badge: 'ERBE-GESCHICHTEN & ARCHIVE',
        stories_active_pass_label: 'Aktiver Pass:',
        stories_change_pass_btn: 'Pass Ändern',
        stories_all_passes_label: 'In allen Pässen enthalten',
        stories_read_story_btn: 'Vollständige Geschichte Lesen',
        stories_min_read: 'Min. Lesezeit',
        by_author: 'Von',
        modal_audio_unlocked: 'Audio-Begleiter Freigeschaltet',
        modal_audio_listen_desc: 'Vollständige Story-Erzählung anhören',
        modal_audio_play: 'Audio Abspielen',
        modal_audio_stop: 'Audio Stoppen',
        modal_audio_locked: 'Audionarration für diese Geschichte gesperrt.',
        modal_audio_unlock_btn: 'Audio-Pass Freischalten (R49)',
        footer_tagline: 'ECHTE ROUTEN. AUSSERGEWÖHNLICHE GESCHICHTEN.',
        footer_desc: 'Ein digitaler Begleiter für den Eisenbahnkorridor von Pretoria nach Kapstadt, der das Erbe Südafrikas feiert.',
        footer_nav_heading: 'Navigation',
        footer_link_route: 'Die Route',
        footer_link_trains: 'Flaggschiff-Züge',
        footer_link_sights: 'Sehenswürdigkeiten',
        footer_link_puzzles: 'Rätsel & Spiele',
        footer_link_voice: 'Sprachjournal',
        footer_link_heritage: 'Erbe & Über Uns',
        footer_corridor_heading: 'Korridor Reise',
        footer_corridor_desc: '1.600 km quer durch Südafrika von Pretoria bis zum Tafelberg.',
        footer_corridor_badge: 'Pretoria nach Kapstadt',
        footer_copyright: '© 2026 TrackTales. Alle Rechte vorbehalten.',
        footer_corridor_tag: 'Pretoria nach Kapstadt Korridor',
        rail_runners_tag: 'TRACKTALES · DIE EISENBAHNLÄUFER',
        trains_selected_badge: 'AUSGEWÄHLTER ZUG:',
        trains_scenery_badge: 'LANDSCHAFTSPRACHT & AUSSICHTSPUNKTE',
        trains_scenery_title: 'Landschafts-Highlights des Korridors',
        trains_culinary_badge: 'KULINARIK & GESELLSCHAFT',
        trains_dining_title: 'Feine Küche & Lounges an Bord',
        trains_specs_badge: 'TECHNISCHE DATEN & GESCHICHTE',
        trains_highlights_title: 'Besondere Reise-Highlights',
        label_speed: 'Geschwindigkeit',
        label_duration: 'Dauer',
        label_corridor: 'Korridor',
        label_departure_hub: 'Abfahrtsbahnhof',
        label_terminus_station: 'Zielbahnhof',
        label_vantage_tip: 'Aussichtspunkt-Tipp'
      },
      fr: {
        hero_tag: 'CORRIDOR PRETORIA À LE CAP · LE TRAIN BLEU',
        hero_h1: 'Regardez Le Voyage',
        hero_h1_sub: 'S\'Épanouir.',
        hero_desc: 'Un billet de train de luxe pour cet itinéraire peut coûter des dizaines de milliers de Rands. TrackTales retrace cette ligne emblématique de 1 600 km du Highveld à l\'Atlantique.',
        stops_tag: 'PATRIMOINE FERROVIAIRE SUD-AFRICAIN · PRETORIA À LE CAP',
        stops_title: 'Arrêts du Corridor',
        stops_desc: 'Un voyage vivant et immersif retraçant les gares historiques, les cols montagneux et le désert du Karoo.',
        stories_title: 'Récits de <span class="text-[#D99B26] italic font-serif">Voyage</span>',
        stories_sub: 'Archives historiques, prouesses d\'ingénierie et folklore le long du corridor ferroviaire sud-africain.',
        auth_welcome: 'Bienvenue',
        auth_welcome_sub: 'Connectez-vous pour accéder à votre pass ferroviaire sud-africain.',
        auth_create: 'Créer un Compte',
        auth_create_sub: 'Inscrivez-vous pour votre passeport numérique TrackTales.',
        auth_signin_btn: 'SE CONNECTER',
        auth_signup_btn: 'CRÉER UN COMPTE',
        email_ph: 'E-mail *',
        pass_ph: 'Mot de passe *',
        name_ph: 'Nom complet *',
        confirm_pass_ph: 'Confirmer le mot de passe *',
        nav_trigger: 'Naviguer',
        nav_access: 'Accès',
        nav_sos: 'SOS',
        nav_signin: 'Se connecter',
        nav_signout: 'Se déconnecter',
        nav_hub_companion: 'COMPAGNON DU CORRIDOR',
        nav_hub_title: 'Panneau de Navigation',
        nav_hub_subtitle: '1 600 km Pretoria à Le Cap',
        nav_card_route_title: 'L\'Itinéraire',
        nav_card_route_desc: 'Aperçu cinématique & carte interactive en direct.',
        nav_card_stops_title: 'Arrêts du Corridor',
        nav_card_stops_desc: 'Gares historiques, cols de montagne & désert du Karoo.',
        nav_card_stories_title: 'Histoires & Archives',
        nav_card_stories_desc: 'Archives historiques, dossiers secrets & audio.',
        nav_card_trains_title: 'Trains Emblématiques',
        nav_card_trains_desc: 'Le Train Bleu & Rovos Rail spécifications.',
        nav_card_games_title: 'Jeux du Corridor',
        nav_card_games_desc: 'Quiz, Bingo ferroviaire & puzzles.',
        nav_card_voice_title: 'Journal Vocal',
        nav_card_voice_desc: 'Dictée vocale en temps réel & journal de bord.',
        nav_hub_tap_hint: 'Appuyez sur une carte pour naviguer',
        stories_badge: 'PATRIMOINE & ARCHIVES',
        stories_active_pass_label: 'Pass Actif:',
        stories_change_pass_btn: 'Changer de Pass',
        stories_all_passes_label: 'Inclus dans tous les pass',
        stories_read_story_btn: 'Lire l\'Histoire Complète',
        stories_min_read: 'min de lecture',
        by_author: 'Par',
        modal_audio_unlocked: 'Compagnon Audio Débloqué',
        modal_audio_listen_desc: 'Écouter la narration complète de l\'histoire',
        modal_audio_play: 'Lancer l\'Audio',
        modal_audio_stop: 'Arrêter l\'Audio',
        modal_audio_locked: 'Narration audio verrouillée pour cette histoire.',
        modal_audio_unlock_btn: 'Débloquer le Pass Audio (R49)',
        footer_tagline: 'VRAIS ITINÉRAIRES. HISTOIRES EXTRAORDINAIRES.',
        footer_desc: 'Un compagnon numérique pour le corridor ferroviaire de Pretoria à Le Cap célébrant le patrimoine d\'Afrique du Sud.',
        footer_nav_heading: 'Navigation',
        footer_link_route: 'L\'Itinéraire',
        footer_link_trains: 'Trains Emblématiques',
        footer_link_sights: 'Sites & Monuments',
        footer_link_puzzles: 'Puzzles & Jeux',
        footer_link_voice: 'Journal Vocal',
        footer_link_heritage: 'Patrimoine & À Propos',
        footer_corridor_heading: 'Voyage du Corridor',
        footer_corridor_desc: '1 600 km à travers l\'Afrique du Sud de Pretoria jusqu\'à la montagne de la Table.',
        footer_corridor_badge: 'Pretoria à Le Cap',
        footer_copyright: '© 2026 TrackTales. Tous droits réservés.',
        footer_corridor_tag: 'Corridor Pretoria à Le Cap',
        rail_runners_tag: 'TRACKTALES · LES COUREURS DU RAIL',
        trains_selected_badge: 'TRAIN SÉLECTIONNÉ:',
        trains_scenery_badge: 'SPLENDEUR DU PAYSAGE & POINTS DE VUE',
        trains_scenery_title: 'Paysages & Points Forts du Corridor',
        trains_culinary_badge: 'GASTRONOMIE & CONVIVIALITÉ',
        trains_dining_title: 'Gastronomie & Salons à Bord',
        trains_specs_badge: 'SPÉCIFICATIONS TECHNIQUES & HISTOIRE',
        trains_highlights_title: 'Points Forts de l\'Expérience',
        label_speed: 'Vitesse',
        label_duration: 'Durée',
        label_corridor: 'Corridor',
        label_departure_hub: 'Gare de Départ',
        label_terminus_station: 'Gare Terminus',
        label_vantage_tip: 'Conseil de Point de Vue'
      },
      nl: {
        hero_tag: 'CORRIDOR PRETORIA NAAR KAAPSTAD · DE BLAUWE TREIN',
        hero_h1: 'Zie De Reis',
        hero_h1_sub: 'Ontvouwen.',
        hero_desc: 'Een luxe treinticket voor deze route kan tienduizenden Rand kosten. TrackTales volgt dezelfde iconische route van 1.600 km van het Hoogveld naar de Atlantische Oceaan.',
        stops_tag: 'ZUID-AFRIKAANS SPOORWEGERFGOED · PRETORIA NAAR KAAPSTAD',
        stops_title: 'Corridor Haltes',
        stops_desc: 'Een meeslepende reis langs historische stations, bergpassen en Karoo-woestijnknooppunten.',
        stories_title: 'Reis <span class="text-[#D99B26] italic font-serif">Verhalen</span>',
        stories_sub: 'Archiefverhalen, technische mijlpalen en spoorwegerfgoed langs de luxe corridor.',
        auth_welcome: 'Welkom',
        auth_welcome_sub: 'Meld u aan om toegang te krijgen tot uw Zuid-Afrikaanse spoorwegpas.',
        auth_create: 'Account Aanmaken',
        auth_create_sub: 'Registreer voor uw digitale TrackTales-paspoort.',
        auth_signin_btn: 'INLOGGEN',
        auth_signup_btn: 'ACCOUNT AANMAKEN',
        email_ph: 'E-mail *',
        pass_ph: 'Wachtwoord *',
        name_ph: 'Volledige Naam *',
        confirm_pass_ph: 'Bevestig Wachtwoord *',
        nav_trigger: 'Navigeren',
        nav_access: 'Toegang',
        nav_sos: 'SOS',
        nav_signin: 'Inloggen',
        nav_signout: 'Uitloggen',
        nav_hub_companion: 'CORRIDOR GIDS',
        nav_hub_title: 'Navigatiepaneel',
        nav_hub_subtitle: '1.600 km Pretoria naar Kaapstad',
        nav_card_route_title: 'De Route',
        nav_card_route_desc: 'Cinematografisch overzicht & live interactieve route.',
        nav_card_stops_title: 'Corridor Haltes',
        nav_card_stops_desc: 'Historische stations, bergpassen & Karoo-woestijn.',
        nav_card_stories_title: 'Verhalen & Archief',
        nav_card_stories_desc: 'Historische archieven, geheime dossiers & audio.',
        nav_card_trains_title: 'Vlaggenschip Treinen',
        nav_card_trains_desc: 'De Blauwe Trein & Rovos Rail specificaties.',
        nav_card_games_title: 'Corridor Spellen',
        nav_card_games_desc: 'Spoorwegquizzen, Bingo & puzzels.',
        nav_card_voice_title: 'Spraakdagboek',
        nav_card_voice_desc: 'Realtime spraak-naar-tekst & passagiersdagboek.',
        nav_hub_tap_hint: 'Tik op een kaart om te navigeren',
        stories_badge: 'ERFGOED & ARCHIEVEN',
        stories_active_pass_label: 'Actieve Pas:',
        stories_change_pass_btn: 'Pas Wijzigen',
        stories_all_passes_label: 'Inbegrepen bij alle passen',
        stories_read_story_btn: 'Lees Volledige Verhaal',
        stories_min_read: 'min leestijd',
        by_author: 'Door',
        modal_audio_unlocked: 'Audio-Gids Ontgrendeld',
        modal_audio_listen_desc: 'Luister naar het volledige verhaal',
        modal_audio_play: 'Audio Afspelen',
        modal_audio_stop: 'Audio Stoppen',
        modal_audio_locked: 'Audionarratie vergrendeld voor dit verhaal.',
        modal_audio_unlock_btn: 'Audio-Pas Ontgrendelen (R49)',
        footer_tagline: 'ECHTE ROUTES. BUITENGEWONE VERHALEN.',
        footer_desc: 'Een digitale reisgids voor de spoorlijn van Pretoria naar Kaapstad die het erfgoed van Zuid-Afrika viert.',
        footer_nav_heading: 'Navigatie',
        footer_link_route: 'De Route',
        footer_link_trains: 'Vlaggenschip Treinen',
        footer_link_sights: 'Bezienswaardigheden',
        footer_link_puzzles: 'Puzzels & Spellen',
        footer_link_voice: 'Spraakdagboek',
        footer_link_heritage: 'Erfgoed & Over Ons',
        footer_corridor_heading: 'Corridor Reis',
        footer_corridor_desc: '1.600 km door het hart van Zuid-Afrika van Pretoria naar de Tafelberg.',
        footer_corridor_badge: 'Pretoria naar Kaapstad',
        footer_copyright: '© 2026 TrackTales. Alle rechten voorbehouden.',
        footer_corridor_tag: 'Pretoria naar Kaapstad Corridor',
        rail_runners_tag: 'TRACKTALES · DE SPOORLOPERS',
        trains_selected_badge: 'GESELECTEERDE TREIN:',
        trains_scenery_badge: 'LANDSCHAPSSCHOON & UITZICHTPUNTEN',
        trains_scenery_title: 'Landschap & Hoogtepunten van de Corridor',
        trains_culinary_badge: 'CULINAIR & SOCIAAL',
        trains_dining_title: 'Gastronomie & Lounges aan Boord',
        trains_specs_badge: 'TECHNISCHE SPECIFICATIES & GESCHIEDENIS',
        trains_highlights_title: 'Kenmerkende Reiservaringen',
        label_speed: 'Snelheid',
        label_duration: 'Duur',
        label_corridor: 'Corridor',
        label_departure_hub: 'Vertrekstation',
        label_terminus_station: 'Eindstation',
        label_vantage_tip: 'Uitzichtpunt Tip'
      },
      es: {
        hero_tag: 'CORREDOR PRETORIA A CIUDAD DEL CABO · EL TREN AZUL',
        hero_h1: 'Mire El Viaje',
        hero_h1_sub: 'Desplegarse.',
        hero_desc: 'Un billete de tren de lujo para esta ruta puede costar decenas de miles de Rands. TrackTales recorre la misma línea icónica de 1,600 km desde el Highveld hasta el Atlántico.',
        stops_tag: 'PATRIMONIO FERROVIARIO DE SUDÁFRICA · PRETORIA A CIUDAD DEL CABO',
        stops_title: 'Paradas del Corredor',
        stops_desc: 'Un viaje vivo e inmersivo por estaciones históricas, pasos de montaña y el desierto del Karoo.',
        stories_title: 'Historias de <span class="text-[#D99B26] italic font-serif">Viaje</span>',
        stories_sub: 'Archivos históricos, hitos de ingeniería y folclore a lo largo del corredor ferroviario.',
        auth_welcome: 'Bienvenido',
        auth_welcome_sub: 'Inicie sesión para acceder a su pase ferroviario sudafricano.',
        auth_create: 'Crear Cuenta',
        auth_create_sub: 'Regístrese para su pasaporte digital TrackTales.',
        auth_signin_btn: 'INICIAR SESIÓN',
        auth_signup_btn: 'CREAR CUENTA',
        email_ph: 'Correo electrónico *',
        pass_ph: 'Contraseña *',
        name_ph: 'Nombre completo *',
        confirm_pass_ph: 'Confirmar contraseña *',
        nav_trigger: 'Navegar',
        nav_access: 'Acceso',
        nav_sos: 'SOS',
        nav_signin: 'Iniciar Sesión',
        nav_signout: 'Cerrar Sesión',
        nav_hub_companion: 'ACOMPAÑANTE DEL CORREDOR',
        nav_hub_title: 'Panel de Navegación',
        nav_hub_subtitle: '1,600 km Pretoria a Ciudad del Cabo',
        nav_card_route_title: 'La Ruta',
        nav_card_route_desc: 'Resumen cinematográfico y mapa interactivo en vivo.',
        nav_card_stops_title: 'Paradas del Corredor',
        nav_card_stops_desc: 'Estaciones históricas, pasos de montaña y Karoo.',
        nav_card_stories_title: 'Historias y Archivos',
        nav_card_stories_desc: 'Archivos históricos, expedientes secretos y audio.',
        nav_card_trains_title: 'Trenes Emblemáticos',
        nav_card_trains_desc: 'El Tren Azul y Rovos Rail especificaciones.',
        nav_card_games_title: 'Juegos del Corredor',
        nav_card_games_desc: 'Cuestionarios, Bingo ferroviario y puzzles.',
        nav_card_voice_title: 'Diario de Voz',
        nav_card_voice_desc: 'Dictado de voz en tiempo real y diario de a bordo.',
        nav_hub_tap_hint: 'Toque una tarjeta para navegar',
        stories_badge: 'PATRIMONIO Y ARCHIVOS',
        stories_active_pass_label: 'Pase Activo:',
        stories_change_pass_btn: 'Cambiar Pase',
        stories_all_passes_label: 'Incluido en todos los pases',
        stories_read_story_btn: 'Leer Historia Completa',
        stories_min_read: 'min de lectura',
        footer_tagline: 'RUTAS REALES. HISTORIAS EXTRAORDINARIAS.',
        footer_desc: 'Un compañero digital para el corredor ferroviario de Pretoria a Ciudad del Cabo que celebra el patrimonio de Sudáfrica.',
        footer_nav_heading: 'Navegación',
        footer_link_route: 'La Ruta',
        footer_link_trains: 'Trenes Emblemáticos',
        footer_link_sights: 'Lugares de Interés',
        footer_link_puzzles: 'Puzzles y Juegos',
        footer_link_voice: 'Diario de Voz',
        footer_link_heritage: 'Patrimonio y Acerca de',
        footer_corridor_heading: 'Viaje del Corredor',
        footer_corridor_desc: '1,600 km a través de Sudáfrica desde Pretoria hasta la Montaña de la Mesa.',
        footer_corridor_badge: 'Pretoria a Ciudad del Cabo',
        footer_copyright: '© 2026 TrackTales. Todos los derechos reservados.',
        footer_corridor_tag: 'Corredor Pretoria a Ciudad del Cabo',
        rail_runners_tag: 'TRACKTALES · LOS CORREDORES DEL TREN',
        trains_selected_badge: 'TREN SELECCIONADO:',
        trains_scenery_badge: 'ESPLENDOR DEL PAISAJE Y PUNTOS DE VISTA',
        trains_scenery_title: 'Paisajes y Puntos Destacados del Corredor',
        trains_culinary_badge: 'GASTRONOMÍA Y SOCIEDAD',
        trains_dining_title: 'Alta Cocina y Salones a Bordo',
        trains_specs_badge: 'ESPECIFICACIONES TÉCNICAS E HISTORIA',
        trains_highlights_title: 'Experiencias Destacadas',
        label_speed: 'Velocidad',
        label_duration: 'Duración',
        label_corridor: 'Corredor',
        label_departure_hub: 'Estación de Salida',
        label_terminus_station: 'Estación Término',
        label_vantage_tip: 'Consejo de Mirador'
      },
      it: {
        hero_tag: 'CORRIDOIO PRETORIA A CITTÀ DEL CAPO · IL TRENO BLU',
        hero_h1: 'Guarda Il Viaggio',
        hero_h1_sub: 'Rivelarsi.',
        hero_desc: 'Un biglietto del treno di lusso per questo percorso può costare decine di migliaia di Rand. TrackTales ripercorre questa linea iconica di 1.600 km dal Highveld all\'Atlantico.',
        stops_tag: 'PATRIMONIO FERROVIARIO DEL SUD AFRICA · PRETORIA A CITTÀ DEL CAPO',
        stops_title: 'Fermate del Corridoio',
        stops_desc: 'Un viaggio vivo e immersivo tra stazioni storiche, valichi montani e il deserto del Karoo.',
        stories_title: 'Storie di <span class="text-[#D99B26] italic font-serif">Viaggio</span>',
        stories_sub: 'Archivi storici, traguardi d\'ingegneria e folklore lungo il corridoio sudafricano.',
        auth_welcome: 'Benvenuto',
        auth_welcome_sub: 'Accedi per accedere al tuo pass ferroviario sudafricano.',
        auth_create: 'Crea Account',
        auth_create_sub: 'Registrati per il tuo passaporto digitale TrackTales.',
        auth_signin_btn: 'ACCEDI',
        auth_signup_btn: 'CREA ACCOUNT',
        email_ph: 'E-mail *',
        pass_ph: 'Password *',
        name_ph: 'Nome completo *',
        confirm_pass_ph: 'Conferma password *',
        nav_trigger: 'Naviga',
        nav_access: 'Accesso',
        nav_sos: 'SOS',
        nav_signin: 'Accedi',
        nav_signout: 'Esci',
        nav_hub_companion: 'COMPAGNO DI CORRIDOIO',
        nav_hub_title: 'Pannello di Navigazione',
        nav_hub_subtitle: '1.600 km Pretoria a Città del Capo',
        nav_card_route_title: 'Il Percorso',
        nav_card_route_desc: 'Panoramica cinematografica e mappa interattiva.',
        nav_card_stops_title: 'Fermate del Corridoio',
        nav_card_stops_desc: 'Stazioni storiche, passi montani e deserto del Karoo.',
        nav_card_stories_title: 'Storie e Archivi',
        nav_card_stories_desc: 'Archivi storici, dossier segreti e audio.',
        nav_card_trains_title: 'Treni Ammiraglia',
        nav_card_trains_desc: 'Il Treno Blu e Rovos Rail specifiche.',
        nav_card_games_title: 'Giochi del Corridoio',
        nav_card_games_desc: 'Quiz, Bingo ferroviario e puzzle.',
        nav_card_voice_title: 'Diario Vocale',
        nav_card_voice_desc: 'Dettatura vocale in tempo reale e diario di bordo.',
        nav_hub_tap_hint: 'Tocca una scheda per navigare',
        stories_badge: 'PATRIMONIO E ARCHIVI',
        stories_active_pass_label: 'Pass Attivo:',
        stories_change_pass_btn: 'Cambia Pass',
        stories_all_passes_label: 'Incluso in tutti i pass',
        stories_read_story_btn: 'Leggi Storia Completa',
        stories_min_read: 'min di lettura',
        footer_tagline: 'PERCORSI REALI. STORIE STRAORDINARIE.',
        footer_desc: 'Un compagno digitale per il corridoio ferroviario da Pretoria a Città del Capo che celebra il patrimonio del Sudafrica.',
        footer_nav_heading: 'Navigazione',
        footer_link_route: 'Il Percorso',
        footer_link_trains: 'Treni Ammiraglia',
        footer_link_sights: 'Luoghi di Interesse',
        footer_link_puzzles: 'Puzzle e Giochi',
        footer_link_voice: 'Diario Vocale',
        footer_link_heritage: 'Patrimonio e Info',
        footer_corridor_heading: 'Viaggio del Corridoio',
        footer_corridor_desc: '1.600 km attraverso il Sudafrica da Pretoria alla Table Mountain.',
        footer_corridor_badge: 'Pretoria a Città del Capo',
        footer_copyright: '© 2026 TrackTales. Tutti i diritti riservati.',
        footer_corridor_tag: 'Corridoio Pretoria a Città del Capo',
        rail_runners_tag: 'TRACKTALES · I CORRIDORI DEL TRENO',
        trains_selected_badge: 'TRENO SELEZIONATO:',
        trains_scenery_badge: 'SPLENDORE DEL PAESAGGIO E PUNTI PANORAMICI',
        trains_scenery_title: 'Paesaggi e Punti di Forza del Corridoio',
        trains_culinary_badge: 'ENOGASTRONOMIA E SOCIALITÀ',
        trains_dining_title: 'Ristorazione di Lusso e Salotti a Bordo',
        trains_specs_badge: 'SPECIFICHE TECNICHE E STORIA',
        trains_highlights_title: 'Esperienze Caratteristiche',
        label_speed: 'Velocità',
        label_duration: 'Durata',
        label_corridor: 'Corridoio',
        label_departure_hub: 'Stazione di Partenza',
        label_terminus_station: 'Stazione Capolinea',
        label_vantage_tip: 'Consiglio Panoramico'
      },
      pt: {
        hero_tag: 'CORREDOR PRETORIA A CIDADE DO CABO · O COMBOIO AZUL',
        hero_h1: 'Veja A Viagem',
        hero_h1_sub: 'A Revelar-se.',
        hero_desc: 'Um bilhete de comboio de luxo para esta rota pode custar dezenas de milhares de Rands. O TrackTales percorre esta linha icónica de 1.600 km do Highveld ao Atlântico.',
        stops_tag: 'PATRIMÓNIO FERROVIÁRIO DA ÁFRICA DO SUL · PRETORIA A CIDADE DO CABO',
        stops_title: 'Paragens do Corredor',
        stops_desc: 'Uma viagem viva e imersiva por estações históricas, desfiladeiros de montanha e o deserto do Karoo.',
        stories_title: 'Histórias de <span class="text-[#D99B26] italic font-serif">Viagem</span>',
        stories_sub: 'Arquivos históricos, marcos de engenharia e folclore ao longo do corredor ferroviário.',
        auth_welcome: 'Bem-vindo',
        auth_welcome_sub: 'Inicie sessão para aceder ao seu passe ferroviário sul-africano.',
        auth_create: 'Criar Conta',
        auth_create_sub: 'Registe-se para o seu passaporte digital TrackTales.',
        auth_signin_btn: 'INICIAR SESSÃO',
        auth_signup_btn: 'CRIAR CONTA',
        email_ph: 'E-mail *',
        pass_ph: 'Palavra-passe *',
        name_ph: 'Nome completo *',
        confirm_pass_ph: 'Confirmar palavra-passe *',
        nav_trigger: 'Navegar',
        nav_access: 'Acesso',
        nav_sos: 'SOS',
        nav_signin: 'Iniciar Sessão',
        nav_signout: 'Terminar Sessão',
        nav_hub_companion: 'ACOMPANHANTE DO CORREDOR',
        nav_hub_title: 'Painel de Navegação',
        nav_hub_subtitle: '1.600 km Pretoria a Cidade do Cabo',
        nav_card_route_title: 'A Rota',
        nav_card_route_desc: 'Visão geral cinematográfica e mapa interativo ao vivo.',
        nav_card_stops_title: 'Paragens do Corredor',
        nav_card_stops_desc: 'Estações históricas, desfiladeiros e deserto do Karoo.',
        nav_card_stories_title: 'Histórias e Arquivos',
        nav_card_stories_desc: 'Arquivos históricos, dossiês secretos e áudio.',
        nav_card_trains_title: 'Comboios Emblemáticos',
        nav_card_trains_desc: 'O Comboio Azul e Rovos Rail especificações.',
        nav_card_games_title: 'Jogos do Corredor',
        nav_card_games_desc: 'Questionários, Bingo ferroviário e puzzles.',
        nav_card_voice_title: 'Diário de Voz',
        nav_card_voice_desc: 'Ditado de voz em tempo real e diário de bordo.',
        nav_hub_tap_hint: 'Toque num cartão para navegar',
        stories_badge: 'PATRIMÓNIO E ARQUIVOS',
        stories_active_pass_label: 'Passe Ativo:',
        stories_change_pass_btn: 'Alterar Passe',
        stories_all_passes_label: 'Incluído em todos os passes',
        stories_read_story_btn: 'Ler História Completa',
        stories_min_read: 'min de leitura',
        by_author: 'Por',
        modal_audio_unlocked: 'Acompanhante de Áudio Desbloqueado',
        modal_audio_listen_desc: 'Ouça a narração completa da história',
        modal_audio_play: 'Reproduzir Áudio',
        modal_audio_stop: 'Parar Áudio',
        modal_audio_locked: 'Narração de áudio bloqueada para esta história.',
        modal_audio_unlock_btn: 'Desbloquear Passe de Áudio (R49)',
        footer_tagline: 'ROTAS REAIS. HISTÓRIAS EXTRAORDINÁRIAS.',
        footer_desc: 'Um companheiro digital para o corredor ferroviário de Pretoria à Cidade do Cabo que celebra o património da África do Sul.',
        footer_nav_heading: 'Navegação',
        footer_link_route: 'A Rota',
        footer_link_trains: 'Comboios Emblemáticos',
        footer_link_sights: 'Locais de Interesse',
        footer_link_puzzles: 'Puzzles e Jogos',
        footer_link_voice: 'Diário de Voz',
        footer_link_heritage: 'Património e Sobre',
        footer_corridor_heading: 'Viagem do Corredor',
        footer_corridor_desc: '1.600 km através da África do Sul desde Pretoria até à Montanha da Mesa.',
        footer_corridor_badge: 'Pretoria a Cidade do Cabo',
        footer_copyright: '© 2026 TrackTales. Todos os direitos reservados.',
        footer_corridor_tag: 'Corredor Pretoria a Cidade do Cabo',
        rail_runners_tag: 'TRACKTALES · OS CORREDORES DO COMBOIO',
        trains_selected_badge: 'COMBOIO SELECIONADO:',
        trains_scenery_badge: 'ESPLENDOR DA PAISAGEM E PONTOS DE VISTA',
        trains_scenery_title: 'Paisagens e Destaques do Corredor',
        trains_culinary_badge: 'GASTRONOMIA E CONVÍVIO',
        trains_dining_title: 'Alta Cozinha e Salões a Bordo',
        trains_specs_badge: 'ESPECIFICAÇÕES TÉCNICAS E HISTÓRIA',
        trains_highlights_title: 'Experiências em Destaque',
        label_speed: 'Velocidade',
        label_duration: 'Duração',
        label_corridor: 'Corredor',
        label_departure_hub: 'Estação de Partida',
        label_terminus_station: 'Estação Terminal',
        label_vantage_tip: 'Dica do Ponto de Vista'
      },
      zh: {
        hero_tag: '比勒陀利亚至开普敦铁路走廊 · 蓝色列车',
        hero_h1: '见证传奇旅程',
        hero_h1_sub: '徐徐展开。',
        hero_desc: '这条线路的豪华火车票可能价值数万兰特。TrackTales为您追踪这条横跨高地至大西洋的1,600公里经典铁路线。',
        stops_tag: '南非铁路遗产 · 比勒陀利亚至开普敦',
        stops_title: '走廊站点',
        stops_desc: '沿着南非1,600公里的标志性铁路走廊，沉浸式体验历史车站、山口和卡鲁沙漠枢纽。',
        stories_title: '旅程 <span class="text-[#D99B26] italic font-serif">故事</span>',
        stories_sub: '南非豪华铁路走廊沿线的档案故事、工程里程碑与民间传说。',
        auth_welcome: '欢迎',
        auth_welcome_sub: '登录以访问您的南非铁路导览通行证。',
        auth_create: '创建账号',
        auth_create_sub: '注册您的TrackTales数字铁路护照。',
        auth_signin_btn: '登录',
        auth_signup_btn: '创建账号',
        email_ph: '电子邮箱 *',
        pass_ph: '密码 *',
        name_ph: '全名 *',
        confirm_pass_ph: '确认密码 *',
        nav_trigger: '导航',
        nav_access: '无障碍',
        nav_sos: '求助',
        nav_signin: '登录',
        nav_signout: '退出',
        nav_hub_companion: '铁路走廊导览',
        nav_hub_title: '导航面板',
        nav_hub_subtitle: '1,600 公里 比勒陀利亚至开普敦',
        nav_card_route_title: '路线概览',
        nav_card_route_desc: '电影级走廊全景与实时互动路线。',
        nav_card_stops_title: '走廊站点',
        nav_card_stops_desc: '历史车站、山口与卡鲁沙漠枢纽。',
        nav_card_stories_title: '故事与档案',
        nav_card_stories_desc: '历史档案、解密文件与语音讲解。',
        nav_card_trains_title: '旗舰列车',
        nav_card_trains_desc: '蓝色列车与非洲傲慢列车规格及餐饮。',
        nav_card_games_title: '走廊游戏',
        nav_card_games_desc: '站点问答、南非铁路宾果与拼图。',
        nav_card_voice_title: '语音日志',
        nav_card_voice_desc: '实时语音转文字与乘客随笔。',
        nav_hub_tap_hint: '点击任意卡片即可导航',
        stories_badge: '文化遗产与档案故事',
        stories_active_pass_label: '当前通行证：',
        stories_change_pass_btn: '更换通行证',
        stories_all_passes_label: '包含于所有通行证',
        stories_read_story_btn: '阅读完整故事',
        stories_min_read: '分钟阅读',
        by_author: '作者：',
        modal_audio_unlocked: '语音伴侣已解锁',
        modal_audio_listen_desc: '收听完整故事讲解',
        modal_audio_play: '播放音频',
        modal_audio_stop: '停止播放',
        modal_audio_locked: '此故事的语音讲解未解锁。',
        modal_audio_unlock_btn: '解锁语音通行证 (R49)',
        footer_tagline: '真实路线。非凡故事。',
        footer_desc: '比勒陀利亚至开普敦铁路走廊的数字故事导览，庆祝南非标志性铁路的历史与文化。',
        footer_nav_heading: '导航',
        footer_link_route: '路线概览',
        footer_link_trains: '旗舰列车',
        footer_link_sights: '景点与地标',
        footer_link_puzzles: '趣味解谜',
        footer_link_voice: '语音日志',
        footer_link_heritage: '遗产与关于',
        footer_corridor_heading: '走廊之旅',
        footer_corridor_desc: '横跨南非心脏地带1,600公里，从紫楹花之城直达桌山。',
        footer_corridor_badge: '比勒陀利亚至开普敦',
        footer_copyright: '© 2026 TrackTales. 保留所有权利。',
        footer_corridor_tag: '比勒陀利亚至开普敦铁路走廊',
        rail_runners_tag: 'TRACKTALES · 铁路行者',
        trains_selected_badge: '已选列车：',
        trains_scenery_badge: '壮丽风光与观景亮点',
        trains_scenery_title: '走廊风光与观景精选',
        trains_culinary_badge: '美酒美食与社交',
        trains_dining_title: '车厢高级餐饮与休闲酒廊',
        trains_specs_badge: '技术参数与历史',
        trains_highlights_title: '特色体验亮点',
        label_speed: '运行速度',
        label_duration: '行程时长',
        label_corridor: '全程距离',
        label_departure_hub: '始发车站',
        label_terminus_station: '终点车站',
        label_vantage_tip: '最佳观景建议'
      },
      ja: {
        hero_tag: 'プレトリア〜ケープタウン鉄道回廊 · ブルー・トレイン',
        hero_h1: '壮大な旅の物語が',
        hero_h1_sub: '今、開かれる。',
        hero_desc: 'このルートの豪華列車のチケットは数万ランドに達することもあります。TrackTalesはハイフェルドから大西洋へと続く1,600kmの伝説の線路を辿ります。',
        stops_tag: '南アフリカ鉄道遺産 · プレトリア〜ケープタウン',
        stops_title: '回廊の停車駅',
        stops_desc: '歴史的な駅、山道の峠、カルー砂漠の分岐点を巡る1,600kmの臨場感あふれる旅。',
        stories_title: '旅の <span class="text-[#D99B26] italic font-serif">物語</span>',
        stories_sub: '南アフリカの豪華鉄道回廊に沿った歴史文書、技術の偉業、伝承。',
        auth_welcome: 'ようこそ',
        auth_welcome_sub: 'サインインして南アフリカ鉄道ガイドパスにアクセスしてください。',
        auth_create: 'アカウント作成',
        auth_create_sub: 'TrackTalesデジタルパスポートにご登録ください。',
        auth_signin_btn: 'サインイン',
        auth_signup_btn: 'アカウント作成',
        email_ph: 'メールアドレス *',
        pass_ph: 'パスワード *',
        name_ph: 'お名前 *',
        confirm_pass_ph: 'パスワード確認 *',
        nav_trigger: 'ナビゲート',
        nav_access: 'アクセシビリティ',
        nav_sos: 'SOS求助',
        nav_signin: 'サインイン',
        nav_signout: 'サインアウト',
        nav_hub_companion: '鉄道回廊コンパニオン',
        nav_hub_title: 'ナビゲーションパネル',
        nav_hub_subtitle: '1,600 km プレトリア〜ケープタウン',
        nav_card_route_title: 'ルート概要',
        nav_card_route_desc: 'シネマティックな全景とリアルタイムの対話型マップ。',
        nav_card_stops_title: '回廊の停車駅',
        nav_card_stops_desc: '歴史的駅、山道の峠、カルー砂漠の分岐点。',
        nav_card_stories_title: '物語とアーカイブ',
        nav_card_stories_desc: '歴史文書、秘密ファイル、音声解説。',
        nav_card_trains_title: 'フラッグシップ列車',
        nav_card_trains_desc: 'ブルー・トレインとロボス・レイルの仕様と食事。',
        nav_card_games_title: '回廊ゲーム',
        nav_card_games_desc: 'クイズ、鉄道ビンゴ、ジグソーパズル。',
        nav_card_voice_title: '音声ジャーナル',
        nav_card_voice_desc: 'リアルタイム音声入力と乗客日記。',
        nav_hub_tap_hint: 'カードをタップして移動',
        stories_badge: '鉄道遺産とアーカイブ物語',
        stories_active_pass_label: '有効なパス：',
        stories_change_pass_btn: 'パスを変更',
        stories_all_passes_label: '全パスに含まれています',
        stories_read_story_btn: '物語を全文読む',
        stories_min_read: '分で読める',
        by_author: '著者：',
        modal_audio_unlocked: '音声ガイドが解放されました',
        modal_audio_listen_desc: '物語のフル音声解説を聴く',
        modal_audio_play: '声を再生',
        modal_audio_stop: '声を停止',
        modal_audio_locked: 'この物語の音声解説はロックされています。',
        modal_audio_unlock_btn: '音声パスを解放 (R49)',
        footer_tagline: '本物のルート。非凡な物語。',
        footer_desc: 'プレトリアからケープタウンへの鉄道回廊のデジタル物語ガイド。南アフリカの伝統を称えます。',
        footer_nav_heading: 'ナビゲーション',
        footer_link_route: 'ルート概要',
        footer_link_trains: 'フラッグシップ列車',
        footer_link_sights: '名所とランドマーク',
        footer_link_puzzles: 'パズルとゲーム',
        footer_link_voice: '音声ジャーナル',
        footer_link_heritage: '遺産と概要',
        footer_corridor_heading: '回廊の旅',
        footer_corridor_desc: 'プレトリアからテーブルマウンテンまで、南アフリカの心臓部1,600kmを縦断。',
        footer_corridor_badge: 'プレトリア〜ケープタウン',
        footer_copyright: '© 2026 TrackTales. All rights reserved.',
        footer_corridor_tag: 'プレトリア〜ケープタウン鉄道回廊',
        rail_runners_tag: 'TRACKTALES · レールランナーズ',
        trains_selected_badge: '選択された列車：',
        trains_scenery_badge: '絶景と展望スポット',
        trains_scenery_title: '回廊の車窓風景と見どころ',
        trains_culinary_badge: '美食と社交',
        trains_dining_title: '車内ファインダイニング＆ラウンジ',
        trains_specs_badge: '技術仕様と歴史',
        trains_highlights_title: 'ハイライト体験',
        label_speed: '最高速度',
        label_duration: '所要時間',
        label_corridor: '走行距離',
        label_departure_hub: '出発駅',
        label_terminus_station: '終着駅',
        label_vantage_tip: '展望のアドバイス'
      },
      ko: {
        hero_tag: '프리토리아 - 케이프타운 철도 회랑 · 블루 트레인',
        hero_h1: '경이로운 여정이',
        hero_h1_sub: '펼쳐집니다.',
        hero_desc: '이 노선의 럭셔리 기차표는 수만 랜드에 달할 수 있습니다. TrackTales는 하이펠드에서 대서양까지 이어지는 1,600km의 전설적인 철도를 추적합니다.',
        stops_tag: '남아프리카 공화국 철도 유산 · 프리토리아 - 케이프타운',
        stops_title: '회랑 정차역',
        stops_desc: '역사적인 기차역, 산악 고개, 카루 사막 분기점을 지나가는 1,600km의 생생한 여정.',
        stories_title: '여정의 <span class="text-[#D99B26] italic font-serif">이야기</span>',
        stories_sub: '남아프리카 공화국 럭셔리 철도 회랑의 기록 역사, 공학적 성과 및 민담.',
        auth_welcome: '환영합니다',
        auth_welcome_sub: '남아프리카 공화국 철도 패스에 접근하려면 로그인하세요.',
        auth_create: '계정 생성',
        auth_create_sub: 'TrackTales 디지털 여권에 등록하세요.',
        auth_signin_btn: '로그인',
        auth_signup_btn: '계정 생성',
        email_ph: '이메일 *',
        pass_ph: '비밀번호 *',
        name_ph: '성함 *',
        confirm_pass_ph: '비밀번호 확인 *',
        nav_trigger: '탐색',
        nav_access: '접근성',
        nav_sos: '긴급 SOS',
        nav_signin: '로그인',
        nav_signout: '로그아웃',
        nav_hub_companion: '철도 회랑 가이드',
        nav_hub_title: '탐색 패널',
        nav_hub_subtitle: '1,600 km 프리토리아 - 케이프타운',
        nav_card_route_title: '노선 개요',
        nav_card_route_desc: '시네마틱 파노라마 및 실시간 대화형 지도.',
        nav_card_stops_title: '회랑 정차역',
        nav_card_stops_desc: '역사적 기차역, 산악 고개 및 카루 사막.',
        nav_card_stories_title: '이야기 및 아카이브',
        nav_card_stories_desc: '역사 기록, 기밀 서류 및 음성 해설.',
        nav_card_trains_title: '플래그십 열차',
        nav_card_trains_desc: '블루 트레인 및 로보스 레일 제원과 식사.',
        nav_card_games_title: '회랑 게임',
        nav_card_games_desc: '퀴즈, 철도 빙고 및 퍼즐 게임.',
        nav_card_voice_title: '음성 일기',
        nav_card_voice_desc: '실시간 음성 인식 및 승객 일기장.',
        nav_hub_tap_hint: '카드를 탭하여 이동하세요',
        stories_badge: '철도 유산 및 아카이브 이야기',
        stories_active_pass_label: '활성 패스:',
        stories_change_pass_btn: '패스 변경',
        stories_all_passes_label: '모든 패스에 포함됨',
        stories_read_story_btn: '전체 이야기 읽기',
        stories_min_read: '분 소요',
        by_author: '저자:',
        modal_audio_unlocked: '음성 가이드 잠금 해제됨',
        modal_audio_listen_desc: '전체 이야기 음성 해설 듣기',
        modal_audio_play: '음성 재생',
        modal_audio_stop: '음성 정지',
        modal_audio_locked: '이 이야기의 음성 해설이 잠겨 있습니다.',
        modal_audio_unlock_btn: '음성 패스 잠금 해제 (R49)',
        footer_tagline: '진짜 노선. 비범한 이야기.',
        footer_desc: '프리토리아에서 케이프타운까지 이어지는 남아프리카 공화국 철도 회랑의 디지털 가이드.',
        footer_nav_heading: '탐색',
        footer_link_route: '노선 개요',
        footer_link_trains: '플래그십 열차',
        footer_link_sights: '명소 및 랜드마크',
        footer_link_puzzles: '퍼즐 게임',
        footer_link_voice: '음성 일기',
        footer_link_heritage: '유산 및 소개',
        footer_corridor_heading: '회랑 여정',
        footer_corridor_desc: '프리토리아에서 테이블 마운틴까지 남아프리카 남아공 1,600km 횡단.',
        footer_corridor_badge: '프리토리아 - 케이프타운',
        footer_copyright: '© 2026 TrackTales. All rights reserved.',
        footer_corridor_tag: '프리토리아 - 케이프타운 철도 회랑',
        rail_runners_tag: 'TRACKTALES · 레일 러너스',
        trains_selected_badge: '선택된 열차:',
        trains_scenery_badge: '장엄한 풍경 및 전망 포인트',
        trains_scenery_title: '회랑 풍경 및 주요 관람 포인트',
        trains_culinary_badge: '파인 다이닝 및 소셜',
        trains_dining_title: '선상 파인 다이닝 및 라운지',
        trains_specs_badge: '기술 제원 및 역사',
        trains_highlights_title: '시그니처 체험 하이라이트',
        label_speed: '운행 속도',
        label_duration: '소요 시간',
        label_corridor: '운행 거리',
        label_departure_hub: '출발역',
        label_terminus_station: '종착역',
        label_vantage_tip: '전망 팁'
      },
      hi: {
        hero_tag: 'प्रिटोरिया से केप टाउन रेल कॉरिडोर · द ब्लू ट्रेन',
        hero_h1: 'देखें यात्रा का जादू',
        hero_h1_sub: 'उभरते हुए।',
        hero_desc: 'इस मार्ग के लिए एक लक्जरी ट्रेन टिकट की कीमत हजारों रैंड हो सकती है। ट्रैकटेल्स हाईवेल्ड से अटलांटिक तक 1,600 किमी की उसी प्रसिद्ध लाइन को ट्रैक करता है।',
        stops_tag: 'दक्षिण अफ्रीकी रेल विरासत · प्रिटोरिया से केप टाउन',
        stops_title: 'कॉरिडोर के स्टेशन',
        stops_desc: 'ऐतिहासिक स्टेशनों, पहाड़ी दर्रों और कारू मरुस्थल जंक्शनों का 1,600 किमी का सजीव अनुभव।',
        stories_title: 'यात्रा की <span class="text-[#D99B26] italic font-serif">कहानी</span>',
        stories_sub: 'दक्षिण अफ्रीका के लक्जरी रेल कॉरिडोर की ऐतिहासिक कहानियां, इंजीनियरिंग मील के पत्थर और लोककथाएं।',
        auth_welcome: 'स्वागत है',
        auth_welcome_sub: 'अपने दक्षिण अफ्रीका रेल पास तक पहुँचने के लिए साइन इन करें।',
        auth_create: 'खाता बनाएं',
        auth_create_sub: 'अपने डिजिटल ट्रैकटेल्स पासपोर्ट के लिए पंजीकरण करें।',
        auth_signin_btn: 'साइन इन करें',
        auth_signup_btn: 'खाता बनाएं',
        email_ph: 'ईमेल *',
        pass_ph: 'पासवर्ड *',
        name_ph: 'पूरा नाम *',
        confirm_pass_ph: 'पासवर्ड की पुष्टि करें *',
        nav_trigger: 'नेविगेट करें',
        nav_access: 'पहुंच',
        nav_sos: 'आपातकालीन SOS',
        nav_signin: 'साइन इन करें',
        nav_signout: 'साइन आउट',
        nav_hub_companion: 'रेल कॉरिडोर साथी',
        nav_hub_title: 'नेविगेशन पैनल',
        nav_hub_subtitle: '1,600 किमी प्रिटोरिया से केप टाउन',
        nav_card_route_title: 'मार्ग का विवरण',
        nav_card_route_desc: 'सिनेमैटिक ओवरव्यू और लाइव मैप।',
        nav_card_stops_title: 'कॉरिडोर के स्टेशन',
        nav_card_stops_desc: 'ऐतिहासिक स्टेशन, दर्रे और कारू रेगिस्तान।',
        nav_card_stories_title: 'कहानियां और संग्रह',
        nav_card_stories_desc: 'ऐतिहासिक दस्तावेज, गुप्त फाइलें और ऑडियो।',
        nav_card_trains_title: 'प्रमुख ट्रेनें',
        nav_card_trains_desc: 'द ब्लू ट्रेन और रोवोस रेल विनिर्देश।',
        nav_card_games_title: 'कॉरिडोर खेल',
        nav_card_games_desc: 'क्विज, रेल बिंगो और पहेलियां।',
        nav_card_voice_title: 'वॉइस डायरी',
        nav_card_voice_desc: 'रियल-टाइम स्पीच-टू-टेक्स्ट और यात्री डायरी।',
        nav_hub_tap_hint: 'नेविगेट करने के लिए किसी भी कार्ड पर टैप करें',
        stories_badge: 'रेल विरासत और कहानियां',
        stories_active_pass_label: 'सक्रिय पास:',
        stories_change_pass_btn: 'पास बदलें',
        stories_all_passes_label: 'सभी पास में शामिल',
        stories_read_story_btn: 'पूरी कहानी पढ़ें',
        stories_min_read: 'मिनट पढ़ने का समय',
        by_author: 'लेखक:',
        modal_audio_unlocked: 'ऑडियो साथी अनलॉक किया गया',
        modal_audio_listen_desc: 'पूरी कहानी का विवरण सुनें',
        modal_audio_play: 'ऑडियो चलाएं',
        modal_audio_stop: 'ऑडियो रोकें',
        modal_audio_locked: 'इस कहानी के लिए ऑडियो विवरण लॉक है।',
        modal_audio_unlock_btn: 'ऑडियो पास अनलॉक करें (R49)',
        footer_tagline: 'वास्तविक मार्ग। असाधारण कहानियां।',
        footer_desc: 'प्रिटोरिया से केप टाउन रेल कॉरिडोर के लिए एक डिजिटल साथी जो दक्षिण अफ्रीका की विरासत का जश्न मनाता है।',
        footer_nav_heading: 'नेविगेशन',
        footer_link_route: 'मार्ग विवरण',
        footer_link_trains: 'प्रमुख ट्रेनें',
        footer_link_sights: 'दर्शनीय स्थल',
        footer_link_puzzles: 'पहेलियां और खेल',
        footer_link_voice: 'वॉइस डायरी',
        footer_link_heritage: 'विरासत और हमारे बारे में',
        footer_corridor_heading: 'कॉरिडोर यात्रा',
        footer_corridor_desc: 'प्रिटोरिया से टेबल माउंटेन तक दक्षिण अफ्रीका में 1,600 किमी की यात्रा।',
        footer_corridor_badge: 'प्रिटोरिया से केप टाउन',
        footer_copyright: '© 2026 TrackTales. सर्वाधिकार सुरक्षित।',
        footer_corridor_tag: 'प्रिटोरिया से केप टाउन कॉरिडोर',
        rail_runners_tag: 'TRACKTALES · द रेल रनर्स',
        trains_selected_badge: 'चयनित ट्रेन:',
        trains_scenery_badge: 'प्राकृतिक दृश्य और दृश्य बिंदु',
        trains_scenery_title: 'कॉरिडोर के सुंदर दृश्य और मुख्य आकर्षण',
        trains_culinary_badge: 'व्यंजन और सामाजिक जीवन',
        trains_dining_title: 'ऑनबोर्ड फाइन डाइनिंग और लाउंज',
        trains_specs_badge: 'तकनीकी विवरण और इतिहास',
        trains_highlights_title: 'प्रमुख अनुभव',
        label_speed: 'गति',
        label_duration: 'अवधि',
        label_corridor: 'दूरी',
        label_departure_hub: 'प्रस्थान स्टेशन',
        label_terminus_station: 'अंतिम स्टेशन',
        label_vantage_tip: 'दृश्य बिंदु टिप'
      },
      ru: {
        hero_tag: 'ЖЕЛЕЗНОДОРОЖНЫЙ КОРИДОР ПРЕТОРИЯ — КЕЙПТАУН · ГОЛУБОЙ ПОЕЗД',
        hero_h1: 'Смотрите Как Путешествие',
        hero_h1_sub: 'Раскрывается.',
        hero_desc: 'Билет на роскошный поезд по этому маршруту может стоить десятки тысяч рандов. TrackTales отслеживает ту самую легендарную 1600-км линию от Хайвельда до Атлантики.',
        stops_tag: 'ЖЕЛЕЗНОДОРОЖНОЕ НАСЛЕДИЕ ЮЖНОЙ АФРИКИ · ПРЕТОРИЯ — КЕЙПТАУН',
        stops_title: 'Остановки Коридора',
        stops_desc: 'Увлекательное живое путешествие по историческим станциям, горным перевалам и пустыне Кару.',
        stories_title: 'Истории <span class="text-[#D99B26] italic font-serif">Путешествия</span>',
        stories_sub: 'Архивные истории, инженерные достижения и фольклор вдоль роскошного коридора.',
        auth_welcome: 'Добро пожаловать',
        auth_welcome_sub: 'Войдите, чтобы получить доступ к вашему проездному билету.',
        auth_create: 'Создать Аккаунт',
        auth_create_sub: 'Зарегистрируйтесь для получения цифрового паспорта TrackTales.',
        auth_signin_btn: 'ВОЙТИ',
        auth_signup_btn: 'СОЗДАТЬ АККАУНТ',
        email_ph: 'Эл. почта *',
        pass_ph: 'Пароль *',
        name_ph: 'Полное имя *',
        confirm_pass_ph: 'Подтвердите пароль *',
        nav_trigger: 'Навигация',
        nav_access: 'Доступ',
        nav_sos: 'SOS',
        nav_signin: 'Войти',
        nav_signout: 'Выйти',
        nav_hub_companion: 'СПУТНИК ПО КОРИДОРУ',
        nav_hub_title: 'Панель Навигации',
        nav_hub_subtitle: '1600 км Претория — Кейптаун',
        nav_card_route_title: 'Маршрут',
        nav_card_route_desc: 'Кинематографический обзор и интерактивная карта.',
        nav_card_stops_title: 'Остановки Коридора',
        nav_card_stops_desc: 'Исторические станции, перевалы и пустыня Кару.',
        nav_card_stories_title: 'Истории и Архивы',
        nav_card_stories_desc: 'Исторические архивы, секретные досье и аудио.',
        nav_card_trains_title: 'Флагманские Поезда',
        nav_card_trains_desc: 'Голубой поезд и Rovos Rail характеристики.',
        nav_card_games_title: 'Игры Коридора',
        nav_card_games_desc: 'Викторины, Бинго и пазлы.',
        nav_card_voice_title: 'Голосовой Дневник',
        nav_card_voice_desc: 'Преобразование речи в текст и дневник пассажира.',
        nav_hub_tap_hint: 'Нажмите на карточку для перехода',
        stories_badge: 'НАСЛЕДИЕ И АРХИВЫ',
        stories_active_pass_label: 'Активный проездной:',
        stories_change_pass_btn: 'Сменить проездной',
        stories_all_passes_label: 'Включено во все проездные',
        stories_read_story_btn: 'Читать Историю Полностью',
        stories_min_read: 'мин чтения',
        by_author: 'Автор:',
        modal_audio_unlocked: 'Аудиогид Разблокирован',
        modal_audio_listen_desc: 'Слушайте полное озвучивание истории',
        modal_audio_play: 'Воспроизвести',
        modal_audio_stop: 'Остановить',
        modal_audio_locked: 'Аудиосопровождение заблокировано для этой истории.',
        modal_audio_unlock_btn: 'Разблокировать Аудиопасс (R49)',
        footer_tagline: 'РЕАЛЬНЫЕ МАРШРУТЫ. НЕВЕРОЯТНЫЕ ИСТОРИИ.',
        footer_desc: 'Цифровой путеводитель по железной дороге Претория — Кейптаун, прославляющий наследие ЮАР.',
        footer_nav_heading: 'Навигация',
        footer_link_route: 'Маршрут',
        footer_link_trains: 'Флагманские Поезда',
        footer_link_sights: 'Достопримечательности',
        footer_link_puzzles: 'Пазлы и Игры',
        footer_link_voice: 'Голосовой Дневник',
        footer_link_heritage: 'Наследие и О нас',
        footer_corridor_heading: 'Путешествие по Коридору',
        footer_corridor_desc: '1600 км через Южную Африку от Претории до Столовой горы.',
        footer_corridor_badge: 'Претория — Кейптаун',
        footer_copyright: '© 2026 TrackTales. Все права защищены.',
        footer_corridor_tag: 'Коридор Претория — Кейптаун',
        rail_runners_tag: 'TRACKTALES · ЖЕЛЕЗНОДОРОЖНЫЕ БЕГУНЫ',
        trains_selected_badge: 'ВЫБРАННЫЙ ПОЕЗД:',
        trains_scenery_badge: 'ВЕЛИКОЛЕПИЕ ПЕЙЗАЖЕЙ И СМОТРОВЫЕ ПЛОЩАДКИ',
        trains_scenery_title: 'Пейзажи Коридора и Главные Виды',
        trains_culinary_badge: 'КУЛИНАРИЯ И ОБЩЕНИЕ',
        trains_dining_title: 'Изысканная Кухня и Салоны на Борту',
        trains_specs_badge: 'ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ И ИСТОРИЯ',
        trains_highlights_title: 'Главные Впечатления',
        label_speed: 'Скорость',
        label_duration: 'Длительность',
        label_corridor: 'Коридор',
        label_departure_hub: 'Станция отбытия',
        label_terminus_station: 'Конечная станция',
        label_vantage_tip: 'Совет по смотровой площадке'
      },
      ar: {
        hero_tag: 'ممر بريتوريا إلى كيب تاون · القطار الأزرق',
        hero_h1: 'شاهد الرحلة',
        hero_h1_sub: 'تتكشف.',
        hero_desc: 'تذكرة قطار فاخرة لهذا المسار قد تكلف عشرات الآلاف من الراند. يتتبع TrackTales الخط الشهير بطول 1600 كم من الهايبيفيلد إلى المحيط الأطلسي.',
        stops_tag: 'تراث السكك الحديدية في جنوب إفريقيا · بريتوريا إلى كيب تاون',
        stops_title: 'محطات الممر',
        stops_desc: 'رحلة غامرة حية تتتبع المحطات التاريخية والممرات الجبلية وصحراءكارو.',
        stories_title: 'قصص <span class="text-[#D99B26] italic font-serif">الرحلة</span>',
        stories_sub: 'الأرشيف التاريخي والإنجازات الهندسية والفلكلور عبر ممر جنوب إفريقيا الفاخر.',
        auth_welcome: 'مرحباً بك',
        auth_welcome_sub: 'سجل الدخول للوصول إلى تصريح السكك الحديدية الخاص بك.',
        auth_create: 'إنشاء حساب',
        auth_create_sub: 'سجل للحصول على جواز سفر TrackTales الرقمي.',
        auth_signin_btn: 'تسجيل الدخول',
        auth_signup_btn: 'إنشاء حساب',
        email_ph: 'البريد الإلكتروني *',
        pass_ph: 'كلمة المرور *',
        name_ph: 'الاسم الكامل *',
        confirm_pass_ph: 'تأكيد كلمة المرور *',
        nav_trigger: 'تنقل',
        nav_access: 'إمكانية الوصول',
        nav_sos: 'طوارئ SOS',
        nav_signin: 'تسجيل الدخول',
        nav_signout: 'تسجيل الخروج',
        nav_hub_companion: 'دليل ممر السكك الحديدية',
        nav_hub_title: 'لوحة التنقل',
        nav_hub_subtitle: '1600 كم من بريتوريا إلى كيب تاون',
        nav_card_route_title: 'المسار',
        nav_card_route_desc: 'نظرة عامة سينمائية وخريطة تفاعلية مباشرة.',
        nav_card_stops_title: 'محطات الممر',
        nav_card_stops_desc: 'محطات تاريخية، ممرات جبلية وصحراءكارو.',
        nav_card_stories_title: 'القصص والأرشيف',
        nav_card_stories_desc: 'أرشيف تاريخي وملفات سرية وتسجيلات صوتية.',
        nav_card_trains_title: 'القطارات الرائدة',
        nav_card_trains_desc: 'مواصفات القطار الأزرق وقطار روفوس رايل.',
        nav_card_games_title: 'ألعاب الممر',
        nav_card_games_desc: 'مسابقات وبينجو ألغاز السكك الحديدية.',
        nav_card_voice_title: 'المذكرة الصوتية',
        nav_card_voice_desc: 'تحويل الكلام إلى نص ومذكرات الركاب.',
        nav_hub_tap_hint: 'اضغط على أي بطاقة للتنقل',
        stories_badge: 'التراث الأرشيفي والقصص',
        stories_active_pass_label: 'التصريح النشط:',
        stories_change_pass_btn: 'تغيير التصريح',
        stories_all_passes_label: 'مشمول في جميع التصاريح',
        stories_read_story_btn: 'قراءة القصة كاملة',
        stories_min_read: 'دقائق للقراءة',
        by_author: 'بقلم:',
        modal_audio_unlocked: 'تم فتح الدليل الصوتي',
        modal_audio_listen_desc: 'استمع إلى السرد الصوتي الكامل للقصة',
        modal_audio_play: 'تشغيل الصوت',
        modal_audio_stop: 'إيقاف الصوت',
        modal_audio_locked: 'السرد الصوتي مغلق لهذه القصة.',
        modal_audio_unlock_btn: 'فتح تصريح الصوت (R49)',
        footer_tagline: 'مسارات حقيقية. قصص استثنائية.',
        footer_desc: 'دليل رقمي لممر السكك الحديدية من بريتوريا إلى كيب تاون يفيض بتراث وثقافة جنوب إفريقيا.',
        footer_nav_heading: 'التنقل',
        footer_link_route: 'المسار',
        footer_link_trains: 'القطارات الرائدة',
        footer_link_sights: 'المعالم والمشاهد',
        footer_link_puzzles: 'الألغاز والألعاب',
        footer_link_voice: 'المذكرة الصوتية',
        footer_link_heritage: 'التراث ومن نحن',
        footer_corridor_heading: 'رحلة الممر',
        footer_corridor_desc: '1600 كم عبر قلب جنوب إفريقيا من بريتوريا إلى جبل الطاولة.',
        footer_corridor_badge: 'بريتوريا إلى كيب تاون',
        footer_copyright: '© 2026 TrackTales. جميع الحقوق محفوظة.',
        footer_corridor_tag: 'ممر بريتوريا إلى كيب تاون',
        rail_runners_tag: 'TRACKTALES · عداءو السكك الحديدية',
        trains_selected_badge: 'القطار المحدد:',
        trains_scenery_badge: 'روعة المناظر الطبيعية ونقاط الإطلالة',
        trains_scenery_title: 'مناظر الممر وأبرز المعالم',
        trains_culinary_badge: 'المأكولات الفاخرة والتواصل',
        trains_dining_title: 'مطاعم فاخرة صالونات على متن القطار',
        trains_specs_badge: 'المواصفات الفنية والتاريخ',
        trains_highlights_title: 'أبرز تجارب الرحلة',
        label_speed: 'السرعة',
        label_duration: 'المدة',
        label_corridor: 'المسافة',
        label_departure_hub: 'محطة المغادرة',
        label_terminus_station: 'محطة الوصول',
        label_vantage_tip: 'نصيحة نقطة الإطلالة'
      }
    };

    const SPEECH_LANGUAGES = {
      en: 'en-ZA', zu: 'zu-ZA', xh: 'xh-ZA', af: 'af-ZA', st: 'st-ZA',
      tn: 'tn-ZA', nso: 'nso-ZA', ts: 'ts-ZA', ss: 'ss-ZA', ve: 've-ZA', nr: 'nr-ZA',
      de: 'de-DE', fr: 'fr-FR', nl: 'nl-NL', es: 'es-ES', it: 'it-IT', pt: 'pt-PT',
      zh: 'zh-CN', ja: 'ja-JP', ko: 'ko-KR', hi: 'hi-IN', ru: 'ru-RU', ar: 'ar-SA'
    };

    window.TrackTalesGetSpeechLanguage = () => SPEECH_LANGUAGES[window.TrackTalesLanguageCode || 'en'] || 'en-ZA';

    function applyLanguage(code) {
      window.TrackTalesLanguageCode = code;
      document.documentElement.lang = code;
      localStorage.setItem('tracktales_lang', code);

      const dict = TRANSLATIONS[code] || TRANSLATIONS.en;
      
      const heroTag = document.getElementById('hero-category-tag');
      const heroDesc = document.getElementById('hero-train-description');
      const stopsTag = document.getElementById('stops-header-corridor-tag');
      const stopsTitle = document.getElementById('stops-heading-title');
      const stopsDesc = document.getElementById('stops-header-subtitle');

      if (heroTag) heroTag.textContent = dict.hero_tag;
      if (heroDesc) heroDesc.textContent = dict.hero_desc;
      if (stopsTag) stopsTag.textContent = dict.stops_tag;
      if (stopsTitle) stopsTitle.innerHTML = dict.stops_title.split(' ')[0] + ' <span class="text-[#D99B26] italic font-serif">' + (dict.stops_title.split(' ').slice(1).join(' ') || '') + '</span>';
      if (stopsDesc) stopsDesc.textContent = dict.stops_desc;

      // 1. Top Navbar elements
      const navTrigger = document.querySelector('#btn-open-nav-panel span.sm\\:inline');
      const navAccess = document.querySelector('#btn-open-accessibility span.font-bold');
      const navSos = document.querySelector('#btn-open-sos span.hidden');
      const desktopLoginLabel = document.getElementById('desktop-login-label');

      if (navTrigger && dict.nav_trigger) navTrigger.textContent = dict.nav_trigger;
      if (navAccess && dict.nav_access) navAccess.textContent = dict.nav_access;
      if (navSos && dict.nav_sos) navSos.textContent = dict.nav_sos;
      
      const loggedUser = localStorage.getItem('tracktales_logged_user');
      if (desktopLoginLabel) {
        desktopLoginLabel.textContent = loggedUser ? (dict.nav_signout || 'Sign Out') : (dict.nav_signin || 'Sign In');
      }

      // 2. Navigation Hub Panel Modal elements
      const navHubCompanion = document.querySelector('#navigationHubPanel span.text-\\[10px\\]');
      const navHubTitle = document.querySelector('#navigationHubPanel h3');
      const navHubSubtitle = document.querySelector('#navigationHubPanel .flex.items-center.gap-2 span.text-xs');
      const navHubTapHint = document.querySelector('#navigationHubPanel .text-\\[11px\\].font-semibold');

      if (navHubCompanion && dict.nav_hub_companion) navHubCompanion.textContent = dict.nav_hub_companion;
      if (navHubTitle && dict.nav_hub_title) navHubTitle.textContent = dict.nav_hub_title;
      if (navHubSubtitle && dict.nav_hub_subtitle) navHubSubtitle.textContent = dict.nav_hub_subtitle;
      if (navHubTapHint && dict.nav_hub_tap_hint) navHubTapHint.textContent = dict.nav_hub_tap_hint;

      // Nav Hub Cards Text
      const navCardRoute = document.querySelector('.nav-hub-card[data-page="home"]');
      const navCardStops = document.querySelector('.nav-hub-card[data-page="stops"]');
      const navCardStories = document.querySelector('.nav-hub-card[data-page="about"]');
      const navCardTrains = document.querySelector('.nav-hub-card[data-page="trains"]');
      const navCardGames = document.querySelector('.nav-hub-card[data-page="games"]');
      const navCardVoice = document.querySelector('.nav-hub-card[data-page="voice"]');

      if (navCardRoute) {
        const h4 = navCardRoute.querySelector('h4');
        const p = navCardRoute.querySelector('p');
        if (h4 && dict.nav_card_route_title) h4.textContent = dict.nav_card_route_title;
        if (p && dict.nav_card_route_desc) p.textContent = dict.nav_card_route_desc;
      }
      if (navCardStops) {
        const h4 = navCardStops.querySelector('h4');
        const p = navCardStops.querySelector('p');
        if (h4 && dict.nav_card_stops_title) h4.textContent = dict.nav_card_stops_title;
        if (p && dict.nav_card_stops_desc) p.textContent = dict.nav_card_stops_desc;
      }
      if (navCardStories) {
        const h4 = navCardStories.querySelector('h4');
        const p = navCardStories.querySelector('p');
        if (h4 && dict.nav_card_stories_title) h4.textContent = dict.nav_card_stories_title;
        if (p && dict.nav_card_stories_desc) p.textContent = dict.nav_card_stories_desc;
      }
      if (navCardTrains) {
        const h4 = navCardTrains.querySelector('h4');
        const p = navCardTrains.querySelector('p');
        if (h4 && dict.nav_card_trains_title) h4.textContent = dict.nav_card_trains_title;
        if (p && dict.nav_card_trains_desc) p.textContent = dict.nav_card_trains_desc;
      }
      if (navCardGames) {
        const h4 = navCardGames.querySelector('h4');
        const p = navCardGames.querySelector('p');
        if (h4 && dict.nav_card_games_title) h4.textContent = dict.nav_card_games_title;
        if (p && dict.nav_card_games_desc) p.textContent = dict.nav_card_games_desc;
      }
      if (navCardVoice) {
        const h4 = navCardVoice.querySelector('h4');
        const p = navCardVoice.querySelector('p');
        if (h4 && dict.nav_card_voice_title) h4.textContent = dict.nav_card_voice_title;
        if (p && dict.nav_card_voice_desc) p.textContent = dict.nav_card_voice_desc;
      }

      // Stories Section Badges & Buttons
      const storiesBadge = document.getElementById('stories-section-badge');
      const storiesActivePassLabel = document.querySelector('#stories-sub-status-bar .text-\\[\\#78716C\\]');
      const storiesChangePassBtn = document.querySelector('#btn-upgrade-from-stories span');
      const storiesAllPassesLabel = document.querySelector('#page-about .flex.items-center.justify-between span.text-xs.font-mono.text-\\[\\#78716C\\]');

      if (storiesBadge && dict.stories_badge) storiesBadge.textContent = dict.stories_badge;
      if (storiesActivePassLabel && dict.stories_active_pass_label) storiesActivePassLabel.textContent = dict.stories_active_pass_label;
      if (storiesChangePassBtn && dict.stories_change_pass_btn) storiesChangePassBtn.textContent = dict.stories_change_pass_btn;
      if (storiesAllPassesLabel && dict.stories_all_passes_label) storiesAllPassesLabel.textContent = dict.stories_all_passes_label;

      // Stories Section Elements
      const storiesTitle = document.getElementById('stories-section-title');
      const storiesSub = document.getElementById('stories-section-subtitle');
      if (storiesTitle && dict.stories_title) storiesTitle.innerHTML = dict.stories_title;
      if (storiesSub && dict.stories_sub) storiesSub.textContent = dict.stories_sub;

      // Auth Splash Elements
      const signinHeading = document.querySelector('#splash-signin-content h2');
      const signinSub = document.querySelector('#splash-signin-content p');
      const signupHeading = document.querySelector('#splash-signup-content h2');
      const signupSub = document.querySelector('#splash-signup-content p');
      const signinBtnLabel = document.getElementById('splash-signin-btn-label');
      const signupBtnLabel = document.getElementById('splash-signup-btn-label');
      const signinEmail = document.getElementById('splash-signin-email');
      const signinPass = document.getElementById('splash-signin-password');
      const signupName = document.getElementById('splash-signup-name');
      const signupEmail = document.getElementById('splash-signup-email');
      const signupPass = document.getElementById('splash-signup-password');
      const signupConfirmPass = document.getElementById('splash-signup-confirm-password');

      if (signinHeading && dict.auth_welcome) signinHeading.textContent = dict.auth_welcome;
      if (signinSub && dict.auth_welcome_sub) signinSub.textContent = dict.auth_welcome_sub;
      if (signupHeading && dict.auth_create) signupHeading.textContent = dict.auth_create;
      if (signupSub && dict.auth_create_sub) signupSub.textContent = dict.auth_create_sub;
      if (signinBtnLabel && dict.auth_signin_btn) signinBtnLabel.textContent = dict.auth_signin_btn;
      if (signupBtnLabel && dict.auth_signup_btn) signupBtnLabel.textContent = dict.auth_signup_btn;

      if (signinEmail && dict.email_ph) signinEmail.placeholder = dict.email_ph;
      if (signinPass && dict.pass_ph) signinPass.placeholder = dict.pass_ph;
      if (signupName && dict.name_ph) signupName.placeholder = dict.name_ph;
      if (signupEmail && dict.email_ph) signupEmail.placeholder = dict.email_ph;
      if (signupPass && dict.pass_ph) signupPass.placeholder = dict.pass_ph;
      if (signupConfirmPass && dict.confirm_pass_ph) signupConfirmPass.placeholder = dict.confirm_pass_ph;

      // Hero Title Headline & Ticker Tag
      const heroTitleMain = document.getElementById('hero-title-main');
      const heroTitleSub = document.getElementById('hero-title-sub');
      const heroRailRunnersTag = document.getElementById('hero-rail-runners-tag');
      if (heroTitleMain && dict.hero_h1) heroTitleMain.textContent = dict.hero_h1;
      if (heroTitleSub && dict.hero_h1_sub) heroTitleSub.textContent = dict.hero_h1_sub;
      if (heroRailRunnersTag && dict.rail_runners_tag) heroRailRunnersTag.textContent = dict.rail_runners_tag;

      // Footer Elements Translation
      const footerTagline = document.getElementById('footer-tagline');
      const footerDesc = document.getElementById('footer-desc');
      const footerNavTitle = document.getElementById('footer-nav-title');
      const footerLinkRoute = document.getElementById('footer-link-route');
      const footerLinkTrains = document.getElementById('footer-link-trains');
      const footerLinkSights = document.getElementById('footer-link-sights');
      const footerLinkPuzzles = document.getElementById('footer-link-puzzles');
      const footerLinkVoice = document.getElementById('footer-link-voice');
      const footerLinkHeritage = document.getElementById('footer-link-heritage');
      const footerCorridorTitle = document.getElementById('footer-corridor-title');
      const footerCorridorDesc = document.getElementById('footer-corridor-desc');
      const footerCorridorBadge = document.getElementById('footer-corridor-badge');
      const footerCopyright = document.getElementById('footer-copyright');
      const footerCorridorTag = document.getElementById('footer-corridor-tag');

      if (footerTagline && dict.footer_tagline) footerTagline.textContent = dict.footer_tagline;
      if (footerDesc && dict.footer_desc) footerDesc.textContent = dict.footer_desc;
      if (footerNavTitle && dict.footer_nav_heading) footerNavTitle.textContent = dict.footer_nav_heading;
      if (footerLinkRoute && dict.footer_link_route) footerLinkRoute.textContent = dict.footer_link_route;
      if (footerLinkTrains && dict.footer_link_trains) footerLinkTrains.textContent = dict.footer_link_trains;
      if (footerLinkSights && dict.footer_link_sights) footerLinkSights.textContent = dict.footer_link_sights;
      if (footerLinkPuzzles && dict.footer_link_puzzles) footerLinkPuzzles.textContent = dict.footer_link_puzzles;
      if (footerLinkVoice && dict.footer_link_voice) footerLinkVoice.textContent = dict.footer_link_voice;
      if (footerLinkHeritage && dict.footer_link_heritage) footerLinkHeritage.textContent = dict.footer_link_heritage;
      if (footerCorridorTitle && dict.footer_corridor_heading) footerCorridorTitle.textContent = dict.footer_corridor_heading;
      if (footerCorridorDesc && dict.footer_corridor_desc) footerCorridorDesc.textContent = dict.footer_corridor_desc;
      if (footerCorridorBadge && dict.footer_corridor_badge) footerCorridorBadge.textContent = dict.footer_corridor_badge;
      if (footerCopyright && dict.footer_copyright) footerCopyright.innerHTML = dict.footer_copyright;
      if (footerCorridorTag && dict.footer_corridor_tag) footerCorridorTag.textContent = dict.footer_corridor_tag;

      // Page Stops Filters
      const stopsFilterAll = document.getElementById('stops-filter-all');
      const stopsFilterScheduled = document.getElementById('stops-filter-scheduled');
      const stopsFilterPassthrough = document.getElementById('stops-filter-passthrough');
      if (stopsFilterAll && dict.stops_filter_all) stopsFilterAll.textContent = dict.stops_filter_all;
      if (stopsFilterScheduled && dict.stops_filter_scheduled) stopsFilterScheduled.textContent = dict.stops_filter_scheduled;
      if (stopsFilterPassthrough && dict.stops_filter_passthrough) stopsFilterPassthrough.textContent = dict.stops_filter_passthrough;

      // Page Games Elements & Score Ribbon
      const gamesBadge = document.getElementById('games-badge');
      const gamesTitle = document.getElementById('games-title');
      const gamesSub = document.getElementById('games-subtitle');
      const gameTabQuiz = document.getElementById('game-tab-quiz-label');
      const gameTabBingo = document.getElementById('game-tab-bingo-label');
      const gameTabPuzzle = document.getElementById('game-tab-puzzle-label');

      if (gamesBadge && dict.games_badge) gamesBadge.textContent = dict.games_badge;
      if (gamesTitle && dict.games_title) gamesTitle.innerHTML = dict.games_title;
      if (gamesSub && dict.games_subtitle) gamesSub.textContent = dict.games_subtitle;
      if (gameTabQuiz && dict.game_tab_quiz) gameTabQuiz.textContent = dict.game_tab_quiz;
      if (gameTabBingo && dict.game_tab_bingo) gameTabBingo.textContent = dict.game_tab_bingo;
      if (gameTabPuzzle && dict.game_tab_puzzle) gameTabPuzzle.textContent = dict.game_tab_puzzle;

      const scoreLabelScore = document.getElementById('score-label-score');
      const scoreUnitPts = document.getElementById('score-unit-pts');
      const scoreLabelWon = document.getElementById('score-label-won');
      const scoreUnitCompleted = document.getElementById('score-unit-completed');
      const scoreLabelStreak = document.getElementById('score-label-streak');
      const scoreUnitStreak = document.getElementById('score-unit-streak');
      const btnResetGamesLabel = document.getElementById('btn-reset-games-label');

      if (scoreLabelScore) scoreLabelScore.textContent = dict.score_label_score || 'CORRIDOR SCORE';
      if (scoreUnitPts) scoreUnitPts.textContent = dict.score_unit_pts || 'pts';
      if (scoreLabelWon) scoreLabelWon.textContent = dict.score_label_won || 'CHALLENGES WON';
      if (scoreUnitCompleted) scoreUnitCompleted.textContent = dict.score_unit_completed || 'completed';
      if (scoreLabelStreak) scoreLabelStreak.textContent = dict.score_label_streak || 'CORRIDOR STREAK';
      if (scoreUnitStreak) scoreUnitStreak.textContent = dict.score_unit_in_a_row || 'in a row';
      if (btnResetGamesLabel) btnResetGamesLabel.textContent = dict.btn_reset_games || 'Reset All Games';

      const quizHint = document.getElementById('quiz-question-hint');
      if (quizHint) quizHint.textContent = dict.quiz_subtext || 'Select the correct railway stop answer below to advance along the corridor.';

      const btnQuizPrevLabel = document.getElementById('btn-quiz-prev-label');
      const btnQuizNextLabel = document.getElementById('btn-quiz-next-label');
      if (btnQuizPrevLabel) btnQuizPrevLabel.textContent = dict.quiz_prev_stop || 'Previous Stop';
      if (btnQuizNextLabel) btnQuizNextLabel.textContent = dict.quiz_next_stop || 'Next Stop Quiz';

      if (window.TrackTalesRenderQuiz) {
        window.TrackTalesRenderQuiz();
      }

      // Bingo Mode Elements
      const bingoBadge = document.getElementById('bingo-badge');
      const bingoTitle = document.getElementById('bingo-title');
      const bingoSubtitle = document.getElementById('bingo-subtitle');
      const btnResetBingoLabel = document.getElementById('btn-reset-bingo-label');
      const btnNewBingoLabel = document.getElementById('btn-new-bingo-label');
      const bingoWinTitle = document.getElementById('bingo-win-title');
      const bingoWinDesc = document.getElementById('bingo-win-desc');
      const bingoStampedPrefix = document.getElementById('bingo-stamped-prefix');
      const bingoStampedSuffix = document.getElementById('bingo-stamped-suffix');
      const bingoStatusLabel = document.getElementById('bingo-status-label');

      if (bingoBadge && dict.bingo_badge) bingoBadge.textContent = dict.bingo_badge;
      if (bingoTitle && dict.bingo_title) bingoTitle.textContent = dict.bingo_title;
      if (bingoSubtitle && dict.bingo_subtitle) bingoSubtitle.textContent = dict.bingo_subtitle;
      if (btnResetBingoLabel && dict.btn_reset_bingo) btnResetBingoLabel.textContent = dict.btn_reset_bingo;
      if (btnNewBingoLabel && dict.btn_new_bingo) btnNewBingoLabel.textContent = dict.btn_new_bingo;
      if (bingoWinTitle && dict.bingo_win_title) bingoWinTitle.textContent = dict.bingo_win_title;
      if (bingoWinDesc && dict.bingo_win_desc) bingoWinDesc.textContent = dict.bingo_win_desc;
      if (bingoStampedPrefix && dict.bingo_stamped_prefix) bingoStampedPrefix.textContent = dict.bingo_stamped_prefix;
      if (bingoStampedSuffix && dict.bingo_stamped_suffix) bingoStampedSuffix.textContent = dict.bingo_stamped_suffix;
      if (bingoStatusLabel && dict.bingo_status_label) bingoStatusLabel.textContent = dict.bingo_status_label;

      // Route Assembler / Puzzle Mode
      const puzzleBadge = document.getElementById('puzzle-badge');
      const puzzleTitle = document.getElementById('puzzle-title');
      const puzzleSubtitle = document.getElementById('puzzle-subtitle');
      const puzzleTrackTitle = document.getElementById('puzzle-track-title');
      const puzzleAvailableTitle = document.getElementById('puzzle-available-title');
      const btnResetPuzzleLabel = document.getElementById('btn-reset-puzzle-label');
      const btnVerifyPuzzleLabel = document.getElementById('btn-verify-puzzle-label');

      if (puzzleBadge && dict.puzzle_badge) puzzleBadge.textContent = dict.puzzle_badge;
      if (puzzleTitle && dict.puzzle_title) puzzleTitle.textContent = dict.puzzle_title;
      if (puzzleSubtitle && dict.puzzle_subtitle) puzzleSubtitle.textContent = dict.puzzle_subtitle;
      if (puzzleTrackTitle && dict.puzzle_track_title) puzzleTrackTitle.textContent = dict.puzzle_track_title;
      if (puzzleAvailableTitle && dict.puzzle_available_title) puzzleAvailableTitle.textContent = dict.puzzle_available_title;
      if (btnResetPuzzleLabel && dict.puzzle_btn_clear) btnResetPuzzleLabel.textContent = dict.puzzle_btn_clear;
      if (btnVerifyPuzzleLabel && dict.puzzle_btn_verify) btnVerifyPuzzleLabel.textContent = dict.puzzle_btn_verify;

      if (window.TrackTalesRenderQuiz) window.TrackTalesRenderQuiz();
      if (window.TrackTalesRenderBingo) window.TrackTalesRenderBingo();
      if (window.TrackTalesRenderPuzzle) window.TrackTalesRenderPuzzle();

      // Page Voice Elements
      const voiceBadge = document.getElementById('voice-badge');
      const voiceTitle = document.getElementById('voice-title');
      const voiceSub = document.getElementById('voice-subtitle');
      const voiceLandmarkLabel = document.getElementById('voice-landmark-label');
      const voiceCategoryLabel = document.getElementById('voice-category-label');
      const voiceRecordStatusLabel = document.getElementById('voiceRecordStatus');
      const voiceRecordHint = document.getElementById('voiceRecordHint');
      const voiceEngineTag = document.getElementById('voiceEngineTag');
      const voiceTranscriptLabel = document.getElementById('voiceTranscriptLabel');
      const voiceTranscriptInput = document.getElementById('voiceTranscriptInput');
      const btnVoiceClearLabel = document.getElementById('btnVoiceClearLabel');
      const btnVoiceCopyLabel = document.getElementById('btnVoiceCopyLabel');
      const btnVoiceReadAloudLabel = document.getElementById('btnVoiceReadAloudLabel');
      const btnVoiceSimulateLabel = document.getElementById('btnVoiceSimulateLabel');
      const btnSaveVoiceEntryLabel = document.getElementById('btnSaveVoiceEntryLabel');
      const savedVoiceNotesTitle = document.getElementById('savedVoiceNotesTitle');
      const savedVoiceNotesSub = document.getElementById('savedVoiceNotesSub');
      const voiceSearchInput = document.getElementById('voiceSearchInput');
      const voiceFilterAllLabel = document.getElementById('voice-filter-all-label');
      const voiceFilterBlueLabel = document.getElementById('voice-filter-blue-label');
      const voiceFilterRovosLabel = document.getElementById('voice-filter-rovos-label');
      const voiceExportCopyHint = document.getElementById('voiceExportCopyHint');
      const btnExportJournalLabel = document.getElementById('btnExportJournalLabel');

      if (voiceBadge && dict.voice_badge) voiceBadge.textContent = dict.voice_badge;
      if (voiceTitle && dict.voice_title) voiceTitle.innerHTML = dict.voice_title;
      if (voiceSub && dict.voice_subtitle) voiceSub.textContent = dict.voice_subtitle;
      if (voiceLandmarkLabel && dict.voice_landmark_label) voiceLandmarkLabel.textContent = dict.voice_landmark_label;
      if (voiceCategoryLabel && dict.voice_category_label) voiceCategoryLabel.textContent = dict.voice_category_label;
      if (voiceRecordHint && dict.voice_record_hint) voiceRecordHint.textContent = dict.voice_record_hint;
      if (voiceEngineTag && dict.voice_engine_tag) voiceEngineTag.textContent = dict.voice_engine_tag;
      if (voiceTranscriptLabel && dict.voice_transcript_label) voiceTranscriptLabel.innerHTML = `<i data-lucide="file-text" class="w-3.5 h-3.5 text-[#D99B26]"></i> ${dict.voice_transcript_label}`;
      if (voiceTranscriptInput && dict.voice_transcript_ph) voiceTranscriptInput.placeholder = dict.voice_transcript_ph;
      if (btnVoiceClearLabel && dict.btn_voice_clear) btnVoiceClearLabel.textContent = dict.btn_voice_clear;
      if (btnVoiceCopyLabel && dict.btn_voice_copy) btnVoiceCopyLabel.textContent = dict.btn_voice_copy;
      if (btnVoiceReadAloudLabel && dict.btn_voice_read_back) btnVoiceReadAloudLabel.textContent = dict.btn_voice_read_back;
      if (btnVoiceSimulateLabel && dict.btn_voice_simulate) btnVoiceSimulateLabel.textContent = dict.btn_voice_simulate;
      if (btnSaveVoiceEntryLabel && dict.btn_voice_save) btnSaveVoiceEntryLabel.textContent = dict.btn_voice_save;
      if (savedVoiceNotesTitle && dict.voice_saved_title) savedVoiceNotesTitle.textContent = dict.voice_saved_title;
      if (savedVoiceNotesSub && dict.voice_saved_sub) savedVoiceNotesSub.textContent = dict.voice_saved_sub;
      if (voiceSearchInput && dict.voice_search_ph) voiceSearchInput.placeholder = dict.voice_search_ph;
      if (voiceFilterAllLabel && dict.voice_filter_all) voiceFilterAllLabel.textContent = dict.voice_filter_all;
      if (voiceFilterBlueLabel && dict.voice_filter_blue) voiceFilterBlueLabel.textContent = dict.voice_filter_blue;
      if (voiceFilterRovosLabel && dict.voice_filter_rovos) voiceFilterRovosLabel.textContent = dict.voice_filter_rovos;
      if (voiceExportCopyHint && dict.voice_export_hint) voiceExportCopyHint.textContent = dict.voice_export_hint;
      if (btnExportJournalLabel && dict.btn_export_journal) btnExportJournalLabel.textContent = dict.btn_export_journal;
      const voicePrivacyNotice = document.getElementById('voice-privacy-notice');
      const voicePrivacyTag = document.getElementById('voice-privacy-tag');
      if (voicePrivacyNotice && dict.voice_privacy_notice) voicePrivacyNotice.textContent = dict.voice_privacy_notice;
      if (voicePrivacyTag && dict.voice_privacy_tag) voicePrivacyTag.textContent = dict.voice_privacy_tag;

      // Heritage Pillars
      const p1Title = document.getElementById('pillar-1-title');
      const p1Desc = document.getElementById('pillar-1-desc');
      const p2Title = document.getElementById('pillar-2-title');
      const p2Desc = document.getElementById('pillar-2-desc');
      const p3Title = document.getElementById('pillar-3-title');
      const p3Desc = document.getElementById('pillar-3-desc');

      if (p1Title) p1Title.textContent = dict.pillar_1_title || 'What is TrackTales?';
      if (p1Desc) p1Desc.textContent = dict.pillar_1_desc || 'TrackTales is a digital companion for the Pretoria to Cape Town corridor...';
      if (p2Title) p2Title.textContent = dict.pillar_2_title || 'South Africa Tourism';
      if (p2Desc) p2Desc.textContent = dict.pillar_2_desc || 'From Jacaranda streets in Pretoria...';
      if (p3Title) p3Title.textContent = dict.pillar_3_title || 'Rail Legacy';
      if (p3Desc) p3Desc.textContent = dict.pillar_3_desc || 'Laid during the 1870s diamond rush...';

      window.TrackTalesLanguageCode = code;
      document.documentElement.lang = code;
      localStorage.setItem('tracktales_lang', code);

      // Re-render stories, trains & subscription features in current language
      const currentTrainId = localStorage.getItem('tracktales_selected_train') || 'blue-train';
      if (typeof renderStories === 'function') {
        renderStories(currentTrainId);
      }
      if (typeof renderTrains === 'function') {
        renderTrains(currentTrainId);
      }
      if (window.TrackTalesRenderSubscriptionFeatures) {
        window.TrackTalesRenderSubscriptionFeatures();
      }

      // Re-render open story modal if visible
      const storyModal = document.getElementById('story-modal');
      if (storyModal && !storyModal.classList.contains('hidden')) {
        const titleEl = document.getElementById('modal-title');
        if (titleEl && titleEl.getAttribute('data-story-id')) {
          const sId = titleEl.getAttribute('data-story-id');
          if (window.openStoryModal) window.openStoryModal(sId);
        }
      }

      // Stop any ongoing speech narration so next audio uses the selected language BCP-47 code
      if (window.TrackTalesStopSpeech) window.TrackTalesStopSpeech();
      if (window.speechSynthesis) window.speechSynthesis.cancel();

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

    const QUIZ_TRANSLATIONS = {
      en: {
        question_label: "Question",
        of_label: "of",
        pts_label: "PTS",
        correct_heading: "Correct!",
        incorrect_heading: "Not quite right!",
        points_awarded: "Points Awarded.",
        questions: [
          {
            stop: "Pretoria Terminus",
            badge: "Stop 1: Pretoria Terminus",
            caption: "Pretoria Jacaranda City & Victorian Rail Works",
            question: "Which historic Pretoria terminus serves as the northern luxury hub for The Blue Train and Rovos Rail?",
            options: ["Capital Park Station", "Park Station Johannesburg", "Centurion Gautrain Hub", "Mamelodi Depot"],
            explanation: "Pretoria Capital Park was built in Victorian style and has welcomed discerning rail travelers traversing across southern Africa since the late 19th century."
          },
          {
            stop: "Kimberley Big Hole",
            badge: "Stop 2: Kimberley Big Hole",
            caption: "Kimberley Diamond Vaults & Historic Crater",
            question: "How many diamond miners hand-dug the massive Kimberley Big Hole between 1871 and 1914?",
            options: ["Approximately 50,000 miners", "Around 2,000 miners", "Over 500,000 miners", "Only 500 miners"],
            explanation: "Between 1871 and 1914, roughly 50,000 miners excavated the Big Hole entirely by pick and shovel, yielding over 2,720 kilograms of diamonds."
          },
          {
            stop: "De Aar Junction",
            badge: "Stop 3: De Aar Junction",
            caption: "De Aar Steam Crossroads of Southern Africa",
            question: "Why did De Aar historically earn fame across southern Africa's rail network?",
            options: ["It is the second most important railway junction connecting inland lines", "It was the site of the first South African gold strike", "It hosted the 1994 presidential inauguration", "It is the highest mountain peak in the Karoo"],
            explanation: "De Aar features over 110 kilometers of railway track lines and 29 rail tracks in its central classification yard, earning its title as the steam crossroads of southern Africa."
          },
          {
            stop: "The Great Karoo",
            badge: "Stop 4: The Great Karoo Desert",
            caption: "Vast Great Karoo Desert Plains & Starry Skies",
            question: "What distinctive acoustic engineering keeps The Blue Train passenger cabins whisper-quiet through the windy Karoo?",
            options: ["Gold-coated acoustic double glazing windows", "Lead plates installed under carpets", "Wooden sound baffles", "Rubber locomotive wheels"],
            explanation: "Gold dust is laminated inside the double-glazed panoramic windows to reflect desert solar heat and isolate external railway sounds for supreme comfort."
          },
          {
            stop: "Matjiesfontein Village",
            badge: "Stop 5: Matjiesfontein Village",
            caption: "Preserved 1890 Victorian Railway Village",
            question: "Which legendary Victorian hotel in Matjiesfontein hosted Lord Randolph Churchill and Cecil John Rhodes?",
            options: ["The Lord Milner Hotel", "The Mount Nelson Hotel", "The Carlton Hotel", "The Cape Marine Lodge"],
            explanation: "The Lord Milner Hotel was completed in 1899 and served as a military hospital and social hub during the Anglo-Boer war."
          },
          {
            stop: "Cape Town Terminus",
            badge: "Stop 6: Cape Town Terminus",
            caption: "Cape Town Terminus in the shadow of Table Mountain",
            question: "What is the total rail distance traversed from Pretoria to Cape Town on this legendary journey?",
            options: ["1,600 Kilometers", "850 Kilometers", "3,200 Kilometers", "500 Kilometers"],
            explanation: "The full luxury rail corridor extends 1,600 kilometers across 4 provinces, taking 31 hours on The Blue Train and 3 days on Rovos Rail."
          }
        ]
      },
      af: {
        question_label: "Vraag",
        of_label: "van",
        pts_label: "PTN",
        correct_heading: "Reg!",
        incorrect_heading: "Nie heeltemal reg nie!",
        points_awarded: "Punte Toegeken.",
        questions: [
          {
            stop: "Pretoria Eindstasie",
            badge: "Halte 1: Pretoria Eindstasie",
            caption: "Pretoria Jakarandastad & Viktoriaanse Spoorwegwerke",
            question: "Watter historiese Pretoria-eindstasie dien as die noordelike luukse spilpunt vir Die Bloutrein en Rovos Rail?",
            options: ["Capital Park Stasie", "Park Stasie Johannesburg", "Centurion Gautrain Spilpunt", "Mamelodi Depot"],
            explanation: "Pretoria Capital Park is in Viktoriaanse styl gebou en verwelkom sedert die laat 19de eeu veeleisende spoorwegreisigers."
          },
          {
            stop: "Kimberley Groot Gat",
            badge: "Halte 2: Kimberley Groot Gat",
            caption: "Kimberley Diamantkluis & Historiese Krater",
            question: "Hoeveel diamantdelwers het die massiewe Kimberley Groot Gat tussen 1871 en 1914 gegrawe?",
            options: ["Sowat 50 000 delwers", "Omtrent 2 000 delwers", "Meer as 500 000 delwers", "Slegs 500 delwers"],
            explanation: "Tussen 1871 en 1914 het ongeveer 50 000 delwers die Groot Gat met pik en graaf uitgegrawe."
          },
          {
            stop: "De Aar Aansluiting",
            badge: "Halte 3: De Aar Aansluiting",
            caption: "De Aar Stoomkruispad van Suider-Afrika",
            question: "Hoekom het De Aar histories roem verwerf oor Suider-Afrika se spoorwegnetwerk?",
            options: ["Dit is die tweede belangrikste spoorwegaansluiting wat binnelandse lyne verbind", "Dit was die terrein van die eerste Suid-Afrikaanse goudvonds", "Dit het die 1994 presidensiële inhuldiging aangebied", "Dit is die hoogste bergpiek in die Karoo"],
            explanation: "De Aar beskik oor meer as 110 kilometer spoorlyne in sy sentrale klassifikasiewerf."
          },
          {
            stop: "Die Groot Karoo",
            badge: "Halte 4: Die Groot Karoo Woestyn",
            caption: "Wye Groot Karoo Woestynvlaktes & Sterrelug",
            question: "Watter kenmerkende akoestiese ingenieurswese hou Die Bloutrein-passasiershutte stil?",
            options: ["Goudbedekte akoestiese dubbelglasvensters", "Loodplate onder matte", "Houtklankdempers", "Rubberspoorwielbande"],
            explanation: "Goudstof is binne die panoramavensters gelamineer om woestynsonhitte te mekaar en geluid te isoleer."
          },
          {
            stop: "Matjiesfontein Dorp",
            badge: "Halte 5: Matjiesfontein Dorp",
            caption: "Gewaardeerde 1890 Viktoriaanse Spoorwegdorp",
            question: "Watter legendariese Viktoriaanse hotel in Matjiesfontein het Lord Randolph Churchill gehuisves?",
            options: ["Die Lord Milner Hotel", "Die Mount Nelson Hotel", "Die Carlton Hotel", "Die Cape Marine Lodge"],
            explanation: "Die Lord Milner Hotel is in 1899 voltooi en het gedurende die Anglo-Boereoorlog as hospitaal gedien."
          },
          {
            stop: "Kaapstad Eindstasie",
            badge: "Halte 6: Kaapstad Eindstasie",
            caption: "Kaapstad Eindstasie in die skadu van Tafelberg",
            question: "Wat is die totale spoorafstand vanaf Pretoria na Kaapstad op hierdie legendariese reis?",
            options: ["1 600 Kilometer", "850 Kilometer", "3 200 Kilometer", "500 Kilometer"],
            explanation: "Die volle luukse spoorwegkorridor strek oor 1 600 kilometer oor 4 provinsies."
          }
        ]
      },
      zu: {
        question_label: "Umbuzo",
        of_label: "kwi",
        pts_label: "PTS",
        correct_heading: "Kuyo!",
        incorrect_heading: "Akulungile impela!",
        points_awarded: "Amaphuzu Anikeziwe.",
        questions: [
          {
            stop: "Pretoria Terminus",
            badge: "Isitobhi 1: Pretoria Terminus",
            caption: "Pretoria Jacaranda City & Victorian Rail Works",
            question: "Yisiphi isiteshi sasePretoria somlando esisebenza njengendawo engenhla ye-The Blue Train ne-Rovos Rail?",
            options: ["Isiteshi se-Capital Park", "Isiteshi se-Park Johannesburg", "Centurion Gautrain Hub", "Mamelodi Depot"],
            explanation: "I-Pretoria Capital Park yakhiwa ngesitayela sase-Victorian yamukela abagibeli bezitimela ngo-1800."
          },
          {
            stop: "Kimberley Big Hole",
            badge: "Isitobhi 2: Kimberley Big Hole",
            caption: "Kimberley Diamond Vaults & Historic Crater",
            question: "Baphi abavukuzi bedayimane abambha umgodi omkhulu we-Kimberley Big Hole phakathi kuka-1871 no-1914?",
            options: ["Cishe abavukuzi abangu-50,000", "Abavukuzi abangu-2,000", "Ngaphezu kwabavukuzi abangu-500,000", "Abavukuzi abangu-500 kuphela"],
            explanation: "Phakathi kuka-1871 no-1914, abavukuzi abayizi-50,000 bambha umgodi besebenzisa amapiki namahosha."
          },
          {
            stop: "De Aar Junction",
            badge: "Isitobhi 3: De Aar Junction",
            caption: "De Aar Steam Crossroads of Southern Africa",
            question: "Kungani i-De Aar yazuza udumo olukhulu kunethiwekhi yezitimela yaseNingizimu ne-Afrika?",
            options: ["Yiyona ndawo yesibili ebalulekile yokuxhumanisa imizila yangaphakathi", "Yayiyindawo yokuqala yokuthola igolide", "Yamukela ukugcotshwa kwasemthethweni kuka-1994", "Yiyona ntaba ephakeme kakhulu eKaroo"],
            explanation: "I-De Aar inemizila yezitimela engaphezu kwamakhilomitha amakhulu ayi-110."
          },
          {
            stop: "The Great Karoo",
            badge: "Isitobhi 4: The Great Karoo Desert",
            caption: "Vast Great Karoo Desert Plains & Starry Skies",
            question: "Yiluphi unjiniyela lomsindo ogcina amagumbi e-The Blue Train ethula du phakathi komoya waseKaroo?",
            options: ["Amafasitela ane-gold-coated amagilasi amabili", "Amatshe omthofu anqwabelene", "Amapulangwe anqanda umsindo", "Amasondo erabha esitimela"],
            explanation: "Uthuli lwagolide luhlanganiswe ngaphakathi kwamafasitela e-panoramic ukuze lubuyisele ukushisa."
          },
          {
            stop: "Matjiesfontein Village",
            badge: "Isitobhi 5: Matjiesfontein Village",
            caption: "Preserved 1890 Victorian Railway Village",
            question: "Yihhotela liphi lase-Victorian eMatjiesfontein elamukela u-Lord Randolph Churchill?",
            options: ["The Lord Milner Hotel", "The Mount Nelson Hotel", "The Carlton Hotel", "The Cape Marine Lodge"],
            explanation: "I-Lord Milner Hotel yaqeda ukwakhiwa ngo-1899 yasebenza njensphesheli yesibhedlela sezempi."
          },
          {
            stop: "Cape Town Terminus",
            badge: "Isitobhi 6: Cape Town Terminus",
            caption: "Cape Town Terminus in the shadow of Table Mountain",
            question: "Yiyiphi ingqikithi yebhange yomzila wesitimela osuka ePretoria uya eKapa?",
            options: ["Amakhilomitha angu-1,600", "Amakhilomitha angu-850", "Amakhilomitha angu-3,200", "Amakhilomitha angu-500"],
            explanation: "Umzila ophelele wesitimela sokunethezeka udlula amakhilomitha ayi-1,600 ezifundazweni ezi-4."
          }
        ]
      },
      xh: {
        question_label: "Umbuzo",
        of_label: "kwi",
        pts_label: "PTS",
        correct_heading: "Ichanile!",
        incorrect_heading: "Ayichananga kakuhle!",
        points_awarded: "Amaphuzu Anikezelweyo.",
        questions: [
          {
            stop: "Pretoria Terminus",
            badge: "Isitophi 1: Pretoria Terminus",
            caption: "Pretoria Jacaranda City & Victorian Rail Works",
            question: "Siphi isiteshi sasePretoria sembali esisebenza njengendawo yaphezulu ye-The Blue Train ne-Rovos Rail?",
            options: ["Isiteshi sase-Capital Park", "Isiteshi sase-Park Johannesburg", "Centurion Gautrain Hub", "Mamelodi Depot"],
            explanation: "I-Pretoria Capital Park yakhiwa ngesitayile se-Victorian yakwamkela abahambi bezitimela."
          },
          {
            stop: "Kimberley Big Hole",
            badge: "Isitophi 2: Kimberley Big Hole",
            caption: "Kimberley Diamond Vaults & Historic Crater",
            question: "Bangaphi abavukuzi be-diamant abemba umgodi omkhulu we-Kimberley Big Hole phakathi kuka-1871 no-1914?",
            options: ["Cishe abavukuzi abangama-50,000", "Abavukuzi abangama-2,000", "Ngaphezulu kwabavukuzi abangama-500,000", "Abavukuzi abangama-500 kuphela"],
            explanation: "Phakathi kuka-1871 no-1914, abavukuzi bemba umgodi omkhulu bebenzisa izipiki neefosholo."
          },
          {
            stop: "De Aar Junction",
            badge: "Isitophi 3: De Aar Junction",
            caption: "De Aar Steam Crossroads of Southern Africa",
            question: "Kutheni le nto i-De Aar yazuzayo udumo lwembali kumzila wezitimela wase-Afrika eseMazantsi?",
            options: ["Yeyona ndawo yesibini ebalulekileyo edibanisa imizila langaphakathi", "Yayiyindawo yokuqala yokufumaneka kwegolide", "Yamkela ukugcotshwa komongameli ngo-1994", "Yeyona ntaba ephakamileyo eKaroo"],
            explanation: "I-De Aar inemizila yezitimela engaphezulu kwekhulu neshumi leekhilomitha."
          },
          {
            stop: "The Great Karoo",
            badge: "Isitophi 4: The Great Karoo Desert",
            caption: "Vast Great Karoo Desert Plains & Starry Skies",
            question: "Luwuphi ubunjineli bomsindo obugcina amagumbi e-The Blue Train ezolile phakathi komoya waseKaroo?",
            options: ["Iiglasi ezinegolide laminated ezimbini", "Iiplani zelad ngaphantsi meekhaphethi", "Amaplanga anqanda umsindo", "Amasondo erabha esitimela"],
            explanation: "Uthuli legolide luhlanganiswe ngaphantsi amafestile anamaphaneli amabini."
          },
          {
            stop: "Matjiesfontein Village",
            badge: "Isitophi 5: Matjiesfontein Village",
            caption: "Preserved 1890 Victorian Railway Village",
            question: "Yiyiphi ihotele ye-Victorian eMatjiesfontein eyo-yakwamkela u-Lord Randolph Churchill?",
            options: ["The Lord Milner Hotel", "The Mount Nelson Hotel", "The Carlton Hotel", "The Cape Marine Lodge"],
            explanation: "I-Lord Milner Hotel yagqitywa ngo-1899 yaza yasebenza njengospatala wezomkhosi."
          },
          {
            stop: "Cape Town Terminus",
            badge: "Isitophi 6: Cape Town Terminus",
            caption: "Cape Town Terminus in the shadow of Table Mountain",
            question: "Yiyiphi ingqikithi yomzila wesitimela ukusuka ePretoria uya eKapa kolu hambo lwembali?",
            options: ["Iikhilomitha ezili-1,600", "Iikhilomitha ezingama-850", "Iikhilomitha ezazi-3,200", "Iikhilomitha ezingama-500"],
            explanation: "Umzila opheleleyo wezitimela zobunewunewu uluphala iikhilomitha ezili-1,600."
          }
        ]
      },
      de: {
        question_label: "Frage",
        of_label: "von",
        pts_label: "PKT",
        correct_heading: "Richtig!",
        incorrect_heading: "Nicht ganz richtig!",
        points_awarded: "Punkte Vergeben.",
        questions: [
          {
            stop: "Pretoria Endstation",
            badge: "Halt 1: Pretoria Endstation",
            caption: "Pretoria Jacarandastadt & Viktorianische Eisenbahnwerke",
            question: "Welche historische Endstation in Pretoria dient als nördlicher Luxusknotenpunkt für den Blue Train und Rovos Rail?",
            options: ["Capital Park Bahnhof", "Park Station Johannesburg", "Centurion Gautrain Knotenpunkt", "Mamelodi Depot"],
            explanation: "Pretoria Capital Park wurde im viktorianischen Stil erbaut und empfängt anspruchsvolle Zugreisende seit dem späten 19. Jahrhundert."
          },
          {
            stop: "Kimberley Big Hole",
            badge: "Halt 2: Kimberley Big Hole",
            caption: "Kimberley Diamanttresore & Historischer Krater",
            question: "Wie viele Diamantenbergleute gruben das riesige Kimberley Big Hole zwischen 1871 und 1914 von Hand?",
            options: ["Ca. 50.000 Bergleute", "Etwa 2.000 Bergleute", "Über 500.000 Bergleute", "Nur 500 Bergleute"],
            explanation: "Zwischen 1871 und 1914 hoben rund 50.000 Bergleute das Big Hole aus."
          },
          {
            stop: "De Aar Knotenpunkt",
            badge: "Halt 3: De Aar Knotenpunkt",
            caption: "De Aar Dampfkreuzung des südlichen Afrikas",
            question: "Warum erlangte De Aar historisch Berühmtheit im Eisenbahnnetz des südlichen Afrikas?",
            options: ["Es ist der zweitwichtigste Eisenbahnknotenpunkt, der Inlandsstrecken verbindet", "Es war der Ort des ersten südafrikanischen Goldfundes", "Es beherbergte die präsidentielle Amtseinführung 1994", "Es ist der höchste Bergteil in der Karoo"],
            explanation: "De Aar verfügt über mehr als 110 Kilometer Gleisstrecken auf seinem zentralen Bahnhofsgelände."
          },
          {
            stop: "Die Große Karoo",
            badge: "Halt 4: Die Große Karoo-Wüste",
            caption: "Weite Ebenen der Großen Karoo & Sternenhimmel",
            question: "Welche besondere Akustiktechnik hält die Kabinen des Blue Train durch die windige Karoo flüsterleise?",
            options: ["Goldbeschichtete akustische Doppelglasfenster", "Bleiplatten unter Teppichen", "Holzschalldämpfer", "Gummierte Zugräder"],
            explanation: "Goldschicht ist in den doppelt verglasten Panoramafenstern laminiert."
          },
          {
            stop: "Dorf Matjiesfontein",
            badge: "Halt 5: Dorf Matjiesfontein",
            caption: "Erhaltenes viktorianisches Eisenbahndorf von 1890",
            question: "Welches legendäre viktorianische Hotel in Matjiesfontein beherbergte Lord Randolph Churchill?",
            options: ["Das Lord Milner Hotel", "Das Mount Nelson Hotel", "Das Carlton Hotel", "Die Cape Marine Lodge"],
            explanation: "Das Lord Milner Hotel wurde 1899 fertiggestellt und diente als Militärkrankenhaus."
          },
          {
            stop: "Kapstadt Endstation",
            badge: "Halt 6: Kapstadt Endstation",
            caption: "Kapstadt Endstation im Schatten des Tafelbergs",
            question: "Wie lang ist die gesamte Bahnstrecke von Pretoria nach Kapstadt auf dieser legendären Reise?",
            options: ["1.600 Kilometer", "850 Kilometer", "3.200 Kilometer", "500 Kilometer"],
            explanation: "Der gesamte Luxusschienenkorridor erstreckt sich über 1.600 Kilometer."
          }
        ]
      },
      fr: {
        question_label: "Question",
        of_label: "sur",
        pts_label: "PTS",
        correct_heading: "Correct !",
        incorrect_heading: "Pas tout à fait !",
        points_awarded: "Points Attribués.",
        questions: [
          {
            stop: "Terminus de Pretoria",
            badge: "Arrêt 1: Terminus de Pretoria",
            caption: "Pretoria Ville des Jacarandas & Ateliers Ferroviaires",
            question: "Quel terminus historique de Pretoria sert de hub de luxe nord pour Le Blue Train et Rovos Rail ?",
            options: ["Gare de Capital Park", "Gare de Park Johannesburg", "Hub Gautrain Centurion", "Dépôt de Mamelodi"],
            explanation: "Pretoria Capital Park a été construit dans un style victorien et accueille les voyageurs exigeants depuis la fin du XIXe siècle."
          },
          {
            stop: "Big Hole de Kimberley",
            badge: "Arrêt 2: Big Hole de Kimberley",
            caption: "Coffres de Diamants & Cratère Historique de Kimberley",
            question: "Combien de mineurs de diamants ont creusé à la main le Big Hole de Kimberley entre 1871 et 1914 ?",
            options: ["Environ 50 000 mineurs", "Environ 2 000 mineurs", "Plus de 500 000 mineurs", "Seulement 500 mineurs"],
            explanation: "Entre 1871 et 1914, environ 50 000 mineurs ont excavé le Big Hole uniquement à la pioche et à la pelle."
          },
          {
            stop: "Jonction de De Aar",
            badge: "Arrêt 3: Jonction de De Aar",
            caption: "Carrefour à Vapeur de De Aar d'Afrique Australe",
            question: "Pourquoi De Aar a-t-il historiquement acquis sa renommée sur le réseau ferroviaire d'Afrique australe ?",
            options: ["C'est la deuxième jonction ferroviaire la plus importante reliant les lignes intérieures", "C'était le site de la première découverte d'or sud-africaine", "Il a accueilli l'investiture présidentielle de 1994", "C'est le plus haut sommet de montagne du Karoo"],
            explanation: "De Aar possède plus de 110 kilomètres de voies ferrées."
          },
          {
            stop: "Le Grand Karoo",
            badge: "Arrêt 4: Désert du Grand Karoo",
            caption: "Plaines du Désert du Karoo & Ciel Étoilé",
            question: "Quelle ingénierie acoustique préserve le silence absolu dans les cabines du Blue Train à travers le Karoo ?",
            options: ["Vitrage acoustique double teinté à l'or", "Plaques de plomb sous les tapis", "Déflecteurs en bois", "Roues de locomotive en caoutchouc"],
            explanation: "De la poussière d'or est laminée à l'intérieur des vitres panoramiques."
          },
          {
            stop: "Village de Matjiesfontein",
            badge: "Arrêt 5: Village de Matjiesfontein",
            caption: "Village Ferroviaire Victorien Preservé de 1890",
            question: "Quel hôtel victorien légendaire à Matjiesfontein a accueilli Lord Randolph Churchill ?",
            options: ["L'Hôtel Lord Milner", "L'Hôtel Mount Nelson", "L'Hôtel Carlton", "Le Cape Marine Lodge"],
            explanation: "L'Hôtel Lord Milner a été achevé en 1899 et a servi d'hôpital militaire."
          },
          {
            stop: "Terminus de Le Cap",
            badge: "Arrêt 6: Terminus de Le Cap",
            caption: "Terminus de Le Cap à l'ombre de la Montagne de la Table",
            question: "Quelle est la distance ferroviaire totale parcourue entre Pretoria et Le Cap lors de ce voyage légendaire ?",
            options: ["1 600 Kilomètres", "850 Kilomètres", "3 200 Kilomètres", "500 Kilomètres"],
            explanation: "Le corridor ferroviaire de luxe s'étend sur 1 600 kilomètres à travers 4 provinces."
          }
        ]
      },
      nl: {
        question_label: "Vraag",
        of_label: "van",
        pts_label: "PTN",
        correct_heading: "Correct!",
        incorrect_heading: "Niet helemaal juist!",
        points_awarded: "Punten Toegekend.",
        questions: [
          {
            stop: "Pretoria Eindstation",
            badge: "Halte 1: Pretoria Eindstation",
            caption: "Pretoria Jacarandastad & Victoriaanse Spoorwegwerken",
            question: "Welk historisch eindstation in Pretoria dient als de noordelijke luxe hub voor The Blue Train en Rovos Rail?",
            options: ["Capital Park Station", "Park Station Johannesburg", "Centurion Gautrain Hub", "Mamelodi Depot"],
            explanation: "Pretoria Capital Park is gebouwd in victoriaanse stijl en verwelkomt sinds het einde van de 19e eeuw treinreizigers."
          },
          {
            stop: "Kimberley Big Hole",
            badge: "Halte 2: Kimberley Big Hole",
            caption: "Kimberley Diamantkluizen & Historische Krater",
            question: "Hoeveel diamantdelvers groeven het massieve Kimberley Big Hole tussen 1871 en 1914 met de hand uit?",
            options: ["Ongeveer 50.000 delvers", "Ongeveer 2.000 delvers", "Meer dan 500.000 delvers", "Slechts 500 delvers"],
            explanation: "Tussen 1871 en 1914 groeven ongeveer 50.000 delvers het Big Hole uit."
          },
          {
            stop: "De Aar Knooppunt",
            badge: "Halte 3: De Aar Knooppunt",
            caption: "De Aar Stoomkruispunt van Zuidelijk Afrika",
            question: "Waarom vergaarde De Aar historisch faam op het spoorwegnet van zuidelijk Afrika?",
            options: ["Het is het op één na belangrijkste spoorwegknooppunt dat binnenlandse lijnen verbindt", "Het was de plek van de eerste goudvondst", "Het ontving de presidentiële inauguratie van 1994", "Het is de hoogste bergtop in de Karoo"],
            explanation: "De Aar beschikt over meer dan 110 kilometer spoorlijn op zijn centrale sorteerterrein."
          },
          {
            stop: "De Grote Karoo",
            badge: "Halte 4: De Grote Karoo Woestijn",
            caption: "Uitgestrekte Karoo Woestijnvlaktes & Sterrenhemel",
            question: "Welke akoestische techniek houdt de cabines van The Blue Train stil door de Karoo?",
            options: ["Met goud gecoate akoestische dubbele beglazing", "Loden platen onder het tapijt", "Houten geluidsdempers", "Rubberen treinwielen"],
            explanation: "Goudstof is gelamineerd in de panoramische ramen met dubbel glas."
          },
          {
            stop: "Matjiesfontein Dorp",
            badge: "Halte 5: Matjiesfontein Dorp",
            caption: "Bewaard Victoriaans Spoorwegdorp uit 1890",
            question: "Welk legendarisch victoriaans hotel in Matjiesfontein ontving Lord Randolph Churchill?",
            options: ["Het Lord Milner Hotel", "Het Mount Nelson Hotel", "Het Carlton Hotel", "De Cape Marine Lodge"],
            explanation: "Het Lord Milner Hotel werd voltooid in 1899 en diende als militair hospitaal."
          },
          {
            stop: "Kaapstad Eindstation",
            badge: "Halte 6: Kaapstad Eindstation",
            caption: "Kaapstad Eindstation in de schaduw van de Tafelberg",
            question: "Wat is de totale spoorafstand van Pretoria naar Kaapstad op deze legendarische reis?",
            options: ["1.600 Kilometer", "850 Kilometer", "3.200 Kilometer", "500 Kilometer"],
            explanation: "De volledige luxe spoorlijn strekt zich uit over 1.600 kilometer door 4 provincies."
          }
        ]
      },
      es: {
        question_label: "Pregunta",
        of_label: "de",
        pts_label: "PTS",
        correct_heading: "¡Correcto!",
        incorrect_heading: "¡No del todo correcto!",
        points_awarded: "Puntos Otorgados.",
        questions: [
          {
            stop: "Terminus de Pretoria",
            badge: "Parada 1: Terminus de Pretoria",
            caption: "Pretoria Ciudad Jacaranda & Talleres Victorianos",
            question: "¿Qué término histórico de Pretoria sirve como el centro de lujo del norte para The Blue Train y Rovos Rail?",
            options: ["Estación Capital Park", "Estación Park Johannesburgo", "Hub Centurion Gautrain", "Depósito Mamelodi"],
            explanation: "Pretoria Capital Park fue construido en estilo victoriano y ha recibido a viajeros desde finales del siglo XIX."
          },
          {
            stop: "Big Hole de Kimberley",
            badge: "Parada 2: Big Hole de Kimberley",
            caption: "Bóvedas de Diamantes de Kimberley & Cráter Histórico",
            question: "¿Cuántos mineros de diamantes excavaron a mano el enorme Big Hole de Kimberley entre 1871 y 1914?",
            options: ["Aproximadamente 50,000 mineros", "Alrededor de 2,000 mineros", "Más de 500,000 mineros", "Solo 500 mineros"],
            explanation: "Entre 1871 y 1914, unos 50,000 mineros excavaron el Big Hole con pico y pala."
          },
          {
            stop: "Empalme De Aar",
            badge: "Parada 3: Empalme De Aar",
            caption: "Encrucijada a Vapor De Aar del Sur de África",
            question: "¿Por qué De Aar obtuvo históricamente fama en la red ferroviaria del sur de África?",
            options: ["Es el segundo empalme ferroviario más importante que conecta líneas interiores", "Fue el lugar del primer hallazgo de oro", "Albergó la inauguración presidencial de 1994", "Es el pico más alto en el Karoo"],
            explanation: "De Aar cuenta con más de 110 kilómetros de vías férreas en su patio de clasificación."
          },
          {
            stop: "El Gran Karoo",
            badge: "Parada 4: Desierto del Gran Karoo",
            caption: "Llanuras del Desierto del Karoo & Cielos Estrellados",
            question: "¿Qué ingeniería acústica mantiene las cabinas de The Blue Train silenciosas a través del Karoo?",
            options: ["Ventanas acústicas de doble cristal con capa de oro", "Placas de plomo bajo las alfombras", "Deflectores de madera", "Ruedas de tren de goma"],
            explanation: "El polvo de oro está laminado dentro de las ventanas panorámicas de doble cristal."
          },
          {
            stop: "Pueblo Matjiesfontein",
            badge: "Parada 5: Pueblo Matjiesfontein",
            caption: "Pueblo Ferroviario Victoriano Conservado de 1890",
            question: "¿Qué legendario hotel victoriano en Matjiesfontein albergó a Lord Randolph Churchill?",
            options: ["El Hotel Lord Milner", "El Hotel Mount Nelson", "El Hotel Carlton", "El Cape Marine Lodge"],
            explanation: "El Hotel Lord Milner se completó en 1899 y sirvió como hospital militar."
          },
          {
            stop: "Terminus de Ciudad del Cabo",
            badge: "Parada 6: Terminus de Ciudad del Cabo",
            caption: "Terminus de Ciudad del Cabo a la sombra de Table Mountain",
            question: "¿Cuál es la distancia ferroviaria total recorrida de Pretoria a Ciudad del Cabo en este viaje?",
            options: ["1,600 Kilómetros", "850 Kilómetros", "3,200 Kilómetros", "500 Kilómetros"],
            explanation: "El corredor ferroviario de lujo se extiende a lo largo de 1,600 kilómetros."
          }
        ]
      },
      it: {
        question_label: "Domanda",
        of_label: "di",
        pts_label: "PT",
        correct_heading: "Corretto!",
        incorrect_heading: "Non proprio corretto!",
        points_awarded: "Punti Assegnati.",
        questions: [
          {
            stop: "Capolinea di Pretoria",
            badge: "Fermata 1: Capolinea di Pretoria",
            caption: "Pretoria Città delle Jacarande & Officine Vittoriane",
            question: "Quale storico capolinea di Pretoria funge da hub di lusso settentrionale per The Blue Train e Rovos Rail?",
            options: ["Stazione di Capital Park", "Stazione Park Johannesburg", "Hub Centurion Gautrain", "Deposito Mamelodi"],
            explanation: "Pretoria Capital Park è stata costruita in stile vittoriano e accoglie viaggiatori dal tardo XIX secolo."
          },
          {
            stop: "Big Hole di Kimberley",
            badge: "Fermata 2: Big Hole di Kimberley",
            caption: "Cave di Diamanti & Cratere Storico di Kimberley",
            question: "Quanti minatori di diamanti hanno scavato a mano il grande Big Hole tra il 1871 e il 1914?",
            options: ["Circa 50.000 minatori", "Circa 2.000 minatori", "Oltre 500.000 minatori", "Solo 500 minatori"],
            explanation: "Tra il 1871 e il 1914, circa 50.000 minatori hanno scavato il Big Hole."
          },
          {
            stop: "Snodo di De Aar",
            badge: "Fermata 3: Snodo di De Aar",
            caption: "De Aar Crocevia a Vapore dell'Africa Meridionale",
            question: "Perché De Aar ha ottenuto fama storica nella rete ferroviaria dell'Africa meridionale?",
            options: ["È il secondo snodo ferroviario più importante che collega le linee interne", "È stato il luogo della prima scoperta d'oro", "Ha ospitato l'inaugurazione presidenziale del 1994", "È la vetta più alta del Karoo"],
            explanation: "De Aar vanta oltre 110 chilometri di binari ferroviari."
          },
          {
            stop: "Il Grande Karoo",
            badge: "Fermata 4: Deserto del Grande Karoo",
            caption: "Pianure del Deserto del Karoo & Cieli Stellati",
            question: "Quale ingegneria acustica mantiene le cabine del Blue Train silenziose nel Karoo?",
            options: ["Doppi vetri acustici con strato d'oro", "Piastre di piombo sotto i tappeti", "Pannelli fonoassorbenti in legno", "Ruote del treno in gomma"],
            explanation: "La polvere d'oro è laminata all'interno dei doppi vetri panoramici."
          },
          {
            stop: "Villaggio di Matjiesfontein",
            badge: "Fermata 5: Villaggio di Matjiesfontein",
            caption: "Villaggio Ferroviario Vittoriano Conservato del 1890",
            question: "Quale leggendario hotel vittoriano a Matjiesfontein ha ospitato Lord Randolph Churchill?",
            options: ["Il Lord Milner Hotel", "Il Mount Nelson Hotel", "Il Carlton Hotel", "Il Cape Marine Lodge"],
            explanation: "Il Lord Milner Hotel è stato completato nel 1899 e ha servito come ospedale militare."
          },
          {
            stop: "Capolinea di Città del Capo",
            badge: "Fermata 6: Capolinea di Città del Capo",
            caption: "Capolinea di Città del Capo all'ombra della Table Mountain",
            question: "Qual è la distanza ferroviaria totale percorsa da Pretoria a Città del Capo in questo viaggio?",
            options: ["1.600 Chilometri", "850 Chilometri", "3.200 Chilometri", "500 Chilometri"],
            explanation: "Il corridoio ferroviario di lusso si estende per 1.600 chilometri."
          }
        ]
      },
      pt: {
        question_label: "Pergunta",
        of_label: "de",
        pts_label: "PTS",
        correct_heading: "Correto!",
        incorrect_heading: "Não está totalmente correto!",
        points_awarded: "Pontos Atribuídos.",
        questions: [
          {
            stop: "Término de Pretória",
            badge: "Paragem 1: Término de Pretória",
            caption: "Pretória Cidade Jacarandá & Oficinas Vitorianas",
            question: "Qual histórico término de Pretória serve como centro de luxo do norte para The Blue Train e Rovos Rail?",
            options: ["Estação Capital Park", "Estação Park Joanesburgo", "Hub Centurion Gautrain", "Depósito Mamelodi"],
            explanation: "Pretória Capital Park foi construído em estilo vitoriano e acolhe viajantes desde o final do século XIX."
          },
          {
            stop: "Big Hole de Kimberley",
            badge: "Paragem 2: Big Hole de Kimberley",
            caption: "Cofres de Diamantes & Cratera Histórica de Kimberley",
            question: "Quantos mineiros de diamantes escavaram à mão o Big Hole de Kimberley entre 1871 e 1914?",
            options: ["Aproximadamente 50.000 mineiros", "Cerca de 2.000 mineiros", "Mais de 500.000 mineiros", "Apenas 500 mineiros"],
            explanation: "Entre 1871 e 1914, cerca de 50.000 mineiros escavaram o Big Hole."
          },
          {
            stop: "Entroncamento de De Aar",
            badge: "Paragem 3: Entroncamento de De Aar",
            caption: "Cruzamento a Vapor de De Aar da África Austral",
            question: "Por que De Aar ganhou fama histórica na rede ferroviária da África Austral?",
            options: ["É o segundo entroncamento ferroviário mais importante a ligar linhas interiores", "Foi o local da primeira descoberta de ouro", "Acolheu a posse presidencial de 1994", "É o pico de montanha mais alto do Karoo"],
            explanation: "De Aar possui mais de 110 quilómetros de vias férreas."
          },
          {
            stop: "O Grande Karoo",
            badge: "Paragem 4: Deserto do Grande Karoo",
            caption: "Planícies do Deserto do Karoo & Céus Estrelados",
            question: "Que engenharia acústica mantém as cabines do Blue Train silenciosas através do Karoo?",
            options: ["Janelas acústicas duplas revestidas a ouro", "Placas de chumbo sob carpetes", "Deflectores de som em madeira", "Rodas de comboio em borracha"],
            explanation: "Pó de ouro é laminado nas janelas panorâmicas duplas."
          },
          {
            stop: "Vila de Matjiesfontein",
            badge: "Paragem 5: Vila de Matjiesfontein",
            caption: "Vila Ferroviária Vitoriana Preservada de 1890",
            question: "Que lendário hotel vitoriano em Matjiesfontein hospedou Lord Randolph Churchill?",
            options: ["O Lord Milner Hotel", "O Mount Nelson Hotel", "O Carlton Hotel", "O Cape Marine Lodge"],
            explanation: "O Lord Milner Hotel foi concluído em 1899 e serviu como hospital militar."
          },
          {
            stop: "Término do Cabo",
            badge: "Paragem 6: Término do Cabo",
            caption: "Término da Cidade do Cabo à sombra da Montanha da Mesa",
            question: "Qual é a distância ferroviária total percorrida de Pretória à Cidade do Cabo nesta viagem?",
            options: ["1.600 Quilómetros", "850 Quilómetros", "3.200 Quilómetros", "500 Quilómetros"],
            explanation: "O corredor ferroviário de luxo estende-se por 1.600 quilómetros."
          }
        ]
      },
      zh: {
        question_label: "问题",
        of_label: "共",
        pts_label: "分",
        correct_heading: "回答正确！",
        incorrect_heading: "回答不够准确！",
        points_awarded: "获得积分。",
        questions: [
          {
            stop: "比勒陀利亚终点站",
            badge: "第 1 站：比勒陀利亚终点站",
            caption: "比勒陀利亚紫楹花城与维多利亚时代铁路车间",
            question: "比勒陀利亚哪座历史悠久的终点站是蓝色列车和罗沃斯铁路的北部奢华枢纽？",
            options: ["首都公园车站", "约翰内斯堡公园车站", "豪登列车桑顿枢纽", "马梅洛迪车辆段"],
            explanation: "比勒陀利亚首都公园车站建于维多利亚时代，自19世纪末以来一直接待高端铁路旅客。"
          },
          {
            stop: "金伯利大洞",
            badge: "第 2 站：金伯利大洞",
            caption: "金伯利钻石金库与历史矿坑",
            question: "在1871年至1914年间，约有多少名钻石矿工徒手挖掘了巨大的金伯利大洞？",
            options: ["约 50,000 名矿工", "约 2,000 名矿工", "超过 500,000 名矿工", "仅 500 名矿工"],
            explanation: "在1871年至1914年间，约50,000名矿工挖掘了大洞，产出了超过2,720千克钻石。"
          },
          {
            stop: "德阿尔枢纽",
            badge: "第 3 站：德阿尔枢纽",
            caption: "德阿尔南部非洲蒸汽铁路十字路口",
            question: "为什么德阿尔在历史上在南部非洲铁路网中享有盛誉？",
            options: ["它是连接内陆铁路线的第二大重要铁路枢纽", "它是南非首次发现黄金的地方", "它举办了1994年总统就职典礼", "它是卡鲁地区最高的山峰"],
            explanation: "德阿尔在其中央编组站拥有超过110公里的铁路线。"
          },
          {
            stop: "大卡鲁沙漠",
            badge: "第 4 站：大卡鲁沙漠",
            caption: "辽阔的大卡鲁沙漠平原与璀璨星空",
            question: "哪项独特的声学工程使蓝色列车在穿过大风的卡鲁沙漠时保持极度安静？",
            options: ["镀金声学双层玻璃窗", "地毯下安装的铅板", "木质隔音板", "橡胶机车轮"],
            explanation: "金粉被层压在双层全景窗户内，以反射热量并隔绝外部噪音。"
          },
          {
            stop: "马杰斯方丹村",
            badge: "第 5 站：马杰斯方丹村",
            caption: "保存完好的1890年维多利亚时代铁路村落",
            question: "马杰斯方丹哪家传奇的维多利亚时代酒店接待过伦道夫·丘吉尔勋爵？",
            options: ["米尔纳勋爵酒店", "纳尔逊山酒店", "卡尔顿酒店", "开普海洋客栈"],
            explanation: "米尔纳勋爵酒店于1899年建成，在英布战争期间用作军医院。"
          },
          {
            stop: "开普敦终点站",
            badge: "第 6 站：开普敦终点站",
            caption: "桌山阴影下的开普敦终点站",
            question: "在这段传奇旅程中，从比勒陀利亚到开普敦穿越的总铁路距离是多少？",
            options: ["1,600 公里", "850 公里", "3,200 公里", "500 公里"],
            explanation: "整个奢华铁路走廊跨越4个省份，绵延1,600公里。"
          }
        ]
      },
      ja: {
        question_label: "質問",
        of_label: "/",
        pts_label: "PT",
        correct_heading: "正解！",
        incorrect_heading: "惜しい！",
        points_awarded: "ポイント獲得。",
        questions: [
          {
            stop: "プレトリア終点駅",
            badge: "第1駅: プレトリア終点駅",
            caption: "プレトリア・ジャカランダシティ＆ヴィクトリア朝鉄道工場",
            question: "ブルートレインとロボスレイルの北部ラグジュアリーハブとなる歴史的なプレトリアの終着駅はどれですか？",
            options: ["キャピタルパーク駅", "ヨハネスブルグパーク駅", "センチュリオン・ゴートレインハブ", "マメロディデポ"],
            explanation: "プレトリア・キャピタルパーク駅はヴィクトリア様式で建設され、19世紀後半から乗客を迎えています。"
          },
          {
            stop: "キンバリー・ビッグホール",
            badge: "第2駅: キンバリー・ビッグホール",
            caption: "キンバリー・ダイヤモンド保管库＆歴史的クレーター",
            question: "1871年から1914年の間に、手掘りで巨大なキンバリー・ビッグホールを掘ったダイヤモンド採掘手は何人ですか？",
            options: ["約50,000人", "約2,000人", "500,000人以上", "わずか500人"],
            explanation: "1871年から1914年の間に、約50,000人の採掘手がピッケルとスコップだけで掘削しました。"
          },
          {
            stop: "デ・アールジャンクション",
            badge: "第3駅: デ・アールジャンクション",
            caption: "南部アフリカの蒸気機関車クロスロード",
            question: "デ・アールは歴史的に南部アフリカの鉄道網でなぜ有名になったのですか？",
            options: ["内陸線を結ぶ2番目に重要な鉄道ジャンクション", "南アフリカ初の金鉱発見地", "1994年の大統領就任式の会場", "カルーで最も高い山峰"],
            explanation: "デ・アールは110km以上の線路を有し、南部アフリカの蒸気クロスロードの称号を得ました。"
          },
          {
            stop: "グレート・カルー",
            badge: "第4駅: グレート・カルー砂漠",
            caption: "広大なグレート・カルー砂漠平原と星空",
            question: "風の強いカルーを通過する際、ブルートレインの客室を静寂に保つ特徴的な音響技術は何ですか？",
            options: ["金コーティング音響二重ガラス窓", "カーペット下の鉛プレート", "木製防音板", "ゴム製機関車車輪"],
            explanation: "金粉が二重ガラスのパノラマ窓内にラミネートされています。"
          },
          {
            stop: "マチェスフォンテイン村",
            badge: "第5駅: マチェスフォンテイン村",
            caption: "保存された1890年代ヴィクトリア朝の鉄道村",
            question: "マチェスフォンテインの伝説的なヴィクトリア朝ホテルで、ランドルフ・チャーチル卿が滞在したホテルは？",
            options: ["ロード・ミルナー・ホテル", "マウント・ネルソン・ホテル", "カールトン・ホテル", "ケープ・マリン・ロッジ"],
            explanation: "ロード・ミルナー・ホテルは1899年に完成し、ボーア戦争中には野戦病院として機能しました。"
          },
          {
            stop: "ケープタウン終点駅",
            badge: "第6駅: ケープタウン終点駅",
            caption: "テーブルマウンテンの影にそびえるケープタウン終点駅",
            question: "この伝説的な旅でプレトリアからケープタウンまで走破する全鉄道距離はいくらですか？",
            options: ["1,600 キロメートル", "850 キロメートル", "3,200 キロメートル", "500 キロメートル"],
            explanation: "全豪華鉄道回廊は4つの州にわたり1,600キロメートルに及びます。"
          }
        ]
      },
      ko: {
        question_label: "질문",
        of_label: "/",
        pts_label: "점",
        correct_heading: "정답입니다!",
        incorrect_heading: "아쉽게도 틀렸습니다!",
        points_awarded: "점수 획득.",
        questions: [
          {
            stop: "프리토리아 종착역",
            badge: "정거장 1: 프리토리아 종착역",
            caption: "프리토리아 자카란다 시티 및 빅토리아 양식 철도 공작창",
            question: "블루 트레인과 로보스 레일의 북부 럭셔리 허브 역할을 하는 역사적인 프리토리아 종착역은 어디인가요?",
            options: ["캐피털 파크 역", "요하네스버그 파크 역", "센추리온 가우트레인 허브", "마멜로디 차량기지"],
            explanation: "프리토리아 캐피털 파크 역은 빅토리아 양식으로 지어졌으며 19세기 말부터 철도 여행객을 맞이해 왔습니다."
          },
          {
            stop: "킴벌리 빅 홀",
            badge: "정거장 2: 킴벌리 빅 홀",
            caption: "킴벌리 다이아몬드 금고 및 역사적 분화구",
            question: "1871년에서 1914년 사이에 수작업으로 거대한 킴벌리 빅 홀을 판 다이아몬드 광부는 몇 명인가요?",
            options: ["약 50,000명의 광부", "약 2,000명의 광부", "500,000명 이상의 광부", "단 500명의 광부"],
            explanation: "1871년과 1914년 사이에 약 50,000명의 광부가 곡괭이와 삽만으로 채굴했습니다."
          },
          {
            stop: "디 아르 분기점",
            badge: "정거장 3: 디 아르 분기점",
            caption: "남부 아프리카의 디 아르 증기 교차로",
            question: "디 아르는 역사적으로 남부 아프리카 철도망에서 왜 명성을 얻었나요?",
            options: ["내륙 노선을 연결하는 두 번째로 중요한 철도 분기점입니다", "남아프리카 최초의 금 발견지였습니다", "1994년 대통령 취임식이 열린 곳입니다", "카루에서 가장 높은 산봉우리입니다"],
            explanation: "디 아르는 110km 이상의 철도 노선을 갖추고 있습니다."
          },
          {
            stop: "대한 카루 사막",
            badge: "정거장 4: 대한 카루 사막",
            caption: "광활한 대한 카루 사막 평원 및 별빛 하늘",
            question: "바람 부는 카루를 지날 때 블루 트레인 객실을 조용하게 유지하는 음향 공학 기술은 무엇인가요?",
            options: ["금 코팅 음향 이중 유리창", "카펫 아래 설치된 납판", "목재 음향 차단판", "고무 기관차 바퀴"],
            explanation: "이중 파노라마 유리창 내부에 금가루가 적층되어 있습니다."
          },
          {
            stop: "마키스폰테인 마을",
            badge: "정거장 5: 마키스폰테인 마을",
            caption: "보존된 1890년대 빅토리아 양식 철도 마을",
            question: "마키스폰테인에서 랜드돌프 처칠 경이 묵었던 전설적인 빅토리아 양식 호텔은 어디인가요?",
            options: ["로드 밀너 호텔", "마운트 넬슨 호텔", "칼턴 호텔", "케이프 마린 로지"],
            explanation: "로드 밀너 호텔은 1899년에 완공되었으며 군 병원 역할을 했습니다."
          },
          {
            stop: "케이프타운 종착역",
            badge: "정거장 6: 케이프타운 종착역",
            caption: "테이블 마운틴 그림자 아래 케이프타운 종착역",
            question: "이 전설적인 여정에서 프리토리아에서 케이프타운까지 주행하는 총 철도 거리는 얼마인가요?",
            options: ["1,600 킬로미터", "850 킬로미터", "3,200 킬로미터", "500 킬로미터"],
            explanation: "전체 럭셔리 철도 회랑은 1,600km에 달합니다."
          }
        ]
      },
      hi: {
        question_label: "प्रश्न",
        of_label: "का",
        pts_label: "अंक",
        correct_heading: "सही उत्तर!",
        incorrect_heading: "बिलकुल सही नहीं!",
        points_awarded: "अंक प्रदान किए गए।",
        questions: [
          {
            stop: "प्रिटोरिया टर्मिनस",
            badge: "पड़ाव 1: प्रिटोरिया टर्मिनस",
            caption: "प्रिटोरिया जकारंडा सिटी और विक्टोरियन रेल वर्क्स",
            question: "प्रिटोरिया का कौन सा ऐतिहासिक टर्मिनस द ब्लू ट्रेन और रोवोस रेल के लिए उत्तरी लक्जरी हब के रूप में कार्य करता है?",
            options: ["कैपिटल पार्क स्टेशन", "पार्क स्टेशन जोहान्सबर्ग", "सेंटूरियन गॉट्रेन हब", "मामेलौडी डिपो"],
            explanation: "प्रिटोरिया कैपिटल पार्क विक्टोरियन शैली में बनाया गया था।"
          },
          {
            stop: "किम्बरली बिग होल",
            badge: "पड़ाव 2: किम्बरली बिग होल",
            caption: "किम्बरली डायमंड वॉल्ट्स और ऐतिहासिक क्रेटर",
            question: "1871 और 1914 के बीच कितने हीरा खनिकों ने विशाल किम्बरली बिग होल को हाथों से खोदा था?",
            options: ["लगभग 50,000 खनिक", "लगभग 2,000 खनिक", "500,000 से अधिक खनिक", "केवल 500 खनिक"],
            explanation: "1871 और 1914 के बीच, लगभग 50,000 खनिकों ने खुदाई की थी।"
          },
          {
            stop: "डी आर जंक्शन",
            badge: "पड़ाव 3: डी आर जंक्शन",
            caption: "दक्षिणी अफ्रीका का डी आर स्टीम क्रॉसरोड्स",
            question: "डी आर ने ऐतिहासिक रूप से दक्षिणी अफ्रीका के रेल नेटवर्क में प्रसिद्धि क्यों अर्जित की?",
            options: ["यह अंतर्देशीय लाइनों को जोड़ने वाला दूसरा सबसे महत्वपूर्ण रेलवे जंक्शन है", "यह पहली दक्षिण अफ्रीकी सोना खोज की जगह थी", "इसने 1994 के राष्ट्रपति पद के शपथ ग्रहण की मेजबानी की", "यह करू की सबसे ऊंची पर्वत चोटी है"],
            explanation: "डी आर में 110 किलोमीटर से अधिक रेलवे ट्रैक लाइनें हैं।"
          },
          {
            stop: "द ग्रेट करू",
            badge: "पड़ाव 4: द ग्रेट करू रेगिस्तान",
            caption: "विशाल ग्रेट करू रेगिस्तानी मैदान और तारों भरे आसमान",
            question: "कौन सी ध्वनिक इंजीनियरिंग द ब्लू ट्रेन के केबिनों को करू रेगिस्तान में शांत रखती है?",
            options: ["गोल्ड-कोटेड ध्वनिक डबल ग्लेज़िंग खिड़कियां", "कालीन के नीचे सीसे की प्लेटें", "लकड़ी के साउंड बैफल्स", "रबर लोकोमोटिव पहिए"],
            explanation: "डबल-ग्लेज़्ड पैनोरमिक खिड़कियों के अंदर सोने की धूल लामिनेटेड होती है।"
          },
          {
            stop: "मैटजीसफॉन्टेन विलेज",
            badge: "पड़ाव 5: मैटजीसफॉन्टेन विलेज",
            caption: "संरक्षित 1890 विक्टोरियन रेलवे विलेज",
            question: "मैटजीसफॉन्टेन के किस प्रसिद्ध विक्टोरियन होटल में लॉर्ड रैंडोल्फ चर्चिल ठहरे थे?",
            options: ["द लॉर्ड मिलनर होटल", "द माउंट नेल्सन होटल", "द कार्लटन होटल", "द केप मरीन लॉज"],
            explanation: "लॉर्ड मिलनर होटल 1899 में पूरा हुआ था।"
          },
          {
            stop: "केप टाउन टर्मिनस",
            badge: "पड़ाव 6: केप टाउन टर्मिनस",
            caption: "टेबल माउंटेन की छाया में केप टाउन टर्मिनस",
            question: "इस यात्रा में प्रिटोरिया से केप टाउन तक कुल कितनी रेल दूरी तय की जाती है?",
            options: ["1,600 किलोमीटर", "850 किलोमीटर", "3,200 किलोमीटर", "500 किलोमीटर"],
            explanation: "पूरा लक्जरी रेल गलियारा 1,600 किलोमीटर तक फैला है।"
          }
        ]
      },
      ru: {
        question_label: "Вопрос",
        of_label: "из",
        pts_label: "ОЧК",
        correct_heading: "Правильно!",
        incorrect_heading: "Не совсем верно!",
        points_awarded: "Очков Начислено.",
        questions: [
          {
            stop: "Конечная Претория",
            badge: "Остановка 1: Претория",
            caption: "Претория Город Джакаранды и Викторианские Мастерские",
            question: "Какая историческая станция Претории служит северным узлом роскоши для The Blue Train и Rovos Rail?",
            options: ["Станция Capital Park", "Станция Park Йоханнесбург", "Узел Centurion Gautrain", "Депо Мамелоди"],
            explanation: "Претория Capital Park была построена в викторианском стиле и принимает путешественников с конца XIX века."
          },
          {
            stop: "Кимберли Большая Дыра",
            badge: "Остановка 2: Кимберли Большая Дыра",
            caption: "Алмазные Хранилища Кимберли и Исторический Кратер",
            question: "Сколько добытчиков алмазов вручную выкопали гигантскую Большую дыру в Кимберли с 1871 по 1914 год?",
            options: ["Около 50 000 шахтеров", "Около 2 000 шахтеров", "Более 500 000 шахтеров", "Всего 500 шахтеров"],
            explanation: "С 1871 по 1914 год около 50 000 шахтеров выкопали Большую дыру."
          },
          {
            stop: "Узел Де-Аар",
            badge: "Остановка 3: Узел Де-Аар",
            caption: "Паровой Перекресток Де-Аар Южной Африки",
            question: "Почему Де-Аар прославился в истории железнодорожнои сети Южнои Африки?",
            options: ["Это второи по важности железнодорожныи узел, соединяющии внутренние линии", "Здесь было найдено первое золото в ЮАР", "Здесь проходила инаугурация президента 1994 года", "Это самая высокая горная вершина в Кару"],
            explanation: "Де-Аар насчитывает более 110 километров путеи."
          },
          {
            stop: "Большое Кару",
            badge: "Остановка 4: Пустыня Большое Кару",
            caption: "Равнины Пустыни Кару и Звездное Небо",
            question: "Какая акустическая технология обеспечивает тишину в купе The Blue Train в Кару?",
            options: ["Окна с двойным остеклением с золотым напылением", "Свинцовые пластины под коврами", "Деревянные звукоизоляторы", "Резиновые колеса локомотива"],
            explanation: "Золотая пыль ламинирована внутри панорамных окон."
          },
          {
            stop: "Деревня Матжисфонтейн",
            badge: "Остановка 5: Деревня Матжисфонтейн",
            caption: "Сохранившаяся Викторианская Железнодорожная Деревня 1890 Года",
            question: "Какой легендарный викторианский отель в Матжисфонтейне принимал Лорда Черчилля?",
            options: ["Отель Лорд Милнер", "Отель Маунт Нельсон", "Отель Карлтон", "Кейп Марин Лобби"],
            explanation: "Отель Лорд Милнер был построен в 1899 году."
          },
          {
            stop: "Конечная Кейптаун",
            badge: "Остановка 6: Конечная Кейптаун",
            caption: "Конечная Кейптаун в тени Столовой горы",
            question: "Каково общее расстояние по железной дороге от Претории до Кейптауна в этом легендарном путешествии?",
            options: ["1 600 Километров", "850 Километров", "3 200 Километров", "500 Километров"],
            explanation: "Роскошный железнодорожный коридор простирается на 1 600 километров."
          }
        ]
      },
      ar: {
        question_label: "السؤال",
        of_label: "من",
        pts_label: "نقطة",
        correct_heading: "إجابة صحيحة!",
        incorrect_heading: "غير صحيح تمامًا!",
        points_awarded: "تم منح النقاط.",
        questions: [
          {
            stop: "محطة بريتوريا النهائية",
            badge: "المحطة 1: بريتوريا النهائية",
            caption: "مدينة الجاكاراندة بريتوريا وأعمال السكك الحديدية الفيكتورية",
            question: "أي محطة بريتوريا تاريخية تعمل كمركز فاخر شمالي للقطار الأزرق وقطار روفوس رايل؟",
            options: ["محطة كابيتال بارك", "محطة بارك جوهانسبرغ", "مركز سنتوريون جوترين", "مستودع ماميلودي"],
            explanation: "تم بناء محطة كابيتال بارك في بريتوريا بالطراز الفيكتوري وتستقبل المسافرين منذ أواخر القرن التاسع عشر."
          },
          {
            stop: "حفرة كيمبرلي الكبيرة",
            badge: "المحطة 2: حفرة كيمبرلي الكبيرة",
            caption: "خزائن ألماس كيمبرلي والفوهة التاريخية",
            question: "كم عدد عمال مناجم الألماس الذين حفروا حفرة كيمبرلي الكبيرة يدويًا بين عامي 1871 و1914؟",
            options: ["حوالي 50,000 عامل منجم", "حوالي 2,000 عامل منجم", "أكثر من 500,000 عامل منجم", "500 عامل فقط"],
            explanation: "بين عامي 1871 و1914، حفر ما يقرب من 50 ألف عامل حفرة كيمبرلي بالمعاول والرفوش."
          },
          {
            stop: "تقاطع دي آر",
            badge: "المحطة 3: تقاطع دي آر",
            caption: "تقاطع دي آر البخاري لجنوب إفريقيا",
            question: "لماذا اكتسبت دي آر شهرة تاريخية عبر شبكة السكك الحديدية في جنوب إفريقيا؟",
            options: ["إنها ثاني أهم تقاطع سكك حديدية يربط الخطوط الداخلية", "كانت موقع أول اكتشاف للذهب في جنوب إفريقيا", "استضافت حفل التنصيب الرئاسي عام 1994", "إنها أعلى قمة جبلية في كارو"],
            explanation: "تضم دي آر أكثر من 110 كيلومترات من خطوط السكك الحديدية."
          },
          {
            stop: "كارو الكبرى",
            badge: "المحطة 4: صحراء كارو الكبرى",
            caption: "سهول صحراء كارو الكبرى وسماء مرصعة بالنجوم",
            question: "ما هي الهندسة الصوتية المميزة التي تحافظ على هدوء مقصورات القطار الأزرق في صحراء كارو؟",
            options: ["نوافذ زجاجية مزدوجة مغطاة بطبقة من الذهب", "ألواح رصاص تحت السجاد", "حواجز صوتية خشبية", "عجلات قطار مطاطية"],
            explanation: "تم دمج غبار الذهب داخل النوافذ البانورامية مزدوجة الزجاج."
          },
          {
            stop: "قرية ماتجيسفونتين",
            badge: "المحطة 5: قرية ماتجيسفونتين",
            caption: "قرية السكك الحديدية الفيكتورية المحفوظة عام 1890",
            question: "أي فندق فيكتوري أسطوري في ماتجيسفونتين استضاف اللورد راندولف تشرشل وسيسيل جون رودس؟",
            options: ["فندق اللورد ميلنر", "فندق ماウント نيلسون", "فندق كارلتون", "نزل كيب مارين"],
            explanation: "تم الانتهاء من بناء فندق اللورد ميلنر عام 1899 وعمل كمستشفى عسكري."
          },
          {
            stop: "محطة كيب تاون النهائية",
            badge: "المحطة 6: محطة كيب تاون النهائية",
            caption: "محطة كيب تاون في ظل جبل الطاولة",
            question: "ما هي المسافة الإجمالية التي قطعتها السكك الحديدية من بريتوريا إلى كيب تاون في هذه الرحلة؟",
            options: ["1,600 كيلومتر", "850 كيلومتر", "3,200 كيلومتر", "500 كيلومتر"],
            explanation: "يمتد ممر السكك الحديدية الفاخر بطول 1,600 كيلومتر عبر 4 مقاطعات."
          }
        ]
      }
    };

    function getQuizQuestionInLanguage(index, rawQ) {
      const lang = window.TrackTalesLanguageCode || 'en';
      const pack = QUIZ_TRANSLATIONS[lang] || QUIZ_TRANSLATIONS.en;
      if (pack && pack.questions && pack.questions[index]) {
        const qTr = pack.questions[index];
        return {
          ...rawQ,
          badge: qTr.badge || rawQ.badge,
          caption: qTr.caption || rawQ.caption,
          question: qTr.question || rawQ.question,
          options: qTr.options || rawQ.options,
          explanation: qTr.explanation || rawQ.explanation,
          _langPack: pack
        };
      }
      return { ...rawQ, _langPack: QUIZ_TRANSLATIONS.en };
    }

    function renderQuizQuestion(index) {
      currentQuizIndex = index;
      const rawQ = STOP_QUIZZES[currentQuizIndex];
      if (!rawQ) return;
      const q = getQuizQuestionInLanguage(currentQuizIndex, rawQ);
      const langPack = q._langPack || QUIZ_TRANSLATIONS.en;

      if (quizStopBadge) quizStopBadge.textContent = q.badge;
      if (quizProgressLabel) quizProgressLabel.textContent = `${langPack.question_label} ${currentQuizIndex + 1} ${langPack.of_label} ${STOP_QUIZZES.length}`;
      if (quizPointsBadge) quizPointsBadge.textContent = `+${q.points} ${langPack.pts_label}`;
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

    window.TrackTalesRenderQuiz = () => renderQuizQuestion(currentQuizIndex);

    function handleQuizAnswer(selectedIdx, q) {
      const isCorrect = selectedIdx === q.correctIndex;
      const optionBtns = quizOptionsGrid.querySelectorAll('.quiz-option-btn');
      const langPack = q._langPack || QUIZ_TRANSLATIONS.en;
      
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
            <div class="font-bold flex items-center gap-1.5"><i data-lucide="check-circle" class="w-4 h-4"></i> ${langPack.correct_heading} +${q.points} ${langPack.points_awarded}</div>
            <div>${q.explanation}</div>
          `;
          if (window.TrackTalesAnnounce) {
            window.TrackTalesAnnounce(`${langPack.correct_heading} +${q.points}. ${q.explanation}`);
          }
        } else {
          streakCount = 0;
          updateScoreboard();

          quizFeedbackBox.className = 'p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-xs font-sans text-left space-y-1';
          quizFeedbackBox.innerHTML = `
            <div class="font-bold flex items-center gap-1.5"><i data-lucide="alert-circle" class="w-4 h-4"></i> ${langPack.incorrect_heading}</div>
            <div>${q.explanation}</div>
          `;
          if (window.TrackTalesAnnounce) {
            window.TrackTalesAnnounce(`${langPack.incorrect_heading} ${q.explanation}`);
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

    const BINGO_TRANSLATIONS = {
      en: {
        tap_to_stamp: 'Tap to Stamp',
        free_stamp: 'FREE STAMP',
        stamped: 'STAMPED!',
        status_stamped: 'Sights Stamped',
        status_default: 'Tap cells to stamp',
        status_win: 'BINGO COMPLETED! +250 PTS',
        items: {
          b0: { label: 'Pretoria Jacarandas', desc: 'Purple blooms along Capital Park' },
          b1: { label: 'Kimberley Diamond Pit', desc: 'Historic big hole crater sight' },
          b2: { label: 'Karoo Windmill', desc: 'Solitary Karoo desert farm pump' },
          b3: { label: 'Great Karoo Desert Sky', desc: 'Stargazing desert expanse' },
          b4: { label: 'Blue Locomotive', desc: 'Iconic luxury express engine' },
          b5: { label: 'Lord Milner Hotel', desc: 'Victorian Matjiesfontein hotel' },
          b6: { label: 'Hex River Vineyards', desc: 'Valley grapevines & peaks' },
          b7: { label: 'Springbok Wildlife Herd', desc: 'Mzansi national animal in plain' },
          b8: { label: 'Table Mountain Peak', desc: 'Flat-top coastal landmark view' }
        }
      },
      af: {
        tap_to_stamp: 'Tik om te Stempel',
        free_stamp: 'GRATIS STEMPEL',
        stamped: 'GESTEMPEL!',
        status_stamped: 'Besienswaardighede Gestempel',
        status_default: 'Tik selle om te stempel',
        status_win: 'BINGO VOLTOOI! +250 PTN',
        items: {
          b0: { label: 'Pretoria Jakarandas', desc: 'Pers bloeisels langs Capital Park' },
          b1: { label: 'Kimberley Diamantgat', desc: 'Historiese groot gat krater' },
          b2: { label: 'Karoo Windpomp', desc: 'Eensame Karoo plaaspomp' },
          b3: { label: 'Groot Karoo Woestynlug', desc: 'Sterrehemel oor die woestyn' },
          b4: { label: 'Blou Lokomotief', desc: 'Ikoniese luukse sneltrein-enjin' },
          b5: { label: 'Lord Milner Hotel', desc: 'Viktoriaanse Matjiesfontein hotel' },
          b6: { label: 'Hexrivier Wingerde', desc: 'Vallei wingerde & bergpieke' },
          b7: { label: 'Springbok Wildtrop', desc: 'Nasionale dier op die vlakte' },
          b8: { label: 'Tafelberg Piek', desc: 'Platkoptafel baken in Kaapstad' }
        }
      },
      zu: {
        tap_to_stamp: 'Thinta Ukugqamisa',
        free_stamp: 'ISTAMPU MAHHALA',
        stamped: 'KUGQAMISIWE!',
        status_stamped: 'Izindawo Ezifakiwe',
        status_default: 'Thinta ukuze ugqamise',
        status_win: 'I-BINGO IPHELELE! +250 PTS',
        items: {
          b0: { label: 'Pretoria Jacarandas', desc: 'Izimbali ezibhangqile eCapital Park' },
          b1: { label: 'Kimberley Diamond Pit', desc: 'Umgodi omkhulu wedayimane' },
          b2: { label: 'Karoo Windmill', desc: 'Impompo yomoya waseKaroo' },
          b3: { label: 'Great Karoo Desert Sky', desc: 'Isibhakabhaka senkangala' },
          b4: { label: 'Blue Locomotive', desc: 'Injin esitimela sobunewunewu' },
          b5: { label: 'Lord Milner Hotel', desc: 'Ihhotela lase-Victorian eMatjiesfontein' },
          b6: { label: 'Hex River Vineyards', desc: 'Izivande zamagilebhisi ze-Hex River' },
          b7: { label: 'Springbok Wildlife Herd', desc: 'Ibutho le-Springbok edlelweni' },
          b8: { label: 'Table Mountain Peak', desc: 'INtaba yeThebula eKapa' }
        }
      },
      xh: {
        tap_to_stamp: 'Cofa Ukugqumisa',
        free_stamp: 'ISITEMBU SIMAHLA',
        stamped: 'KUGQUMISIWEYO!',
        status_stamped: 'Izinto Ezifakiweyo',
        status_default: 'Cofa ukuze ugqumise',
        status_win: 'I-BINGO IGQITYWE! +250 PTS',
        items: {
          b0: { label: 'Pretoria Jacarandas', desc: 'Izintyatyambo ezibambeneyo' },
          b1: { label: 'Kimberley Diamond Pit', desc: 'Umgodi omkhulu wediamant' },
          b2: { label: 'Karoo Windmill', desc: 'Impompo yomoya eKaroo' },
          b3: { label: 'Great Karoo Desert Sky', desc: 'Isibhakabhaka saseKaroo' },
          b4: { label: 'Blue Locomotive', desc: 'Injin yesitimela sobunewunewu' },
          b5: { label: 'Lord Milner Hotel', desc: 'Ihotele yaseMatjiesfontein' },
          b6: { label: 'Hex River Vineyards', desc: 'Izidiliya zaseHex River' },
          b7: { label: 'Springbok Wildlife Herd', desc: 'Ihlathi le-Springbok ezintabeni' },
          b8: { label: 'Table Mountain Peak', desc: 'INtaba yeThebula eKapa' }
        }
      },
      de: {
        tap_to_stamp: 'Tippen zum Stempeln',
        free_stamp: 'GRATIS STEMPEL',
        stamped: 'GESTEMPELT!',
        status_stamped: 'Sehenswürdigkeiten Gestempelt',
        status_default: 'Tippen zum Stempeln',
        status_win: 'BINGO ABGESCHLOSSEN! +250 PKT',
        items: {
          b0: { label: 'Pretoria Jakarandas', desc: 'Violette Blüten im Capital Park' },
          b1: { label: 'Kimberley Diamantenloch', desc: 'Historischer Big Hole Krater' },
          b2: { label: 'Karoo Windmühle', desc: 'Einsame Karoo-Farmpumpe' },
          b3: { label: 'Großer Karoo Himmel', desc: 'Sternenhimmel über der Wüste' },
          b4: { label: 'Blaue Lokomotive', desc: 'Ikonische Luxuszug-Lokomotive' },
          b5: { label: 'Lord Milner Hotel', desc: 'Viktorianisches Hotel in Matjiesfontein' },
          b6: { label: 'Hex River Weinberg', desc: 'Tal-Weinberge und Berggipfel' },
          b7: { label: 'Springbock-Herde', desc: 'Nationaltier in der Karoo-Ebene' },
          b8: { label: 'Tafelberg-Gipfel', desc: 'Wahrzeichen in Kapstadt' }
        }
      },
      fr: {
        tap_to_stamp: 'Appuyez pour Tamponner',
        free_stamp: 'TAMPON GRATUIT',
        stamped: 'TAMPONNÉ !',
        status_stamped: 'Sites Tamponnés',
        status_default: 'Appuyez sur les cases',
        status_win: 'BINGO TERMINÉ ! +250 PTS',
        items: {
          b0: { label: 'Jacarandas de Pretoria', desc: 'Fleurs violettes près de Capital Park' },
          b1: { label: 'Mine de Diamant de Kimberley', desc: 'Cratère historique du Big Hole' },
          b2: { label: 'Éolienne du Karoo', desc: 'Pompe à eau isolée du Karoo' },
          b3: { label: 'Ciel du Grand Karoo', desc: 'Nuit étoilée dans le désert' },
          b4: { label: 'Locomotive Bleue', desc: 'Moteur emblématique du train de luxe' },
          b5: { label: 'Hôtel Lord Milner', desc: 'Hôtel victorien de Matjiesfontein' },
          b6: { label: 'Vignobles de Hex River', desc: 'Vignes et sommets de la vallée' },
          b7: { label: 'Troupeau de Springboks', desc: 'Animal national dans la plaine' },
          b8: { label: 'Sommet de la Montagne de la Table', desc: 'Panorama côtier du Cap' }
        }
      },
      nl: {
        tap_to_stamp: 'Tik om te Stempelen',
        free_stamp: 'GRATIS STEMPEL',
        stamped: 'GESTEMPELD!',
        status_stamped: 'Bezienswaardigheden Gestempeld',
        status_default: 'Tik vakjes om te stempelen',
        status_win: 'BINGO VOLTOOID! +250 PTN',
        items: {
          b0: { label: 'Pretoria Jacaranda’s', desc: 'Paarse bloesems bij Capital Park' },
          b1: { label: 'Kimberley Diamantmijn', desc: 'Historische krater van Big Hole' },
          b2: { label: 'Karoo Windmolen', desc: 'Eenzame Karoo boerderijpomp' },
          b3: { label: 'Grote Karoo Woestijnlucht', desc: 'Sterrenhemel boven de woestijn' },
          b4: { label: 'Blauwe Lokomotief', desc: 'Iconische luxe sneltreinmotor' },
          b5: { label: 'Lord Milner Hotel', desc: 'Victoriaans hotel in Matjiesfontein' },
          b6: { label: 'Hex River Wijngaarden', desc: 'Vallei wijngaarden & bergen' },
          b7: { label: 'Springbokken Kudde', desc: 'Nationaal dier in de Karoo-vlakte' },
          b8: { label: 'Tafelberg Top', desc: 'Kusticoon in Kaapstad' }
        }
      },
      es: {
        tap_to_stamp: 'Toca para Sellar',
        free_stamp: 'SELLO GRATIS',
        stamped: '¡SELLADO!',
        status_stamped: 'Lugares Sellados',
        status_default: 'Toca las casillas para sellar',
        status_win: '¡BINGO COMPLETADO! +250 PTS',
        items: {
          b0: { label: 'Jacarandás de Pretoria', desc: 'Flores púrpuras en Capital Park' },
          b1: { label: 'Mina de Diamante Kimberley', desc: 'Cráter histórico del Big Hole' },
          b2: { label: 'Molino del Karoo', desc: 'Bomba de agua en el desierto' },
          b3: { label: 'Cielo del Gran Karoo', desc: 'Cielo estrellado en el desierto' },
          b4: { label: 'Locomotora Azul', desc: 'Motor icónico del tren de lujo' },
          b5: { label: 'Hotel Lord Milner', desc: 'Hotel victoriano en Matjiesfontein' },
          b6: { label: 'Viñedos de Hex River', desc: 'Viñedos y picos del valle' },
          b7: { label: 'Manada de Springboks', desc: 'Animal nacional en la llanura' },
          b8: { label: 'Cima de Table Mountain', desc: 'Icono costero en Ciudad del Cabo' }
        }
      },
      it: {
        tap_to_stamp: 'Tocca per Timbrare',
        free_stamp: 'TIMBRO GRATUITO',
        stamped: 'TIMBRATO!',
        status_stamped: 'Luoghi Timbrati',
        status_default: 'Tocca le caselle per timbrare',
        status_win: 'BINGO COMPLETATO! +250 PT',
        items: {
          b0: { label: 'Jacarande di Pretoria', desc: 'Fiori viola lungo Capital Park' },
          b1: { label: 'Miniera di Diamanti Kimberley', desc: 'Cratere storico del Big Hole' },
          b2: { label: 'Mulino del Karoo', desc: 'Pompa d\'acqua isolata nel deserto' },
          b3: { label: 'Cielo del Grande Karoo', desc: 'Cielo stellato nel deserto' },
          b4: { label: 'Locomotiva Blu', desc: 'Motore iconico del treno di lusso' },
          b5: { label: 'Lord Milner Hotel', desc: 'Hotel vittoriano a Matjiesfontein' },
          b6: { label: 'Vigneti di Hex River', desc: 'Vigneti e vette della valle' },
          b7: { label: 'Brancata di Springbok', desc: 'Animale nazionale nella pianura' },
          b8: { label: 'Vetta della Table Mountain', desc: 'Simbolo costiero di Città del Capo' }
        }
      },
      pt: {
        tap_to_stamp: 'Toque para Carimbar',
        free_stamp: 'CARIMBO GRÁTIS',
        stamped: 'CARIMBADO!',
        status_stamped: 'Locais Carimbados',
        status_default: 'Toque para carimbar',
        status_win: 'BINGO CONCLUÍDO! +250 PTS',
        items: {
          b0: { label: 'Jacarandás de Pretória', desc: 'Flores roxas ao longo de Capital Park' },
          b1: { label: 'Mina de Diamante Kimberley', desc: 'Cratera histórica do Big Hole' },
          b2: { label: 'Moinho do Karoo', desc: 'Bomba de água no deserto' },
          b3: { label: 'Céu do Grande Karoo', desc: 'Céu estrelado no deserto' },
          b4: { label: 'Locomotiva Azul', desc: 'Motor icónico do comboio de luxo' },
          b5: { label: 'Lord Milner Hotel', desc: 'Hotel vitoriano em Matjiesfontein' },
          b6: { label: 'Vinhedos de Hex River', desc: 'Vinhas e picos do vale' },
          b7: { label: 'Manada de Springboks', desc: 'Animal nacional na planície' },
          b8: { label: 'Pico da Montanha da Mesa', desc: 'Ícone costeiro da Cidade do Cabo' }
        }
      },
      zh: {
        tap_to_stamp: '点击盖章',
        free_stamp: '免费印章',
        stamped: '已盖章！',
        status_stamped: '已收集景点',
        status_default: '点击方格盖章',
        status_win: '宾果完成！+250 分',
        items: {
          b0: { label: '比勒陀利亚紫楹花', desc: '首都公园沿途绽放的紫色花海' },
          b1: { label: '金伯利钻石坑', desc: '历史悠久的大洞矿坑奇观' },
          b2: { label: '卡鲁风车', desc: '卡鲁沙漠农场孤立的风车' },
          b3: { label: '大卡鲁沙漠夜空', desc: '观星胜地卡鲁辽阔夜空' },
          b4: { label: '蓝色机车', desc: '标志性奢华快车火车头' },
          b5: { label: '米尔纳勋爵酒店', desc: '马杰斯方丹维多利亚风情酒店' },
          b6: { label: '赫克斯河葡萄园', desc: '山谷葡萄园与雄伟山峰' },
          b7: { label: '跳羚野生动物群', desc: '平原上奔跑的南非国兽跳羚' },
          b8: { label: '桌山山峰', desc: '开普敦海岸标志性平顶山峰' }
        }
      },
      ja: {
        tap_to_stamp: 'タップしてスタンプ',
        free_stamp: 'フリースタンプ',
        stamped: 'スタンプ完了！',
        status_stamped: 'スタンプ獲得スポット',
        status_default: 'マスをタップしてスタンプ',
        status_win: 'ビンゴ達成！ +250 PT',
        items: {
          b0: { label: 'プレトリアのジャカランダ', desc: 'キャピタルパーク沿いの紫の花' },
          b1: { label: 'キンバリー・ダイヤモンド坑', desc: '歴史的なビッグホールクレーター' },
          b2: { label: 'カルーの風車', desc: 'カルー砂漠の風車' },
          b3: { label: 'グレート・カルーの夜空', desc: '満天の星空が広がる砂漠' },
          b4: { label: 'ブルー機関車', desc: '豪華列車の象徴的機関車' },
          b5: { label: 'ロード・ミルナー・ホテル', desc: 'マチェスフォンテインの伝統ホテル' },
          b6: { label: 'ヘックス・リバー葡萄园', desc: '山谷のブドウ畑と山々の絶景' },
          b7: { label: 'スプリングボックの群れ', desc: '平原を駆ける南アフリカの国兽' },
          b8: { label: 'テーブルマウンテン山頂', desc: 'ケープタウンのシンボル' }
        }
      },
      ko: {
        tap_to_stamp: '탭하여 도장 찍기',
        free_stamp: '무료 도장',
        stamped: '도장 완료!',
        status_stamped: '스탬프 완료 명소',
        status_default: '칸을 탭하여 스탬프',
        status_win: '빙고 완성! +250 점',
        items: {
          b0: { label: '프리토리아 자카란다', desc: '캐피털 파크를 따라 핀 보라색 꽃' },
          b1: { label: '킴벌리 다이아몬드 구덩이', desc: '역사적인 빅 홀 분화구' },
          b2: { label: '카루 풍차', desc: '카루 사막의 외딴 풍차' },
          b3: { label: '대한 카루 사막 하늘', desc: '별이 빛나는 사막 밤하늘' },
          b4: { label: '블루 기관차', desc: '상징적인 럭셔리 열차 기관차' },
          b5: { label: '로드 밀너 호텔', desc: '마키스폰테인의 빅토리아 양식 호텔' },
          b6: { label: '헥스 리버 포도밭', desc: '계곡 포도밭과 봉우리 전망' },
          b7: { label: '스프링복 야생동물 무리', desc: '평원을 달리는 남아공 국수' },
          b8: { label: '테이블 마운틴 정상', desc: '케이프타운의 해안 랜드마크' }
        }
      },
      hi: {
        tap_to_stamp: 'स्टैम्प करने के लिए टैप करें',
        free_stamp: 'मुफ्त स्टैम्प',
        stamped: 'स्टैम्प्ड!',
        status_stamped: 'स्टैम्प किए गए दृश्य',
        status_default: 'स्टैम्प के लिए बॉक्स टैप करें',
        status_win: 'बिंगो पूरा हुआ! +250 अंक',
        items: {
          b0: { label: 'प्रिटोरिया जकारंडा', desc: 'कैपिटल पार्क में बैंगनी फूल' },
          b1: { label: 'किम्बरली डायमंड गड्डा', desc: 'ऐतिहासिक बिग होल क्रेटर' },
          b2: { label: 'करू पवनचक्की', desc: 'करू रेगिस्तान का वाटर पंप' },
          b3: { label: 'द ग्रेट करू रेगिस्तानी आसमान', desc: 'तारों भरा रेगिस्तानी आसमान' },
          b4: { label: 'ब्लू लोकोमोटिव', desc: 'आइकॉनिक लक्जरी ट्रेन इंजन' },
          b5: { label: 'लॉर्ड मिलनर होटल', desc: 'मैटजीसफॉन्टेन का विक्टोरियन होटल' },
          b6: { label: 'हेक्स रिवर अंगूर के बाग', desc: 'घाटी के अंगूर के बाग और चोटियाँ' },
          b7: { label: 'स्प्रिंगबॉक वन्यजीव झुंड', desc: 'मैदान में राष्ट्रीय पशु' },
          b8: { label: 'टेबल माउंटेन चोटी', desc: 'केप टाउन का लैंडमार्क' }
        }
      },
      ru: {
        tap_to_stamp: 'Нажмите, чтобы Отметить',
        free_stamp: 'БЕСПЛАТНЫЙ ШТАМП',
        stamped: 'ОТМЕЧЕНО!',
        status_stamped: 'Отмечено Достопримечательностей',
        status_default: 'Нажмите на ячейку',
        status_win: 'БИНГО ЗАВЕРШЕНО! +250 ОЧК',
        items: {
          b0: { label: 'Джакаранды Претории', desc: 'Сиреневые цветы вдоль Капитал Парка' },
          b1: { label: 'Алмазный Карьер Кимберли', desc: 'Исторический кратер Большая Дыра' },
          b2: { label: 'Ветряк в Кару', desc: 'Одинокий насос в пустыне Кару' },
          b3: { label: 'Небо Пустыни Большое Кару', desc: 'Звездное небо над пустыней' },
          b4: { label: 'Голубой Локомотив', desc: 'Легендарный двигатель поезда' },
          b5: { label: 'Отель Лорд Милнер', desc: 'Викторианский отель в Матжисфонтейне' },
          b6: { label: 'Виноградники Хекс Ривер', desc: 'Виноградники и горные вершины' },
          b7: { label: 'Стадо Спрингбоков', desc: 'Национальное животное на равнине' },
          b8: { label: 'Вершина Столовой Горы', desc: 'Знаменитый символ Кейптауна' }
        }
      },
      ar: {
        tap_to_stamp: 'اضغط للختم',
        free_stamp: 'ختم مجاني',
        stamped: 'تم الختم!',
        status_stamped: 'معالم مختومة',
        status_default: 'اضغط على الخلايا للختم',
        status_win: 'اكتمل البينجو! +250 نقطة',
        items: {
          b0: { label: 'جاكاراندا بريتوريا', desc: 'زهار بنفسجية على طول كابيتال بارك' },
          b1: { label: 'منجم ألماس كيمبرلي', desc: 'فوهة الحفرة الكبيرة التاريخية' },
          b2: { label: 'طاحونة هوائية في كارو', desc: 'مضخة مياه صحراوية معزولة' },
          b3: { label: 'سماء صحراء كارو الكبرى', desc: 'سماء الصحراء المرصعة بالنجوم' },
          b4: { label: 'المحرك الأزرق', desc: 'قاطرة القطار الفاخر الأسطورية' },
          b5: { label: 'فندق اللورد ميلنر', desc: 'فندق فيكتوري في ماتجيسفونتين' },
          b6: { label: 'كروم هكس ريفر', desc: 'حقول العنب والقمم الجبلية' },
          b7: { label: 'قطيع غزلان السبرينغبوك', desc: 'الحيوان الوطني في السهول' },
          b8: { label: 'قمة جبل الطاولة', desc: 'معلم كيب تاون الساحلي الشهير' }
        }
      }
    };

    const PUZZLE_TRANSLATIONS = {
      en: {
        slot_label: "Slot",
        drop_here: "Drop Here",
        switch_mode_coach: "Switch: Coach Sequence",
        switch_mode_station: "Switch: Station Sequence",
        mode_station_title: "Pretoria to Cape Town Route Assembler",
        mode_station_desc: "Place the 6 corridor stops in geographic order from Departure Hub (Pretoria) to Atlantic Terminus (Cape Town).",
        mode_coach_title: "Flagship Locomotive Coach Sequence",
        mode_coach_desc: "Arrange the luxury train carriages from front engine to rear observation balcony.",
        clear_slots: "Clear Slots",
        verify_sequence: "Verify Sequence",
        perfect_assembly: "Perfect Assembly! +150 Points Awarded.",
        incomplete_assembly: "Incomplete Assembly",
        fill_all_slots: "Please fill all sequence slots before verifying.",
        not_quite_right: "Sequence Not Quite Right",
        pieces: {
          Pretoria: "Pretoria",
          Kimberley: "Kimberley",
          "De Aar": "De Aar",
          "Beaufort West": "Beaufort West",
          Matjiesfontein: "Matjiesfontein",
          "Cape Town": "Cape Town",
          "Locomotive Engine": "Locomotive Engine",
          "Luxury Sleeper Suite": "Luxury Sleeper Suite",
          "Dining Saloon": "Dining Saloon",
          "Lounge Car": "Lounge Car",
          "Observation Carriage": "Observation Carriage"
        }
      },
      af: {
        slot_label: "Sleuf",
        drop_here: "Plaas Hier",
        switch_mode_coach: "Skakel: Wa-volgorde",
        switch_mode_station: "Skakel: Stasie-volgorde",
        mode_station_title: "Pretoria na Kaapstad Roete-samesteller",
        mode_station_desc: "Plaas die 6 korridor-haltes in geografiese volgorde vanaf Pretoria na Kaapstad.",
        mode_coach_title: "Vlagskip Lokomotief Wa-volgorde",
        mode_coach_desc: "Rangskik die luukse treinwaens van die voorste enjin tot die agterste observasie-balkon.",
        clear_slots: "Maak Sleuwe Skoon",
        verify_sequence: "Kontroleer Volgorde",
        perfect_assembly: "Perfekte Samestelling! +150 Punte Toegeken.",
        incomplete_assembly: "Onvolledige Samestelling",
        fill_all_slots: "Vul asseblief alle sleuwe voordat u kontroleer.",
        not_quite_right: "Volgorde Nie Heeltemal Reg Nie",
        pieces: {
          Pretoria: "Pretoria",
          Kimberley: "Kimberley",
          "De Aar": "De Aar",
          "Beaufort West": "Beaufort-Wes",
          Matjiesfontein: "Matjiesfontein",
          "Cape Town": "Kaapstad",
          "Locomotive Engine": "Lokomotief-enjin",
          "Luxury Sleeper Suite": "Luukse Slaapswa",
          "Dining Saloon": "Eetsalonwa",
          "Lounge Car": "Sitkamerwa",
          "Observation Carriage": "Observasiewao"
        }
      },
      zu: {
        slot_label: "Isikhala",
        drop_here: "Faka Lapha",
        switch_mode_coach: "Shintsha: Izimoto Zesitimela",
        switch_mode_station: "Shintsha: Iziteshi Zesitimela",
        mode_station_title: "Umihlanganisi Womzila Osuka ePretoria uya eKapa",
        mode_station_desc: "Faka izitobhi ezi-6 zomzila ngokulandelana kwendawo kusukela ePretoria kuya eKapa.",
        mode_coach_title: "Ukulandelana Kwezimoto Zesitimela",
        mode_coach_desc: "Hlela izimoto zesitimela sobunewunewu kusukela enjinini ngaphambili kuya ku-balcony ngemuva.",
        clear_slots: "Khipha Konke",
        verify_sequence: "Hlola Ukulandelana",
        perfect_assembly: "Ukuhlangana Okuphelele! +150 Amaphuzu Anikeziwe.",
        incomplete_assembly: "Ukuhlanganisa Okungaphelele",
        fill_all_slots: "Sicela ugcwalise zonke izikhala ngaphambi kwokuhlola.",
        not_quite_right: "Ukulandelana Akulungile Impela",
        pieces: {
          Pretoria: "Pretoria",
          Kimberley: "Kimberley",
          "De Aar": "De Aar",
          "Beaufort West": "Beaufort West",
          Matjiesfontein: "Matjiesfontein",
          "Cape Town": "EKapa",
          "Locomotive Engine": "Injin Yesitimela",
          "Luxury Sleeper Suite": "Igumbi Lokulala",
          "Dining Saloon": "Igumbi Lokudlela",
          "Lounge Car": "Igumbi Lokuphumula",
          "Observation Carriage": "Inqola Yokubuka"
        }
      },
      de: {
        slot_label: "Platz",
        drop_here: "Hier Ablegen",
        switch_mode_coach: "Wechseln: Waggon-Reihenfolge",
        switch_mode_station: "Wechseln: Bahnhofs-Reihenfolge",
        mode_station_title: "Pretoria nach Kapstadt Routen-Baukasten",
        mode_station_desc: "Plazieren Sie die 6 Korridor-Stopps in geografischer Reihenfolge von Pretoria nach Kapstadt.",
        mode_coach_title: "Luxuszug Waggon-Reihenfolge",
        mode_coach_desc: "Ordnen Sie die Luxuswaggons von der Lokomotive bis zum Aussichtsbalkon an.",
        clear_slots: "Plätze Leeren",
        verify_sequence: "Reihenfolge Prüfen",
        perfect_assembly: "Perfekte Anordnung! +150 Punkte Vergeben.",
        incomplete_assembly: "Unvollständige Anordnung",
        fill_all_slots: "Bitte füllen Sie alle Plätze aus, bevor Sie prüfen.",
        not_quite_right: "Reihenfolge Nicht Ganz Richtig",
        pieces: {
          Pretoria: "Pretoria",
          Kimberley: "Kimberley",
          "De Aar": "De Aar",
          "Beaufort West": "Beaufort West",
          Matjiesfontein: "Matjiesfontein",
          "Cape Town": "Kapstadt",
          "Locomotive Engine": "Lokomotive",
          "Luxury Sleeper Suite": "Luxus-Schlafwagen",
          "Dining Saloon": "Speisewagen",
          "Lounge Car": "Lounge-Wagen",
          "Observation Carriage": "Aussichtswagen"
        }
      },
      fr: {
        slot_label: "Emplacement",
        drop_here: "Déposer Ici",
        switch_mode_coach: "Changer: Ordre des Wagons",
        switch_mode_station: "Changer: Ordre des Gares",
        mode_station_title: "Assembleur d'Itinéraire Pretoria au Cap",
        mode_station_desc: "Placez les 6 arrêts du corridor dans l'ordre géographique de Pretoria au Cap.",
        mode_coach_title: "Séquence des Wagons du Train de Luxe",
        mode_coach_desc: "Disposez les voitures de luxe de la motrice avant au balcon panoramique arrière.",
        clear_slots: "Vider les Emplacements",
        verify_sequence: "Vérifier la Séquence",
        perfect_assembly: "Assemblage Parfait ! +150 Points Attribués.",
        incomplete_assembly: "Assemblage Incomplet",
        fill_all_slots: "Veuillez remplir tous les emplacements avant de vérifier.",
        not_quite_right: "Séquence Pas Tout à Fait Correcte",
        pieces: {
          Pretoria: "Pretoria",
          Kimberley: "Kimberley",
          "De Aar": "De Aar",
          "Beaufort West": "Beaufort West",
          Matjiesfontein: "Matjiesfontein",
          "Cape Town": "Le Cap",
          "Locomotive Engine": "Motrice Locomotive",
          "Luxury Sleeper Suite": "Voiture-Lits de Luxe",
          "Dining Saloon": "Wagon-Restaurant",
          "Lounge Car": "Wagon-Salon",
          "Observation Carriage": "Voiture-Panoramique"
        }
      },
      nl: {
        slot_label: "Vak",
        drop_here: "Plaats Hier",
        switch_mode_coach: "Wissel: Wagon Volgorde",
        switch_mode_station: "Wissel: Station Volgorde",
        mode_station_title: "Pretoria naar Kaapstad Routebouwer",
        mode_station_desc: "Plaats de 6 corridor-haltes in geografische volgorde van Pretoria naar Kaapstad.",
        mode_coach_title: "Vlaggenschip Wagons Volgorde",
        mode_coach_desc: "Rangschik de luxe wagons van de voorste locomotief tot het achterste panoramabalkon.",
        clear_slots: "Vakken Leegmaken",
        verify_sequence: "Controleer Volgorde",
        perfect_assembly: "Perfecte Samestelling! +150 Punten Toegekend.",
        incomplete_assembly: "Onvolledige Samestelling",
        fill_all_slots: "Vul alle vakken in voordat u controleert.",
        not_quite_right: "Volgorde Niet Heeltemal Juist",
        pieces: {
          Pretoria: "Pretoria",
          Kimberley: "Kimberley",
          "De Aar": "De Aar",
          "Beaufort West": "Beaufort-West",
          Matjiesfontein: "Matjiesfontein",
          "Cape Town": "Kaapstad",
          "Locomotive Engine": "Lokomotief",
          "Luxury Sleeper Suite": "Luxe Slaapwagon",
          "Dining Saloon": "Restauratiewagon",
          "Lounge Car": "Loungewagon",
          "Observation Carriage": "Panoramawagon"
        }
      },
      es: {
        slot_label: "Casilla",
        drop_here: "Soltar Aquí",
        switch_mode_coach: "Cambiar: Secuencia de Vagones",
        switch_mode_station: "Cambiar: Secuencia de Estaciones",
        mode_station_title: "Ensamblador de Ruta Pretoria a Ciudad del Cabo",
        mode_station_desc: "Coloque las 6 paradas del corredor en orden geográfico desde Pretoria hasta Ciudad del Cabo.",
        mode_coach_title: "Secuencia de Vagones de Tren de Lujo",
        mode_coach_desc: "Organice los vagones de lujo desde la locomotora delantera hasta el balcón de observación.",
        clear_slots: "Vaciar Casillas",
        verify_sequence: "Verificar Secuencia",
        perfect_assembly: "¡Ensamblaje Perfecto! +150 Puntos Otorgados.",
        incomplete_assembly: "Ensamblaje Incompleto",
        fill_all_slots: "Por favor llene todas las casillas antes de verificar.",
        not_quite_right: "Secuencia No Del Todo Correcta",
        pieces: {
          Pretoria: "Pretoria",
          Kimberley: "Kimberley",
          "De Aar": "De Aar",
          "Beaufort West": "Beaufort West",
          Matjiesfontein: "Matjiesfontein",
          "Cape Town": "Ciudad del Cabo",
          "Locomotive Engine": "Locomotora",
          "Luxury Sleeper Suite": "Vagón Cama de Lujo",
          "Dining Saloon": "Vagón Restaurante",
          "Lounge Car": "Vagón Salón",
          "Observation Carriage": "Vagón Observatorio"
        }
      },
      it: {
        slot_label: "Slot",
        drop_here: "Metti Qui",
        switch_mode_coach: "Cambia: Sequenza Vagoni",
        switch_mode_station: "Cambia: Sequenza Stazioni",
        mode_station_title: "Assemblatore di Rotta da Pretoria a Città del Capo",
        mode_station_desc: "Disponi le 6 fermate del corridoio in ordine geografico da Pretoria a Città del Capo.",
        mode_coach_title: "Sequenza Carrozze del Treno di Lusso",
        mode_coach_desc: "Disponi le carrozze di lusso dalla locomotiva anteriore al balcone panoramico posteriore.",
        clear_slots: "Svuota Slot",
        verify_sequence: "Verifica Sequenza",
        perfect_assembly: "Assemblaggio Perfetto! +150 Punti Assegnati.",
        incomplete_assembly: "Assemblaggio Incompleto",
        fill_all_slots: "Compila tutti gli slot prima di verificare.",
        not_quite_right: "Sequenza Non Proprio Corretta",
        pieces: {
          Pretoria: "Pretoria",
          Kimberley: "Kimberley",
          "De Aar": "De Aar",
          "Beaufort West": "Beaufort West",
          Matjiesfontein: "Matjiesfontein",
          "Cape Town": "Città del Capo",
          "Locomotive Engine": "Locomotiva",
          "Luxury Sleeper Suite": "Vagone Letto di Lusso",
          "Dining Saloon": "Vagone Ristorante",
          "Lounge Car": "Vagone Salotto",
          "Observation Carriage": "Vagone Panoramico"
        }
      },
      pt: {
        slot_label: "Espaço",
        drop_here: "Coloque Aqui",
        switch_mode_coach: "Mudar: Sequência de Carruagens",
        switch_mode_station: "Mudar: Sequência de Estações",
        mode_station_title: "Montador de Rota Pretória para Cidade do Cabo",
        mode_station_desc: "Coloque as 6 paragens do corredor por ordem geográfica de Pretória à Cidade do Cabo.",
        mode_coach_title: "Sequência de Carruagens do Comboio de Luxo",
        mode_coach_desc: "Organize as carruagens de luxo desde a locomotiva dianteira até à varanda panorâmica.",
        clear_slots: "Limpar Espaços",
        verify_sequence: "Verificar Sequência",
        perfect_assembly: "Montagem Perfeita! +150 Pontos Atribuídos.",
        incomplete_assembly: "Montagem Incompleta",
        fill_all_slots: "Por favor preencha todos os espaços antes de verificar.",
        not_quite_right: "Sequência Não Está Correta",
        pieces: {
          Pretoria: "Pretória",
          Kimberley: "Kimberley",
          "De Aar": "De Aar",
          "Beaufort West": "Beaufort West",
          Matjiesfontein: "Matjiesfontein",
          "Cape Town": "Cidade do Cabo",
          "Locomotive Engine": "Locomotiva",
          "Luxury Sleeper Suite": "Carruagem Cama de Luxo",
          "Dining Saloon": "Carruagem Restaurante",
          "Lounge Car": "Carruagem Lounge",
          "Observation Carriage": "Carruagem Panorâmica"
        }
      },
      zh: {
        slot_label: "位置",
        drop_here: "放于此处",
        switch_mode_coach: "切换：车厢排序模式",
        switch_mode_station: "切换：车站排序模式",
        mode_station_title: "比勒陀利亚至开普敦路线拼图组装器",
        mode_station_desc: "按照从比勒陀利亚到开普敦的地理顺序排列6个走廊站点。",
        mode_coach_title: "旗舰豪华列车车厢组装顺序",
        mode_coach_desc: "从前端机车头到后端观景阳台依次排列豪华车厢。",
        clear_slots: "清空槽位",
        verify_sequence: "验证排序",
        perfect_assembly: "完美排序！获得 +150 积分。",
        incomplete_assembly: "排序未完成",
        fill_all_slots: "请在验证前填满所有位置。",
        not_quite_right: "排序不够准确",
        pieces: {
          Pretoria: "比勒陀利亚",
          Kimberley: "金伯利",
          "De Aar": "德阿尔",
          "Beaufort West": "博福特西",
          Matjiesfontein: "马杰斯方丹",
          "Cape Town": "开普敦",
          "Locomotive Engine": "蒸汽/电力火车头",
          "Luxury Sleeper Suite": "奢华卧铺车厢",
          "Dining Saloon": "豪华餐车",
          "Lounge Car": "休闲沙龙车厢",
          "Observation Carriage": "全景观景车厢"
        }
      },
      ja: {
        slot_label: "スロット",
        drop_here: "ここへ配置",
        switch_mode_coach: "切替: 車両順序モード",
        switch_mode_station: "切替: 駅順序モード",
        mode_station_title: "プレトリア〜ケープタウン 路線ルートビルダー",
        mode_station_desc: "プレトリアからケープタウンまでの6つの停車駅を正確な地理順に並べ替えてください。",
        mode_coach_title: "豪華列車車両編成パズル",
        mode_coach_desc: "先頭の機関車から尾部の展望バルコニーまで豪華車両を編成してください。",
        clear_slots: "スロットをクリア",
        verify_sequence: "順序を検証",
        perfect_assembly: "パーフェクト！ +150 ポイント獲得。",
        incomplete_assembly: "未完了の配置",
        fill_all_slots: "検証前にすべてのスロットを埋めてください。",
        not_quite_right: "順序が正しくありません",
        pieces: {
          Pretoria: "プレトリア",
          Kimberley: "キンバリー",
          "De Aar": "デ・アール",
          "Beaufort West": "ボーフォート・ウエスト",
          Matjiesfontein: "マチェスフォンテイン",
          "Cape Town": "ケープタウン",
          "Locomotive Engine": "機関車エンジン",
          "Luxury Sleeper Suite": "豪華寝台スイート",
          "Dining Saloon": "食堂車",
          "Lounge Car": "ラウンジ車",
          "Observation Carriage": "展望車両"
        }
      },
      ko: {
        slot_label: "슬롯",
        drop_here: "여기에 배치",
        switch_mode_coach: "전환: 객차 순서 모드",
        switch_mode_station: "전환: 역 순서 모드",
        mode_station_title: "프리토리아-케이프타운 노선 조립 퍼즐",
        mode_station_desc: "프리토리아부터 케이프타운까지 6개 정차역을 지리적 순서대로 배치하세요.",
        mode_coach_title: "럭셔리 열차 객차 배치 순서",
        mode_coach_desc: "선두 기관차부터 후미 전망 발코니까지 객차를 차례대로 정렬하세요.",
        clear_slots: "슬롯 초기화",
        verify_sequence: "순서 검증",
        perfect_assembly: "완벽한 조립! +150 점 획득.",
        incomplete_assembly: "미완성 조립",
        fill_all_slots: "검증하기 전에 모든 슬롯을 채워주세요.",
        not_quite_right: "순서가 정확하지 않습니다",
        pieces: {
          Pretoria: "프리토리아",
          Kimberley: "킴벌리",
          "De Aar": "디 아르",
          "Beaufort West": "보포트 웨스트",
          Matjiesfontein: "마키스폰테인",
          "Cape Town": "케이프타운",
          "Locomotive Engine": "기관차 엔진",
          "Luxury Sleeper Suite": "럭셔리 침대 스위트",
          "Dining Saloon": "식당차",
          "Lounge Car": "라운지 차",
          "Observation Carriage": "전망 객차"
        }
      },
      hi: {
        slot_label: "स्लॉट",
        drop_here: "यहाँ रखें",
        switch_mode_coach: "बदलें: कोच क्रम",
        switch_mode_station: "बदलें: स्टेशन क्रम",
        mode_station_title: "प्रिटोरिया से केप टाउन रूट असेंबलर",
        mode_station_desc: "प्रिटोरिया से केप टाउन तक 6 कॉरिडोर स्टॉप को सही भौगोलिक क्रम में रखें।",
        mode_coach_title: "लक्जरी ट्रेन कोच असेंबली क्रम",
        mode_coach_desc: "फ्रंट इंजन से लेकर रियर ऑब्जर्वेशन बालकनी तक लक्जरी डिब्बों को व्यवस्थित करें।",
        clear_slots: "स्लॉट साफ़ करें",
        verify_sequence: "क्रम सत्यापित करें",
        perfect_assembly: "परफेक्ट असेंबली! +150 अंक प्राप्त।",
        incomplete_assembly: "अधूरी असेंबली",
        fill_all_slots: "सत्यापित करने से पहले सभी स्लॉट भरें।",
        not_quite_right: "क्रम सही नहीं है",
        pieces: {
          Pretoria: "प्रिटोरिया",
          Kimberley: "किम्बरली",
          "De Aar": "डी आर",
          "Beaufort West": "बोफोर्ट वेस्ट",
          Matjiesfontein: "मैटजीसफॉन्टेन",
          "Cape Town": "केप टाउन",
          "Locomotive Engine": "लोकोमोटिव इंजन",
          "Luxury Sleeper Suite": "लक्जरी स्लीपर सुइट",
          "Dining Saloon": "डाइनिंग कार",
          "Lounge Car": "लाउंज कार",
          "Observation Carriage": "ऑब्जर्वेशन कार"
        }
      },
      ru: {
        slot_label: "Слот",
        drop_here: "Поместить Сюда",
        switch_mode_coach: "Переключить: Вагоны",
        switch_mode_station: "Переключить: Сتانции",
        mode_station_title: "Конструктор Маршрута Претория — Кейптаун",
        mode_station_desc: "Расставьте 6 остановок коридора в географическом порядке от Претории до Кейптауна.",
        mode_coach_title: "Порядок Вагонов Поезда ЛЮКС",
        mode_coach_desc: "Расставьте роскошные вагоны от головного локомотива до смотрового балкона.",
        clear_slots: "Очистить Слоты",
        verify_sequence: "Проверить Порядок",
        perfect_assembly: "Идеальная Сборка! +150 Очков Начислено.",
        incomplete_assembly: "Незавершенная Сборка",
        fill_all_slots: "Пожалуйста, заполните все слоты перед проверкой.",
        not_quite_right: "Порядок Не Совсем Верный",
        pieces: {
          Pretoria: "Претория",
          Kimberley: "Кимберли",
          "De Aar": "Де-Аар",
          "Beaufort West": "Бофорт-Уэст",
          Matjiesfontein: "Матжисфонтейн",
          "Cape Town": "Кейптаун",
          "Locomotive Engine": "Локомотив Engine",
          "Luxury Sleeper Suite": "Роскошный Спальный Вагон",
          "Dining Saloon": "Вагон-Ресторан",
          "Lounge Car": "Вагон-Салон",
          "Observation Carriage": "Обзорный Вагон"
        }
      },
      ar: {
        slot_label: "خانة",
        drop_here: "ضع هنا",
        switch_mode_coach: "تبديل: ترتيب العربات",
        switch_mode_station: "تبديل: ترتيب المحطات",
        mode_station_title: "مجمع مسار بريتوريا إلى كيب تاون",
        mode_station_desc: "ضع محطات الممر الـ 6 بالترتيب الجغرافي من بريتوريا إلى كيب تاون.",
        mode_coach_title: "ترتيب عربات القطار الفاخر",
        mode_coach_desc: "رتب العربات الفاخرة من القاطرة الأمامية إلى شرفة المشاهدة الخلفية.",
        clear_slots: "إفرغ الخانات",
        verify_sequence: "التحقق من الترتيب",
        perfect_assembly: "تجميع مثالي! تم منح +150 نقطة.",
        incomplete_assembly: "تجميع غير مكتمل",
        fill_all_slots: "يرجى ملء جميع الخانات قبل التحقق.",
        not_quite_right: "الترتيب غير صحيح تمامًا",
        pieces: {
          Pretoria: "بريتوريا",
          Kimberley: "كيمبرلي",
          "De Aar": "دي آر",
          "Beaufort West": "بوفورت ويست",
          Matjiesfontein: "ماتجيسفونتين",
          "Cape Town": "كيب تاون",
          "Locomotive Engine": "محرك القاطرة",
          "Luxury Sleeper Suite": "مقصورة النوم الفاخرة",
          "Dining Saloon": "عربة المطعم",
          "Lounge Car": "عربة الاستراحة",
          "Observation Carriage": "عربة المشاهدة البانورامية"
        }
      }
    };

    function getBingoPack() {
      const lang = window.TrackTalesLanguageCode || 'en';
      return BINGO_TRANSLATIONS[lang] || BINGO_TRANSLATIONS.en;
    }

    function getPuzzlePack() {
      const lang = window.TrackTalesLanguageCode || 'en';
      return PUZZLE_TRANSLATIONS[lang] || PUZZLE_TRANSLATIONS.en;
    }

    function getPuzzlePieceName(pieceName) {
      const pack = getPuzzlePack();
      return (pack.pieces && pack.pieces[pieceName]) ? pack.pieces[pieceName] : pieceName;
    }

    function initBingoGrid() {
      if (!bingoGridContainer) return;
      bingoWon = false;
      if (bingoWinBanner) bingoWinBanner.classList.add('hidden');
      const pack = getBingoPack();

      bingoGridContainer.innerHTML = BINGO_ITEMS.map((item, idx) => {
        const isMarked = bingoState[idx];
        const itemTr = (pack.items && pack.items[item.id]) ? pack.items[item.id] : item;
        const labelText = itemTr.label || item.label;
        const stampText = idx === 4 ? pack.free_stamp : (isMarked ? pack.stamped : pack.tap_to_stamp);
        return `
          <button type="button" data-bingo-idx="${idx}" class="bingo-cell p-3 sm:p-4 rounded-2xl border-2 ${isMarked ? 'marked' : 'border-[#E7E2D8] bg-white hover:border-[#D99B26]/60'} flex flex-col items-center justify-center text-center transition-all cursor-pointer aspect-square shadow-sm">
            <div class="w-8 h-8 rounded-full ${isMarked ? 'bg-white/20 text-white' : 'bg-[#D99B26]/10 text-[#D99B26]'} flex items-center justify-center mb-1.5">
              <i data-lucide="${item.icon}" class="w-4 h-4"></i>
            </div>
            <strong class="text-[11px] sm:text-xs font-heading font-bold leading-tight ${isMarked ? 'text-white' : 'text-[#0A0C10]'}">${labelText}</strong>
            <span class="text-[9px] font-mono ${isMarked ? 'text-white/90' : 'text-[#78716C]'} mt-0.5">${stampText}</span>
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

    function updateBingoStatus() {
      const count = bingoState.filter(Boolean).length;
      const pack = getBingoPack();
      if (bingoMarkedCountEl) bingoMarkedCountEl.textContent = count;
      if (bingoStatusTextEl && !bingoWon) {
        bingoStatusTextEl.textContent = count > 0 ? `${count} ${pack.status_stamped}` : pack.status_default;
      }
    }

    window.TrackTalesRenderBingo = () => initBingoGrid();

    const PUZZLE_MODES = [
      {
        id: 'station',
        titleKey: 'mode_station_title',
        descKey: 'mode_station_desc',
        defaultTitle: 'Pretoria to Cape Town Route Assembler',
        defaultDesc: 'Place the 6 corridor stops in geographic order from Departure Hub (Pretoria) to Atlantic Terminus (Cape Town).',
        pool: ['Matjiesfontein', 'Kimberley', 'Cape Town', 'Pretoria', 'Beaufort West', 'De Aar'],
        correctSequence: ['Pretoria', 'Kimberley', 'De Aar', 'Beaufort West', 'Matjiesfontein', 'Cape Town'],
        triviaUnlock: 'Unlocked: The Pretoria to Cape Town rail corridor was completed in 1890, connecting the Highveld goldfields directly to Table Bay.'
      },
      {
        id: 'route',
        titleKey: 'mode_coach_title',
        descKey: 'mode_coach_desc',
        defaultTitle: 'Flagship Locomotive Coach Sequence',
        defaultDesc: 'Arrange the luxury train carriages from front engine to rear observation balcony.',
        pool: ['Observation Carriage', 'Dining Saloon', 'Locomotive Engine', 'Lounge Car', 'Luxury Sleeper Suite'],
        correctSequence: ['Locomotive Engine', 'Luxury Sleeper Suite', 'Dining Saloon', 'Lounge Car', 'Observation Carriage'],
        triviaUnlock: 'Unlocked: The rear observation carriage features panoramic windows and an open-air balcony designed for Karoo sunsets!'
      }
    ];

    let currentPuzzleModeIdx = 0;
    let puzzleUserSlots = [];
    let puzzleAvailablePieces = [];

    function initPuzzleSequence() {
      if (!PUZZLE_MODES || PUZZLE_MODES.length === 0) return;
      const mode = PUZZLE_MODES[currentPuzzleModeIdx];
      if (!mode) return;
      const pack = getPuzzlePack();

      if (puzzleModeLabel) puzzleModeLabel.textContent = mode.id === 'route' ? pack.switch_mode_coach : pack.switch_mode_station;
      if (puzzleObjTitle) puzzleObjTitle.textContent = pack[mode.titleKey] || mode.defaultTitle;
      if (puzzleObjDesc) puzzleObjDesc.textContent = pack[mode.descKey] || mode.defaultDesc;
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
      const pack = getPuzzlePack();

      // Render Target Slots
      if (puzzleTargetSlots) {
        puzzleTargetSlots.innerHTML = puzzleUserSlots.map((item, idx) => `
          <button type="button" data-slot-idx="${idx}" class="puzzle-slot p-3 rounded-2xl border-2 ${item ? 'border-[#4A52B0] bg-[#4A52B0]/10' : 'border-dashed border-black/20 bg-black/[0.02]'} flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[75px]">
            <span class="text-[9px] font-mono uppercase font-bold text-[#78716C] mb-1">${pack.slot_label} ${idx + 1}</span>
            <strong class="text-xs font-heading font-bold ${item ? 'text-[#4A52B0]' : 'text-[#A8A29E]'}">
              ${item ? getPuzzlePieceName(item) : pack.drop_here}
            </strong>
          </button>
        `).join('');

        puzzleTargetSlots.querySelectorAll('.puzzle-slot').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-slot-idx'), 10);
            const val = puzzleUserSlots[idx];
            if (val) {
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
            <span>${getPuzzlePieceName(piece)}</span>
          </button>
        `).join('');

        if (window.lucide) lucide.createIcons();

        puzzlePiecesPool.querySelectorAll('.puzzle-item').forEach(btn => {
          btn.addEventListener('click', () => {
            const pieceIdx = parseInt(btn.getAttribute('data-piece-idx'), 10);
            const piece = puzzleAvailablePieces[pieceIdx];
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

    window.TrackTalesRenderPuzzle = () => initPuzzleSequence();

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




