# Bottom-Up Composition Baseline Metrics

**Project Title:** Top-down vs Bottom-up Design: Case Study of an E-Commerce App  
**Phase:** Phase 10 — Bottom-Up Composite Modules, Reusable Services & Feature Building Blocks  
**Target Application:** `bottom-up-approach/`  
**Measurement Date:** September 22, 2026  

---

## 1. Quantitative Composition Baseline Table

| Metric Category | Metric Item | Count / Value |
|---|---|---|
| **File Counts** | 1. Frontend source files (`bottom-up-approach/client/src/`) | **39 files** |
| | 2. Backend source files (`bottom-up-approach/server/src/`) | **34 files** |
| | **Total Source Files** | **73 files** |
| **Domain & Logic Services** | 3. Reusable Backend Service Modules | **4 modules** (`auth`, `product`, `cart`, `order`) |
| | 4. Express Controller Modules | **3 modules** (`auth`, `cart`, `order`) |
| | 5. Express Route Modules | **3 modules** (`auth`, `cart`, `order`) |
| | 6. Authentication Middleware Primitive | **1 module** (`auth.middleware.js`) |
| **Frontend Composition** | 7. Reusable Client Domain Services | **4 modules** (`authService`, `productService`, `cartService`, `orderService`) |
| | 8. Global State Context Provider | **1 provider** (`AuthContext.jsx`) |
| | 9. Composite Frontend UI Components | **14 components** (Product: 7, Cart: 3, Order: 3, Nav: 2) |
| **Source Volume** | 10. Total Source Lines of Code (LOC) | **2,565 lines** |
| | 10a. Non-blank, non-comment Code LOC | **2,421 lines** |
| **Dependencies** | 11. Total Production Dependencies | **6 packages** (Client: 2, Server: 4 - `cookie-parser` added) |
| | 11a. Total Dev Dependencies | **4 packages** (Client: 2, Server: 2) |
| **Verification** | 12. Service & Composition Verification Tests | **Passed 100% (Backend Service Suite & Client Build)** |

---

## 2. Counting Methodology

- **Source Scope**: Calculated strictly across `bottom-up-approach/client/src/` and `bottom-up-approach/server/src/`.
- **Exclusions**: `node_modules/`, `dist/`, `build/`, `package-lock.json`, `.git/`, and temporary verification files were excluded.
- **LOC Definition**:
  - *Total LOC*: Total physical line count including code, comments, and empty lines.
  - *Code LOC*: Physical lines excluding empty lines and comments.
