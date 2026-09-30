# 11 — Pilot Migration Plan

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## Pilot Users
Existing users of the Hekal/Habiba/Salma-style sheets.

## Migration Goal
Minimize behaviour change while removing spreadsheet limitations.

## Familiar
- tabular working view,
- one row per lead,
- inline editing,
- familiar fields,
- pipeline status,
- notes,
- dates,
- amounts.

## Improved
- individual login,
- rep isolation,
- no cross-rep edits,
- automatic stage and outcome history,
- live manager analytics,
- unlimited activity history,
- structured follow-ups.

## Critical Import Rule

**Connection Date maps to `lead.lead_date`, and every metric reads `lead_date`.**

`created_at` will be the migration timestamp for every imported row. Nothing user-facing may read it. If a metric ever reads `created_at`, the entire pilot history collapses onto cutover day and all trend analysis becomes meaningless. This is the single highest-risk detail in the migration.

## Legacy Mapping

| Legacy | SaaS |
|---|---|
| Connection Date | `lead.lead_date` |
| Name | `lead.prospect_name` |
| Job Title | `lead.job_title` |
| Company | `lead.company_name` |
| Industry | `lead.industry` |
| Mobile | `lead.phone` |
| Action | `activity.activity_type` |
| Feedback | `activity.note` |
| Response Status | `lead.response_status` |
| Repeated Feedback (2nd–5th) | additional `activity` rows |
| Activity Date | `activity.occurred_at` |
| Pipeline Status | `lead.current_stage_id` |
| Hekal Comment | **not imported** — field removed from the model |
| LinkedIn URL | `lead.linkedin_url` |
| Final Media Plan Amount | `lead.final_media_plan_amount` |
| Final Quotation Amount | `lead.final_quotation_amount` |

## Stage History Backfill

The sheets hold current state only, not history. For each imported lead write a single `lead_stage_history` row:

- `from_stage_id = null`
- `to_stage_id` = the mapped current stage
- `changed_at` = `lead_date`
- `changed_by` = the migration operator

This makes imported leads visible to stage-based metrics without inventing transitions that never happened. Accept the consequence knowingly: **Meetings, stage conversion, and time-in-stage are only meaningful for activity that happens after cutover.** Say this to the manager during training so the first month's numbers are not mistrusted.

Outcome history gets the same treatment where an outcome is known.

## Sheet-to-User Mapping
- Habiba sheet → Habiba user
- Hekal sheet → Hekal user
- Salma sheet → Salma user

## Sequence
1. Create the organization (timezone `Africa/Cairo`, currency `EGP`).
2. Seed the seven default pipeline stages.
3. Create the manager auth user and profile.
4. Create each rep auth user and profile.
5. Seed sources and campaigns.
6. Run the controlled import script.
7. Validate counts per rep.
8. Validate values (amounts, dates, stages).
9. Validate activity conversion.
10. Spot-check with each rep against their own sheet.
11. Train reps, then the manager.
12. Cut over.

This is a one-off script targeted at three known sheets. It is not a generic importer, and it does not become a product feature.

## Do Not Import
- normalized sheets,
- duplicate group IDs,
- parsing confidence columns,
- refresh logs,
- chart helper data,
- Apps Script metadata,
- Hekal Comment.
