# 05 — Metrics Dictionary

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

All business metrics are calculated by the application, never by AI.

**Every metric in this document is implemented exactly once, in `lib/metrics/`.** The manager dashboard, the rep performance page, and the MCP tools import from that module. Nothing else computes a business number. If a number appears in the UI that does not come from `lib/metrics/`, that is a bug.

## Date Rules — read this first

| Metric family | Date field used |
|---|---|
| Lead creation (New Leads, Win Rate denominator) | `lead.lead_date` |
| Activity metrics | `activity.occurred_at` |
| Stage metrics (Meetings, conversion, aging) | `lead_stage_history.changed_at` |
| Outcome metrics (Won) | `lead_outcome_history.changed_at` |
| Follow-up metrics | `lead.next_follow_up_at` |

`lead.created_at` is **never** used in a metric. It is audit metadata only.

This matters because migrated pilot leads all carry a `created_at` of the migration day. Using it would make every historical lead appear to have been created on cutover, destroying all trend analysis from day one.

All period bucketing uses the organization timezone.

Working week for the pilot: Sunday–Thursday. This is a constant in `lib/metrics/`, not a database column.

## Lead Volume

### New Leads
Count of leads whose `lead_date` falls in the selected period.

### Active Leads
Count of leads whose current stage is non-terminal (not Closed, not Cancelled). This is a point-in-time count and is not period-filtered.

## Activity

### Total Activities
Count of activities whose `occurred_at` falls in the selected period.

### Activities per Working Day
Total Activities divided by elapsed working days in the period.

### Meeting Activities
Count of activities of type `Meeting` in the selected period.

This is an operational count, not a pipeline metric. It appears only in the rep's activity type breakdown. It never appears on a manager KPI card and is never called "Meetings".

## Pipeline

### Leads by Stage
Count of leads grouped by current stage. Point-in-time.

### Stage Entries
Count of distinct leads that entered a given stage during the selected period, from `lead_stage_history`.

### Meetings
**Count of distinct leads that entered the Meeting stage during the selected period.**

This is the canonical Meetings metric. It is the one on the KPI cards, in the team performance table, in the rep drill-down, and in `get_business_summary`. A lead that bounces in and out of Meeting within the period counts once.

### Average Time in Stage
Average elapsed days from a stage entry to the next stage transition, across completed spells that ended in the selected period. Leads currently sitting in the stage are excluded here — they are covered by Stage Aging.

### Avg Time in Follow Up
Average Time in Stage, applied to the Follow Up stage.

### Avg Time to Meeting
Average elapsed days from `lead.lead_date` to the lead's **first** entry into the Meeting stage, across leads whose first Meeting entry occurred in the selected period.

### Stage Aging
For leads currently in a stage: days since the most recent entry into that stage. Used to surface stalled leads.

### Stage-to-Stage Conversion
Of the leads that entered Stage A during the period, the percentage that subsequently entered Stage B at any later point. Always report the sample size alongside the rate.

## Outcome

### Won
Count of leads whose outcome changed to Won during the selected period, read from `lead_outcome_history`.

This is the number a manager reacts to daily: what closed this month.

### Win Rate
**Of the leads created in the selected period (by `lead_date`), the percentage whose current outcome is Won.**

Numerator and denominator are the same cohort, so the value can never exceed 100%.

Label it in the UI as **"Win Rate (leads created in period)"**. The parenthetical is part of the label, not a tooltip.

Known behaviour, not a bug: the current month's Win Rate will always read low, because leads created this month have not had time to close. The Won card sitting next to it carries the "what actually closed" story. Do not add a maturity adjustment, a weighting, or a second rate to compensate.

Removed from the original spec: **Known Outcome Close Rate**. A third percentage that looks similar and means something different is precisely how R5 happens.

## Follow-Up Health

All follow-up metrics consider only leads in non-terminal stages.

### Due Today
Leads whose `next_follow_up_at` falls on today in the organization timezone.

### Overdue Follow-Ups
Leads whose `next_follow_up_at` is earlier than now.

### Due Next 7 Days
Leads whose `next_follow_up_at` falls in the next 7 days, excluding today.

### Average Overdue Days
Average days overdue across currently overdue leads.

## Rollups

### Rep Metrics
- New Leads
- Active Leads
- Total Activities
- Meetings
- Won
- Win Rate
- Overdue Follow-Ups
- Avg Time in Follow Up
- Avg Time to Meeting
- Stage Conversion

### Source Metrics
Per source: Leads, Meetings, Won, Meeting Rate, Win Rate.

### Campaign Metrics
Per campaign: Leads, Meetings, Won, Meeting Rate, Win Rate.

Meeting Rate and Win Rate here use the same cohort logic as above: denominator is leads attributed to that source/campaign with `lead_date` in the period.

## Period Comparison

Current period versus the immediately preceding equivalent period, same length.

If the previous value is zero, show `New` or the absolute change. Never render an infinite or undefined percentage.

## Performance Signals

Descriptive only:
- Above team average
- Below team average
- Improving
- Declining
- Strong meeting conversion
- Weak meeting-to-win conversion
- High overdue follow-up count

No composite score in the MVP.

## Fixture Requirement

A fixed seed dataset lives at `supabase/seed/fixtures.sql`, with every metric above hand-calculated and recorded in `13_QA_TEST_PLAN.md`.

Metric tests assert `lib/metrics/` output against those hand-calculated numbers. Because the UI and MCP both call `lib/metrics/`, the UI-vs-MCP consistency check becomes true by construction rather than something to discover in QA.
