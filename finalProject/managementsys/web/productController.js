var respUtil = require('../util/Resputil');
var productDao = require('../dao/ProductDao');

var path = new Map();

//获取热门商品
function getHotProList(request, response){
  productDao.getHotProList(function(result){
    respUtil.writeHttpResponse(response, result);
  })
}
path.set('/api/getHotProList', getHotProList);

//ID取消热门商品
function updateProNormalById(request, response){
  request.on('data', function(data){
    var productId = parseInt(data.toString());

    productDao.updateProNormalById(productId, function(result){
      respUtil.writeHttpResponse(response, result);
    })
  })
}
path.set('/api/updateProNormalById', updateProNormalById);

//ID设为热门商品
function updateHotProById(request, response){
  request.on('data', function(data){
    var productId = parseInt(data.toString());

    productDao.updateHotProById(productId, function(result){
      respUtil.writeHttpResponse(response, result);
    })
  })
}
path.set('/api/updateHotProById', updateHotProById);

module.exports.path = path;