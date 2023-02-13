import * as S from "./TeamHeader.styled";

export default function TeamHeader({ teamData }) {
    return (
        <S.TeamHeader>
            <div>
                <S.TeamName>{teamData.data.team.displayName}</S.TeamName>
                <p>{teamData.data.team.standingSummary}</p>
            </div>
            <img
                src={teamData.data.team.logos[0].href}
                height="150"
                alt="team logo"
            />
        </S.TeamHeader>
    )
}