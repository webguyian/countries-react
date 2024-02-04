import CountryCard from './CountryCard';
import SkeletonCard from './SkeletonCard';
import useCountries from '../hooks/use-countries';

const Countries = () => {
  const { countries, isLoading, onLoadMore } = useCountries();
  const cards = Array.from(Array(8).keys());

  if (isLoading) {
    return (
      <div className="grid grid-cols-fluid justify-items-center gap-10">
        {cards.map((card) => (
          <SkeletonCard key={card} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-fluid justify-items-center gap-10 mb-8">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
      <button
        type="button"
        className="py-2.5 px-8 me-2 mb-2 text-base font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={onLoadMore}
      >
        Load more
      </button>
    </div>
  );
};

export default Countries;
