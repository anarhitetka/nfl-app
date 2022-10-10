import { NavLink } from "react-router-dom";
import { StyledNav, StyledButton } from "./Navbar.styled.js";

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
