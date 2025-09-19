import { useWeatherData } from "@/context/WeatherContext";
import WeatherVariable from "./WeatherVariable";

const WeatherVariables = () => {
  const { weatherData, precipitationUnit, windSpeedUnit } = useWeatherData();

  const currentTemperature = Math.trunc(
    weatherData?.currentObj?.temperature_2m ?? 64
  );
  const relativeHumidity = Math.trunc(
    weatherData?.currentObj?.relative_humidity_2m ?? 46
  );
  const precipitation = Math.trunc(weatherData?.currentObj?.precipitation ?? 9);
  const windSpeed = Math.trunc(weatherData?.currentObj?.wind_speed_10m ?? 0);
  return (
    <section id="WeatherVariables" className="px-5">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mx-auto my-8 pb-8">
        <WeatherVariable
          title="Feels Like"
          desc={currentTemperature}
          unit="°"
        />
        <WeatherVariable title="Humidity" desc={relativeHumidity} unit="%" />
        <WeatherVariable title="Wind" desc={windSpeed} unit={windSpeedUnit} />
        <WeatherVariable
          title="Precipitation"
          desc={precipitation}
          unit={precipitationUnit}
        />
      </div>
    </section>
  );
};

export default WeatherVariables;
