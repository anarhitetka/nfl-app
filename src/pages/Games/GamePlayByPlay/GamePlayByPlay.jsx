import { useParams, useLocation } from "react-router-dom";
import { ApiCalls } from "../../../utils/apiCalls";
import LinearProgress from '@mui/material/LinearProgress';
import ScoringSummary from '../../../components/GameScoringSummary/ScoringSummary';

import * as S from './GamePlayByPlay.styled';


export default function GamePlayByPlay() {
    const { eventId } = useParams();

    const location = useLocation();
    const { from } = location.state;
    const awayTeamID = from.awayTeamID;
    const homeTeamID = from.homeTeamID;
    const awayTeamData = from.awayTeamData;
    const homeTeamData = from.homeTeamData;

    const gameSummaryData = ApiCalls.getGameSummary(eventId);

    return (
        <div style={{ backgroundColor: "white", minHeight: "100vh", padding: "0 10px", textAlign: "center" }}>
            <div>

                <S.TeamHeader>
                    <div className="main-header-teams">

                        <div
                            style={{ backgroundColor: "#" + awayTeamData.data.team.color, color: "white" }}
                        >
                            <h5>{awayTeamData.data.team.displayName}</h5>
                            <S.TeamLink to={`/teams/${awayTeamID}`}>
                                <img
                                    src={awayTeamData.data.team.logos[0].href}
                                    height="150"
                                    alt="team logo"
                                />
                            </S.TeamLink>
                            <p>{awayTeamData.data.team.standingSummary}</p>
                        </div>

                        @
                        <div style={{ backgroundColor: "#" + homeTeamData.data.team.color, color: "white" }}>
                            <h5>{homeTeamData.data.team.displayName}</h5>
                            <S.TeamLink to={`/teams/${homeTeamID}`}>
                                <img
                                    src={homeTeamData.data.team.logos[0].href}
                                    height="150"
                                    alt="team logo"
                                />
                            </S.TeamLink>
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