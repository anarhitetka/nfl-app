import styled from "styled-components";
import { Link } from "react-router-dom";

export const TeamHeader = styled.div`
    font-size: 1.2rem;
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    text-align: center;

    .main-header-teams {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 70vw;
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
        padding: 0;
        img {
            height: 50px;
        }
        .main-header-teams {
            width: 90vw;
    }
    }
`;

export const EspnArticle = styled.div`
    margin: 30px 15px;
    
    a {
        color: #013369; 
        background-color: #EEEEEE;
        text-decoration: none;
        padding: 8px 20px;
        margin: 20px;
        text-decoration:none;
        border-radius:5px;
        cursor:pointer;
    }

    a:hover {
        color: black; 
    }

    span {
        font-weight: 600;
    }
`;

export const TeamLink = styled(Link)`
    text-decoration: none;
    color: #013369;
    display: flex;
    align-items: center;
`;