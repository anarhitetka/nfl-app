import GameCardForTeam from "./GameCardForTeam";
import styled from "styled-components";

const S = {};
S.SeasonHeading = styled.h4`
  padding-left: 9vw;
  margin: 25px 0 15px 0;
  color: #013369;
  @media (min-width: 1000px) {
    padding-left: 30px;
  }
`;
S.SeasonContainer = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
`;

export default function TeamSchedule({ teamId, eventsRegularSeason, eventsPostSeason }) {

    return (
        <div>
            <S.SeasonHeading>Regular season</S.SeasonHeading>
            <S.SeasonContainer>
                {eventsRegularSeason.map((event) => {
                    return (
                        <GameCardForTeam
                            key={`game-${event.id}-team-${teamId}`}
                            event={event}
                            teamId={teamId}
                        />
                    );
                })}
            </S.SeasonContainer>
            {eventsPostSeason.length > 0 && <S.SeasonHeading>Post season</S.SeasonHeading>}
            <S.SeasonContainer>
                {eventsPostSeason.length > 0 && (
                    eventsPostSeason.map((event) => {
                        return (
                            <GameCardForTeam
                                key={`game-${event.id}-team-${teamId}`}
                                event={event}
                                teamId={teamId}
                            />

                        );
                    })
                )}
            </S.SeasonContainer>
        </div>
    )
}