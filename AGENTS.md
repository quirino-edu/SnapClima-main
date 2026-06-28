# AGENTS

## Project overview

SnapClimb is a small static web application built with plain HTML, CSS, and JavaScript.
It fetches current weather data from the OpenWeatherMap API and displays it in Portuguese (pt-BR).

## Key files

- `index.html` — single-page UI and markup.
- `style.css` — app styling and responsive layout.
- `app.js` — main logic: geolocation, city search, API calls, and DOM updates.
- `_img/assets/` — local SVG weather icons and loading asset.
- `README.md` — project description and API references.

## How to run

This project has no build step.
Open `index.html` in a browser or use a local static server / Live Server extension.

## Important behavior

- The app uses `navigator.geolocation.getCurrentPosition` to load weather for the user's current location.
- City search works through an input field and button, with Enter triggering the search.
- Weather data is fetched from OpenWeatherMap using `fetch` and the `weather` endpoint.
- The displayed weather icon is loaded locally from `_img/assets/${icon}.svg` based on the API response code.

## What to keep in mind

- The project is client-only and relies on browser APIs; no Node/npm dependencies are required.
- API keys are currently included directly in `app.js`.
- Error handling is minimal: invalid city names show an alert and geolocation failures show an alert or console error.

## Useful notes for agents

- Do not assume a backend or build system exists.
- Changes to weather icon handling should preserve the local SVG mapping in `_img/assets/`.
- Any UI changes should remain consistent with the current Portuguese locale and existing ID-based DOM references.
