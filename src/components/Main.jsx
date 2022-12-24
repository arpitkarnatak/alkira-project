import { InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { PrimaryColors } from "../styles/Colors";
import { filterBySearch } from "../helpers";
import useGetAllTeams from "../hooks/useGetAllTeams";
import { Bold24, SearchBar, Title48 } from "../styles/Typography";
import ViewTeamStats from "./ViewTeamStats";
import SearchIcon from "@mui/icons-material/Search";
import { NavigationButton, Table } from "../styles/ComponentStyles";

export default function Main() {
  const {
    data: allTeamsData,
    isSuccess: isSuccessfullyLoadedTeams,
    isLoading: isLoadingAllTeamsData,
    isError: isErrorLoadingAllTeamsData,
  } = useGetAllTeams();

  const [openModal, setOpenModal] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(0);
  const maxItemsInPage = 7;
  const [currentPageNumber, setCurrentPageNumber] = useState(0);

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
  return (
    <Box padding={"3% 10% 5% 10%"}>
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearchString(e.target.value)}
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
                    <Bold24 color={PrimaryColors.White}>Team Name</Bold24>
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
              <tbody>
                {allTeamsData
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
                    >
                      <td>
                        <Bold24 color={PrimaryColors.Black}>
                          {item?.name}
                        </Bold24>
                      </td>
                      <td>
                        <Bold24 color={PrimaryColors.Black}>
                          {item?.city}
                        </Bold24>
                      </td>
                      <td>
                        <Bold24 color={PrimaryColors.Black}>
                          {item?.abbreviation}
                        </Bold24>
                      </td>
                      <td>
                        <Bold24 color={PrimaryColors.Black}>
                          {item?.conference}
                        </Bold24>
                      </td>
                      <td>
                        <Bold24 color={PrimaryColors.Black}>
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
                  onClick={() =>
                    setCurrentPageNumber(Math.max(0, currentPageNumber - 1))
                  }
                >
                  <Bold24 color={PrimaryColors.White}>&lt;</Bold24>
                </NavigationButton>
                <NavigationButton onClick={() => setCurrentPageNumber(0)}>
                  <Bold24 color={PrimaryColors.White}>1</Bold24>
                </NavigationButton>
                <NavigationButton
                  onClick={() =>
                    setCurrentPageNumber(
                      Math.floor(
                        allTeamsData?.filter((item) =>
                          filterBySearch(searchString, item)
                        ).length / maxItemsInPage
                      )
                    )
                  }
                >
                  <Bold24 color={PrimaryColors.White}>
                    {Math.floor(
                      allTeamsData?.filter((item) =>
                        filterBySearch(searchString, item)
                      ).length / maxItemsInPage
                    ) + 1}
                  </Bold24>
                </NavigationButton>
                <NavigationButton
                  onClick={() =>
                    setCurrentPageNumber(
                      Math.min(
                        currentPageNumber + 1,
                        Math.floor(
                          allTeamsData?.filter((item) =>
                            filterBySearch(searchString, item)
                          ).length / maxItemsInPage
                        )
                      )
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