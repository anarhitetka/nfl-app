import { useState } from "react"
import TabsNavbarItem from "../../../components/Tabs/TabsNavbarItem";
import TabContentItem from "../../../components/Tabs/TabContentItem";
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

    const teamTabs = [
        { id: "team-schedule", title: "Schedule" },
        { id: "team-stats", title: "Stats" }
    ];

    return (
        <S.TabsComponentWrapper>
            <S.TabsNavbar>
                {teamTabs.map(tab => {
                    return (
                        <TabsNavbarItem
                            id={tab.id}
                            title={tab.title.toUpperCase()}
                            key={tab.id}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    )
                })}
            </S.TabsNavbar>
            <S.TabContent>
                <TabContentItem
                    id="team-schedule"
                    activeTab={activeTab}
                    children={
                        <TeamSchedule eventsRegularSeason={eventsRegularSeason} teamId={teamId} eventsPostSeason={eventsPostSeason} />
                    }
                />
                <TabContentItem
                    id="team-stats"
                    activeTab={activeTab}
                    children={
                        <TeamStats teamRecords={teamRecords} />
                    }
                />
            </S.TabContent>
        </S.TabsComponentWrapper>
    )
}