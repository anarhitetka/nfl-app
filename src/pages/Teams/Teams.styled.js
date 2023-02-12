import styled from "styled-components";
import { Link } from "react-router-dom";

export const AllTeamsContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background: #B5BFCA;
  background: -webkit-linear-gradient(bottom right, #B5BFCA, #EEEEEE);
  background: -moz-linear-gradient(bottom right, #B5BFCA, #EEEEEE);
  background: linear-gradient(to top left, #B5BFCA, #EEEEEE);
`;

export const Conference = styled.div`
  width: 48vw;
  @media (max-width: 800px) {
    width: 96vw;
  }
  @media (min-width: 1050px) {
    width: 500px;
  }
`;

export const Division = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const DivisionName = styled.h4`
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 900;
  color: #013369;
  margin: 10px;
  padding: 5px;
`;

export const TeamDiv = styled.div`
  background-color: #fff;
  border-radius: 3px;
  margin: 0 10px 10px 10px;
  display: flex;
  flex-direction: row;
  .logo-img {
    padding: 10px;
  }
  .team-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .team-display-name {
    margin: 0;
    padding: 5px 10px;
    font-size: 17px;
    font-weight: 700;
  }
  .team-venue {
    color: grey;
    font-size: 12px;
    p {
      margin: 0;
      padding: 0 10px;
    }
  }

  @media (max-width: 400px) {
    .logo-img {
      height: 50px;
    }
    .team-display-name {
      font-size: 15px;
    }
    .team-venue {
      font-size: 11px;
    }
  }
  @media (max-width: 300px) {
    .logo-img {
      height: 35px;
    }
    .team-display-name {
      font-size: 5vw;
    }
    .team-venue {
      display: none;
    }
  }
  @media (max-width: 170px) {
      justify-content: center;
    .team-display-name {
      display: none;
    }
  }
`;

export const TeamNavLink = styled(Link)`
  display: flex;
  width: 100%;
  text-decoration: none;
  color: black;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3); 

  &:hover,
  &:focus {
    color: #013369;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5); 
  }
  &:active {
    color: #013369;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2); 
  }
`;