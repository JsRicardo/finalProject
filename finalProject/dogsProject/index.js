//----
//服务器主文件
//----

var express = require('express');
var globalConfig = require('./config');
var loader = require('./loader');
var multer = require('multer');//文件上传
var cookie = require('cookie-parser');//读写cookie

var app = new express();
var upload = multer({ dest: '../file/' })  //指定文件上传路径

app.use(express.static(globalConfig.page_path)); //指定启动文件  默认为启动为文件夹下面的index页面
app.use(cookie());

//登录验证   拦截器功能
app.get('./api/*', function (request, response, next) {//请求，返回，下一步
    if (request.cookies.id) { //验证请求里面有无cookie
        next(); //有则进入下一步
    } else {
        response.redirect('./login.html') //没有则重定向到登录页
    }
})

//发送请求
app.post('/login', loader.pathMap.get('/login'));
app.post('/getUser', loader.pathMap.get('/getUser'));
app.post('/register', loader.pathMap.get('/register'));
app.post('/getproductType', loader.pathMap.get('/getproductType'));
app.post('/getproductByType', loader.pathMap.get('/getproductByType'));
app.get('/getproductById', loader.pathMap.get('/getproductById'));
app.post('/addLocation', loader.pathMap.get('/addLocation'));
app.get('/getimg', loader.pathMap.get('/getimg'));
app.post('/getLocation', loader.pathMap.get('/getLocation'));
app.post('/getLocationById', loader.pathMap.get('/getLocationById'));
app.post('/deleteLocation', loader.pathMap.get('/deleteLocation'));
app.post('/upToMoren', loader.pathMap.get('/upToMoren'));
app.post('/updateLocation', loader.pathMap.get('/updateLocation'));
app.post('/insertShopCar', loader.pathMap.get('/insertShopCar'));
app.post('/searchFunc', loader.pathMap.get('/searchFunc'));
app.post('/getshopcar', loader.pathMap.get('/getshopcar'));
app.post('/makeOrder', loader.pathMap.get('/makeOrder'));
app.post('/getOrderByOrderNum', loader.pathMap.get('/getOrderByOrderNum'));
app.post('/payOrder', loader.pathMap.get('/payOrder'));
app.post('/getMyOrderList', loader.pathMap.get('/getMyOrderList'));
app.post('/searProducts', loader.pathMap.get('/searProducts'));
app.post('/getHotPinpaiList', loader.pathMap.get('/getHotPinpaiList'));
app.post('/deleteShopCarById', loader.pathMap.get('/deleteShopCarById'));
app.post('/getHotList', loader.pathMap.get('/getHotList'));

app.listen(globalConfig.port); //指定监听端口