# Top-down vs Bottom-up Design: Case Study of an E-Commerce App

## Purpose of the Case Study
This Software Engineering case study explores and compares two fundamental software design paradigms—**Top-Down Design** and **Bottom-Up Design**—within the context of building a full-stack E-Commerce application. 

Both applications in this repository are functionally equivalent from an end-user perspective, but their architectural organization, component decomposition, and development workflows strictly reflect their respective design paradigms.

## Technology Stack
- **Frontend**: React.js (v18+), Vite, Plain CSS, JavaScript (ES6+)
- **Backend**: Node.js, Express.js (REST API Architecture)
- **Database**: Architecture-ready for MongoDB (Mongoose abstraction layer ready)
- **Tooling & Protocols**: HTTP / REST, JSON, ES Modules

## Two Approaches Being Compared

### 1. Top-Down Approach (`top-down-approach/`)
- **Philosophy**: High-level system goals and user workflows dictate the design. Decomposes system requirements into view screens, feature modules, component interfaces, API contracts, and finally data storage.
- **Frontend Flow**: System → Views (`views/`) → Feature Modules (`features/`) → UI Components (`components/`) → API Services (`services/`)
- **Backend Flow**: REST Routes (`routes/`) → Controllers (`controllers/`) → Business Logic Services (`services/`) → Data Models (`models/`)

### 2. Bottom-Up Approach (`bottom-up-approach/`)
- **Philosophy**: Foundational data structures, utility primitives, and reusable atomic components are built first. These primitives are composed upward to construct features, containers, and complete application views.
- **Frontend Flow**: Primitive UI Atoms (`components/primitives/`) → Composite Elements (`components/composite/`) → View Containers (`containers/`) → Application Views (`views/`)
- **Backend Flow**: Data Schemas & Validation (`models/`) → Core Utilities (`utils/`) → Business Services (`services/`) → Controllers (`controllers/`) → API Routes (`routes/`)

## High-Level Directory Structure

```text
E-Commerce Website/
├── README.md
├── top-down-approach/
│   ├── client/
│   │   ├── src/
│   │   │   ├── views/          # High-level screen layouts (CatalogView)
│   │   │   ├── features/       # Feature boundaries (product-catalog)
│   │   │   ├── components/     # Decomposed UI elements (Header, Footer)
│   │   │   ├── services/       # API contract client integration
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │   └── package.json
│   └── server/
│       ├── src/
│       │   ├── routes/         # Endpoint definitions
│       │   ├── controllers/    # API request handlers
│       │   ├── services/       # Top-down business services
│       │   ├── models/         # Domain data definitions
│       │   ├── app.js
│       │   └── server.js
│       └── package.json
└── bottom-up-approach/
    ├── client/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── primitives/ # Foundational atomic UI (Button, Card, Badge)
    │   │   │   └── composite/  # Composed components (ProductCard)
    │   │   ├── containers/     # Assembled containers (ProductCatalogContainer)
    │   │   ├── utils/          # Pure helper primitives (formatters)
    │   │   ├── views/          # Composite page views
    │   │   ├── App.jsx
    │   │   └── main.jsx
    │   └── package.json
    └── server/
        ├── src/
        │   ├── models/         # Base data schema primitives
        │   ├── utils/          # Standard response formatters
        │   ├── services/       # Domain service compositions
        │   ├── controllers/    # Route handler controllers
        │   ├── routes/         # Express REST API routes
        │   ├── app.js
        │   └── server.js
        └── package.json
```

## How to Run the Applications

Each approach has separate `client/` (Frontend React) and `server/` (Backend Express) sub-directories.

### 1. Running the Bottom-Up Application (`bottom-up-approach`)

Open two terminal windows:

* **Terminal 1 - Backend Server** (Port 5002):
  ```bash
  cd bottom-up-approach/server
  npm start
  ```
  *(Or from `bottom-up-approach/`: `npm run start:server`)*

* **Terminal 2 - Frontend Client** (Port 3002):
  ```bash
  cd bottom-up-approach/client
  npm run dev
  ```
  *(Or from `bottom-up-approach/`: `npm run dev:client`)*

---

### 2. Running the Top-Down Application (`top-down-approach`)

Open two terminal windows:

* **Terminal 1 - Backend Server** (Port 5001):
  ```bash
  cd top-down-approach/server
  npm start
  ```
  *(Or from `top-down-approach/`: `npm run start:server`)*

* **Terminal 2 - Frontend Client** (Port 3001):
  ```bash
  cd top-down-approach/client
  npm run dev
  ```
  *(Or from `top-down-approach/`: `npm run dev:client`)*

---

## Current Implementation Status
- **Phase 1: Initial Foundation Setup (Completed)**
  - Runnable React + Vite frontend setup for both applications.
  - Runnable Node.js + Express backend setup for both applications.
  - Basic shared placeholder product dataset.
  - Health check endpoints (`GET /api/health`) and product endpoints (`GET /api/products`).
  - Clear architectural boundaries establishing Top-Down vs Bottom-Up code organization.

