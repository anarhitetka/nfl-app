export function cleanUpJsonTeamRecords(arr) {
    const records = arr.reduce((accumulatorArr, el, currIndex) => {
        if (!accumulatorArr[currIndex]) {
            accumulatorArr[currIndex] = {};
        }

        accumulatorArr[currIndex].id = currIndex + el.name + 'ID';
        accumulatorArr[currIndex].name = el.name;
        accumulatorArr[currIndex].description = el.description ? el.description : el.name;
        accumulatorArr[currIndex].value = el.displayValue;
        accumulatorArr[currIndex].stats = el.stats.map(stat => {
            return { id: currIndex + stat.name + Math.floor(Math.random() * Math.floor(Math.random() * Date.now())), name: stat.displayName, value: stat.displayValue, abbreviation: stat.abbreviation }
        });

        return accumulatorArr;

    }, []);
    return records;
}

//////////////

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

///////////

const ENUMS_QUARTERS = {
    first: "1st Quarter",
    second: "2nd Quarter",
    third: "3rd Quarter",
    forth: "4th Quarter",
    overtime: "Overtime"
}

export function groupScoringPlaysInGameByQuarter(arr) {
    const quarters = arr.reduce((accumulatorObj, el) => {
        let qtr;

        switch (el.period.number) {
            case 1:
                qtr = ENUMS_QUARTERS.first;
                break;
            case 2:
                qtr = ENUMS_QUARTERS.second;
                break;
            case 3:
                qtr = ENUMS_QUARTERS.third;
                break;
            case 4:
                qtr = ENUMS_QUARTERS.forth;
                break;
            case 5:
                qtr = ENUMS_QUARTERS.overtime;
                break;
            default:
                qtr = "";
        }

        if (!accumulatorObj[qtr]) {
            accumulatorObj[qtr] = [];
        }

        accumulatorObj[qtr].push(el);

        return accumulatorObj;
    }, {});
    return quarters;
}

//////////////