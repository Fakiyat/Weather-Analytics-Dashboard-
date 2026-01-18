// Convert Celsius to Fahrenheit
export const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

// Convert Fahrenheit to Celsius
export const fahrenheitToCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

// Format temperature based on unit preference
export const formatTemperature = (temp, unit = "celsius") => {
  const value = unit === "fahrenheit" ? celsiusToFahrenheit(temp) : temp;
  return `${Math.round(value)}°${unit === "fahrenheit" ? "F" : "C"}`;
};

// Get weather icon based on condition code
export const getWeatherIcon = (code) => {
  // OpenWeatherMap icon codes
  if (code >= 200 && code < 300) return "⛈️"; // Thunderstorm
  if (code >= 300 && code < 400) return "🌦️"; // Drizzle
  if (code >= 500 && code < 600) return "🌧️"; // Rain
  if (code >= 600 && code < 700) return "❄️"; // Snow
  if (code >= 700 && code < 800) return "🌫️"; // Atmosphere
  if (code === 800) return "☀️"; // Clear
  if (code > 800) return "☁️"; // Clouds
  return "🌤️";
};

// Format date and time
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Get wind direction from degrees
export const getWindDirection = (degrees) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

// Group forecast data by day
export const groupForecastByDay = (forecastList) => {
  const grouped = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(item);
  });

  return grouped;
};

// Get daily forecast (one per day at noon)
export const getDailyForecast = (forecastList) => {
  const grouped = groupForecastByDay(forecastList);
  const dailyForecasts = [];

  Object.keys(grouped).forEach((date) => {
    const dayData = grouped[date];
    // Find noon forecast or closest to noon
    const noonForecast =
      dayData.find((item) => {
        const hour = new Date(item.dt * 1000).getHours();
        return hour === 12;
      }) || dayData[0];

    dailyForecasts.push(noonForecast);
  });

  return dailyForecasts.slice(0, 7); // Return 7 days
};

// Check if data needs refresh (older than 60 seconds)
export const needsRefresh = (lastUpdated) => {
  if (!lastUpdated) return true;
  const now = Date.now();
  const diff = now - lastUpdated;
  return diff > 60000; // 60 seconds
};
