---
title: "Data Engineer"
description: "CLAUDE.md for data pipelines, ETL workflows, and analytics engineering. Covers dbt, Airflow, Spark, and SQL best practices."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "claude-code"
useCases: ["data", "backend"]
tags: ["python", "dbt", "airflow", "sql", "spark", "etl", "analytics"]
pricing: "free"
configType: "claude-md"
includes: ["CLAUDE.md"]
version: "1.0.0"
lastUpdated: "2026-03-27"
featured: false
---

## Overview

Built for data engineers working with Python-based pipelines, SQL transformations, and orchestration tools. Keeps data quality, idempotency, and observability front and center.

## The Config

```markdown
# CLAUDE.md — Data Engineer

## Stack Assumptions
- Orchestration: Apache Airflow 2.x or Prefect
- Transformation: dbt Core (SQL) + pandas/polars (Python)
- Compute: PySpark or DuckDB for large-scale processing
- Storage: S3/GCS + delta tables or Iceberg
- Warehouse: BigQuery, Snowflake, or Redshift
- Language: Python 3.11+, SQL (BigQuery dialect unless specified)

## Pipeline Design Principles
- **Idempotency first**: every pipeline run must produce the same result given the same inputs. DELETE+INSERT or MERGE, never blind APPEND.
- **Incremental by default**: process only new/changed records using watermarks or partition pruning
- **Fail loudly**: raise exceptions on bad data rather than silently dropping or defaulting records
- **Source fidelity**: preserve raw data unchanged in a landing zone before any transformation

## SQL Standards
- CTEs over subqueries for readability; name CTEs descriptively
- Explicit column names in SELECT — never `SELECT *` in production models
- Filter early: push WHERE clauses as close to the source as possible
- Use window functions over self-joins for running totals and rankings
- Always test for NULL handling in aggregations (COALESCE where needed)

## Python Standards
- Type hints on all function signatures
- Use dataclasses or Pydantic for config objects, not raw dicts
- Avoid row-by-row Python loops on DataFrames — use vectorized operations
- Log record counts at each pipeline stage for observability
- Use `pathlib.Path` over string paths

## dbt Conventions
- Staging models: one-to-one with source, light cleaning only
- Intermediate models: joins and business logic
- Mart models: aggregated, end-user ready
- Every model must have a YAML description and at least `not_null` + `unique` tests on primary keys
- Use `ref()` and `source()` — never hardcode schema names

## Data Quality
- Validate row counts before and after transformations
- Alert on >5% deviation from expected row counts
- Add `updated_at` metadata columns to all fact tables
- Document expected grain (one row per what?) in model descriptions

## Performance
- Partition large tables by date; cluster on frequent filter columns
- Materialize hot intermediate models as tables, not views
- Avoid cross joins; if needed, document why
- Profile slow queries before optimizing — measure, don't guess

## Rules
- Never run destructive operations (DROP, TRUNCATE) without a backup step
- Schema changes go through migration scripts, not ad-hoc ALTER TABLE
- Pipeline code is reviewed like application code — no direct pushes to main
```

## What You Get

A data engineering co-pilot that thinks about pipeline reliability, not just moving data from A to B. Catches idempotency issues, bad SQL patterns, and missing data quality checks as you write.
