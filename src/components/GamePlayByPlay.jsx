import { useParams, useLocation } from "react-router-dom";
import { ApiCalls } from "../utils/apiCalls";
import LinearProgress from '@mui/material/LinearProgress';
import ScoringSummary from './ScoringSummary';

import styled from "styled-components";

const S = {};
S.TeamHeader = styled.div`
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

S.EspnArticle = styled.div`
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

export default function GamePlayByPlay() {
    const { eventId } = useParams();
    const location = useLocation();
    const { from } = location.state;
    const awayTeamID = from.awayTeamID;
    const homeTeamID = from.homeTeamID;
    // const gameName = from.gameName;
    const awayTeamData = from.awayTeamData;
    const homeTeamData = from.homeTeamData;

    const gameSummaryData = ApiCalls.getGameSummary(eventId);

    return (
        <div style={{ backgroundColor: "white", minHeight: "92vh", padding: "0 10px", textAlign: "center" }}>
            <div>

                <S.TeamHeader>
                    <div className="main-header-teams">
                        <div>
                            <h5>{awayTeamData.data.team.displayName}</h5>
                            <img
                                src={awayTeamData.data.team.logos[0].href}
                                height="150"
                                alt="team logo"
                            />
                            <p>{awayTeamData.data.team.standingSummary}</p>
                        </div>
                        @
                        <div>
                            <h5>{homeTeamData.data.team.displayName}</h5>
                            <img
                                src={homeTeamData.data.team.logos[0].href}
                                height="150"
                                alt="team logo"
                            />
                            <p>{homeTeamData.data.team.standingSummary}</p>
                        </div>
                    </div>


                </S.TeamHeader>
            </div>

            <div>
                {
                    gameSummaryData.isLoading
                        ? <LinearProgress />
                        : (
                            <>
                                {gameSummaryData.data.scoringPlays
                                    ? <ScoringSummary
                                        scoringPlays={gameSummaryData.data.scoringPlays}
                                        teams={gameSummaryData.data.leaders}
                                        awayTeamID={awayTeamID}
                                        homeTeamID={homeTeamID}
                                    />
                                    : <div>no summary available</div>
                                }

                                {/* ARTICLE SHORT INFO + LINK TO ESPN */}

                                <div>
                                    {gameSummaryData.data.article?.links?.web.href &&
                                        <S.EspnArticle><a href={gameSummaryData.data.article?.links?.web.href} target="blank">See article on ESPN </a>
                                            <span>
                                                {gameSummaryData.data.article?.headline}
                                            </span>
                                        </S.EspnArticle>
                                    }
                                </div>

                            </>
                        )
                } </div>
        </div>
    )
}