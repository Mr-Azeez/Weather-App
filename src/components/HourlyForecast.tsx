import { useWeatherData } from "@/context/WeatherContext";
import { Select, SelectTrigger } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectValue } from "./ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { getWeatherCode } from "./getWeatherCode";
import { weatherIcons } from "./weatherIcons";

const HourlyForecast = () => {
  const { groupedDailyData } = useWeatherData();
  const [selectedDay, setSelectedDay] = useState<string>(
    groupedDailyData[0]?.dayString ?? ""
  );
  const selectedDayObj = groupedDailyData.find(
    (d) => d.dayString === selectedDay
  );
  const tempsForDay: number[] =
    selectedDayObj?.temps || groupedDailyData[0]?.temps || [];

  const codesForDay: number[] =
    selectedDayObj?.weaCodes || groupedDailyData[0]?.weaCodes || [];
  const hourlyTemps = tempsForDay.map((temps, index) => ({
    time: `${index}:00`,
    temperature: temps,
    code: codesForDay[index] ?? null,
  }));

  return (
    <section id="Hourly Forecast">
      <ScrollArea className="bg-[#312f4b] lg:h-163 md:h-175 rounded-md p-4 mt-10 mb-10">
        <div className="">
          <div>
            <div className="flex justify-between">
              <div>
                <h2>Hourly Forecast</h2>
              </div>
              <div className="bg-[#4a476f] px-2 py-1 rounded-md">
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger className="px-2 py-1 border-none outline-none flex gap-2">
                    <SelectValue placeholder={groupedDailyData[0]?.dayString} />
                    <img src="/images/icon-dropdown.svg" alt="Drop down Icon" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#312f4b] text-white border-none w-[250px] mr-10 mt-4">
                    {groupedDailyData.map((dailyData, index) => (
                      <SelectItem
                        key={index}
                        value={dailyData.dayString}
                        className={cn(
                          "px-2 mb-1",
                          "hover:bg-[#4a476f]",
                          "data-[state=checked]:bg-[#4a476f] data-[state=checked]:text-white",
                          "active:bg-[#4a476f]"
                        )}
                      >
                        {dailyData.dayString}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {hourlyTemps.map((dailyTemp, index) => (
              <div
                key={index}
                className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-3 px-1"
              >
                <div className="flex items-center">
                  <img
                    src={weatherIcons[getWeatherCode(dailyTemp.code)]}
                    alt=""
                    className="size-[30px]"
                  />
                  <div>{dailyTemp.time}</div>
                </div>

                <div>{dailyTemp.temperature}°</div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </section>
  );
};

export default HourlyForecast;
