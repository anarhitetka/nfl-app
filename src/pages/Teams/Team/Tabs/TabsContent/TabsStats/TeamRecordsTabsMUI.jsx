import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { cleanUpJsonTeamRecords } from '../../../../../../utils/cleanUpDataHelpers';

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

export default function TeamRecordsTabsMUI({ teamRecords: teamRecordsAll }) {
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

                        <div style={{ height: "65vh", overflowY: "scroll" }}>
                            <p>{record.description.toUpperCase()}: {record.value}</p>
                            <div>
                                STATS:
                                {
                                    record.stats.map(stat => {
                                        return (<div key={stat.id}>
                                            <p>{stat.name} - {stat.abbreviation} : {stat.value} </p>
                                        </div>);
                                    })
                                }
                            </div>
                        </div>

                    </TabPanel>
                );
            })}

        </Box>
    );
}