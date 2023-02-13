import * as React from 'react';
import { cleanUpJsonTeamRecords } from '../../../../utils/cleanUpDataHelpers';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const S = {};
S.Stats = styled.div`
    font-size: 0.9rem;
    min-height: 60vh;
    .record-description {
        font-weight: 700;
        padding-bottom: 3px;
        border-bottom: 1px solid black;
    }
    .stat-line {
        border-bottom: 1px solid #B5BFCA;
        display: flex;
        justify-content: space-between;
        p {
            margin: 0;
            padding: 5px 0;
        }
        @media (max-width: 500px) {
            font-size: 0.7rem;
        }
        @media (max-width: 290px) {
            flex-direction: column;
        }
    }
    .stat-value {
        font-weight: 500;
    }
`;

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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`team-records-tabpanel-${index}`}
            aria-labelledby={`team-records-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `team-records-tab-${index}`,
        'aria-controls': `team-records-tabpanel-${index}`,
    };
}

function TeamRecordsTabsMUI({ teamRecords: teamRecordsAll }) {
    const [value, setValue] = React.useState(0);

    const teamRecords = cleanUpJsonTeamRecords(teamRecordsAll);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', backgroundColor: "white" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="team records tabs" variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    {teamRecords.map((record, i) => {
                        return (
                            <Tab
                                label={record.name}
                                key={`${i}-${record.id}-tab`}
                                {...a11yProps(i)}
                                wrapped
                            />
                        )
                    })}
                </Tabs>
            </Box>
            {teamRecords.map((record, i) => {
                return (
                    <TabPanel value={value} index={i} key={`${record.id}-tab-content`}>
                        <S.Stats>
                            <p className="record-description">{record.description.toUpperCase()}: {record.value}</p>
                            <div>
                                {
                                    record.stats.map(stat => {
                                        return (<div key={stat.id} className="stat-line">
                                            <p >{stat.name} ({stat.abbreviation})</p>
                                            <p className="stat-value">{stat.value}</p>
                                        </div>);
                                    })
                                }
                            </div>
                        </S.Stats>
                    </TabPanel>
                );
            })}
        </Box>
    );
}