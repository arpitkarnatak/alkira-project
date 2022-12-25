import { Box, Drawer, Grid } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Bold24, Text24, Title32 } from "../styles/Typography";
import { PrimaryColors } from "../styles/Colors";

export default function ViewTeamStats({
  open,
  handleClose,
  teamFullName,
  teamName,
  totalGames,
  date,
  homeTeamName,
  homeTeamScore,
  awayTeamName,
  awayTeamScore,
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      width={"400px"}
      data-testid="view-team-details-modal"
    >
      <Box width={"660px"}>
        <Box
          width={"100%"}
          display={"flex"}
          padding={"4% 5%"}
          justifyContent={"space-between"}
          bgcolor={PrimaryColors.LightGray}
        >
          <Title32 color={PrimaryColors.Black}>{teamName}</Title32>
          <button onClick={handleClose} data-testid="close-team-details-modal">
            <CloseIcon />
          </button>
        </Box>
        <Box padding={"5%"}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Text24 color={PrimaryColors.Black}>Team Full Name</Text24>
            </Grid>
            <Grid item xs={6}>
              <Text24 color={PrimaryColors.Black} data-testid='full-name-team'>{teamFullName}</Text24>
            </Grid>
            <Grid item xs={6}>
              <Text24 color={PrimaryColors.Black}>Total Games played</Text24>
            </Grid>
            <Grid item xs={6}>
              <Text24 color={PrimaryColors.Black} data-testid='total-games-team'>{totalGames}</Text24>
            </Grid>
            <Grid item xs={12}>
              <Bold24 color={PrimaryColors.Black}>Random Game Details</Bold24>
            </Grid>
            <Grid item xs={6}>
              <Bold24 color={PrimaryColors.Black}>Date</Bold24>
            </Grid>
            <Grid item xs={6}>
              <Bold24 color={PrimaryColors.Black} data-testid='random-match-date'>{date?.slice(0, 10)}</Bold24>
            </Grid>
            <Grid item xs={6}>
              <Bold24 color={PrimaryColors.Black}>Home Team</Bold24>
            </Grid>
            <Grid item xs={6}>
              <Bold24 color={PrimaryColors.Black} data-testid='random-match-home-team'>{homeTeamName}</Bold24>
            </Grid>
            <Grid item xs={6}>
              <Bold24 color={PrimaryColors.Black}>Home Team Score</Bold24>
            </Grid>
            <Grid item xs={6}>
              <Bold24 color={PrimaryColors.Black} data-testid='random-match-home-team-score'>{homeTeamScore}</Bold24>
            </Grid>
            <Grid item xs={6}>
              <Bold24 color={PrimaryColors.Black}>Visitor Team</Bold24>
            </Grid>
            <Grid item xs={6}>
              <Bold24 color={PrimaryColors.Black} data-testid='random-match-away-team'>{awayTeamName}</Bold24>
            </Grid>
            <Grid item xs={6}>
              <Bold24 color={PrimaryColors.Black}>Visitor Team Score</Bold24>
            </Grid>
            <Grid item xs={6}>
              <Bold24 color={PrimaryColors.Black} data-testid='random-match-away-team-score'>{awayTeamScore}</Bold24>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
}
