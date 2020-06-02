var fs = require('fs')
var GetTodayData = require('./GetTodayData')
var crawling = require('./crawling')

var date = new Date();
var year = date.getFullYear();
var month = new String(date.getMonth() + 1);
var day = new String(date.getDate());

if (month.length == 1) {
    month = "0" + month;
}
if (day.length == 1) {
    day = "0" + day;
}
TodayDate = year +'-'+ month +'-'+ day;

var checkupdate = {
    checkdate: function (req, res) {
        var par = JSON.parse(fs.readFileSync('public/json/LastUpdateDate.json', 'utf8'));
        if (par['lastupdatedate'] == TodayDate) {
            GetTodayData.renderdata(req, res);
        } else {
            console.log('Not Same Date. Crawling Started');
            crawling.runcrawling(req, res);
        }
    }
};
module.exports = checkupdate;