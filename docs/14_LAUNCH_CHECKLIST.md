# 14 — Launch Checklist

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## Product
- [ ] MVP scope frozen
- [ ] Pipeline stages confirmed with the manager
- [ ] Outcomes confirmed
- [ ] Required lead fields confirmed
- [ ] Manager metrics confirmed
- [ ] Manager understands Meetings means stage entries, not Meeting activities
- [ ] Manager understands Win Rate is cohort-based and reads low for the current month

## Infrastructure
- [ ] Production Supabase project
- [ ] Production Vercel project
- [ ] Production domain
- [ ] Secrets configured, service-role key server-side only

## Accounts
- [ ] Organization created with correct timezone and currency
- [ ] Default stages seeded
- [ ] Manager account
- [ ] Rep accounts
- [ ] Password reset flow verified end to end

## Security
- [ ] RLS enabled on every business table
- [ ] pgTAP suite passing
- [ ] pgTAP running in CI on every PR
- [ ] Rep isolation verified
- [ ] Org isolation verified
- [ ] Manager verified read-only
- [ ] No delete path exists
- [ ] `/security-review` run against the diff

## Data
- [ ] Pilot import complete
- [ ] Counts checked per rep
- [ ] Owner mapping checked
- [ ] Stage mapping checked
- [ ] Amounts checked
- [ ] Activities spot-checked
- [ ] `lead_date` verified against Connection Date on a sample

## UX
- [ ] Add lead works
- [ ] Inline edit works
- [ ] Add activity works
- [ ] Stage change works and writes history
- [ ] Outcome change works and writes history
- [ ] Follow-up works
- [ ] Manager dashboard works
- [ ] Rep drill-down works
- [ ] No edit affordance anywhere in the manager UI

## Metrics
- [ ] Every metric in `05` implemented in `lib/metrics/`
- [ ] Fixture unit tests passing
- [ ] Nothing outside `lib/metrics/` computes a business number

## Pilot
- [ ] Rep training
- [ ] Manager training
- [ ] Expectation set: stage-based metrics are meaningful only after cutover
- [ ] Support channel
- [ ] Cutover date
- [ ] Feedback review date

## MCP, if included
- [ ] Read-only verified
- [ ] Manager-only gating verified
- [ ] Rep account rejected
- [ ] Auth works
- [ ] Bounded outputs on every tool
- [ ] UI/MCP consistency verified
