import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import favoritesReducer from "./slices/favouitesSlice";
import settingsReducer from "./slices/settingsSlice";

export const Store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    settings: settingsReducer,
  },
});
