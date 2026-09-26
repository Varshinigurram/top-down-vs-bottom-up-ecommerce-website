# Architecture Comparison

## Purpose

The two applications implement the same e-commerce requirements and business rules. Their difference is the direction in which responsibilities are assembled, not the user-facing product. The redesign changes presentation and copy only; it does not merge the codebases or replace their service boundaries.

## Top-Down construction strategy

### Direction

`Requirements → Views/Features → Components → Client Services → REST Routes → Controllers → Business Services → Repositories/Data`

The Top-Down implementation begins with user journeys and screen-level requirements. Views coordinate feature modules, feature modules use presentation components and contexts, and client services define the API boundary. On the server, routes dispatch to controllers, controllers invoke business services, and services use repositories.

### Representative modules

- Application/view composition: [client/src/App.jsx](../top-down-approach/client/src/App.jsx)
- Catalog view: [client/src/views/CatalogView.jsx](../top-down-approach/client/src/views/CatalogView.jsx)
- Catalog feature: [client/src/features/product-catalog/ProductGrid.jsx](../top-down-approach/client/src/features/product-catalog/ProductGrid.jsx)
- Client API boundary: [client/src/services/productService.js](../top-down-approach/client/src/services/productService.js)
- Server route boundary: [server/src/routes/product.routes.js](../top-down-approach/server/src/routes/product.routes.js)
- Business layer: [server/src/services/product.service.js](../top-down-approach/server/src/services/product.service.js)
- Data layer: [server/src/repositories/product.repository.js](../top-down-approach/server/src/repositories/product.repository.js)

### Representative user flow

1. `CatalogView` loads products through the Top-Down product client service.
2. `ProductGrid` composes `ProductItem` feature components.
3. Add to Cart uses `CartContext` and the Top-Down cart service.
4. The REST route dispatches to a cart controller and business service.
5. The business service reads/writes cart and product repositories.
6. Checkout invokes the order client service, then the order route/controller/service creates a historical order snapshot.

The same pattern applies to authentication and order history: the view and feature requirements are the starting point, with lower layers serving those flows.

## Bottom-Up construction strategy

### Direction

`Domain/Data Primitives → Validators/Utilities → Repositories → Reusable Services → Atomic UI Components → Composite Components → Feature Modules → Views → Application`

The Bottom-Up implementation begins with stable primitives and reusable building blocks. Server constants, validators, utility calculations, models, and repositories support reusable services. On the client, primitive controls are composed into composite commerce components, which are assembled by feature modules and views.

### Representative modules

- Application/view composition: [client/src/App.jsx](../bottom-up-approach/client/src/App.jsx)
- Primitive API boundary: [client/src/services/apiClient.js](../bottom-up-approach/client/src/services/apiClient.js)
- Atomic UI controls: [client/src/components/primitives/Button.jsx](../bottom-up-approach/client/src/components/primitives/Button.jsx)
- Composite commerce component: [client/src/components/composite/ProductCard.jsx](../bottom-up-approach/client/src/components/composite/ProductCard.jsx)
- Feature view: [client/src/views/CatalogView.jsx](../bottom-up-approach/client/src/views/CatalogView.jsx)
- Domain constants/validators: [server/src/constants/domain.constants.js](../bottom-up-approach/server/src/constants/domain.constants.js), [server/src/validators/product.validator.js](../bottom-up-approach/server/src/validators/product.validator.js)
- Reusable service: [server/src/services/product.service.js](../bottom-up-approach/server/src/services/product.service.js)
- Repository/data primitive: [server/src/repositories/product.repository.js](../bottom-up-approach/server/src/repositories/product.repository.js)

### Representative user flow

1. `CatalogView` composes the catalog feature from search, filters, feedback states, and a composite `ProductGrid`.
2. `ProductGrid` renders reusable `ProductCard` composites.
3. The product service uses the primitive `apiClient` for `/api/products`.
4. Add to Cart uses the cart service primitive and authenticated cart route.
5. Server controllers delegate to reusable services, which use validators, calculations, and repositories.
6. Checkout composes reusable order-summary primitives and invokes the order service; the backend creates the historical snapshot.

Authentication follows the same bottom-up direction: `AuthContext` consumes the auth service, which consumes `apiClient` and session utilities, while server validators and services sit above model/repository primitives.

## Comparison

| Concern | Top-Down | Bottom-Up |
|---|---|---|
| Starting point | User requirements and screens | Domain/data and reusable primitives |
| Client composition | Views and features consume components/services | Primitives compose into composites, features, and views |
| Server composition | Routes/controllers organize business services | Validators/utilities/models support reusable services and controllers |
| Dependency direction | High-level workflow drives lower layers | Stable lower-level building blocks support higher layers |
| User-facing product | Same catalog, cart, checkout, orders, auth, and admin requirements | Same catalog, cart, checkout, orders, auth, and admin requirements |

Neither approach is presented as universally better. The case study compares how each construction direction affects decomposition, composition, and responsibility boundaries while holding the product requirements constant.

## Catalog API verification note

Bottom-Up uses `VITE_API_URL || '/api'`, with the Vite development proxy mapping client port 3002 to server port 5002. A browser “Failed to fetch” error occurs when the backend is not running, or when a static preview is served without an equivalent `/api` reverse proxy. A clean local verification returned JSON from `GET http://localhost:5002/api/products` with HTTP 200 and `application/json`.
