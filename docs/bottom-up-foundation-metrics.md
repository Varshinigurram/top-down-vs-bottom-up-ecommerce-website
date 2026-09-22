# Bottom-Up Foundation Baseline Metrics

**Project Title:** Top-down vs Bottom-up Design: Case Study of an E-Commerce App  
**Phase:** Phase 9 — Bottom-Up Foundation & Domain Primitives  
**Target Application:** `bottom-up-approach/`  
**Measurement Date:** September 22, 2026  

---

## 1. Quantitative Foundation Baseline Table

| Metric Category | Metric Item | Count / Value |
|---|---|---|
| **File Counts** | 1. Frontend source files (`bottom-up-approach/client/src/`) | **20 files** |
| | 2. Backend source files (`bottom-up-approach/server/src/`) | **24 files** |
| | **Total Source Files** | **44 files** |
| **Domain & Logic Modules** | 3. Domain Entity & Constant Modules | **5 modules** |
| | 4. Domain Validation Modules | **4 modules** |
| | 5. Pure Business Calculation & State Machine Modules | **2 modules** |
| | 6. In-Memory Data Repository Modules | **4 modules** |
| | 7. Authentication Primitive Modules | **2 modules** |
| **Frontend Primitives** | 8. Reusable Atomic Frontend Components | **10 components** |
| | 9. Client Formatting & Helper Utilities | **2 modules** |
| | 10. Low-Level Client API Communication Primitive | **1 module** |
| **Source Volume** | 11. Total Source Lines of Code (LOC) | **1,898 lines** |
| | 11a. Non-blank, non-comment Code LOC | **1,526 lines** |
| **Dependencies** | 12. Total Production Dependencies | **5 packages** (Client: 2, Server: 3) |
| | 12a. Total Dev Dependencies | **4 packages** (Client: 2, Server: 2) |
| **Verification** | 13. Total Primitive Verification Test Cases | **29 test cases (29 / 29 PASS)** |

---

## 2. Counting Methodology

- **Source Scope**: Calculated strictly across `bottom-up-approach/client/src/` and `bottom-up-approach/server/src/`.
- **Exclusions**: `node_modules/`, `dist/`, `build/`, `package-lock.json`, `.git/`, and temporary verification files were excluded.
- **LOC Definition**:
  - *Total LOC*: Total physical line count including code, comments, and empty lines.
  - *Code LOC*: Physical lines excluding empty lines and comments.
