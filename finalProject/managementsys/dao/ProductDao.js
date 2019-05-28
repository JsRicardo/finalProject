var dbutil = require('./DBUtil');

// 新增产品
function inserProduct(product_name, product_type, pinpai, pro_desc, price, old_price, hanliang, main_peifang, main_contents, success) {
    var sql = 'insert into product (product_name, product_type, pinpai, pro_desc, price, old_price, hanliang, main_peifang, main_contents) values (?,?,?,?,?,?,?,?,?)';
    var params = [product_name, product_type, pinpai, pro_desc, price, old_price, hanliang, main_peifang, main_contents];
    dbutil.updateSql(sql, params, success)
}

// 获取产品总数
function getProductCount(success) {
    var sql = 'select count(id) from product';

    dbutil.querySql(sql, null, success);
}

//分页获取产品
function getProductByPage(nowpage, pagesize, success) {
    var sql = 'select * from product order by id desc limit ?, ?';
    var params = [(nowpage - 1) * pagesize, pagesize]

    dbutil.querySql(sql, params, success);
}

//ID获取产品
function getproductById(productId, success) {
    var sql = 'select * from product where id = ?';
    var params = [productId];

    dbutil.querySql(sql, params, success);
}

// ID删除产品
function deleteProductById(productId, success) {
    var sql = 'delete from `product` where id = ?';
    var params = [productId];

    dbutil.updateSql(sql, params, success);
}

//获取热门商品
function getHotProList(success) {
    var sql = 'select * from product where hot = 1';

    dbutil.querySql(sql, null, success);
}

//ID取消热门商品
function updateProNormalById(productId, success) {
    var sql = "update product set hot = NULL where id = ?";
    var params = [productId];

    dbutil.updateSql(sql, params, success);
}

//ID设为热门商品
function updateHotProById(productId, success) {
    var sql = 'update product set hot = 1 where id = ?';
    var params = [productId];

    dbutil.updateSql(sql, params, success);
}

module.exports = {
    'inserProduct': inserProduct,
    'getProductByPage': getProductByPage,
    'getproductById': getproductById,
    'getProductCount': getProductCount,
    'deleteProductById': deleteProductById,
    'getHotProList': getHotProList,
    'updateProNormalById': updateProNormalById,
    'updateHotProById': updateHotProById
}