import { TextField } from "@mui/material";
import styled from "styled-components";
import { PrimaryColors } from "./Colors";

const Title48Wrapper = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 56px;
  color: ${(props) => props.color};
  margin-bottom: ${(props) => props.marginBottom ? '40px' : 'none'};
`;

const Title32Wrapper = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 56px;
  color: ${(props) => props.color};
`;

const Bold24Wrapper = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 56px;
  color: ${(props) => props.color};
`;

const Text24Wrapper = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 56px;
  color: ${(props) => props.color};
`;

export const SearchBar = styled(TextField)`
  && {
    background: ${PrimaryColors.White};
    border-radius: 10px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 56px;
  }
  
`;

export const Title48 = ({ color, children, marginBottom }) => {
  return <Title48Wrapper color={color} marginBottom={marginBottom}>{children}</Title48Wrapper>;
};

export const Title32 = ({ color, children }) => {
  return <Title32Wrapper color={color}>{children}</Title32Wrapper>;
};
export const Bold24 = ({ color, children }) => {
  return <Bold24Wrapper color={color}>{children}</Bold24Wrapper>;
};

export const Text24 = ({ color, children }) => {
  return <Text24Wrapper color={color}>{children}</Text24Wrapper>;
};
