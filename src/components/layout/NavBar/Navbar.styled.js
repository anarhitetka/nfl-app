import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: #013369;
  @media (max-width: 320px) {
    justify-content: center;
    align-items: center;
    div {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const StyledNavLink = styled(NavLink)`
  padding: 3px;
  border: none;
`;

export const NavButton = styled.button`
  background-color: #013369;
  border: 1px solid #013369;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  margin: 5px;
  letter-spacing: 2px;
  outline: none;
  text-align: center;
  &:hover {
    background-color: #013369;
    color: white;
    border-bottom: 1px solid white;
  }
  &:active {
    border-bottom: none;
  }
  @media (max-width: 320px) {
    width: 80vw;
    font-size: 12px;
    line-height: 10px;
  }
`;
