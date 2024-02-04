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
      <button type="button" onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
};

export default Countries;
