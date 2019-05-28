var dbutil = require('./DBUtil');

function getproductType(success) {
    var sql = 'select * from product_type';

    dbutil.querySql(sql, null, success);
}

module.exports = {
    'getproductType': getproductType
}