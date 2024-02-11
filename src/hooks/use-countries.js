import { useCallback, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';

const useCountries = () => {
  const [page, setPage] = useState(12);
  const data = useLoaderData();
  const countries = data
    ?.slice(0)
    .sort((a, b) => a.name.common.localeCompare(b.name.common));
  const onLoadMore = () => {
    setPage((page) => page * 2);
  };
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const region = searchParams.get('region');
  const filterByCountryFn = (country) =>
    search
      ? country.name.common.toLowerCase().startsWith(search.toLowerCase())
      : country;
  const filterByRegionFn = (country) =>
    region ? country.region === region : country;
  const filterByCountry = useCallback(filterByCountryFn, [search]);
  const filterByRegion = useCallback(filterByRegionFn, [region]);
  const filteredCountries = countries
    ?.filter(filterByRegion)
    ?.filter(filterByCountry);
  const visibleCountries = filteredCountries?.slice(0, page);
  const countryCount = filteredCountries?.length ?? 0;
  const showMore = countryCount > visibleCountries?.length;

  return {
    countries: visibleCountries,
    countryCount,
    onLoadMore,
    showMore
  };
};

export default useCountries;
