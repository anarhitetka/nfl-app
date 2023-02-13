import styled from "styled-components";

export const PlayByPlayPageContainer = styled.div`
    background: #B5BFCA;
    background: -webkit-linear-gradient(bottom right, #B5BFCA, #EEEEEE);
    background: -moz-linear-gradient(bottom right, #B5BFCA, #EEEEEE);
    background: linear-gradient(to top left, #B5BFCA, #EEEEEE);
    min-height:100vh;
    text-align: center;
    padding-bottom: 15px;
`;

export const SummaryWrapper = styled.div`
    @media (min-width: 1000px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;