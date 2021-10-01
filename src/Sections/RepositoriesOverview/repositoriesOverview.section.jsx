import { useSearch } from "../../Providers/search.provider";
import Overview from "../Overview/overview.section";
import { Box, Image } from "@chakra-ui/react";
import GoodFirstIssue from "../../Assets/goodFirstIssue.svg";
import Hacktoberfest from "../../Assets/hacktoberfest.svg";
import SearchResults from "../SearchResults/searchresults.section";

function RepositoriesOverview() {
  const { isSearching } = useSearch();

  return (
    <>
      {!isSearching ? (
        <>
          <Overview
            id="repos"
            title="Good First Issue"
            label={["good-first-issue", "hacktoberfest"]}
            icon={<Image w={{ base: "14", md: "20" }} src={GoodFirstIssue} alt="Good first issue logo" />}
          />
          <Box mb={{ base: "6", md: "14" }} />
          <Overview
            title="Hacktober Fest"
            label={["hacktoberfest"]}
            icon={<Image w={{ base: "14", md: "20" }} src={Hacktoberfest} alt="Hacktoberfest logo" />}
          />
        </>
      ) : (
        <SearchResults />
      )}
    </>
  );
}

export default RepositoriesOverview;
