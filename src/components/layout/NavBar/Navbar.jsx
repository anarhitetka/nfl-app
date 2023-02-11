import { NavLink } from "react-router-dom";
import { NFLLogo } from "../../../assets/NFLLogo";
import * as S from "./Navbar.styled.js";

export default function Navbar() {
  return (
    <S.Nav>
      <NavLink to="/">
        <NFLLogo size={65} />
      </NavLink>

      <div>
        <NavLink to="/weeks">
          <S.NavButton>SCHEDULE</S.NavButton>
        </NavLink>
        <NavLink to="/teams">
          <S.NavButton>TEAMS</S.NavButton>
        </NavLink>
      </div>
    </S.Nav>
  );
}
