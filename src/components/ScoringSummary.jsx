import * as S from "./ScoringSummary.styled.js";
import { groupScoringPlaysInGameByQuarter } from '../utils/groupScoringPlaysInGameByQuarter';

export default function ScoringSummary({ scoringPlays, teams, awayTeamID, homeTeamID }) {

    const plays = groupScoringPlaysInGameByQuarter(scoringPlays);

    const [awayTeam] = teams.filter(team => team.team.id === awayTeamID);
    const [homeTeam] = teams.filter(team => team.team.id === homeTeamID);

    return (
        <S.SummaryContainer>
            {Object.keys(plays).map(key => {
                return (
                    <div key={`quarter${key}`} >
                        <S.QuarterHeaderRow>
                            <p>{key.toUpperCase()}</p>
                            <p>
                                <span>{awayTeam.team.abbreviation}</span>
                                <span>{homeTeam.team.abbreviation}</span>
                            </p>
                        </S.QuarterHeaderRow>
                        <hr style={{ margin: "0" }} />

                        {/* ITERATE OVER ARRAY OF PLAYS  */}
                        {plays[key].map(play => {
                            return (
                                <div key={play.id}>
                                    <S.PlayRow>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <div>
                                                <img
                                                    src={play.team.logo}
                                                    height="25"
                                                    alt="team logo"
                                                />
                                            </div>
                                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                                <div>
                                                    <p>{play.type.abbreviation}</p>
                                                    <p>{play.clock.displayValue}</p>
                                                </div>
                                                <p className="play-text">{play.text.toUpperCase()}</p>
                                            </div>
                                        </div>
                                        <p className="scores">
                                            <span>{play.awayScore}</span>
                                            <span>{play.homeScore}</span>
                                        </p>
                                    </S.PlayRow>
                                    <hr style={{ margin: "0", height: "1px", border: "none", background: "#D3D3D3" }} />
                                </div>
                            )
                        })}
                    </div>
                );
            })}
        </S.SummaryContainer>
    );
}