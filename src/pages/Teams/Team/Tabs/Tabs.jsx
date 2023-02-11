import { useState } from "react"
import TeamSchedule from "./TabsContent/TeamSchedule";
import TeamStats from "./TabsContent/TeamStats";
import styled from "styled-components";

const S = {};
S.TabsNavbar = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid grey;
    background-color: white;
    p {
        width: 100px;
        padding: 15px;
        margin: 0px;
        text-align: center;
        cursor: pointer;
    }
    .active {
        border-bottom: 2px solid grey;
        font-weight: 700;
    }
    @media (max-width: 250px) {
        p {
            font-size: 13px;
            padding: 15px 5px;
        }
    }
`;

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
        <div>
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
            <div>
                {activeTab === "team-schedule"
                    ? (
                        <TeamSchedule eventsRegularSeason={eventsRegularSeason} teamId={teamId} eventsPostSeason={eventsPostSeason} />
                    )
                    : (
                        <TeamStats teamRecords={teamRecords} />
                    )}
            </div>
        </div>
    )
}