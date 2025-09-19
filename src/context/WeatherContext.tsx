import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchWeatherApi } from "openmeteo";

interface IntervalWeather {
  time: Date[];
  temperature_2m?: number[] | Float32Array | null;
  temperature_2m_max?: number[] | Float32Array | null;
  temperature_2m_min?: number[] | Float32Array | null;
  weather_code: number;
}

interface CurrentWeather {
  temperature_2m: number | null;
  relative_humidity_2m: number | null;
  precipitation: number | null;
  wind_speed_10m: number | null;
  weather_code: number;
}

interface WeatherDataType {
  hourlyObj: IntervalWeather;
  dailyObj: IntervalWeather;
  currentObj: CurrentWeather;
}

interface WeatherContextType {
  weatherData: WeatherDataType;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataType>>;
  fetchWeatherData: () => Promise<void>;
  windSpeedUnit: string;
  setWindSpeedUnit: React.Dispatch<React.SetStateAction<string>>;
  precipitationUnit: string;
  setPrecipitationUnit: React.Dispatch<React.SetStateAction<string>>;
  temperatureUnit: string;
  setTemperatureUnit: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  country: string | null;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  latitude: number | null;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  longitude: number | null;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
  fetchLocation: (city: string) => Promise<void>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  cityArray: any[];
  setCityArray: React.Dispatch<React.SetStateAction<any[]>>;
  dailyMinMax: any[];
  setDailyMinMax: React.Dispatch<React.SetStateAction<any[]>>;
  groupedDailyData: any[];
  setGroupedDailyData: React.Dispatch<React.SetStateAction<any[]>>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [location, setLocation] = useState<string>("berlin");
  const [country, setCountry] = useState<string>("germany");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [windSpeedUnit, setWindSpeedUnit] = useState<string>("kmh");
  const [precipitationUnit, setPrecipitationUnit] = useState<string>("mm");
  const [temperatureUnit, setTemperatureUnit] = useState<string>("celsius");
  const [latitude, setLatitude] = useState<number>(52.52);
  const [longitude, setLongitude] = useState<number>(13.41);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cityArray, setCityArray] = useState<any[]>([]);
  const [dailyMinMax, setDailyMinMax] = useState<any[]>([]);
  const [groupedDailyData, setGroupedDailyData] = useState<any[]>([]);

  const fetchLocation = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const response = data.results;

        setCityArray(response);

        setLoading(false);
      } else {
        throw new Error("City not found");
      }
    } catch (error: any) {
      console.error("Failed to fetch coordinates:", error);
      setError(
        "Location Error: " + (error.message || "Unable to fetch city data.")
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (): Promise<void> => {
    setError(null);
    setLoading(true);

    try {
      const params = {
        latitude: latitude ?? 52.52,
        longitude: longitude ?? 13.41,
        daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
        hourly: ["temperature_2m", "weather_code"],
        current: [
          "weather_code",
          "temperature_2m",
          "precipitation",
          "relative_humidity_2m",
          "wind_speed_10m",
        ],
        wind_speed_unit: windSpeedUnit,
        precipitation_unit: precipitationUnit,
        temperature_unit: temperatureUnit,
      };
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);

      // Process first location. Add a for-loop for multiple locations or weather models
      const response = responses[0];

      const utcOffsetSeconds = response.utcOffsetSeconds();

      const hourlyData = response.hourly()!;
      const dailyData = response.daily()!;
      const currentData = response.current()!;
      // const variables = (i: number) => currentData.variables(i)?.value();

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const newData = {
        hourlyObj: {
          time: [
            ...Array(
              (Number(hourlyData.timeEnd()) - Number(hourlyData.time())) /
                hourlyData.interval()
            ),
          ].map(
            (_, i) =>
              new Date(
                (Number(hourlyData.time()) +
                  i * hourlyData.interval() +
                  utcOffsetSeconds) *
                  1000
              )
          ),
          temperature_2m: hourlyData.variables(0)!.valuesArray(),
          weather_code: hourlyData.variables(1)!.valuesArray(),
        },
        dailyObj: {
          time: [
            ...Array(
              (Number(dailyData.timeEnd()) - Number(dailyData.time())) /
                dailyData.interval()
            ),
          ].map(
            (_, i) =>
              new Date(
                (Number(dailyData.time()) +
                  i * dailyData.interval() +
                  utcOffsetSeconds) *
                  1000
              )
          ),
          weather_code: dailyData.variables(0)!.valuesArray(),
          temperature_2m_max: dailyData.variables(1)!.valuesArray(),
          temperature_2m_min: dailyData.variables(2)!.valuesArray(),
        },
        currentObj: {
          time: new Date(
            (Number(currentData.time()) + utcOffsetSeconds) * 1000
          ),
          weather_code: currentData.variables(0)!.value(),
          temperature_2m: currentData.variables(1)!.value(),
          precipitation: currentData.variables(2)!.value(),
          relative_humidity_2m: currentData.variables(3)!.value(),
          wind_speed_10m: currentData.variables(4)!.value(),
        },
      };

      const time = newData.hourlyObj.time;
      // const dailyTime = newData.dailyObj.time;
      const temperature_2m = newData.hourlyObj.temperature_2m;
      const weatherCode = newData.hourlyObj.weather_code;
      type dailyWeather = {
        dayString: string;
        temps: number[];
        weaCodes: number[];
      };
      const grouped: dailyWeather[] = [];

      if (temperature_2m) {
        for (let i = 0; i < time.length; i++) {
          const dayString = time[i].toLocaleDateString("en-US", {
            weekday: "long",
          });
          const temp = Math.trunc(temperature_2m[i]);
          const weaCode = weatherCode?.[i];

          let dayEntry = grouped.find((entry) => entry.dayString === dayString);
          if (!dayEntry) {
            dayEntry = { dayString, temps: [], weaCodes: [] };
            grouped.push(dayEntry);
          }
          dayEntry.temps.push(temp);
          if (typeof weaCode === "number") {
            dayEntry.weaCodes.push(weaCode);
          }
        }
        // const dailyMinMaxObj = grouped.map((day) => ({
        //   day: day.dayString.substring(0, 3),
        //   min: Math.min(...day.temps),
        //   max: Math.max(...day.temps),
        //   code: day.weaCodes,
        // }));

        if (
          newData.dailyObj.temperature_2m_min &&
          newData.dailyObj.temperature_2m_max &&
          newData.dailyObj.weather_code
        ) {
          const dailyMinMaxObj = newData.dailyObj.time.map(
            (day: Date, i: number) => ({
              day: day.toLocaleDateString("en-US", { weekday: "short" }),
              min: Math.trunc(newData.dailyObj.temperature_2m_min![i]),
              max: Math.trunc(newData.dailyObj.temperature_2m_max![i]),
              code: newData.dailyObj.weather_code![i],
            })
          );
          setDailyMinMax(dailyMinMaxObj);
          setGroupedDailyData(grouped);
        }

        setWeatherData(newData);
      }
    } catch (error: any) {
      console.error("Failed to fetch weather data", error);
      setError(
        "Weather Error: " + (error.message || "Unable to fetch weather data.")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeatherData();
    }
  }, [temperatureUnit, windSpeedUnit, precipitationUnit, latitude, longitude]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
        fetchWeatherData,
        windSpeedUnit,
        setWindSpeedUnit,
        precipitationUnit,
        setPrecipitationUnit,
        temperatureUnit,
        setTemperatureUnit,
        latitude,
        setLatitude,
        longitude,
        setLongitude,
        location,
        setLocation,
        fetchLocation,
        country,
        setCountry,
        loading,
        setLoading,
        error,
        setError,
        cityArray,
        setCityArray,
        dailyMinMax,
        setDailyMinMax,
        groupedDailyData,
        setGroupedDailyData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherData = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherData must be within a WeatherContextProvider");
  }
  return context;
};
