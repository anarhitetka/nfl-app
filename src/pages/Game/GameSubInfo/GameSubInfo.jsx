import * as S from "./GameSubInfo.styled";

export default function GameSubInfo({
    seasonType,
    playoffGameName,
    regularSeasonWeekNo,
    articleHeadline
}) {
    return (
        <S.WeekInfoHeader>
            {seasonType === 2 && (
                <p className="week-info-text">Week {regularSeasonWeekNo}</p>
            )}
            {seasonType === 3 && (
                <p className="week-info-text">{playoffGameName}</p>
            )}
            <p className="article-headline">{articleHeadline}</p>
        </S.WeekInfoHeader>
    );
}