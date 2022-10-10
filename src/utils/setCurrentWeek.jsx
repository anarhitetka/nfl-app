export function setCurrentWeekNo({ weeksData }) {
  let current = weeksData.data.find((week) => {
    return new Date() < new Date(week.endDate);
  });
  let weekNo;
  if (current) weekNo = current.number;
  return weekNo;
}
