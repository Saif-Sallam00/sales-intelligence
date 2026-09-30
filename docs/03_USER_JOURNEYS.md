# 03 — User Journeys

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## Account Creation (Operator, not in-app)
1. Operator creates the organization row.
2. Operator creates the manager auth user and profile.
3. Operator creates each rep auth user and profile.
4. Default pipeline stages are seeded for the organization.
5. Users receive credentials and set their own password via password reset.

There is no signup screen. This journey happens once per pilot org.

## Rep: Log In
1. Enter email and password.
2. Session established via `@supabase/ssr`.
3. Organization and role are resolved server-side from `user_profiles`.
4. Land on My Leads.

## Rep: Add Lead
1. Open My Leads.
2. Click Add Row.
3. Enter lead information.
4. `lead_date` defaults to today and remains editable.
5. Owner automatically becomes the current rep.
6. Initial stage history row is created (`from_stage_id = null`).
7. Manager analytics reflect the new lead.

## Rep: Update Lead
1. Find lead.
2. Edit inline or open detail.
3. Save.
4. If stage changed, write a stage history row.
5. If outcome changed, write an outcome history row.
6. Update timestamp and `updated_by`.

## Rep: Add Activity
1. Open lead.
2. Add Activity.
3. Choose type.
4. Enter note.
5. Enter date/time.
6. Optional next follow-up.
7. Save.
8. Timeline updates, and the lead's Latest Action / Latest Feedback / Last Activity Date derive from it.

## Rep: Retire a Lead
1. Open lead.
2. Change stage to Cancelled.
3. Optionally set outcome to Lost, Disqualified, or Unreachable.
4. Lead leaves Active Leads but stays in history.

There is no delete.

## Rep: Review Own Performance
1. Open My Performance.
2. Select period.
3. See KPIs.
4. See pipeline.
5. See follow-up health.
6. Compare with previous period.

## Manager: Daily Team Check
1. Log in.
2. Open Overview.
3. Review KPIs.
4. Review team pipeline.
5. Review team performance table.
6. Drill into a rep needing attention.

## Manager: Coaching Review
1. Open rep.
2. Review activity.
3. Review stage conversion.
4. Review stage aging.
5. Review follow-up discipline.
6. Compare rep to team.
7. Compare rep to previous period.

## Manager: Source/Campaign Review
1. Select period.
2. Open Sources/Campaigns.
3. Review Leads, Meetings, Won, conversion.
4. Use data for allocation decisions.

## Manager: Ask AI
1. Connect ChatGPT/Claude.
2. Authenticate.
3. AI receives read-only manager scope.
4. Manager asks a business question.
5. AI calls MCP tools.
6. SaaS returns trusted metrics from `lib/metrics/`.
7. AI explains.
