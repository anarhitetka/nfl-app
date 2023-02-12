import { Gronk } from "../../assets/Gronk";
import { NFLLogo } from "../../assets/NFLLogo";
import styled from "styled-components";
import image from "../../assets/ballnfl.jpg";

const S = {};
S.Container = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: 15vh;
  height: calc(85vh - 73px);
  align-items: center;
  background-image: url(${image});
  div {
    height: 100px;
  }
  @media (max-width: 370px) {
    div {
      height: 20px;
      color: red;
    }
  }
  @media (max-width: 321px) {
    height: calc(85vh - 133px);
  }
`;

export default function Home() {
  return (
    <S.Container>
      <a href="https://www.nfl.com/" target="blank"><NFLLogo size={250} /></a>
      <div>
      </div>
      <Gronk size={250} color="white" />
    </S.Container>
  );
}