var dbutil = require('./DBUtil');

function getImgById(imgId, success) {
    var sql = 'select * from product_img where id = ?';
    var params = [imgId];

    dbutil.querySql(sql, params, success);
}

module.exports = {
    'getImgById': getImgById
}