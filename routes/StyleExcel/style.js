var express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require("path");

let storage = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "public/excel/")
    },
    filename: function(req, file, callback){
        let extension = path.extname(file.originalname);
        callback(null, 'style' + extension);
    }
});

let upload = multer({ storage: storage});

/**
* BaseUrl :/styleexcel
*/

var StyleExcel = require('./StyleExcel');

router.get('/',function(req,res){
    res.render('StyleExcel/StyleExcel.html');
});

router.post('/',upload.single('myfile'),function(req,res){
    let file = req.file
    let result = {
        originalName : file.originalname,
        size : file.size,
    }
    StyleExcel.upload(req,res);
});

module.exports = router;