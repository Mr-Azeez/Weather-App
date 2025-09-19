interface WeatherVariableProps {
  title: string;
  desc: number | null;
  unit: string;
}

const WeatherVariable = ({ title, desc, unit }: WeatherVariableProps) => {
  return (
    <section id="WeatherVariable">
      <div className="bg-[#312f4b] rounded-md h-[100px] px-4 flex flex-col justify-center">
        <p>{title}</p>
        <p className="text-3xl">{desc} {unit}</p>
      </div>
    </section>
  );
};

export default WeatherVariable;
