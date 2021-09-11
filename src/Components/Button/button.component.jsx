/* eslint-disable default-case */
import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

function CustomButton({ variant, children, ...otherProps }) {
  const MotionButton = motion(Button);

  switch (variant) {
    case "solid":
      return (
        <MotionButton
          {...otherProps}
          bg="transparent"
          fontWeight="medium"
          rounded="full"
          border="2px"
          borderColor="brand.secondary"
          px="12"
          py="26px"
          color="white"
          _hover={{ bg: "brand.secondary" }}
          _active={{ bg: "brand.secondary" }}
          _focus={{}}
          whileTap={{ scale: 0.9 }}
        >
          {children}
        </MotionButton>
      );
    default:
      return <></>;
  }
}

export default CustomButton;
