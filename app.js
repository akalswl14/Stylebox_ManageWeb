var express = require('express');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var BrandExcelRouter = require('./routes/BrandExcel/brand');
var StyleExcelRouter = require('./routes/StyleExcel/style');
var GetFeedRouter = require('./routes/GetFeed/feed');

var app = express();
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', indexRouter);
app.use('/brandexcel', BrandExcelRouter);
app.use('/styleexcel', StyleExcelRouter);
app.use('/getfeed', GetFeedRouter);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);


app.listen(3000, function () {
  console.log('Connected 3000 port!')
});