# System Specification & Architectural Strategy

**Project Title:** Top-down vs Bottom-up Design: Case Study of an E-Commerce App  
**Target Audience:** Academic Software Engineering Case Study (3rd-Year SE)  
**Status:** Baseline Specification (Phase 2)

---

## 1. Project Objective

The primary goal of this case study is to evaluate and compare two fundamental software design paradigms—**Top-Down Design** and **Bottom-Up Design**—when applied to building a full-stack E-Commerce web application.

Both applications in this repository (`top-down-approach/` and `bottom-up-approach/`) must adhere to identical functional requirements, domain models, API specifications, and user interfaces. Their sole difference lies in internal code organization, component hierarchy, service abstraction, and development trajectory.

---

## 2. System Scope

The system is a simplified full-stack E-Commerce platform designed to demonstrate e-commerce workflows without enterprise overhead.

### Primary Actors & Responsibilities

#### 1. Customer
- **Authentication**: Register a new account, authenticate (login), view profile.
- **Product Discovery**: Browse product catalog, search products by keyword, filter products by category, view individual product details.
- **Cart Management**: Add items to shopping cart, adjust item quantities, remove items from cart, view calculated cart totals.
- **Order Processing**: Proceed to checkout, place an order, view personal order history, inspect detailed order receipts.

#### 2. Administrator
- **Authentication**: Authenticate using administrative credentials.
- **Catalog Management**: View complete product list, add new products, update existing product attributes, delete products.
- **Order Management**: View all customer orders across the system, update order fulfillment status (`PENDING` -> `CONFIRMED` -> `SHIPPED` -> `DELIVERED` / `CANCELLED`).

---

## 3. Functional Requirements (FR)

### Authentication & User Management
- **FR-01 — Customer Registration**: The system shall allow a new customer to create an account using required registration details (name, email, password).
- **FR-02 — User Authentication**: The system shall authenticate registered customers and administrators using valid login credentials and issue session/token identity.
- **FR-03 — User Profile View**: The system shall allow an authenticated user to view their basic account details.

### Product Catalog & Search
- **FR-04 — Product Catalog Browsing**: The system shall display a list of available products with title, price, category badge, and thumbnail image.
- **FR-05 — Product Search**: The system shall allow users to search products by matching keywords against product titles and descriptions.
- **FR-06 — Product Filtering**: The system shall filter products based on selected product categories.
- **FR-07 — Product Detail View**: The system shall display detailed information for a selected product, including full description, price, stock status, and category.

### Shopping Cart Management
- **FR-08 — Add to Cart**: The system shall allow an authenticated or guest user to add a specified product and quantity to their active cart.
- **FR-09 — Update Cart Quantity**: The system shall allow users to modify the quantity of any item currently present in their cart.
- **FR-10 — Remove Cart Item**: The system shall allow users to remove an item from their cart.
- **FR-11 — View Cart Summary**: The system shall calculate and display itemized sub-totals, taxes/fees, and total amount for items in the cart.

### Order Management & Checkout
- **FR-12 — Checkout & Order Creation**: The system shall allow a user with a non-empty cart to place an order, generating a unique order confirmation.
- **FR-13 — Customer Order History**: The system shall display a list of past orders placed by the authenticated customer.
- **FR-14 — Order Details Inspection**: The system shall allow customers to view line items, pricing breakdown, and current status of a specific order.

### Administrator Operations
- **FR-15 — Admin Product Creation**: The system shall allow administrators to create a new product entry in the catalog.
- **FR-16 — Admin Product Update/Delete**: The system shall allow administrators to edit or delete existing product entries.
- **FR-17 — Admin Order Overview**: The system shall provide administrators with a master view of all customer orders.
- **FR-18 — Admin Order Status Update**: The system shall allow administrators to update the fulfillment status of any order.

---

## 4. Non-Functional Requirements (NFR)

- **NFR-01 — Usability**: The user interface shall be intuitive, clean, responsive across viewport sizes, and require zero user training.
- **NFR-02 — Maintainability**: Codebases for both applications shall follow strict separation of concerns, consistent modular folder structures, and standard naming conventions.
- **NFR-03 — Modularity**: Components, services, and utilities shall maintain low coupling and high cohesion to allow independent extension.
- **NFR-04 — Reliability**: The system shall handle API errors, invalid inputs, and missing network connectivity gracefully with fallback UI states.
- **NFR-05 — Security**: Passwords shall be sanitized and validated; administrative endpoints shall enforce role-based permission checks.
- **NFR-06 — Performance**: Initial page loading and REST API response times for standard queries shall complete within 500ms under nominal local testing conditions.
- **NFR-07 — Scalability**: Data access layers and state management structures shall remain decoupled to support future database (MongoDB) integration without breaking business logic layers.

---

## 5. Domain Entities

```
+----------------+          +-------------------+          +-------------------+
|      User      | 1      * |       Order       | 1      * |     OrderItem     |
|----------------|----------|-------------------|----------|-------------------|
| id             |          | id                |          | productId         |
| name           |          | userId            |          | productName       |
| email          |          | totalAmount       |          | quantity          |
| role           |          | status            |          | price             |
+----------------+          +-------------------+          +-------------------+
                                                                     |
                                                                     | references
                                                                     v
+----------------+ 1      * +-------------------+          +-------------------+
|    Category    |----------|      Product      |          |      Product      |
|----------------|          |-------------------|          |-------------------|
| id             |          | id, name, price   |          | id, name, price   |
| name           |          | stock, category   |          | stock, category   |
+----------------+          +-------------------+          +-------------------+
```

### Entity Definitions

1. **User**
   - **Purpose**: Represents registered customers and system administrators.
   - **Fields**: `id`, `name`, `email`, `passwordHash`, `role` (`CUSTOMER` | `ADMIN`), `createdAt`.
   - **Relationships**: 1 User has many Orders; 1 User has 1 active Cart.

2. **Product**
   - **Purpose**: Represents an item available for purchase in the store catalog.
   - **Fields**: `id`, `name` / `title`, `description`, `price`, `category`, `image` / `icon`, `stock`, `createdAt`, `updatedAt`.
   - **Relationships**: Belongs to 1 Category; referenced in CartItems and OrderItems.

3. **Category**
   - **Purpose**: Classifies products into logical groupings (e.g., Electronics, Wearables, Accessories).
   - **Fields**: `id`, `name`, `slug`, `description`.
   - **Relationships**: 1 Category contains many Products.

4. **Cart**
   - **Purpose**: Temporary container holding items selected by a user prior to checkout.
   - **Fields**: `id`, `userId`, `items` (Array of CartItem), `updatedAt`.
   - **Relationships**: Belongs to 1 User; contains many CartItems.

5. **CartItem**
   - **Purpose**: Embedded quantity tracking for a specific product inside a cart.
   - **Fields**: `productId`, `quantity`, `unitPrice`.

6. **Order**
   - **Purpose**: Immutable financial record of a completed customer transaction.
   - **Fields**: `id`, `userId`, `items` (Array of OrderItem), `totalAmount`, `status` (`PENDING` | `CONFIRMED` | `SHIPPED` | `DELIVERED` | `CANCELLED`), `createdAt`.
   - **Relationships**: Belongs to 1 User; contains many OrderItems.

7. **OrderItem**
   - **Purpose**: Snapshot of product attributes at the exact time of order placement.
   - **Fields**: `productId`, `productName`, `quantity`, `price`, `subtotal`.

---

## 6. Preliminary REST API Contract

### Authentication Endpoints
| Method | Endpoint | Purpose | Request Body | Response (200/201) | Errors |
|---|---|---|---|---|---|
| `POST` | `/api/auth/register` | Register new customer account | `{ name, email, password }` | `{ success: true, user: { id, name, email, role } }` | `400` Validation Error |
| `POST` | `/api/auth/login` | Authenticate customer/admin | `{ email, password }` | `{ success: true, token, user: { id, name, email, role } }` | `401` Invalid Credentials |

### Product Catalog Endpoints
| Method | Endpoint | Purpose | Request Body | Response (200) | Errors |
|---|---|---|---|---|---|
| `GET` | `/api/products` | Fetch product catalog list | None | `{ success: true, count, data: [ Product ] }` | `500` Internal Error |
| `GET` | `/api/products/:id` | Fetch single product details | None | `{ success: true, data: Product }` | `404` Not Found |
| `POST` | `/api/products` | Create product (Admin) | `{ name, price, description, category, stock }` | `{ success: true, data: Product }` | `400` Bad Request, `403` Unauthorized |
| `PUT` | `/api/products/:id` | Update product (Admin) | `{ name, price, description, category, stock }` | `{ success: true, data: Product }` | `404` Not Found, `403` Unauthorized |
| `DELETE` | `/api/products/:id` | Delete product (Admin) | None | `{ success: true, message: "Deleted" }` | `404` Not Found, `403` Unauthorized |

### Shopping Cart Endpoints
| Method | Endpoint | Purpose | Request Body | Response (200) | Errors |
|---|---|---|---|---|---|
| `GET` | `/api/cart` | View active cart | None | `{ success: true, data: { items: [ CartItem ], totalAmount } }` | `401` Unauthorized |
| `POST` | `/api/cart/items` | Add product to cart | `{ productId, quantity }` | `{ success: true, data: Cart }` | `400` Bad Request |
| `PUT` | `/api/cart/items/:productId` | Update item quantity | `{ quantity }` | `{ success: true, data: Cart }` | `404` Item Not in Cart |
| `DELETE` | `/api/cart/items/:productId` | Remove item from cart | None | `{ success: true, data: Cart }` | `404` Item Not in Cart |

### Order Processing Endpoints
| Method | Endpoint | Purpose | Request Body | Response (201/200) | Errors |
|---|---|---|---|---|---|
| `POST` | `/api/orders` | Place new order | None (Uses active cart) | `{ success: true, data: Order }` | `400` Empty Cart |
| `GET` | `/api/orders` | View user order history | None | `{ success: true, data: [ Order ] }` | `401` Unauthorized |
| `GET` | `/api/orders/:id` | View specific order details | None | `{ success: true, data: Order }` | `404` Not Found |

### Administrative Endpoints
| Method | Endpoint | Purpose | Request Body | Response (200) | Errors |
|---|---|---|---|---|---|
| `GET` | `/api/admin/orders` | View all customer orders | None | `{ success: true, data: [ Order ] }` | `403` Forbidden |
| `PUT` | `/api/admin/orders/:id/status` | Update order status | `{ status }` | `{ success: true, data: Order }` | `400` Invalid Status, `403` Forbidden |

### Health Check Endpoint
| Method | Endpoint | Purpose | Request Body | Response (200) |
|---|---|---|---|---|
| `GET` | `/api/health` | Service health status | None | `{ status: "ok", architecture, timestamp, uptime }` |

---

## 7. Frontend Navigation Structure

```
                             +------------------------+
                             |   Application Shell    |
                             +------------------------+
                                         |
         +-------------------------------+-------------------------------+
         |                               |                               |
         v                               v                               v
+------------------+           +------------------+           +------------------+
| Customer View    |           |  Authentication  |           |    Admin View    |
+------------------+           +------------------+           +------------------+
| - Home           |           | - Login          |           | - Dashboard      |
| - Products       |           | - Register       |           | - Product List   |
| - Product Detail |           +------------------+           | - Order Overview |
| - Cart           |                                          +------------------+
| - Checkout       |
| - Orders         |
| - Profile        |
+------------------+
```

---

## 8. Common Product Model Schema

```javascript
{
  id: "p1",
  name: "Wireless Ergonomic Headset",
  title: "Wireless Ergonomic Headset", // Title alias for UI display compatibility
  description: "High-fidelity audio with active noise cancellation for professional use.",
  price: 99.99,
  category: "Electronics",
  image: "🎧",
  stock: 15,
  createdAt: "2026-09-21T18:00:00.000Z",
  updatedAt: "2026-09-21T18:00:00.000Z"
}
```

---

## 9. Common Order Model Schema

```javascript
{
  id: "ord_1001",
  userId: "usr_501",
  items: [
    {
      productId: "p1",
      productName: "Wireless Ergonomic Headset",
      quantity: 1,
      price: 99.99,
      subtotal: 99.99
    }
  ],
  totalAmount: 99.99,
  status: "PENDING", // Enums: PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
  createdAt: "2026-09-21T19:00:00.000Z"
}
```

---

## 10. Top-Down Development Strategy (`top-down-approach/`)

Top-Down design approaches software development from the **system-level goals** downward to lower-level implementation details.

### Deconstructive Pipeline
1. **System Definition**: Identify overall user requirements, application screens, and full-page workflows (`views/CatalogView.jsx`).
2. **Feature Boundaries**: Break down high-level screens into distinct feature modules (`features/product-catalog/ProductGrid.jsx`).
3. **Component & Service Contracts**: Define UI components (`Header.jsx`, `Footer.jsx`) and API service client contracts (`services/productService.js`) with mockable interface placeholders.
4. **Backend Controllers & Routes**: Define API endpoints (`routes/`) and controller orchestration handlers (`controllers/`) matching frontend specifications.
5. **Business Logic & Data Access Layer**: Implement domain service logic (`services/`) and data models (`models/`) at the lowest layer.

---

## 11. Bottom-Up Development Strategy (`bottom-up-approach/`)

Bottom-Up design approaches software development from **foundational building blocks** upward into complex application views.

### Constructive Pipeline
1. **Foundational Primitives**: Build atomic UI building blocks (`components/primitives/Button.jsx`, `Card.jsx`, `Badge.jsx`), formatting utilities (`utils/formatters.js`), and base data validation primitives (`models/product.model.js`).
2. **Composite Modules**: Combine atomic elements into composite UI units (`components/composite/ProductCard.jsx`, `HeaderBar.jsx`) and backend service compositions (`services/product.service.js`).
3. **Containers & Controllers**: Assemble composite components into stateful container components (`containers/ProductCatalogContainer.jsx`) and API controllers (`controllers/product.controller.js`).
4. **Application Views**: Group containers and composite bars into full page views (`views/CatalogPage.jsx`).
5. **Complete System Integration**: Wire together application views and backend API route aggregators (`routes/`) into a complete operating system (`App.jsx`).

---

## 12. Intentionally Excluded Features

To maintain a focused 3rd-year Software Engineering scope, the following enterprise complexity features are explicitly **excluded**:

- Real third-party payment gateways (Stripe/PayPal SDKs).
- Live shipping provider rate calculators and tracking APIs.
- Machine-learning recommendation engines.
- Real-time chat support or WebSocket notification brokers.
- Microservice architecture, Redis caching, or Kubernetes deployment setups.
- Advanced analytics, reporting engines, or telemetry pipelines.
