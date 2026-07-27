import React, { useState, useEffect } from 'react';
import {
  Train,
  Compass,
  Smartphone,
  BookOpen,
  Settings,
  Sparkles,
  FileCode2,
  Radio
} from 'lucide-react';
import { RouteMap } from './components/RouteMap';
import { CompanionSimulator } from './components/CompanionSimulator';
import { StoryFeed } from './components/StoryFeed';
import { OperatorSchedule } from './components/OperatorSchedule';
import { SponsorListings } from './components/SponsorListings';
import { AdminCMS } from './components/AdminCMS';
import type {
  Stop,
  Story,
  Sponsor,
  JourneyPack
} from './services/companionSync';
import {
  getStoredJourneyPack,
  downloadJourneyPack
} from './services/companionSync';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'map' | 'companion' | 'stories' | 'operators' | 'sponsors' | 'admin'>('map');
  const [journeyPack, setJourneyPack] = useState<JourneyPack | null>(null);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [selectedStoryCategory, setSelectedStoryCategory] = useState<string>('all');
  const [activeModalStory, setActiveModalStory] = useState<Story | null>(null);
  const [showArchDoc, setShowArchDoc] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch or load offline bundle
  const loadData = async () => {
    setIsLoading(true);
    try {
      const pack = await downloadJourneyPack(1);
      setJourneyPack(pack);
    } catch (e) {
      console.warn('Failed fetching from API, trying local storage:', e);
      const cached = getStoredJourneyPack();
      if (cached) setJourneyPack(cached);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const route = journeyPack?.route;
  const stops = journeyPack?.stops || [];
  const operators = journeyPack?.operators || [];

  // Extract all stories from stops
  const allStories: Story[] = stops.reduce((acc, stop) => {
    if (stop.stories) return [...acc, ...stop.stories];
    return acc;
  }, [] as Story[]);

  // Extract all sponsors from stops
  const allSponsors: Sponsor[] = stops.reduce((acc, stop) => {
    if (stop.sponsors) return [...acc, ...stop.sponsors];
    return acc;
  }, [] as Sponsor[]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-2xl">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('map')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
              <Train className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-serif font-extrabold tracking-wider text-amber-100">
                TrackTales
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Trans-Karoo
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
              Service-Based Rail Storytelling & Companion Mode Architecture
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {[
            { id: 'map', label: 'Route & Train Map', icon: Compass },
            { id: 'companion', label: 'Companion Engine', icon: Smartphone },
            { id: 'stories', label: 'Story Feed', icon: BookOpen },
            { id: 'operators', label: 'Operators', icon: Train },
            { id: 'sponsors', label: 'Sponsored Offers', icon: Sparkles },
            { id: 'admin', label: 'Content CMS', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowArchDoc(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-all"
          >
            <FileCode2 className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Architecture Spec</span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-2 py-2 flex items-center justify-around overflow-x-auto text-xs">
        {[
          { id: 'map', label: 'Map', icon: Compass },
          { id: 'companion', label: 'Companion', icon: Smartphone },
          { id: 'stories', label: 'Stories', icon: BookOpen },
          { id: 'operators', label: 'Operators', icon: Train },
          { id: 'sponsors', label: 'Offers', icon: Sparkles },
          { id: 'admin', label: 'CMS', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium ${
                isSelected ? 'text-amber-400 font-bold bg-slate-800' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Hero Banner Section */}
      <section className="relative py-8 px-4 lg:px-8 border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950 overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold uppercase tracking-widest">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              Pretoria–Cape Town Rail Corridor • 1,598 KM Track
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold text-amber-100 leading-tight">
              South Africa’s Rail Storytelling Engine
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">
              Combining a simple service-based Content API with zero-latency client-side GPS geofencing for Companion Mode across the Great Karoo.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-3 gap-3 bg-slate-900/80 border border-amber-500/20 rounded-2xl p-3.5 w-full md:w-auto shadow-xl">
            <div className="text-center px-2">
              <div className="text-xs text-slate-400 font-mono uppercase">Stops</div>
              <div className="text-xl font-bold font-serif text-amber-300">{stops.length}</div>
            </div>
            <div className="text-center px-2 border-x border-slate-800">
              <div className="text-xs text-slate-400 font-mono uppercase">Stories</div>
              <div className="text-xl font-bold font-serif text-amber-300">{allStories.length}</div>
            </div>
            <div className="text-center px-2">
              <div className="text-xs text-slate-400 font-mono uppercase">Operators</div>
              <div className="text-xl font-bold font-serif text-amber-300">{operators.length}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-8">
        {isLoading ? (
          <div className="py-24 text-center space-y-4">
            <Train className="w-12 h-12 text-amber-400 animate-bounce mx-auto" />
            <div className="text-base font-serif font-semibold text-slate-300">
              Initializing TrackTales Content Service & Route Geometry...
            </div>
          </div>
        ) : (
          <>
            {/* TAB 1: ROUTE MAP */}
            {activeTab === 'map' && (
              <div className="space-y-8">
                <RouteMap
                  stops={stops}
                  polylineCoordinates={route?.polyline_coordinates || []}
                  onSelectStop={(stop) => {
                    setSelectedStop(stop);
                    if (stop.stories && stop.stories.length > 0) {
                      setActiveModalStory(stop.stories[0]);
                    }
                  }}
                  activeStopId={selectedStop?.id}
                />

                {/* Inline Story Cards Grid for Selected Stop */}
                <StoryFeed
                  stories={allStories}
                  stops={stops}
                  sponsors={allSponsors}
                  selectedCategory={selectedStoryCategory}
                  onSelectCategory={setSelectedStoryCategory}
                  activeStory={activeModalStory}
                  onCloseStoryModal={() => setActiveModalStory(null)}
                  onSelectStory={(story) => setActiveModalStory(story)}
                />
              </div>
            )}

            {/* TAB 2: COMPANION MODE SIMULATOR */}
            {activeTab === 'companion' && (
              <CompanionSimulator
                onSelectStory={(story) => setActiveModalStory(story)}
              />
            )}

            {/* TAB 3: STORY FEED */}
            {activeTab === 'stories' && (
              <StoryFeed
                stories={allStories}
                stops={stops}
                sponsors={allSponsors}
                selectedCategory={selectedStoryCategory}
                onSelectCategory={setSelectedStoryCategory}
                activeStory={activeModalStory}
                onCloseStoryModal={() => setActiveModalStory(null)}
                onSelectStory={(story) => setActiveModalStory(story)}
              />
            )}

            {/* TAB 4: RAIL OPERATORS */}
            {activeTab === 'operators' && (
              <OperatorSchedule operators={operators} stops={stops} />
            )}

            {/* TAB 5: SPONSORED LISTINGS */}
            {activeTab === 'sponsors' && (
              <SponsorListings sponsors={allSponsors} stops={stops} />
            )}

            {/* TAB 6: ADMIN CMS */}
            {activeTab === 'admin' && (
              <AdminCMS
                stops={stops}
                stories={allStories}
                onRefreshData={loadData}
              />
            )}
          </>
        )}
      </main>

      {/* Architecture Spec Modal */}
      {showArchDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl space-y-6 text-slate-100 p-6 md:p-8 relative">
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-widest">
                  TrackTales Technical Specification
                </span>
                <h3 className="text-2xl font-serif font-bold text-amber-100">
                  7-Point Architectural Blueprint
                </h3>
              </div>
              <button
                onClick={() => setShowArchDoc(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="font-bold text-amber-300">1. Service-Based Content API</h4>
                <p>Read-heavy RESTful API delivering cached polyline geometry, stop metadata, and story cards to the client frontend.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="font-bold text-amber-300">2. Core Relational Data Model</h4>
                <p>Ordered Route polyline, Stops with geofence radii, Story cards, Operator timetables (Blue Train, Rovos Rail, Shosholoza Meyl), and Sponsored Listings.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="font-bold text-amber-300">3. Content Delivery Layer</h4>
                <p>Cached single-payload bundle fetched prior to departure and stored in client-side storage for local animation and triggering.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="font-bold text-amber-300">4. Companion Mode On-Device GPS Matching</h4>
                <p>Haversine geofence calculations execute 100% locally on the phone without mid-Karoo cellular network dependencies. Offline analytics buffer logs engagement pings.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="font-bold text-amber-300">5. Postgres / Supabase Storage & PostGIS</h4>
                <p>Relational database with PostGIS geospatial indexing support for server-side distance calculations and journey pack generation.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="font-bold text-amber-300">6. Content Lead Admin CMS</h4>
                <p>Authenticated internal dashboard letting non-developers add stops, publish heritage story cards, and configure sponsored business listings.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <h4 className="font-bold text-amber-300">7. Hosting & Reality Check</h4>
                <p>Lightweight managed backend architecture scale-ready for post-hackathon operator partnerships without over-engineering.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Luxury Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 lg:px-8 mt-auto text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Train className="w-4 h-4 text-amber-400" />
            <span className="font-serif font-bold text-slate-300">TrackTales Rail Platform</span>
            <span>• Pretoria to Cape Town Corridor</span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('admin')} className="hover:text-amber-400 transition-colors">
              Content Lead CMS
            </button>
            <button onClick={() => setShowArchDoc(true)} className="hover:text-amber-400 transition-colors">
              Architecture Blueprint
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
