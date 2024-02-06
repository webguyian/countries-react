import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { API_BASE_URL } from '../const';

const useCountry = () => {
  const data = useLoaderData();
  const [borderCountries, setBorderCountries] = useState(null);
  const country = data?.[0];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${API_BASE_URL}/alpha?codes=${country.borders.join()}&fields=name,cca3`
      ).then((res) => res.json());

      if (response) {
        setBorderCountries(
          response.reduce((acc, cur) => {
            acc[cur.cca3] = cur.name.common;
            return acc;
          }, {})
        );
      }
    };

    window.scrollTo({ top: 0 });

    if (country?.borders) {
      fetchData();
    }
  }, [country]);

  return {
    ...country,
    borderCountries
  };
};

export default useCountry;
