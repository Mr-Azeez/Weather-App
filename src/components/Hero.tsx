import { useWeatherData } from "@/context/WeatherContext";
import { getWeatherCode } from "./getWeatherCode";
import { weatherIcons } from "./weatherIcons";
const Hero = () => {
  const { weatherData, country, location } = useWeatherData();

  const currentTemperature = Math.trunc(
    weatherData?.currentObj?.temperature_2m ?? 68
  );
  const code = weatherData?.currentObj?.weather_code;
  const condition = getWeatherCode(code);
  const icon = weatherIcons[condition];

  return (
    <section id="Hero" className="px-4">
      <div className="hero-container bg-cover bg-center bg-no-repeat mt-10 rounded-md w-[100%] max-w-full mx-auto h-[150px] md:h-[250px] flex flex-col md:flex-row justify-between items-center md:px-10 text-center">
        <div className="mt-5">
          <h2 className="capitalize text-3xl">
            {location}, {country}
          </h2>
        </div>
        <div>
          <h2 className="text-6xl italic flex items-center">
            <img
              src={icon}
              alt={condition}
              className="size-[120px]"
            />
            {currentTemperature}°
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Hero;
