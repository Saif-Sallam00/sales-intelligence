# 15 — Decision Log

D001–D017 are the original decisions. D018–D027 were added in revision 2 to close gaps found during the pre-implementation review.

## D001
POC is not the future architecture.

## D002
Primary buyer/user: Sales Manager.

## D003
Sales Rep is the primary data creator.

## D004
Rep sees only own data.

## D005
Manager sees the entire organization.

## D006
Rep UX should remain spreadsheet-like.

## D007
Database must not copy repeated spreadsheet feedback columns.

## D008
Stage history is required.

## D009
Outcome is separate from stage.

## D010
Working default stages: New, Contact Attempted, Follow Up, Meeting, Ongoing, Closed, Cancelled.

## D011
Architecture: Next.js, Supabase/PostgreSQL, modular monolith.

## D012
No separate backend initially.

## D013
No AI API.

## D014
AI through the user's own ChatGPT/Claude.

## D015
MCP read-only.

## D016
Core SaaS must work without AI.

## D017
No overengineering.

---

## D018 — `lead_date` is the metric date; `created_at` is audit-only

Every metric reads `lead_date`. No user-facing query touches `lead.created_at`.

Reason: migrated pilot leads all carry a `created_at` of cutover day. Using it would place three months of history on a single date and destroy every trend from day one. The original spec left this as "created_at or lead_date according to final implementation," which would have been resolved arbitrarily during implementation and discovered during migration.

## D019 — Win Rate is cohort-based

`Win Rate = of leads created in the period (by lead_date), the share whose current outcome is Won.` The UI label carries the denominator.

Reason: the original definition divided leads won in the period by leads created in the period — two different populations. A lead created in August and won in September counted in September's numerator and August's denominator, so the value could exceed 100% at low volume. The manager would have stopped trusting the card within a week.

Accepted consequence: the current month reads low because its leads have not matured. The Won count sits beside it. No maturity adjustment is added.

## D020 — Known Outcome Close Rate removed

Reason: a third percentage that resembles Win Rate but means something else is the exact mechanism behind R5.

## D021 — Meetings means stage entries; the activity count is renamed

`Meetings` = distinct leads entering the Meeting stage in the period, everywhere it appears. The count of Meeting-type activities is renamed `Meeting Activities` and appears only in the rep's activity breakdown.

Reason: the original spec defined both and told the reader to keep them "conceptually distinct," while the KPI cards and `get_business_summary` both used the bare word "Meetings." That guarantees the UI and MCP eventually disagree and fails the P2 consistency test.

## D022 — `manager_comment` removed

Reason: the manager is read-only, so nothing in the product could write it. Keeping it would have required a column-level write exception in an otherwise clean two-family RLS model. If the pilot asks for it, it returns as an activity of type `Manager Note` — no schema change, no RLS change.

## D023 — `response_status` lives on `leads` only

Removed from `activities`.

Reason: it existed on both with no sync rule, and the rep edits the lead-level value inline in the grid. Two writable copies of the same fact diverge within a week. This deletes the derivation logic and the "which is authoritative" question outright.

## D024 — `pipeline_stages` are per organization

Not null `organization_id`. Seeded on organization creation. No global table, no system flag, no configuration UI.

Reason: RLS becomes the same org-scoped policy as every other table with no special case. R11 says stages will be adjusted during the pilot — that is a SQL update, not a feature.

## D025 — No archive flag and no delete

`archived_at` removed. A finished lead moves to the Cancelled stage. Active Leads is defined by non-terminal stage alone.

Reason: deleting destroys the history the entire analytics layer is built on, and an archive flag duplicates what the terminal stages already express. Removing both eliminates a whole class of permission questions.

## D026 — Manager is read-only across the organization in the MVP

No INSERT, UPDATE, or DELETE on any business table. Pilot corrections are made by the operator directly in the database.

Reason: reduces RLS to two clean policy families and removes override-audit questions entirely. The manager's job is analysis, not data entry.

## D027 — All business numbers come from `lib/metrics/`

One TypeScript module. The manager dashboard, the rep performance page, and every MCP tool import from it. Nothing else computes a business number. Not database views, not a service.

Reason: this is the structural mitigation for R5. A skill file instructing Claude to keep metrics consistent is a soft guardrail; a single module is a hard one, and it makes the UI/MCP consistency test true by construction.

## D028 — `react-data-grid` for the rep workspace

Reason: MIT, ~15kB, with inline editing, keyboard navigation, and virtualization built in. TanStack Table is headless and would mean hand-building all three. AG Grid is 338kB+ and its differentiating features are out of scope and mostly paid.

## D029 — No self-service signup

Accounts are created manually during pilot setup. The app implements login, session handling, and password reset only.

Reason: the MVP serves one known pilot organization. A signup flow, email verification, and org provisioning are pure overhead at this stage.

## D030 — pgTAP in EPIC 3, not after the UI

RLS policy tests are written alongside the policies and run in CI on every PR.

Reason: E2E tests the application, not the policy. A later migration can weaken a policy that the UI never exposes, and E2E would still pass. Writing the tests later means writing them with the policies no longer fresh.
