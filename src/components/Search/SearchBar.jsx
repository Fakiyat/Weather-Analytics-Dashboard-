import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { searchCities } from "../../services/weatherApi";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../../redux/slices/weatherSlice";
import { addFavorite } from "../../redux/slices/favouitesSlice";

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        try {
          const results = await searchCities(query);
          setSuggestions(results);
        } catch (error) {
          console.error("Search error:", error);
          setSuggestions([]);
        }
        setLoading(false);
      } else {
        setSuggestions([]);
      }
    }, 300); // Debounce for 300ms

    return () => clearTimeout(searchTimer);
  }, [query]);

  const handleSelectCity = (cityName) => {
    dispatch(fetchWeather(cityName));
    dispatch(addFavorite(cityName));
    setQuery("");
    setSuggestions([]);
    if (onClose) onClose();
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2! glass-card p-3! rounded-xl">
        <Search className="w-5 h-5 text-white/70" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
          autoFocus
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setSuggestions([]);
            }}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {(suggestions.length > 0 || loading) && (
        <div className="absolute top-full! left-0 right-0! mt-2! bg-white rounded-xl shadow-2xl overflow-hidden z-9999 backdrop-blur-sm">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : (
            <ul>
              {suggestions.map((city, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSelectCity(city.name)}
                    className="w-full text-left px-4! py-3! hover:bg-blue-50 transition-colors flex items-center justify-between group"
                  >
                    <span className="font-medium text-gray-800 group-hover:text-blue-600">
                      {city.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {city.country}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
