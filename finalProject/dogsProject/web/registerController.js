var registerDao = require('../dao/RegisterDao')

var path = new Map();

function register(request, response) {
    request.on('data', function (data) {
        var username = data.toString().split('&')[0].split('=')[1];
        var password = data.toString().split('&')[1].split('=')[1];
        var createDate = new Date();

        registerDao.check(username, function (result) {
            if (result == null || result.length == 0) {
                registerDao.register(username, password, createDate, function (result) {
                    if (result && result.serverStatus == 2 && result.insertId) {
                        response.write('success');
                        response.end();
                    } else {
                        response.write('fail');
                        response.end();
                    }
                })
            } else {
                response.write('had');
                response.end();
            }
        })
    })
}

path.set('/register', register);

module.exports.path = path;