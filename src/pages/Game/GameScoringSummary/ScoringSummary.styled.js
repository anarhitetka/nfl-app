import styled from "styled-components";

export const SummaryContainer = styled.div`
    background-color: white;
    padding: 0 10px 10px 10px;
    margin: 0 10px;
    border-radius: 3px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3); 
    @media (min-width: 1000px) {
        width: 900px;

    }
`;

export const QuarterHeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
    margin-top: 10px;
    padding-right: 10px;
    padding-top: 5px;
    p {
        margin: 0;
        padding: 5px;
    }
    p > span {
        display: inline-block;
        width: 50px;
        text-align: right;
    }
    @media (max-width: 270px) {
        p {
            font-size: 0.6rem;
            padding: 0;
        }
        p > span {
            width: 30px;
        }
    }
    @media (max-width: 170px) {
        p {
            font-size: 0.4rem;
        }
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
        text-align: left;
    }
    p > span {
        display: inline-block;
        width: 50px;
        text-align: right;
    }
    .play-abbreviation, 
    .play-clock {
        display: flex;
        align-items: center;
    }

    position: relative;
    .tooltip-play-text {
        position: absolute;
        top: 30px;
        left: 50%;
        width: 100%;
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
    &:hover {
        .tooltip-play-text {
            visibility: visible;
            opacity: 1;
        }
    }

    @media (max-width: 500px) {
        .play-text {
            display: none;
        }
        .play-abbreviation {
            text-decoration: underline;
            text-decoration-style: dotted;
            text-decoration-color: grey;
        }
    }
    @media (max-width: 270px) {
        .play-clock {
            display: none;
        }
        .scores {
            padding: 0;
        }
        .scores > span {
            width: 30px;
        }
    }
    @media (max-width: 170px) {
        .team-logo {
            display: none;
        }
        .scores {
            font-size: 0.8rem;
        }
    }
`;