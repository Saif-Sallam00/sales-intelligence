# 06 — Permissions & Security

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## Roles
- `manager`
- `rep`

## Tenant Rule
Every business record carries `organization_id`, not null. Every policy is scoped by it.

The organization and role are always resolved server-side from `user_profiles`. A client-supplied `organization_id` is never trusted for authorization, ever.

## Two Policy Families — that is the whole model

### Rep
- SELECT, INSERT, UPDATE on own leads (`owner_user_id = auth.uid()`)
- SELECT, INSERT on activities belonging to own leads
- SELECT on own stage and outcome history
- SELECT on own organization's stages, sources, campaigns
- No DELETE anywhere
- Cannot see, read, or write another rep's rows
- Cannot change organization or role

### Manager
- SELECT on all rows in their organization: leads, activities, stage history, outcome history, stages, sources, campaigns, user profiles
- No INSERT, UPDATE, or DELETE on any business table
- Cannot change organization or role

**Manager write access is deliberately out of scope for the MVP.** The manager analyses; the rep owns the data. This removes column-level exceptions, "who overrode what" audit questions, and an entire branch of RLS policy. If the pilot requires a correction, the operator makes it directly in the database.

Nothing in the product performs a hard delete.

## MCP Security

MCP must:
1. authenticate the user,
2. resolve role server-side,
3. resolve organization server-side,
4. scope every read to that organization,
5. reject any rep_id that does not belong to that organization,
6. reject connections from `rep` accounts — the first MCP release is manager-only.

## MCP Is Read-Only

No MCP tool may:
- INSERT, UPDATE, DELETE,
- change stage or outcome,
- create an activity,
- change permissions,
- accept raw SQL,
- accept a table name,
- accept an `organization_id` from the caller.

## Audit
- `created_by` and `updated_by` on leads
- `created_by` on activities
- `changed_by` on stage and outcome history

## Testing Requirement

Every rule in this document is covered by a pgTAP test under `supabase/tests/database/`, written during EPIC 3 and run by `supabase test db` in CI on every pull request.

Application-level E2E tests verify user journeys. pgTAP verifies the policies themselves, so a later migration cannot silently weaken a policy that the UI happens not to expose.
