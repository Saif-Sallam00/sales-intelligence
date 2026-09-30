# 02 — MVP Product Requirements Document

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## Objective

Build a simple production SaaS where:
- reps maintain their own sales data,
- managers monitor the entire team,
- historical pipeline movement is recorded,
- the manager can later connect ChatGPT/Claude through read-only MCP.

## Roles

### Rep
Can:
- read own leads,
- create own leads,
- edit own leads,
- add own activities,
- change own lead stage,
- change own lead outcome,
- set follow-up,
- view own performance.

Cannot:
- see other reps' leads,
- edit other reps' data,
- see organization-wide analytics,
- delete leads or activities.

### Manager
Can:
- read all organization leads,
- read all organization activities,
- read all stage and outcome history,
- see all reps,
- see team analytics,
- see rep analytics,
- compare periods,
- filter by rep/source/campaign/stage,
- connect read-only AI.

Cannot:
- create, edit, or delete any business record in the MVP.

Manager write access is deliberately out of scope. If the pilot needs a correction, it is made directly in the database by the operator. This keeps the RLS model to two simple policy families.

## Accounts

There is no self-service signup in the MVP.

Manager and rep accounts are created manually during pilot setup (see `11_MIGRATION_PILOT.md`). The application implements login, session handling, and password reset only.

## Sales Rep Workspace

### Main Screen
Spreadsheet-style lead grid.

Columns:
- Lead Date
- Prospect Name
- Job Title
- Company
- Industry
- Mobile
- Email
- Latest Action
- Latest Feedback
- Response Status
- Pipeline Stage
- Last Activity Date
- Next Follow-Up
- LinkedIn URL
- Final Media Plan Amount
- Final Quotation Amount

**Latest Action**, **Latest Feedback**, and **Last Activity Date** are derived from the most recent activity on the lead. They are read-only in the grid; the rep changes them by adding an activity.

**Response Status** lives on the lead and is edited inline. It is not stored on activities.

### Required Behaviors
- Add Row / Add Lead
- Inline edit
- Search
- Sort
- Filter
- Keyboard-friendly navigation
- Row details
- Save status / autosave feedback

### Lead Detail
- core fields,
- current stage,
- outcome,
- source,
- campaign,
- full activity timeline,
- next follow-up,
- commercial amounts.

### Activities
Types:
- Call
- Message
- LinkedIn Outreach
- WhatsApp
- Email
- Follow-Up
- Meeting
- Other

Each activity stores:
- lead,
- rep,
- type,
- occurred_at,
- note,
- optional next follow-up.

## Manager Dashboard

### KPI Cards
- Active Leads
- New Leads
- Total Activities
- Meetings
- Won
- Win Rate (leads created in period)
- Overdue Follow-Ups

"Meetings" always means leads that entered the Meeting stage. The raw count of Meeting-type activities is a separate metric named **Meeting Activities** and never appears on a manager KPI card.

### Team Pipeline
By rep and current stage.

### Team Performance
Per rep:
- Activities
- New Leads
- Active Leads
- Meetings
- Won
- Win Rate
- Overdue Follow-Ups
- Avg Time in Follow Up
- Avg Time to Meeting

### Rep Drill-Down
- current pipeline,
- activities,
- conversion,
- stage aging,
- follow-up health,
- source performance,
- campaign performance,
- rep vs team,
- current vs previous period.

### Global Filters
- Today
- This Week
- Last Week
- This Month
- Last Month
- Custom Range
- Rep
- Source
- Campaign

## Follow-Up View

Rep:
- overdue,
- due today,
- upcoming.

Manager:
- overdue by rep,
- overdue leads,
- due today,
- upcoming.

## Performance Signals

Use descriptive signals:
- Above team average
- Below team average
- Improving
- Declining
- Strong meeting conversion
- Low meeting-to-win conversion
- High overdue follow-up count

No arbitrary overall score in MVP.

## AI / MCP

Not required for first UI milestone.

Must be read-only.

## Out of Scope

- AI writes,
- manager writes,
- lead deletion,
- self-service signup,
- full CRM automation,
- generic spreadsheet parser,
- custom workflow engine,
- arbitrary report builder,
- external integration marketplace,
- stage configuration UI.
