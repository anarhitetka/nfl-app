import { CircularProgress } from "@mui/material";
import * as S from "./TeamsOnBye.styled";

export default function TeamsOnBye({ teamsOnBye, weekNo }) {
    return (
        <S.TeamsOnByeContainer>
            {!teamsOnBye.isLoading && teamsOnBye.data.length !== 0 ? (
                teamsOnBye.isLoading ? (
                    <CircularProgress />
                ) : (
                    <div>
                        <span>TEAMS ON BYE (WEEK {weekNo}): </span>
                        {teamsOnBye.data.map((team, i, arr) => {
                            return (
                                <span key={`team-on-bye-${team.id}`} >{team.displayName.toUpperCase()}{i !== arr.length - 1 ? ', ' : ''} </span>
                            )
                        })}
                    </div>
                )
            ) : (weekNo > 18 ? "" : <em>NO TEAMS ON BYE FOR SELECTED WEEK</em>)}
        </S.TeamsOnByeContainer>
    );
}