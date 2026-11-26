# Ascendum Design System

Hacksgiving, team 2: Tatyana Bondarenko and Thiago Soares.

**An AI-ready design system, governed by design. AI proposes, checks verify, a person approves.**

The design system has two kinds of reader. People (designers and developers) read Figma and the documentation. Machines (AI tools that generate product screens) read tokens and a written contract, not the layout of a Figma page.

## How a change moves

```
Figma working library  ->  Review and testing  ->  Approved Figma release  ->  This repository and CI
proposed changes           checks + a person       the source of truth         tokens, contract, code
```

- Figma is the source of truth. Everything in `build/` is generated from a snapshot of the Figma file.
- A working change is not a release. In this repository a proposal is a pull request, and a release is a merge to `main` with a named approver.
- The checks run on every push and every pull request. While a blocking check fails, the gate stays closed.

## Start here

Open the published site: https://thiago-ascendum.github.io/ascendum-design-system/ (Storybook) and https://thiago-ascendum.github.io/ascendum-design-system/report/ (health report). It is published by GitHub Actions on GitHub Pages, only when every check passes. Start with the page Start here / Pipeline proof. The report shows the gate, every check with its evidence, the before and after, and the impact map (pick a token, see every component that moves).

## What is here

| Path | What it is |
|---|---|
| `index.html` | The health report, published at `/report/`. Generated, nothing typed by hand. |
| `src/components/`, `stories/` | Coded components and their Storybook pages, published at the root of the site. |
| `build/components.json`, `build/text-styles.json` | The component catalogue and the text styles, generated from the snapshot. |
| `build/tokens.json`, `build/tokens.css` | Design tokens with their modes, and the CSS custom properties. |
| `build/AI-CONTRACT.md` | What an AI tool may use, must never use, and should ignore in Figma. |
| `build/report.json` | Every finding as data. |
| `build/before/` | The same report for the file as received on 25 November. |
| `governance/governance.json` | The decisions: what is deprecated and why, budgets, contrast pairs, rules for AI. |
| `CHANGELOG.md` | Release history, with what breaks and who signed. |
| `pipeline/01b_snapshot_plugin_api.js` | Takes the snapshot through the Figma Plugin API. Read-only. |
| `pipeline/02_build.py` | From the snapshot: tokens, checks, impact map, AI contract. Exit code 1 while a blocking check fails. |
| `pipeline/03_compare.py` | Before and after, check by check. |
| `.github/workflows/checks.yml` | Runs the gate on every push and pull request. |
| `shots/` | Page captures before and after. |

## Run it

```
python3 pipeline/02_build.py build/ds-snapshot.json governance build
python3 pipeline/03_compare.py build/before/report.json build/report.json build/compare.js
```

Plain Python 3, no dependencies. To refresh the snapshot, run `pipeline/01b_snapshot_plugin_api.js` inside the Figma file and save the result as `build/ds-snapshot.json`.

## Three kinds of check

- **Blocks**: one right answer, and getting it wrong breaks something downstream. The gate stays closed.
- **Clean-up**: measurable debt. It does not stop a release.
- **The owner decides**: measured here, answered by a person, written once in `governance/governance.json`.

Which rule sits in which group is a proposal. It is one word to change.

## Status on 26 November 2026

- Before: the file as received. Gate closed, 2 of 5 blocking checks failed.
- After: version 1.1.0, proposed. Gate open, all 5 blocking checks pass. 2 clean-up items and 4 questions for the owner remain.
- Nobody has approved 1.1.0. The system has no named owner yet.

## Not done yet

- 32 of the 46 components are still Figma only. 14 are in code, built from `build/tokens.css`, with interactive documentation in Storybook.
- A person reviewing every page of the Figma file by eye.
- Publishing the library to a file that uses it. This has never been tested.
