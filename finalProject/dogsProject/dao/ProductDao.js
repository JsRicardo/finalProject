var dbutil = require('./DBUtil');

function getproductByType(typeId, success) {
    var sql = 'select * from product where id in ( select product_id from pro_type_mapping where pro_type_id = ?)';
    params = [typeId];

    dbutil.querySql(sql, params, success);
}

function getproductById(productId, success) {
    var sql = 'select * from product where id = ?';
    params = [productId];

    dbutil.querySql(sql, params, success);
}

//模糊查询
function searchProLike(keyword, success) {
    var sql = `SELECT * FROM product where product_name LIKE '%${keyword}%' or product_type like '%${keyword}%' or pinpai LIKE '%${keyword}%' `

    dbutil.querySql(sql, null, success);
}

//关键词组查询
function searchProsByKeys(pinpai, type, peifang, price, success) {
    var sql = `SELECT * FROM product where 1 = 1 `;
    var pinpaisql = '';
    var typesql = '';
    var peifangsql = '';
    var pricesql = '';
    if (pinpai) {
        pinpaisql = `and pinpai like '%${pinpai}%' `;
    }
    if (type) {
        typesql = `and product_type = '${type}' `;
    }
    if (peifang) {
        peifangsql = `and main_peifang like '${peifang}' `;
    }
    if (price) {
        var price1 = price.split('-')[0];
        var price2 = price.split('-')[1].split('元')[0];
        pricesql = `and price between '${price1}' and '${price2}' `;
    }
    sql = sql + pinpaisql + typesql + peifangsql + pricesql;

    dbutil.querySql(sql, null, success);
}

function getHotPinpaiList(success) {
    var sql = 'select pinpai from product where hot = 1';

    dbutil.querySql(sql, null, success);
}

//获取前五个热门产品
function getHotList(success) {
    var sql = 'select * from `product` where hot = 1 limit 5';

    dbutil.updateSql(sql, null, success);
}

module.exports = {
    'getproductByType': getproductByType,
    'getproductById': getproductById,
    'searchProLike': searchProLike,
    'searchProsByKeys': searchProsByKeys,
    'getHotPinpaiList': getHotPinpaiList,
    'getHotList': getHotList
}