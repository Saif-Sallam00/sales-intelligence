# 16 — Risk Register

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## R1 — Becoming a Full CRM
Severity: High
Mitigation: scope held to lead maintenance plus intelligence. Manager is read-only; no delete; no workflow engine; no configuration UI. See D022, D026.

## R2 — Copying Spreadsheet Technical Debt
Severity: High
Mitigation: repeated feedback columns become activities; `manager_comment` and duplicated `response_status` removed. See D022, D023.

## R3 — Rep Adoption Resistance
Severity: High
Mitigation: spreadsheet-like grid with inline editing and keyboard navigation, delivered via `react-data-grid` rather than hand-built. Half-day spike before EPIC 4. See D028.

## R4 — Manager Metric Overload
Severity: Medium
Mitigation: seven KPI cards, descriptive signals only, no composite score.

## R5 — Metric Definition Ambiguity
Severity: High
Mitigation: structural, not documentary. All metrics live in `lib/metrics/`; Win Rate is cohort-based with its denominator in the label; Meetings has one definition; Known Outcome Close Rate is removed. Fixture unit tests assert hand-calculated values. See D019, D020, D021, D027.

## R6 — Rep Data Leakage
Severity: Critical
Mitigation: RLS plus a pgTAP suite written in EPIC 3 and run in CI on every PR, including a guard test that fails if any API-reachable table has RLS off. See D030.

## R7 — Organization Data Leakage
Severity: Critical
Mitigation: tenant-scoped RLS on every table; organization always resolved server-side; pgTAP cross-org tests. See D030.

## R8 — AI Provider Dependency
Severity: Medium
Mitigation: AI is optional; the product is complete without it.

## R9 — MCP Platform Changes
Severity: Medium
Mitigation: MCP tools are thin wrappers over `lib/metrics/`. If the protocol or a provider changes, only the wrapper layer changes.

## R10 — Dirty Pilot Migration
Severity: Medium
Mitigation: one controlled script for three known sheets, not a generic importer. Explicit validation step per rep.

## R11 — Pipeline Stage Mismatch
Severity: Medium
Mitigation: stages are per organization and adjusted by SQL update during the pilot. No configurability is built ahead of need. See D024.

## R12 — Performance Signals Feel Judgmental
Severity: Medium
Mitigation: descriptive signals only, no composite score, no ranking.

## R13 — Migration Date Collapse
Severity: High
New in revision 2.
Every imported lead shares a `created_at` of cutover day. If any metric reads `created_at` instead of `lead_date`, three months of pilot history collapses onto one date and all trend analysis becomes meaningless.
Mitigation: D018 makes `lead_date` the sole metric date. `14_LAUNCH_CHECKLIST.md` includes a sample verification against Connection Date.

## R14 — Thin Post-Cutover History
Severity: Medium
New in revision 2.
The source sheets hold current state only, so imported leads get a single synthetic stage history row. Meetings, stage conversion, and time-in-stage are therefore only meaningful for activity occurring after cutover.
Mitigation: the backfill rule is documented in `11_MIGRATION_PILOT.md`, and setting this expectation with the manager is a line item on the launch checklist.
