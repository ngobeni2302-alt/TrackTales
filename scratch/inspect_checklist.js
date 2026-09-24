const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf-8');
const js = fs.readFileSync('public/js/app.js', 'utf-8');
const css = fs.readFileSync('public/css/styles.css', 'utf-8');

console.log('=== DETAILED CHECKLIST EVALUATION ===\n');

// 1. Auth Flow
console.log('--- 1. AUTHENTICATION FLOW ---');
const modalFirst = /id="authModal"|id="loginModal"/i.test(html);
const requireAuth = js.includes('requireAuth') || js.includes('showAuthModalFirst') || /localStorage\.getItem\(['"]tracktales_user['"]\)/.test(js);
console.log('1.1 Sign in FIRST before anything:', requireAuth);

const trainInAuth = html.includes('auth-train-select') || /id="auth-train"/i.test(html) || /choose train/i.test(html) && /login/i.test(html);
console.log('1.2 Choose train on sign in:', trainInAuth);

const homeShowsTrain = js.includes('TrackTalesSetSelectedTrain') || js.includes('updateSelectedTrainView') || html.includes('nav-train-badge');
console.log('1.3 Home shows relevant train chosen:', homeShowsTrain);

const stopsFilterTrain = js.includes('renderStopsForTrain') || js.includes('CORRIDOR_STOPS') || /filteredStops/i.test(js);
console.log('1.4 Stops are based on train chosen on signing in:', stopsFilterTrain);


// 2. Home Page
console.log('\n--- 2. HOME PAGE ---');
const panelTrack = html.includes('rail-track') || css.includes('rail-track') || js.includes('railTrack') || html.includes('id="moving-panel"');
console.log('2.1 Panel that moves out onto a rail track:', panelTrack);

const relevantVideo = js.includes('TRAIN_VIDEOS') || js.includes('heroVideo.src') || /setVideoForTrain/i.test(js) || html.includes('hero-bg-video');
console.log('2.2 Use the relevant train video:', relevantVideo);


// 3. UI Fixes to Remove
console.log('\n--- 3. UI FIXES TO REMOVE ---');
const fogRemoved = !html.includes('id="fog-overlay"') && !css.includes('.fog-overlay') && !html.includes('class="fog"');
console.log('3.1 Fogginess must be removed:', fogRemoved);

const scrollExploreRemoved = !html.toLowerCase().includes('scroll to explore');
console.log('3.2 Remove "Scroll to explore":', scrollExploreRemoved);

const unmutePauseRemoved = !html.includes('id="btn-unmute"') && !html.includes('id="btn-pause-video"') && !html.includes('Unmute & Pause');
console.log('3.3 Remove unmute and pause:', unmutePauseRemoved);

const hackathonTextRemoved = !html.toLowerCase().includes('hackathon') && html.includes('<footer');
console.log('3.4 Footer — remove Hackathon text (keep navigation):', hackathonTextRemoved);

const scanEmojis = (str) => {
  const emojiRegex = /[\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const matches = str.match(emojiRegex) || [];
  return matches.filter(e => e === '🚂' || e === '🚆' || e === '🚈' || e === '🚞');
};
const trainEmojisFound = scanEmojis(html).length + scanEmojis(js).length;
console.log('3.5 Train emoji must be removed (Found:', trainEmojisFound, 'train emojis):', trainEmojisFound === 0);


// 4. Route / Stops Logic
console.log('\n--- 4. ROUTE / STOPS LOGIC ---');
const heritageRemoved = !html.toLowerCase().includes('st rail heritage corridor steps');
console.log('4.1 Remove ST Rail Heritage Corridor Steps:', heritageRemoved);

const scheduleAndRoute = html.includes('corridor-stops-grid') && (html.includes('Schedule') || js.includes('schedule'));
console.log('4.2 Keep only: Schedule stop and relevant route:', scheduleAndRoute);

const textChanging = js.includes('updateStopContent') || js.includes('renderStops') || js.includes('textContent');
console.log('4.3 Text must be changing:', textChanging);

const touchStopOpenVideo = js.includes('openStopModal') || js.includes('playStopVideoOnlyOnTouch') || js.includes('sight-video-modal');
console.log('4.4 When a stop or sight is touched, it must open and only then video plays:', touchStopOpenVideo);


// 5. Stories Section
console.log('\n--- 5. STORIES SECTION ---');
const storiesAttractions = html.includes('id="stories"') && (html.includes('attraction') || js.includes('attraction') || js.includes('renderStories'));
console.log('5.1 Stories is where attractions are going:', storiesAttractions);


// 6. Games Based on Stops
console.log('\n--- 6. GAMES BASED ON STOPS ---');
const puzzleGame = html.includes('data-game-tab="puzzle"') && js.includes('PUZZLE_MODES');
console.log('6.1 Build next stop via puzzle:', puzzleGame);

const bingoGame = html.includes('data-game-tab="bingo"') && js.includes('BINGO_ITEMS');
console.log('6.2 Bingo:', bingoGame);

const addQuizGame = html.includes('id="custom-quiz-form"') || js.includes('addCustomQuizQuestion') || html.includes('Add Quiz');
console.log('6.3 Add Quiz:', addQuizGame);


// 7. New Features / Business
console.log('\n--- 7. NEW FEATURES / BUSINESS ---');
const problemSolved = /problem being solved/i.test(html) || /problem-solved-modal/i.test(html) || /problem/i.test(html) && /solved/i.test(html);
console.log('7.1 Must show: Problem being solved:', problemSolved);

const investorsPotential = /investor/i.test(html) || /investors-modal/i.test(html) || /potential investors/i.test(html);
console.log('7.2 Must show: Investors (potential):', investorsPotential);

const blindAccessible = html.includes('id="accessibilityModal"') && js.includes('SpeechSynthesisUtterance');
console.log('7.3 Make it usable for blind people:', blindAccessible);

const differentLangs = html.includes('id="lang-select"') && js.includes('setupMultiLanguage');
console.log('7.4 Different languages:', differentLangs);

const emergencyHotline = html.includes('id="emergencyModal"') && js.includes('setupEmergencyHotlines');
console.log('7.5 Include emergency hotline:', emergencyHotline);

const businessAdvertising = /advertising/i.test(html) || /sponsor/i.test(html) || /ad-partner/i.test(html);
console.log('7.6 Approach businesses for advertising:', businessAdvertising);

const localCommission = /commission/i.test(html) || /propose-business/i.test(html) || /local-business-modal/i.test(html);
console.log('7.7 Propose local business for commission:', localCommission);

const monetizeResearch = /monetiz/i.test(html) || /revenue model/i.test(html) || /monetization/i.test(html) || js.includes('monetization');
console.log('7.8 Research how to monetize app for investors:', monetizeResearch);

const timeVisitProblem = /time to visit/i.test(html) || /get time to visit/i.test(html);
console.log('7.9 Problem to solve: Where will they get time to visit local businesses:', timeVisitProblem);
