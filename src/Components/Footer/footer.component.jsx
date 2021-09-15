import { Flex, Text, Image } from "@chakra-ui/react";
import Github from "../../Assets/github.png";
import Twitter from "../../Assets/twitter.png";
import Discord from "../../Assets/discord.png";

function Footer() {
  const SocialLink = ({ image, w = 7, h = 7, link }) => (
    <a href={link} target="_blank" rel="noreferrer">
      <Image
        cursor="pointer"
        filter="grayscale(100%)"
        transitionDuration="200ms"
        _hover={{ filter: "none" }}
        src={image}
        w={w}
        h={h}
        alt={link}
      />
    </a>
  );

  return (
    <Flex
      justify="center"
      bg="whiteAlpha.300"
      w="full"
      py="3"
      position="absolute"
      bottom="0"
    >
      <Flex
        alignItems="center"
        w={{ base: "full", xl: "1500px" }}
        px={{ base: "8", md: "12", lg: "20", xl: "40" }}
        justify="space-between"
      >
        <Text fontWeight="medium" color="white" fontSize="lg">
          #happyhacking
        </Text>
        <Flex alignItems="center" experimental_spaceX="2">
          <SocialLink
            image={Github}
            w="7"
            h="7"
            link="https://github.com/imsaptarshi"
          />
          <SocialLink
            image={Twitter}
            w="9"
            h="9"
            link="https://twitter.com/imsaptarshiii"
          />
          <SocialLink
            image={Discord}
            w="7"
            h="7"
            link="https://discord.gg/VFfG7UTn5J"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Footer;
