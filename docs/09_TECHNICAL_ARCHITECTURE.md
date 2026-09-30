# 09 — Technical Architecture

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## Goal
Production-ready but intentionally simple.

## Architecture

```text
Browser
  │
  ▼
Next.js
  ├── UI
  ├── Server Actions / Route Handlers
  ├── Domain Logic
  ├── lib/metrics  ← every business number, computed once
  └── MCP Endpoint
          │
          ▼
Supabase
  ├── PostgreSQL
  ├── Authentication
  └── Row Level Security
```

AI clients:

```text
ChatGPT / Claude
      │
      ▼
Read-only MCP
      │
      ▼
lib/metrics (same functions the UI calls)
      │
      ▼
PostgreSQL
```

## The Metrics Module

`lib/metrics/` exports typed functions such as:

```ts
getBusinessSummary(orgId, from, to, filters)
getTeamPerformance(orgId, from, to, filters)
getRepPerformance(orgId, repId, from, to)
getPipelineSummary(orgId, from, to, filters)
getStageConversion(orgId, from, to, filters)
getFollowupHealth(orgId, filters)
getSourcePerformance(orgId, from, to)
getCampaignPerformance(orgId, from, to)
```

The manager dashboard imports it. The rep performance page imports it. The MCP tools import it. Nothing else computes a business number.

Deliberately **not** database views — they are awkward to parameterize by date range and filter set, and maintaining them inside migrations adds friction for no benefit at this size. Deliberately not a service either. Just a folder of functions.

This is the structural mitigation for R5. A skill or a document telling Claude to keep metrics consistent is a soft guardrail; a single module is a hard one.

## Why Next.js
- one codebase,
- frontend and server logic together,
- fewer deployments,
- faster iteration,
- authenticated server-side logic,
- MCP lives in the same project.

## Why PostgreSQL
The domain is relational and analytics-heavy: users, leads, activities, stages, campaigns, sources, histories, joins, group-by, date ranges.

## Why Supabase
Hosted Postgres, auth, RLS, admin tooling, pgTAP already installed, managed infrastructure.

## Why No Separate Backend
Not needed until a real requirement appears: a public API, multiple client apps, heavy integrations, independent scaling, or a large team.

## Architecture Style
Modular monolith.

Logical modules:
- auth
- organizations
- leads
- activities
- pipeline
- metrics
- followups
- mcp

## Testing Layers — two, not three

| Layer | Tool | Covers |
|---|---|---|
| Database | pgTAP via `supabase test db` | RLS policies, tenant isolation, rep isolation |
| Application | Playwright | user journeys, grid behaviour, dashboards |

Metric correctness is covered by unit tests over `lib/metrics/` against the seed fixture.

No third layer. No separate integration suite.

## No Early Infrastructure
Do not add Redis, Kafka, microservices, a warehouse, a vector DB, or a separate worker unless a measured need exists.

## Hosting
- Vercel
- Supabase
- GitHub

## Environments
- development (local Supabase via CLI)
- production

Nothing in between until there is a reason.
