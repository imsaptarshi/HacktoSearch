import React, { useState, createContext, useContext } from "react";

const SearchContext = createContext({
  query: {
    label: [],
    language: [],
  },
  setQuery: () => {},
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

  return (
    <SearchContext.Provider value={{ query, setQuery, results, setResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
