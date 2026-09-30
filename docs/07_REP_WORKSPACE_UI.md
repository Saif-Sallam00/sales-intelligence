# 07 — Sales Rep Workspace UI

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## Goal
Make the transition from the Hekal/Habiba spreadsheets easy.

The UI should feel spreadsheet-like, but cleaner.

## Grid Library Decision

**Use `react-data-grid` (Adazzle).** MIT, roughly 15kB, with inline editing, keyboard navigation, and virtual scrolling built in.

Rejected alternatives and why:
- **TanStack Table** — headless. Keyboard navigation, editing behaviour, and virtualization would all be hand-built. Weeks of work for capability this screen needs on day one.
- **AG Grid** — 338kB+, and the features that justify it (pivot, aggregation, Excel export) are out of scope. Most of them sit behind the Enterprise licence.

Run a half-day spike against 16 columns and a few thousand rows before starting EPIC 4.

## Navigation
- My Leads
- My Performance
- Follow-Ups
- Profile

## My Leads

Primary screen is an editable grid.

| # | Column | Editable |
|---:|---|---|
| 1 | Lead Date | yes |
| 2 | Prospect Name | yes |
| 3 | Job Title | yes |
| 4 | Company | yes |
| 5 | Industry | yes |
| 6 | Mobile | yes |
| 7 | Email | yes |
| 8 | Latest Action | derived |
| 9 | Latest Feedback | derived |
| 10 | Response Status | yes |
| 11 | Pipeline Stage | yes |
| 12 | Last Activity Date | derived |
| 13 | Next Follow-Up | yes |
| 14 | LinkedIn URL | yes |
| 15 | Final Media Plan Amount | yes |
| 16 | Final Quotation Amount | yes |

Derived columns come from the lead's most recent activity. They are read-only — the rep changes them by adding an activity, which is the behaviour that replaces the spreadsheet's repeated-feedback columns.

The Manager Comment column is removed. The manager is read-only in the MVP.

## Grid Requirements
- Add Row
- Inline editing
- Search
- Sort
- Filters
- Sticky headers
- Keyboard navigation
- Clear save/autosave state
- Open row details

## Important
Do not create fixed `2nd Feedback` / `3rd Feedback` / `4th Feedback` / `5th Feedback` columns.

These are activities. The grid shows the latest; the row detail shows the full history.

## Lead Detail Drawer

Show:
- prospect,
- company,
- stage,
- outcome,
- owner,
- source,
- campaign,
- contact info,
- amounts,
- activity timeline,
- next follow-up.

Actions:
- Add Activity
- Change Stage
- Set Outcome
- Set Follow-Up

There is no Delete action. A lead that is finished moves to the Cancelled stage.

## My Performance
Show:
- New Leads
- Active Leads
- Total Activities
- Meetings
- Won
- Win Rate (leads created in period)
- Overdue Follow-Ups
- Pipeline
- Activity type breakdown, including Meeting Activities
- Current vs Previous Period

## Follow-Ups
Sections:
- Overdue
- Due Today
- Upcoming (next 7 days)
