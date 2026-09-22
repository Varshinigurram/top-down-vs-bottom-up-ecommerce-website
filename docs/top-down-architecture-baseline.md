# Top-Down Architecture Baseline

**Project Title:** Top-down vs Bottom-up Design: Case Study of an E-Commerce App  
**Phase:** Phase 8 — Stabilization, Measurement & Freeze  
**Target Application:** `top-down-approach/`  

---

## 1. Top-Down Architectural Principle

Top-Down software design starts from high-level system requirements and application views, progressively deconstructing them into feature modules, client services, API contracts, controllers, business services, and lower-level data repositories.

```
                  +-----------------------------------+
                  |     High-Level System Goals       |
                  +-----------------------------------+
                                    |
                                    v
                  +-----------------------------------+
                  |    Application Views & Shell      |
                  +-----------------------------------+
                                    |
                                    v
                  +-----------------------------------+
                  |    Feature-Level Modules & UI     |
                  +-----------------------------------+
                                    |
                                    v
                  +-----------------------------------+
                  |    Client Services & REST APIs    |
                  +-----------------------------------+
                                    |
                                    v
                  +-----------------------------------+
                  |   Controllers & Business Logic    |
                  +-----------------------------------+
                                    |
                                    v
                  +-----------------------------------+
                  |   Data Repositories & Entities    |
                  +-----------------------------------+
```

---

## 2. System Structure

### 2.1 Backend Architecture (`top-down-approach/server/src/`)
```
Route (Express endpoints)
 ↓
Controller (HTTP Request/Response translation)
 ↓
Service (Business validation & rules)
 ↓
Repository (Data access layer abstraction)
 ↓
Data Model (Schema formatting & formatting helpers)
```

### 2.2 Frontend Architecture (`top-down-approach/client/src/`)
```
App Shell / View Container (App.jsx & Header.jsx)
 ↓
View (e.g. CatalogView.jsx, AdminDashboardView.jsx)
 ↓
Feature Component (e.g. ProductGrid.jsx, AdminProductTable.jsx)
 ↓
Client Service (e.g. productService.js, adminOrderService.js)
 ↓
REST API (HTTP Fetch over CORS with credentials)
```

---

## 3. End-to-End Pipeline Workflows

### 3.1 Authentication Workflow
- **Client**: `LoginView` → `LoginForm` → `AuthContext.login()` → `POST /api/auth/login`.
- **Server**: `auth.routes.js` → `auth.controller.js` → `auth.service.js` → `user.repository.js` → verifies bcrypt hash, generates JWT, sets HTTP-only cookie.

### 3.2 Product Catalog Workflow
- **Client**: `CatalogView` → `ProductSearch` & `CategoryFilter` → `productService.getProducts()` → `GET /api/products`.
- **Server**: `product.routes.js` → `product.controller.js` → `product.service.js` → `product.repository.js` → returns matching product entities.

### 3.3 Shopping Cart Workflow
- **Client**: `CatalogView` / `ProductDetailsView` → `CartContext.addToCart()` → `cartService.addItem()` → `POST /api/cart/items`.
- **Server**: `cart.routes.js` → `cart.controller.js` → `cart.service.js` → validates stock in `product.repository.js` → calculates itemized subtotals in `cart.model.js` → saves in `cart.repository.js`.

### 3.4 Checkout & Order Processing Workflow
- **Client**: `CheckoutView` → `orderService.createOrder()` → `POST /api/orders`.
- **Server**: `order.routes.js` → `order.controller.js` → `order.service.js` → fetches active cart, calculates subtotal + 8% tax + $0 shipping, creates order snapshot in `order.model.js`, reduces stock in `product.repository.js`, clears cart in `cart.repository.js`, saves in `order.repository.js`.

### 3.5 Administrator Workflow
- **Client**: `AdminDashboardView` / `AdminProductsView` / `AdminOrdersView` → `adminProductService` & `adminOrderService` → `/api/admin/*`.
- **Server**: `admin.routes.js` (protected by `authenticateUser` + `requireRole('ADMIN')`) → `adminProduct.controller.js` & `adminOrder.controller.js` → `adminProduct.service.js` & `adminOrder.service.js` → executes CRUD or state machine transitions (`PENDING` → `CONFIRMED` → `SHIPPED` → `DELIVERED`).

---

## 4. Layer Responsibilities

1. **Repositories (`src/repositories/`)**: Isolated data stores (`user`, `product`, `cart`, `order`). Provide CRUD functions and data persistence abstraction ready for MongoDB replacement.
2. **Services (`src/services/`)**: Enforce business validation, price/tax calculations, stock availability checks, order state machine rules, and historical snapshot retention.
3. **Controllers (`src/controllers/`)**: Parse HTTP params/body, invoke business services, handle exceptions via Express error middleware, and return JSON responses.
4. **Views (`src/views/`)**: High-level screen compositions managing view state and delegating rendering to feature components.
5. **Feature Components (`src/features/`)**: Focused, reusable UI widgets enforcing presentation logic and user interaction feedback.
