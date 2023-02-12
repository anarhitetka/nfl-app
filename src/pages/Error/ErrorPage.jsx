import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/layout/NavBar/Navbar";
import { BeachSvg } from "../../assets/BeachSvg";
import { PalmsBeach } from "../../assets/PalmsBeach";

const S = {};
S.PageContainer = styled.div`
    background: #B5BFCA;
    background: -webkit-linear-gradient(bottom right, #B5BFCA, #EEEEEE);
    background: -moz-linear-gradient(bottom right, #B5BFCA, #EEEEEE);
    background: linear-gradient(to top left, #B5BFCA, #EEEEEE);
    min-height:100vh;
    text-align: center;
    color: #013369;
`;
S.ErrorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
`;
S.StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    padding: 10px;
    border: 1px solid #013369;
    border-radius: 3px;
    background-color: #013369;
    box-shadow:0 1px 8px rgba(0,0,0,0.3);
    &:hover {
      box-shadow:0 1px 8px rgba(0,0,0,0.7);
    }
    &:active {
      box-shadow:0 1px 8px rgba(0,0,0,0.3);
    }
`;

export default function ErrorPage() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, [navigate]);

  useEffect(() => {
    setTimeout(() => {
      if (count > 0) {
        setCount(prev => prev - 1)
      }
    }, 1000)
  }, [count]);

  return (
    <S.PageContainer>
      <Navbar />
      <S.ErrorWrapper>
        <PalmsBeach size={150} className="svg-beach" />
        <p> 404: GRONK NOT FOUND</p>
        <p>{count > 0 &&
          <span>Redirecting to home page in {count}</span>
        }</p>
        <S.StyledLink to="/">Go back home now</S.StyledLink>
        <div style={{ marginBottom: "50px" }}></div>
        <BeachSvg size={80} color="#013369" />
      </S.ErrorWrapper>
    </S.PageContainer >
  );
}
