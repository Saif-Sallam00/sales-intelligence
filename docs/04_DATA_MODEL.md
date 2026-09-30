# 04 — Data Model Specification

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## Principle

The UI can resemble the spreadsheet, but the database must model business entities cleanly.

Repeated Feedback / Activity Date spreadsheet columns become Activity records.

## Global Rules

- Every business table carries `organization_id`, not null.
- All timestamps are `timestamptz`. All display and period bucketing uses the organization timezone.
- Money is `numeric(14,2)`. There is one currency per organization; no per-row currency, no conversion.
- Nothing is hard-deleted. There is no delete endpoint in the MVP.
- `lead_date` is the business date used by all metrics. `created_at` is audit metadata and never appears in a user-facing query.

## organizations
- id
- name
- timezone — pilot: `Africa/Cairo`
- currency — pilot: `EGP`, display only
- created_at
- updated_at

## user_profiles
- user_id (FK to `auth.users`)
- organization_id
- full_name
- role (`manager`, `rep`)
- active
- created_at
- updated_at

Role and organization are always resolved server-side from this table. A client-supplied organization_id is never trusted for authorization.

## leads
- id
- organization_id
- owner_user_id
- prospect_name
- company_name
- job_title
- industry
- phone
- email
- linkedin_url
- source_id
- campaign_id
- lead_date — business date; defaults to today on creation
- current_stage_id
- current_outcome
- response_status
- next_follow_up_at
- final_media_plan_amount — `numeric(14,2)`
- final_quotation_amount — `numeric(14,2)`
- created_at
- created_by
- updated_at
- updated_by

`current_stage_id` and `current_outcome` are denormalized current state for fast grid and pipeline reads. The authoritative record of change is the history tables.

**Removed from the original spec:**
- `manager_comment` — the manager is read-only in the MVP, so nothing could write it. If the pilot asks for it later, add it as an activity of type `Manager Note`; no schema or RLS change required.
- `archived_at` — the Cancelled stage covers this. "Active Leads" is defined by non-terminal stage alone.

## activities
- id
- organization_id
- lead_id
- owner_user_id
- activity_type
- occurred_at
- note
- next_follow_up_at
- created_at
- created_by

Activity types: `Call`, `Message`, `LinkedIn Outreach`, `WhatsApp`, `Email`, `Follow-Up`, `Meeting`, `Other`.

**Removed:** `response_status`. It exists on `leads` only. Keeping it in both places required a sync rule that would drift; the rep edits the lead-level value inline, exactly as in the spreadsheet.

## pipeline_stages
- id
- organization_id — **not null; stages are per organization**
- name
- position
- active
- terminal_flag

Seeded on organization creation:

| position | name | terminal |
|---:|---|---|
| 1 | New | no |
| 2 | Contact Attempted | no |
| 3 | Follow Up | no |
| 4 | Meeting | no |
| 5 | Ongoing | no |
| 6 | Closed | yes |
| 7 | Cancelled | yes |

RLS is the same org-scoped policy family as every other table. There is no global/system stage table and no configuration UI — adjusting stages during the pilot is a SQL update.

## lead_stage_history
- id
- organization_id
- lead_id
- from_stage_id
- to_stage_id
- changed_by
- changed_at

Written on lead creation (`from_stage_id = null`) and on every stage change. This table is the source for Meetings, stage conversion, time in stage, and stage aging.

## lead_outcome_history
- id
- organization_id
- lead_id
- from_outcome
- to_outcome
- changed_by
- changed_at

This table is the source for the Won metric.

## sources
- id
- organization_id
- name
- active
- created_at

## campaigns
- id
- organization_id
- name
- source_id (nullable)
- active
- created_at

## Relationship

```text
Organization
│
├── Users
├── Pipeline Stages
├── Sources
├── Campaigns
└── Leads
     ├── Owner
     ├── Stage
     ├── Outcome
     ├── Activities
     ├── Stage History
     └── Outcome History
```

## Indexes to Create Up Front

- `leads (organization_id, owner_user_id)`
- `leads (organization_id, lead_date)`
- `leads (organization_id, current_stage_id)`
- `leads (organization_id, next_follow_up_at)`
- `activities (organization_id, lead_id, occurred_at desc)`
- `activities (organization_id, owner_user_id, occurred_at)`
- `lead_stage_history (organization_id, lead_id, changed_at)`
- `lead_stage_history (organization_id, to_stage_id, changed_at)`
- `lead_outcome_history (organization_id, to_outcome, changed_at)`

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
| Repeated Feedback (2nd–5th) | additional `activity` rows |
| Response Status | `lead.response_status` |
| Pipeline Status | `lead.current_stage_id` |
| Activity Date | `activity.occurred_at` |
| Hekal Comment | *not imported — field removed* |
| LinkedIn URL | `lead.linkedin_url` |
| Final Media Plan Amount | `lead.final_media_plan_amount` |
| Final Quotation Amount | `lead.final_quotation_amount` |
| Team-specific sheet | `lead.owner_user_id` |
