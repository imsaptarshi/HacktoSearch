import {
  Input,
  Text,
  Box,
  Flex,
  useToast,
  Kbd,
  InputRightElement,
  InputGroup,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { X, HelpCircle, Plus } from "react-feather";
import Autosuggest from "react-autosuggest";
import "./taginput.styles.css";

function TagInput({
  icon,
  handleChange,
  placeholder,
  autofillSuggestions,
  ...otherProps
}) {
  const [tags, setTags] = useState([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const toast = useToast();
  const enterToast = "enter-toast";

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const list = autofillSuggestions.filter(
      item => item.name.toLowerCase().slice(0, inputLength) === inputValue
    );
    list.push({ name: inputValue });

    return inputLength === 0 ? [] : list;
  };
  const renderSuggestion = suggestion => (
    <Box color="white">
      <Flex
        mb="2"
        mr="2"
        alignItems="center"
        experimental_spaceX="2"
        justifyContent="space-between"
        bg="brand.secondary"
        rounded="full"
        px="2.5"
        py="1"
        color="white"
        fontSize="xs"
        fontWeight="medium"
      >
        <Flex>
          <Text whiteSpace="nowrap">{suggestion.name}</Text>
        </Flex>
        <Flex
          cursor="pointer"
          transitionDuration="200ms"
          alignItems="center"
          justify="center"
          _hover={{ bg: "#FFCA99" }}
          rounded="full"
          p="0.5"
          onClick={() => {
            setIsActive(true);
            setCurrentQuery("");
            tags.push(suggestion.name);
            setTags(tags);
            handleChange(tags);
          }}
        >
          <Plus size="14px" />
        </Flex>
      </Flex>
    </Box>
  );
  const getSuggestionValue = suggestion => {
    return suggestion.name;
  };
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: placeholder,
    value: currentQuery,
    onChange: e => {
      if (e._reactName === "onChange") {
        setCurrentQuery(e.target.value);
        if (e.target.value.trim() !== "," && e.target.value.endsWith(",")) {
          setCurrentQuery("");
          tags.push(currentQuery.split(" ").join("-"));
          setTags(tags);
          handleChange(tags);
        }
      }
    },
  };

  const TagItem = ({ children, index }) => {
    return (
      <Flex
        my="-0.5"
        mb="2"
        alignItems="center"
        experimental_spaceX="2"
        justifyContent="space-between"
        maxW="40"
        bg="brand.secondary"
        rounded="full"
        px="2.5"
        py="1"
        color="white"
        fontSize="xs"
        fontWeight="medium"
      >
        <Flex overflow="clip" maxW="20">
          <Text overflow="clip" whiteSpace="nowrap">
            {children}
          </Text>
        </Flex>
        <Flex
          cursor="pointer"
          transitionDuration="200ms"
          onClick={() => {
            const filtered = [];
            for (var i = 0; i < tags.length; i++) {
              if (i !== index) {
                filtered.push(tags[i]);
              }
            }
            setTags(filtered);
            handleChange(filtered);
          }}
          alignItems="center"
          justify="center"
          _hover={{ bg: "#FFCA99" }}
          rounded="full"
          p="0.5"
        >
          <X size="14px" />
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex
      _active={{ ring: "2px", ringColor: "brand.secondary" }}
      _focus={{ ring: "2px", ringColor: "brand.secondary" }}
      bg="#372D27"
      py={{ base: "16px", md: "18px" }}
      pl="6"
      pr="4"
      ring={isActive ? "2px" : "none"}
      ringColor={isActive ? "brand.secondary" : "none"}
      transitionDuration="200ms"
      w="full"
      rounded="30px"
      alignItems="center"
    >
      <Box mr="4" color="brand.secondary">
        {icon}
      </Box>
      <Flex mb="-2" zIndex="96" flexWrap="wrap" alignItems="center" w="full">
        <Flex flexWrap="wrap" color="brand.secondary" experimental_spaceX="2">
          {tags.map((data, key) => (
            <TagItem key={key} index={key}>
              {data}
            </TagItem>
          ))}
        </Flex>
        <InputGroup flex="1" minW="32" mt="-2">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            getSuggestionValue={getSuggestionValue}
            renderInputComponent={inputProps => (
              <>
                <Input
                  {...inputProps}
                  w="full"
                  color="white"
                  onClick={() => {
                    setIsActive(true);
                    if (!toast.isActive(enterToast)) {
                      toast({
                        id: enterToast,
                        duration: 1500,
                        render: () => (
                          <Flex
                            color="white"
                            px="6"
                            py="3"
                            justify="center"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.19)",
                              backdropFilter: "blur(9px)",
                            }}
                            rounded="xl"
                          >
                            Press{" "}
                            <Kbd ml="2" mr="2" bg="transparent">
                              Enter
                            </Kbd>{" "}
                            to search
                          </Flex>
                        ),
                      });
                    }
                  }}
                  value={currentQuery}
                  _focus={{}}
                  border="none"
                  _placeholder={{ color: "whiteAlpha.400" }}
                  onBlur={() => {
                    setIsActive(false);
                  }}
                />
              </>
            )}
          />

          <InputRightElement color="whiteAlpha.400">
            <Tooltip label="Use comma separated values">
              <HelpCircle />
            </Tooltip>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
}

export default TagInput;
