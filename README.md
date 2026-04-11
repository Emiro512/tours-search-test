# Tours Search Test App

## Project Overview

Tours Search Test App is a React + TypeScript application for searching tour offers by destination, displaying available tour results, and opening a dedicated details page for a selected tour.

The project focuses on clean frontend architecture, separation of business logic from UI, and a production-like implementation of asynchronous search, data aggregation, cancellation, caching, responsive UI, and persisted theme preferences.

## Features

### UI / UX

- Destination combobox supporting countries, cities, and hotels
- Base countries list on initial input interaction
- Debounced destination search with an explicit delay
- Keyboard-friendly combobox interaction
- Loading, error, empty, and success states
- Spinner and skeleton-based loading UX
- Responsive tour result cards
- Dedicated tour details page
- Dark theme with persisted preference
- Subtle motion polish with Framer Motion
- No external UI component libraries are used

### Search Behavior

- Restartable search flow when a new destination is submitted
- Previous active search is cancelled as part of client-side search orchestration
- Stale search responses are ignored so old results do not replace the latest request
- Polling and retry behavior are handled outside React components

### Data Handling

- Service-layer aggregation of tour prices and hotel data
- Results are sorted by price in the aggregation layer
- Simple hotels cache with TTL-based entries
- Cache size is capped to avoid unbounded growth

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- Floating UI
- Framer Motion
- Vitest
- Testing Library

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Run tests:

```bash
npm run test
```

## Project Structure

```text
src/
  app/
    providers/
    router/

  entities/
    country/
    hotel/
    tour/

  pages/
    home/
    tour-details/

  services/
    api/
    search/
    tours/

  shared/
    config/
    lib/
    theme/
    ui/

  widgets/
    search-form/
    tour-results/
```

### `shared`

Contains reusable low-level building blocks and utilities, including UI primitives, formatting helpers, theme utilities, and shared configuration.

### `entities`

Contains domain-level types and UI components, such as the tour card.

### `widgets`

Contains composed feature UI, such as the search form and tour results list.

### `services`

Contains API adapters, business logic, search orchestration, polling, retry handling, cancellation, data aggregation, and caching.

### `pages`

Contains route-level components and page-specific query integration.

## Architecture Overview

The provided external API file is treated as immutable. The application does not modify `src/services/api/external/api.js`; instead, all access goes through a thin API adapter layer.

The API adapter layer normalizes interaction with the provided API methods and keeps raw API DTOs isolated from UI components.

Business logic lives in the service layer. Search polling, retry behavior, token handling, cancellation, race-condition protection, hotel aggregation, sorting, and caching are not implemented in React components.

Hooks stay thin and are mostly TanStack Query wrappers around service functions. They connect server state to React without owning service-level business logic.

The UI layer is separated from business logic. Components render prepared data, emit user events, and remain focused on presentation and interaction.

## Key Engineering Decisions

- The external API is wrapped by a dedicated adapter layer instead of being imported directly throughout the app.
- Search orchestration lives in `searchService`, including polling, retries, cancellation, and stale-response handling.
- Tour aggregation lives in the tours service layer, where prices are merged with hotel data and sorted.
- Hooks remain thin and delegate business logic to services.
- The destination combobox is composed from reusable primitives: `Input`, `Popover`, and a generic `Combobox`.
- Destination suggestion logic stays in the search form widget, while shared UI remains API-agnostic.
- Search restarts use a request object with `countryId` and `requestId`, allowing repeated submissions for the same country.
- Cancelled or stale searches use a dedicated cancellation error and are not shown as user-facing failures.
- Debounced destination search uses an explicit debounce constant while keeping countries mode immediate.
- Hotels use a simple service-level cache with TTL and a small max-size limit.
- TanStack Query is used for async server state instead of custom component-level request handling.

## Implemented User Flow

1. The user opens the home page.
2. The user clicks the destination input.
3. The combobox opens with the base countries list.
4. The user can select a country or type to search countries, cities, and hotels.
5. Typed destination search is debounced.
6. The user selects a destination.
7. The selected label is displayed in the input.
8. The user submits the form.
9. The app starts the tour search flow through the service layer.
10. If another search is submitted while a previous one is active, the previous search is cancelled and a new search cycle starts.
11. Search results are loaded, aggregated with hotel data, sorted by price, and rendered as responsive cards.
12. The user opens a tour card.
13. The app navigates to the dedicated tour details page.

## Tour Details Page

The tour details page loads and displays data for a selected tour.

It uses:

- `getHotel(hotelId)` for hotel details
- `getPrice(priceId)` for price details

The page renders:

- hotel image
- hotel name
- country and city
- formatted price
- formatted dates
- description when available
- services when available

The page also includes loading and error states.

## UI / UX Notes

- The destination combobox supports keyboard interaction, including arrow navigation, Enter selection, Escape close, and Tab close.
- Loading states use small spinner and skeleton primitives.
- Result cards are responsive and become one column on narrow screens.
- The full tour card is clickable and links to the details page.
- Dark theme is persisted in `localStorage` and applied by toggling the `dark` class on `document.documentElement`.
- Motion is intentionally subtle and limited to dropdown, cards, and details content.
- No external UI component libraries are used.

## Notes

- `src/services/api/external/api.js` is not modified.
- The project prioritizes architecture, maintainability, and clear separation of concerns.
- API DTOs are separated from service-level and UI-facing models.
- Tests cover selected pure logic and one small form interaction path.

## Possible Future Improvements

- Add a full i18n solution if multiple languages become a requirement.
- Introduce a global app layout to avoid repeating page shell patterns.
- Improve combobox accessibility semantics further.
- Expand caching behavior if API freshness requirements become more complex.
- Add route-level code splitting or other performance optimizations for heavier dependencies.
- Consider SSR or migration to a framework if SEO or server rendering becomes important.
