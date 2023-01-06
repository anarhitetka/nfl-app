import styled from "styled-components";
import { Link } from "react-router-dom";

export const GameContainer = styled.div`
  width: 200px;
  margin: 10px;
  padding: 10px;
  border: 1px solid gray;   
  border-radius: 5px;
`;

export const GameContainerLong = styled.div`
  text-align: center;
  width: 80vw;
  margin: 0 10px 10px 10px;
  padding: 0 10px;
  border: 1px solid #013369; 
  border-radius: 5px;
`;

export const GameHeading = styled.div`
  width: 80vw;
  margin: 5px 0;
  text-align: left;
  font-size: 13px;
  color: #013369; 
`;

export const TeamContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px 10px;
  }
  div > span > span {
    font-weight: 600;
    font-size: 1.3rem;
    color: #013369;
  }
  @media (max-width: 255px) {
    div {
      padding: 0;
      margin: 5px;
    }
    img {
      display: none;
    }
  }
`;

export const TeamsScoresRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TeamLink = styled(Link)`
  text-decoration: none;
  color: #013369;
  display: flex;
  align-items: center;
`;
