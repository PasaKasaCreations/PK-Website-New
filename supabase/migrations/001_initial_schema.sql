-- =====================================================
-- Pasakasa Creations - Initial Database Schema
-- =====================================================
-- This migration creates all tables and enforces RLS
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE skill_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE inquiry_type AS ENUM ('general', 'course', 'career', 'partnership');
CREATE TYPE inquiry_status AS ENUM ('new', 'in_progress', 'resolved');
CREATE TYPE employment_type AS ENUM ('full_time', 'part_time', 'contract', 'internship');
CREATE TYPE game_status AS ENUM ('in_development', 'coming_soon', 'released');

-- =====================================================
-- TABLES
-- =====================================================

-- Courses Table (Public Read)
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Basic Info
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  instructor TEXT NOT NULL,
  duration TEXT NOT NULL,
  skill_level skill_level NOT NULL DEFAULT 'beginner',

  -- Media
  thumbnail_url TEXT NOT NULL,

  -- Course Content
  syllabus JSONB NOT NULL DEFAULT '[]',
  learning_outcomes TEXT[] NOT NULL DEFAULT '{}',
  prerequisites TEXT[] NOT NULL DEFAULT '{}',

  -- Publishing
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,

  -- Live Class Info
  sessions_running INTEGER NOT NULL DEFAULT 0,
  sessions_completed INTEGER NOT NULL DEFAULT 0,
  next_batch_date TEXT,
  location TEXT NOT NULL,
  max_students INTEGER NOT NULL DEFAULT 20,
  current_students INTEGER DEFAULT 0,

  -- Social Proof
  testimonials JSONB NOT NULL DEFAULT '[]',

  -- Pricing
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'INR'
);

-- Games Table (Public Read)
CREATE TABLE IF NOT EXISTS games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Basic Info
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  genre TEXT NOT NULL,

  -- Media
  thumbnail_url TEXT NOT NULL,
  screenshots TEXT[] NOT NULL DEFAULT '{}',

  -- Store Links
  play_store_url TEXT,
  app_store_url TEXT,

  -- Publishing
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  release_date DATE,
  status game_status NOT NULL DEFAULT 'in_development'
);

-- Inquiries Table (Write-Only for Public)
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- User Info
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  email TEXT NOT NULL CHECK (char_length(email) >= 5 AND char_length(email) <= 255),
  phone TEXT CHECK (char_length(phone) <= 20),
  message TEXT NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 2000),

  -- Inquiry Details
  inquiry_type inquiry_type NOT NULL,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  status inquiry_status NOT NULL DEFAULT 'new',

  -- Security & Tracking
  ip_address TEXT,
  user_agent TEXT
);

-- Contact Messages Table (Write-Only for Public)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- User Info
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  email TEXT NOT NULL CHECK (char_length(email) >= 5 AND char_length(email) <= 255),
  subject TEXT CHECK (char_length(subject) <= 200),
  message TEXT NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 2000),

  -- Security & Tracking
  ip_address TEXT,
  user_agent TEXT
);

-- Job Postings Table (Public Read)
CREATE TABLE IF NOT EXISTS job_postings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Job Info
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type employment_type NOT NULL,

  -- Job Details
  description TEXT NOT NULL,
  requirements TEXT[] NOT NULL DEFAULT '{}',
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  nice_to_have TEXT[] NOT NULL DEFAULT '{}',

  -- Publishing
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  application_deadline DATE
);

-- =====================================================
-- INDEXES (Performance)
-- =====================================================

CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_published ON courses(is_published) WHERE is_published = TRUE;
CREATE INDEX idx_courses_featured ON courses(featured) WHERE featured = TRUE;

CREATE INDEX idx_games_slug ON games(slug);
CREATE INDEX idx_games_published ON games(is_published) WHERE is_published = TRUE;
CREATE INDEX idx_games_featured ON games(featured) WHERE featured = TRUE;

CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_type ON inquiries(inquiry_type);

CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

CREATE INDEX idx_job_postings_slug ON job_postings(slug);
CREATE INDEX idx_job_postings_published ON job_postings(is_published) WHERE is_published = TRUE;

-- =====================================================
-- UPDATED_AT TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_games_updated_at
  BEFORE UPDATE ON games
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at
  BEFORE UPDATE ON job_postings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- NEXT STEP:
-- Run the 002_rls_policies.sql migration to enable security
-- =====================================================
