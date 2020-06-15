var fs = require('fs')

var GetData = {
    renderdata: function (req, res) {
        var data = { todaydata: '' ,lastupdatedate:'', icondata:''};
        var par = JSON.parse(fs.readFileSync('public/json/LastUpdateDate.json', 'utf8'));
        data.lastupdatedate = par['lastupdatedate'];
        if(par['crawlingstatus']==true){
            data.icondata = '<button id="crawling_button" type="button" style="display:none"><i class="fa fa-refresh"></i></button>';
        }else{
            data.icondata = '<button id="crawling_button" type="button"><i class="fa fa-refresh"></i></button>'
        }
        // Parse brand.json
        var par = JSON.parse(fs.readFileSync('public/json/brand.json', 'utf8'));
        var jsondata = "";
        // Add Brand Information as array to dataArray
        for (var key in par) {
            var reviewst_jsondata = ''
            if(par[key]['ReviewStatus']=="Y"){
                reviewst_jsondata = '<td class="YesStatus">' + par[key]['ReviewStatus'] + '</td>'
            }else{
                reviewst_jsondata = '<td class="NoStatus">' + par[key]['ReviewStatus'] + '</td>'
            }
            var insta_url = 'http://www.instagram.com/'+par[key]['instaID'];
            jsondata += '<tr>'
                + '<td class="td_chk"><input type="checkbox" name="chkbox" value='+ key +'></td>'
                + '<td>' + key + '</td>'
                + '<td>' + par[key]['UpdateFeedNum'] + '</td>'
                + '<td>' + par[key]['TodayDownloadNum'] + '</td>'
                + '<td>' + par[key]['FeedNum'] + '</td>'
                + '<td>' + par[key]['NewFeedNum'] + '</td>'
                + '<td>' + par[key]['DownloadNum'] + '</td>'
                + '<td>' + par[key]['FollowerNum'] + '</td>'
                + '<td>' + '<a href="'+insta_url+'" class="fa fa-instagram"></a>'+ '</td>'
                + reviewst_jsondata
                + '<td>' + par[key]['Comment'] + '</td>' + '</tr>';
        }
        data.todaydata = jsondata;
        //  Rendering ejs with dataArrary
        res.render('GetFeed/TodayFeed.html', data);
    }
};
module.exports = GetData;