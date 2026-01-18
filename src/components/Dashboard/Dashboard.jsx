import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../../redux/slices/weatherSlice";
import CityCard from "./CityCard";
import { needsRefresh } from "../../utils/helpers";
import { AUTO_REFRESH_INTERVAL } from "../../utils/constants";
import Loader from "../layout/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentWeather, loading, error } = useSelector(
    (state) => state.weather,
  );
  const { cities: favoriteCities } = useSelector((state) => state.favorites);

  // Fetch weather data for favorite cities
  useEffect(() => {
    favoriteCities.forEach((city) => {
      const cityData = currentWeather[city];

      // Fetch if no data or data is older than 60 seconds
      if (!cityData || needsRefresh(cityData.lastUpdated)) {
        dispatch(fetchWeather(city));
      }
    });
  }, [favoriteCities, dispatch]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      favoriteCities.forEach((city) => {
        dispatch(fetchWeather(city));
      });
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [favoriteCities, dispatch]);

  if (loading && Object.keys(currentWeather).length === 0) {
    return <Loader message="Loading weather data..." />;
  }

  if (error) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-red-400 text-lg">⚠️ {error}</p>
        <p className="text-white/70 mt-2">Please try again later</p>
      </div>
    );
  }

  if (favoriteCities.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <div className="text-6xl mb-4">🌍</div>
        <h2 className="text-2xl font-bold text-white mb-2">No Cities Added</h2>
        <p className="text-white/70">
          Use the search bar above to add your favorite cities!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your Cities</h2>
        <div className="text-white/70 text-sm">
          {Object.keys(currentWeather).length} of {favoriteCities.length} loaded
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteCities.map((city) => {
          const weatherData = currentWeather[city];

          if (!weatherData) {
            return (
              <div key={city} className="glass rounded-2xl p-6">
                <Loader size="small" message={`Loading ${city}...`} />
              </div>
            );
          }

          return <CityCard key={city} weatherData={weatherData} />;
        })}
      </div>

      {/* Last Updated Info */}
      <div className="text-center text-white/50 text-sm">
        Auto-refreshes every 60 seconds
      </div>
    </div>
  );
};

export default Dashboard;
