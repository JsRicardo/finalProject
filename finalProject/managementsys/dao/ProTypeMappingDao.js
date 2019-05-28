var dbutil = require('./DBUtil');

function insertPTMaping(pro_type_id, productId, success){
    var sql = 'insert into pro_type_mapping (product_id, pro_type_id) values (?, ?)';
    var params = [productId, pro_type_id] ;

    dbutil.updateSql(sql, params, success);
}

module.exports = {
    'insertPTMaping' : insertPTMaping
}