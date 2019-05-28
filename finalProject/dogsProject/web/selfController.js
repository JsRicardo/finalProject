var addressDao = require('../dao/AddressDao')
var uamDao = require('../dao/UserAddMappingDao')
var respUtil = require('../util/Resputil');

var path = new Map();

//新增收货地址
function addLocation(request, response) {
  request.on('data', function (data) {
    var data = decodeURI(data.toString())
    var city = data.split('&')[1].split('=')[1]
    var address = data.split('&')[2].split('=')[1]
    var real_name = data.split('&')[0].split('=')[1]
    var phone = data.split('&')[3].split('=')[1]
    var status = data.split('&')[4].split('=')[1]
    var user_id = data.split('&')[5].split('=')[1]

    addressDao.addLocation(city, address, real_name, phone, status, function (result) {
      var location_id = result.insertId;
      uamDao.addUAM(user_id, location_id, function (result) {
        respUtil.writeHttpResponse(response, result);
      })
    })
  })
}

path.set('/addLocation', addLocation);

//获取收货地址
function getLocation(request, response) {
  request.on('data', function (data) {
    var userid = data.toString();
    addressDao.getLocation(userid, function (result) {
      respUtil.writeHttpResponse(response, result);
    })
  })
}
path.set('/getLocation', getLocation);

//获取收货地址BY ID
function getLocationById(request, response) {
  request.on('data', function (data) {
    var locationId = data.toString();
    addressDao.getLocationById(locationId, function (result) {
      respUtil.writeHttpResponse(response, result);
    })
  })
}
path.set('/getLocationById', getLocationById);

//删除地址
function deleteLocation(request, response) {
  request.on('data', function (data) {
    var locationId = data.toString();
    addressDao.deleteLocation(locationId, function (result) {
      uamDao.deleteUAM(locationId, function (result) {
        respUtil.writeHttpResponse(response, result);
      })
    })
  })
}
path.set('/deleteLocation', deleteLocation);

//修改成默认地址
function upToMoren(request, response) {
  request.on('data', function (data) {
    var locationId = data.toString().split('&')[0].split('=')[1];
    var userId = data.toString().split('&')[1].split('=')[1];
    addressDao.upToNormo(userId, function (result) {
      addressDao.upToMoren(locationId, function (result) {
        respUtil.writeHttpResponse(response, result);
      })
    })
  })
}
path.set('/upToMoren', upToMoren);

//修改地址信息
function updateLocation(request, response) {
  request.on('data', function (data) {
    var data = decodeURI(data.toString())
    var city = data.split('&')[1].split('=')[1]
    var address = data.split('&')[2].split('=')[1]
    var real_name = data.split('&')[0].split('=')[1]
    var phone = data.split('&')[3].split('=')[1]
    var status = parseInt(data.split('&')[4].split('=')[1])
    var locationId = parseInt(data.split('&')[5].split('=')[1])

    addressDao.updateLocation(city, address, real_name, phone, status, locationId, function (result) {
      respUtil.writeHttpResponse(response, result);
    })
  })
}

path.set('/updateLocation', updateLocation);


module.exports.path = path;