var loginDao = require('../dao/LoginDao');
var respUtil = require('../util/Resputil');

var path = new Map();

function login(request, response) {
    request.on('data', function (data) {
        var username = data.toString().split('&')[0].split('=')[1];
        var password = data.toString().split('&')[1].split('=')[1];

        loginDao.login(username, password, function (result) {
            if (result == null || result.length == 0) {
                response.write('Fail');
                response.end();
            } else {
                if (password == result[0].password) {
                    response.writeHead(200);
                    response.write(respUtil.writeResult('success','登入成功',result));
                    response.end();
                } else {
                    response.write('Fail');
                    response.end();
                }
            }
        })
    })
}

path.set('/login', login);

module.exports.path = path;