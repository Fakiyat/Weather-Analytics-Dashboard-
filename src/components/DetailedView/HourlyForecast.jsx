import React from "react";
import { useSelector } from "react-redux";
import {
  formatTemperature,
  formatTime,
  getWeatherIcon,
} from "../../utils/helper";

const HourlyForecast = ({ data }) => {
  const { temperatureUnit } = useSelector((state) => state.settings);

  if (!data || data.length === 0) return null;

  return (
    <div className="overflow-x-auto pb-2!">
      <div className="flex space-x-4! min-w-max">
        {data.map((hour, index) => {
          const weatherIcon = getWeatherIcon(hour.weather[0].id);
          const time = formatTime(hour.dt);

          return (
            <div
              key={index}
              className="bg-white/10 rounded-xl p-4! text-center min-w-25 hover:bg-white/20 transition-all"
            >
              <p className="text-white/70 text-sm mb-2!">{time}</p>
              <div className="text-3xl my-2!">{weatherIcon}</div>
              <p className="text-white font-semibold">
                {formatTemperature(hour.main.temp, temperatureUnit)}
              </p>
              <p className="text-white/60 text-xs mt-1!">
                {hour.weather[0].main}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
