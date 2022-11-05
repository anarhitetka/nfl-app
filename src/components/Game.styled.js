import styled from "styled-components";
import { Link } from "react-router-dom";

export const GameContainer = styled.div`
  width: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const GameHeading = styled.h4`
  margin: 0;
`;

export const TeamContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px 10px;
  }
`;

export const TeamLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  align-items: center;
`;
