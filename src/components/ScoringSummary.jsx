import * as S from "./ScoringSummary.styled.js";

export default function ScoringSummary({ scoringPlays, teams, awayTeamID, homeTeamID }) {

    function groupByQuarter(arr) {
        const quarters = arr.reduce((accObj, el) => {
            let qtr;

            switch (el.period.number) {
                case 1:
                    qtr = "1st Quarter";
                    break;
                case 2:
                    qtr = "2nd Quarter";
                    break;
                case 3:
                    qtr = "3rd Quarter";
                    break;
                case 4:
                    qtr = "4th Quarter";
                    break;
                case 5:
                    qtr = "Overtime";
                    break;
                default:
                    qtr = "";
            }

            if (!accObj[qtr]) {
                accObj[qtr] = [];
            }

            accObj[qtr].push(el);

            return accObj;
        }, {});
        return quarters;
    }

    const plays = groupByQuarter(scoringPlays);

    const [awayTeam] = teams.filter(team => team.team.id === awayTeamID);
    const [homeTeam] = teams.filter(team => team.team.id === homeTeamID);

    return (
        <>
            {Object.keys(plays).map(key => {
                return (
                    <div key={`quarter${key}`}>
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
                                        <div>
                                            <img
                                                src={play.team.logo}
                                                height="25"
                                                alt="team logo"
                                            />
                                            <p>{play.type.abbreviation}</p>
                                            <p>{play.clock.displayValue}</p>
                                        </div>
                                        <p className="play-text">{play.text.toUpperCase()}</p>
                                        <p>
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
        </>
    );
}