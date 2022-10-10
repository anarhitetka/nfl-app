import { Gronk } from "../assets/Gronk";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  // flex-flow: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export default function Home() {
  return (
    <StyledDiv>
      <Gronk />
    </StyledDiv>
  );
}
