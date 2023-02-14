import styled from "styled-components";

export const TeamHeader = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.9rem;
  img {
    margin: auto 30px;
  }
  flex-wrap: wrap;
  @media (max-width: 580px) {
    img {
      height: 70px;
    }
    font-size: 0.7rem;
  }
`;

export const TeamName = styled.h1`
  @media (max-width: 300px) {
    font-size: 6vw;
  }
`;
