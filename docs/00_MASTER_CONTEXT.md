# 00 — Master Project Context

> Revision 2 — decisions D018–D027 applied. See `15_DECISION_LOG.md`.

## Purpose

This document captures the core business and product context learned from the existing BD Analytics proof of concept and the decisions for the new SaaS.

## Existing POC

The current BD Analytics 2026 solution is a Google Sheets + Google Apps Script proof of concept.

Its purpose was to prove demand for:
- sales/BD visibility,
- team performance analysis,
- pipeline monitoring,
- campaign/source analytics,
- follow-up monitoring,
- management dashboards.

The POC became technically complex mainly because the source data was messy and inconsistent.

It had to include:
- normalization layers,
- schema-specific parsing,
- reconstruction logic,
- duplicate detection,
- hard-coded mappings,
- data-quality flags,
- sample/full processing modes,
- spreadsheet chart workarounds.

That complexity should **not** be copied into the SaaS.

## Key Business Knowledge from the POC

The business value that should carry forward:

- managers need daily visibility into team performance,
- managers need to know where the pipeline is stuck,
- reps should have individual accountability,
- performance must be viewable per rep,
- performance should be comparable over time,
- managers care about source and campaign effectiveness,
- follow-up aging matters,
- meetings matter,
- conversion matters,
- "Closed" does not automatically mean "Won",
- stage and outcome should be separate concepts,
- historical stage movement is required for real bottleneck analysis,
- free-text notes contain business value,
- AI should explain trusted data rather than invent metrics.

## SaaS Direction

The new product is:

> A lightweight sales performance and pipeline intelligence SaaS for Sales Managers and their teams.

The product is not intended to be a full CRM.

It includes only the operational features required to produce reliable sales intelligence.

## User Model

### Sales Rep
- Works in a spreadsheet-like lead workspace.
- Adds/updates leads.
- Records activities.
- Changes stages.
- Sets outcomes.
- Manages follow-ups.
- Sees only their own data and performance.

### Sales Manager
- Monitors the team daily.
- Sees all reps in the organization.
- Sees pipeline by rep.
- Compares reps.
- Compares periods.
- Drills down to one rep.
- Identifies strengths, weaknesses, bottlenecks, and overdue follow-ups.
- **Read-only across the organization in the MVP.** The manager analyses; the rep owns the data.

## UX Principle

The first pilot users already work in Hekal/Habiba-style spreadsheets.

Therefore:

**Familiar frontend. Clean backend.**

The rep UX should preserve spreadsheet-like speed and familiarity.

The database should not copy repeated spreadsheet columns.

## Metric Integrity Principle

Every business number in this product is produced by exactly one function in `lib/metrics/`.

The manager dashboard, the rep performance page, and the MCP tools all call the same function. Nothing else computes a business number. This is the structural answer to R5, not a documentation convention.

## Core Architecture

```text
Next.js
  ├── UI
  ├── Server-side logic
  ├── lib/metrics (single source of business numbers)
  └── MCP endpoint
        │
        ▼
Supabase / PostgreSQL
  ├── Auth
  └── Row Level Security

Optional AI client:
User's ChatGPT / Claude
        │
        ▼
Read-only MCP
```

## AI Strategy

No AI API in the MVP.

Users can connect their own ChatGPT or Claude.

AI is read-only and used to:
- read,
- compare,
- explain,
- summarize,
- provide insights.

AI cannot modify data.

## Overengineering Rule

Do not add:
- microservices,
- Redis,
- Kafka,
- data warehouse,
- vector database,
- separate backend,
- generic rules engine,
- generic import platform,
- configuration UI for anything a SQL update can change during the pilot,

unless a real production need appears.
