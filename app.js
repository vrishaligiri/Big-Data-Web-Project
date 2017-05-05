var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');

var index = require('./routes/index');

//#1 NodeJS Express Framework
var app = express();

//#2 Redis Application Cache
var redis = require("redis");
// Add your cache name and access key.
var redisClient = redis.createClient(6380,'Redis-BigData.redis.cache.windows.net',
    {auth_pass: '7jfDxMUyMlvv66SwpA102aT3Ms9QXUiJF8P8kjB9to4=',
        tls: {servername: 'Redis-BigData.redis.cache.windows.net'}});

//#3 Creating Elastic Search Client deployed on Azure Cloud with its hosts and port
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    hosts: [
        {   protocol: 'http',
            host: '40.121.211.14',
            port: 9200 }
            ] });

//Checking id Elastic Search is available.
client.ping({
    requestTimeout: 30000 }, function (error) {
    if (error) {
        console.error('Cluster is not available !');
    } else {
        console.log('All clear!');
    }
});

// #4 No SQL Mongo DB connection to VM in Azure
//var databaseUrl = //"40.121.211.14:27017/project"; // "username:password@example.com/mydb"
//var collections = ["Recipe"];
//var db = require("mongojs").connect(databaseUrl, collections);

//var mongojs = require('mongojs');
//var db = mongojs(databaseUrl, collections);

mongoose.connect('40.121.211.14:27017/bigdata');

//#5 Content Delivery Network Cloudinary to host images on its CDN
var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'kkbigdata',
    api_key: '923255932463499',
    api_secret: 'TXnasV4b-NwTdnZdIVMP8ls07F4'
});


// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

