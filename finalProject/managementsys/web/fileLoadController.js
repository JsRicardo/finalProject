var fileDao = require('../dao/FileDao');
var respUtil = require('../util/Resputil')
var fs = require('fs');
var url = require('url');

var path = new Map();

//新增图片 并且插入数据库
function uploadImg(request, response) {
    var icon_img_path = request.files.iconImg[0]['path'];
    var producImg = request.files.productImg;
    var detailImg = request.files.detailImg;
    var pro_img_path = '';
    var detail_img_path = '';
    for (var i = 0; i < producImg.length; i++) {
        pro_img_path = pro_img_path + '&' + producImg[i]['path'];
    }
    for (var j = 0; j < detailImg.length; j++) {
        detail_img_path = detail_img_path + '&' + detailImg[j]['path'];
    }
    fileDao.insertFilelist(icon_img_path, pro_img_path, detail_img_path, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '新增成功', result.insertId))
        response.end()
    })
}

path.set('/api/uploadImg', uploadImg);

//读取图片
function getPic(request, response) {
    var params = url.parse(request.url, true).query;
    try {
        var data = fs.readFileSync('./' + params.path);
        response.writeHead(200);
        response.write(data);
        response.end();
    } catch (e) {
        response.writeHead(404);
        response.end();
    }
}
path.set('/api/getPic', getPic);

//上传图片
// function updataImg(request, response) {
//     var icon_img_path = request.files.iconImg[0].path;
//     var producImg = request.files.productImg;
//     var detailImg = request.files.detailImg;
//     console.log(icon_img_path, producImg, detailImg);
    // var pro_img_path = '';
    // var detail_img_path = '';
    // for (var i = 0; i < producImg.length; i++) {
    //     pro_img_path = pro_img_path + '&' + producImg[i].path
    // }
    // for (var j = 0; j < detailImg.length; j++) {
    //     detail_img_path = detail_img_path + '&' + detailImg[j].path
    // }
    // response.writeHead(200);
    // response.write(respUtil.writeResult('success', '上传成功', { icon_img_path, pro_img_path, detail_img_path }))
    // response.end()
// }
// path.set('/api/updataImg', updataImg);


module.exports.path = path;