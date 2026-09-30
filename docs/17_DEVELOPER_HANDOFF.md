# 17 — Developer Handoff

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## What to Build
A production MVP of a lightweight sales team performance and pipeline intelligence SaaS.

## Build Order
1. Next.js + Supabase setup
2. Auth, organization, roles
3. Core schema
4. RLS **and its pgTAP suite**
5. Rep grid
6. Lead detail and activities
7. Stage and outcome history
8. `lib/metrics/` and the seed fixture
9. Rep performance
10. Manager dashboard
11. Rep drill-down
12. Source and campaign analytics
13. Pilot import
14. QA and security review
15. Pilot launch
16. MCP

Steps 4 and 8 are the two that get skipped under pressure and cost the most later.

## Hard Rules

Do not add:
- FastAPI or NestJS backend
- Redis
- Kafka
- microservices
- data warehouse
- vector DB
- AI API
- generic rule engine
- generic spreadsheet parser
- stage configuration UI

unless there is a real production requirement.

Do not:
- read `lead.created_at` in any user-facing query,
- compute a business number anywhere outside `lib/metrics/`,
- use a spreadsheet row number as an ID,
- trust a client-supplied organization ID for authorization,
- calculate business truth inside AI,
- expose raw DB tables to MCP,
- allow MCP writes,
- implement a delete endpoint,
- give the manager write access.

## Naming Rules That Matter

- **Meetings** = leads entering the Meeting stage. Always.
- **Meeting Activities** = count of Meeting-type activities. Rep breakdown only.
- **Win Rate** always ships with its denominator in the label.

These three exist because the same word meaning two things is how the UI and the MCP end up disagreeing.

## Rep UX
Optimize for speed: grid, keyboard, inline edit, few clicks. `react-data-grid`.

## Manager UX
Optimize for clarity: daily overview, pipeline, rep comparison, trends, follow-up risk, drill-down. Read-only throughout — no edit affordances.

## Done Definition

Core MVP is done when:
- reps can stop updating daily spreadsheets,
- the manager can monitor the team without touching raw sheets,
- the pgTAP suite passes and runs in CI,
- every metric matches its hand-calculated fixture value,
- stage and outcome history are written on every change.

MCP is done when:
- the manager can connect an AI client,
- every tool wraps a `lib/metrics/` function,
- AI values match UI values for identical filters,
- AI cannot modify data,
- rep accounts are rejected.
