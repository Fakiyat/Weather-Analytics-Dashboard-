import { createSlice } from "@reduxjs/toolkit";

// Load settings from localStorage
const loadSettings = () => {
  try {
    const saved = localStorage.getItem("weatherSettings");
    return saved ? JSON.parse(saved) : { temperatureUnit: "celsius" };
  } catch (error) {
    return { temperatureUnit: "celsius" };
  }
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: loadSettings(),
  reducers: {
    setTemperatureUnit: (state, action) => {
      state.temperatureUnit = action.payload;
      localStorage.setItem("weatherSettings", JSON.stringify(state));
    },
    toggleTemperatureUnit: (state) => {
      state.temperatureUnit =
        state.temperatureUnit === "celsius" ? "fahrenheit" : "celsius";
      localStorage.setItem("weatherSettings", JSON.stringify(state));
    },
  },
});

export const { setTemperatureUnit, toggleTemperatureUnit } =
  settingsSlice.actions;
export default settingsSlice.reducer;
