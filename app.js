'use strict';

var port = process.env.PORT || 5200;
var express = require('express');
var path = require('path');
var _ = require('underscore');
var mongoose = require('mongoose');
var session = require('express-session');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var app = express();

mongoose.connect('mongodb://localhost:27017/Oddish');

// 设置view的路径
app.set('views','./views');
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(partials());


// 配置session
app.use(session({
  //secret的值建议使用随机字符串
  secret: 'Oddish',
  // 过期时间（毫秒）
  cookie: {maxAge: 60 * 1000 * 30}
}));

// bodyParser 解析req.body的内容
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// 静态文件的路径
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');

// 登录检测中间件
// app.use(H5_PATH,basicOp.h5CheckLogin);

// 监听端口
app.listen(port);

var modules = require('./routes/module-router');
app.use('/',modules);


module.exports = app;