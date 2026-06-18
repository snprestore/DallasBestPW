-- =============================================================================
-- Dallas Best Pressure Washing — initial schema
-- Run this in the Supabase SQL editor of the NEW, dedicated project.
-- =============================================================================

-- Leads table -----------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  phone text not null,
  email text,
  service_type text not null,         -- residential | commercial
  service_detail text,                -- e.g. driveway, house wash, roof, commercial flatwork
  property_type text,
  square_footage integer,             -- nullable; used for commercial estimates
  city text,
  estimated_quote numeric,            -- calculator output if applicable
  message text,
  source text default 'website',
  utm_source text,
  utm_medium text,
  utm_campaign text
);

-- Row Level Security: no public access. Inserts happen via the server action
-- using the service role key, which bypasses RLS. No policies are granted to
-- anon/authenticated, so the table is not publicly readable or writable.
alter table public.leads enable row level security;

-- Helpful index for reviewing recent leads.
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- =============================================================================
-- Spam-defense: reject obviously bot-generated names BEFORE insert.
--
-- Heuristics (conservative to avoid false positives on real names):
--   1. Implausibly low vowel-to-letter ratio across the whole name.
--   2. An excessive consonant-cluster run (5+ consonants in a row).
-- Only alphabetic characters are considered; spaces, hyphens, apostrophes,
-- and accents are ignored for the run check. Short names are exempted from the
-- ratio test (too little signal -> too risky to reject).
-- =============================================================================
create or replace function public.validate_customer_before_insert()
returns trigger
language plpgsql
as $$
declare
  name_clean   text;
  letters      text;
  total_letters int;
  vowel_count  int;
  ratio        numeric;
  has_long_run boolean;
begin
  -- Normalize: lowercase, strip everything but a–z (drops spaces/punct/digits).
  name_clean := lower(coalesce(new.full_name, ''));
  letters    := regexp_replace(name_clean, '[^a-z]', '', 'g');
  total_letters := length(letters);

  -- Reject empty / non-alphabetic names outright.
  if total_letters = 0 then
    raise exception 'Invalid name: no alphabetic characters.';
  end if;

  -- 1. Vowel-to-letter ratio (only meaningful for longer names).
  vowel_count := total_letters - length(regexp_replace(letters, '[aeiou]', '', 'g'));
  if total_letters >= 6 then
    ratio := vowel_count::numeric / total_letters::numeric;
    -- Real names almost always exceed ~15% vowels; below 0.10 is bot-like.
    if ratio < 0.10 then
      raise exception 'Invalid name: implausible vowel ratio.';
    end if;
  end if;

  -- 2. Excessive consonant-cluster run (5+ consonants in a row).
  has_long_run := letters ~ '[bcdfghjklmnpqrstvwxyz]{5,}';
  if has_long_run then
    raise exception 'Invalid name: excessive consonant cluster.';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_validate_customer_before_insert on public.leads;
create trigger trg_validate_customer_before_insert
  before insert on public.leads
  for each row
  execute function public.validate_customer_before_insert();
