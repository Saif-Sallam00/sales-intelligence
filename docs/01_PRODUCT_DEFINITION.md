# 01 — Product Definition

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## Working Category

**Sales Team Performance & Pipeline Intelligence SaaS**

## Primary Buyer

**Sales Manager**

## Secondary User

**Sales Rep**

## Core Problem

The Sales Manager needs to monitor the team every day and understand:

- where the pipeline is currently stuck,
- what each rep is doing,
- who is progressing leads,
- who is struggling,
- where each rep is strong,
- where each rep is weak,
- how the team is changing over time,
- which sources/campaigns are producing stronger results,
- which follow-ups are overdue.

The manager should be able to take operational and coaching decisions based on reliable analytics.

## Rep Job-to-be-Done

> Keep my leads updated quickly, see what I have done, know what needs follow-up, and view my own performance.

## Manager Job-to-be-Done

> Understand team performance and pipeline health every day, identify bottlenecks and coaching opportunities, and make decisions using evidence.

## Product Boundaries

### In Scope
- lead tracking,
- activity tracking,
- pipeline stage tracking,
- outcome tracking,
- follow-up tracking,
- rep performance,
- manager analytics,
- source/campaign performance,
- period comparison,
- read-only AI analysis through MCP.

### Out of Scope
- full CRM automation,
- WhatsApp sending,
- email sending,
- call center,
- invoices,
- proposals,
- marketing automation,
- workflow engine,
- generic BI builder,
- AI write actions,
- self-service signup,
- lead deletion,
- manager write access.

## Initial Pipeline Stages

1. New
2. Contact Attempted
3. Follow Up
4. Meeting
5. Ongoing
6. Closed *(terminal)*
7. Cancelled *(terminal)*

Stages are stored per organization and seeded on organization creation. There is no stage configuration UI in the MVP — changing a stage during the pilot is a SQL update.

## Outcome Values

- Open
- Won
- Lost
- Disqualified
- Unreachable
- null / not set

## Important Rule

**Stage and Outcome are separate.**

Examples:
- Closed + Won
- Closed + Lost
- Cancelled + Lost
- Contact Attempted + Unreachable
- Follow Up + Open

## Historical Requirement

Every stage change and every outcome change must be stored historically.

This is required for:
- stage-to-stage conversion,
- time in stage,
- bottleneck analysis,
- rep strengths/weaknesses,
- trend analysis,
- the Won and Meetings metrics, which are both read from history rather than from current state.

## Dead Leads, Not Deleted Leads

There is no delete and no archive flag. A lead that is no longer worth pursuing moves to the **Cancelled** stage.

This preserves the history the entire analytics layer depends on, and removes an entire class of "who can delete what" permission questions.

## Product UX Direction

Rep:
- spreadsheet-style working view.

Manager:
- dashboard, comparisons, drill-downs, read-only.

Same data model underneath.
