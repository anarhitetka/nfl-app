import { Gronk } from "../assets/Gronk";
import { NFLLogo } from "../assets/NFLLogo";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-flow: column;
  height: 90%;
  align-items: center;
  div {
    height: 100px;
  }
  @media (max-width: 370px) {
    div {
      height: 20px;
      color: red;
    }
  }
`;

export default function Home() {
  return (
    <StyledDiv>
      <NFLLogo size={250} />
      <div></div>
      <Gronk size={250} />
    </StyledDiv>
  );
}
