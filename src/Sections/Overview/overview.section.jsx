import React, { useState, useEffect } from "react";
import { Flex, Text, Box, Grid, GridItem, Spinner } from "@chakra-ui/react";
import RepositoryCard from "../../Components/Card/repositoryCard.component";
import get from "../../Helpers/getRepositories";

function Overview({
  title,
  label = [],
  language = [],
  icon,
  id,
  count = 4,
  sortBy = "updated",
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const _data = get(label, language, count, sortBy);
    _data.then(res => {
      setData(res);
    });
  }, [count, data, label, language, sortBy]);

  return (
    <Flex
      minH="400px"
      pt={{ md: "10" }}
      id={id}
      direction={{ base: "column", md: "row" }}
      mx={{ base: "0", lg: "-2", xl: "0" }}
    >
      <Box mr={{ lg: "12" }} mt="10" mb={{ base: "4", md: "0" }}>
        <Box mb={{ base: "2", md: "4" }}>{icon}</Box>
        <Text
          w={{ base: "full", md: "260px", lg: "200px", xl: "220px" }}
          opacity="0.7"
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="medium"
          color="white"
        >
          {title}
        </Text>
      </Box>

      {data.length > 0 ? (
        <Grid
          templateColumns={{ lg: "repeat(2, 1fr)" }}
          gap={8}
          mr={{ xl: "20" }}
        >
          {data.map((_data, key) => (
            <GridItem key={key}>
              <RepositoryCard data={_data} label={label} />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Flex w="full" justify="center" alignItems="center">
          <Spinner color="white" w="100px" h="100px" />
        </Flex>
      )}
    </Flex>
  );
}

export default Overview;
