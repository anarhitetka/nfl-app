import { ApiCalls } from "../../utils/apiCalls";
import GameOnTeamSchedule from "./GameOnTeamSchedule/GameOnTeamSchedule";
import GameOnWeekList from "./GameOnWeekList/GameOnWeekList";

export default function Game({ event, weekNo, teamId, type, postSeason }) {

  const {
    scoreAwayTeam, scoreHomeTeam, scoreIsFinal, homeTeamID, awayTeamID, error
  } = ApiCalls.getTeamsInfoForEvent(event.$ref);

  const awayTeamData = ApiCalls.getTeamData(awayTeamID);
  const homeTeamData = ApiCalls.getTeamData(homeTeamID);

  return (
    <>
      {type === "team-game" ? (
        <GameOnTeamSchedule
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
          postSeason={postSeason}
        />
      ) : (
        <GameOnWeekList
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
