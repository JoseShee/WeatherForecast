// let Excel = require('exceljs');
//
// let wb = new Excel.Workbook();
// let path = require('path');
// let filePath = path.resolve(__dirname,'sample.xlsx');
// // let glbCityName = [];
// var cityMultipleValues = [];
//
// wb.xlsx.readFile(filePath).then(function (){
//     if(wb.xlsx.readFile(filePath)) {
//         let sh = wb.getWorksheet("Sheet1");
//
//         sh.getRow(1).getCell(2).value = 32;
//         wb.xlsx.writeFile("sample2.xlsx");
//         // console.log("Row-3 | Cell-2 - "+sh.getRow(3).getCell(2).value);
//
//         // console.log(sh.rowCount);
//         //Get all the rows data [1st and 2nd column]
//         for (let i = 1; i <= sh.rowCount; i++) {
//             // console.log(sh.getRow(i).getCell(1).value);
//             // console.log(sh.getRow(i).getCell(2).value);
//             cityMultipleValues.push(sh.getRow(i).getCell(1).value)
//         }
//         console.log("the array values are: " + cityMultipleValues)
//
//     }
// });
//