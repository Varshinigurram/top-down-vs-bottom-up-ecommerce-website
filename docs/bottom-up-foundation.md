# Bottom-Up Foundation & Domain Primitives Report

**Project Title:** Top-down vs Bottom-up Design: Case Study of an E-Commerce App  
**Phase:** Phase 9 — Bottom-Up Foundation & Domain Primitives  
**Target Application:** `bottom-up-approach/`  
**Specification Source:** `docs/system-specification.md`  

---

## 1. Phase 9 Objective

Phase 9 initiates the **Bottom-Up Implementation** for the second application in the case study repository (`bottom-up-approach/`).

In contrast to Top-Down design—which begins with system goals, views, and screen navigation—Bottom-Up design constructs software by building **foundational data primitives**, **validation blocks**, **pure business logic utilities**, **data access primitives**, and **atomic UI components** first, before assembling higher-level feature modules and screens in subsequent phases.

```
                    DATA / DOMAIN PRIMITIVES
                              ↓
                    VALIDATION / UTILITIES
                              ↓
                    REUSABLE BUILDING BLOCKS
                              ↓
                    COMPOSITE MODULES
                              ↓
                         FEATURES
                              ↓
                            VIEWS
                              ↓
                         APPLICATION
```

---

## 2. Domain Primitives & Models (`server/src/models/` & `constants/`)

- **Domain Constants (`domain.constants.js`)**: Established constants for `PRODUCT_CATEGORIES` (`Electronics`, `Home`, `Fashion`, `Accessories`, `Lifestyle`), `ORDER_STATUS` (`PENDING`, `CONFIRMED`, `SHIPPED`, `DELIVERED`, `CANCELLED`), and `USER_ROLES` (`CUSTOMER`, `ADMIN`).
- **User Primitive (`user.model.js`)**: `createUserEntity()` and `serializeSafeUser()`.
- **Product Primitive (`product.model.js`)**: `createProductEntity()` and `formatProduct()`.
- **Cart & CartItem Primitive (`cart.model.js`)**: `createEmptyCart()` and `createCartItem()`.
- **Order & OrderItem Snapshot Primitive (`order.model.js`)**: `createOrderEntity()` and `createOrderItemSnapshot()`, supporting historical price and item name snapshots upon order placement.

---

## 3. Validation Primitives (`server/src/validators/`)

- **Product Validator (`product.validator.js`)**: Validates name, description, price > 0, stock >= 0 integer, and valid category membership.
- **User Validator (`user.validator.js`)**: Validates registration credentials, email formatting, and password minimum length.
- **Cart Validator (`cart.validator.js`)**: Validates requested cart quantities against available inventory stock.
- **Order Validator (`order.validator.js`)**: Validates cart non-emptiness and order status string validity.

---

## 4. Pure Business Calculations (`server/src/utils/calculations.js`)

Pure, deterministic calculation functions independent of Express or HTTP requests:
- `calculateItemSubtotal(quantity, unitPrice)` = `quantity × unitPrice`
- `calculateCartSubtotal(items)` = `sum(item quantity × unitPrice)`
- `calculateShipping(subtotal)` = `0` (Free shipping policy)
- `calculateTax(subtotal)` = `subtotal × 0.08` (8% tax)
- `calculateOrderTotal(subtotal, shipping, tax)` = `subtotal + shipping + tax`

---

## 5. Order Status Transition State Machine (`server/src/utils/orderStatusTransition.js`)

Reusable order state transition rules:
- Allowed transitions: `PENDING` → `CONFIRMED` → `SHIPPED` → `DELIVERED` (or `CANCELLED`).
- Utility functions: `isValidStatus()`, `canTransitionStatus()`, `getNextAllowedStatuses()`.

---

## 6. Data Repository Primitives & Seed Data (`server/src/repositories/` & `data/`)

- **Repositories**: In-memory data access primitives (`user.repository.js`, `product.repository.js`, `cart.repository.js`, `order.repository.js`) offering decoupled `findById`, `findAll`, `create`, `update`, `delete`, and `reduceProductStock` functions.
- **Deterministic Seed Data (`seedData.js`)**: 10 products matching the specification across 5 categories, plus initial Customer (`customer@example.com` / `Customer123!`) and Admin (`admin@example.com` / `Admin123!`) accounts.

---

## 7. Frontend Primitives & API Client (`client/src/components/primitives/`, `utils/`, & `services/`)

- **Atomic UI Components**: `Button`, `Input`, `Select`, `Badge`, `LoadingState`, `ErrorState`, `EmptyState`, `Modal`, `QuantityControl`.
- **Formatting Utilities (`formatters.js`)**: `formatCurrency`, `formatDate`, `formatCategory`.
- **Status Helpers (`statusHelpers.js`)**: `getStatusBadgeVariant`, `getStatusLabel`.
- **Low-Level API Client (`apiClient.js`)**: Base HTTP fetch wrapper (`apiGet`, `apiPost`, `apiPut`, `apiDelete`) handling `credentials: 'include'` and normalized error throwing (`error.statusCode`, `error.message`).

---

## 8. Authentication Primitives (`server/src/utils/authPrimitives.js` & `client/src/utils/authSession.js`)

- Backend: Bcrypt password hashing (`hashPassword`, `comparePassword`) and JWT token handling (`signToken`, `verifyToken`).
- Frontend: Local storage user session primitive (`getStoredUser`, `setStoredUser`, `clearStoredUser`).

---

## 9. Testing & Verification Performed

Executed 29 automated unit and primitive tests in `scratch/verify_phase9_primitives.js` verifying:
1. Domain entity creation & serialization (User, Product, Cart, Order, OrderItem snapshot).
2. Input validation functions (Product, User, Cart, Order).
3. Pure calculation formulas (subtotal, shipping, 8% tax, total).
4. Order status state transition rules.
5. Password hashing and JWT sign/verify.
6. Repository CRUD operations and stock reduction.
7. Product seed data integrity.

All 29 test cases passed 100%.

---

## 10. Methodology Explanation

Phase 9 demonstrates **genuine Bottom-Up software engineering**:
- Rather than designing feature screens or routing first, development started at the lowest conceptual level (domain entities, constants, and math functions).
- Repositories and validation logic were built as decoupled primitives before building Express controllers or client services.
- Atomic UI components were built independently of any specific page layout.
- In subsequent phases, these primitives will be composed into composite components, container components, feature modules, and complete application views.
