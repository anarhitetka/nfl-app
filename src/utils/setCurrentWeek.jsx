export function setCurrentWeekNo(weeksData) {
  let current = weeksData.data.findIndex((week) => {
    return new Date() < new Date(week.endDate);
  });
  let weekNo;
  // if (current) weekNo = current.number;
  if (current) weekNo = current + 1;

  return weekNo;
}
