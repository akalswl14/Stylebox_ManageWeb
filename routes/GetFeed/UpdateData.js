var fs = require('fs')
var GetTodayData = require('./GetTodayData');

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
TodayDate = year + '-' + month + '-' + day;
const UpdateCrawlingFeed = (BrandList) => {
    console.log('UpdateCrawlingFeed')
    var DataBuffer = fs.readFileSync('public/json/CrawlingFeed.json');
    var CrawlingData = JSON.parse(DataBuffer.toString());
    FeedIdList = Object.keys(CrawlingData)
    Len_FeedList = FeedIdList.length;
    for (var i = 0; i < Len_FeedList; i++) {
        var FeedId = FeedIdList[i];
        if(BrandList.includes(CrawlingData[FeedId]['brand'])){
            CrawlingData[FeedId]['Check'] = true;
        }
    }
    fs.writeFileSync('public/json/CrawlingFeed.json', JSON.stringify(CrawlingData), 'utf-8');
};
var UpdateData = {
    update_date: function (req, res) {
        var json_data = { 'lastupdatedate': TodayDate }
        fs.writeFileSync('public/json/LastUpdateDate.json', JSON.stringify(json_data), 'utf-8');
        GetTodayData.renderdata(req, res);
    },
    update_date_toYesterday: function (req, res) {
        var selectDate = TodayDate.split("-");
        var changeDate = new Date();
        changeDate.setFullYear(selectDate[0], selectDate[1] - 1, selectDate[2] - 1);
        var y = changeDate.getFullYear();
        var m = changeDate.getMonth() + 1;
        var d = changeDate.getDate();
        if (m < 10) { m = "0" + m; }
        if (d < 10) { d = "0" + d; }
        var YesterdayDate = y + "-" + m + "-" + d;
        var json_data = { 'lastupdatedate': YesterdayDate }
        fs.writeFileSync('public/json/LastUpdateDate.json', JSON.stringify(json_data), 'utf-8');
        res.redirect('/getfeed');
    },
    update_reviewstatus: function (req, res) {
        BrandList = req.body.chkbox;
        const DataBuffer = fs.readFileSync('public/json/brand.json');
        var JsonData = JSON.parse(DataBuffer.toString());
        if (typeof (BrandList) === 'string') {
            CurrentStatus = JsonData[BrandList].ReviewStatus;
            if (CurrentStatus == "Y") {
                JsonData[BrandList].ReviewStatus = "N"
            } else {
                JsonData[BrandList].ReviewStatus = "Y"
            }
            BrandList = [BrandList];
        } else {
            for (i = 0; i < BrandList.length; i++) {
                CurrentStatus = JsonData[BrandList[i]].ReviewStatus;
                if (CurrentStatus == "Y") {
                    JsonData[BrandList[i]].ReviewStatus = "N"
                } else {
                    JsonData[BrandList[i]].ReviewStatus = "Y"
                }
            }
        }
        UpdateCrawlingFeed(BrandList);
        fs.writeFileSync('public/json/brand.json', JSON.stringify(JsonData), 'utf-8');
        GetTodayData.renderdata(req, res);
    },
    update_comments: function (req, res) {
        input_comments = req.body.input_comments;
        BrandList = req.body.chkbox;
        const DataBuffer = fs.readFileSync('public/json/brand.json');
        var JsonData = JSON.parse(DataBuffer.toString());
        if (typeof (BrandList) === 'string') {
            JsonData[BrandList].Comment = input_comments;
        } else {
            for (i = 0; i < BrandList.length; i++) {
                JsonData[BrandList[i]].Comment = input_comments;
            }
        }
        fs.writeFileSync('public/json/brand.json', JSON.stringify(JsonData), 'utf-8');
        GetTodayData.renderdata(req, res);
    },
    delete_brand: function (req, res) {
        BrandList = req.body.chkbox;
        const DataBuffer = fs.readFileSync('public/json/brand.json');
        var JsonData = JSON.parse(DataBuffer.toString());
        if (typeof (BrandList) === 'string') {
            delete JsonData[BrandList];
        } else {
            for (i = 0; i < BrandList.length; i++) {
                delete JsonData[BrandList[i]];
            }
        }
        fs.writeFileSync('public/json/brand.json', JSON.stringify(JsonData), 'utf-8');
        GetTodayData.renderdata(req, res);
    }
};
module.exports = UpdateData;