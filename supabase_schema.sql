-- ============================================================================
-- TrackTales Supabase Cloud Database Initialization Script
-- Paste this script into your Supabase Dashboard -> SQL Editor and click RUN
-- ============================================================================

-- 1. Create Users Table in public schema
CREATE TABLE IF NOT EXISTS public.users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

-- 2. Create User Tickets Table (Cross-device ticket sync)
CREATE TABLE IF NOT EXISTS public.user_tickets (
    ticket_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    passenger_name TEXT NOT NULL,
    train_id TEXT NOT NULL,
    train_name TEXT NOT NULL,
    cabin_type TEXT NOT NULL,
    travel_date TEXT NOT NULL,
    passengers_count INTEGER NOT NULL,
    carriage_number TEXT NOT NULL,
    seat_number TEXT NOT NULL,
    boarding_station TEXT NOT NULL,
    destination_station TEXT NOT NULL,
    qr_code_data TEXT NOT NULL,
    issued_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT NOT NULL
);

-- 3. Create Password Resets Table
CREATE TABLE IF NOT EXISTS public.password_resets (
    email TEXT PRIMARY KEY,
    reset_code TEXT NOT NULL,
    expires_at BIGINT NOT NULL
);

-- 4. Enable Row Level Security (RLS) & Grant Policies for API Access
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_resets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous read/write on users" ON public.users;
CREATE POLICY "Allow anonymous read/write on users" ON public.users FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous read/write on user_tickets" ON public.user_tickets;
CREATE POLICY "Allow anonymous read/write on user_tickets" ON public.user_tickets FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anonymous read/write on password_resets" ON public.password_resets;
CREATE POLICY "Allow anonymous read/write on password_resets" ON public.password_resets FOR ALL USING (true) WITH CHECK (true);
