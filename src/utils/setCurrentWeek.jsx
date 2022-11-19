export function setCurrentWeekNo(weeksData) {
  let current = weeksData.findIndex((week) => {
    return new Date() < new Date(week.endDate);
  });
  let weekNo;
  if (current) weekNo = current + 1;

  return weekNo;
}
