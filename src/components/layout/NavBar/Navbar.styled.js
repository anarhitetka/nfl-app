import styled from "styled-components";

export const Nav = styled.nav`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color:  rgba(33,33,33,0.7);
  @media (max-width: 385px) {
    justify-content: center;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const NavButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #013369;
  border-radius: 8px;
  box-sizing: border-box;
  color: #013369;
  cursor: pointer;
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  margin: 5px;
  outline: none;
  padding: 13px 21px;
  text-align: center;
  &:hover {
    background-color: #013369;
    color: white;
    box-shadow: -3px -1px 27px 7px rgba(0,0,0,0.95);

  }
  &:active {
    background-color: #012852;
  }
  @media (max-width: 385px) {
    width: 80vw;
  }
`;
