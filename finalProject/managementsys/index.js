//----
//服务器主文件
//----

var express = require('express');
var globalConfig = require('./config');
var loader = require('./loader');
var multer = require('multer');//文件上传
var cookie = require('cookie-parser');//读写cookie

var app = new express();
var upload = multer({ dest: '../file' })  //指定文件上传路径

app.use(express.static(globalConfig.page_path)); //指定启动文件  默认为启动为文件夹下面的index页面
app.use(cookie());

//登录验证   拦截器功能
// app.get('./api/*', function (request, response, next) {//请求，返回，下一步
//     if (request.cookies.id) { //验证请求里面有无cookie
//         next(); //有则进入下一步
//     } else {
//         response.redirect('./login.html') //没有则重定向到登录页
//     }
// })

//发送请求
app.post('/login', loader.pathMap.get('/login'));
app.post('/getAdminById', loader.pathMap.get('/getAdminById'));
app.post('/inserProduct', loader.pathMap.get('/api/inserProduct'));
app.post('/uploadImg', upload.fields([{ name: 'iconImg', maxCount: 2 }, { name: 'productImg', maxCount: 10 }, { name: 'detailImg', maxCount: 10 }]), loader.pathMap.get('/api/uploadImg'));
app.post('/getType', loader.pathMap.get('/api/getType'));
app.post('/insertType', loader.pathMap.get('/api/insertType'));
app.post('/getProductByPage', loader.pathMap.get('/api/getProductByPage'));
app.post('/getProImg', loader.pathMap.get('/api/getProImg'));
app.post('/getOrderList', loader.pathMap.get('/api/getOrderList'));
app.post('/getOrderDetail', loader.pathMap.get('/api/getOrderDetail'));
app.post('/sendProduct', loader.pathMap.get('/api/sendProduct'));
app.get('/getPic', loader.pathMap.get('/api/getPic'));
// app.post('/updateImg', upload.fields([{ name: 'iconImg', maxCount: 2 }, { name: 'productImg', maxCount: 10 }, { name: 'detailImg', maxCount: 10 }]), loader.pathMap.get('/api/updataImg'));
app.post('/getProCount', loader.pathMap.get('/api/getProCount'));
app.post('/getOrderCount', loader.pathMap.get('/api/getOrderCount'));
app.post('/deleteProductById', loader.pathMap.get('/api/deleteProductById'));
app.post('/getCoustomerCount', loader.pathMap.get('/api/getCoustomerCount'));
app.post('/getCustomerByPage', loader.pathMap.get('/api/getCustomerByPage'));
app.post('/getAdminList', loader.pathMap.get('/api/getAdminList'));
app.post('/deleteAdminById', loader.pathMap.get('/api/deleteAdminById'));
app.post('/insertAdmin', loader.pathMap.get('/api/insertAdmin'));
app.post('/getHotProList', loader.pathMap.get('/api/getHotProList'));
app.post('/updateProNormalById', loader.pathMap.get('/api/updateProNormalById'));
app.post('/updateHotProById', loader.pathMap.get('/api/updateHotProById'));

app.listen(globalConfig.port); //指定监听端口