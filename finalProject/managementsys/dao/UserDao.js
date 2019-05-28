var dbutil = require('./DBUtil');

// 获取客户数量
function getCoustomerCount(success) {
  var sql = 'select count(id) from user';

  dbutil.querySql(sql, null, success);
}

// 分页获取客户
function getCustomerByPage(nowpage, pagesize, success) {
  var sql = 'select * from `user` order by id desc limit ?, ?';
  var params = [(nowpage - 1) * pagesize, pagesize]

  dbutil.querySql(sql, params, success);
}

// ID获取管理员
function getAdminById(adminId, success) {
  var sql = 'select * from `admin` where id = ?';
  var params = [adminId];

  dbutil.querySql(sql, params, success);
}

// 获取所有管理员
function getAdminList(success) {
  var sql = 'select * from `admin`';

  dbutil.querySql(sql, null, success);
}

//ID删除管理员
function deleteAdminById(adminId, success) {
  var sql = 'delete from `admin` where id = ?';
  var params = [adminId]

  dbutil.querySql(sql, params, success);
}

//新增管理员
function insertAdmin(adminName, password, createUser, createDate, success) {
  var sql = 'insert into admin (admin, password, create_person, create_date) values (?, ?, ?, ?)';
  var params = [adminName, password, createUser, createDate];

  dbutil.updateSql(sql, params, success);
}

module.exports = {
  'getCoustomerCount': getCoustomerCount,
  "getCustomerByPage": getCustomerByPage,
  'getAdminById': getAdminById,
  'getAdminList': getAdminList,
  'deleteAdminById': deleteAdminById,
  'insertAdmin': insertAdmin
}