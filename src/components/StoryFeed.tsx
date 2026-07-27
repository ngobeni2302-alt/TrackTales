import React, { useState } from 'react';
import { BookOpen, Volume2, Play, Pause, Clock, User, X, Sparkles, Store } from 'lucide-react';
import type { Story, Stop, Sponsor } from '../services/companionSync';

interface StoryFeedProps {
  stories: Story[];
  stops: Stop[];
  sponsors: Sponsor[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  activeStory: Story | null;
  onCloseStoryModal: () => void;
  onSelectStory: (story: Story) => void;
}

export const StoryFeed: React.FC<StoryFeedProps> = ({
  stories,
  stops,
  sponsors,
  selectedCategory,
  onSelectCategory,
  activeStory,
  onCloseStoryModal,
  onSelectStory
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(25);

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'history', label: '📜 History' },
    { id: 'culture', label: '🎨 Culture' },
    { id: 'food', label: '🍷 Food & Culinary' },
    { id: 'hidden_gem', label: '💎 Hidden Gems' }
  ];

  const filteredStories = selectedCategory === 'all'
    ? stories
    : stories.filter(s => s.category === selectedCategory);

  const getStopForStory = (stopId: number) => {
    return stops.find(st => st.id === stopId);
  };

  const getSponsorForStop = (stopId: number) => {
    return sponsors.find(sp => sp.stop_id === stopId);
  };

  return (
    <div className="space-y-6">
      {/* Category Pills Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-xl font-serif font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            Story Card Feed
          </h3>
          <p className="text-xs text-slate-400">
            Bite-sized heritage & cultural narratives attached to route geofences
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => {
          const stop = getStopForStory(story.stop_id);
          const sponsor = getSponsorForStop(story.stop_id);

          return (
            <div
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col group"
            >
              {/* Image & Category Overlay */}
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={story.image_url || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80'}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

                {/* Stop Location Badge */}
                {stop && (
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-300 font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
                    📍 {stop.name}
                  </span>
                )}

                {/* Category Pill */}
                <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md">
                  {story.category.replace('_', ' ')}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-lg font-serif font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2">
                    {story.title}
                  </h4>
                  {story.subtitle && (
                    <p className="text-xs text-amber-200/80 mt-1 line-clamp-1 italic">
                      {story.subtitle}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {story.content}
                  </p>
                </div>

                {/* Sponsored Listing Hint if present */}
                {sponsor && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center justify-between text-amber-300">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold">
                      <Store className="w-3.5 h-3.5 text-amber-400" />
                      {sponsor.business_name}
                    </span>
                    <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded font-mono text-amber-200">
                      Offer Available
                    </span>
                  </div>
                )}

                {/* Footer metadata */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{story.reading_time_mins} min read</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Read Story</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Story Reader Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/30 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 text-slate-100 p-6 md:p-8 relative animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button
              onClick={onCloseStoryModal}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header image */}
            <div className="relative h-64 -mx-6 -mt-6 md:-mx-8 md:-mt-8 rounded-t-3xl overflow-hidden bg-slate-950">
              <img
                src={activeStory.image_url || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80'}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="bg-amber-500 text-slate-950 font-bold text-xs uppercase px-3 py-1 rounded-full shadow-md">
                  {activeStory.category.replace('_', ' ')}
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-100">
                  {activeStory.title}
                </h2>
                {activeStory.subtitle && (
                  <p className="text-sm text-amber-200/90 font-sans italic">
                    {activeStory.subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Audio Narration Bar Mock */}
            <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-4">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="p-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg transition-transform active:scale-95 flex items-center justify-center"
              >
                {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4" />
                    AI Audio Narration Track
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">01:42 / 03:30</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={audioProgress}
                  onChange={(e) => setAudioProgress(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Story Content Body */}
            <div className="space-y-4 text-slate-200 text-sm md:text-base leading-relaxed font-sans border-b border-slate-800 pb-6">
              {activeStory.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Sponsored Listing Banner if applicable */}
            {getSponsorForStop(activeStory.stop_id) && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Sponsored Local Listing Offer
                </div>
                {(() => {
                  const sponsor = getSponsorForStop(activeStory.stop_id)!;
                  return (
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-base font-bold text-amber-100">
                          {sponsor.business_name}
                        </h4>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                          {sponsor.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{sponsor.description}</p>
                      {sponsor.promo_offer && (
                        <div className="p-2.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-semibold">
                          🎁 {sponsor.promo_offer}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Story Author & Tags */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-slate-400 pt-2 font-mono">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-400" />
                <span>Written by: {activeStory.author}</span>
              </div>

              {activeStory.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {activeStory.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
