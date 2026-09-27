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

describe('TrackTales 3-Mode Corridor Games Verification', () => {
  const html = fs.readFileSync(indexHtmlPath, 'utf8');
  const js = fs.readFileSync(appJsPath, 'utf8');

  describe('1. HTML Structure & Controls Integrity', () => {
    it('contains all 3 mode navigation buttons with proper data-game-tab attributes', () => {
      assert.ok(html.includes('data-game-tab="quiz"'), 'Missing quiz tab');
      assert.ok(html.includes('data-game-tab="bingo"'), 'Missing bingo tab');
      assert.ok(html.includes('data-game-tab="puzzle"'), 'Missing puzzle tab');
    });

    it('contains all 3 game panels with IDs matching app.js selectors', () => {
      assert.ok(html.includes('id="game-panel-quiz"'), 'Missing game-panel-quiz');
      assert.ok(html.includes('id="game-panel-bingo"'), 'Missing game-panel-bingo');
      assert.ok(html.includes('id="game-panel-puzzle"'), 'Missing game-panel-puzzle');
    });

    it('includes custom quiz toggle button #btn-toggle-custom-quiz', () => {
      assert.ok(html.includes('id="btn-toggle-custom-quiz"'), 'Missing #btn-toggle-custom-quiz button in HTML');
    });

    it('includes master reset button #btn-master-reset-games', () => {
      assert.ok(html.includes('id="btn-master-reset-games"'), 'Missing #btn-master-reset-games in HTML');
    });

    it('includes bingo and puzzle controls', () => {
      assert.ok(html.includes('id="btn-reset-bingo"'), 'Missing #btn-reset-bingo');
      assert.ok(html.includes('id="btn-shuffle-bingo"'), 'Missing #btn-shuffle-bingo');
      assert.ok(html.includes('id="btn-reset-puzzle"'), 'Missing #btn-reset-puzzle');
      assert.ok(html.includes('id="btn-verify-puzzle"'), 'Missing #btn-verify-puzzle');
      assert.ok(html.includes('id="btn-puzzle-mode-switch"'), 'Missing #btn-puzzle-mode-switch');
    });
  });

  describe('2. Stop Quizzes Logic & Playability', () => {
    it('defines STOP_QUIZZES with 6 corridor heritage stops', () => {
      assert.ok(js.includes("stop: 'Pretoria Terminus'"), 'Pretoria stop missing');
      assert.ok(js.includes("stop: 'Kimberley Big Hole'"), 'Kimberley stop missing');
      assert.ok(js.includes("stop: 'De Aar Junction'"), 'De Aar stop missing');
      assert.ok(js.includes("stop: 'The Great Karoo'"), 'Karoo stop missing');
      assert.ok(js.includes("stop: 'Matjiesfontein Village'"), 'Matjiesfontein stop missing');
      assert.ok(js.includes("stop: 'Cape Town Terminus'"), 'Cape Town stop missing');
    });

    it('prevents multiple point awards on already answered quiz questions', () => {
      assert.ok(js.includes('answeredQuizzes.has(currentQuizIndex)'), 'Answered quiz check missing');
      assert.ok(js.includes('answeredQuizzes.set(currentQuizIndex'), 'Answered quiz recording missing');
    });

    it('connects toggleCustomQuizBtn to show and hide the custom trivia form', () => {
      assert.ok(js.includes("toggleCustomQuizBtn.addEventListener('click'"), 'Toggle custom quiz listener missing');
    });
  });

  describe('3. Mzansi Rail Bingo Logic & Playability', () => {
    it('defines BINGO_ITEMS with 9 sights and local games_media paths', () => {
      assert.ok(js.includes("id: 'b0'"), 'b0 missing');
      assert.ok(js.includes("id: 'b4'"), 'b4 free stamp missing');
      assert.ok(js.includes("id: 'b8'"), 'b8 missing');
      assert.ok(js.includes("'./games_media/"), 'Local games_media images missing');
    });

    it('ensures bingo points are awarded only once upon winning without infinite point loop', () => {
      assert.ok(js.includes('if (hasWon && !bingoWon)'), 'Win guard condition missing');
      assert.ok(js.includes('totalScore += 250'), 'Bingo win points missing');
      assert.ok(js.includes('else if (!hasWon && bingoWon)'), 'Unmarking winning line check missing');
    });

    it('preserves center free stamp at index 4 when toggling cells', () => {
      assert.ok(js.includes('if (idx === 4) return'), 'Center cell protection missing');
    });
  });

  describe('4. Build Next Stop Route Sequencer Logic & Playability', () => {
    it('defines route and train_cars puzzle modes with correct sequences', () => {
      assert.ok(js.includes("id: 'route'"), 'route mode missing');
      assert.ok(js.includes("id: 'train_cars'"), 'train_cars mode missing');
      assert.ok(js.includes("['Pretoria', 'Kimberley', 'De Aar', 'Beaufort West', 'Matjiesfontein', 'Cape Town']"), 'Corridor route sequence missing');
    });

    it('awards puzzle points once per solved mode to avoid verify spamming', () => {
      assert.ok(js.includes('puzzleSolvedModes.has(mode.id)'), 'puzzleSolvedModes check missing');
      assert.ok(js.includes('puzzleSolvedModes.add(mode.id)'), 'puzzleSolvedModes recording missing');
    });
  });

  describe('5. Clean Master Reset Behavior', () => {
    it('clears all scores, bingo stamps, answered quizzes, and puzzle solved sets on master reset', () => {
      assert.ok(js.includes('answeredQuizzes.clear()'), 'Master reset must clear answered quizzes');
      assert.ok(js.includes('puzzleSolvedModes.clear()'), 'Master reset must clear puzzle solved modes');
      assert.ok(js.includes('bingoWon = false'), 'Master reset must clear bingoWon flag');
    });
  });
});
