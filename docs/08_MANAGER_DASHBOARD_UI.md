# 08 — Sales Manager Dashboard UI

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## Goal
The manager should understand the team in minutes.

The entire dashboard is read-only. There are no edit affordances anywhere in the manager experience.

## Navigation
- Overview
- Team
- Pipeline
- Sources
- Campaigns
- Follow-Ups
- Settings / AI Connection

## Global Filters
- Date Range
- Compare Previous Period
- Rep
- Source
- Campaign

## Overview KPIs
- Active Leads
- New Leads
- Total Activities
- Meetings
- Won
- Win Rate (leads created in period)
- Overdue Follow-Ups

Two labelling rules that are part of the spec, not styling:

- **Meetings** always means leads that entered the Meeting stage. The activity count is a different metric named Meeting Activities and does not appear here.
- **Win Rate** always carries its denominator in the label. It reads low for the current month by design; the Won card next to it carries the closed-this-month story.

## Team Pipeline
Rep × Stage matrix.

| Rep | New | Contact Attempted | Follow Up | Meeting | Ongoing |
|---|---:|---:|---:|---:|---:|

## Team Performance
Columns:
- Rep
- Activities
- New Leads
- Active Leads
- Meetings
- Won
- Win Rate
- Overdue
- Avg Time to Meeting
- Avg Time in Follow Up

## Rep Detail
Sections:
- Summary
- Pipeline
- Stage Conversion
- Stage Aging
- Follow-Up Health
- Source Performance
- Campaign Performance
- Rep vs Team
- Current vs Previous Period
- Recent Activity

## Performance Signals
Use:
- Strong meeting conversion
- Below-team win conversion
- High overdue follow-up count
- Activity improving
- Activity declining

Avoid subjective employee ratings. No composite score.

## Sources
Per source:
- Leads
- Meetings
- Won
- Meeting Rate
- Win Rate

## Campaigns
Same.

## Follow-Ups
Show:
- Overdue by rep
- Due Today
- Due Next 7 Days
- Overdue lead list

The manager can see an overdue lead but cannot edit it. The action is a conversation with the rep, not a click.
