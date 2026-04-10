# Tours Search Application

## Overview

This project is a tours search application that allows users to:

* search destinations using an autocomplete combobox (countries, cities, hotels)
* view available tour offers
* open a dedicated page with full tour details

The application is built with a focus on clean architecture, separation of concerns, and scalable frontend patterns.

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build project

```bash
npm run build
```

---

## Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **TanStack Query**
* **Tailwind CSS**

---

## Architecture

The project follows a layered and modular structure:

### Services layer

* contains business logic and orchestration
* handles polling, retries, and aggregation
* isolates API behavior from UI

### API layer

* thin adapters over the provided external API
* normalizes responses into predictable DTOs

### Hooks

* thin wrappers around services
* responsible only for connecting services to React via TanStack Query

### Widgets

* feature-level UI composition
* examples:

  * search form
  * results list

### Entities

* domain-level UI components (e.g. tour card)

### Shared

* reusable UI primitives (button, input, popover, combobox)
* utility functions (formatting, constants)

---

## Key Features

### Destination Autocomplete

* supports countries, cities, and hotels
* dynamic suggestions based on user input
* reusable combobox component

### Tours Search

* search flow triggered by selected destination
* loading, error, and empty states handled explicitly

### Polling Strategy

* search results are loaded via polling
* implemented in the service layer (not in React)
* keeps UI components simple and predictable

### Tour Details Page

* dedicated route for each tour
* loads hotel and price data
* displays:

  * image
  * location
  * price and dates
  * description
  * services

---

## Key Decisions

* **Business logic is placed in services**, not in React components
* **Polling and retries are handled outside of hooks**, improving readability
* **TanStack Query is used for server state**, avoiding unnecessary global state complexity
* **Combobox is implemented as a reusable component**, not tied to tours logic
* **API layer isolates external data structures**, preventing leakage into UI

---

## Possible Improvements

If this were a production project, the next steps would be:

* add full **i18n support**
* implement **dark/light theme**
* introduce **Redux Toolkit** for global preferences (theme, locale)
* improve **test coverage**
* enhance UI with skeleton loaders and animations

---

## Notes

* The external API file is treated as immutable and is not modified.
* The implementation focuses on clarity, maintainability, and incremental development.
* The project structure is intentionally kept simple and scalable.

---
