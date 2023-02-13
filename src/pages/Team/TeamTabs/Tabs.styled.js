import styled from "styled-components";

export const TabsComponentWrapper = styled.div`
    @media (min-width: 1000px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const TabsNavbar = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid grey;
    background-color: white;
    p {
        width: 100px;
        padding: 15px;
        margin: 0px;
        text-align: center;
        cursor: pointer;
    }
    .active {
        border-bottom: 2px solid grey;
        font-weight: 700;
    }
    @media (max-width: 250px) {
        p {
            font-size: 13px;
            padding: 15px 5px;
        }
    }
    @media (min-width: 1000px) {
        width: 100%;
        align-items: center;
        justify-content: center;
    }
`;

export const TabContent = styled.div`
    @media (min-width: 1000px) {
        width: 900px;
    }
`;