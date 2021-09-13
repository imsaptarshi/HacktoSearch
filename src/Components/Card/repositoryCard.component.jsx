import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { GitMerge, Star, Disc } from "react-feather";
import numberShortener from "number-shortener";
import "./repositoryCard.styles.css";
import CustomTag from "../Tag/tags.component";

function RepositoryCard({ data, label = [], language = [] }) {
  const [user, setUser] = useState({ name: "Unknown" });
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    axios
      .get(data?.owner.url, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_OAUTH_TOKEN}`,
        },
      })
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(data?.languages_url, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_OAUTH_TOKEN}`,
        },
      })
      .then(res => {
        const langs = Object.fromEntries(
          Object.entries(res.data).sort(([, a], [, b]) => a - b)
        );
        setLanguages(Object.keys(langs).reverse());
      })
      .catch(err => console.log(err));
  }, [data?.languages_url, data?.owner.url]);

  return (
    <Flex
      experimental_spaceY="10"
      justify="space-between"
      direction="column"
      id="card"
      color="white"
      bg="whiteAlpha.300"
      rounded="xl"
      py="4"
      px="6"
      height="full"
      _hover={{ transform: "translateY(-6px)" }}
      borderBottom="8px"
      transitionDuration="200ms"
      borderBottomColor="brand.secondary"
    >
      <Flex direction="column" experimental_spaceY="10">
        <a href={data.html_url} target="_blank" rel="noreferrer">
          <Box w="full">
            <Text fontWeight="bold" fontSize="xl" mb="1.5">
              {data?.name}
            </Text>
            <Flex fontSize="sm" w="full">
              <Flex experimental_spaceX="2" mr="4" alignItems="center">
                <Star size="18px" />
                <Text fontWeight="normal">
                  {numberShortener(data?.stargazers_count)}
                </Text>
              </Flex>
              <Flex experimental_spaceX="2" mr="4" alignItems="center">
                <GitMerge size="18px" />
                <Text fontWeight="normal">{numberShortener(data?.forks)}</Text>
              </Flex>
              <Flex experimental_spaceX="2" mr="4" alignItems="center">
                <Disc size="18px" />
                <Text fontWeight="normal">
                  {numberShortener(data.open_issues_count)}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </a>
        <Box cursor="pointer">
          <Text mb="2"> {data?.description}</Text>
          <Flex flexWrap="wrap">
            {label.map((data, key) => (
              <CustomTag key={key} variant="subtle">
                {data}
              </CustomTag>
            ))}
            {languages.slice(0, 1).map((data, key) => (
              <CustomTag key={key} variant="solid">
                {data}
              </CustomTag>
            ))}
          </Flex>
        </Box>
      </Flex>
      <a href={user?.html_url} target="_blank" rel="noreferrer">
        <Flex
          experimental_spaceX="3"
          cursor="pointer"
          alignItems="center"
          transitionDuration="300ms"
          _hover={{ filter: "none" }}
        >
          <Avatar
            src={data?.owner.avatar_url}
            name="Saptarshi Basu"
            h="12"
            w="12"
          />
          <Box color="white">
            <Text fontSize="xs">@{data?.owner.login}</Text>
            <Text fontSize="sm" fontWeight="medium">
              {user.name}
            </Text>
          </Box>
        </Flex>
      </a>
    </Flex>
  );
}

export default RepositoryCard;
