import React, { useState } from 'react';
import { Settings, Plus, Trash2, Save, CheckCircle2, MapPin, BookOpen } from 'lucide-react';
import type { Stop, Story, Sponsor } from '../services/companionSync';

interface AdminCMSProps {
  stops: Stop[];
  stories: Story[];
  sponsors?: Sponsor[];
  onRefreshData: () => void;
}

export const AdminCMS: React.FC<AdminCMSProps> = ({ stops, stories, onRefreshData }) => {
  const [activeTab, setActiveTab] = useState<'stops' | 'stories' | 'sponsors'>('stories');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Stop Form State
  const [stopForm, setStopForm] = useState({
    id: '',
    name: '',
    code: '',
    latitude: '-28.7386',
    longitude: '24.7586',
    distance_along_route_km: '600',
    geofence_radius_km: '5.0',
    description: '',
    image_url: ''
  });

  // Story Form State
  const [storyForm, setStoryForm] = useState({
    id: '',
    stop_id: stops[0]?.id ? String(stops[0].id) : '101',
    title: '',
    subtitle: '',
    content: '',
    category: 'history',
    reading_time_mins: '3',
    author: 'TrackTales Content Lead',
    tags: 'History, Heritage',
    image_url: ''
  });

  const API_BASE = 'http://localhost:3001/api';

  const showStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 4000);
  };

  // Submit Stop Form
  const handleSaveStop = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/admin/stops`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stopForm)
      });
      if (res.ok) {
        showStatus('Stop saved successfully!');
        setStopForm({ id: '', name: '', code: '', latitude: '-28.7386', longitude: '24.7586', distance_along_route_km: '600', geofence_radius_km: '5.0', description: '', image_url: '' });
        onRefreshData();
      }
    } catch (err) {
      showStatus('Error saving stop');
    }
  };

  // Submit Story Form
  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/admin/stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storyForm)
      });
      if (res.ok) {
        showStatus('Story card published successfully!');
        setStoryForm({
          id: '',
          stop_id: stops[0]?.id ? String(stops[0].id) : '101',
          title: '',
          subtitle: '',
          content: '',
          category: 'history',
          reading_time_mins: '3',
          author: 'TrackTales Content Lead',
          tags: 'History, Heritage',
          image_url: ''
        });
        onRefreshData();
      }
    } catch (err) {
      showStatus('Error saving story card');
    }
  };

  const handleDeleteStory = async (id: number) => {
    if (!confirm('Delete this story card?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/stories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showStatus('Story card removed');
        onRefreshData();
      }
    } catch (err) {
      showStatus('Error deleting story card');
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4 text-amber-400" />
            Content Lead CMS Dashboard
          </div>
          <h3 className="text-2xl font-serif font-bold text-slate-100">
            TrackTales Story & Route Management
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Content leads can edit stops, write heritage stories, and configure sponsored listings without touching code.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('stories')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'stories' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Stories ({stories.length})
          </button>
          <button
            onClick={() => setActiveTab('stops')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'stops' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Stops ({stops.length})
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {statusMsg}
        </div>
      )}

      {/* Stories CMS Tab */}
      {activeTab === 'stories' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Create / Edit Form */}
          <form onSubmit={handleSaveStory} className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <h4 className="text-sm font-semibold text-amber-300 flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" />
              {storyForm.id ? 'Edit Story Card' : 'Add New Story Card'}
            </h4>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Target Stop Location:</label>
              <select
                value={storyForm.stop_id}
                onChange={(e) => setStoryForm({ ...storyForm, stop_id: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
              >
                {stops.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Story Title:</label>
              <input
                type="text"
                required
                placeholder="e.g. Kimberley Diamond Rush of 1871"
                value={storyForm.title}
                onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Subtitle / Catchphrase:</label>
              <input
                type="text"
                placeholder="e.g. Unearthing the world's richest pit"
                value={storyForm.subtitle}
                onChange={(e) => setStoryForm({ ...storyForm, subtitle: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Category:</label>
                <select
                  value={storyForm.category}
                  onChange={(e) => setStoryForm({ ...storyForm, category: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
                >
                  <option value="history">History</option>
                  <option value="culture">Culture</option>
                  <option value="food">Food & Wine</option>
                  <option value="hidden_gem">Hidden Gem</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Reading Time (mins):</label>
                <input
                  type="number"
                  value={storyForm.reading_time_mins}
                  onChange={(e) => setStoryForm({ ...storyForm, reading_time_mins: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Story Content Body:</label>
              <textarea
                required
                rows={5}
                placeholder="Write narrative text here..."
                value={storyForm.content}
                onChange={(e) => setStoryForm({ ...storyForm, content: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Image URL:</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={storyForm.image_url}
                onChange={(e) => setStoryForm({ ...storyForm, image_url: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Publish Story Card
            </button>
          </form>

          {/* Existing Stories Table */}
          <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 max-h-[600px] overflow-y-auto">
            <h4 className="text-sm font-semibold text-slate-200">Existing Story Cards</h4>
            <div className="space-y-3">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        {story.category}
                      </span>
                      <h5 className="text-xs font-bold text-slate-100 mt-1">{story.title}</h5>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDeleteStory(story.id)}
                        className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/30 text-rose-400 transition-colors"
                        title="Delete Story"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{story.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stops CMS Tab */}
      {activeTab === 'stops' && (
        <form onSubmit={handleSaveStop} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 max-w-2xl">
          <h4 className="text-sm font-semibold text-amber-300 flex items-center gap-2">
            <Plus className="w-4 h-4 text-amber-400" />
            Add New Stop along Route
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Stop Name:</label>
              <input
                type="text"
                required
                placeholder="e.g. De Aar Railway Junction"
                value={stopForm.name}
                onChange={(e) => setStopForm({ ...stopForm, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Station Code:</label>
              <input
                type="text"
                required
                placeholder="e.g. DAR"
                value={stopForm.code}
                onChange={(e) => setStopForm({ ...stopForm, code: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Latitude (°S):</label>
              <input
                type="number"
                step="0.0001"
                required
                value={stopForm.latitude}
                onChange={(e) => setStopForm({ ...stopForm, latitude: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Longitude (°E):</label>
              <input
                type="number"
                step="0.0001"
                required
                value={stopForm.longitude}
                onChange={(e) => setStopForm({ ...stopForm, longitude: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Distance along Route (km):</label>
              <input
                type="number"
                required
                value={stopForm.distance_along_route_km}
                onChange={(e) => setStopForm({ ...stopForm, distance_along_route_km: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Geofence Radius (km):</label>
              <input
                type="number"
                step="0.5"
                required
                value={stopForm.geofence_radius_km}
                onChange={(e) => setStopForm({ ...stopForm, geofence_radius_km: e.target.value })}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Description:</label>
            <textarea
              rows={3}
              placeholder="Historic summary of the stop..."
              value={stopForm.description}
              onChange={(e) => setStopForm({ ...stopForm, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 focus:border-amber-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md"
          >
            Save Route Stop
          </button>
        </form>
      )}
    </div>
  );
};
