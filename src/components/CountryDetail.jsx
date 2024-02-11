import { Link } from 'react-router-dom';
import { ROUTES } from '../const';
import useCountry from '../hooks/use-country';
import DescriptionList from './DescriptionList';

const CountryDetail = () => {
  const country = useCountry();
  const buttonClasses =
    'py-2 px-6 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-700';

  return (
    <div>
      <div className="mb-8 flex">
        <Link
          to={ROUTES.home}
          className={`inline-flex items-center shadow ${buttonClasses}`}
        >
          <svg
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          Back
        </Link>
      </div>
      <div className="grid grid-cols-fluid gap-4  items-center">
        <div className="max-w-lg">
          {country.flags?.svg && (
            <img
              className="max-h-80 border dark:border-gray-500"
              alt={country.flags.alt}
              src={country.flags.svg}
            />
          )}
        </div>
        <div className="text-left">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {country.name.common}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <DescriptionList
              items={[
                { key: 'Capital', value: country.capital?.[0] ?? 'N/A' },
                { key: 'Region', value: country.region },
                {
                  key: 'Population',
                  value: country.population?.toLocaleString('en-us')
                }
              ]}
            />
            <DescriptionList
              items={[
                { key: 'Top-Level Domain', value: country.tld?.join(', ') },
                {
                  key: 'Currencies',
                  value: Object.values(country.currencies ?? {})
                    .map((c) => c.name)
                    .join(', ')
                },
                {
                  key: 'Languages',
                  value: Object.values(country.languages ?? {}).join(', ')
                }
              ]}
            />
          </div>
          {country.borderCountries && (
            <dl className="flex flex-col md:flex-row mt-8 text-sm">
              <dt className="font-bold whitespace-nowrap mr-4">
                Border Countries:
              </dt>
              <dd className="flex flex-wrap">
                {Object.keys(country.borderCountries).map((key) => (
                  <Link
                    key={key}
                    to={`/country/${key}`}
                    className={buttonClasses}
                  >
                    {country.borderCountries[key]}
                  </Link>
                ))}
              </dd>
            </dl>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
