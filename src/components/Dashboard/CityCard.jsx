import React from "react";
import { Heart, Droplets, Wind, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/slices/favoritesSlice";
import { setSelectedCity } from "../../redux/slices/weatherSlice";
import { formatTemperature, getWeatherIcon } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const CityCard = ({ weatherData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cities: favoriteCities } = useSelector((state) => state.favorites);
  const { temperatureUnit } = useSelector((state) => state.settings);

  if (!weatherData) return null;

  const isFavorite = favoriteCities.includes(weatherData.name);
  const weatherIcon = getWeatherIcon(weatherData.weather[0].id);

  const handleCardClick = () => {
    dispatch(setSelectedCity(weatherData.name));
    navigate(`/city/${weatherData.name}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(weatherData.name));
  };

  return (
    <div
      onClick={handleCardClick}
      className="glass rounded-2xl p-6 card-hover cursor-pointer fade-in"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white">{weatherData.name}</h3>
          <p className="text-white/70 text-sm">{weatherData.sys.country}</p>
        </div>
        <button
          onClick={handleFavoriteClick}
          className="p-2 rounded-lg hover:bg-white/10 transition-all"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-red-400 text-red-400" : "text-white/50"
            }`}
          />
        </button>
      </div>

      {/* Temperature & Icon */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-5xl font-bold text-white">
            {formatTemperature(weatherData.main.temp, temperatureUnit)}
          </div>
          <p className="text-white/70 capitalize mt-1">
            {weatherData.weather[0].description}
          </p>
        </div>
        <div className="text-6xl weather-icon">{weatherIcon}</div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/10 rounded-lg p-3 text-center">
          <Droplets className="w-4 h-4 text-white/70 mx-auto mb-1" />
          <p className="text-xs text-white/70">Humidity</p>
          <p className="text-sm font-semibold text-white">
            {weatherData.main.humidity}%
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-3 text-center">
          <Wind className="w-4 h-4 text-white/70 mx-auto mb-1" />
          <p className="text-xs text-white/70">Wind</p>
          <p className="text-sm font-semibold text-white">
            {Math.round(weatherData.wind.speed)} m/s
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-3 text-center">
          <Eye className="w-4 h-4 text-white/70 mx-auto mb-1" />
          <p className="text-xs text-white/70">Visibility</p>
          <p className="text-sm font-semibold text-white">
            {(weatherData.visibility / 1000).toFixed(1)} km
          </p>
        </div>
      </div>

      {/* Feels Like */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-white/70 text-sm">
          Feels like{" "}
          {formatTemperature(weatherData.main.feels_like, temperatureUnit)}
        </p>
      </div>
    </div>
  );
};

export default CityCard;
