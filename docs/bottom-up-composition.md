# Bottom-Up Composite Modules & Reusable Services Report

**Project Title:** Top-down vs Bottom-up Design: Case Study of an E-Commerce App  
**Phase:** Phase 10 — Bottom-Up Composite Modules, Reusable Services & Feature Building Blocks  
**Target Application:** `bottom-up-approach/`  
**Specification Source:** `docs/system-specification.md`  

---

## 1. Phase 10 Objective

Phase 10 advances the **Bottom-Up Implementation** for the second application in the case study repository (`bottom-up-approach/`).

Following genuine Bottom-Up design principles, Phase 10 builds **composite frontend UI components**, **reusable client domain services**, **AuthContext provider**, and **reusable backend services with Express controllers/routes** on top of the Phase 9 domain primitives, without creating high-level screen views (`LoginView`, `RegisterView`, `CatalogView`, `CartView`, `CheckoutView`, `OrdersView`, `Admin*Views`) or Admin features, which remain deferred to subsequent phases.

```
                    DATA / DOMAIN PRIMITIVES (Phase 9)
                               ↓
                 VALIDATION / UTILITIES / REPOSITORIES (Phase 9)
                               ↓
         REUSABLE BACKEND & CLIENT SERVICES + COMPOSITE COMPONENTS (Phase 10)
                               ↓
                      FEATURE MODULES & VIEWS (Phase 11)
                               ↓
                          APPLICATION (Phase 12)
```

---

## 2. Reusable Backend Services (`server/src/services/`)

All backend services are pure JavaScript functions operating on domain models, validators, calculation utilities, and repository functions. They are completely decoupled from Express `req`/`res` objects, throwing custom Errors with HTTP `statusCode` properties for clean controller mapping.

- **`auth.service.js`**: `registerUser`, `loginUser`, `getCurrentUser`
- **`product.service.js`**: `fetchProductsService` (supporting search & category filtering), `fetchProductByIdService`
- **`cart.service.js`**: `getUserCartService`, `addItemToCartService` (with inventory stock validation), `updateCartItemQuantityService`, `removeCartItemService`, `clearUserCartService`
- **`order.service.js`**: `createOrderService` (validates cart, creates price & item snapshots, calculates subtotal/shipping/tax/total, reduces product stock, clears cart), `getUserOrdersService`, `getOrderByIdService` (with user ownership authorization checks)

---

## 3. Backend Controllers, Middleware & Routes (`server/src/`)

- **Authentication Middleware (`middleware/auth.middleware.js`)**: `authenticateUser` (extracts JWT from HTTP-only cookie or Bearer token header, verifies payload, attaches `req.user`), `requireRole(role)` (authorizes role access).
- **Controllers (`controllers/`)**: `auth.controller.js`, `cart.controller.js`, `order.controller.js`. Maps HTTP requests/responses to services, sets HTTP-only `token` cookies.
- **Routes (`routes/`)**: `auth.routes.js`, `cart.routes.js`, `order.routes.js`.
- **Application Assembly (`app.js`)**: Mounted `/api/auth`, `/api/products`, `/api/cart`, `/api/orders`, `/api/health` with `cookieParser` and CORS configured for `http://localhost:3002`.

---

## 4. Reusable Client Domain Services & Auth Context (`client/src/`)

- **`services/authService.js`**: Client interface for register, login, logout, and getCurrentUser consuming `apiClient.js` and managing `authSession.js`.
- **`services/productService.js`**: Client interface for fetching products with search/category params and fetching single product details.
- **`services/cartService.js`**: Client interface for getting cart, adding item, updating quantity, removing item, clearing cart.
- **`services/orderService.js`**: Client interface for creating order, fetching user orders, fetching order by ID.
- **`context/AuthContext.jsx`**: Global React authentication state provider (`user`, `isAuthenticated`, `isLoading`, `error`, `login`, `register`, `logout`) driving session persistence.

---

## 5. Composite Frontend UI Components (`client/src/components/composite/`)

Medium-granularity composite components composed of Phase 9 atomic primitives:

- **Product Composite Components**:
  - `ProductBadge.jsx`: Category tag wrapper using atomic Badge.
  - `ProductPrice.jsx`: Standardized price display using atomic Price.
  - `ProductStockIndicator.jsx`: Stock status badge (In Stock / Out of Stock / Low Stock).
  - `ProductCard.jsx`: Composite card combining image, title, badge, stock, price, and atomic `AddToCartButton`.
  - `ProductGrid.jsx`: Responsive grid rendering `ProductCard` items with empty state support.
  - `ProductSearchInput.jsx`: Controlled search bar using atomic Input and Icon.
  - `CategoryFilter.jsx`: Category selector pills/tabs for catalog filtering.
- **Cart Composite Components**:
  - `CartItemRow.jsx`: Cart line item row with thumbnail, name, unit price, atomic QuantitySelector, line total, and remove button.
  - `CartItemList.jsx`: Stacked list of `CartItemRow` elements with empty state prompt.
  - `CartSummaryCard.jsx`: Order cost breakdown (subtotal, shipping, tax 8%, total) with atomic CheckoutButton.
- **Order Composite Components**:
  - `OrderStatusBadge.jsx`: Color-coded status badge for orders.
  - `OrderSummaryCard.jsx`: Summary card for historical orders (ID, date, total, status).
  - `OrderItemList.jsx`: Read-only list of order snapshot items.
- **Navigation / Layout Composite Components**:
  - `UserMenuBar.jsx`: User profile greeting and logout action trigger.
  - `CartBadgeIndicator.jsx`: Header shopping cart icon with live badge item count.

---

## 6. Verification & Architectural Isolation

- **Verification Suite**: `verify_phase10_composition.js` verified registration/login/currentUser, product filtering, cart management with inventory limit rejection, order creation with exact financial calculations (subtotal, shipping=$0, tax=8%, total), stock reduction, historical snapshot creation, and cart cleanup.
- **Top-Down Protection**: Confirmed zero modifications to `top-down-approach/` and frozen baseline documentation files (`docs/top-down-*.md`).
- **Deferred Functionality**: Admin services, controllers, routes, and UI components remain completely deferred to the dedicated Administration phase. High-level screen views remain completely deferred to Phase 11.
