-- PostgreSQL Database Schema for SivarSpot
--
-- This schema defines the tables and relationships needed to support
-- the SivarSpot application. The application allows users to
-- register as visitors or organizers and create, view, and manage events.

-- Enable the pgcrypto extension to generate UUID values if not already enabled.
-- If your PostgreSQL instance does not allow extensions, you can replace
-- the UUID columns with SERIAL and remove the gen_random_uuid() defaults.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Users table stores basic account information for both visitors and organizers.
-- Passwords should be stored as securely hashed strings (e.g., using bcrypt)
-- instead of plain text.
CREATE TABLE IF NOT EXISTS users (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email            VARCHAR(255) NOT NULL UNIQUE,
    password_hash    TEXT         NOT NULL,
    role             VARCHAR(20)  NOT NULL CHECK (role IN ('visitante', 'organizador')),
    name             VARCHAR(255) NOT NULL,
    company_name     VARCHAR(255),
    company_location VARCHAR(255),
    website          VARCHAR(255),
    social_media     VARCHAR(255),
    created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Categories table stores the list of available event categories.
-- Prepopulate with the categories defined in the front‑end constants.
CREATE TABLE IF NOT EXISTS categories (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE
);

-- Insert initial categories. The slug field uses a simplified slugified version of the name.
INSERT INTO categories (name, slug) VALUES
    ('Música',           'musica'),
    ('Arte y Cultura',   'arte-y-cultura'),
    ('Gastronomía',      'gastronomia'),
    ('Teatro y Cine',    'teatro-y-cine'),
    ('Turismo',          'turismo'),
    ('Negocios',         'negocios')
ON CONFLICT (name) DO NOTHING;

-- Events table represents each event created on the platform.
CREATE TABLE IF NOT EXISTS events (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title          VARCHAR(255) NOT NULL,
    description    TEXT,
    category_slug  VARCHAR(255) NOT NULL REFERENCES categories(slug) ON DELETE RESTRICT,
    date_time      TIMESTAMP    NOT NULL,
    location       VARCHAR(255) NOT NULL,
    lat            NUMERIC(9,6) NOT NULL,
    lng            NUMERIC(9,6) NOT NULL,
    price          NUMERIC(10,2) NOT NULL DEFAULT 0,
    image_url      TEXT,
    organizer_id   UUID REFERENCES users(id) ON DELETE SET NULL,
    organizer_name VARCHAR(255),
    featured       BOOLEAN NOT NULL DEFAULT FALSE,
    created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create an index to speed up event lookups by category.
CREATE INDEX IF NOT EXISTS idx_events_category ON events (category_slug);

-- Create an index for quick retrieval of upcoming events by date.
CREATE INDEX IF NOT EXISTS idx_events_date ON events (date_time);