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
import { X, HelpCircle } from "react-feather";

function TagInput({ icon, handleChange, ...otherProps }) {
  const [tags, setTags] = useState([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [isActive, setIsActive] = useState(false);

  const toast = useToast();

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
      rounded="full"
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
          <Input
            onFocus={() => {
              toast({
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
            }}
            onKeyPress={e => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                setCurrentQuery("");
                tags.push(currentQuery);
                setTags(tags);
              }
            }}
            _placeholder={{ color: "whiteAlpha.400" }}
            color="white"
            onClick={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            value={currentQuery}
            onChange={e => {
              setCurrentQuery(e.target.value);
              if (
                e.target.value.trim() !== "," &&
                e.target.value.endsWith(",")
              ) {
                setCurrentQuery("");
                tags.push(currentQuery);
                setTags(tags);
                handleChange(tags);
              }
            }}
            _hover={{}}
            _focus={{}}
            _active={{}}
            bg="transparent"
            border="none"
            {...otherProps}
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
