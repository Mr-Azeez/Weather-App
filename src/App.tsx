// import ApiErrorState from "./components/ApiErrorState";
import DailyForecast from "./components/DailyForecast";
import Hero from "./components/Hero";
import HourlyForecast from "./components/HourlyForecast";
import Navbar from "./components/Navbar";
import SearchComponent from "./components/SearchComponent";
import WeatherVariables from "./components/WeatherVariables";
import ApiErrorState from "./components/ApiErrorState";
import { useWeatherData } from "./context/WeatherContext";
import LoaderComponent from "./components/LoaderComponent";

const App = () => {
  const { error, fetchLocation, fetchWeatherData, location, loading } =
    useWeatherData();
  return (
    <main id="App">
      <Navbar />
      {error ? (
        <ApiErrorState
          message={error}
          onRetry={
            error.startsWith("Location")
              ? () => fetchLocation(location)
              : fetchWeatherData
          }
        />
      ) : (
        <div>
          <SearchComponent />
          {loading ? (
            <LoaderComponent />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 md:mx-10">
              <div className="col-span-2">
                <Hero />
                <WeatherVariables />
                <DailyForecast />
              </div>
              <div>
                <HourlyForecast />
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default App;
