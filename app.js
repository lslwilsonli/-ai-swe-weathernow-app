// Helper to build localStorage cache key
function getCacheKey(city) {
  return `weather_${city.toLowerCase()}`;
}

// Helper to check if cached data is fresh (less than 1 hour old)
function isCacheValid(cache) {
  if (!cache || !cache.timestamp) return false;
  const ONE_HOUR = 60 * 60 * 1000;
  return Date.now() - cache.timestamp < ONE_HOUR;
}

// Main function to fetch weather based on city name
async function getWeather() {
  const cityInput = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  resultDiv.textContent = "";

  // Validate input: allow letters and spaces only
  if (!/^[a-zA-Z\s]+$/.test(cityInput)) {
    resultDiv.textContent = "❌ Please enter a valid city name (letters only).";
    return;
  }

  const cacheKey = getCacheKey(cityInput);
  const cached = JSON.parse(localStorage.getItem(cacheKey));

  // If cache exists and is valid, use it
  if (isCacheValid(cached)) {
    console.log("Using cached data for:", cityInput);
    displayWeather(cached.data);
    return;
  }

  try {
    // 1. Fetch coordinates from Open-Meteo Geocoding API
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityInput)}&count=1`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultDiv.textContent = "❌ City not found. Please try another name.";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. Fetch weather data from Open-Meteo
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weatherData = await weatherRes.json();

    const weather = weatherData.current_weather;
    const payload = {
      name,
      country,
      temperature: weather.temperature,
      windspeed: weather.windspeed,
      time: weather.time,
    };

    // Cache the response
    localStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      data: payload,
    }));

    // 3. Display weather info
    displayWeather(payload);

  } catch (error) {
    console.error("Error fetching weather:", error);
    resultDiv.textContent = "⚠️ Something went wrong. Please try again later.";
  }
}

// Helper function to display weather
function displayWeather({ name, country, temperature, windspeed, time }) {
  const resultDiv = document.getElementById("weatherResult");
  resultDiv.innerHTML = `
    <p>📍 <strong>${name}, ${country}</strong></p>
    <p>🌡️ Temperature: ${temperature}°C</p>
    <p>💨 Wind Speed: ${windspeed} km/h</p>
    <p>🕒 Time: ${new Date(time).toLocaleString()}</p>
  `;
}
