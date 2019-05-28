var dbutil = require('./DBUtil');

function getLocationById(locationId, success) {
  var sql = `select * from location where status = 1 and id in (${[...locationId]})`;
  
  dbutil.querySql(sql, null, success);
}

module.exports = {
  'getLocationById': getLocationById
}