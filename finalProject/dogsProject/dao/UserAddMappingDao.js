var dbutil = require('./DBUtil');

function addUAM(user_id, location_id, success) {
  var sql = 'insert into user_location_mapping (user_id, location_id) values (?,?)';
  var params = [user_id, location_id];

  dbutil.insertSql(sql, params, success);
}

function deleteUAM(locationId, success) {
  var sql = 'delete from user_location_mapping where location_id = ?';
  var params = [locationId];

  dbutil.deleteSql(sql, params, success);
}

module.exports = {
  'addUAM': addUAM,
  'deleteUAM': deleteUAM
}