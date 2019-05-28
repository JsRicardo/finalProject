var dbutil = require('./DBUtil');

function register(username, password, createDate, success) {
    var sql = 'insert into user (username, password, create_date) values (?, ?,?)';
    var params = [username, password, createDate];

    dbutil.insertSql(sql, params, success);
}

function check(username, success) {
    var sql = 'select * from user where username = ?';
    var params = [username];

    dbutil.querySql(sql, params, success);
}

module.exports = {
    'register': register,
    'check': check
}