import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, fetchForecast } from "../../redux/slices/weatherSlice";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Loader from "../layout/Loader";
import ForecastCard from "./ForecastCard";
import HourlyForecast from "./HourlyForecast";
import TemperatureChart from "../Charts/TemperatureChart";
import {
  formatTemperature,
  getWeatherIcon,
  getDailyForecast,
} from "../../utils/helper";

const DetailedView = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentWeather, forecasts, loading } = useSelector(
    (state) => state.weather,
  );
  const { temperatureUnit } = useSelector((state) => state.settings);

  const cityWeather = currentWeather[cityName];
  const cityForecast = forecasts[cityName];

  useEffect(() => {
    if (!cityWeather) {
      dispatch(fetchWeather(cityName));
    }
    if (!cityForecast) {
      dispatch(fetchForecast(cityName));
    }
  }, [cityName, cityWeather, cityForecast, dispatch]);

  if (loading && !cityWeather) {
    return <Loader message={`Loading ${cityName} weather...`} />;
  }

  if (!cityWeather) {
    return (
      <div className="glass rounded-2xl p-8! text-center">
        <p className="text-white text-lg">City data not available</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4! px-6! py-2! bg-white/20 hover:bg-white/30 rounded-lg text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  const dailyForecast = cityForecast ? getDailyForecast(cityForecast.list) : [];
  const hourlyForecast = cityForecast ? cityForecast.list.slice(0, 8) : [];

  return (
    <div className="space-y-6! fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center space-x-2! text-white/70 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Dashboard</span>
      </button>

      {/* Current Weather Hero Section */}
      <div className="glass rounded-2xl p-8!">
        <div className="flex items-start justify-between mb-6!">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2!">
              {cityWeather.name}
            </h1>
            <p className="text-white/70">{cityWeather.sys.country}</p>
          </div>
          <div className="text-7xl weather-icon">
            {getWeatherIcon(cityWeather.weather[0].id)}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-6xl font-bold text-white mb-2!">
              {formatTemperature(cityWeather.main.temp, temperatureUnit)}
            </div>
            <p className="text-xl text-white/70 capitalize">
              {cityWeather.weather[0].description}
            </p>
            <p className="text-white/60 mt-2!">
              Feels like{" "}
              {formatTemperature(cityWeather.main.feels_like, temperatureUnit)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4!">
              <p className="text-white/70 text-sm">High / Low</p>
              <p className="text-white font-semibold text-lg">
                {formatTemperature(cityWeather.main.temp_max, temperatureUnit)}{" "}
                /{" "}
                {formatTemperature(cityWeather.main.temp_min, temperatureUnit)}
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4!">
              <p className="text-white/70 text-sm">Humidity</p>
              <p className="text-white font-semibold text-lg">
                {cityWeather.main.humidity}%
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4!">
              <p className="text-white/70 text-sm">Wind Speed</p>
              <p className="text-white font-semibold text-lg">
                {Math.round(cityWeather.wind.speed)} m/s
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4!">
              <p className="text-white/70 text-sm">Pressure</p>
              <p className="text-white font-semibold text-lg">
                {cityWeather.main.pressure} hPa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      {hourlyForecast.length > 0 && (
        <div className="glass rounded-2xl p-6!">
          <h2 className="text-2xl font-bold text-white mb-4! flex items-center">
            <Clock className="w-6 h-6 mr-2!" />
            Hourly Forecast
          </h2>
          <HourlyForecast data={hourlyForecast} />
        </div>
      )}

      {/* 7-Day Forecast */}
      {dailyForecast.length > 0 && (
        <div className="glass rounded-2xl p-6!">
          <h2 className="text-2xl font-bold text-white mb-4! flex items-center">
            <Calendar className="w-6 h-6 mr-2!" />
            7-Day Forecast
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dailyForecast.map((forecast, index) => (
              <ForecastCard key={index} data={forecast} />
            ))}
          </div>
        </div>
      )}

      {/* Temperature Chart */}
      {cityForecast && (
        <div className="glass rounded-2xl p-6!">
          <h2 className="text-2xl font-bold text-white mb-4!">
            Temperature Trends
          </h2>
          <TemperatureChart data={cityForecast.list.slice(0, 16)} />
        </div>
      )}
    </div>
  );
};

export default DetailedView;
