import { InputAdornment } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { PrimaryColors } from "../styles/Colors";
import { filterBySearch } from "../helpers";
import useGetAllTeams from "../hooks/useGetAllTeams";
import { Bold24, SearchBar, Title48 } from "../styles/Typography";
import ViewTeamStats from "./ViewTeamStats";
import SearchIcon from "@mui/icons-material/Search";
import { NavigationButton, Table } from "../styles/ComponentStyles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function Main() {
  const {
    data: allTeamsData,
    isSuccess: isSuccessfullyLoadedTeams,
    isLoading: isLoadingAllTeamsData,
  } = useGetAllTeams();

  const [openModal, setOpenModal] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(0);
  const maxItemsInPage = 7;
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [lastPageNumber, setLastPageNumber] = useState(
    Math.floor(30 / maxItemsInPage)
  );
  const [sortByTeamName, setSortByTeamName] = useState(false);

  const { data: singleTeamData, mutate: getData } = useMutation(
    ["get-team-info"],
    async function (team_id) {
      const response = await fetch(
        `https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=${team_id}`
      );

      const allGamesResponse = await response?.json();
      const totalGames = allGamesResponse?.meta?.total_count;
      const allGamesByTeam = allGamesResponse.data;
      const randomGameStats =
        allGamesByTeam[Math.floor(Math.random() * allGamesByTeam.length)];

      return {
        teamName: allTeamsData[team_id - 1]?.name,
        teamFullName: allTeamsData[team_id - 1]?.full_name,
        totalGames: totalGames,
        date: randomGameStats?.date,
        homeTeamName: randomGameStats?.home_team?.name,
        homeTeamScore: randomGameStats?.home_team_score,
        awayTeamName: randomGameStats?.visitor_team?.name,
        awayTeamScore: randomGameStats?.visitor_team_score,
      };
    },
    {
      onSuccess: (data) => {
        setOpenModal(true);
      },
    }
  );

  useEffect(() => {
    setLastPageNumber(
      Math.floor(
        allTeamsData?.filter((item) => filterBySearch(searchString, item))
          .length / maxItemsInPage
      ) || 0
    );
  }, [searchString, allTeamsData]);

  useEffect(() => {
    setCurrentPageNumber(0)
  }, [sortByTeamName])
  return (
    <Box padding={"3% 10% 5% 10%"} data-testid="main-component">
      <Box>
        <ViewTeamStats
          open={openModal}
          handleClose={() => {
            setOpenModal(false);
            setSelectedTeam(-1);
          }}
          teamName={singleTeamData?.teamName}
          teamFullName={singleTeamData?.teamFullName}
          totalGames={singleTeamData?.totalGames}
          date={singleTeamData?.date}
          homeTeamName={singleTeamData?.homeTeamName}
          homeTeamScore={singleTeamData?.homeTeamScore}
          awayTeamName={singleTeamData?.awayTeamName}
          awayTeamScore={singleTeamData?.awayTeamScore}
        />
        <Title48 color={PrimaryColors.DarkBlue} marginBottom>
          NBA Teams
        </Title48>

        <SearchBar
          sx={{ m: 1, width: "25ch" }}
          data-testid="search-for-team"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setSearchString(e.target.value);
            setCurrentPageNumber(0);
          }}
        />

        {isLoadingAllTeamsData && (
          <Bold24 color={PrimaryColors.DarkBlue}>Loading Teams...</Bold24>
        )}

        {isSuccessfullyLoadedTeams && (
          <>
            <Table>
              <thead>
                <tr>
                  <th>
                    <Bold24 color={PrimaryColors.White}>
                      Team Name
                      <button
                        onClick={() => setSortByTeamName(!sortByTeamName)}
                      >
                        <ArrowDropUpIcon sx={{ color: PrimaryColors.White }} />
                      </button>
                    </Bold24>
                  </th>
                  <th>
                    <Bold24 color={PrimaryColors.White}>City</Bold24>
                  </th>
                  <th>
                    <Bold24 color={PrimaryColors.White}>Abbreviation</Bold24>
                  </th>
                  <th>
                    <Bold24 color={PrimaryColors.White}>Conference</Bold24>
                  </th>
                  <th>
                    <Bold24 color={PrimaryColors.White}>Division</Bold24>
                  </th>
                </tr>
              </thead>
              <tbody data-testid="all-teams-list">
                {allTeamsData
                  ?.sort((a, b) =>
                    sortByTeamName ? (a.name > b.name ? 1 : -1) : {}
                  )
                  ?.filter((item) => filterBySearch(searchString, item))
                  ?.slice(
                    currentPageNumber * maxItemsInPage,
                    currentPageNumber * maxItemsInPage + maxItemsInPage
                  )
                  ?.map((item) => (
                    <tr
                      key={item.abbreviation}
                      onClick={() => {
                        setSelectedTeam(item?.id);
                        getData(item?.id);
                      }}
                      style={{
                        background:
                          item?.id === selectedTeam
                            ? PrimaryColors.SelectedTeamGray
                            : "",
                      }}
                      data-testid={`team-row-${item?.id}`}
                    >
                      <td>
                        <Bold24
                          color={PrimaryColors.Black}
                          data-testid={`team-${item?.id}-name`}
                        >
                          {item?.name}
                        </Bold24>
                      </td>
                      <td>
                        <Bold24
                          color={PrimaryColors.Black}
                          data-testid={`team-${item?.id}-city`}
                        >
                          {item?.city}
                        </Bold24>
                      </td>
                      <td>
                        <Bold24
                          color={PrimaryColors.Black}
                          data-testid={`team-${item?.id}-abbreviation`}
                        >
                          {item?.abbreviation}
                        </Bold24>
                      </td>
                      <td>
                        <Bold24
                          color={PrimaryColors.Black}
                          data-testid={`team-${item?.id}-conference`}
                        >
                          {item?.conference}
                        </Bold24>
                      </td>
                      <td>
                        <Bold24
                          color={PrimaryColors.Black}
                          data-testid={`team-${item?.id}-division`}
                        >
                          {item?.division}
                        </Bold24>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              marginTop={"30px"}
            >
              <Box display={"flex"} gap="24px">
                <NavigationButton
                  data-testid="prev-page-button"
                  disabled={currentPageNumber === 0}
                  onClick={() =>
                    setCurrentPageNumber(Math.max(0, currentPageNumber - 1))
                  }
                >
                  <Bold24 color={PrimaryColors.White}>&lt;</Bold24>
                </NavigationButton>
                <NavigationButton
                  disabled={currentPageNumber === 0}
                  onClick={() => setCurrentPageNumber(0)}
                >
                  <Bold24 color={PrimaryColors.White}>1</Bold24>
                </NavigationButton>
                {lastPageNumber > 0 && (
                  <NavigationButton
                    disabled={lastPageNumber === currentPageNumber}
                    onClick={() => setCurrentPageNumber(lastPageNumber)}
                  >
                    <Bold24 color={PrimaryColors.White}>
                      {lastPageNumber + 1}
                    </Bold24>
                  </NavigationButton>
                )}
                <NavigationButton
                  data-testid="next-page-button"
                  disabled={currentPageNumber === lastPageNumber}
                  onClick={() =>
                    setCurrentPageNumber(
                      Math.min(currentPageNumber + 1, lastPageNumber)
                    )
                  }
                >
                  <Bold24 color={PrimaryColors.White}>&gt;</Bold24>
                </NavigationButton>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
