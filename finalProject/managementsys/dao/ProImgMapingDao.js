var dbutil = require('./DBUtil');

function insertPIMaping(imgpathId, productId, success){
    var sql = 'insert into pro_img_mapping (pro_img_id, product_id) values (?, ?)';
    var params = [imgpathId, productId];

    dbutil.updateSql(sql, params, success);
}

function getimgIdByProId(productId, success){
    var sql = 'select pro_img_id from pro_img_mapping where product_id = ?';
    var params = [productId];

    dbutil.querySql(sql, params, success);
}

module.exports = {
    'insertPIMaping' : insertPIMaping,
    'getimgIdByProId' : getimgIdByProId
}