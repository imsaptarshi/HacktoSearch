import TagInput from "../../Components/Input/taginput.component";
import { Flex } from "@chakra-ui/react";
import { Tag, Code } from "react-feather";

function SearchForm() {
  return (
    <Flex
      w="full"
      experimental_spaceX={{ base: "0", md: "10" }}
      experimental_spaceY={{ base: "4", md: "0" }}
      px={{ base: "0", md: "6", lg: "20", xl: "24" }}
      direction={{ base: "column", md: "row" }}
    >
      <TagInput placeholder="Label" icon={<Tag />} />
      <TagInput placeholder="Language" icon={<Code />} />
    </Flex>
  );
}

export default SearchForm;
