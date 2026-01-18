import React, { useState } from "react";
import { Search, Settings, Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTemperatureUnit } from "../../redux/slices/settingsSlice";
import SearchBar from "../Search/SearchBar";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const dispatch = useDispatch();
  const { temperatureUnit } = useSelector((state) => state.settings);

  const handleUnitToggle = () => {
    dispatch(toggleTemperatureUnit());
  };

  return (
    <header className="glass rounded-2xl p-6! mb-6!">
      <div className="flex items-center justify-between">
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
            className="p-3! rounded-xl glass-card hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            title="Search cities"
          >
            <Search className="w-5 h-5 text-white" />
          </button>

          {/* Temperature Unit Toggle */}
          <button
            onClick={handleUnitToggle}
            className="px-4! py-3! rounded-xl glass-card hover:bg-white/20 transition-all duration-300 transform hover:scale-110 flex items-center space-x-2"
            title="Toggle temperature unit"
          >
            <span className="text-white font-semibold">
              °{temperatureUnit === "celsius" ? "C" : "F"}
            </span>
          </button>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-3! rounded-xl glass-card hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="mt-6! animate-slide-down">
          <SearchBar onClose={() => setShowSearch(false)} />
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-6! p-4! glass-dark rounded-xl animate-slide-down">
          <h3 className="text-white font-semibold mb-3!">Settings</h3>
          <div className="flex items-center justify-between">
            <span className="text-white/80">Temperature Unit</span>
            <div className="flex space-x-2!">
              <button
                onClick={() => dispatch(toggleTemperatureUnit())}
                className={`px-4! py-2! rounded-lg transition-all duration-300 ${
                  temperatureUnit === "celsius"
                    ? "bg-white text-purple-600 font-semibold shadow-lg"
                    : "glass-card text-white hover:bg-white/15"
                }`}
              >
                Celsius
              </button>
              <button
                onClick={() => dispatch(toggleTemperatureUnit())}
                className={`px-4! py-2! rounded-lg transition-all duration-300 ${
                  temperatureUnit === "fahrenheit"
                    ? "bg-white text-purple-600 font-semibold shadow-lg"
                    : "glass-card text-white hover:bg-white/15"
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
