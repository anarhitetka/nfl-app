import styled from "styled-components";

export const SummaryContainer = styled.div`
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    scrollbar-color: rebeccapurple green;
`;

export const QuarterHeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
    margin-top: 10px;
    padding-right: 10px;

    p {
        margin: 0;
        padding: 5px;
    }

    p > span {
        display: inline-block;
        width: 50px;
        text-align: right;
    }
`;

export const PlayRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px 5px 0;

    div > div {
        display: flex;
        flex-direction: row;
        font-size: 0.8rem;
    }
    p {
        padding: 0 5px;
        margin: 0;
        display: flex;
        flex-direction: row;
    }
    .play-text {
        width: 100%;
        font-size: 0.8rem;
    }
    p > span {
        display: inline-block;
        width: 50px;
        text-align: right;
    }
    @media (max-width: 500px) {
        .play-text {
            display: none;
        }
        .scores {
        }
    }
`;