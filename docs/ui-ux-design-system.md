# UI/UX Design System

## Product direction

Both applications use the same Meridian Market product language: a restrained retail interface with a dark navigation shell, clear white content surfaces, blue/emerald action accents, and status colors that are paired with text. The Top-Down and Bottom-Up implementations keep their own component and feature boundaries; this document describes the comparable visual contract, not a shared implementation.

## Foundations

- Typography: system sans-serif stack; page titles are strong and compact, supporting copy is muted.
- Spacing: 0.25rem base increments, with 0.75rem control spacing, 1.5rem section spacing, and 2rem page spacing.
- Surfaces: white cards on a light slate page background, 1px slate borders, small-to-medium radii, and restrained shadows.
- Actions: primary actions use the application accent, secondary actions use an outlined or neutral treatment, destructive actions are red, and disabled actions reduce opacity without losing their label.
- Currency: all customer and admin price displays use the shared INR presentation rule documented in [currency-and-business-rules.md](./currency-and-business-rules.md).

## Interaction patterns

- Every asynchronous screen exposes loading, success/content, empty, and error states.
- Errors are visible in the page context and provide a retry or corrective action where applicable.
- Empty states explain why there is no content and offer a reset or next step.
- Quantity controls clamp values to a minimum of 1 and the available stock.
- Status badges always include readable status text; color is supplementary.
- Navigation uses semantic buttons/links, visible focus styling, and a horizontally usable mobile layout.

## Responsive contract

The main content remains within a readable max width and collapses to a single-column flow on narrow screens. Catalog grids, cart summaries, checkout columns, order panels, and admin tables must be usable at 320px, 375px, 768px, 1024px, and 1440px without horizontal page overflow.

## Architectural preservation

Top-Down presentation changes remain in its views, feature components, context, services, and presentation utilities. Bottom-Up presentation changes remain in primitives, composites, features, views, and utilities. No UI refinement requires merging these layers.
