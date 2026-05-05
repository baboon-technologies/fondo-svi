/*
  # Create contact emails table

  1. New Tables
    - `contact_emails`
      - `id` (uuid, primary key) - Unique identifier for each contact
      - `email` (text, unique, not null) - Email address of the contact
      - `created_at` (timestamptz) - Timestamp when the contact was submitted
      - `contacted` (boolean) - Flag to track if the contact has been reached
  
  2. Security
    - Enable RLS on `contact_emails` table
    - Add policy for authenticated users to read all data
    - Add policy for authenticated users to insert new contacts
    - Public users cannot read or write directly (form will use edge function)
  
  3. Indexes
    - Add index on email for faster lookups
    - Add index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS contact_emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  contacted boolean DEFAULT false
);

ALTER TABLE contact_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read all contacts"
  ON contact_emails
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert contacts"
  ON contact_emails
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_contact_emails_email ON contact_emails(email);
CREATE INDEX IF NOT EXISTS idx_contact_emails_created_at ON contact_emails(created_at DESC);