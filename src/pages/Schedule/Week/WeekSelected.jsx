import { ApiCalls } from "../../../utils/apiCalls";
import { groupByDayOfTheWeek } from "../../../utils/cleanUpDataHelpers";
import TeamsOnBye from "./TeamsOnBye/TeamsOnBye";
import GameCard from "./GameCard/GameCard";
import { CircularProgress } from "@mui/material";
import * as S from "./WeekSelected.styled";

export default function WeekSelected({ weekNo, durationRegSeason }) {

  const allGamesData = ApiCalls.getEventsForWeek(weekNo, durationRegSeason);
  const teamsOnBye = ApiCalls.getTeamsOnByeForWeekNo(weekNo, durationRegSeason);
  const groupGamesByDayOfTheWeek = groupByDayOfTheWeek(allGamesData.data);

  const formatDate = function (dateStr) {
    return `${new Date(dateStr).toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      dateStyle: "medium",
    })}`;
  };

  return (
    <div style={{ minHeight: "90vh" }}>

      <TeamsOnBye weekNo={weekNo} teamsOnBye={teamsOnBye} />

      {
        allGamesData.isLoading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <CircularProgress />
          </div>
        ) : (
          <S.AllGamesContainer>
            {Object.keys(groupGamesByDayOfTheWeek).map((key) => {
              return (
                <div key={key}>
                  <S.DayHeading>
                    {key.toUpperCase()}, {formatDate(groupGamesByDayOfTheWeek[key][0].date).toUpperCase()}
                  </S.DayHeading>
                  <S.GamesByDayGroup>
                    {groupGamesByDayOfTheWeek[key].map(game => {
                      return (
                        <GameCard
                          event={game}
                          key={`${game.id}-${Math.random().toString()}`}
                          weekNo={weekNo}
                        />
                      )
                    })}
                  </S.GamesByDayGroup>
                </div>
              )
            })}
          </S.AllGamesContainer>
        )
      }
    </div>
  );
}
