# Bottom-Up Customer Authentication, Catalog & Product Details Baseline Metrics

**Project Title:** Top-down vs Bottom-up Design: Case Study of an E-Commerce App  
**Phase:** Phase 11 — Bottom-Up Customer Authentication, Product Catalog & Product Details Features  
**Target Application:** `bottom-up-approach/`  
**Measurement Date:** September 22, 2026  

---

## 1. Quantitative Baseline Metrics Table

| Metric Category | Metric Item | Count / Value |
|---|---|---|
| **File Counts** | 1. Frontend source files (`bottom-up-approach/client/src/`) | **51 files** |
| | 2. Backend source files (`bottom-up-approach/server/src/`) | **34 files** |
| | **Total Source Files** | **85 files** |
| **Feature Layer (Phase 11)** | 3. Authentication Feature Components | **3 components** (`LoginForm`, `RegisterForm`, `AuthStatus`) |
| | 4. Catalog Feature Components | **4 components** (`ProductSearch`, `ProductFilters`, `ProductResultsHeader`, `ProductEmptyState`) |
| | 5. Product Details Feature Component | **1 component** (`ProductDetailsContent`) |
| | **Total Feature Components** | **8 components** |
| | 6. Customer Views | **4 views** (`LoginView`, `RegisterView`, `CatalogView`, `ProductDetailsView`) |
| **Reusable Services & Backend** | 7. Reusable Backend Service Modules | **4 modules** (`auth`, `product`, `cart`, `order`) |
| | 8. Express Controller Modules | **3 modules** (`auth`, `cart`, `order`) |
| | 9. Express Route Modules | **3 modules** (`auth`, `cart`, `order`) |
| | 10. Reusable Client Domain Services | **4 modules** (`authService`, `productService`, `cartService`, `orderService`) |
| | 11. Global Auth Context Provider | **1 provider** (`AuthContext.jsx`) |
| | 12. Composite UI Components | **15 components** |
| | 13. Atomic UI Primitives | **10 components** |
| **Source Volume** | 14. Total Source Lines of Code (LOC) | **3,587 lines** |
| | 14a. Non-blank, non-comment Code LOC | **3,440 lines** |
| **Dependencies** | 15. Total Production Dependencies | **6 packages** (Client: 2, Server: 4) |
| | 15a. Total Dev Dependencies | **4 packages** (Client: 2, Server: 2) |
| **Verification & Quality** | 16. Automated API & Service Integration Test Cases | **14 test cases (14 / 14 PASS)** |
| | 17. Client Production Build | **PASS (Built in 642ms with 0 errors)** |
| | 18. Server Syntax & Check | **PASS (0 syntax errors across 34 files)** |
| | 19. Defects Discovered / Fixed | **1 discovered / 1 fixed** (Property check in verification test script) |

---

## 2. Counting Methodology

- **Source Scope**: Calculated strictly across `bottom-up-approach/client/src/` and `bottom-up-approach/server/src/`.
- **Exclusions**: `node_modules/`, `dist/`, `build/`, `package-lock.json`, `.git/`, and temporary verification scratch files were excluded.
- **LOC Definition**:
  - *Total LOC*: Total physical line count including code, comments, and empty lines.
  - *Code LOC*: Physical lines excluding empty lines and comments.
