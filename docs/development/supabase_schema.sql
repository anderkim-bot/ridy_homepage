-- RIDY Models Table Schema (Matched with Frontend CamelCase)

-- Create the models table
CREATE TABLE IF NOT EXISTS models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "brand" TEXT NOT NULL,
    "originalBrand" TEXT,
    "weight" TEXT,
    "category" TEXT,
    "engine" TEXT,
    "displacement" TEXT,
    "cooling" TEXT,
    "maxPower" TEXT,
    "isPopular" BOOLEAN DEFAULT false,
    "isCompleted" BOOLEAN DEFAULT false,
    "plateNumber" TEXT,
    "year" TEXT,
    "mileage" TEXT,
    "accidentHistory" TEXT,
    "maintenanceStatus" TEXT DEFAULT '양호',
    "remainingPeriod" TEXT,
    "rentalFee" TEXT DEFAULT '상담 시 안내',
    "successionFee" TEXT DEFAULT '0',
    "location" TEXT DEFAULT '전국',
    "transferMethod" TEXT DEFAULT '전국 탁송',
    "successionColor" TEXT,
    "successionColorHex" TEXT DEFAULT '#000000',
    "items" JSONB DEFAULT '[]'::jsonb,
    "successionImages" TEXT[] DEFAULT '{}'::text[]
);

-- Set up Row Level Security (RLS)
ALTER TABLE models ENABLE ROW LEVEL SECURITY;

-- Read policy (Public)
CREATE POLICY "Public Read Access"
ON models FOR SELECT
TO anon
USING (true);

-- Full access for development (Security Warning: Restrict this in production)
CREATE POLICY "Full access for development"
ON models FOR ALL
TO anon
USING (true)
WITH CHECK (true);
