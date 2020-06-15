var fs = require('fs');
var XLSX = require('XLSX');
var EditJson = require('./EditJson');

var BrandExcel = {
    upload: function (req, res) {
        const workbook = XLSX.readFile('public/excel/brand.xlsx');
        var json_data = {}
        let i = workbook.SheetNames.length;
        while (i--) {
            const sheetname = workbook.SheetNames[i];
            json_data[sheetname] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname]);
        }
        // fs.writeFileSync('public/json/parse_brand.json', JSON.stringify(json_data), 'utf-8');
        EditJson.edit_brandexcel(json_data, res);
    }
};
module.exports = BrandExcel;