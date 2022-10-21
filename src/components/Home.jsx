import { Gronk } from "../assets/Gronk";
import { NFLLogo } from "../assets/NFLLogo";
import styled from "styled-components";

const S = {};
S.Container = styled.div`
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
    <S.Container>
      <NFLLogo size={250} />
      <div></div>
      <Gronk size={250} />
    </S.Container>
  );
}
