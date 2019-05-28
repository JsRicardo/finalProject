var dbutil = require('./DBUtil');


function getOrderCount(success) {
    var sql = 'select count(id) from `order`';

    dbutil.querySql(sql, null, success);
}

function getOrderByPage(nowpage, pagesize, success) {
    var sql = 'select * from `order` order by id desc limit ?, ?';
    var params = [(nowpage - 1) * pagesize, pagesize]

    dbutil.querySql(sql, params, success);
}

function getOrderDetail(order_num, success) {
    var sql = 'select * from order_detail where order_num = ?';
    var params = [order_num];
    dbutil.querySql(sql, params, success);
}

//发货
function sendProduct(order_num, success) {
    var sql = 'update `order` set state = ? where order_num = ?';

    var params = [2, order_num];
    dbutil.updateSql(sql, params, success);
}

module.exports = {
    'getOrderByPage': getOrderByPage,
    'getOrderDetail': getOrderDetail,
    'sendProduct': sendProduct,
    'getOrderCount': getOrderCount
}