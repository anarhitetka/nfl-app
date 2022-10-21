import { NavLink } from "react-router-dom";
import * as S from "./Navbar.styled.js";

export default function Navbar() {
  return (
    <S.Nav>
      <NavLink to="/">
        <S.NavButton>NFL APP</S.NavButton>
      </NavLink>

      <div>
        <NavLink to="/weeks">
          <S.NavButton>Games</S.NavButton>
        </NavLink>
        <NavLink to="/teams">
          <S.NavButton>Teams</S.NavButton>
        </NavLink>
      </div>
    </S.Nav>
  );
}
