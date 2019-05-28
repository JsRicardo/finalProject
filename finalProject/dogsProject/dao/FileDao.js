var dbutil = require('./DBUtil');

function insertFilelist(file_name, file_size, file_path, success){
    var sql = 'insert into fileList (file_name,file_size, file_path) values (?, ?, ?)';
    var params = [file_name, file_size, file_path];

    dbutil.insertSql(sql, params, success)
}

module.exports = {
    'insertFilelist' : insertFilelist
}