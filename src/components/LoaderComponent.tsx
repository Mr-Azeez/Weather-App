import WeatherVariable from "./WeatherVariable";
import { Select, SelectTrigger } from "@radix-ui/react-select";
import { SelectValue } from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";

const LoaderComponent = () => {
  return (
    <section id="Loader" className="grid grid-cols-1 md:grid-cols-3 md:mx-10">
      <div className="col-span-2">
        <section id="Hero-loader" className="px-4 mt-10">
          <div className="rounded-md w-[100%] max-w-full mx-auto h-[150px] md:h-[250px] flex flex-col justify-center items-center md:px-10 text-center bg-[#312f4b]">
            <div className="flex items-center justify-center space-x-2">
              <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
            </div>
            <div>
              <p>Loading...</p>
            </div>
          </div>
        </section>
        <section id="WeatherVariables-loader" className="px-5">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mx-auto my-8 pb-8">
            <WeatherVariable title="Feels Like" desc={null} unit="—" />
            <WeatherVariable title="Humidity" desc={null} unit="—" />
            <WeatherVariable title="Wind" desc={null} unit="—" />
            <WeatherVariable title="Precipitation" desc={null} unit="—" />
          </div>
        </section>
        <section id="DailyForecast-loader">
          <div className="px-5 mb-2">
            <h2 className="text-[18px] my-2">Daily forecast</h2>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
              <div className="h-[150px] w-[110px] bg-[#312f4b] rounded-md"></div>
              <div className="h-[150px] w-[110px] bg-[#312f4b] rounded-md"></div>
              <div className="h-[150px] w-[110px] bg-[#312f4b] rounded-md"></div>
              <div className="h-[150px] w-[110px] bg-[#312f4b] rounded-md"></div>
              <div className="h-[150px] w-[110px] bg-[#312f4b] rounded-md"></div>
              <div className="h-[150px] w-[110px] bg-[#312f4b] rounded-md"></div>
              <div className="h-[150px] w-[110px] bg-[#312f4b] rounded-md"></div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <section id="HourlyForecast-loader">
          <ScrollArea className="bg-[#312f4b] h-152 rounded-md p-4 mt-10 mb-10">
            <div className="">
              <div>
                <div className="flex justify-between">
                  <div>
                    <h2>Hourly Forecast</h2>
                  </div>
                  <div className="bg-[#4a476f] px-2 py-1 rounded-md">
                    <Select>
                      <SelectTrigger className="px-2 py-1 border-none outline-none flex gap-2">
                        <SelectValue placeholder="—" />
                        <img
                          src="/images/icon-dropdown.svg"
                          alt="Drop down Icon"
                        />
                      </SelectTrigger>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
                <div className="flex justify-between w-full bg-[#4a476f] my-3 rounded-md py-7 px-1"></div>
              </div>
            </div>
          </ScrollArea>
        </section>
      </div>
    </section>
  );
};

export default LoaderComponent;
