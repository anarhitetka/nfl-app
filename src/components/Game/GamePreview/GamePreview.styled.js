import styled from "styled-components";
import { Link } from "react-router-dom";

export const GameContainer = styled.div`
  width: 300px;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
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
export const LinkToEspn = styled.a`
  color: black;
  font-style: italic;
  display: flex;
  align-items: center;
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
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;
export const TeamLink = styled(Link)`
  text-decoration: none;
  color: #013369;
  display: flex;
  align-items: center;
`;



export const TextColorLost = styled.span`
  color: red;
`;

export const TextColorWon = styled.span`
  color: green;
`;