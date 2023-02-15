export function setCurrentWeekNo(weeksData) {
  let current = weeksData.findIndex((week) => {
    return new Date() < new Date(week.endDate);
  });
  let weekNo;
  let duration = weeksData.length > 0 ? weeksData.length : 1;
  // eslint-disable-next-line
  if (current == -1) weekNo = duration;
  // eslint-disable-next-line
  else if (current != -1) weekNo = current + 1;
  return weekNo;
}
