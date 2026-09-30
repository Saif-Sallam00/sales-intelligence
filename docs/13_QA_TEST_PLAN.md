# 13 — QA Test Plan

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

Two layers, no third:

| Layer | Tool | Runs |
|---|---|---|
| Database policies | pgTAP via `supabase test db` | CI, every PR |
| User journeys | Playwright | CI, before merge to main |

Metric correctness is unit-tested over `lib/metrics/` against the seed fixture.

## P0 Security — pgTAP, written in EPIC 3

One file per table under `supabase/tests/database/`. Use `tests.create_supabase_user()` and `tests.authenticate_as()` from the Supabase test helpers.

- Rep A cannot SELECT Rep B's leads.
- Rep A cannot UPDATE Rep B's leads.
- Rep A cannot INSERT a lead owned by Rep B.
- Rep A cannot SELECT Rep B's activities.
- Rep A cannot SELECT Rep B's stage or outcome history.
- Org A user cannot SELECT any Org B row, on any table.
- Manager A cannot SELECT any Org B row.
- Manager cannot INSERT, UPDATE, or DELETE any business row.
- No role can DELETE from any business table.
- Every API-reachable table has RLS enabled.

The last one is a guard test: it fails if a future migration adds a table without RLS.

## P0 Data Integrity

- New lead's `owner_user_id` equals the creating rep.
- New lead's `organization_id` equals the creator's organization.
- Lead creation writes one `lead_stage_history` row with `from_stage_id = null`.
- Stage change writes a transition row.
- Outcome change writes an outcome history row.
- Activity is linked to the correct lead and owner.
- `lead_date` defaults to today on creation and remains editable.
- Timestamps are `timestamptz` and bucket correctly in `Africa/Cairo`.

## P1 Metrics — unit tests against the fixture

The fixture at `supabase/seed/fixtures.sql` contains a small, fixed dataset: 2 reps, roughly 20 leads spanning three months, activities, and a handful of stage and outcome transitions.

Every expected value below is hand-calculated once, recorded in the fixture file as a comment block, and asserted in tests:

- New Leads (by `lead_date`, not `created_at`)
- Active Leads
- Total Activities
- Activities per Working Day
- Meeting Activities
- Meetings (stage entries — verify it differs from Meeting Activities in the fixture, deliberately)
- Won (from outcome history)
- Win Rate (verify the cohort logic: a lead created in month 1 and won in month 2 must not inflate month 2's rate)
- Leads by Stage
- Stage Entries
- Average Time in Stage
- Avg Time to Meeting
- Avg Time in Follow Up
- Stage-to-Stage Conversion with sample size
- Due Today / Overdue / Due Next 7 Days / Average Overdue Days
- Source and campaign rollups
- Period comparison, including the previous-period-is-zero case

Build the fixture so at least one lead crosses a month boundary between creation and Won. That single row is what proves the Win Rate fix works.

## P1 Rep UX — Playwright

- Log in and land on My Leads.
- Add lead.
- Inline edit persists and shows save state.
- Search, sort, filter.
- Add activity, and confirm Latest Action / Latest Feedback / Last Activity Date update.
- Change stage.
- Set outcome.
- Set follow-up.
- Direct URL to another rep's lead is denied.

## P1 Manager UX — Playwright

- Overview loads with correct KPI values against the fixture.
- Team pipeline matrix renders.
- Team performance table renders.
- Date filters change results.
- Rep drill-down loads.
- No edit control is present anywhere in the manager UI.

## P2 Migration

- Imported lead count per rep matches the sheet.
- Owner mapping correct.
- Stage mapping correct.
- Activity conversion count correct.
- Amount totals match.
- Every imported lead has exactly one stage history row.
- **`lead_date` equals Connection Date, not the import timestamp.**
- Manual spot-check with each rep.

## P2 MCP Consistency

For the same organization, date range, and filters, each MCP tool returns values identical to the corresponding UI screen.

Because both call `lib/metrics/`, this test should pass trivially. If it ever fails, the cause is a tool bypassing the metrics module — fix the bypass, not the test.

AI narrative text is never the source of truth.
