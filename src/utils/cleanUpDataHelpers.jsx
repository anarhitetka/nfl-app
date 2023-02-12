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
    first: "1st QTR",
    second: "2nd QTR",
    third: "3rd QTR",
    forth: "4th QTR",
    overtime: "OT"
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

export function formatPlayoffsGamesNames(weekNum) {
    let playoffGameName;
    switch (weekNum) {
        case 1:
            playoffGameName = "Wild Card";
            break;
        case 2:
            playoffGameName = "Divisional Round";
            break;
        case 3:
            playoffGameName = "Conf Championship";
            break;
        case 4:
            playoffGameName = "ProBowl";
            break;
        case 5:
            playoffGameName = "Super Bowl";
            break;
        default:
            playoffGameName = null;
    }
    return playoffGameName;
}