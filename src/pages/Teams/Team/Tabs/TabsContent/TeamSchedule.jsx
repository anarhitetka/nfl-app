import Game from "../../../../../components/Game/Game";

export default function TeamSchedule({ teamId, eventsRegularSeason, eventsPostSeason }) {

    return (
        <div>
            {eventsRegularSeason.map((event) => {
                return (
                    <Game
                        event={event}
                        key={`game-${event.id}-team-${teamId}`}
                        weekNo={true}
                        teamId={teamId}
                        type="preview"
                    />
                );
            })}
            {eventsPostSeason.length > 0 && "POST-SEASON GAMES:"}
            {eventsPostSeason.length > 0 && (
                eventsPostSeason.map((event) => {
                    return (
                        <Game
                            event={event}
                            key={`game-${event.id}---team-${teamId}`}
                            weekNo={true}
                            teamId={teamId}
                            type="preview"
                        />

                    );
                })
            )}
        </div>
    )
}