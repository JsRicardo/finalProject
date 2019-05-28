var dbutil = require('./DBUtil');

//获取所有Type
function getType(success) {
    var sql = 'select * from product_type';

    dbutil.querySql(sql, null, success);
}
// 新增产品分类
function insertType(product_type, success) {
    var sql = 'insert into product_type (product_type) values (?)';
    var params = [product_type];

    dbutil.updateSql(sql, params, success);
}
// 分类名查询分类
function selectTypeByName(product_type, success) {
    var sql = 'select * from product_type where product_type = ?';
    var params = [product_type];

    dbutil.querySql(sql, params, success);
}

module.exports = {
    'getType': getType,
    'insertType': insertType,
    'selectTypeByName':selectTypeByName
}