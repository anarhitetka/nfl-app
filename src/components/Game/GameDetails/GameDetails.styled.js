import styled from "styled-components";
import { Link } from "react-router-dom";

export const GameContainerLong = styled.div`
  text-align: center;
  width: 80vw;
  margin: 0 10px 10px 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  @media (max-width: 255px) {
    width: 70vw;
  }
`;

export const GameHeading = styled.div`
  width: 80vw;
  margin: 0 0 10px 0;
  text-align: left;
  font-size: 13px;
  color: #013369; 
  padding-bottom: 10px;
  border-bottom: 1px solid #B5BFCA;
  display: flex;
  justify-content: space-between;
  @media (max-width: 700px) {
    span {
      display: none;
    }
  }
  @media (max-width: 370px) {
    flex-direction: column;
    width: 100%;
  }
`;


export const PlayByPlayLink = styled(Link)`
  color: #1B65B4;
  text-decoration: none;
  font-size: 12px;
  text-align: right;
  min-width: 100px;
  :hover {
    color: #02264C;
  }
  @media (max-width: 370px) {
    font-size: 10px;
    text-align: left;
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
    font-size: 1.2rem;
    color: #013369;
  }
  .right-tbd {
    width: 100%;
    text-align: right;
  }
  position: relative;
  .tooltip {
    position: absolute;
    top: 40px;
    left: 50%;
    max-width:200px; 
    transform:translate(-50%, 0);
    padding:5px 10px;
    color:#444444;
    background-color:#fff;
    font-size:13px;
    border-radius:3px;
    z-index:99999999;
    box-sizing:border-box;
    box-shadow:0 1px 8px rgba(0,0,0,0.3);
    opacity:0; 
    visibility: hidden;
    transition:opacity 0.8s;
  }
  &:hover {
    .tooltip {
      visibility: visible;
      opacity: 1;
    }
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
  font-size: 0.8rem;
  @media (max-width: 450px) {
    font-size: 0.7rem;
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

export const AtSignGameScore = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 1.1rem;
  color: #013369;
  p {
    margin: 0;
    padding-bottom: 3px;
  }
  @media (max-width: 450px) {
    font-size: 1rem;
  }
`;