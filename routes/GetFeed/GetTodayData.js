var fs = require('fs')

var GetData = {
    renderdata: function (req, res) {
        // Parse brand.json
        var par = JSON.parse(fs.readFileSync('public/json/brand.json', 'utf8'));
        var data = { todaydata: '' };
        var jsondata = "";
        // Add Brand Information as array to dataArray
        for (var key in par) {
            var reviewst_jsondata = ''
            if(par[key]['ReviewStatus']=="Y"){
                reviewst_jsondata = '<td class="YesStatus">' + par[key]['ReviewStatus'] + '</td>'
            }else{
                reviewst_jsondata = '<td class="NoStatus">' + par[key]['ReviewStatus'] + '</td>'
            }
            jsondata += '<tr>'
                + '<td class="td_chk"><input type="checkbox" name="chkbox" value='+ key +'></td>'
                + '<td>' + key + '</td>'
                + '<td>' + par[key]['UpdateFeedNum'] + '</td>'
                + '<td>' + par[key]['TodayDownloadNum'] + '</td>'
                + '<td>' + par[key]['NewFeedNum'] + '</td>'
                + '<td>' + par[key]['DownloadNum'] + '</td>'
                + '<td>' + par[key]['FollowerNum'] + '</td>'
                + '<td>' + par[key]['instaID'] + '</td>'
                + reviewst_jsondata
                + '<td>' + par[key]['Comment'] + '</td>' + '</tr>';
        }
        data.todaydata = jsondata;
        //  Rendering ejs with dataArrary
        res.render('GetFeed/TodayFeed.html', data);
    }
};
module.exports = GetData;