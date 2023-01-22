import styled from "styled-components";
import { Link } from "react-router-dom";

export const GameHeading = styled.div`
  width: 80vw;
  margin: 5px 0;
  text-align: left;
  font-size: 13px;
  color: #013369; 
  @media (max-width: 500px) {
    span {
      display: none;
    }
  }
  display: flex;
  justify-content: space-between;
`;

// game container for game details component 
export const GameContainerLong = styled.div`
  text-align: center;
  width: 80vw;
  margin: 0 10px 10px 10px;
  padding: 0 10px;
  border: 1px solid #013369; 
  border-radius: 5px;
  @media (max-width: 255px) {
    width: 70vw;
  }
`;

export const TeamsScoresRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 255px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
  }
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
  .right-tbd {
    width: 100%;
    text-align: right;
  }
  @media (max-width: 450px) {
    div > span > span {
      font-size: 1rem;
    }
  }
  @media (max-width: 255px) {
    width: 100%;
    div {
      padding: 0;
      margin: 5px;
    }
    
    :nth-child(3) {
      flex-direction: row-reverse;
    }
    :nth-child(3) > div  {
      display: flex;
      flex-direction: row-reverse;
    }
    .right-tbd {
      text-align: left;
    }
  }
  
`;

export const TeamLink = styled(Link)`
  text-decoration: none;
  color: #013369;
  display: flex;
  align-items: center;
`;

export const TeamStats = styled.span`
  font-size: 0.9rem;
  @media (max-width: 450px) {
    font-size: 0.8rem;
  }
  @media (max-width: 400px) {
    display: none;
  }
`;

export const StatsForPendingGame = styled.p`
  padding: 0;
  margin: 0;
  @media (max-width: 360px) {
    display: none;
  }
  @media (max-width: 255px) {
    display: inline;
  }
`;

export const AtSignGameScore = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  @media (max-width: 450px) {
    font-size: 1rem;
  }
`;

export const PlayByPlayLink = styled(Link)`
  /* text-decoration: none; */
  color: #1B65B4;
  font-style: italic;
  font-size: 0.8rem;
  :hover {
    color: #02264C;
  }
`;

// game preview on team page 
export const LinkToEspn = styled.a`
  color: black;
  font-style: italic;
  display: flex;
  align-items: center;
`;

// game container for preview at team page 
export const GameContainer = styled.div`
  width: 300px;
  margin: 10px;
  padding: 10px;
  border: 1px solid gray;   
  border-radius: 5px;
`;

export const DateInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  p {
    margin: 0;
  }
  p > span {
    font-weight: 600;
  }
`;

export const ScoreRowGamePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
  }
  div > span {
    padding: 0 5px;
  }
  div img {
    padding: 0 5px;
  }
`;

export const ScoreRowCompetitorDetails = styled.div`
  width: 75%;
  justify-content: space-between;
  align-items: center;
`;

export const ScoreRowScores = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

export const TextColorLost = styled.span`
  color: red;
`;

export const TextColorWon = styled.span`
  color: green;
`;