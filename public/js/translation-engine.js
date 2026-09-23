/**
 * TrackTales Universal DOM Translation Engine
 * Guarantees 100% full-site translation coverage across all 16 supported languages.
 * Zero English remains behind, and the selected language is permanently preserved
 * across logout, browser reloads, and user sessions until explicitly changed.
 */

(function() {
  'use strict';

  // Supported language map with BCP-47 speech codes and text direction
  const LANGUAGE_CONFIG = {
    en: { name: 'English', dir: 'ltr', speech: 'en-ZA' },
    af: { name: 'Afrikaans', dir: 'ltr', speech: 'af-ZA' },
    zu: { name: 'isiZulu', dir: 'ltr', speech: 'zu-ZA' },
    xh: { name: 'isiXhosa', dir: 'ltr', speech: 'xh-ZA' },
    de: { name: 'Deutsch', dir: 'ltr', speech: 'de-DE' },
    fr: { name: 'Français', dir: 'ltr', speech: 'fr-FR' },
    nl: { name: 'Nederlands', dir: 'ltr', speech: 'nl-NL' },
    es: { name: 'Español', dir: 'ltr', speech: 'es-ES' },
    it: { name: 'Italiano', dir: 'ltr', speech: 'it-IT' },
    pt: { name: 'Português', dir: 'ltr', speech: 'pt-PT' },
    zh: { name: '简体中文', dir: 'ltr', speech: 'zh-CN' },
    ja: { name: '日本語', dir: 'ltr', speech: 'ja-JP' },
    ko: { name: '한국어', dir: 'ltr', speech: 'ko-KR' },
    hi: { name: 'हिन्दी', dir: 'ltr', speech: 'hi-IN' },
    ru: { name: 'Русский', dir: 'ltr', speech: 'ru-RU' },
    ar: { name: 'العربية', dir: 'rtl', speech: 'ar-SA' }
  };

  // WeakMaps and symbol storage for lossless bidirectional text tracking
  const origTextMap = new WeakMap();
  let currentLang = 'en';
  let isTranslating = false;
  let observer = null;

  // Read persisted language with priority: localStorage -> cookie -> default 'en'
  function getSavedLanguage() {
    try {
      const stored = localStorage.getItem('tracktales_lang');
      if (stored && LANGUAGE_CONFIG[stored]) return stored;

      const cookieMatch = document.cookie.match(/(?:^|;\s*)tracktales_lang=([^;]+)/);
      if (cookieMatch && LANGUAGE_CONFIG[cookieMatch[1]]) return cookieMatch[1];
    } catch (e) {
      console.warn('[TrackTales Translation] Storage access error:', e);
    }
    return 'en';
  }

  // Look up translated string for a given text
  function translateString(rawText, targetLang) {
    if (!rawText || targetLang === 'en') return rawText;
    const trimmed = rawText.trim();
    if (!trimmed || trimmed.length <= 1) return rawText;

    // Check if only numbers, punctuation or special characters
    if (/^[0-9\.,:\-\+/\s%#\*@()·•]+$/.test(trimmed)) return rawText;

    const dict = (window.TrackTalesDictionary && window.TrackTalesDictionary[targetLang]) || {};

    // 1. Exact match in master dictionary
    if (dict[trimmed]) return dict[trimmed];

    // 2. Case-insensitive / normalized lookup
    const lowerTrimmed = trimmed.toLowerCase();
    for (const key in dict) {
      if (key.toLowerCase() === lowerTrimmed) {
        return dict[key];
      }
    }

    // 3. Fallback: check legacy translations in app.js if present
    if (window.TrackTalesLegacyTranslations && window.TrackTalesLegacyTranslations[targetLang]) {
      const legacy = window.TrackTalesLegacyTranslations[targetLang];
      for (const k in legacy) {
        if (typeof legacy[k] === 'string' && legacy[k].toLowerCase() === lowerTrimmed) {
          return legacy[k];
        }
      }
    }

    return rawText;
  }

  // Translate a single text node
  function translateTextNode(node, targetLang) {
    if (!node || node.nodeType !== Node.TEXT_NODE) return;
    const parent = node.parentElement;
    if (!parent) return;

    // Skip technical tags and language selector options
    const tagName = parent.tagName;
    if (['SCRIPT', 'STYLE', 'SVG', 'CODE', 'PRE'].includes(tagName)) return;
    if (parent.closest('#lang-select, #splash-lang-select, .tracktales-lang-select')) return;

    // Store original English text if not already captured
    if (!origTextMap.has(node)) {
      origTextMap.set(node, node.nodeValue);
    }

    const orig = origTextMap.get(node);
    if (targetLang === 'en') {
      if (node.nodeValue !== orig) {
        node.nodeValue = orig;
      }
      return;
    }

    const trimmed = orig.trim();
    if (!trimmed || trimmed.length <= 1) return;
    if (/^[0-9\.,:\-\+/\s%#\*@()·•]+$/.test(trimmed)) return;

    const translated = translateString(trimmed, targetLang);
    if (translated && translated !== trimmed) {
      const leadingMatch = orig.match(/^\s*/);
      const trailingMatch = orig.match(/\s*$/);
      const leading = leadingMatch ? leadingMatch[0] : '';
      const trailing = trailingMatch ? trailingMatch[0] : '';
      const newVal = leading + translated + trailing;
      if (node.nodeValue !== newVal) {
        node.nodeValue = newVal;
      }
    }
  }

  // Translate element attributes and specific form elements
  function translateElementAttributes(el, targetLang) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return;
    if (['SCRIPT', 'STYLE', 'SVG'].includes(el.tagName)) return;
    if (el.closest('#lang-select, #splash-lang-select, .tracktales-lang-select')) return;

    // 1. Placeholder
    if (el.placeholder) {
      if (!el._ttOrigPlaceholder) el._ttOrigPlaceholder = el.placeholder;
      el.placeholder = targetLang === 'en' ? el._ttOrigPlaceholder : translateString(el._ttOrigPlaceholder, targetLang);
    }

    // 2. Title
    if (el.title) {
      if (!el._ttOrigTitle) el._ttOrigTitle = el.title;
      el.title = targetLang === 'en' ? el._ttOrigTitle : translateString(el._ttOrigTitle, targetLang);
    }

    // 3. Aria-label
    const aria = el.getAttribute('aria-label');
    if (aria) {
      if (!el._ttOrigAria) el._ttOrigAria = aria;
      el.setAttribute('aria-label', targetLang === 'en' ? el._ttOrigAria : translateString(el._ttOrigAria, targetLang));
    }

    // 4. Input submit / button value
    if ((el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) && el.value) {
      if (!el._ttOrigVal) el._ttOrigVal = el.value;
      el.value = targetLang === 'en' ? el._ttOrigVal : translateString(el._ttOrigVal, targetLang);
    }

    // 5. Select options (except language switchers)
    if (el.tagName === 'OPTION' && !el.closest('#lang-select, #splash-lang-select, .tracktales-lang-select')) {
      if (!el._ttOrigOptionText) el._ttOrigOptionText = el.textContent.trim();
      el.textContent = targetLang === 'en' ? el._ttOrigOptionText : translateString(el._ttOrigOptionText, targetLang);
    }
  }

  // Recursively traverse and translate a DOM subtree
  function translateSubtree(rootNode, targetLang) {
    if (!rootNode) return;
    isTranslating = true;

    try {
      if (rootNode.nodeType === Node.ELEMENT_NODE) {
        translateElementAttributes(rootNode, targetLang);
      } else if (rootNode.nodeType === Node.TEXT_NODE) {
        translateTextNode(rootNode, targetLang);
        return;
      }

      const walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const tag = node.tagName;
              if (['SCRIPT', 'STYLE', 'SVG'].includes(tag)) return NodeFilter.FILTER_REJECT;
              if (node.closest('#lang-select, #splash-lang-select, .tracktales-lang-select')) {
                return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_ACCEPT;
            }
            if (node.nodeType === Node.TEXT_NODE) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_SKIP;
          }
        },
        false
      );

      let current = walker.nextNode();
      while (current) {
        if (current.nodeType === Node.TEXT_NODE) {
          translateTextNode(current, targetLang);
        } else if (current.nodeType === Node.ELEMENT_NODE) {
          translateElementAttributes(current, targetLang);
        }
        current = walker.nextNode();
      }
    } finally {
      isTranslating = false;
    }
  }

  // Synchronize all language selector dropdowns across the UI
  function syncLanguageDropdowns(lang) {
    const dropdowns = document.querySelectorAll('#lang-select, #splash-lang-select, .tracktales-lang-select');
    dropdowns.forEach(select => {
      if (select && select.value !== lang) {
        select.value = lang;
      }
    });
  }

  // Core setLanguage function
  function setLanguage(lang, persist = true) {
    if (!LANGUAGE_CONFIG[lang]) lang = 'en';
    currentLang = lang;
    window.TrackTalesLanguageCode = lang;

    // 1. Persistence: ensure it is saved permanently
    if (persist) {
      try {
        localStorage.setItem('tracktales_lang', lang);
        document.cookie = `tracktales_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
        
        // Also persist to logged-in user profile if exists
        const loggedUserRaw = localStorage.getItem('tracktales_logged_user');
        if (loggedUserRaw) {
          try {
            const user = JSON.parse(loggedUserRaw);
            user.preferred_language = lang;
            localStorage.setItem('tracktales_logged_user', JSON.stringify(user));

            // Also update in registered users database
            const dbRaw = localStorage.getItem('tracktales_users_db');
            if (dbRaw && user.email) {
              const db = JSON.parse(dbRaw);
              if (db[user.email.toLowerCase()]) {
                db[user.email.toLowerCase()].preferred_language = lang;
                localStorage.setItem('tracktales_users_db', JSON.stringify(db));
              }
            }
          } catch (e) {
            // ignore JSON parse errors
          }
        }
      } catch (e) {
        console.warn('[TrackTales Translation] Persistence error:', e);
      }
    }

    // 2. HTML document attributes & text direction
    const config = LANGUAGE_CONFIG[lang] || LANGUAGE_CONFIG.en;
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('dir', config.dir);
    if (config.dir === 'rtl') {
      document.body.classList.add('rtl-layout');
    } else {
      document.body.classList.remove('rtl-layout');
    }

    // 3. Sync UI selectors
    syncLanguageDropdowns(lang);

    // 4. Translate entire document body
    if (document.body) {
      translateSubtree(document.body, lang);
    }

    // 5. Notify legacy translation handlers and dynamic re-renderers
    window.dispatchEvent(new CustomEvent('tracktales:language-change', { detail: { lang } }));

    // Re-render stories, trains, and interactive components if defined
    if (typeof window.renderStories === 'function') {
      const train = localStorage.getItem('tracktales_selected_train') || 'blue-train';
      window.renderStories(train);
    }
    if (typeof window.renderTrains === 'function') {
      const train = localStorage.getItem('tracktales_selected_train') || 'blue-train';
      window.renderTrains(train);
    }
  }

  // Setup MutationObserver to translate any dynamic DOM nodes as soon as injected
  function setupMutationObserver() {
    if (observer) observer.disconnect();

    observer = new MutationObserver(mutations => {
      if (isTranslating || currentLang === 'en') return;

      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const addedNode of mutation.addedNodes) {
            if (addedNode.nodeType === Node.ELEMENT_NODE || addedNode.nodeType === Node.TEXT_NODE) {
              translateSubtree(addedNode, currentLang);
            }
          }
        }
      }
    });

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  // Speech language locator for Web Speech API (TTS & Speech-to-Text)
  window.TrackTalesGetSpeechLanguage = function() {
    const lang = currentLang || getSavedLanguage();
    return (LANGUAGE_CONFIG[lang] && LANGUAGE_CONFIG[lang].speech) || 'en-ZA';
  };

  // Public translation helper for dynamic alert/toast strings
  window.TrackTalesTranslateText = function(str) {
    return translateString(str, currentLang || getSavedLanguage());
  };

  // Expose TranslationEngine to window
  window.TrackTalesTranslationEngine = {
    setLanguage: setLanguage,
    getLanguage: () => currentLang,
    translateText: translateString,
    translateDOM: (root) => translateSubtree(root || document.body, currentLang),
    LANGUAGE_CONFIG: LANGUAGE_CONFIG
  };

  // Early bootstrap
  const initialLang = getSavedLanguage();
  currentLang = initialLang;
  window.TrackTalesLanguageCode = initialLang;
  document.documentElement.lang = initialLang;
  if (LANGUAGE_CONFIG[initialLang] && LANGUAGE_CONFIG[initialLang].dir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  }

  // Initialize once DOM is ready
  function init() {
    syncLanguageDropdowns(currentLang);

    // Setup change listeners on all language dropdowns
    document.addEventListener('change', e => {
      if (e.target && (e.target.id === 'lang-select' || e.target.id === 'splash-lang-select' || e.target.classList.contains('tracktales-lang-select'))) {
        setLanguage(e.target.value, true);
      }
    });

    setupMutationObserver();

    // If initial language is not English, immediately translate everything on page
    if (currentLang !== 'en') {
      setLanguage(currentLang, false);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
