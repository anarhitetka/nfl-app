import styled from "styled-components";

export const WeekInfoHeader = styled.div`
    font-weight: 700;
    color: #013369;
    background-color: rgba(1, 51, 105,0.15);
    .week-info-text {
        padding: 20px 10px 10px 10px;
        margin: 0;
    }
    .article-headline {
        margin: 0;
        padding-bottom: 10px;
        font-weight: 400;
    }
    @media (max-width: 500px) {
        .article-headline {
            font-size: 0.9rem;
            padding: 0 20px 10px 20px;
        }
    }
    @media (max-width: 350px) {
        font-size: 5vw;
        .week-info-text {
            padding: 10px;
        }
        .article-headline {
            font-size: 4vw;
        }
    }
    @media (min-width: 1000px) {
        width: 100vw;
    }
`;