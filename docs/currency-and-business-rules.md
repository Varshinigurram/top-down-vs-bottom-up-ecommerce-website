# Currency and Business Rules

These rules are shared by both implementations. The backend remains authoritative for cart and order totals; client formatters are presentation-only.

## Currency and totals

- Currency: Indian Rupees (INR), displayed with the `₹` symbol and `en-IN` grouping.
- Tax: `subtotal × 0.08`.
- Shipping: `₹0`.
- Total: `subtotal + shipping + tax`.
- Historical order line prices and totals are read from the order snapshot and are never reconstructed from current products.

## Product categories

The valid categories are **Electronics**, **Home**, **Fashion**, **Accessories**, and **Lifestyle**. Catalog filters, admin forms, seed data, and backend validators must use these same values.

## Order statuses

The valid statuses are **PENDING**, **CONFIRMED**, **SHIPPED**, **DELIVERED**, and **CANCELLED**. Existing backend transition validation is authoritative; clients must display rejected transitions as errors rather than creating a second state machine.

## Authentication and persistence

Authentication uses HTTP-only cookies. The applications intentionally use in-memory repositories, so dynamically registered users and runtime changes disappear when a server process restarts. Seeded accounts remain available after restart.
