var dbutil = require('./DBUtil');

//添加收货地址
function addLocation(city, address, real_name, phone, status, success) {
  var sql = 'insert into location (city,address,real_name,phone,status) values (?,?,?,?,?)';
  var params = [city, address, real_name, phone, status];

  dbutil.insertSql(sql, params,success);
}

//获取收货地址
function getLocation(userid, success) {
  var sql = 'select * from location where id in (select location_id from user_location_mapping where user_id = ?)';
  var params = [userid];

  dbutil.querySql(sql, params, success);
}

//获取收货地址by id
function getLocationById(locationId, success) {
  var sql = 'select * from location where id = ?';
  var params = [locationId];

  dbutil.querySql(sql, params, success);
}

//删除地址
function deleteLocation(locationId, success) {
  var sql = 'delete from location where id = ?';
  var params = [locationId];

  dbutil.deleteSql(sql, params, success)
}

//修改默认地址
function upToMoren(locationId, success) {
  var sql = 'update location set status = 1 where id = ?';
  var params = [locationId];

  dbutil.updateSql(sql, params, success)
}

function upToNormo(userId, success) {
  var sql = 'update location set status = 0 where id in (select location_id from user_location_mapping where user_id = ?)';
  var params = [userId];

  dbutil.updateSql(sql, params, success)
}

//修改默认地址信息
function updateLocation(city, address, real_name, phone, status, locationId, success) {
  var sql = 'UPDATE location SET `city` = ?, `address` = ?, `real_name` = ?, `phone` = ?, `status` = ? WHERE id = ?';
  var params = [city, address, real_name, phone, status, locationId];

  dbutil.updateSql(sql, params, success)
}

module.exports = {
  'addLocation': addLocation,
  'getLocation': getLocation,
  'deleteLocation': deleteLocation,
  'upToMoren': upToMoren,
  'upToNormo': upToNormo,
  'getLocationById':getLocationById,
  'updateLocation' : updateLocation
}