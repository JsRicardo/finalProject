var dbutil = require('./DBUtil');

function getLocationIdByUserID(userId, success) {
  var sql = `select * from user_location_mapping where user_id in (${[...userId]})`;

  dbutil.querySql(sql, null, success);
}

module.exports = {
  'getLocationIdByUserID': getLocationIdByUserID
}