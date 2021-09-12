import TagInput from "../../Components/Input/taginput.component";
import { Flex } from "@chakra-ui/react";
import { Tag, Code } from "react-feather";
import { useSearch } from "../../Providers/search.provider";
import get from "../../Helpers/getRepositories";

function SearchForm() {
  const { query, setQuery, setResults, results } = useSearch();

  return (
    <Flex
      onKeyPress={e => {
        if (e.key === "Enter") {
          const data = get(query.label, query.language);
          data.then(res => {
            setResults({
              data: res,
              label: query.label,
              language: query.language,
            });
          });
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
        icon={<Tag />}
        handleChange={tags => {
          setQuery({
            ...query,
            label: tags,
          });
        }}
      />
      <TagInput
        placeholder="Language"
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
