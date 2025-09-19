import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWeatherData } from "@/context/WeatherContext";
import { cn } from "@/lib/utils";
// import { useEffect } from "react";

const Navbar = () => {
  const {
    windSpeedUnit,
    setWindSpeedUnit,
    precipitationUnit,
    setPrecipitationUnit,
    temperatureUnit,
    setTemperatureUnit,
    // fetchWeatherData,
    // weatherData,
  } = useWeatherData();

  const switchToDefault = () => {
    setWindSpeedUnit("mph");
    setPrecipitationUnit("inch");
    setTemperatureUnit("fahrenheit");
  };

  return (
    <nav id="Navbar" className="mx-auto pt-[24px] md:px-10">
      <div className="w-full flex gap-2 justify-between items-center">
        <div>
          <img src="/images/logo.svg" alt="Weather App Logo" />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex cursor-pointer relative items-center bg-[#312f4b] w-[90px] md:w-[100px] h-[35px] rounded-md text-center focus:outline-2 outline-[#fff]">
                <span className="px-2">
                  <img
                    src="/images/icon-units.svg"
                    alt="Units Icon"
                  />
                </span>
                <p className="mr-1">Units</p>
                <span>
                  <img
                    src="/images/icon-dropdown.svg"
                    alt="Dropdown icon"
                  />
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#312f4b] rounded-md p-2 text-[#fff] border-0 mr-19 w-[200px]">
              <button
                onClick={switchToDefault}
                className="my-2 cursor-pointer focus:outline-1 outline-[#fff] h-[30px] w-full text-left px-2 rounded-sm hover:bg-[#4a476f]"
              >
                Switch to Imperial
              </button>

              <DropdownMenuGroup>
                <DropdownMenuItem disabled>Temperature</DropdownMenuItem>
                <DropdownMenuCheckboxItem
                  checked={temperatureUnit === "celsius"}
                  onCheckedChange={() => setTemperatureUnit("celsius")}
                  className={cn(
                    "px-2 mb-1",
                    "hover:bg-[#4a476f]",
                    "data-[state=checked]:bg-[#4a476f] data-[state=checked]:text-white",
                    "active:bg-[#4a476f]"
                  )}
                >
                  Celsius (°C)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={temperatureUnit === "fahrenheit"}
                  onCheckedChange={() => setTemperatureUnit("fahrenheit")}
                  className={cn(
                    "px-2 mb-1",
                    "hover:bg-[#4a476f]",
                    "data-[state=checked]:bg-[#4a476f] data-[state=checked]:text-white",
                    "active:bg-[#4a476f]"
                  )}
                >
                  Fahrenheit (°F)
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
              <hr className="h-0 border-t-[1px] border-[#d5d4d9]" />
              <DropdownMenuGroup>
                <DropdownMenuItem disabled>Wind Speed</DropdownMenuItem>
                <DropdownMenuCheckboxItem
                  checked={windSpeedUnit === "kmh"}
                  onCheckedChange={() => setWindSpeedUnit("kmh")}
                  className={cn(
                    "px-2 mb-1",
                    "hover:bg-[#4a476f]",
                    "data-[state=checked]:bg-[#4a476f] data-[state=checked]:text-white",
                    "active:bg-[#4a476f]"
                  )}
                >
                  km/h
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={windSpeedUnit === "mph"}
                  onCheckedChange={() => setWindSpeedUnit("mph")}
                  className={cn(
                    "px-2 mb-1",
                    "hover:bg-[#4a476f]",
                    "data-[state=checked]:bg-[#4a476f] data-[state=checked]:text-white",
                    "active:bg-[#4a476f]"
                  )}
                >
                  mph
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
              <hr />
              <DropdownMenuGroup>
                <DropdownMenuItem disabled>Precipitation</DropdownMenuItem>
                <DropdownMenuCheckboxItem
                  checked={precipitationUnit === "mm"}
                  onCheckedChange={() => setPrecipitationUnit("mm")}
                  className={cn(
                    "px-2 mb-1",
                    "hover:bg-[#4a476f]",
                    "data-[state=checked]:bg-[#4a476f] data-[state=checked]:text-white",
                    "active:bg-[#4a476f]"
                  )}
                >
                  Millimeters (mm)
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={precipitationUnit === "inch"}
                  onCheckedChange={() => setPrecipitationUnit("inch")}
                  className={cn(
                    "px-2 mb-1",
                    "hover:bg-[#4a476f]",
                    "data-[state=checked]:bg-[#4a476f] data-[state=checked]:text-white",
                    "active:bg-[#4a476f]"
                  )}
                >
                  Inches (in)
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
