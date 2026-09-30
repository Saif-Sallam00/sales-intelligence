@AGENTS.md

# Sales Intelligence SaaS

## Product

A lightweight sales execution and intelligence SaaS. Reps maintain their own leads in a spreadsheet-style workspace; managers monitor the whole team's pipeline, performance, and trends read-only. Full context: `docs/00_MASTER_CONTEXT.md`.

## Stack

Next.js 16 (App Router, modular monolith) · Supabase (Postgres, Auth, RLS) · `react-data-grid` · Vercel · pgTAP (`supabase test db`) · Playwright. No separate backend, no AI API, no microservices/Redis/Kafka/warehouse/vector DB unless a real production need appears.

## Hard Rules

- `lead_date` is the metric date. Never read `lead.created_at` in a user-facing query or a metric — it is audit-only.
- Every business number is computed exactly once, in `lib/metrics/`. The dashboard, the rep page, and MCP tools all import from it. Nothing else computes a business number.
- **Meetings** = leads entering the Meeting stage. **Meeting Activities** = count of Meeting-type activities (rep breakdown only). **Win Rate** always carries its denominator in the label ("Win Rate (leads created in period)"). One word, one meaning — see `docs/15_DECISION_LOG.md` D019–D021.
- Manager is read-only across the organization: no manager writes, no lead deletion, no self-service signup, no stage configuration UI in the MVP.
- Organization and role are always resolved server-side from `user_profiles`. Never trust a client-supplied `organization_id` for authorization.
- No hard delete anywhere. A dead lead moves to the `Cancelled` stage.

## Working Process

- Work epic by epic per `docs/12_IMPLEMENTATION_BACKLOG.md`. Finish one epic, verify it, stop — don't chain epics in a single session.
- pgTAP RLS tests are written in EPIC 3, alongside the policies, not after the UI.
- Run `/security-review` before ending any session that touched auth, RLS, or `leads`/`activities` tables.

## Docs

Read order and full index: `docs/README.md`. Start with `docs/00_MASTER_CONTEXT.md`. Most-referenced during implementation:
- `docs/04_DATA_MODEL.md` — schema
- `docs/05_METRICS_DICTIONARY.md` — every metric, single source of truth
- `docs/06_PERMISSIONS_SECURITY.md` — the two RLS policy families
- `docs/10_MCP_SPEC.md` — MCP tool contracts (manager-only, read-only)
- `docs/15_DECISION_LOG.md` — why each non-obvious choice was made (D001–D030)

## Tooling

- Skills: `supabase`, `supabase-postgres-best-practices`, `vercel-react-best-practices` (via `.agents/skills/`). Project-specific skills (`product-rules`, `analytics-definitions`) live in `.claude/skills/`.
- MCP servers (`.mcp.json`): `supabase` (schema/RLS/advisors — run `supabase login` once to authenticate), `next-devtools` (Next 16 docs + dev-server error reading).
- Agents (`.claude/agents/`): `architect-reviewer`, `db-security-reviewer`.
