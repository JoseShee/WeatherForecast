const csv = require('csv-parser')
const fs = require('fs')
let results = [];
let output = [];

getCityNameData =() => {
    fs.createReadStream('data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // let val1 = results;
            console.log(results);
            return results;
            // return results;
        })

}

getCityNameData()
// let val1 = getCityNameData()
// module.exports.fnName = getCityNameData()
// module.exports.csvDD = () => getCityNameData()
// console.log(results)
module.exports

