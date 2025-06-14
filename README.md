# WeatherNow App

## Project Overview

 WeatherNow App is a **client‑side web application** that displays real‑time weather for any city in the world. The app uses the Open‑Meteo Geocoding and Forecast APIs to translate a city name into geographic coordinates and retrieve the current temperature, wind speed, and timestamp. A built‑in one‑hour cache (via `localStorage`) minimises redundant API calls and ensures fast, responsive interactions.

---

## Installation Instructions

1. **Clone or download** this repository.
2. Open the project folder and make sure the following files are present:
   - `index.html`
   - `style.css`
   - `app.js`
3. No build step is required—simply **open **``** in any modern browser** (Chrome, Firefox, Edge, Safari). The app is fully static and needs no server‑side code.

> **Optional:** If you prefer to host the app, place the files on any static host (GitHub Pages, Netlify, Vercel, etc.).

---

## Usage Guide

1. Launch the app (open `index.html`).
2. **Enter a city name** (letters and spaces only) in the input box.
3. Click **“Check Weather”**.
4. The app validates the input, fetches data from the Open‑Meteo APIs (using cache if available), and displays:
   - City and country
   - Temperature (°C)
   - Wind speed (km/h)
   - Local timestamp of the reading

---

## Example Output

```text
📍 London, United Kingdom
🌡️ Temperature: 18°C
💨 Wind Speed: 12 km/h
🕒 Time: 2025‑06‑14 11:00
```

> **Screenshots:** Add a screenshot of the app in action here.

---

## Features

- **Real‑time weather lookup** powered by Open‑Meteo APIs.
- **Client‑side caching** (1‑hour TTL) to reduce network latency and API usage.
- **Input validation** to prevent malformed or malicious data.
- **Responsive design** with a modern gradient background and mobile‑friendly layout.
- **Graceful error handling** with clear user feedback.

---

## Error Handling

- **Invalid input:** Non‑alphabetic characters trigger an inline error message.
- **City not found:** If geocoding returns no results, the user is prompted to try another name.
- **Network/API failure:** A generic warning is shown and details are logged to the console.
- **Cache expiry:** Data older than one hour is automatically refreshed.

---

## API Information

- **Geocoding API:** `https://geocoding-api.open-meteo.com/v1/search`
- **Weather API:** `https://api.open-meteo.com/v1/forecast`

Both endpoints are free to use and require **no API key**.

---

## Future Improvements

- Add a **forecast view** (next 7 days / hourly graph).
- **Offline support** via a Service Worker.
- Switch temperature units (°C / °F) based on user preference.
- Integrate **unit tests** (Jest) for core helpers.
- Accessibility polish (ARIA labels and keyboard navigation).

---

### Contributing & License

Pull requests are welcome! This project is released under the MIT License.

