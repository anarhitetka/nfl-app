import styled from "styled-components";
import { Link } from "react-router-dom";

export const GameContainer = styled.div`
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
`;
export const DateInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #B5BFCA;
  p {
    margin: 0;
  }
  p > span {
    font-weight: 600;
  }
  .play-by-play {
    color: #1B65B4;
    text-decoration: none;
    font-size: 12px;
    text-align: right;
    min-width: 100px;
    :hover {
      color: #02264C;
    }
    @media (max-width: 365px) {
      padding-top: 5px;
      text-align: left;
    }
  }
  @media (max-width: 365px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const StyledLink = styled(Link)`
  color: #1B65B4;
  text-decoration: none;
  font-size: 12px;
  text-align: right;
  min-width: 100px;
  :hover {
    color: #02264C;
  }
  @media (max-width: 365px) {
    padding-top: 5px;
    text-align: left;
  }
`;
export const ScoreRowGamePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  div {
    display: flex;
  }
  div > span {
    padding: 0 5px;
  }
  div img {
    padding: 0 5px;
  }
  @media (max-width: 365px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ScoreRowCompetitorDetails = styled.div`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 365px) {
    flex-direction: column;
    align-items: flex-start;
    .score-won-lost {
      padding: 10px 5px;
    }
    .team-nickname {
      font-size: 13px;
    }
  }
  @media (max-width: 220px) {
    .team-nickname {
      display: none;
    }
  }
`;
export const ScoreRowScores = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  @media (max-width: 365px) {
    font-size: 15px;
  }
`;
export const TeamLink = styled(Link)`
  text-decoration: none;
  color: #013369;
  display: flex;
  align-items: center;
  span {
    font-weight: 600;
    padding-left: 10px;
  }
`;

export const TextColorLost = styled.span`
  color: red;
  margin-left: 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
`;

export const TextColorWon = styled.span`
  color: green;
  margin-left: 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
`;