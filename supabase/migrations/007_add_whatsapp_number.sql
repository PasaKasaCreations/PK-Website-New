-- Migration: Add WhatsApp number to site_settings
-- Purpose: Allow admin to configure WhatsApp number for course enrollment

-- Add whatsapp_number column to site_settings table
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;

-- Add a comment for documentation
COMMENT ON COLUMN site_settings.whatsapp_number IS 'WhatsApp number with country code for course enrollment inquiries (e.g., +977-986-XXXXXXX)';
