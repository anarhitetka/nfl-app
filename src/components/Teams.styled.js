import styled from "styled-components";
import { Link } from "react-router-dom";

export const TeamsContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const TeamCard = styled.div`
  box-sizing: border-box;
  border: 1px solid grey;
  width: 120px;
  margin: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const HeadingH4 = styled.h4`
  padding: 5px;
  height: 50px;
  display: flex;
  align-items: center;
`;

export const TeamLink = styled(Link)`
  box-sizing: border-box;
  border: 3px solid transparent;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  text-decoration: none;
  color: black;
  &:hover,
  &:focus {
    border: 3px solid #013369;
  }
  &:active {
    color: grey;
  }
  // &:hover {
  //   img {
  //     height: 77px;
  //   }
  // }

  p {
    width: 100%;
  }
`;
