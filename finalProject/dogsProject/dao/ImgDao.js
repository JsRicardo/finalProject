var dbutil = require('./DBUtil');

function getImgPath(proidArr, success) {
    var sql = 'select icon_img_path from product_img where id in ( SELECT pro_img_id FROM `pro_img_mapping` where product_id in (' + [...proidArr] + ') )';

    dbutil.querySql(sql, null, success);
}

function getImgPathById(productId, success) {
    var sql = 'select * from product_img where id in ( SELECT pro_img_id FROM `pro_img_mapping` where product_id = ? )';
    var params = [productId];

    dbutil.querySql(sql, params, success);
}


module.exports = {
    'getImgPath': getImgPath,
    'getImgPathById': getImgPathById
}