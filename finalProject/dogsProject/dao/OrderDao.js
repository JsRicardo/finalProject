var dbutil = require('./DBUtil');

//加入购物车
function insertShopCar(price, productid, productName, count, userId, success) {
  var sql = 'insert into shop_car (price, product_id, product_name, count, user_id, total) values (?,?,?,?,?,?)';
  var params = [price, productid, productName, count, userId, price * count]

  dbutil.insertSql(sql, params, success);
}

//获得购物车数据
function getshopcar(userId, success) {
  var sql = 'select * from shop_car where user_id = ?';
  var params = [userId]

  dbutil.querySql(sql, params, success);
}

// id删除购物车数据
function deleteShopCarById(shopCarId, success) {
  var sql = 'delete from shop_car where id = ?';
  var params = [shopCarId];

  dbutil.updateSql(sql, params, success);
}

// 生成订单
function makeOrder(orderNum, orderPrice, state, userName, orderTime, success) {
  var sql = 'INSERT INTO `petshop`.`order` (`order_num`, `order_price`, `state`, `user_name`, `order_time` ) VALUES (?,?,?,?,?)';
  var params = [orderNum, orderPrice, state, userName, orderTime]

  dbutil.insertSql(sql, params, success);
}

// 生成订单详情
function makeorderDetail(orderNum, productid, productName, count, price, orderPrice, success) {
  var sql = 'INSERT INTO `petshop`.`order_detail` (`order_num`, `product_id`, `product_name`, `count`, `price`, `total` ) VALUES (?,?,?,?,?,?)';
  var params = [orderNum, productid, productName, count, price, orderPrice]

  dbutil.insertSql(sql, params, success);
}

//获取订单详情
function getOrderDetail(orderNum, success) {
  var sql = 'select * from order_detail where order_num = ?';
  var params = [orderNum];

  dbutil.querySql(sql, params, success);
}

//提交订单时修改订单
function updateOrderByOrderNum(orderNum, total, state, realName, phone, payTime, message, location, success) {
  var sql = 'update `order` set order_price = ?, state = ? , real_name = ?, phone_num = ?, pay_time = ?, liuyan = ?, location = ? where order_num = ?';
  var params = [total, state, realName, phone, payTime, message, location, orderNum];

  dbutil.updateSql(sql, params, success);
}

// 获取用户个人所有订单
function getOrderByUserName(userName, success) {
  var sql = 'select * from `order` where user_name = ?';
  var params = [userName];

  dbutil.querySql(sql, params, success);
}

// 获取用户个人所有订单详情
function getOrderDetailByOrderNum(orderNum, success) {
  var sql = 'select * from `order_detail` where order_num = ?';
  var params = [orderNum];

  dbutil.querySql(sql, params, success);
}

module.exports = {
  'insertShopCar': insertShopCar,
  'getshopcar': getshopcar,
  'makeOrder': makeOrder,
  'makeorderDetail': makeorderDetail,
  'getOrderDetail': getOrderDetail,
  'updateOrderByOrderNum': updateOrderByOrderNum,
  'getOrderByUserName': getOrderByUserName,
  'getOrderDetailByOrderNum': getOrderDetailByOrderNum,
  'deleteShopCarById': deleteShopCarById
}