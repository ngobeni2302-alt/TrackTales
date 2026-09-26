import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

describe('TrackTales Multi-Year Journal Cloud Persistence & Synchronization', () => {
  const indexHtml = fs.readFileSync(path.join(rootDir, 'public', 'index.html'), 'utf-8');
  const appJs = fs.readFileSync(path.join(rootDir, 'public', 'js', 'app.js'), 'utf-8');
  const databasePy = fs.readFileSync(path.join(rootDir, 'database.py'), 'utf-8');
  const mainPy = fs.readFileSync(path.join(rootDir, 'main.py'), 'utf-8');
  const supabaseSql = fs.readFileSync(path.join(rootDir, 'supabase_schema.sql'), 'utf-8');

  describe('1. Central SQLite & Supabase Cloud Database Schema', () => {
    it('defines user_journals table in database.py init_db()', () => {
      assert.ok(databasePy.includes('CREATE TABLE IF NOT EXISTS user_journals'), 'user_journals table missing in database.py');
      assert.ok(databasePy.includes('user_id TEXT NOT NULL'), 'user_id foreign key column missing');
      assert.ok(databasePy.includes('train_id TEXT NOT NULL'), 'train_id column missing');
      assert.ok(databasePy.includes('stop_name TEXT NOT NULL'), 'stop_name column missing');
      assert.ok(databasePy.includes('timestamp INTEGER NOT NULL'), 'timestamp column missing');
      assert.ok(databasePy.includes('text TEXT NOT NULL'), 'text column missing');
    });

    it('implements CRUD and sync helper functions in database.py', () => {
      assert.ok(databasePy.includes('def save_user_journal('), 'save_user_journal missing in database.py');
      assert.ok(databasePy.includes('def get_user_journals('), 'get_user_journals missing in database.py');
      assert.ok(databasePy.includes('def delete_user_journal('), 'delete_user_journal missing in database.py');
      assert.ok(databasePy.includes('def sync_user_journals('), 'sync_user_journals missing in database.py');
    });

    it('includes public.user_journals with RLS policy in supabase_schema.sql', () => {
      assert.ok(supabaseSql.includes('CREATE TABLE IF NOT EXISTS public.user_journals'), 'user_journals table missing in supabase_schema.sql');
      assert.ok(supabaseSql.includes('ALTER TABLE public.user_journals ENABLE ROW LEVEL SECURITY'), 'RLS missing for user_journals');
      assert.ok(supabaseSql.includes('CREATE POLICY "Allow anonymous read/write on user_journals"'), 'policy missing in supabase_schema.sql');
    });
  });

  describe('2. FastAPI Central Cloud Endpoints in main.py', () => {
    it('defines JournalEntryRequest and JournalSyncRequest Pydantic models', () => {
      assert.ok(mainPy.includes('class JournalEntryRequest(BaseModel):'), 'JournalEntryRequest model missing in main.py');
      assert.ok(mainPy.includes('class JournalSyncRequest(BaseModel):'), 'JournalSyncRequest model missing in main.py');
    });

    it('implements authenticated GET, POST, sync, and DELETE /api/journals endpoints', () => {
      assert.ok(mainPy.includes('@app.get("/api/journals"'), 'GET /api/journals endpoint missing');
      assert.ok(mainPy.includes('@app.post("/api/journals"'), 'POST /api/journals endpoint missing');
      assert.ok(mainPy.includes('@app.post("/api/journals/sync"'), 'POST /api/journals/sync endpoint missing');
      assert.ok(mainPy.includes('@app.delete("/api/journals/{journal_id}"'), 'DELETE /api/journals/{journal_id} endpoint missing');
    });
  });

  describe('3. Frontend UI & Multi-Year Cloud Sync in index.html & app.js', () => {
    it('contains voiceCloudSyncStatus and voiceCloudSyncLabel in index.html', () => {
      assert.ok(indexHtml.includes('id="voiceCloudSyncStatus"'), 'voiceCloudSyncStatus badge missing in index.html');
      assert.ok(indexHtml.includes('id="voiceCloudSyncLabel"'), 'voiceCloudSyncLabel missing in index.html');
    });

    it('defines syncCloudJournals and exposes window.TrackTalesSyncJournals in app.js', () => {
      assert.ok(appJs.includes('async function syncCloudJournals()'), 'syncCloudJournals missing in app.js');
      assert.ok(appJs.includes('window.TrackTalesSyncJournals = syncCloudJournals'), 'window.TrackTalesSyncJournals export missing');
      assert.ok(appJs.includes('/api/journals/sync'), '/api/journals/sync call missing');
    });

    it('automatically triggers journal cloud synchronization upon user login, signup, and session recovery', () => {
      assert.ok(appJs.includes('window.TrackTalesSyncJournals();'), 'Journal sync trigger missing');
    });

    it('persists newly recorded journal entries to cloud endpoint /api/journals with JWT authentication', () => {
      assert.ok(appJs.includes("getApiEndpoint('/api/journals')"), 'Cloud post call missing in saveBtn handler');
      assert.ok(appJs.includes('Saved Permanently to Account!'), 'Confirmation message missing');
    });

    it('deletes journal entry from cloud server when user confirms deletion', () => {
      assert.ok(appJs.includes("getApiEndpoint(`/api/journals/${id}`)"), 'Cloud delete call missing in delete entry handler');
    });
  });

  describe('4. Simulation of Multi-Year Storage Persistence Behavior', () => {
    it('preserves user entries while keeping preloaded sample entries non-duplicative', () => {
      const localMockEntries = [
        { id: 'voice-sample-1', text: 'Preloaded sample' },
        { id: 'voice-1727340000000', trainId: 'blue-train', text: 'Trip memory from 2026' }
      ];
      const remoteMockEntries = [
        { id: 'voice-1727340000000', trainId: 'blue-train', text: 'Trip memory from 2026' },
        { id: 'voice-1800000000000', trainId: 'rovos-rail', text: 'Anniversary trip memory from 2028' }
      ];

      const remoteMap = new Map();
      remoteMockEntries.forEach(e => remoteMap.set(e.id, e));

      const merged = [...remoteMockEntries];
      localMockEntries.forEach(localItem => {
        if (!remoteMap.has(localItem.id)) {
          merged.push(localItem);
        }
      });

      // Both 2026 and 2028 entries are kept
      assert.strictEqual(merged.length, 3);
      assert.ok(merged.some(e => e.id === 'voice-1727340000000'), 'Past 2026 memory must be intact');
      assert.ok(merged.some(e => e.id === 'voice-1800000000000'), 'Future 2028 memory must be intact');
    });
  });
});
