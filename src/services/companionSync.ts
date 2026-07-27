// TrackTales Client-Side Companion Mode & Offline Sync Engine
// Handles zero-latency on-device GPS matching in low/no-connectivity Karoo stretches.

export interface Story {
  id: number;
  stop_id: number;
  title: string;
  subtitle?: string;
  content: string;
  category: 'history' | 'culture' | 'food' | 'hidden_gem';
  reading_time_mins: number;
  author: string;
  tags?: string[];
  image_url?: string;
  audio_url?: string;
}

export interface Sponsor {
  id: number;
  stop_id: number;
  business_name: string;
  category: string;
  description: string;
  promo_offer?: string;
  website_url?: string;
  contact_email?: string;
}

export interface Stop {
  id: number;
  route_id: number;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  distance_along_route_km: number;
  geofence_radius_km: number;
  sequence_order: number;
  description: string;
  image_url?: string;
  stories?: Story[];
  sponsors?: Sponsor[];
}

export interface Operator {
  id: number;
  name: string;
  code: string;
  brand_color: string;
  tagline: string;
  description: string;
  base_price_zar: number;
  amenities: string[];
  schedule_info: {
    departure_day: string;
    duration_hours: number;
    stops_schedule: Array<{
      stop_code: string;
      arr: string;
      dep: string;
      excursion?: string;
    }>;
  };
}

export interface JourneyPack {
  version: string;
  generated_at: string;
  route: {
    id: number;
    name: string;
    code: string;
    origin: string;
    destination: string;
    distance_km: number;
    polyline_coordinates: [number, number][];
  };
  stops: Stop[];
  operators: Operator[];
  offline_instructions: string;
}

export interface AnalyticsQueueItem {
  id: string;
  story_id: number;
  stop_id: number;
  timestamp: string;
  user_lat: number;
  user_lng: number;
}

const STORAGE_KEY = 'tracktales_offline_journey_pack';
const QUEUE_KEY = 'tracktales_pending_analytics';
const API_BASE = 'http://localhost:3001/api';

/**
 * 1. Downloads full journey bundle before departure while signal is available
 */
export async function downloadJourneyPack(routeId: number = 1): Promise<JourneyPack> {
  try {
    const response = await fetch(`${API_BASE}/companion/journey-pack?route_id=${routeId}`);
    if (!response.ok) throw new Error('Failed to fetch journey pack from server');
    
    const data = await response.json();
    const pack: JourneyPack = data.bundle;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pack));
    return pack;
  } catch (err) {
    console.warn('Network unavailable, attempting to read local offline bundle cache:', err);
    const cached = getStoredJourneyPack();
    if (cached) return cached;
    throw err;
  }
}

/**
 * 2. Retrieves stored journey pack from client-side storage
 */
export function getStoredJourneyPack(): JourneyPack | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * 3. On-Device Haversine GPS Distance Calculation (in Kilometers)
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * 4. Local GPS Geofence Trigger Checker
 * Compares current device GPS against downloaded stop geofences
 */
export function checkGeofences(
  userLat: number,
  userLng: number,
  journeyPack: JourneyPack
): { triggeredStop: Stop | null; distanceKm: number } {
  let closestStop: Stop | null = null;
  let minDistance = Infinity;

  for (const stop of journeyPack.stops) {
    const dist = calculateHaversineDistance(userLat, userLng, stop.latitude, stop.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      closestStop = stop;
    }
  }

  if (closestStop && minDistance <= (closestStop.geofence_radius_km || 5.0)) {
    return { triggeredStop: closestStop, distanceKm: Math.round(minDistance * 10) / 10 };
  }

  return { triggeredStop: null, distanceKm: Math.round(minDistance * 10) / 10 };
}

/**
 * 5. Offline Analytics Queue & Flush
 */
export function queueAnalyticsPing(storyId: number, stopId: number, lat: number, lng: number): void {
  try {
    const queue: AnalyticsQueueItem[] = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
    queue.push({
      id: Math.random().toString(36).substr(2, 9),
      story_id: storyId,
      stop_id: stopId,
      timestamp: new Date().toISOString(),
      user_lat: lat,
      user_lng: lng
    });
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (e) {
    console.error('Error queuing analytics ping:', e);
  }
}

export async function flushAnalyticsQueue(): Promise<number> {
  const raw = localStorage.getItem(QUEUE_KEY);
  if (!raw) return 0;
  
  const queue: AnalyticsQueueItem[] = JSON.parse(raw);
  if (queue.length === 0) return 0;

  let flushedCount = 0;
  const remainingQueue: AnalyticsQueueItem[] = [];

  for (const item of queue) {
    try {
      const res = await fetch(`${API_BASE}/analytics/ping`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          story_id: item.story_id,
          stop_id: item.stop_id,
          offline_sync: true,
          user_latitude: item.user_lat,
          user_longitude: item.user_lng,
          device_type: 'companion_offline_sync'
        })
      });
      if (res.ok) flushedCount++;
      else remainingQueue.push(item);
    } catch {
      remainingQueue.push(item);
    }
  }

  localStorage.setItem(QUEUE_KEY, JSON.stringify(remainingQueue));
  return flushedCount;
}
