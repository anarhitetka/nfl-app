import styled from "styled-components";

export const Stats = styled.div`
    font-size: 0.9rem;
    min-height: 60vh;
    .record-description {
        font-weight: 700;
        padding-bottom: 3px;
        border-bottom: 1px solid black;
    }
    .stat-line {
        border-bottom: 1px solid #B5BFCA;
        display: flex;
        justify-content: space-between;
        p {
            margin: 0;
            padding: 5px 0;
        }
        @media (max-width: 500px) {
            font-size: 0.7rem;
        }
        @media (max-width: 290px) {
            flex-direction: column;
        }
    }
    .stat-value {
        font-weight: 500;
    }
`;