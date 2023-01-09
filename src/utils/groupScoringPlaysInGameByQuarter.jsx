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