function writeResult(status, msg, data) {
    return JSON.stringify({
        status: status,
        msg: msg,
        data: data
    });
}

function writeHttpResponse(response, result) {
    if (result && result.length != 0) {
        response.writeHead(200);
        response.write(writeResult('success', '成功', result));
        response.end();
    } else {
        response.writeHead(200);
        response.write(writeResult('Fail', '失败', result));
        response.end();
    }
}

module.exports = {
    'writeResult': writeResult,
    'writeHttpResponse': writeHttpResponse
}