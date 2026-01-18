import axios from "axios";

// Replace with your actual API key
const API_KEY = import.meta.env.VITEWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Cache configuration
const CACHE_DURATION = 60000; // 60 seconds
const cache = new Map();

// Check if cached data is still valid
const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

// Fetch current weather data for a city
export const fetchWeatherData = async (city) => {
  const cacheKey = `weather_${city}`;

  // Check cache first
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (isCacheValid(timestamp)) {
      return data;
    }
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    const data = response.data;

    // Cache the response
    cache.set(cacheKey, { data, timestamp: Date.now() });

    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch weather data",
    );
  }
};

// Fetch 5-day forecast data
export const fetchForecastData = async (city) => {
  const cacheKey = `forecast_${city}`;

  // Check cache first
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (isCacheValid(timestamp)) {
      return data;
    }
  }

  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    const data = {
      city: response.data.city.name,
      list: response.data.list,
    };

    // Cache the response
    cache.set(cacheKey, { data, timestamp: Date.now() });

    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch forecast data",
    );
  }
};

// Search cities (autocomplete)
export const searchCities = async (query) => {
  if (!query || query.length < 2) return [];

  try {
    const response = await axios.get(`${BASE_URL}/find`, {
      params: {
        q: query,
        appid: API_KEY,
        type: "like",
        cnt: 5, // Limit to 5 suggestions
      },
    });

    return response.data.list.map((city) => ({
      name: city.name,
      country: city.sys.country,
    }));
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};

// Clear cache (useful for manual refresh)
export const clearCache = () => {
  cache.clear();
};
