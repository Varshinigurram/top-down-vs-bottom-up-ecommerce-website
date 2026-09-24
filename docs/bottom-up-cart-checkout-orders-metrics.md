# Bottom-Up Cart, Checkout & Orders Baseline Metrics

**Project Title:** Top-down vs Bottom-up Design: Case Study of an E-Commerce App  
**Phase:** Phase 12 — Bottom-Up Cart, Checkout & Orders Features  
**Target Application:** `bottom-up-approach/`  
**Measurement Date:** September 24, 2026  

---

## 1. Quantitative Baseline Metrics Table

| Metric Category | Metric Item | Count / Value |
|---|---|---|
| **File Counts** | 1. Frontend source files (`bottom-up-approach/client/src/`) | **61 files** |
| | 2. Backend source files (`bottom-up-approach/server/src/`) | **34 files** |
| | **Total Source Files** | **95 files** |
| **Feature Layer (Phase 12)** | 3. Cart Feature Components | **3 components** (`CartHeader`, `CartActions`, `CartEmptyState`) |
| | 4. Checkout Feature Component | **1 component** (`CheckoutSummary`) |
| | 5. Order Feature Components | **2 components** (`OrderFilterHeader`, `OrderDetailsContent`) |
| | **Total Feature Components Added** | **6 components** (Phase 11: 8, Phase 12: 6 = 14 total feature components) |
| | 6. Customer Views | **8 views** (Auth: 2, Catalog: 1, Details: 1, Cart: 1, Checkout: 1, Orders: 1, OrderDetails: 1) |
| **Reusable Services & Backend** | 7. Reusable Backend Service Modules | **4 modules** (`auth`, `product`, `cart`, `order`) |
| | 8. Express Controller Modules | **3 modules** (`auth`, `cart`, `order`) |
| | 9. Express Route Modules | **3 modules** (`auth`, `cart`, `order`) |
| | 10. Reusable Client Domain Services | **4 modules** (`authService`, `productService`, `cartService`, `orderService`) |
| | 11. Global Auth Context Provider | **1 provider** (`AuthContext.jsx`) |
| | 12. Composite UI Components | **15 components** |
| | 13. Atomic UI Primitives | **10 components** |
| **Source Volume** | 14. Total Source Lines of Code (LOC) | **4,530 lines** |
| | 14a. Non-blank, non-comment Code LOC | **4,377 lines** |
| **Dependencies** | 15. Total Production Dependencies | **6 packages** (Client: 2, Server: 4) |
| | 15a. Total Dev Dependencies | **4 packages** (Client: 2, Server: 2) |
| **Verification & Quality** | 16. Transaction & Authorization Integration Tests | **Passed 100% (7 test blocks / 14 assertions)** |
| | 17. Client Production Build | **PASS (Built in 850ms with 0 errors)** |
| | 18. Server Syntax & Check | **PASS (0 syntax errors across 34 files)** |
| | 19. Defects Discovered / Fixed | **0 discovered in Phase 12** |

---

## 2. Counting Methodology

- **Source Scope**: Calculated strictly across `bottom-up-approach/client/src/` and `bottom-up-approach/server/src/`.
- **Exclusions**: `node_modules/`, `dist/`, `build/`, `package-lock.json`, `.git/`, and temporary verification scratch files were excluded.
- **LOC Definition**:
  - *Total LOC*: Total physical line count including code, comments, and empty lines.
  - *Code LOC*: Physical lines excluding empty lines and comments.
