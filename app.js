'use strict';

let port = process.env.PORT || 5200,
    express = require('express'),
    path = require('path'),
    _ = require('underscore'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    partials = require('express-partials'),
    bodyParser = require('body-parser'),
    app = express();

mongoose.connect('mongodb://localhost:27016/Oddish');

// 设置view的路径
app.set('views', './views');
app.set('view engine', 'ejs');
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
app.use(bodyParser.urlencoded({extended: true}));

// 静态文件的路径
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');

// 登录检测中间件
// app.use(H5_PATH,basicOp.h5CheckLogin);

// 监听端口
app.listen(port);

let modules = require('./routes/module-router');
app.use('/', modules);


module.exports = app;
