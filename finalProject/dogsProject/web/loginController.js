var loginDao = require('../dao/LoginDao');
var userDao = require('../dao/UserDao');
var respUtil = require('../util/Resputil');

var path = new Map();

function login(request, response) {
    request.on('data', function (data) {
        var data = decodeURI(data.toString());
        var username = data.split('&')[0].split('=')[1];
        var password = data.split('&')[1].split('=')[1];
        loginDao.login(username, password, function (result) {
            if (result == null || result.length == 0) {
                response.writeHead(200)
                response.write(respUtil.writeResult('Fail', '登陆失败', null));
                response.end();
            } else {
                if (password == result[0].password) {
                    response.writeHead(200)
                    response.write(respUtil.writeResult('success', '登陆成功', result[0].id));
                    response.end();
                } else {
                    response.writeHead(200)
                    response.write(respUtil.writeResult('Fail', '登陆失败', null));
                    response.end();
                }
            }
        })
    })
}
path.set('/login', login);

function getUser(request, response) {
    request.on('data', function (data) {
        userDao.getUser(parseInt(data.toString()), function (result) {
            respUtil.writeHttpResponse(response, result);
        })
    })
}
path.set('/getUser', getUser)

module.exports.path = path;