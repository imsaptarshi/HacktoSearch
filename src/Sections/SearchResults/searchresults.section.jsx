import CustomButton from "../../Components/Button/button.component";
import { useSearch } from "../../Providers/search.provider";
import { RefreshCw } from "react-feather";
import {
  Flex,
  Text,
  Box,
  Grid,
  GridItem,
  Spinner,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import RepositoryCard from "../../Components/Card/repositoryCard.component";
import get from "../../Helpers/getRepositories";
import Search from "../../Assets/search.svg";
import Doodle from "../../Assets/doodle.png";
import Countdown from "react-countdown";

function SearchResults() {
  const { query, results, setResults, setIsSearching, isError, setIsError } =
    useSearch();

  const { onOpen, onClose } = useDisclosure();

  const Refresh = () => (
    <CustomButton
      id="refresh"
      p="0"
      w="14"
      transform={{ base: "scale(0.8)", md: "scale(1)" }}
      h="10"
      variant="solid"
      onClick={() => {
        setIsSearching(true);
        setResults({
          ...results,
          data: [],
        });
        const data = get(
          query.label.length > 0 ? query.label : ["hacktoberfest"],
          query.language.slice(0, 1),
          10,
          "relevance"
        );
        data
          .then(res => {
            window.location.href = "#search";
            setResults({
              data: res,
              label: query.label.slice(0, query.label.length),
              language: query.language.slice(0, query.language.length),
            });
          })
          .catch(err => setIsError(true));
      }}
    >
      <RefreshCw size="14px" />
    </CustomButton>
  );

  return (
    <Flex
      minH="400px"
      pt={{ md: "10" }}
      id="repos"
      direction={{ base: "column", md: "row" }}
      mx={{ base: "0", lg: "-2", xl: "0" }}
    >
      <Flex
        alignItems={{ base: "end", md: "start" }}
        justify={{ base: "space-between", md: "none" }}
        mr={{ lg: "12" }}
        mt="10"
        mb={{ base: "4", md: "0" }}
      >
        <Box>
          <Box mb={{ base: "2", md: "4" }}>
            <Image w={{ base: "14", md: "20" }} src={Search} alt="Search icon"/>
          </Box>
          <Text
            w={{ base: "full", md: "260px", lg: "200px", xl: "220px" }}
            opacity="0.7"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="medium"
            color="white"
          >
            Search Results
          </Text>
        </Box>
        <Box display={{ md: "none" }}>
          <Refresh />
        </Box>
      </Flex>
      {results.data.length > 0 ? (
        <Grid
          templateColumns={{ lg: "repeat(2, 1fr)" }}
          gap={8}
          mr={{ xl: "20" }}
        >
          <GridItem
            display={{ base: "none", md: "flex" }}
            colSpan={{ lg: "2" }}
            justifyContent="end"
          >
            <Refresh />
          </GridItem>

          {results.data.map((_data, key) => (
            <GridItem key={key}>
              <RepositoryCard
                data={_data}
                label={
                  results.label.length > 0 ? results.label : ["hacktoberfest"]
                }
                language={results.language}
              />
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
                date={Date.now() + 60000}
                renderer={({ hours, minutes, seconds, completed }) =>
                  completed ? (
                    <CustomButton
                      variant="solid"
                      onClick={() => {
                        setIsError(false);
                        document.getElementById("refresh").click();
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

export default SearchResults;
