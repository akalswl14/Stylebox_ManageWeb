var express = require('express');
var router = express.Router();
var fs = require('fs');

/**
* BaseUrl :/getfeed
*/

var CheckUpdate = require('./CheckUpdate');
var UpdateData = require('./UpdateData');
var SelectFeed = require('./SelectFeed');
var GetTodayData = require('./GetTodayData');

router.get('/', function (req, res) {
    // CheckUpdate.checkdate(req,res);
    GetTodayData.renderdata(req, res);
});

router.post('/', function (req, res) {
    if (req.body.act_button == "view details") {
        console.log(req.body);
        if (typeof (req.body.chkbox) == 'string') {
            brandnum = 1;
            brandList = new Array(req.body.chkbox)
        } else {
            brandList = req.body.chkbox;
            brandnum = brandList.length;
        }
        queryData = ''
        for (i = 0; i < brandnum; i++) {
            queryData += 'brand[]=' + brandList[i];
            if (i < brandnum - 1) {
                queryData += '&'
            }
        }
        res.redirect('/getfeed/selectfeed?' + queryData);
    } else {
        var par = JSON.parse(fs.readFileSync('public/json/LastUpdateDate.json', 'utf8'));
        if (par['crawlingstatus'] == true) {
            res.redirect('/');
        } else {
            if (req.body.act_button == "modify reviewstatus") {
                UpdateData.update_reviewstatus(req, res);
            } else if (req.body.act_button == "modify comments") {
                UpdateData.update_comments(req, res);
            } else if (req.body.act_button == "delete brand") {
                UpdateData.delete_brand(req, res);
            }
        }

    }
});
router.get('/selectfeed', function (req, res) {
    SelectFeed.getembed(req, res);
});

router.get('/crawlingstatus', function (req, res) {
    CheckUpdate.checkstatus(req, res);
})
module.exports = router;