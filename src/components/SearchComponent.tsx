import { useWeatherData } from "@/context/WeatherContext";
import { useState } from "react";
import SearchLoading from "./SearchLoading";

const SearchComponent = () => {
  const {
    fetchLocation,
    cityArray,
    setLatitude,
    setLongitude,
    setLocation,
    setCountry,
  } = useWeatherData();

  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    fetchLocation(search);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setLoading(true)
    if (value.length > 2) {
      fetchLocation(value);
      setShowList(true);
      setLoading(false);
    } else {
      setShowList(false);
    }
  };

  const handleSelect = (city: string, country: string) => {
    setSearch(city);
    setShowList(false);
    const selectedValue = cityArray.find(
      (c) =>
        c.name.toLowerCase() === city.toLowerCase() &&
        c.country.toLowerCase() === country.toLowerCase()
    );
    if (selectedValue) {
      setLatitude(selectedValue.latitude);
      setLongitude(selectedValue.longitude);
      setLocation(selectedValue.name);
      setCountry(selectedValue.country);
      console.log(selectedValue);
    }
  };
  return (
    <section id="SearchComponent" className="w-full">
      <div className="mt-10">
        <h1 className="text-4xl text-center px-2">
          How's the sky looking today?
        </h1>
        <div className="flex flex-col md:flex-row px-3 gap-3 justify-center mt-15 pb-2">
          <div className="relative flex gap-3 bg-[#312f4b] rounded-md outline-[#fff] focus-within:outline-2">
            <img
              src="/images/icon-search.svg"
              alt="Search Icon"
              className="pl-4"
            />
            <input
              list="cities"
              type="text"
              value={search}
              onChange={handleInput}
              placeholder="Search for a place..."
              className="border-none outline-none h-[40px] w-[300px]"
            />
            <div className="absolute left-0 top-12 w-full bg-[#312f4b] rounded-md">
              {loading && cityArray.length === 0 && <SearchLoading />}
              {showList && (
                <ul className="p-1">
                  {cityArray.map((city, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(city.name, city.country)}
                      className="w-full hover:bg-[#4a476f] my-1 rounded-md py-2 px-3"
                    >
                      <div className="flex justify-between">
                        <p>{city.name}</p>
                        <p>{city.country}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <button
              onClick={handleSearch}
              className="border-none focus:outline-2 focus:outline-offset-3 outline-[#2d1c9c] bg-[#4455da] h-[40px] w-full lg:w-auto rounded-md px-4 cursor-pointer hover:bg-[#2d1c9c]"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchComponent;
