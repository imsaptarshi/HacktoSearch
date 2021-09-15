import { Flex, Text, IconButton } from "@chakra-ui/react";
import {
  DiscordSocialIcon,
  GitHubSocialIcon,
  TwitterSocialIcon,
} from "../../icons";

function Footer() {
  const SocialLink = ({ icon, link }) => (
    <a href={link} target="_blank" rel="noreferrer">
      <IconButton
        cursor="pointer"
        transitionDuration="200ms"
        _hover={{ transform: "scale(1.1)" }}
        icon={icon}
        alt={link}
        variant="ghost"
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
            icon={<GitHubSocialIcon w={7} h={7} />}
            link="https://github.com/imsaptarshi"
          />
          <SocialLink
            icon={<TwitterSocialIcon w={7} h={7} />}
            link="https://twitter.com/imsaptarshiii"
          />
          <SocialLink
            icon={<DiscordSocialIcon w={7} h={7} />}
            link="https://discord.gg/VFfG7UTn5J"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Footer;
