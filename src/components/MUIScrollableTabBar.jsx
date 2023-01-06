import * as React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function MUIScrollableTabBar({ weeksData, currentWeek }) {
  const { weekNo } = useParams();

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (currentWeek !== 0) {
      setValue(Number(currentWeek) - 1);
    }
    if (!isNaN(weekNo)) {
      setValue(Number(weekNo) - 1);
    }
  }, [currentWeek, weekNo]);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/weeks/${newValue + 1}`);
  };

  const formatDate = function (dateStr) {
    return `${new Date(dateStr).toLocaleString(undefined, {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      day: "numeric",
      month: "short",
    })}`;
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: 300, sm: 600, md: 900, lg: 1100 },
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#013369",
          },
        }}
        sx={{
          "& button:hover": {
            color: "#002147",
          },
        }}
      >
        {weeksData.map((week) => {
          return (
            <Tab
              label={
                <Box>
                  <Typography variant="button">{week.text}</Typography>
                  <br />
                  <Typography variant="caption">
                    {formatDate(week.startDate)} - {formatDate(week.endDate)}
                  </Typography>
                </Box>
              }
              key={`${week.text}`}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
