/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Form, useSubmit } from 'react-router-dom';
import { ROUTES } from '../const';

const SearchFilter = () => {
  const submit = useSubmit();
  const [selectedRegion, setSelectedRegion] = useState();
  const [expanded, setExpanded] = useState(false);
  const dropdownRef = useRef();
  const dropdownClass = expanded ? 'absolute' : 'hidden';
  const handleClickOutsideCallback = useCallback(handleClickOutside, []);
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const resetParams = () => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');

    if (!search) {
      params.delete('search');
    }

    params.delete('region');

    return params;
  };

  const handleSelect = (event) => {
    const value = event.target.textContent;
    const params = resetParams();
    params.append('region', value);
    setSelectedRegion(value);
    toggleDropdown();
    submit(params);
  };

  const handleReset = () => {
    submit(resetParams());
    setSelectedRegion();
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
    <div className="flex justify-between mb-8">
      <Form className="w-72" method="GET" action={ROUTES.home}>
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
            className="block w-full py-3 ps-12 pe-4 text-sm text-gray-900 shadow rounded bg-white dark:bg-gray-700 focus:ring-2 focus:outline-none focus:ring-blue-200 dark:placeholder-gray-400 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="search"
            placeholder="Search for a country..."
          />
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
                onClick={handleReset}
              >
                Clear selected region
              </button>
            )}
            {regions.map((region) => (
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
