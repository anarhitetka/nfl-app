import TeamRecordsTabsMUI from "./TabsStats/TeamRecordsTabsMUI";
import { CircularProgress } from "@mui/material";

export default function TeamStats({ teamRecords }) {
    return (
        <div style={{ minWidth: "60%", paddingTop: "15px" }}>
            {teamRecords.isLoading ? (
                <CircularProgress />
            ) : (
                <TeamRecordsTabsMUI teamRecords={teamRecords} />
            )}

        </div>
    )
}