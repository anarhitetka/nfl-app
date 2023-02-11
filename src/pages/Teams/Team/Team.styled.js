import styled from "styled-components";

export const TeamPageContainer = styled.div`
  background: #B5BFCA;
  background: -webkit-linear-gradient(bottom right, #B5BFCA, #EEEEEE);
  background: -moz-linear-gradient(bottom right, #B5BFCA, #EEEEEE);
  background: linear-gradient(to top left, #B5BFCA, #EEEEEE);
`;

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
  @media (max-width: 520px) {
    img {
      height: 70px;
    }
    font-size: 0.7rem;
  }
`;

