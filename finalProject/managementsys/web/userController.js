var respUtil = require('../util/Resputil');
var userDao = require('../dao/UserDao');
var locationDao = require('../dao/LocationDao');
var ulmDao = require('../dao/UserLocationMappingDao');

var path = new Map();

//Id获取管理员
function getAdminById(request, response) {
  request.on('data', function (data) {
    var adminId = data.toString();
    userDao.getAdminById(parseInt(adminId), function (result) {
      respUtil.writeHttpResponse(response, result);
    })
  })
}
path.set('/getAdminById', getAdminById);

//获取客户数量
function getCoustomerCount(request, response) {
  userDao.getCoustomerCount(function (result) {
    respUtil.writeHttpResponse(response, result);
  })
}
path.set('/api/getCoustomerCount', getCoustomerCount);

// 分页获取客户
function getCustomerByPage(request, response) {
  request.on('data', function (data) {
    var params = data.toString().split('&');
    var nowpage = parseInt(params[0].split('=')[1]);
    var pagesize = parseInt(params[1].split('=')[1]);

    var endResult = [];

    userDao.getCustomerByPage(nowpage, pagesize, function (result) {
      endResult.push(result);
      var userId = [];
      for (var i = 0; i < result.length; i++) {
        userId.push(result[i].id)
      }
      ulmDao.getLocationIdByUserID(userId, function (result) {
        var locationId = [];
        for (var j = 0; j < result.length; j++) {
          locationId.push(result[j].location_id);
        }
        locationDao.getLocationById(locationId, function (result) {
          endResult.push(result);
          respUtil.writeHttpResponse(response, endResult);
        })
      })
    })
  })
}
path.set('/api/getCustomerByPage', getCustomerByPage);

//获取所有管理员
function getAdminList(request, response) {
  userDao.getAdminList(function (result) {
    respUtil.writeHttpResponse(response, result);
  })
}
path.set('/api/getAdminList', getAdminList);

//ID删除管理员
function deleteAdminById(request, response) {
  request.on('data', function (data) {
    var adminId = parseInt(data.toString());

    userDao.deleteAdminById(adminId, function (result) {
      respUtil.writeHttpResponse(response, result);
    })
  })
}
path.set('/api/deleteAdminById', deleteAdminById);

// 新增管理员
function insertAdmin(request, response) {
  request.on('data', function (data) {
    var data = decodeURI(data.toString()).split('&');
    var creatDate = new Date();
    var adminName = data[0].split('=')[1];
    var adminPwd = data[1].split('=')[1];
    var createUser = data[2].split('=')[1];

    userDao.insertAdmin(adminName, adminPwd, createUser, creatDate, function (result) {
      respUtil.writeHttpResponse(response, result);
    })
  })
}
path.set('/api/insertAdmin', insertAdmin);

module.exports.path = path;