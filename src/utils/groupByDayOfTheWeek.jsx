function setDayOfTheWeek(dateStr) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const date = new Date(dateStr);
    let day = weekday[date.getDay()];
    return day;
}

export function groupByDayOfTheWeek(dataArr) {
    dataArr.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    const groups = dataArr.reduce((accObj, arrItem) => {
        const dayOfTheWeek = setDayOfTheWeek(arrItem.date);

        if (!accObj[dayOfTheWeek]) {
            accObj[dayOfTheWeek] = [];
        }

        accObj[dayOfTheWeek].push(arrItem);

        return accObj;
    }, {});

    return groups;
}