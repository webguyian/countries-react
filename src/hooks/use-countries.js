import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const useCountries = () => {
  const [page, setPage] = useState(12);
  const data = useLoaderData();
  const countries = data
    ?.slice(0)
    .sort((a, b) => a.name.common.localeCompare(b.name.common));
  const visibleCountries = countries?.slice(0, page);
  const onLoadMore = () => {
    setPage((page) => page * 2);
  };

  return {
    countries: visibleCountries,
    onLoadMore
  };
};

export default useCountries;
