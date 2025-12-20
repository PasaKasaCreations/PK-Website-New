-- Migration: Update contact_messages table (make phone optional)

BEGIN;

-- Remove subject column
ALTER TABLE contact_messages
DROP COLUMN IF EXISTS subject;

-- Add optional phone column
ALTER TABLE contact_messages
ADD COLUMN phone TEXT;

-- Optional phone validation (NULL allowed)
ALTER TABLE contact_messages
ADD CONSTRAINT contact_messages_phone_length_check
CHECK (
  phone IS NULL
  OR (char_length(phone) >= 7 AND char_length(phone) <= 20)
);

COMMIT;
