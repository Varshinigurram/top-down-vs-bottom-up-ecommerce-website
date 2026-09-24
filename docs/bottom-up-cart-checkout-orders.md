# Bottom-Up Shopping Cart, Checkout & Orders Report

**Project Title:** Top-down vs Bottom-up Design: Case Study of an E-Commerce App  
**Phase:** Phase 12 — Bottom-Up Cart, Checkout & Orders Features  
**Target Application:** `bottom-up-approach/`  
**Specification Source:** `docs/system-specification.md`  

---

## 1. Phase 12 Objective

Phase 12 constructs the complete **Customer Shopping Transaction Flow** for the **Bottom-Up application** (`bottom-up-approach/`): **Shopping Cart**, **Checkout**, **Order Creation**, **Order History**, and **Order Details**.

Following genuine Bottom-Up architectural principles, these customer-facing features and views are constructed by **composing lower-level modules** established in Phase 9 (Domain primitives, Validators, Repositories, Atomic UI components), Phase 10 (Backend Services, Express Controllers, Client Services, Composite UI components), and Phase 11 (Auth Context & Product Features), without duplicating business logic or modifying the frozen Top-Down baseline.

```
                    DATA / DOMAIN PRIMITIVES (Phase 9)
                               ↓
                 VALIDATION / UTILITIES / REPOSITORIES (Phase 9)
                               ↓
          REUSABLE SERVICES & COMPOSITE COMPONENTS (Phases 10–11)
                               ↓
    FEATURE MODULES (Cart, Checkout, Orders) (Phase 12)
                               ↓
   CUSTOMER VIEWS (CartView, CheckoutView, OrdersView, OrderDetailsView) (Phase 12)
                               ↓
                          APPLICATION (Phase 12)
```

---

## 2. Shopping Cart Feature & View (`client/src/features/cart/` & `views/CartView.jsx`)

### Feature Components
- **`CartHeader.jsx`**: Cart title header with item count summary badge.
- **`CartActions.jsx`**: Action bar providing "Clear Cart" and "Continue Shopping" buttons.
- **`CartEmptyState.jsx`**: Empty cart state component with "Browse Product Catalog" navigation action.

### View
- **`CartView.jsx`**: Customer cart page view composing `CartItemList`, `CartItemRow`, `CartSummaryCard`, `CartHeader`, `CartActions`, `CartEmptyState`, and `FeedbackStates`.
- **Backend-Authoritative Pricing**: Subtotal, Free Shipping ($0), Sales Tax (8%), and Total are computed by backend services and displayed accurately.
- **Cart Management**: Quantity increment/decrement/update (`updateCartItemApi`), item removal (`removeCartItemApi`), and clearing cart (`clearCartApi`).
- **Synchronized Badge**: Header cart badge count updates dynamically across all navigation actions.

---

## 3. Checkout Feature & View (`client/src/features/checkout/` & `views/CheckoutView.jsx`)

### Feature Components
- **`CheckoutSummary.jsx`**: Order review panel displaying cart items, product names, quantities, unit prices, line subtotals, subtotal, shipping ($0), tax (8%), and final total.
- **Constraints Maintained**: No shipping address forms, no payment gateways, and no external shipping APIs.

### View
- **`CheckoutView.jsx`**: Customer checkout view.
- **Authentication Protection**: Unauthenticated users are prompted to sign in before checking out.
- **Duplicate-Checkout Protection**: Submission state (`submitting = true`) disables the "Confirm & Place Order" button during submission, displays a processing spinner, and prevents multiple simultaneous or accidental duplicate order creations.
- **Order Placement**: Consumes `orderService.createOrderApi()`. On success, navigates to `/orders/:orderId`.

---

## 4. Order History & Details Features & Views (`client/src/features/orders/` & `views/`)

### Feature Components
- **`OrderFilterHeader.jsx`**: Order history header displaying total order count and status legend badges (`PENDING`, `CONFIRMED`, `SHIPPED`, `DELIVERED`, `CANCELLED`).
- **`OrderDetailsContent.jsx`**: Order details content component rendering `OrderStatusBadge`, `OrderItemList`, financial breakdown, and historical item price/name snapshots.

### Views
- **`OrdersView.jsx`**: Customer order history view fetching user orders via `orderService.getUserOrdersApi()`. Displays list of `OrderSummaryCard` items (Order ID, date, status, item count, total price).
- **`OrderDetailsView.jsx`**: Single order inspection view fetching order by ID via `orderService.getOrderByIdApi(orderId)`.
- **Ownership Authorization (`403`)**: Enforces cross-user authorization checks, returning `403 Forbidden` if a customer attempts to view another user's order.

---

## 5. Order Creation & Historical Price Snapshots (`server/src/services/order.service.js`)

- **Authoritative Backend Processing**: `createOrderService` verifies item stock, captures historical price and name snapshots (`createOrderItemSnapshot`), calculates financial totals, sets status to `PENDING`, reduces product stock inventory, and clears the user's shopping cart.
- **Snapshot Integrity**: Historical order items retain purchase unit prices and names regardless of future product updates.
- **Failed-Order Integrity**: If order creation fails (e.g. stock cap exceeded), cart remains intact, stock is not reduced, and no partial order entity is created.

---

## 6. End-to-End Verification & Quality Matrix

All Phase 12 transaction workflows and security checks were verified using the automated suite `verify_phase12_features.js`:

| Transaction Test Case | Endpoint / Function | Status / Result |
|---|---|---|
| Unauthenticated Cart Access | `GET /api/cart` | **PASS (401 Unauthorized rejection)** |
| Unauthenticated Order Placement | `POST /api/orders` | **PASS (401 Unauthorized rejection)** |
| Cart Item Add & Quantity Update | `POST/PUT /api/cart/items` | **PASS (Items added, quantity updated)** |
| Excess Stock Cap Rejection | `PUT /api/cart/items` | **PASS (409 Conflict rejection when qty > stock)** |
| Failed Order State Integrity | `POST /api/orders` | **PASS (Over-stock rejected 409, cart intact, stock unchanged)** |
| Financial Calculation Accuracy | `createOrderService` | **PASS (Subtotal, Shipping=$0, Tax=8%, Total exact match)** |
| Inventory Stock Reduction | `reduceProductStock` | **PASS (Stock reduced by purchased quantity)** |
| Cart Clearing After Order | `deleteCartByUserId` | **PASS (User cart emptied upon order placement)** |
| Historical Item Snapshots | `createOrderItemSnapshot` | **PASS (Unit price, productName, productImage preserved)** |
| Cross-User Order Access | `GET /api/orders/:id` | **PASS (403 Forbidden rejection for non-owner)** |
| Client Production Build | `npm run build` | **PASS (Built in 850ms with 0 errors)** |
| Server Syntax Check | `node --check` | **PASS (0 syntax errors across 34 server files)** |

---

## 7. Top-Down Baseline Protection

Ran `git status`:
- `top-down-approach/`: **0 changes (100% FROZEN)**
- `docs/top-down-*.md`: **0 changes (100% FROZEN)**
