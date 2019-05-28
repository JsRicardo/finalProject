var productDao = require('../dao/ProductDao');
var url = require('url');
var respUtil = require('../util/Resputil');
var imgDao = require('../dao/ImgDao');

var path = new Map();

//获取产品详细信息
function getproductById(request, response) {
    var params = url.parse(request.url, true).query;
    var productId = params.productid;

    productDao.getproductById(productId, function (result) {
        var endResult = result;
        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult('Fail', '失败', null));
            response.end();
        } else {
            imgDao.getImgPathById(productId, function (result) {
                if (result == null || result.length == 0) {
                    response.writeHead(200);
                    response.write(respUtil.writeResult('success', '成功', endResult));
                    response.end();
                } else {
                    endResult[0].big_img_path = result[0].big_img_path;
                    endResult[0].detail_img_path = result[0].detail_img_path;

                    response.writeHead(200)
                    response.write(respUtil.writeResult('success', '成功', endResult));
                    response.end();
                }
            })
        }
    })
}

path.set('/getproductById', getproductById);

//获取前五个热门产品
function getHotList(request, response) {
    productDao.getHotList(function (result) {
        var endResult = result;
        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult('Fail', '失败', null));
            response.end();
        } else {
            var proIdArr = [];
            for (var i = 0; i < endResult.length; i++) {
                proIdArr.push(endResult[i].id);
            }
            imgDao.getImgPath(proIdArr, function (result) {
                if (result && result.length != 0) {
                    for (var j = 0; j < result.length; j++) {
                        endResult[j].iconImgPath = result[j].icon_img_path;
                    }
                    response.writeHead(200)
                    response.write(respUtil.writeResult('success', '成功', endResult));
                    response.end();
                } else {
                    response.writeHead(200)
                    response.write(respUtil.writeResult('success', '成功', endResult));
                    response.end();
                }
            })
        }
    })
}
path.set('/getHotList', getHotList);

module.exports.path = path;