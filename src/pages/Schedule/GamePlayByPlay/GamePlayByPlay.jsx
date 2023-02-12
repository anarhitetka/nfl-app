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
        <S.PlayByPlayPageContainer>
            <S.TeamHeader>
                <div className="main-header-teams">
                    <S.SingleTeamHeaderCard>
                        <h5>{awayTeamData.data.team.displayName}</h5>
                        <S.TeamLink to={`/teams/${awayTeamID}`}>
                            <img
                                src={awayTeamData.data.team.logos[0].href}
                                height="150"
                                alt="team logo"
                            />
                        </S.TeamLink>
                        <span className="tooltip">{awayTeamData.data.team.displayName}</span>
                        <p>{awayTeamData.data.team.standingSummary}</p>
                    </S.SingleTeamHeaderCard>

                    <span className="at-sign">@</span>

                    <S.SingleTeamHeaderCard>
                        <h5>{homeTeamData.data.team.displayName}</h5>
                        <S.TeamLink to={`/teams/${homeTeamID}`}>
                            <img
                                src={homeTeamData.data.team.logos[0].href}
                                height="150"
                                alt="team logo"
                            />
                        </S.TeamLink>
                        <span className="tooltip">{homeTeamData.data.team.displayName}</span>
                        <p>{homeTeamData.data.team.standingSummary}</p>
                    </S.SingleTeamHeaderCard>
                </div>
            </S.TeamHeader>

            <div>
                {
                    gameSummaryData.isLoading
                        ? <LinearProgress />
                        : (
                            <S.SummaryWrapper>
                                <S.GameHeadline>
                                    {gameSummaryData.data.article?.headline}
                                </S.GameHeadline>
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