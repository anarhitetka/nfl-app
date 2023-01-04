import styled from "styled-components";
import { Link } from "react-router-dom";
import backgroundImg from "../assets/ballnfl.jpg"

export const TeamsContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #D9DCDF;
  background-image: url(${backgroundImg});
  background-size: cover;
`;

export const DivisionContainer = styled.div`
  border-radius: 3px;
  display: flex; 
  flex-direction: column; 
  align-items: center;
  margin: 15px;
  box-shadow: 4px 5px 23px 4px black;
  background-color: white;
`;

export const DivisionHeading = styled.h4`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #013369;
  margin: 0;
  padding: 5px;
`;

export const DivisionTeams = styled.div`
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
  p {
    width: 100%;
  }
`;
