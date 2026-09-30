---
name: product-rules
description: Use when implementing or reviewing any feature involving leads, activities, pipeline stages, outcomes, roles, or permissions in this Sales Intelligence SaaS. Triggers on schema changes, RLS policies, lead/activity CRUD, stage or outcome transitions, manager vs rep access, and MCP tool implementation.
---

# Product Rules

This project has a frozen product definition and data model in `docs/`. Do not re-derive product decisions from first principles — read the relevant doc first.

## Read before implementing

| If you're touching... | Read first |
|---|---|
| schema, tables, columns | `docs/04_DATA_MODEL.md` |
| any metric or KPI | `docs/05_METRICS_DICTIONARY.md` |
| RLS, roles, auth | `docs/06_PERMISSIONS_SECURITY.md` |
| rep UI / grid | `docs/07_REP_WORKSPACE_UI.md` |
| manager UI | `docs/08_MANAGER_DASHBOARD_UI.md` |
| MCP tools | `docs/10_MCP_SPEC.md` |
| migration/import | `docs/11_MIGRATION_PILOT.md` |
| which epic, and what belongs in it | `docs/12_IMPLEMENTATION_BACKLOG.md` |
| "why was it built this way" | `docs/15_DECISION_LOG.md` |

## Non-negotiables (also in root CLAUDE.md)

- `lead_date`, never `created_at`, in any metric or user-facing query.
- One computation per business number, in `lib/metrics/`.
- Manager is read-only. No manager INSERT/UPDATE/DELETE on any business table.
- No delete anywhere. Retirement = stage change to `Cancelled`.
- Stage and outcome are separate fields; never conflate them.
- `organization_id` and role are resolved server-side from `user_profiles`, never from client input.
- Pipeline stages are per-organization rows (seeded on org creation), not a global/config table.

## If a requirement seems to need one of these, stop and flag it instead of building it

- A manager write action — out of scope for MVP (see D026).
- A new "kind of" metric that resembles an existing one — check `05_METRICS_DICTIONARY.md` first; a second metric that looks like an existing one is the exact failure mode D019–D021 closed.
- Deleting a record — doesn't exist in this product. Use the Cancelled stage instead.
