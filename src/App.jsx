import React from "react";
import { Box, Image, Text, Flex, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Navbar from "./Components/Navbar/navbar.component";
import CustomButton from "./Components/Button/button.component";
import SearchForm from "./Sections/SearchForm/searchform.section";
import Asset from "./Assets/asset[1].svg";
import ProfilePicture from "./Assets/creator_pfp.png";
import RepositoriesOverview from "./Sections/RepositoriesOverview/repositoriesOverview.section";
import Footer from "./Components/Footer/footer.component";

function App() {
  const MotionImage = motion(Image);

  return (
    <Box bg="brand.primary" minH="100vh" position="relative" pb="10">
      <Box role="banner" position="absolute" top="0" right="0">
        <Image
          src={Asset}
          alt=""
          w={{ lg: "450px", xl: "650px" }}
          opacity="0.9"
          display={{ base: "none", lg: "block" }}
        />
      </Box>
      <Navbar />
      <Box h={{ base: "150px", md: "48" }}></Box>
      <Box
        role="main"
        maxW="1500px"
        mx="auto"
        px={{ base: "8", md: "12", lg: "20", xl: "40" }}
      >
        <Text
          color="white"
          fontWeight="medium"
          opacity="0.6"
          fontSize={{ base: "xl", md: "2xl" }}
        >
          Hacktoberfest Search
        </Text>
        <Heading
          as="h1"
          color="white"
          w={{ md: "600px" }}
          fontWeight="bold"
          fontSize={{ base: "4xl", md: "5xl" }}
        >
          Helping you find the best contributions you can make!
        </Heading>
        <Flex
          mt="10"
          mb={{ base: "14", md: "20" }}
          alignItems={{ base: "start", md: "center" }}
          direction={{ base: "column", md: "row" }}
          w="full"
        >
          <CustomButton
            variant="solid"
            onClick={() => {
              window.location.href = "#repos";
            }}
            mr={{ md: "10", lg: "20" }}
            mb={{ base: "6", md: "0" }}
          >
            Get Started
          </CustomButton>
          <a
            href="https://github.com/imsaptarshi"
            target="_blank"
            rel="noreferrer"
          >
            <Flex
              experimental_spaceX="3"
              cursor="pointer"
              filter="grayscale(95%)"
              transitionDuration="300ms"
              _hover={{ filter: "none" }}
            >
              <MotionImage
                src={ProfilePicture}
                whileHover={[{ scale: [1, 1.15, 1.1, 1.1, 1.1, 1.1] }]}
                alt="Saptarshi Basu"
                h="10"
                w="10"
              />
              <Box opacity="0.6" color="white">
                <Text fontSize="xs">Created by</Text>
                <Text fontSize="base" fontWeight="medium">
                  Saptarshi Basu
                </Text>
              </Box>
            </Flex>
          </a>
        </Flex>
        <SearchForm />
        <Box mb={{ base: "6", md: "14" }} />
        <RepositoriesOverview />
      </Box>
      <Box h="20" />
      <Footer />
    </Box>
  );
}

export default App;
