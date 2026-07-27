import React from 'react';
import { Gift, Globe, Mail, MapPin, Sparkles } from 'lucide-react';
import type { Sponsor, Stop } from '../services/companionSync';

interface SponsorListingsProps {
  sponsors: Sponsor[];
  stops: Stop[];
}

export const SponsorListings: React.FC<SponsorListingsProps> = ({ sponsors, stops }) => {
  const getStopName = (stopId: number) => {
    const s = stops.find(st => st.id === stopId);
    return s ? s.name : `Stop #${stopId}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          Business Model & Local Monetization Layer
        </div>
        <h3 className="text-2xl font-serif font-bold text-slate-100">
          Sponsored Local Listings & Passenger Offers
        </h3>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Monetization stream connecting rail travelers with local artisans, heritage hotels, and authentic eateries located within stop geofence boundaries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="bg-slate-950 border border-amber-500/20 hover:border-amber-500/50 rounded-2xl p-6 shadow-lg transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3" />
                    {getStopName(sponsor.stop_id)}
                  </span>
                  <h4 className="text-xl font-serif font-bold text-slate-100">
                    {sponsor.business_name}
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {sponsor.category}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {sponsor.description}
              </p>

              {sponsor.promo_offer && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-start gap-2.5">
                  <Gift className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">Exclusive Passenger Benefit:</div>
                    <div>{sponsor.promo_offer}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              {sponsor.website_url ? (
                <a
                  href={sponsor.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Visit Business Site
                </a>
              ) : (
                <span className="text-slate-500">Verified Local Partner</span>
              )}

              {sponsor.contact_email && (
                <a
                  href={`mailto:${sponsor.contact_email}`}
                  className="text-slate-400 hover:text-slate-200 flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {sponsor.contact_email}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
