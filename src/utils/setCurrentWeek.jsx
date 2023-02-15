export function setCurrentWeekNo(weeksData) {
  let current = weeksData.findIndex((week) => {
    return new Date() < new Date(week.endDate);
  });
  let weekNo;
  // eslint-disable-next-line
  if (current == -1) weekNo = 1;
  // eslint-disable-next-line
  else if (current != -1) weekNo = current + 1;
  return weekNo;
}
