import { useState } from "react"
import TeamSchedule from "./TabsContent/TeamSchedule";
import TeamStats from "./TabsContent/TeamStats";
import * as S from "./Tabs.styled";

export default function Tabs({
    teamId,
    eventsRegularSeason,
    eventsPostSeason,
    teamRecords
}) {
    const [activeTab, setActiveTab] = useState("team-schedule");

    const handleTabSchedule = () => setActiveTab("team-schedule");
    const handleTabStats = () => setActiveTab("team-stats");

    return (
        <S.TabsComponentWrapper>
            <S.TabsNavbar>
                <p
                    className={activeTab === 'team-schedule' ? "active" : ""}
                    onClick={handleTabSchedule} >SCHEDULE
                </p>
                <p
                    className={activeTab === 'team-stats' ? "active" : ""}
                    onClick={handleTabStats} >STATS
                </p>

            </S.TabsNavbar>
            <S.TabContent>
                {activeTab === "team-schedule"
                    ? (
                        <TeamSchedule eventsRegularSeason={eventsRegularSeason} teamId={teamId} eventsPostSeason={eventsPostSeason} />
                    )
                    : (
                        <TeamStats teamRecords={teamRecords} />
                    )}
            </S.TabContent>
        </S.TabsComponentWrapper>
    )
}