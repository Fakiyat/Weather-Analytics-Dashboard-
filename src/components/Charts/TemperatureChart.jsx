import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { formatTime, celsiusToFahrenheit } from "../../utils/helper";

const TemperatureChart = ({ data }) => {
  const { temperatureUnit } = useSelector((state) => state.settings);

  if (!data || data.length === 0) return null;

  const chartData = data.map((item) => ({
    time: formatTime(item.dt),
    temperature:
      temperatureUnit === "fahrenheit"
        ? Math.round(celsiusToFahrenheit(item.main.temp))
        : Math.round(item.main.temp),
    feelsLike:
      temperatureUnit === "fahrenheit"
        ? Math.round(celsiusToFahrenheit(item.main.feels_like))
        : Math.round(item.main.feels_like),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-lg p-3! shadow-lg">
          <p className="text-gray-800 font-semibold">
            {payload[0].payload.time}
          </p>
          <p className="text-red-500">
            Temp: {payload[0].value}°
            {temperatureUnit === "fahrenheit" ? "F" : "C"}
          </p>
          <p className="text-orange-500">
            Feels: {payload[1].value}°
            {temperatureUnit === "fahrenheit" ? "F" : "C"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis
          dataKey="time"
          stroke="rgba(255,255,255,0.7)"
          style={{ fontSize: "12px" }}
        />
        <YAxis
          stroke="rgba(255,255,255,0.7)"
          style={{ fontSize: "12px" }}
          label={{
            value: `Temperature (°${temperatureUnit === "fahrenheit" ? "F" : "C"})`,
            angle: -90,
            position: "insideLeft",
            style: { fill: "rgba(255,255,255,0.7)" },
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#ff6b6b"
          strokeWidth={3}
          dot={{ fill: "#ff6b6b", r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="feelsLike"
          stroke="#ffa500"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: "#ffa500", r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemperatureChart;
