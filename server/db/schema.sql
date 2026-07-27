-- TrackTales Supabase / Postgres Database Schema
-- Architecture Specification: Relational, PostGIS-compatible data model for routes, stops, stories, operators, and sponsored listings.

-- Enable PostGIS extension if available (optional for geospatial calculations)
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Routes Table
CREATE TABLE IF NOT EXISTS routes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    distance_km NUMERIC(8,2) NOT NULL,
    polyline_coordinates JSONB NOT NULL, -- Array of [lat, lng] coordinates representing rail geometry
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Stops Table
CREATE TABLE IF NOT EXISTS stops (
    id SERIAL PRIMARY KEY,
    route_id INT REFERENCES routes(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(20) NOT NULL,
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    distance_along_route_km NUMERIC(8,2) NOT NULL,
    geofence_radius_km NUMERIC(5,2) DEFAULT 5.0, -- Radius in km for Companion Mode offline trigger
    sequence_order INT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Stories Table
CREATE TABLE IF NOT EXISTS stories (
    id SERIAL PRIMARY KEY,
    stop_id INT REFERENCES stops(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    content TEXT NOT NULL,
    category VARCHAR(50) CHECK (category IN ('history', 'culture', 'food', 'hidden_gem')),
    audio_url TEXT,
    image_url TEXT,
    reading_time_mins INT DEFAULT 3,
    author VARCHAR(100) DEFAULT 'TrackTales Editorial',
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Operators Table (Phase Two: Blue Train, Rovos Rail, Shosholoza Meyl)
CREATE TABLE IF NOT EXISTS operators (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    brand_color VARCHAR(20) DEFAULT '#1b3626',
    tagline VARCHAR(255),
    description TEXT,
    logo_url TEXT,
    base_price_zar NUMERIC(10,2),
    amenities JSONB DEFAULT '[]'::jsonb,
    schedule_info JSONB DEFAULT '{}'::jsonb -- Detailed departure times and ETA per stop
);

-- 5. Sponsors / Sponsored Listings Table
CREATE TABLE IF NOT EXISTS sponsors (
    id SERIAL PRIMARY KEY,
    stop_id INT REFERENCES stops(id) ON DELETE CASCADE,
    business_name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    promo_offer VARCHAR(255),
    website_url TEXT,
    logo_url TEXT,
    contact_email VARCHAR(255),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Analytics Logs Table (Companion Mode engagement logs)
CREATE TABLE IF NOT EXISTS analytics_logs (
    id SERIAL PRIMARY KEY,
    story_id INT REFERENCES stories(id) ON DELETE SET NULL,
    stop_id INT REFERENCES stops(id) ON DELETE SET NULL,
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    offline_sync BOOLEAN DEFAULT FALSE,
    device_type VARCHAR(50),
    user_latitude NUMERIC(10,7),
    user_longitude NUMERIC(10,7)
);

-- Indices for rapid spatial and relational lookup
CREATE INDEX IF NOT EXISTS idx_stops_route_seq ON stops(route_id, sequence_order);
CREATE INDEX IF NOT EXISTS idx_stories_stop ON stories(stop_id);
CREATE INDEX IF NOT EXISTS idx_sponsors_stop ON sponsors(stop_id);
