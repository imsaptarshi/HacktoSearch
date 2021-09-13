import React, { useState, createContext, useContext } from "react";

const SearchContext = createContext({
  query: {
    label: [],
    language: [],
  },
  setQuery: () => {},
  results: {
    label: [],
    language: [],
  },
  setResults: () => {},
  isSearching: false,
  setIsSearching: () => {},
  isError: false,
  setIsError: () => {},
});

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState({
    label: [],
    language: [],
  });

  const [results, setResults] = useState({
    data: [],
    label: [],
    language: [],
  });

  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        setResults,
        isSearching,
        setIsSearching,
        isError,
        setIsError,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
