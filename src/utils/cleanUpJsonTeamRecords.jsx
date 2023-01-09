// return array
export default function cleanUpJsonTeamRecords(arr) {
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

// return object
// export default function cleanUpJsonTeamRecords(arr) {
//     const records = arr.reduce((accumulatorObj, el) => {
//         let record;
//         if (el.description) {
//             record = el.description;
//         } else if (el.name) {
//             record = el.name
//         } else {
//             record = "no record name found";
//         }

//         if (!accumulatorObj[record]) {
//             accumulatorObj[record] = {};
//         }

//         accumulatorObj[record].name = record;
//         accumulatorObj[record].value = el.displayValue;
//         accumulatorObj[record].stats = el.stats.map(stat => {
//             return { name: stat.displayName, value: stat.displayValue, abbreviation: stat.abbreviation }
//         });

//         return accumulatorObj;

//     }, {});
//     return records;
// }

