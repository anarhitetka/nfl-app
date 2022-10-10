import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNav = styled.nav`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  //   position: fixed;
  width: 100%;
  padding: 10px;
`;

const StyledButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #222222;
  border-radius: 8px;
  box-sizing: border-box;
  color: #222222;
  cursor: pointer;
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  margin: 5px;
  outline: none;
  padding: 13px 21px;
  text-align: center;
`;

export default function Navbar() {
  return (
    <StyledNav>
      <NavLink to="/">
        <StyledButton>NFL APP</StyledButton>
      </NavLink>

      <div>
        <NavLink to="/weeks">
          <StyledButton>Games</StyledButton>
        </NavLink>
        <NavLink to="/teams">
          <StyledButton>Teams</StyledButton>
        </NavLink>
      </div>
    </StyledNav>
  );
}
