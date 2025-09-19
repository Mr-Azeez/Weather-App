import { useWeatherData } from "@/context/WeatherContext";
import { weatherIcons } from "./weatherIcons";
import { getWeatherCode } from "./getWeatherCode";
interface DayCardProps {
  day: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
}
export const DayCard = ({ day, minTemp, maxTemp, condition }: DayCardProps) => {
  const icon = weatherIcons[condition];
  return (
    <div className="bg-[#312f4b] p-2 rounded-md h-[150px] w-[100px]">
      <div className="text-center">{day}</div>
      <div>
        <img src={icon} alt={condition} />
      </div>
      <div className="flex justify-between">
        <span>{maxTemp}°</span>
        <span>{minTemp}°</span>
      </div>
    </div>
  );
};

const DailyForecast = () => {
  const { dailyMinMax } = useWeatherData();

  return (
    <section id="DailyForecast">
      <div className="px-5 mb-2">
        <h2 className="text-[18px] my-2">Daily forecast</h2>
        <div className="flex flex-row items-center flex-wrap gap-2">
          {dailyMinMax.map((day, index) => (
            <DayCard
              key={index}
              day={day.day}
              minTemp={day.min}
              maxTemp={day.max}
              condition={getWeatherCode(day.code)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyForecast;
