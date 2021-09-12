import React, { useState, useEffect } from "react";
import { Flex, Text, Box, Grid, GridItem } from "@chakra-ui/react";
import RepositoryCard from "../../Components/Card/repositoryCard.component";
import get from "../../Helpers/getRepositories";
function Overview({ title, label, icon }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const _data = get(label, [], 4, "updated");
    _data.then(res => {
      setData(res);
    });
  }, [label]);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      mx={{ base: "0", lg: "-2", xl: "0" }}
    >
      <Box
        w={{ base: "full", md: "600px", lg: "600px", xl: "700" }}
        mr={{ lg: "12" }}
        mt="10"
        mb={{ base: "4", md: "0" }}
      >
        <Box mb={{ base: "2", md: "4" }}>{icon}</Box>
        <Text
          opacity="0.7"
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="medium"
          color="white"
        >
          {title}
        </Text>
      </Box>
      <Grid
        templateColumns={{ lg: "repeat(2, 1fr)" }}
        gap={8}
        mr={{ xl: "20" }}
      >
        {data.length > 0 ? (
          <>
            {data.map((_data, key) => (
              <GridItem key={key}>
                <RepositoryCard data={_data} label={label} />
              </GridItem>
            ))}
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Flex>
  );
}

export default Overview;
