-- =============================================
-- Intera Design Studio - Supabase Setup SQL
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- =============================================

-- 1. LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  project_type TEXT DEFAULT 'Residential' CHECK (project_type IN ('Residential', 'Commercial', 'Turnkey', 'Other')),
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Residential', 'Commercial', 'Turnkey')),
  location TEXT NOT NULL DEFAULT '',
  budget_range TEXT DEFAULT '',
  description TEXT DEFAULT '',
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. CALCULATOR RULES TABLE (singleton row)
CREATE TABLE IF NOT EXISTS calculator_rules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  base_price_per_sqft NUMERIC DEFAULT 2500,
  room_multiplier NUMERIC DEFAULT 1.2,
  material_multiplier NUMERIC DEFAULT 1.5,
  city_multiplier NUMERIC DEFAULT 1.0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default calculator rules
INSERT INTO calculator_rules (base_price_per_sqft, room_multiplier, material_multiplier, city_multiplier)
VALUES (2500, 1.2, 1.5, 1.0);

-- Insert sample projects
INSERT INTO projects (title, category, location, budget_range, description, images) VALUES
('Lumina Penthouse', 'Residential', 'Beverly Hills, CA', '$500K - $1M',
 'A breathtaking redesign of a 4,000 sq ft penthouse overlooking the city.',
 ARRAY['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop']),
('Vertex HQ', 'Commercial', 'Manhattan, NY', '$1M - $2M',
 'A modern corporate headquarters designed for productivity and brand identity.',
 ARRAY['https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop']),
('Azure Villa', 'Residential', 'Malibu, CA', '$800K - $1.5M',
 'Coastal luxury villa with panoramic ocean views and sustainable materials.',
 ARRAY['https://images.unsplash.com/photo-1600607687920-4e2a09be1587?q=80&w=2070&auto=format&fit=crop']),
('The Obsidian Lounge', 'Commercial', 'Chicago, IL', '$300K - $600K',
 'An exclusive lounge space blending dark aesthetics with functional elegance.',
 ARRAY['https://images.unsplash.com/photo-1541888086925-920a0f023ea0?q=80&w=2070&auto=format&fit=crop']),
('Minimalist Haven', 'Turnkey', 'Austin, TX', '$400K - $700K',
 'A complete turnkey project emphasizing minimalism and spatial harmony.',
 ARRAY['https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1974&auto=format&fit=crop']);

-- =============================================
-- ROW LEVEL SECURITY (RLS) Policies
-- =============================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculator_rules ENABLE ROW LEVEL SECURITY;

-- LEADS: Anyone can INSERT (public contact form), only authenticated users can SELECT
CREATE POLICY "Anyone can submit a lead" ON leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can view leads" ON leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update leads" ON leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete leads" ON leads FOR DELETE TO authenticated USING (true);

-- PROJECTS: Anyone can SELECT (public portfolio), only authenticated users can INSERT/UPDATE/DELETE
CREATE POLICY "Anyone can view projects" ON projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated users can insert projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update projects" ON projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete projects" ON projects FOR DELETE TO authenticated USING (true);

-- CALCULATOR RULES: Anyone can SELECT (public calculator), only authenticated users can UPDATE
CREATE POLICY "Anyone can view calculator rules" ON calculator_rules FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated users can update rules" ON calculator_rules FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
