import styled from "styled-components";
import { Link } from "react-router-dom";

export const PlayByPlayPageContainer = styled.div`
    background: #B5BFCA;
    background: -webkit-linear-gradient(bottom right, #B5BFCA, #EEEEEE);
    background: -moz-linear-gradient(bottom right, #B5BFCA, #EEEEEE);
    background: linear-gradient(to top left, #B5BFCA, #EEEEEE);
    min-height:100vh;
    text-align: center;
`;

export const TeamHeader = styled.div`
    font-size: 1.2rem;
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #013369;
    color: white;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    .main-header-teams {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80vw;
        height: 100%;
    }
    img {
    margin: auto 30px;
    }
    p {
        font-size: 0.8rem;
    }
    @media (max-width: 770px) {
        img {
            height: 100px;
        }
    }
    @media (max-width: 500px) {
        img {
            height: 50px;
        }
        .main-header-teams {
            width: 90vw;
        }
    }
    @media (max-width: 350px) {
        img {
            height: 70px;
        }
        .at-sign {
            margin-bottom: 30px;
        }
    }
    @media (max-width: 200px) {
        img {
            height: 25px;
            margin: 0;
        }
        .at-sign {
            margin-bottom: 0;
            font-size: 0.7rem;
        }
    }
`;

export const SingleTeamHeaderCard = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    h5, p, img {
        margin: 0;
    }
    h5 {
        height: 30px;
    }

    position: relative;
    .tooltip {
        position: absolute;
        top: 65px;
        left: 50%;
        max-width:200px; 
        transform:translate(-50%, 0);
        padding:5px 10px;
        color:#444444;
        background-color:#fff;
        font-size:13px;
        border-radius:3px;
        z-index:99999999;
        box-sizing:border-box;
        box-shadow:0 1px 8px rgba(0,0,0,0.3);
        opacity:0; 
        visibility: hidden;
        transition:opacity 0.8s;
    }

    @media (max-width: 500px) {
        h5 {
            padding: 5px 5px 15px 5px;
        }
        p {
            padding-top: 10px;
            font-size: 0.7rem;
            height: 30px;
        }
    }
    @media (max-width: 350px) {
        h5  {
            display: none;
        }
        &:hover {
            .tooltip {
                visibility: visible;
                opacity: 1;
            }
        }
    }
    @media (max-width: 200px) {
        p {
            display: none;
        }
    }
`;

export const GameHeadline = styled.h4`
    margin: 20px 20px;
    color: #013369;
    @media (max-width: 350px) {
        font-size: 5vw;
    }
`;

export const TeamLink = styled(Link)`
    text-decoration: none;
    color: #013369;
    display: flex;
    align-items: center;
`;

export const SummaryWrapper = styled.div`
    @media (min-width: 1000px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;