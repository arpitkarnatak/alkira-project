import React from "react";
import { useQuery } from "react-query";

export default function useGetAllTeams() {
  const { data, isLoading, isError, isSuccess } = useQuery(
    "get-all-teams-data",
    async function () {
      try {
        const response = await fetch("https://www.balldontlie.io/api/v1/teams");
        return (await response.json())?.data;
      } catch (err) {
        throw Error("Error fetching all teams info");
      }
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
    }
  );
  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
}
