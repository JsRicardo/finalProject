//连接数据库文件

var mysql = require('mysql');  //引入mysql驱动模块

//配置MySQL链接
function createConnection() {
    var conn = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'petshop'
    });
    return conn;
}

function querySql(sql, params, success) {
    if (params != null) {
        var conn = createConnection();
        conn.connect()
        conn.query(sql, params, function (err, res) {
            if (err == null) {
                success(res);
            } else {
                throw new Error('数据库错误，错误：' + err)
            }
        });
        conn.end();
    } else {
        var conn = createConnection();
        conn.connect()
        conn.query(sql, function (err, res) {
            if (err == null) {
                success(res);
            } else {
                throw new Error('数据库错误，错误：' + err)
            }
        });
        conn.end();
    }
}

function updateSql(sql, params, success) {
    var conn = createConnection();
    conn.connect()
    conn.query(sql, params, function (err, res) {
        if (err == null) {
            success(res);
        } else {
            throw new Error('数据库错误，错误：' + err)
        }
    });
    conn.end();
}

module.exports = {
    'querySql': querySql,
    'updateSql': updateSql
}