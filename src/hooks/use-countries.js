import { useState } from 'react';
import useSWR from 'swr';

const useCountries = () => {
  const [page, setPage] = useState(12);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const endpoint = 'https://restcountries.com/v3.1/all';
  const { data, isLoading } = useSWR(endpoint, fetcher);
  const countries = data
    ?.slice(0)
    .sort((a, b) => a.name.common.localeCompare(b.name.common));
  const visibleCountries = countries?.slice(0, page);
  const onLoadMore = () => {
    setPage((page) => page * 2);
  };

  return {
    countries: visibleCountries,
    isLoading,
    onLoadMore
  };
};

export default useCountries;
