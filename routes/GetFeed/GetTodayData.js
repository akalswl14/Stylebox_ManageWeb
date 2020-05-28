var fs = require('fs')

var GetData = {
    renderdata: function (req, res) {
        // 브랜드 정보 있는 brand.json 파싱
        var par = JSON.parse(fs.readFileSync('public/json/brand.json', 'utf8'));
        var data = { todaydata: '' };
        var jsondata = "";
        // 브랜드 정보를 dataArray에 array로 추가
        for (var key in par) {
            if (par[key]['NewFeedNum']==0){
                continue
            }
            var reviewst_jsondata = ''
            if(par[key]['ReviewStatus']=="Y"){
                reviewst_jsondata = '<td class="YesStatus">' + par[key]['ReviewStatus'] + '</td>'
            }else{
                reviewst_jsondata = '<td class="NoStatus">' + par[key]['ReviewStatus'] + '</td>'
            }
            jsondata += '<tr>'
                + '<td class="td_chk"><input type="checkbox" name="chkbox" value='+ key +'></td>'
                + '<td>' + key + '</td>'
                + '<td>' + par[key]['NewFeedNum'] + '</td>'
                + '<td>' + par[key]['TodayDownloadNum'] + '</td>'
                + reviewst_jsondata
                + '<td>' + par[key]['Comment'] + '</td>' + '</tr>';
        }
        data.todaydata = jsondata;
        //  dataArrary ejs로 추가해서 rendering
        res.render('GetFeed/TodayFeed.html', data);
    }
};
module.exports = GetData;