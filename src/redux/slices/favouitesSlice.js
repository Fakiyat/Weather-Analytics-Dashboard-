import { createSlice } from "@reduxjs/toolkit";

// Load favorites from localStorage
const loadFavorites = () => {
  try {
    const saved = localStorage.getItem("favoriteCities");
    return saved ? JSON.parse(saved) : ["London", "New York", "Tokyo"];
  } catch (error) {
    return ["London", "New York", "Tokyo"];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    cities: loadFavorites(),
  },
  reducers: {
    addFavorite: (state, action) => {
      const city = action.payload;
      if (!state.cities.includes(city)) {
        state.cities.push(city);
        localStorage.setItem("favoriteCities", JSON.stringify(state.cities));
      }
    },
    removeFavorite: (state, action) => {
      state.cities = state.cities.filter((city) => city !== action.payload);
      localStorage.setItem("favoriteCities", JSON.stringify(state.cities));
    },
    toggleFavorite: (state, action) => {
      const city = action.payload;
      const index = state.cities.indexOf(city);

      if (index > -1) {
        state.cities.splice(index, 1);
      } else {
        state.cities.push(city);
      }

      localStorage.setItem("favoriteCities", JSON.stringify(state.cities));
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
