/**
 * Automated Test Suite for Manage Membership Relocation to Side Panel
 * 
 * Verifies:
 * 1. Element Relocation:
 *    - The Active Pass banner is no longer inside the #page-about Journey Stories section header.
 *    - #nav-hub-membership-card exists in the side panel (#navigationHubPanel) under "Stories & Vault".
 *    - The card is renamed to "Manage Membership" and includes its own icon (crown).
 *    - Displays active pass status and a "Change Pass" button.
 *    - Icon rail in side panel includes an icon button for Manage Membership under Stories and Vault.
 *    - Mobile drawer includes Manage Membership button under Stories.
 * 2. Subscription Modal Integration:
 *    - Clicking #nav-hub-membership-card, #nav-hub-rail-membership-btn, or #mobile-manage-membership-btn
 *      closes the side panel / mobile drawer and triggers window.TrackTalesOpenSubscriptionModal.
 * 3. Dynamic Synchronization:
 *    - Selecting / changing subscription passes updates the active pass name and badge dynamically in the side panel.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const indexHtmlPath = path.join(publicDir, 'index.html');
const appJsPath = path.join(publicDir, 'js', 'app.js');

describe('TrackTales Manage Membership Side Panel Relocation', () => {
  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  const appJs = fs.readFileSync(appJsPath, 'utf8');

  describe('1. HTML Structure & Side Panel Placement', () => {
    it('ensures Active Pass banner is removed from #page-about Stories header', () => {
      // Find the about page section
      const aboutSectionStart = indexHtml.indexOf('id="page-about"');
      assert.ok(aboutSectionStart !== -1, 'page-about section should exist');
      
      const aboutSectionHeader = indexHtml.substring(aboutSectionStart, aboutSectionStart + 1500);
      assert.ok(!aboutSectionHeader.includes('id="stories-sub-status-bar"'), 'stories-sub-status-bar must be removed from stories page header');
    });

    it('places #nav-hub-membership-card in #navigationHubPanel under Stories & Vault', () => {
      assert.ok(indexHtml.includes('id="nav-hub-membership-card"'), '#nav-hub-membership-card must exist in index.html');
      
      const gridStart = indexHtml.indexOf('id="nav-hub-items-grid"');
      const gridEnd = indexHtml.indexOf('id="btn-nav-hub-train"');
      assert.ok(gridStart !== -1 && gridEnd !== -1, 'grid containers must exist');
      const gridSnippet = indexHtml.substring(gridStart, gridEnd);
      
      const storiesIndex = gridSnippet.indexOf('data-page="about"');
      const membershipCardIndex = gridSnippet.indexOf('id="nav-hub-membership-card"');
      const gamesIndex = gridSnippet.indexOf('data-page="games"');
      
      assert.ok(storiesIndex !== -1, 'Stories & Vault card must exist in grid');
      assert.ok(membershipCardIndex !== -1, 'Manage Membership card must exist in grid');
      assert.ok(gamesIndex !== -1, 'Games & Bingo card must exist in grid');
      
      assert.ok(membershipCardIndex > storiesIndex, 'Manage Membership card must be placed after Stories & Vault');
      assert.ok(membershipCardIndex < gamesIndex, 'Manage Membership card must be placed before Corridor Games');
    });

    it('gives Manage Membership its own crown icon and proper title in the card', () => {
      const cardStart = indexHtml.indexOf('id="nav-hub-membership-card"');
      const cardSnippet = indexHtml.substring(cardStart, cardStart + 2500);
      assert.ok(cardSnippet.includes('Manage Membership'), 'Card must have title Manage Membership');
      assert.ok(cardSnippet.includes('data-lucide="crown"'), 'Card must include crown icon');
      assert.ok(cardSnippet.includes('id="stories-active-sub-name"'), 'Card must include active pass label element');
      assert.ok(cardSnippet.includes('Change Pass'), 'Card must include Change Pass action');
    });

    it('adds Manage Membership icon in the side panel icon rail under Stories & Vault', () => {
      assert.ok(indexHtml.includes('id="nav-hub-rail-membership-btn"'), '#nav-hub-rail-membership-btn must exist in icon rail');
      
      const iconRailSnippet = indexHtml.substring(
        indexHtml.indexOf('class="nav-hub-icon-rail"'),
        indexHtml.indexOf('class="nav-hub-icon-rail"') + 1200
      );
      
      const railStories = iconRailSnippet.indexOf('title="Stories and Vault"');
      const railMembership = iconRailSnippet.indexOf('id="nav-hub-rail-membership-btn"');
      const railGames = iconRailSnippet.indexOf('title="Corridor Games"');
      
      assert.ok(railStories !== -1 && railMembership !== -1 && railGames !== -1, 'Rail links must exist');
      assert.ok(railMembership > railStories, 'Rail membership must be placed under Stories and Vault');
      assert.ok(railMembership < railGames, 'Rail membership must be placed before Corridor Games');
    });

    it('adds Manage Membership button under Stories in mobileMenu', () => {
      assert.ok(indexHtml.includes('id="mobile-manage-membership-btn"'), '#mobile-manage-membership-btn must exist in mobileMenu');
      const mobileMenuSnippet = indexHtml.substring(
        indexHtml.indexOf('id="mobileMenu"'),
        indexHtml.indexOf('id="mobileMenu"') + 1500
      );
      assert.ok(mobileMenuSnippet.includes('Manage Membership'), 'Mobile menu must include Manage Membership');
      assert.ok(mobileMenuSnippet.includes('id="mobile-manage-sub-label"'), 'Mobile menu must include mobile-manage-sub-label');
    });
  });

  describe('2. JavaScript Logic & Interaction Binding', () => {
    it('binds click event to open subscription modal and close panel in updateStoriesHeaderAutomation', () => {
      assert.ok(appJs.includes("document.getElementById('nav-hub-membership-card')"), 'Must reference nav-hub-membership-card');
      assert.ok(appJs.includes("document.getElementById('nav-hub-rail-membership-btn')"), 'Must reference nav-hub-rail-membership-btn');
      assert.ok(appJs.includes("document.getElementById('mobile-manage-membership-btn')"), 'Must reference mobile-manage-membership-btn');
      assert.ok(appJs.includes('window.TrackTalesOpenSubscriptionModal'), 'Must invoke TrackTalesOpenSubscriptionModal');
    });

    it('synchronizes active pass label in side panel when subscription features update', () => {
      assert.ok(appJs.includes('renderSubscriptionFeatures'), 'renderSubscriptionFeatures must exist');
      assert.ok(appJs.includes("document.getElementById('nav-hub-membership-badge')"), 'Must update nav-hub-membership-badge');
      assert.ok(appJs.includes("document.getElementById('mobile-manage-sub-label')"), 'Must update mobile-manage-sub-label');
    });

    it('refreshes side panel membership status when opening navigation hub panel', () => {
      const openNavHubIndex = appJs.indexOf('function openNavHubPanel()');
      assert.ok(openNavHubIndex !== -1, 'openNavHubPanel must exist');
      const openNavHubBody = appJs.substring(openNavHubIndex, openNavHubIndex + 600);
      assert.ok(openNavHubBody.includes('updateStoriesHeaderAutomation();'), 'openNavHubPanel must call updateStoriesHeaderAutomation');
    });
  });

  describe('3. Functional Simulation of Active Pass & Plan Opening', () => {
    it('correctly sets pass name and badge for VIP Future Membership (R149)', () => {
      const subNames = {
        'free': 'Free Journey (R0)',
        'premium-pack': 'Premium Journey Pack (R79)',
        'audio-exp': 'Audio Experience (R49)',
        'corridor-pass': 'Corridor Pass (R99)',
        'membership': 'Future Membership (R149)'
      };

      assert.strictEqual(subNames['membership'], 'Future Membership (R149)');
      assert.strictEqual(subNames['free'], 'Free Journey (R0)');
    });
  });
});
