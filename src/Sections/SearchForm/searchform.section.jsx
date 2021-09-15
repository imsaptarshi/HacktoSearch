import React, { useEffect } from "react";
import TagInput from "../../Components/Input/taginput.component";
import { Flex } from "@chakra-ui/react";
import { Tag, Code } from "react-feather";
import { useSearch } from "../../Providers/search.provider";
import get from "../../Helpers/getRepositories";

function SearchForm() {
  const { query, setQuery, results, setResults, setIsSearching, setIsError } =
    useSearch();

  useEffect(() => {
    if (query.label.length === 0 && query.language.length === 0) {
      setResults({
        data: [],
        label: [],
        language: [],
      });
      setIsSearching(false);
    }
  }, [query.label.length, query.language.length, setIsSearching, setResults]);

  return (
    <Flex
      id="search"
      onKeyPress={e => {
        if (
          e.key === "Enter" &&
          (query.label.length > 0 || query.language.length > 0)
        ) {
          setIsSearching(true);
          setResults({
            ...results,
            data: [],
          });
          const data = get(
            query.label.length > 0 ? query.label : ["hacktoberfest"],
            query.language.slice(0, 1),
            10,
            "relevance"
          );
          setIsError(false);
          data
            .then(res => {
              window.location.href = "#search";
              setResults({
                data: res,
                label: query.label.slice(0, query.label.length),
                language: query.language.slice(0, query.language.length),
              });
            })
            .catch(err => setIsError(true));
        }
      }}
      w="full"
      experimental_spaceX={{ base: "0", md: "10" }}
      experimental_spaceY={{ base: "4", md: "0" }}
      px={{ base: "0", md: "6", lg: "20", xl: "24" }}
      direction={{ base: "column", md: "row" }}
    >
      <TagInput
        placeholder="Label"
        autofillSuggestions={[
          { name: "hacktoberfest" },
          { name: "hacktoberfest2021" },
          { name: "good-first-issue" },
          { name: "beginners" },
          { name: "first-timers-only" },
        ]}
        icon={<Tag />}
        handleChange={tags => {
          setQuery({
            ...query,
            label: tags,
          });
          console.log(query);
        }}
      />
      <TagInput
        placeholder="Language"
        autofillSuggestions={[
          { name: "Javascript" },
          { name: "Python" },
          { name: "C++" },
          { name: "Typescript" },
          { name: "Java" },
        ]}
        icon={<Code />}
        handleChange={tags => {
          setQuery({
            ...query,
            language: tags,
          });
        }}
      />
    </Flex>
  );
}

export default SearchForm;
