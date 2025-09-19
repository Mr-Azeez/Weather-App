export const getWeatherCode = (code: number): string => {
  if (code === 0) return "sunny";
  if ([1, 2].includes(code)) return "partlycloudy";
  if (code === 3) return "overcast";
  if ([45, 48].includes(code)) return "fog";
  if ([51, 53, 55].includes(code)) return "drizzle";
  if ([61, 63, 65].includes(code)) return "rain";
  if ([71, 73, 75, 77].includes(code)) return "snow";
  if ([80, 81, 82, 95, 96, 99].includes(code)) return "storm";
  return "unknown";
};
