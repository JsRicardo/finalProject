var productDao = require('../dao/ProductDao');
var pimappingDao = require('../dao/ProImgMapingDao');
var respUtil = require('../util/Resputil');
var typeDao = require('../dao/TypeDao');
var ptmapingDao = require('../dao/ProTypeMappingDao');
var proimgDao = require('../dao/ProImgDao');
var orderDao = require('../dao/OrderDao');
var htmlEntities = require('html-entities').XmlEntities;

var path = new Map();

//新增产品
function inserProduct(request, response) {
    request.on('data', function (data) {

        var params = decodeURI(htmlEntities.decode(data.toString()))

        var product_type = params.split('&')[0].split('=')[1];
        var pinpai = params.split('&')[1].split('=')[1];
        var product_name = params.split('&')[2].split('=')[1];
        var pro_desc = params.split('&')[3].split('=')[1];
        var price = params.split('&')[4].split('=')[1];
        var old_price = params.split('&')[5].split('=')[1];
        var main_contents = params.split('&')[6].split('=')[1];
        var hanliang = params.split('&')[7].split('=')[1];
        var main_peifang = params.split('&')[8].split('=')[1];
        var imgpathId = params.split('&')[9].split('=')[1];
        var pro_type_id = params.split('&')[10].split('=')[1];

        productDao.inserProduct(product_name, product_type, pinpai, pro_desc, price, old_price, hanliang, main_peifang, main_contents, function (result) {
            var product_id = result.insertId;
            pimappingDao.insertPIMaping(imgpathId, product_id, function (result) {
                ptmapingDao.insertPTMaping(pro_type_id, product_id, function (result) {
                    response.writeHead(200);
                    response.write(respUtil.writeResult('success', '提交成功', null));
                    response.end();
                })
            })
        })
    })
}

path.set('/api/inserProduct', inserProduct);

// 获取分类名
function getType(request, response) {
    typeDao.getType(function (result) {
        if (result && result.length != 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        } else {
            response.writeHead(200);
            response.write(respUtil.writeResult('Fail', '查询失败', result));
            response.end();
        }
    })
}
path.set('/api/getType', getType)

//新增分类名
function insertType(request, response) {
    request.on('data', function (data) {
        var params = data.toString();
        typeDao.selectTypeByName(params, function (result) {
            if (result && result.length != 0) {
                response.writeHead(200);
                response.write(respUtil.writeResult('Fail', '新增失败', result.insertId));
                response.end();
            } else {
                typeDao.insertType(params, function (result) {
                    response.writeHead(200);
                    response.write(respUtil.writeResult('success', '新增成功', result.insertId));
                    response.end();
                })
            }
        })

    })
}
path.set('/api/insertType', insertType);

//获取产品总数
function getProCount(request, response) {
    productDao.getProductCount(function (result) {
        if (result && result.length != 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        } else {
            response.writeHead(200);
            response.write(respUtil.writeResult('Fail', '查询失败', null));
            response.end();
        }
    })
}
path.set('/api/getProCount', getProCount);

//安页数获取产品
function getProductByPage(request, response) {
    request.on('data', function (data) {
        var params = data.toString();
        var nowpage = params.split('&')[0].split('=')[1];
        var pagesize = params.split('&')[1].split('=')[1];
        productDao.getProductByPage(parseInt(nowpage), parseInt(pagesize), function (result) {
            if (result && result.length != 0) {
                response.writeHead(200);
                response.write(respUtil.writeResult('success', '查询成功', result));
                response.end();
            } else {
                response.writeHead(200);
                response.write(respUtil.writeResult('Fail', '查询失败', result));
                response.end();
            }
        })
    })
}
path.set('/api/getProductByPage', getProductByPage)

// 按id获取产品图片
function getProImg(request, response) {
    request.on('data', function (data) {
        var params = parseInt(data.toString());
        pimappingDao.getimgIdByProId(params, function (result) {
            if (result && result.length != 0) {
                proimgDao.getImgById(result[0].pro_img_id, function (result) {
                    if (result && result.length != 0) {
                        response.writeHead(200);
                        response.write(respUtil.writeResult('success', '查询成功', result));
                        response.end();
                    } else {
                        response.writeHead(200);
                        response.write(respUtil.writeResult('Fail', '查询失败', result));
                        response.end();
                    }
                })
            } else {
                response.writeHead(200);
                response.write(respUtil.writeResult('Fail', '查询失败', result));
                response.end();
            }
        })
    })
}
path.set('/api/getProImg', getProImg)

//获取订单总数
function getOrderCount(request, response) {
    orderDao.getOrderCount(function (result) {
        if (result && result.length != 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', result));
            response.end();
        } else {
            response.writeHead(200);
            response.write(respUtil.writeResult('Fail', '查询失败', null));
            response.end();
        }
    })
}
path.set('/api/getOrderCount', getOrderCount);

//获取所有订单
function getOrderList(request, response) {
    request.on('data', function (data) {
        var params = data.toString();
        var nowpage = params.split('&')[0].split('=')[1];
        var pagesize = params.split('&')[1].split('=')[1];
        orderDao.getOrderByPage(parseInt(nowpage), parseInt(pagesize), function (result) {
            if (result && result.length != 0) {
                response.writeHead(200);
                response.write(respUtil.writeResult('success', '查询成功', result));
                response.end();
            } else {
                response.writeHead(200);
                response.write(respUtil.writeResult('Fail', '查询失败', result));
                response.end();
            }
        })
    })
}
path.set('/api/getOrderList', getOrderList)

//获取订单详情
function getOrderDetail(request, response) {
    request.on('data', function (data) {
        var params = parseInt(data.toString());
        orderDao.getOrderDetail(params, function (result) {
            if (result && result.length != 0) {
                response.writeHead(200);
                response.write(respUtil.writeResult('success', '查询成功', result));
                response.end();
            } else {
                response.writeHead(200);
                response.write(respUtil.writeResult('Fail', '查询失败', result));
                response.end();
            }
        })
    })
}
path.set('/api/getOrderDetail', getOrderDetail)

//删除产品
function deleteProductById(request, response) {
    request.on('data', function (data) {
        var params = data.toString();
        productDao.deleteProductById(params, function (result) {
            if (result && result.length != 0) {
                response.writeHead(200);
                response.write(respUtil.writeResult('success', '成功', result));
                response.end();
            } else {
                response.writeHead(200);
                response.write(respUtil.writeResult('Fail', '失败', result));
                response.end();
            }
        })
    })
}
path.set('/api/deleteProductById', deleteProductById)


//发货
function sendProduct(request, response) {
    request.on('data', function (data) {
        var params = parseInt(data.toString());
        orderDao.sendProduct(params, function (result) {
            if (result && result.length != 0) {
                response.writeHead(200);
                response.write(respUtil.writeResult('success', '查询成功', result));
                response.end();
            } else {
                response.writeHead(200);
                response.write(respUtil.writeResult('Fail', '查询失败', result));
                response.end();
            }
        })
    })
}
path.set('/api/sendProduct', sendProduct)

module.exports.path = path;