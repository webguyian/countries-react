const CountryCard = ({ country }) => {
  return (
    <button
      className="appearance-none w-[250px] bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700"
      type="button"
    >
      <div
        className="border-b border-gray-300 h-40 bg-no-repeat bg-cover bg-center dark:border-gray-700"
        style={{ backgroundImage: `url(${country.flags?.svg})` }}
      ></div>
      <div className="p-5 text-left">
        <h2 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
          {country.name?.common}
        </h2>
        <dl className="text-sm grid grid-cols-2">
          <dt className="font-bold">Capital:</dt>
          <dd>{country.capital?.[0]}</dd>
          <dt className="font-bold">Region:</dt>
          <dd>{country.region}</dd>
          <dt className="font-bold">Population:</dt>
          <dd>{country.population?.toLocaleString('en-us')}</dd>
        </dl>
      </div>
    </button>
  );
};

export default CountryCard;
