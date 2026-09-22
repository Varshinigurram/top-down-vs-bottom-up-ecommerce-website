# Top-Down Implementation Metrics Baseline

**Project Title:** Top-down vs Bottom-up Design: Case Study of an E-Commerce App  
**Phase:** Phase 8 — Stabilization, Measurement & Freeze  
**Target Application:** `top-down-approach/`  
**Measurement Date:** September 22, 2026  

---

## 1. Executive Summary

This document records the quantitative codebase baseline metrics for the **Top-Down E-Commerce Application** (`top-down-approach/`). These metrics serve as the primary comparison benchmark when analyzing structural differences against the **Bottom-Up Application** (`bottom-up-approach/`).

---

## 2. Quantitative Codebase Baseline Table

| Metric Category | Metric Item | Count / Value |
|---|---|---|
| **File Counts** | 1. Frontend source files (`top-down-approach/client/src/`) | **53 files** |
| | 2. Backend source files (`top-down-approach/server/src/`) | **32 files** |
| | **Total Source Files** | **85 files** |
| **Frontend Architecture** | 3. React Views (`src/views/`) | **13 views** |
| | 4. React Feature Components (`src/features/`) | **24 components** |
| | 5. Shared React Components (`src/components/`) | **2 components** |
| | 6. Client API Services (`src/services/`) | **6 services** |
| **Backend Architecture** | 7. Backend Route modules (`src/routes/`) | **6 modules** |
| | 8. Backend Controllers (`src/controllers/`) | **7 controllers** |
| | 9. Backend Services (`src/services/`) | **7 services** |
| | 10. Backend Repositories (`src/repositories/`) | **4 repositories** |
| | 11. Domain Models / Schemas (`src/models/`) | **3 models** |
| **System Scope** | 12. Total REST API Endpoints | **18 endpoints** |
| **Source Volume** | 13. Total Source Lines of Code (LOC) | **7,515 lines** |
| | 13a. Non-blank, non-comment Code LOC | **6,228 lines** |
| **Dependencies** | 14. Total Production Dependencies | **7 packages** (Client: 2, Server: 5) |
| | 14a. Total Dev Dependencies | **4 packages** (Client: 2, Server: 2) |
| **Verification & Quality** | 15. Total Verification & Test Cases | **36 test cases** |
| | 16. Total Defects Discovered during Phase 8 | **2 defects** |
| | 17. Total Defects Resolved during Phase 8 | **2 defects** |

---

## 3. Counting Methodology

- **Source Scope**: Calculated strictly across `top-down-approach/client/src/` and `top-down-approach/server/src/`.
- **Exclusions**: `node_modules/`, `dist/`, `build/`, `package-lock.json`, `.git/`, and scratch script directories were excluded from line counts.
- **LOC Definition**: 
  - *Total LOC*: Total physical line count including code, comments, and empty lines.
  - *Code LOC*: Physical lines excluding empty lines and single-line/block comments.
- **Dependency Source**: Direct dependencies declared in `top-down-approach/client/package.json` and `top-down-approach/server/package.json`.
