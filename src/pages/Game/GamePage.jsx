import { useParams, useLocation } from "react-router-dom";
import { ApiCalls } from "../../utils/apiCalls";
import LinearProgress from '@mui/material/LinearProgress';
import GameHeader from "./GameHeader/GameHeader";
import GameSubInfo from "./GameSubInfo/GameSubInfo";
import ScoringSummary from "./GameScoringSummary/ScoringSummary";

import * as S from './GamePage.styled';

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
        <S.PlayByPlayPageContainer>
            <GameHeader
                awayTeamID={awayTeamID}
                homeTeamID={homeTeamID}
                awayTeamData={awayTeamData}
                homeTeamData={homeTeamData}
            />

            <div>
                {
                    gameSummaryData.isLoading
                        ? <LinearProgress />
                        : (
                            <S.SummaryWrapper>
                                <GameSubInfo
                                    seasonType={gameSummaryData.data.header.season.type}
                                    playoffGameName={gameSummaryData.data.header.gameNote}
                                    regularSeasonWeekNo={gameSummaryData.data.header.week}
                                    articleHeadline={gameSummaryData.data.article?.headline}
                                />
                                {gameSummaryData.data.scoringPlays
                                    ? <ScoringSummary
                                        scoringPlays={gameSummaryData.data.scoringPlays}
                                        teams={gameSummaryData.data.leaders}
                                        awayTeamID={awayTeamID}
                                        homeTeamID={homeTeamID}
                                    />
                                    : <div>no summary available</div>
                                }
                            </S.SummaryWrapper>
                        )
                }
            </div>
        </S.PlayByPlayPageContainer>
    )
}