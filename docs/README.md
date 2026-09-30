# BD Sales Intelligence SaaS — Complete Project Handoff Pack

**Revision 2.** Ten gaps found in the pre-implementation review are closed. Every change is recorded as D018–D030 in `15_DECISION_LOG.md`, with the reasoning, so nobody has to reverse-engineer it later.

This folder is the complete implementation handoff for the SaaS product derived from the BD Analytics 2026 proof of concept. A developer or small product team should be able to start implementation without further product clarification for the MVP.

## Product in One Sentence

A lightweight sales execution and intelligence SaaS where sales reps maintain their own leads in a familiar spreadsheet-style workspace, while sales managers monitor the whole team's pipeline, performance, strengths, weaknesses, follow-up health, and trends over time.

## Critical Product Principle

**Do not rebuild the Google Sheets / Apps Script architecture.**

The existing workbook was a proof of concept built around messy and inconsistent spreadsheet data. The SaaS preserves the proven business value using a clean application model.

## The Three Rules That Prevent the Most Damage

1. **`lead_date` is the metric date.** `created_at` is audit-only and never appears in a user-facing query. Migrated leads all share a cutover `created_at`; reading it would erase three months of history.
2. **Every business number comes from `lib/metrics/`.** The dashboard, the rep page, and the MCP tools all import the same functions. Nothing else computes a metric.
3. **One word, one meaning.** Meetings means stage entries. Meeting Activities means the activity count. Win Rate always carries its denominator in the label.

## Target Users

### Sales Rep
- Individual login.
- Sees and updates only their own leads.
- Adds leads, updates leads, adds activities, changes stage, records outcome, sets follow-up.
- Sees their own performance.
- Cannot delete anything.

### Sales Manager
- Uses the product daily.
- Sees all reps, the whole team pipeline, rep comparisons, drill-downs, and period comparisons.
- Identifies bottlenecks, strengths, weaknesses, overdue follow-ups, and trends.
- **Read-only across the organization in the MVP.**

### AI Client
- Connects through a read-only remote MCP endpoint.
- Manager-only in the first release.
- Uses the authenticated manager's permissions.
- Reads trusted metrics; cannot create, edit, move, delete, assign, or modify anything.

## MVP Technology

- Next.js
- Supabase: PostgreSQL, Authentication, Row Level Security
- `react-data-grid` for the rep workspace
- Vercel
- Remote MCP endpoint inside the same Next.js codebase
- pgTAP via `supabase test db` for policy tests
- Playwright for user journeys

No OpenAI API. No Anthropic API. No separate backend. No microservices. No Redis. No data warehouse. No vector database.

## Read Order

1. `00_MASTER_CONTEXT.md`
2. `01_PRODUCT_DEFINITION.md`
3. `02_MVP_PRD.md`
4. `03_USER_JOURNEYS.md`
5. `04_DATA_MODEL.md`
6. `05_METRICS_DICTIONARY.md`
7. `06_PERMISSIONS_SECURITY.md`
8. `07_REP_WORKSPACE_UI.md`
9. `08_MANAGER_DASHBOARD_UI.md`
10. `09_TECHNICAL_ARCHITECTURE.md`
11. `10_MCP_SPEC.md`
12. `11_MIGRATION_PILOT.md`
13. `12_IMPLEMENTATION_BACKLOG.md`
14. `13_QA_TEST_PLAN.md`
15. `14_LAUNCH_CHECKLIST.md`
16. `15_DECISION_LOG.md`
17. `16_RISK_REGISTER.md`
18. `17_DEVELOPER_HANDOFF.md`
19. `project_config.json`

## Definition of MVP Success

1. A sales rep can log in and work naturally in a familiar spreadsheet-like workspace.
2. The rep can add and update leads without seeing another rep's data, verified by pgTAP rather than assumed.
3. A sales manager can see the complete team pipeline and current performance.
4. The manager can identify who is performing well, who is struggling, and where the pipeline is stuck.
5. Historical stage and outcome movement is stored so performance over time can be analysed.
6. The manager can compare periods.
7. The manager can connect ChatGPT or Claude through a read-only MCP connector and get answers backed by the same `lib/metrics/` functions the UI uses.
8. The product is useful with no AI client connected.
