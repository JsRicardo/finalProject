var fileDao = require('../dao/FileDao');
var fs = require('fs');
var url = require('url');
var path = new Map();

//上传文件
function upload(request, response) {
    fileDao.insertFilelist(request.file.oraginame, request.file.size, request.file.path, function(){
        console.log('success');
        response.end(request.file.path)//写回去文件路径
    });
}
path.set('/api/upload', upload);

//读取图片
function getimg(request,response){
    var params = url.parse(request.url, true).query;
    try {
        var data = fs.readFileSync('./' + params.path);
        response.writeHead(200);
        response.write(data);
        response.end();
    } catch (e) {
        response.writeHead(404);
        response.end();
    }
}
path.set('/getimg', getimg);

module.exports.path = path;