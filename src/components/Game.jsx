import { ApiCalls } from "../utils/apiCalls";
import GamePreview from "./GamePreview";
import GameDetails from "./GameDetails";

export default function Game({ event, weekNo, teamId, type }) {

  const {
    scoreAwayTeam, scoreHomeTeam, scoreIsFinal, homeTeamID, awayTeamID, error
  } = ApiCalls.getTeamsInfoForEvent(event.$ref);

  const awayTeamData = ApiCalls.getTeamData(awayTeamID);
  const homeTeamData = ApiCalls.getTeamData(homeTeamID);

  return (
    <>
      {type === "preview" ? (
        <GamePreview
          awayTeamData={awayTeamData}
          homeTeamData={homeTeamData}
          event={event}
          teamId={teamId}
          awayTeamID={awayTeamID}
          homeTeamID={homeTeamID}
          scoreIsFinal={scoreIsFinal}
          scoreAwayTeam={scoreAwayTeam}
          scoreHomeTeam={scoreHomeTeam}
          error={error}
        />
      ) : (
        <GameDetails
          awayTeamData={awayTeamData}
          homeTeamData={homeTeamData}
          event={event}
          awayTeamID={awayTeamID}
          homeTeamID={homeTeamID}
          scoreIsFinal={scoreIsFinal}
          scoreAwayTeam={scoreAwayTeam}
          scoreHomeTeam={scoreHomeTeam}
          weekNo={weekNo}
          errorInFetching={error}
        />
      )}
    </>
  );
}
