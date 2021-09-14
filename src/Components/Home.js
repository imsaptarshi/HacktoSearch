import React from "react";
import { Box, Image, Text, Flex, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Navbar from "./Navbar/navbar.component"
import CustomButton from './Button/button.component'
import Asset from '../Assets/asset[1].svg'
import ProfilePicture from "../Assets/creator_pfp.png";
import SearchForm from "../Sections/SearchForm/searchform.section";
import RepositoriesOverview from "../Sections/RepositoriesOverview/repositoriesOverview.section";

function Home() {

    const MotionImage = motion(Image);

    return (
        <div>
            <Box bg="brand.primary" minH="100vh" position="relative" pb="10">
      <Box position="absolute" top="0" right="0">
        <Image
          src={Asset}
          w={{ lg: "450px", xl: "650px" }}
          opacity="0.9"
          display={{ base: "none", lg: "block" }}
        />
      </Box>
      <Navbar />
      <Box h={{ base: "150px", md: "48" }}></Box>
      <Box
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
        <Text
          color="white"
          w={{ md: "600px" }}
          fontWeight="bold"
          fontSize={{ base: "4xl", md: "5xl" }}
        >
          Helping you find the best contributions you can make!
        </Text>
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
    </Box>
        </div>
    )
}

export default Home
