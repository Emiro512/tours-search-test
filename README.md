# Tours Search Test App

A React + TypeScript application for searching tours by destination, displaying available tour prices, and viewing detailed tour information.

The project focuses on clean frontend architecture, separation of business logic from UI, and a production-like implementation of asynchronous search flow, data aggregation, responsive UI, and persisted theme preferences.

## Features

- Destination search form with a reusable combobox
- Destination suggestions for countries, cities, and hotels
- Debounced geo suggestions while typing
- Country base list on first input interaction
- Keyboard-friendly combobox interaction
- Async tour search flow using TanStack Query
- Loading, error, empty, and success states
- Responsive tour result cards
- Tour details page with hotel and price data
- Spinner and skeleton loading UX
- Dark theme support with persisted preference
- Subtle UI motion using Framer Motion
- Manual UI components without UI libraries

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS v4
- React Router
- TanStack Query
- Floating UI
- Framer Motion
- clsx

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

Preview the production build:

```bash
npm run preview
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
      external/
      api.types.ts
      providedApi.ts
      toursApi.ts
      hotelsApi.ts
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

## Architecture Overview

The application is organized around clear separation of responsibilities.

The provided external API file is treated as immutable. The application does not modify `src/services/api/external/api.js`; instead, it communicates with it through a thin adapter layer.

API DTOs are kept separate from domain and service-level models. Raw API shapes live in `services/api`, while normalized models are exposed from services and consumed by UI-facing layers.

Business logic is implemented in framework-agnostic services. React components do not own polling, retry behavior, data aggregation, or hotel merging logic.

TanStack Query hooks stay thin. They call service functions and expose query state to pages or widgets without duplicating service-level behavior.

Reusable primitives live in `shared/ui`, while composed feature UI lives in `widgets`.

## Key Engineering Decisions

- The external API module is wrapped by `providedApi.ts` instead of being imported directly throughout the app.
- Search polling and retry behavior live in `searchService`, not in hooks or components.
- Tour results are aggregated in the tours service layer by combining prices with hotel data.
- Hotels are cached in memory by country inside the tours service to avoid unnecessary repeated requests.
- Sorting by price happens in the aggregation layer, not in presentation components.
- The destination combobox is reusable and API-agnostic.
- The search form remains reusable and exposes a clean submit contract.
- UI loading states use small shared Spinner and Skeleton primitives.
- Theme state is managed by a small ThemeProvider and persisted in `localStorage`.

## Implemented User Flow

1. The user opens the home page.
2. The user clicks the destination input.
3. The combobox shows the base countries list.
4. While typing, geo suggestions are fetched with debounce.
5. The user selects a country, city, or hotel.
6. The selected label is shown in the input.
7. The user submits the form.
8. The app runs the tour search through the service layer.
9. Results are loaded, aggregated with hotel data, sorted by price, and rendered as responsive cards.
10. The user can open a specific tour price.
11. The details page loads hotel and price details and renders the full tour information.

## Notes

- The app intentionally does not use UI libraries such as MUI, Ant Design, or Bootstrap.
- The current UI text is centralized in a small constants file, but a full i18n system is not implemented.
- The theme preference is persisted and applied by toggling the `dark` class on `document.documentElement`.
- The build may warn about chunk size because Framer Motion is included in the main bundle.

## Possible Future Improvements

- Add route-level code splitting for heavier UI dependencies.
- Add stronger accessibility semantics for the combobox.
- Add a richer tour details layout.
- Add automated tests for services and aggregation logic.
- Add end-to-end tests for the search flow.
- Add cache invalidation or TTL if the API data becomes time-sensitive.
- Add a full i18n solution if multiple languages become a requirement.
