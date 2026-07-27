import React, { useState, useEffect } from 'react';
import { Download, Wifi, WifiOff, Smartphone, ShieldCheck, Zap, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';
import type {
  JourneyPack,
  Stop,
  Story
} from '../services/companionSync';
import {
  downloadJourneyPack,
  getStoredJourneyPack,
  checkGeofences,
  queueAnalyticsPing,
  flushAnalyticsQueue
} from '../services/companionSync';

interface CompanionSimulatorProps {
  onSelectStory: (story: Story) => void;
}

export const CompanionSimulator: React.FC<CompanionSimulatorProps> = ({ onSelectStory }) => {
  const [journeyPack, setJourneyPack] = useState<JourneyPack | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [simulatedLat, setSimulatedLat] = useState<number>(-28.7386); // Kimberley default
  const [simulatedLng, setSimulatedLng] = useState<number>(24.7586);
  const [activeGeofenceStop, setActiveGeofenceStop] = useState<Stop | null>(null);
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [flushedCount, setFlushedCount] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Load journey pack from storage or server
  useEffect(() => {
    const cached = getStoredJourneyPack();
    if (cached) {
      setJourneyPack(cached);
    } else {
      handleDownloadPack();
    }
  }, []);

  const handleDownloadPack = async () => {
    setIsDownloading(true);
    try {
      const pack = await downloadJourneyPack(1);
      setJourneyPack(pack);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  // Perform client-side zero-latency GPS geofence check
  useEffect(() => {
    if (!journeyPack) return;

    const { triggeredStop, distanceKm: dist } = checkGeofences(simulatedLat, simulatedLng, journeyPack);
    setActiveGeofenceStop(triggeredStop);
    setDistanceKm(dist);

    if (triggeredStop && triggeredStop.stories && triggeredStop.stories.length > 0) {
      // Log analytics ping (queues offline if network absent)
      queueAnalyticsPing(triggeredStop.stories[0].id, triggeredStop.id, simulatedLat, simulatedLng);
    }
  }, [simulatedLat, simulatedLng, journeyPack]);

  const handleFlushAnalytics = async () => {
    const count = await flushAnalyticsQueue();
    setFlushedCount(count);
    setTimeout(() => setFlushedCount(null), 4000);
  };

  const exportJSONBundle = () => {
    if (!journeyPack) return;
    const blob = new Blob([JSON.stringify(journeyPack, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tracktales-journey-pack-pretoria-capetown.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold tracking-wider text-xs uppercase mb-1">
            <Smartphone className="w-4 h-4 text-amber-400" />
            Companion Mode Architecture Demonstration
          </div>
          <h3 className="text-2xl font-serif font-bold text-slate-100">
            On-Device GPS Geofencing Engine
          </h3>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            GPS matching happens <strong>100% locally on the phone</strong> using pre-packaged offline bundles. Zero server latency, fully resilient to remote Karoo signal blackouts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Signal Switcher Toggle */}
          <button
            onClick={() => {
              const next = !isOnline;
              setIsOnline(next);
              if (next) handleFlushAnalytics();
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isOnline
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse'
            }`}
          >
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {isOnline ? 'Online (Pre-Departure Signal)' : 'Karoo Offline (0 Signal)'}
          </button>

          {/* Download Offline Bundle Button */}
          <button
            onClick={handleDownloadPack}
            disabled={isDownloading}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Downloading Pack...' : 'Download Offline Pack'}
          </button>

          {/* Export JSON Bundle File */}
          <button
            onClick={exportJSONBundle}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/20"
          >
            <Layers className="w-4 h-4" />
            Export JSON Pack
          </button>
        </div>
      </div>

      {/* Main Grid Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Simulated Device GPS Controls */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Simulated Phone GPS Telemetry
            </h4>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400">
              Local Hardware Calculation
            </span>
          </div>

          {/* Preset Location Buttons */}
          <div className="space-y-2">
            <label className="text-xs text-slate-400 block font-medium">Quick Teleport to Rail Stops:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Pretoria Station', lat: -25.7588, lng: 28.1887 },
                { name: 'Kimberley Big Hole', lat: -28.7386, lng: 24.7586 },
                { name: 'Beaufort West', lat: -32.3567, lng: 22.5833 },
                { name: 'Matjiesfontein', lat: -33.2325, lng: 20.5822 },
                { name: 'Worcester Valley', lat: -33.6450, lng: 19.4447 },
                { name: 'Cape Town Station', lat: -33.9211, lng: 18.4239 }
              ].map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => {
                    setSimulatedLat(loc.lat);
                    setSimulatedLng(loc.lng);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-mono transition-all border ${
                    Math.abs(simulatedLat - loc.lat) < 0.05 && Math.abs(simulatedLng - loc.lng) < 0.05
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-semibold font-sans truncate">{loc.name}</div>
                  <div className="text-[10px] text-slate-500">{loc.lat}, {loc.lng}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Coordinate Sliders */}
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                <span>Latitude:</span>
                <span className="text-amber-400 font-bold">{simulatedLat.toFixed(4)}° S</span>
              </div>
              <input
                type="range"
                min="-34.5"
                max="-25.5"
                step="0.01"
                value={simulatedLat}
                onChange={(e) => setSimulatedLat(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                <span>Longitude:</span>
                <span className="text-amber-400 font-bold">{simulatedLng.toFixed(4)}° E</span>
              </div>
              <input
                type="range"
                min="18.0"
                max="28.5"
                step="0.01"
                value={simulatedLng}
                onChange={(e) => setSimulatedLng(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Geofence Trigger Status & Card */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className={`w-5 h-5 ${activeGeofenceStop ? 'text-amber-400' : 'text-slate-500'}`} />
                <h4 className="text-sm font-semibold text-slate-200">
                  Client-Side Geofence Status
                </h4>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                activeGeofenceStop
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {activeGeofenceStop ? 'Geofence Breach Detected!' : 'Searching for nearby stops...'}
              </span>
            </div>

            {activeGeofenceStop ? (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                      Geofence Radius: {activeGeofenceStop.geofence_radius_km} km (Current Distance: {distanceKm} km)
                    </span>
                    <h4 className="text-xl font-serif font-bold text-amber-100">
                      {activeGeofenceStop.name}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">
                  {activeGeofenceStop.description}
                </p>

                {/* Available Story Cards inside this Stop */}
                {activeGeofenceStop.stories && activeGeofenceStop.stories.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-amber-500/20">
                    <label className="text-[11px] font-semibold text-amber-300 block">
                      Triggered Story Cards ({activeGeofenceStop.stories.length}):
                    </label>
                    <div className="space-y-2">
                      {activeGeofenceStop.stories.map((story) => (
                        <div
                          key={story.id}
                          onClick={() => onSelectStory(story)}
                          className="bg-slate-900/90 border border-amber-500/30 hover:border-amber-400 rounded-lg p-3 cursor-pointer transition-all flex items-center justify-between group"
                        >
                          <div>
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                              {story.category}
                            </span>
                            <div className="text-xs font-semibold text-slate-100 group-hover:text-amber-300 mt-1">
                              {story.title}
                            </div>
                          </div>
                          <button className="text-xs text-amber-400 font-medium underline">
                            Read Card
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-900/50 rounded-xl border border-dashed border-slate-800 text-slate-400 space-y-2">
                <Smartphone className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="text-xs font-medium">Currently in remote transit outside stop geofences</div>
                <div className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Move latitude/longitude sliders above or teleport to Kimberley or Matjiesfontein to trigger on-device stories.
                </div>
              </div>
            )}

            {/* Offline Analytics Queue Indicator */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <div className="text-slate-400">
                Offline Analytics Buffer:{' '}
                <span className="text-amber-400 font-mono font-bold">Active</span>
              </div>
              <button
                onClick={handleFlushAnalytics}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                Flush Pending Log Queue
              </button>
            </div>

            {flushedCount !== null && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Successfully synced {flushedCount} pending engagement pings to Content API!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
