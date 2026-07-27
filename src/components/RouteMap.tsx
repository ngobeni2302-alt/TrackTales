import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Train, Radio, Compass } from 'lucide-react';
import type { Stop } from '../services/companionSync';

interface RouteMapProps {
  stops: Stop[];
  polylineCoordinates: [number, number][];
  onSelectStop: (stop: Stop) => void;
  activeStopId?: number | null;
}

export const RouteMap: React.FC<RouteMapProps> = ({
  stops,
  polylineCoordinates,
  onSelectStop,
  activeStopId
}) => {
  const [progress, setProgress] = useState<number>(0); // 0 to 100%
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [currentTrainPos, setCurrentTrainPos] = useState<{ x: number; y: number; lat: number; lng: number }>({
    x: 0,
    y: 0,
    lat: -25.7588,
    lng: 28.1887
  });

  // Calculate bounding box for SVG projection
  const minLat = -34.5;
  const maxLat = -25.0;
  const minLng = 17.5;
  const maxLng = 29.0;

  const mapWidth = 800;
  const mapHeight = 550;

  // Convert lat/lng to SVG pixel coordinates
  const project = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * mapWidth;
    const y = ((maxLat - lat) / (maxLat - minLat)) * mapHeight;
    return { x, y };
  };

  // Convert polyline to SVG path string
  const svgPathD = polylineCoordinates.reduce((acc, [lat, lng], idx) => {
    const { x, y } = project(lat, lng);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Animation Loop along polyline
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.15 * speed;
        if (next >= 100) return 0; // loop
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  // Compute current train marker position based on progress %
  useEffect(() => {
    if (polylineCoordinates.length < 2) return;

    const totalSegments = polylineCoordinates.length - 1;
    const currentSegmentIndex = Math.min(
      Math.floor((progress / 100) * totalSegments),
      totalSegments - 1
    );

    const segmentProgress = ((progress / 100) * totalSegments) - currentSegmentIndex;

    const p1 = polylineCoordinates[currentSegmentIndex];
    const p2 = polylineCoordinates[currentSegmentIndex + 1];

    const currentLat = p1[0] + (p2[0] - p1[0]) * segmentProgress;
    const currentLng = p1[1] + (p2[1] - p1[1]) * segmentProgress;

    const { x, y } = project(currentLat, currentLng);
    setCurrentTrainPos({ x, y, lat: currentLat, lng: currentLng });
  }, [progress, polylineCoordinates]);

  // Find nearest stop to current train position to highlight
  const nearestStop = stops.find((stop) => {
    const projectedStop = project(stop.latitude, stop.longitude);
    const distPx = Math.hypot(projectedStop.x - currentTrainPos.x, projectedStop.y - currentTrainPos.y);
    return distPx < 35;
  });

  return (
    <div className="relative bg-slate-950 border border-amber-500/20 rounded-2xl p-6 shadow-2xl overflow-hidden text-slate-100">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold tracking-wider text-xs uppercase mb-1">
            <Compass className="w-4 h-4 animate-spin-slow text-amber-400" />
            Live Route Geometry & Signal Vector
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-100">
            Pretoria – Cape Town Trans-Karoo Line
          </h2>
          <p className="text-xs text-slate-400">
            1,598 km ordered polyline track | Automated GPS marker simulation
          </p>
        </div>

        {/* Live Train Animation Controls */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700/60 rounded-xl p-2 shadow-inner">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-md flex items-center justify-center"
            title={isPlaying ? "Pause Simulation" : "Play Simulation"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={() => setProgress(0)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            title="Reset Train to Pretoria"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
            {[1, 5, 20].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2.5 py-1 text-xs rounded-md font-mono font-semibold transition-all ${
                  speed === s
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Map SVG Container */}
      <div className="relative my-6 bg-slate-900/60 rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center p-2">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <svg viewBox={`0 0 ${mapWidth} ${mapHeight}`} className="w-full h-auto max-h-[500px] select-none">
          <defs>
            {/* Track Line Gradient */}
            <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            {/* Glowing Blur */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Railway Polyline Background Shadow */}
          <path
            d={svgPathD}
            fill="none"
            stroke="#000000"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />

          {/* Rail Track Ties Effect */}
          <path
            d={svgPathD}
            fill="none"
            stroke="#475569"
            strokeWidth="6"
            strokeDasharray="4,6"
            strokeLinecap="round"
          />

          {/* Active Rail Polyline Track Line */}
          <path
            d={svgPathD}
            fill="none"
            stroke="url(#trackGradient)"
            strokeWidth="3.5"
            filter="url(#glow)"
            strokeLinecap="round"
          />

          {/* Render Stops & Geofence Rings */}
          {stops.map((stop) => {
            const { x, y } = project(stop.latitude, stop.longitude);
            const isSelected = activeStopId === stop.id || nearestStop?.id === stop.id;
            const geofencePx = stop.geofence_radius_km * 4; // visual scale factor

            return (
              <g key={stop.id} className="cursor-pointer group" onClick={() => onSelectStop(stop)}>
                {/* Pulsing Geofence Radius Circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={geofencePx}
                  fill={isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(51, 65, 85, 0.1)'}
                  stroke={isSelected ? '#f59e0b' : '#475569'}
                  strokeWidth={isSelected ? '1.5' : '1'}
                  strokeDasharray={isSelected ? 'none' : '3,3'}
                  className={isSelected ? 'animate-pulse' : ''}
                />

                {/* Stop Marker Node */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 9 : 6}
                  fill={isSelected ? '#f59e0b' : '#0f172a'}
                  stroke={isSelected ? '#fff' : '#f59e0b'}
                  strokeWidth="2.5"
                  className="transition-all duration-300 group-hover:scale-125"
                />

                {/* Stop Label Text */}
                <text
                  x={x + 14}
                  y={y + 4}
                  fill={isSelected ? '#fbbf24' : '#cbd5e1'}
                  fontSize={isSelected ? '13' : '11'}
                  fontWeight={isSelected ? '700' : '500'}
                  className="pointer-events-none drop-shadow-md font-sans tracking-wide"
                >
                  {stop.name.replace(' Station', '').replace(' Central', '')}
                </text>

                {/* Stop Code Badge */}
                <text
                  x={x + 14}
                  y={y + 18}
                  fill="#64748b"
                  fontSize="9"
                  fontWeight="600"
                  className="pointer-events-none font-mono"
                >
                  {stop.code} • {stop.distance_along_route_km} km
                </text>
              </g>
            );
          })}

          {/* Animated Train Marker */}
          <g transform={`translate(${currentTrainPos.x}, ${currentTrainPos.y})`}>
            {/* Train Glow Ring */}
            <circle r="16" fill="rgba(245, 158, 11, 0.25)" className="animate-ping" />
            <circle r="12" fill="#020617" stroke="#f59e0b" strokeWidth="2.5" />
            <foreignObject x="-9" y="-9" width="18" height="18" className="overflow-visible">
              <div className="flex items-center justify-center w-full h-full text-amber-400">
                <Train className="w-4 h-4 transform -rotate-45" />
              </div>
            </foreignObject>
          </g>
        </svg>

        {/* Live Train Status Overlay Card */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-slate-950/90 backdrop-blur-md border border-amber-500/30 rounded-xl p-3.5 shadow-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Live Pacing Vector
            </div>
            <div className="text-xs font-semibold text-amber-200 truncate">
              {nearestStop ? `Approaching ${nearestStop.name}` : `In Transit across Karoo Corridor`}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Lat: {currentTrainPos.lat.toFixed(4)} | Lng: {currentTrainPos.lng.toFixed(4)}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Slider */}
      <div className="space-y-2 mt-4">
        <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
          <span>Pretoria (0 km)</span>
          <span className="text-amber-400 font-bold">{Math.round((progress / 100) * 1598)} km / 1,598 km</span>
          <span>Cape Town (1,598 km)</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={(e) => {
            setProgress(parseFloat(e.target.value));
            setIsPlaying(false);
          }}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
      </div>
    </div>
  );
};
