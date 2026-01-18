import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchForecastData, fetchWeatherData } from "../../services/weatherApi";

// Async thunk to fetch current weather
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const response = await fetchWeatherData(city);
    return response;
  },
);

// Async thunk to fetch forecast
export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async (city) => {
    const response = await fetchForecastData(city);
    return response;
  },
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    currentWeather: {},
    forecasts: {},
    loading: false,
    error: null,
    selectedCity: null,
  },
  reducers: {
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Weather
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather[action.payload.name] = {
          ...action.payload,
          lastUpdated: Date.now(),
        };
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Forecast
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.forecasts[action.payload.city] = {
          ...action.payload,
          lastUpdated: Date.now(),
        };
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCity, clearError } = weatherSlice.actions;
export default weatherSlice.reducer;
