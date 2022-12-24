import styled from "styled-components";
import { PrimaryColors } from "./Colors";

export const NavigationButton = styled.button`
  background: ${PrimaryColors.DarkBlue};
  border-radius: 5px;
  padding: 0 20px 0 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  > thead > tr {
    background: ${PrimaryColors.DarkBlue};
    border: 5px solid white;
    border-radius: 20px;

    > :first-child {
      border-radius: 15px 0 0 15px;
    }

    > :last-child {
      border-radius: 0 15px 15px 0;
    }

    :hover {
      background-color: none;
    }
  }

  th,
  td,
  tr {
    text-align: center;
  }

  > tbody > tr {
    background: ${PrimaryColors.TableRowColor};
    border-radius: 5px;
    margin: 1%;
    border: 5px solid white;

    > :first-child {
      border-radius: 15px 0 0 15px;
    }

    > :last-child {
      border-radius: 0 15px 15px 0;
    }

    :hover {
      background: ${PrimaryColors.LightGray};
    }
  }

  td :hover {
    cursor: pointer;
  }
`;
