---
name: analytics-definitions
description: Use when writing, modifying, or calling any function in lib/metrics/, any manager KPI, any rep performance number, or any MCP tool that returns a business number. Triggers on Win Rate, Meetings, Won, follow-up health, stage conversion, or any dashboard/MCP metric work.
---

# Analytics Definitions

Single rule: **every business number is computed exactly once, in `lib/metrics/`.** The manager dashboard, the rep performance page, and every MCP tool import from that module. If you are about to write a SQL query or a calculation for a business number anywhere else (a component, an API route, an MCP tool handler), stop — call or add a function in `lib/metrics/` instead.

Full definitions: `docs/05_METRICS_DICTIONARY.md`. Read it before implementing any metric — do not infer a definition from a column name.

## The three traps this project already fell into once (see D018–D021)

1. **Date field.** Lead-creation and Win Rate denominator use `lead.lead_date`. Never `lead.created_at` — it's audit-only and identical across all migrated leads.
2. **Win Rate.** Cohort-based: of leads created in the period (by `lead_date`), the share whose current outcome is Won. Label always includes "(leads created in period)". Never divide leads-won-in-period by leads-created-in-period as two different populations — that can exceed 100%.
3. **Meetings vs Meeting Activities.** "Meetings" = distinct leads entering the Meeting stage (`lead_stage_history`), used on every manager KPI. "Meeting Activities" = count of Meeting-type activity rows, rep breakdown only, never a manager KPI. Never use the bare word "Meetings" for the activity count.

## Verification

A fixed fixture at `supabase/seed/fixtures.sql` has every metric hand-calculated (see `docs/13_QA_TEST_PLAN.md`). Any new or changed metric function needs a unit test against that fixture before it's done.
