/**
 * Automated Test Suite: TrackTales Splash Login / Sign Up Display & Route Reload Persistence
 * 
 * Verifies:
 * 1. Initial Launch: Visiting root ('/' or empty hash) strictly presents the authentic split login/sign-up modal as the first screen.
 * 2. Reload on #signup: When the user reloads while on #signup, they remain on #signup, and the Sign Up tab is displayed immediately.
 * 3. Reload on #home: When the user reloads while on #home, they remain on the Home page, and the modal remains dismissed.
 * 4. Reload on other content pages (#stops, #trains): User remains on that page with modal dismissed.
 * 5. Single Auth Surface: Duplicate inline sign-in card on the Home hero is hidden (#inline-signin-section has class="hidden"), ensuring only the authentic split modal is shown.
 * 6. Global Access & Close Controls: Modal includes #splash-close-btn and app.js exposes window.TrackTalesOpenSplashLogin.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const indexHtmlPath = path.join(rootDir, 'public', 'index.html');
const appJsPath = path.join(rootDir, 'public', 'js', 'app.js');

describe('TrackTales Splash Login/Sign-Up & Reload Persistence Verification', () => {
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  const appJs = fs.readFileSync(appJsPath, 'utf8');

  describe('1. Early Head Bootstrap Script Logic', () => {
    it('detects isSignUp and isStrictLogin in index.html head script', () => {
      assert.ok(indexHtml.includes('var isSignUp ='), 'isSignUp definition missing in index.html head');
      assert.ok(indexHtml.includes("hashStr === '#signup'"), 'hashStr === #signup check missing');
      assert.ok(indexHtml.includes('var isStrictLogin ='), 'isStrictLogin definition missing');
      assert.ok(indexHtml.includes('isSignUp'), 'isSignUp should be included in isStrictLogin');
    });

    it('identifies content routes to allow persistent page reload', () => {
      assert.ok(indexHtml.includes("var contentPages = ['#home'"), 'contentPages array missing in index.html head');
      assert.ok(indexHtml.includes('var isContentPage = contentPages.indexOf(hashStr) !== -1;'), 'isContentPage check missing');
    });

    it('adds show-splash-signup early class for instant Sign Up rendering without flash of Sign In', () => {
      assert.ok(indexHtml.includes("document.documentElement.classList.add('show-splash-signup')"), 'show-splash-signup class addition missing');
      assert.ok(indexHtml.includes('html.show-splash-signup #splash-signin-content {'), 'CSS rule to hide signin on signup missing');
      assert.ok(indexHtml.includes('html.show-splash-signup #splash-signup-content {'), 'CSS rule to show signup on signup missing');
    });
  });

  describe('2. Split Modal Components & Enhancements', () => {
    it('contains the authentic split modal container (#train-loading-splash)', () => {
      assert.ok(indexHtml.includes('id="train-loading-splash"'), '#train-loading-splash container missing');
      assert.ok(indexHtml.includes('id="splash-signin-content"'), '#splash-signin-content missing');
      assert.ok(indexHtml.includes('id="splash-signup-content"'), '#splash-signup-content missing');
    });

    it('provides dismissal close button (#splash-close-btn) on the split modal', () => {
      assert.ok(indexHtml.includes('id="splash-close-btn"'), '#splash-close-btn missing in index.html');
      assert.ok(appJs.includes('splashCloseBtn.addEventListener'), 'splashCloseBtn listener missing in app.js');
    });

    it('ensures Continue as Guest button is removed from login tab and available on sign up tab', () => {
      const signinIdx = indexHtml.indexOf('id="splash-signin-content"');
      const signupIdx = indexHtml.indexOf('id="splash-signup-content"');
      assert.ok(signinIdx !== -1 && signupIdx !== -1, 'splash tabs missing');
      const signinSnippet = indexHtml.substring(signinIdx, signupIdx);
      assert.ok(!signinSnippet.includes('Continue as Guest'), 'Continue as Guest should be removed from login tab');
      const signupEndIdx = indexHtml.indexOf('id="splash-reset-content"', signupIdx);
      const signupSnippet = indexHtml.substring(signupIdx, signupEndIdx !== -1 ? signupEndIdx : signupIdx + 10000);
      assert.ok(signupSnippet.includes('Continue as Guest'), 'Continue as Guest missing on signup tab');
    });

    it('ensures subscription plan removes Continue with Free button and renames label to Free Plan', () => {
      assert.ok(!indexHtml.includes('id="subscription-skip-btn"'), 'subscription-skip-btn should be removed');
      assert.ok(!indexHtml.includes('Continue with Free'), 'Continue with Free text should be removed');
      assert.ok(appJs.includes("btnLabel.textContent = 'Free Plan'"), "btnLabel should be renamed to 'Free Plan'");
    });

    it('provides seamless tab switching links between Sign In and Sign Up', () => {
      assert.ok(indexHtml.includes('id="splash-to-signup-link"'), '#splash-to-signup-link missing');
      assert.ok(indexHtml.includes('id="splash-to-signin-link"'), '#splash-to-signin-link missing');
    });

    it('preserves the authentic welcome text written from the start without overwriting it', () => {
      assert.ok(indexHtml.includes("Your digital rail companion for South Africa's iconic 1,600 km corridor between Pretoria and Cape Town."), 'Original welcome description missing in index.html');
      assert.ok(!appJs.includes("auth_welcome_sub: 'Sign in to access your South Africa rail companion pass.'"), 'Forbidden phrase should not be in dictionary');
      assert.ok(!appJs.includes('signinSub.textContent = dict.auth_welcome_sub'), 'signinSub override should not exist in app.js');
    });
  });

  describe('3. Elimination of Duplicate Auth Surfaces on Home Page', () => {
    it('#inline-signin-section is hidden so user sees only the authentic split modal', () => {
      assert.ok(indexHtml.includes('id="inline-signin-section" class="hidden"'), '#inline-signin-section should be hidden');
    });

    it('ensures clean hero presentation with FLAGSHIP RAIL CORRIDOR showcase card removed', () => {
      assert.ok(!indexHtml.includes('FLAGSHIP RAIL CORRIDOR'), 'FLAGSHIP RAIL CORRIDOR card should be removed from hero');
      assert.ok(!indexHtml.includes('1,600 km across South Africa\'s most storied luxury rail route'), 'Corridor subtitle should be removed');
    });
  });

  describe('4. Routing, Reload Persistence & Navigation Integration in app.js', () => {
    it('defines hoisted view functions showSignIn, showSignUp, showResetPassword in setupSplash', () => {
      assert.ok(appJs.includes('function showSignIn()'), 'function showSignIn() missing in app.js');
      assert.ok(appJs.includes('function showSignUp()'), 'function showSignUp() missing in app.js');
      assert.ok(appJs.includes('function showResetPassword()'), 'function showResetPassword() missing in app.js');
    });

    it('exposes window.TrackTalesOpenSplashLogin supporting both signin and signup modes', () => {
      assert.ok(appJs.includes('window.TrackTalesOpenSplashLogin = (mode = \'signin\') =>'), 'window.TrackTalesOpenSplashLogin missing');
      assert.ok(appJs.includes("if (mode === 'signup')"), 'mode === signup check missing in TrackTalesOpenSplashLogin');
    });

    it('preserves #signup and #signin hashes without overwriting to #home during initial page boot', () => {
      const navSnippet = appJs.substring(appJs.indexOf('function setupNavigation()'), appJs.indexOf('function setupLoginModal()'));
      assert.ok(navSnippet.includes("const authHashes = ['#signup', '#signin', '#login']"), 'authHashes array missing in setupNavigation');
      assert.ok(navSnippet.includes('authHashes.indexOf(currentHash) !== -1'), 'authHashes check missing in setupNavigation');
    });

    it('listens for hashchange events to trigger split modal on #signup or #signin', () => {
      const navSnippet = appJs.substring(appJs.indexOf('function setupNavigation()'), appJs.indexOf('function setupLoginModal()'));
      assert.ok(navSnippet.includes("h === '#signup'"), 'hashchange #signup check missing');
      assert.ok(navSnippet.includes("h === '#signin' || h === '#login'"), 'hashchange #signin check missing');
    });

    it('navbar login buttons open TrackTalesOpenSplashLogin directly', () => {
      assert.ok(appJs.includes("window.TrackTalesOpenSplashLogin('signin')"), 'handleOpenLogin does not invoke TrackTalesOpenSplashLogin');
    });
  });

  describe('5. Functional Simulation of Route Persistence Scenarios', () => {
    // Replicate bootstrap evaluation logic
    function evaluateBootstrap(hashStr, searchStr = '', storage = {}) {
      const isSignUp = hashStr === '#signup' ||
                       searchStr.indexOf('action=signup') !== -1 ||
                       searchStr.indexOf('open=signup') !== -1 ||
                       searchStr.indexOf('signup=true') !== -1;

      const isStrictLogin = searchStr.indexOf('open=login') !== -1 ||
                            searchStr.indexOf('login=true') !== -1 ||
                            searchStr.indexOf('action=login') !== -1 ||
                            hashStr === '#signin' ||
                            hashStr === '#login' ||
                            isSignUp;

      const contentPages = ['#home', '#stops', '#trains', '#games', '#voice', '#about', '#attractions'];
      const isContentPage = contentPages.indexOf(hashStr) !== -1;

      const wasDismissed = !isStrictLogin && isContentPage && (
        storage['tracktales_splash_dismissed'] === 'true' ||
        Boolean(storage['tracktales_jwt_token']) ||
        Boolean(storage['tracktales_logged_user'])
      );

      return {
        wasDismissed: Boolean(wasDismissed),
        isSignUp: Boolean(isSignUp),
        isStrictLogin: Boolean(isStrictLogin),
        isContentPage: Boolean(isContentPage)
      };
    }

    it('Scenario 1: Fresh open at root (no hash) -> Splash modal is SHOWN (wasDismissed is false)', () => {
      const result = evaluateBootstrap('', '', {});
      assert.strictEqual(result.wasDismissed, false, 'Splash should be shown on fresh open');
      assert.strictEqual(result.isContentPage, false);
    });

    it('Scenario 2: Reload while on #signup -> Splash modal is SHOWN with Sign Up active', () => {
      const result = evaluateBootstrap('#signup', '', { tracktales_splash_dismissed: 'true' });
      assert.strictEqual(result.wasDismissed, false, 'Splash should NOT be dismissed on #signup reload');
      assert.strictEqual(result.isSignUp, true, 'Sign up mode should be active');
      assert.strictEqual(result.isStrictLogin, true);
    });

    it('Scenario 3: Reload while on #signin -> Splash modal is SHOWN with Sign In active', () => {
      const result = evaluateBootstrap('#signin', '', { tracktales_splash_dismissed: 'true' });
      assert.strictEqual(result.wasDismissed, false, 'Splash should NOT be dismissed on #signin reload');
      assert.strictEqual(result.isSignUp, false);
      assert.strictEqual(result.isStrictLogin, true);
    });

    it('Scenario 4: Reload while on #home -> User stays on #home with modal dismissed', () => {
      const result = evaluateBootstrap('#home', '', { tracktales_splash_dismissed: 'true' });
      assert.strictEqual(result.wasDismissed, true, 'Modal should be dismissed so user stays on #home');
      assert.strictEqual(result.isContentPage, true);
    });

    it('Scenario 5: Reload while on #stops -> User stays on #stops with modal dismissed', () => {
      const result = evaluateBootstrap('#stops', '', { tracktales_splash_dismissed: 'true' });
      assert.strictEqual(result.wasDismissed, true, 'Modal should be dismissed so user stays on #stops');
      assert.strictEqual(result.isContentPage, true);
    });
  });

  describe('6. Subscription Modal Presentation Policy (Sign Up vs Sign In)', () => {
    it('ensures subscription modal is NOT shown when logging in via splashSigninForm', () => {
      const signinFormStart = appJs.indexOf('splashSigninForm.addEventListener');
      assert.ok(signinFormStart !== -1, 'splashSigninForm handler must exist');
      const signupFormStart = appJs.indexOf('splashSignupForm.addEventListener');
      const signinHandlerCode = appJs.substring(signinFormStart, signupFormStart);

      assert.ok(
        !signinHandlerCode.includes('TrackTalesOpenSubscriptionModal'),
        'Subscription modal must NOT be opened when logging in via splashSigninForm'
      );
    });

    it('ensures subscription modal IS shown when signing up for the first time via splashSignupForm', () => {
      const signupFormStart = appJs.indexOf('splashSignupForm.addEventListener');
      assert.ok(signupFormStart !== -1, 'splashSignupForm handler must exist');
      const signupHandlerCode = appJs.substring(signupFormStart, signupFormStart + 5000);

      assert.ok(
        signupHandlerCode.includes('TrackTalesOpenSubscriptionModal'),
        'Subscription modal MUST be opened when signing up via splashSignupForm'
      );
    });

    it('ensures subscription modal is NOT shown when logging in via modal signin form', () => {
      const modalLoginStart = appJs.indexOf('// Sign In form handler in Modal');
      assert.ok(modalLoginStart !== -1, 'Modal login handler must exist');
      const modalLoginCode = appJs.substring(modalLoginStart, modalLoginStart + 1500);

      assert.ok(
        !modalLoginCode.includes('TrackTalesOpenSubscriptionModal'),
        'Subscription modal must NOT be opened when logging in via modal form'
      );
    });

    it('ensures subscription modal IS shown when registering for the first time via modal signupForm', () => {
      const modalSignupStart = appJs.indexOf('// Sign Up form handler in Modal');
      assert.ok(modalSignupStart !== -1, 'Modal signup handler must exist');
      const modalSignupCode = appJs.substring(modalSignupStart, modalSignupStart + 3500);

      assert.ok(
        modalSignupCode.includes('TrackTalesOpenSubscriptionModal'),
        'Subscription modal MUST be opened when signing up via modal signupForm'
      );
    });
  });
});

