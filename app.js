var express = require('express');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var BrandExcelRouter = require('./routes/BrandExcel/brand');
var StyleExcelRouter = require('./routes/StyleExcel/style');
var GetFeedRouter = require('./routes/GetFeed/feed');

var app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', indexRouter);
app.use('/brandexcel', BrandExcelRouter);
app.use('/styleexcel', StyleExcelRouter);
app.use('/getfeed', GetFeedRouter);

app.set('views', __dirname + '/views');
app.set('view engine','ejs');

app.engine('html', require('ejs').renderFile);

const server = app.listen(3000,function(){
  server.setTimeout( 30 * 60 * 1000 );
  console.log('Connected 3000 port!')
});