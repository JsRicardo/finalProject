var dbutil = require('./DBUtil');

function login(username, password, success) {
    var sql = 'select * from admin where admin = ? and password = ?';
    var params = [username, password];
    dbutil.querySql(sql, params, success);
}

module.exports = {
    'login': login
}