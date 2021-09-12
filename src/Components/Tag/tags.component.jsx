import React from "react";
import { Tag } from "@chakra-ui/react";

function CustomTag({ variant, children }) {
  switch (variant) {
    case "subtle":
      return (
        <Tag
          mb="2"
          mr="2"
          bg="#514842"
          class="subtle-tag"
          color="brand.secondary"
          fontWeight="medium"
          rounded="full"
          border="1px"
          borderColor="brand.secondary"
        >
          {children}
        </Tag>
      );
    case "solid":
      return (
        <Tag
          mb="2"
          mr="2"
          bg="#F48B29"
          class="subtle-tag"
          color="white"
          fontWeight="medium"
          rounded="full"
          border="1px"
          borderColor="#F48B29"
        >
          {children}
        </Tag>
      );
    default:
      return <></>;
  }
}

export default CustomTag;
