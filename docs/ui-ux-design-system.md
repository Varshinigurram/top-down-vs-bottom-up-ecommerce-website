# UI/UX Design System

## Product direction

Both applications use the same product language: a restrained, professional e-commerce interface with a neutral background, deep navy project identity, indigo interaction states, compact navigation, clear white content surfaces, and status colors paired with readable text. The Top-Down and Bottom-Up implementations keep their own component and feature boundaries; this document describes the comparable visual contract, not a shared implementation.

The catalog now opens with a short editorial introduction, category discovery controls, product metadata, stock visibility, and action-oriented cards. The header uses a branded mark, compact hierarchy, sticky desktop behavior, and a horizontally usable mobile navigation. Product, cart, checkout, order, authentication, and admin surfaces use the same restrained surfaces, focus treatments, spacing, and action language.

## Foundations

### Current palette

- Project identity: deep navy `#111827`.
- Primary interactive accent: indigo `#4F46E5`; hover/deep action `#4338CA`.
- Background: `#F8FAFC`; surface: `#FFFFFF`; secondary surface: `#F1F5F9`.
- Text: `#0F172A`; muted text `#64748B`; border `#E2E8F0`.
- Semantic colors: success `#15803D`, warning `#B45309`, and error `#DC2626`.

The palette intentionally avoids coral headings, competing blue controls, peach primary buttons, and rainbow status treatments. Indigo is the only primary action color.

- Typography: system sans-serif stack; page titles are strong and compact, supporting copy is muted.
- Spacing: 0.25rem base increments, with 0.75rem control spacing, 1.5rem section spacing, and 2rem page spacing.
- Surfaces: white cards on a cool neutral background, 1px neutral borders only where a boundary matters, small-to-medium radii, and restrained shadows. Search controls and category navigation are not placed inside nested bordered boxes.
- Actions: primary actions use indigo, secondary actions use a quiet outline or neutral treatment, destructive actions are red, and disabled actions reduce opacity without losing their label.
- Currency: all customer and admin price displays use the shared INR presentation rule documented in [currency-and-business-rules.md](./currency-and-business-rules.md).

## Interaction patterns

- Every asynchronous screen exposes loading, success/content, empty, and error states.
- Errors are visible in the page context and provide a retry or corrective action where applicable.
- Empty states explain why there is no content and offer a reset or next step.
- Quantity controls clamp values to a minimum of 1 and the available stock.
- Status badges always include readable status text; color is supplementary.
- Navigation uses semantic buttons/links, visible focus styling, and a horizontally usable mobile layout.

## Spacing scale

The applications use a compact 4px-based rhythm: **4, 8, 12, 16, 24, 32, 48, 64px**. Page sections generally use 32–48px separation, controls use 8–12px gaps, and product cards use 16px internal spacing. This keeps the catalog dense enough to shop while preserving hierarchy.

## Responsive contract

The main content remains within a readable max width and collapses to a single-column flow on narrow screens. Catalog grids, cart summaries, checkout columns, order panels, and admin tables use intentional mobile layouts rather than simply shrinking desktop content. The catalog was smoke-tested at 320px with no document overflow in either implementation.

## Architectural preservation

Top-Down presentation changes remain in its views, feature components, context, services, and presentation utilities. Bottom-Up presentation changes remain in primitives, composites, features, views, and utilities. No UI refinement requires merging these layers.
