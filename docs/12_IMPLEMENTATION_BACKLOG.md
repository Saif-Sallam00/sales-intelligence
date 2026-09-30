# 12 — Implementation Backlog

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

Work epic by epic. Finish one, verify it, stop. Do not chain epics in a single session.

## EPIC 0 — Setup
- Next.js project (TypeScript)
- Supabase project, CLI linked
- Environment configuration
- Repository, CI skeleton

## EPIC 1 — Auth & Organization
- Login
- Session handling via `@supabase/ssr`
- Password reset
- `organizations` and `user_profiles` tables
- Server-side organization and role resolution
- Manager/rep role routing

No signup screen. Accounts are created manually per `11_MIGRATION_PILOT.md`.

## EPIC 2 — Core Data Model
- `pipeline_stages` (per organization, seeded on org creation)
- `sources`, `campaigns`
- `leads`
- `activities`
- `lead_stage_history`
- `lead_outcome_history`
- Indexes from `04_DATA_MODEL.md`

## EPIC 3 — Security
- Rep own-data RLS (select, insert, update)
- Manager org-wide read-only RLS
- Tenant isolation across every table
- History and activity scoping
- No delete policies anywhere
- **pgTAP suite under `supabase/tests/database/`, one file per table**
- `supabase test db` wired into CI

The pgTAP suite belongs here, not after the UI. This is where the policies are written and where their intent is fresh.

## EPIC 4 — Rep Grid
- Grid library spike (`react-data-grid`)
- My Leads grid
- Add Row
- Inline edit with autosave state
- Search / sort / filter
- Sticky headers, keyboard navigation
- Lead detail drawer
- Add activity
- Change stage (writes history)
- Set outcome (writes history)
- Set follow-up

## EPIC 5 — Metrics Module
- `lib/metrics/` with every function from `05_METRICS_DICTIONARY.md`
- Seed fixture at `supabase/seed/fixtures.sql`
- Unit tests asserting each metric against hand-calculated values

This is its own epic because everything downstream depends on it. Building it inside the dashboard epic is how metric drift starts.

## EPIC 6 — Rep Performance
- KPI summary
- Pipeline
- Activity type breakdown
- Follow-up health
- Period comparison

## EPIC 7 — Manager Overview
- KPI cards
- Team pipeline matrix
- Team performance table
- Date filter
- Rep / source / campaign filters

## EPIC 8 — Manager Rep Detail
- Rep summary
- Pipeline
- Stage conversion
- Stage aging
- Follow-up health
- Rep vs team
- Period comparison

## EPIC 9 — Source & Campaign Analytics
- Source performance
- Campaign performance

## EPIC 10 — Pilot Migration
- Controlled import script
- Hekal mapping
- Habiba mapping
- Salma mapping if included
- Stage history backfill
- Validation queries

## EPIC 11 — UX Hardening
- Loading states
- Error states
- Empty states
- Autosave feedback
- Responsive behaviour
- Playwright journeys for the critical paths

## EPIC 12 — Pilot Launch
- Production users
- Migration run
- Training
- Feedback
- High-severity fixes

## EPIC 13 — MCP
After the core MVP is live.
- Auth and manager-only gating
- The ten tools in `10_MCP_SPEC.md`, each wrapping a `lib/metrics/` function
- Bounded outputs
- Security tests
- UI/MCP consistency check
