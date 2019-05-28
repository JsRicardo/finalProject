var imgDao = require('../dao/ImgDao');
var productDao = require('../dao/ProductDao');
var respUtil = require('../util/Resputil');
var url = require('url');

var path = new Map();

//关键词搜索
function searchFunc(request, response) {
  request.on('data', function (data) {
    var data = decodeURI(data.toString());
    productDao.searchProLike(data, function (result) {
      if (result == null || result.length == 0) {
        response.writeHead(200);
        response.write(respUtil.writeResult('Fail', '失败', null));
        response.end();
      } else {
        var finalresult = result;
        var proidArr = [];
        for (var i = 0; i < finalresult.length; i++) {
          proidArr.push(finalresult[i].id);
        }
        imgDao.getImgPath(proidArr, function (data) {
          if (data && data.length != 0) {
            for (var j = 0; j < finalresult.length; j++) {
              finalresult[j]['icon_img_path'] = data[j].icon_img_path;
            }
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', finalresult));
            response.end();
          } else {
            response.writeHead(200);
            response.write(respUtil.writeResult('Fail', '失败', null));
            response.end();
          }
        })
      }
    })
  })
}
path.set('/searchFunc', searchFunc);

//搜索产品BY关键词组
function searProducts(request, response) {
  request.on('data', function (data) {
    var data = decodeURI(data.toString()).split('&');

    var pinpai = data[0].split('=')[1];
    var type = data[1].split('=')[1];
    var peifang = data[2].split('=')[1];
    var price = data[3].split('=')[1];

    productDao.searchProsByKeys(pinpai, type, peifang, price, function (result) {
      if (result == null || result.length == 0) {
        response.writeHead(200);
        response.write(respUtil.writeResult('Fail', '查询失败', null));
        response.end();
      } else {
        var finalresult = result;
        var proidArr = [];
        for (var i = 0; i < finalresult.length; i++) {
          proidArr.push(finalresult[i].id);
        }
        imgDao.getImgPath(proidArr, function (data) {
          if (data && data.length != 0) {
            for (var j = 0; j < finalresult.length; j++) {
              finalresult[j]['icon_img_path'] = data[j].icon_img_path;
            }
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', finalresult));
            response.end();
          } else {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', finalresult));
            response.end();
          }
        })
      }
    })
  })
}
path.set('/searProducts', searProducts);


module.exports.path = path;