
var orderDao = require('../dao/OrderDao');
var respUtil = require('../util/Resputil');
var imgDao = require('../dao/ImgDao');

var path = new Map();

//加入购物车
function insertShopCar(request, response) {
  request.on('data', function (data) {
    var data = decodeURI(data.toString());

    var price = parseFloat(data.split('&')[0].split('=')[1]);
    var productid = parseInt(data.split('&')[1].split('=')[1]);
    var productName = data.split('&')[2].split('=')[1];
    var count = parseInt(data.split('&')[3].split('=')[1]);
    var userId = parseInt(data.split('&')[4].split('=')[1]);

    orderDao.insertShopCar(price, productid, productName, count, userId, function (result) {
      respUtil.writeHttpResponse(response, result);
    })
  })
}
path.set('/insertShopCar', insertShopCar);

//获取购物车数据
function getshopcar(request, response) {
  request.on('data', function (data) {
    var userid = parseInt(data.toString());
    orderDao.getshopcar(userid, function (result) {
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
            response.write(respUtil.writeResult('success', '成功', finalresult));
            response.end();
          } else {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '成功', finalresult));
            response.end();
          }
        })
      }
    })
  })
}
path.set('/getshopcar', getshopcar);

//根据id删除购物车数据
function deleteShopCarById(request, response) {
  request.on('data', function (data) {
    var data = data.toString();
    orderDao.deleteShopCarById(data, function (result) {
      respUtil.writeHttpResponse(response, result);
    })
  })
}
path.set('/deleteShopCarById', deleteShopCarById);

//生成订单
function makeOrder(request, response) {
  request.on('data', function (data) {
    var data = decodeURI(data.toString());

    var price = parseFloat(data.split('&')[0].split('=')[1]);
    var productid = parseInt(data.split('&')[1].split('=')[1]);
    var productName = data.split('&')[2].split('=')[1];
    var count = parseInt(data.split('&')[3].split('=')[1]);
    var userName = data.split('&')[4].split('=')[1];
    var orderTime = new Date();
    var state = 0;
    var orderPrice = price * count;

    var orderNum = "";  //订单号
    for (var i = 0; i < 3; i++) //6位随机数，用以加在时间戳后面。
    {
      orderNum += Math.floor(Math.random() * 10);
    }
    orderNum = new Date().getTime() + orderNum;


    orderDao.makeOrder(orderNum, orderPrice, state, userName, orderTime, function (result) {
      if (result && result.length != 0) {
        orderDao.makeorderDetail(orderNum, productid, productName, count, price, orderPrice, function (result) {
          if (result && result.length != 0) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '添加成功', orderNum));
            response.end();
          } else {
            response.write('Fail');
            response.end();
          }
        })
      } else {
        response.write('Fail');
        response.end();
      }
    })
  })
}
path.set('/makeOrder', makeOrder);

//获取详情订单
function getOrderByOrderNum(request, response) {
  request.on('data', function (data) {
    var data = decodeURI(data.toString());
    var endResult = {};
    orderDao.getOrderDetail(data, function (result) {
      if (result && result.length != 0) {
        endResult = result;
        imgDao.getImgPath([result[0].product_id], function (result) {
          if (result && result.length != 0) {
            endResult[0]['iconimgPath'] = result[0].icon_img_path;
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', endResult));
            response.end();
          } else {
            response.writeHead(200);
            response.write(respUtil.writeResult('success', '查询成功', endResult));
            response.end();
          }
        })
      } else {
        response.write('Fail');
        response.end();
      }
    })
  })
}
path.set('/getOrderByOrderNum', getOrderByOrderNum);

//支付订单
function payOrder(request, response) {
  request.on('data', function (data) {
    var data = decodeURI(data.toString()).split('&');

    var city = data[0].split('=')[1];
    var realName = data[1].split('=')[1];
    var address = data[2].split('=')[1];
    var phone = data[3].split('=')[1];
    var message = data[4].split('=')[1];
    var total = parseFloat(data[5].split('=')[1]);
    var orderNum = data[6].split('=')[1];
    var location = city + address;
    var state = 1;
    var payTime = new Date();

    orderDao.updateOrderByOrderNum(orderNum, total, state, realName, phone, payTime, message, location, function (result) {
      if (result && result.length != 0) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success', '添加成功', orderNum));
        response.end();
      } else {
        response.write('Fail');
        response.end();
      }
    })
  })
}
path.set('/payOrder', payOrder);

//获取用户订单
function getMyOrderList(request, response) {
  request.on('data', function (data) {
    var userName = decodeURI(data.toString());
    var endResult;
    orderDao.getOrderByUserName(userName, function (result) {
      console.log(result)
    })
  })
}
path.set('/getMyOrderList', getMyOrderList);

module.exports.path = path;