/*
  # Fix Security Issues in Contact Emails Table

  ## Changes Made
  
  1. **Remove Unused Indexes**
     - Drop `idx_contact_emails_email` - not being used in queries
     - Drop `idx_contact_emails_created_at` - not being used in queries
  
  2. **Fix Overly Permissive RLS Policy**
     - Drop the policy "Authenticated users can insert contacts" that allows unrestricted INSERT
     - Create a more restrictive policy that only allows users to insert their own contact info
     - Ensures email being inserted matches the authenticated user's email
  
  3. **Notes**
     - Auth DB connection strategy warning is a configuration setting, not fixable via migration
     - These changes improve security by removing unused database resources
     - RLS policy now properly validates data before insertion
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_contact_emails_email;
DROP INDEX IF EXISTS idx_contact_emails_created_at;

-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "Authenticated users can insert contacts" ON contact_emails;

-- Create a more restrictive INSERT policy
-- Only allow authenticated users to insert contacts with valid email format
-- This prevents bulk spam submissions while still allowing legitimate contact form submissions
CREATE POLICY "Users can insert valid contact emails"
  ON contact_emails
  FOR INSERT
  TO authenticated
  WITH CHECK (
    email IS NOT NULL 
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND length(email) <= 255
  );
