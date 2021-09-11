import { Input, Text, Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { X } from "react-feather";

function TagInput({ icon, ...otherProps }) {
  const [tags, setTags] = useState([]);
  const [currentQuery, setCurrentQuery] = useState("");
  const [isActive, setIsActive] = useState(false);

  const TagItem = ({ children, index }) => {
    return (
      <Flex
        my="-0.5"
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
      zIndex="96"
      w="full"
      alignItems="center"
      _active={{ ring: "2px", ringColor: "brand.secondary" }}
      _focus={{ ring: "2px", ringColor: "brand.secondary" }}
      bg="#372D27"
      py="2"
      px="6"
      ring={isActive ? "2px" : "none"}
      ringColor={isActive ? "brand.secondary" : "none"}
      transitionDuration="200ms"
      rounded="full"
    >
      <Flex color="brand.secondary" experimental_spaceX="2">
        <Box mr="1">{icon}</Box>
        {tags.map((data, key) => (
          <TagItem key={key} index={key}>
            {data}
          </TagItem>
        ))}
      </Flex>
      <Input
        color="white"
        onClick={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        value={currentQuery}
        onChange={e => {
          setCurrentQuery(e.target.value);
          if (e.target.value.endsWith(",")) {
            setCurrentQuery("");
            tags.push(currentQuery);
            setTags(tags);
          }
        }}
        _hover={{}}
        _focus={{}}
        _active={{}}
        bg="transparent"
        border="none"
        {...otherProps}
      />
    </Flex>
  );
}

export default TagInput;
