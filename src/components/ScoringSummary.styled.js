import styled from "styled-components";

export const QuarterHeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
    margin-top: 10px;

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
    padding: 5px 0;
    div {
        display: flex;
        flex-direction: row;
        width: 25%;
        font-size: 0.8rem;
    }
    p {
        padding: 0 5px;
        margin: 0;
        display: flex;
        flex-direction: row;
    }
    .play-text {
        width: 50%;
        font-size: 0.8rem;
    }
    p > span {
        display: inline-block;
        width: 50px;
        text-align: right;
    }
`;