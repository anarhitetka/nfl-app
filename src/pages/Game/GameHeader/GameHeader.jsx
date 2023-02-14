import * as S from "./GameHeader.styled";

export default function GameHeader({ awayTeamID, awayTeamData, homeTeamID, homeTeamData }) {
    return (
        <S.TeamHeader>
            <div className="main-header-teams">
                <S.SingleTeamHeaderCard>
                    <S.TeamLink to={`/teams/${awayTeamID}`}>
                        <div className="img-container">
                            <img
                                src={awayTeamData.data.team.logos[0].href}
                                height="150"
                                alt="team logo"
                            />
                        </div>
                        <h5>{awayTeamData.data.team.displayName.toUpperCase()}</h5>
                    </S.TeamLink>
                    <span className="tooltip">{awayTeamData.data.team.displayName}</span>
                    <p>{awayTeamData.data.team.standingSummary}</p>
                </S.SingleTeamHeaderCard>

                <span className="at-sign">@</span>

                <S.SingleTeamHeaderCard>
                    <S.TeamLink to={`/teams/${homeTeamID}`}>
                        <div className="img-container">
                            <img
                                src={homeTeamData.data.team.logos[0].href}
                                height="150"
                                alt="team logo"
                            />
                        </div>
                        <h5>{homeTeamData.data.team.displayName.toUpperCase()}</h5>
                    </S.TeamLink>
                    <span className="tooltip">{homeTeamData.data.team.displayName}</span>
                    <p>{homeTeamData.data.team.standingSummary}</p>
                </S.SingleTeamHeaderCard>
            </div>
        </S.TeamHeader>
    )
}