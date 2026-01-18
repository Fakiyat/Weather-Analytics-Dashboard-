import React from "react";
import { useSelector } from "react-redux";
import {
  formatTemperature,
  formatDate,
  getWeatherIcon,
} from "../../utils/helper";

const ForecastCard = ({ data }) => {
  const { temperatureUnit } = useSelector((state) => state.settings);

  if (!data) return null;

  const weatherIcon = getWeatherIcon(data.weather[0].id);
  const date = formatDate(data.dt);

  return (
    <div className="bg-white/10 rounded-xl p-4! text-center hover:bg-white/20 transition-all">
      <p className="text-white/70 text-sm mb-2!">{date}</p>
      <div className="text-4xl my-3!">{weatherIcon}</div>
      <p className="text-white font-semibold text-lg mb-1!">
        {formatTemperature(data.main.temp, temperatureUnit)}
      </p>
      <p className="text-white/70 text-sm capitalize">
        {data.weather[0].description}
      </p>
      <div className="mt-3! pt-3! border-t border-white/10">
        <div className="flex justify-between text-xs text-white/60">
          <span>
            H: {formatTemperature(data.main.temp_max, temperatureUnit)}
          </span>
          <span>
            L: {formatTemperature(data.main.temp_min, temperatureUnit)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
