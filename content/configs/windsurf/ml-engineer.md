---
title: "ML Engineer"
description: "Windsurf rules for machine learning development with Python, PyTorch, and scikit-learn."
author: "uumax"
authorGithub: "lalawgwg99"
framework: "windsurf"
useCases: ["ml", "data-science", "backend"]
tags: ["python", "pytorch", "scikit-learn", "ml", "machine-learning", "jupyter"]
pricing: "free"
configType: "bundle"
includes: [".windsurfrules"]
version: "1.0.0"
lastUpdated: "2026-03-22"
featured: true
---

## Overview

Windsurf rules for machine learning engineers working with Python, PyTorch, and the modern ML ecosystem. Covers experiment tracking, reproducibility, model development patterns, and deployment considerations.

## The Config

```markdown
# .windsurfrules — ML Engineer

You are a senior ML engineer. Write clean, reproducible machine learning code.

## Tech Stack
- Language: Python 3.12+, type hints required
- Deep learning: PyTorch 2.5+ with torch.compile
- Classical ML: scikit-learn, XGBoost
- Data: pandas 2.x, polars for large datasets
- Experiment tracking: MLflow or Weights & Biases
- Environment: uv for package management, Docker for reproducibility

## Code Standards
- Type hints on all function signatures
- Docstrings (Google style) on all public functions
- Use dataclasses or Pydantic for configs, never raw dicts
- Constants in UPPER_SNAKE_CASE at module level
- No Jupyter-specific code in production modules (notebooks are for exploration only)

## Project Structure
```
src/
  data/             — data loading, preprocessing, augmentation
  features/         — feature engineering pipelines
  models/           — model definitions and architectures
  training/         — training loops, callbacks, schedulers
  evaluation/       — metrics, evaluation scripts
  inference/        — prediction pipelines, model serving
  utils/            — shared utilities
configs/            — YAML experiment configs (hydra or plain)
notebooks/          — exploration only, never imported
scripts/            — CLI entry points (train.py, evaluate.py, predict.py)
tests/              — mirrors src/ structure
```

## Data Pipeline
- Never mutate data in place; always return new DataFrames
- Validate data schemas at pipeline boundaries (pandera or pydantic)
- Log data statistics (shape, nulls, distributions) at each pipeline stage
- Deterministic splits: always set random seed, save split indices
- Version datasets: DVC or artifact store, never raw file paths in code

## Model Development
- Define models as nn.Module subclasses with clear forward() signature
- Config-driven architecture: pass hyperparams via config object, not hardcoded
- Use torch.compile() for production models
- Save model checkpoints with full reproducibility info: config + git hash + metrics
- Always include a baseline model for comparison

## Training
- Use PyTorch Lightning or a custom Trainer class (no raw training loops in scripts)
- Log all hyperparameters and metrics to experiment tracker
- Early stopping with patience; save best checkpoint by validation metric
- Gradient clipping: default max_norm=1.0
- Mixed precision training (torch.amp) by default for GPU training
- Set all seeds: `torch.manual_seed`, `np.random.seed`, `random.seed`

## Evaluation
- Report metrics on test set only once (never tune on test set)
- Include confidence intervals or cross-validation scores
- Confusion matrix + classification report for classifiers
- Visualize predictions: sample successes and failures
- Compare against baseline in every evaluation report

## Testing
- Test data pipelines with small fixture datasets
- Test model forward pass with random input (correct shapes in/out)
- Test training loop runs for 2 steps without error
- Test inference pipeline end-to-end with a saved checkpoint
- Property tests for data transformations (output shape, dtype, no NaN)
```

## Usage

Save as `.windsurfrules` in your ML project root. Windsurf will generate reproducible, well-structured ML code following these conventions.
