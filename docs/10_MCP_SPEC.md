# 10 — Remote MCP Specification

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## Purpose
Let a manager connect ChatGPT or Claude and ask questions about trusted SaaS data.

## Rule
AI receives business capabilities, not raw database access.

Every tool below is a thin wrapper over a `lib/metrics/` function — the same function the dashboard calls. MCP does not contain its own query logic. This is what makes UI/MCP consistency structural rather than something QA has to chase.

## Authentication
1. Authenticate the user.
2. Resolve organization server-side.
3. Resolve role server-side.
4. Reject if role is not `manager` — the first release is manager-only.
5. Authorize the requested rep/filter against that organization.
6. Run the read-only tool.

## Tools

### get_business_summary
Inputs: `date_from`, `date_to`

Returns: Active Leads, New Leads, Total Activities, Meetings, Won, Win Rate, Overdue Follow-Ups.

"Meetings" here is leads entering the Meeting stage, identical to the KPI card.

### get_team_performance
Inputs: `date_from`, `date_to`

Returns per rep: Activities, New Leads, Active Leads, Meetings, Won, Win Rate, Overdue Follow-Ups, Avg Time to Meeting, Avg Time in Follow Up.

### get_rep_performance
Inputs: `rep_id`, `date_from`, `date_to`

Returns: KPIs, pipeline, conversion, follow-up health, period comparison.

Rejects any `rep_id` outside the caller's organization.

### get_pipeline_summary
Returns: counts by stage, counts by rep × stage.

### get_stage_conversion
Returns: transition rates with sample sizes. Never a rate without its denominator.

### get_followup_health
Returns: overdue, due today, due next 7 days, average overdue days.

### get_source_performance
Returns by source: Leads, Meetings, Won, Meeting Rate, Win Rate.

### get_campaign_performance
Same, by campaign.

### get_leads
Bounded business-record access.

Allowed filters: rep, stage, outcome, source, campaign, follow-up state, date range.

Hard limit: 100 rows per call, with a cursor for paging. No unbounded result sets.

### get_recent_activities
Bounded activity context. Hard limit: 100 rows per call.

## Security Rules
- no caller-supplied `organization_id`,
- no raw SQL,
- no arbitrary table names,
- bounded output on every tool,
- no secrets in any response,
- no writes of any kind,
- rep accounts rejected at the auth step.

## Supported Questions
- How is the team doing this month?
- Who improved the most?
- Where is the funnel stuck?
- Which rep has the most overdue follow-ups?
- Which campaign has the best conversion?
- Compare September with August.
- What are Ahmed's strengths and weaknesses?

## Grounding Rule
The SaaS calculates. The AI explains.
