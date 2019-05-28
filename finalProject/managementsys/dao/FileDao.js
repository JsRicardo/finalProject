var dbutil = require('./DBUtil');

function insertFilelist(icon_img_path, pro_img_path, detail_img_path, success) {
    var sql = 'insert into product_img (icon_img_path,big_img_path, detail_img_path) values (?, ?, ?)';
    var params = [icon_img_path, pro_img_path, detail_img_path];
    dbutil.updateSql(sql, params, success);
}
module.exports = {
    'insertFilelist': insertFilelist
}