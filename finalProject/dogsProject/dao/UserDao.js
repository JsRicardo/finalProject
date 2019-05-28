var dbutil = require('./DBUtil');

function getUser(userid, success) {
    var sql = 'select username from user where id = ?';
    var params = [userid];

    dbutil.querySql(sql, params, success);
}

module.exports = {
    'getUser': getUser
}