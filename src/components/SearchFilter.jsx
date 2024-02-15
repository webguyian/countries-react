/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef, useState } from 'react';
import { Form, useSearchParams } from 'react-router-dom';
import { REGIONS, REGION_KEY, ROUTES, SEARCH_KEY } from '../const';

const SearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState();
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef();
  const dropdownClass = expanded ? 'absolute' : 'hidden';
  const search = searchParams.get(SEARCH_KEY);
  const handleClickOutsideCallback = useCallback(handleClickOutside, []);
  const handleSelect = (event) => {
    const region = event.target.textContent;
    const params = new URLSearchParams();

    if (search) {
      params.set(SEARCH_KEY, search);
    }

    params.set(REGION_KEY, region);

    setSearchParams(params);
    setSelectedRegion(region);
    toggleDropdown();
  };
  const handleResetRegion = () => {
    const params = new URLSearchParams();

    params.delete(REGION_KEY);

    if (searchParams.has(SEARCH_KEY)) {
      params.append(SEARCH_KEY, search);
    }

    setSearchParams(params);
    setSelectedRegion();
  };
  const handleResetSearch = () => {
    searchParams.delete(SEARCH_KEY);

    setSearchParams(searchParams);
  };

  function handleClickOutside(event) {
    const dropdown = dropdownRef.current;
    if (dropdown && !dropdown.contains(event.target)) {
      setExpanded(false);
      document.removeEventListener('click', handleClickOutsideCallback);
    }
  }

  const toggleDropdown = () => {
    setExpanded(!expanded);

    if (!expanded) {
      document.addEventListener('click', handleClickOutsideCallback);
    } else {
      document.removeEventListener('click', handleClickOutsideCallback);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between mb-8">
      <Form
        className="w-full md:max-w-72 mb-5 md:mb-0"
        method="GET"
        action={ROUTES.home}
      >
        <label
          htmlFor="search-filter"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search-filter"
            className="peer block w-full py-3 ps-12 pe-8 text-sm text-gray-900 shadow rounded bg-white dark:bg-gray-700 focus:ring-2 focus:outline-none focus:ring-blue-200 dark:placeholder-gray-400 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="search"
            placeholder="Search for a country..."
            required
          />
          <button
            className="absolute inset-y-0 end-4 peer-invalid:hidden"
            title="Clear search"
            type="reset"
            onClick={handleResetSearch}
          >
            <svg
              className="w-4 h-4 text-gray-300 hover:text-gray-400 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
              />
            </svg>
          </button>
        </div>
        {selectedRegion && (
          <input type="hidden" name="region" value={selectedRegion} />
        )}
      </Form>
      <div className="relative min-w-52" ref={dropdownRef}>
        <button
          id="dropdown-trigger"
          className="inline-flex justify-between items-center w-full px-5 py-3 bg-white hover:bg-neutral-100 shadow focus:ring-2 focus:outline-none focus:ring-blue-200 rounded text-sm text-center dark:text-gray-300 dark:bg-gray-700"
          type="button"
          onClick={toggleDropdown}
        >
          {selectedRegion ? `Filter By: ${selectedRegion}` : `Filter By Region`}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdownHover"
          className={`${dropdownClass} top-12 z-10 w-full bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-300"
            aria-labelledby="dropdown-trigger"
          >
            {selectedRegion && (
              <button
                type="button"
                className="text-red-600 font-bold w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={handleResetRegion}
              >
                Clear selected region
              </button>
            )}
            {REGIONS.map((region) => (
              <li key={region}>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleSelect}
                >
                  {region}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
