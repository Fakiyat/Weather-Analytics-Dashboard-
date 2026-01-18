import React, { useState } from "react";
import { Search, Settings, Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTemperatureUnit,
  toggleTemperatureUnit,
} from "../../redux/slices/settingsSlice";

// import SearchBar from "../Search/SearchBar";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const dispatch = useDispatch();
  const { temperatureUnit } = useSelector((state) => state.settings);
  console.log("Temperature Unit:", temperatureUnit);

  const handleUnitToggle = () => {
    dispatch(toggleTemperatureUnit());
  };

  return (
    <header className="glass px-3! py-1! rounded-2xl shadow-lg ">
      <div className="flex items-center justify-between  ">
        <div className="flex items-center space-x-4!">
          <div className="text-4xl weather-icon">🌤️</div>
          <div>
            <h1 className="text-3xl font-bold text-white">Weather Dashboard</h1>
            <p className="text-white/70 text-sm">Real-time weather analytics</p>
          </div>
        </div>

        <div className="flex items-center space-x-4!">
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-3  transition-all"
            title="Search cities"
          >
            <Search className="w-6 h-6 text-black hover:text-orange-500" />
          </button>

          {/* Temperature Unit Toggle */}
          <button
            onClick={handleUnitToggle}
            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center space-x-2"
            title="Toggle temperature unit"
          >
            <span className="text-white font-semibold">
              °{temperatureUnit === "celsius" ? "C" : "F"}
            </span>
          </button>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="mt-6 animate-slide-down">
          <SearchBar onClose={() => setShowSearch(false)} />
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-6 p-4 bg-white/10 rounded-xl animate-slide-down">
          <h3 className="text-white font-semibold mb-3">Settings</h3>
          <div className="flex items-center justify-between">
            <span className="text-white/80">Temperature Unit</span>
            <div className="flex space-x-2">
              <button
                onClick={() => dispatch(setTemperatureUnit("celsius"))}
                className={`px-4 py-2 rounded-lg transition-all ${
                  temperatureUnit === "celsius"
                    ? "bg-white text-purple-600 font-semibold"
                    : "bg-white/10 text-white"
                }`}
              >
                Celsius
              </button>
              <button
                onClick={() => dispatch(setTemperatureUnit("fahrenheit"))}
                className={`px-4 py-2 rounded-lg transition-all ${
                  temperatureUnit === "fahrenheit"
                    ? "bg-white text-purple-600 font-semibold"
                    : "bg-white/10 text-white"
                }`}
              >
                Fahrenheit
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
