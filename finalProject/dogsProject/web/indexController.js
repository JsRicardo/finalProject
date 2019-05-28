var proDao = require('../dao/ProductDao');
var proTypeDao = require('../dao/ProTypeDao');
var respUtil = require('../util/RespUtil');
var imgDao = require('../dao/ImgDao');

var path = new Map();

function getproductType(request, response) {
    proTypeDao.getproductType(function (result) {
        respUtil.writeHttpResponse(response, result)
    })
}
path.set('/getproductType', getproductType);

//首页获取产品列表
function getproductByType(request, response) {
    request.on('data', function (data) {
        var typeId = parseInt(data.toString());
        proDao.getproductByType(typeId, function (result) {
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
                        response.write(respUtil.writeResult('success', '查询成功', result));
                        response.end();
                    }
                })
            }
        })
    })
}
path.set('/getproductByType', getproductByType);

function getHotPinpaiList(request, response) {
    proDao.getHotPinpaiList(function (result) {
        respUtil.writeHttpResponse(response, result);
    })
}
path.set('/getHotPinpaiList', getHotPinpaiList);

module.exports.path = path;