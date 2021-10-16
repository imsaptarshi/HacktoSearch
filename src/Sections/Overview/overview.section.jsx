import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Box,
  Grid,
  GridItem,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import RepositoryCard from "../../Components/Card/repositoryCard.component";
import get from "../../Helpers/getRepositories";
import { useSearch } from "../../Providers/search.provider";
import Doodle from "../../Assets/doodle.png";
import Countdown from "react-countdown";
import CustomButton from "../../Components/Button/button.component";

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
  const { isError, setIsError } = useSearch();
  const [ rateLimit, setRateLimit] = useState(null);
  const { onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const _data = get(label, language, count, sortBy);
    _data
      .then(res => {
        setData(res);
      })
      .catch(err => {
        setIsError(true);
        console.log(parseInt(err.response.headers['x-ratelimit-reset'])*1000)
        console.log(Date.now())
        if (err?.response.headers['x-ratelimit-reset']) {
          setRateLimit(parseInt(err.response.headers['x-ratelimit-reset'])*1000);
        }
      });
  }, [count, label, language, setIsError, setRateLimit, sortBy]);

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
      ) : isError ? (
        <Modal isOpen={onOpen} onClose={onClose} closeOnEsc={true}>
          <ModalOverlay />
          <ModalContent bg="#0F1929" p="12" rounded="2xl">
            <Flex
              direction="column"
              justify="center"
              alignItems="center"
              experimental_spaceY="6"
            >
              <Image src={Doodle} alt="doodle"/>
              <Text
                align="center"
                fontWeight="bold"
                fontSize="xl"
                color="white"
              >
                We appreciate your enthusiasm, but unfortunately we’ve exceeded
                our request limit
              </Text>

              <Countdown
                date={rateLimit ? rateLimit : Date.now() + 60000}
                renderer={({ hours, minutes, seconds, completed }) =>
                  completed ? (
                    <CustomButton
                      variant="solid"
                      onClick={() => {
                        setIsError(false);
                      }}
                    >
                      Refresh
                    </CustomButton>
                  ) : (
                    <Text
                      align="center"
                      fontWeight="medium"
                      fontSize="base"
                      color="white"
                    >
                      Retry after{" "}
                      <Text display="inline" color="brand.secondary">
                        {seconds} Seconds
                      </Text>
                    </Text>
                  )
                }
              />
            </Flex>
          </ModalContent>
        </Modal>
      ) : (
        <Flex w="full" justify="center" alignItems="center">
          <Spinner color="white" w="100px" h="100px" />
        </Flex>
      )}
    </Flex>
  );
}

export default Overview;
