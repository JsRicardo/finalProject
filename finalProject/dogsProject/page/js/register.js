var btn = document.getElementById('register');
var xhr = new XMLHttpRequest();
btn.onclick = function () {
    var username = document.getElementById("username").value;
    var password = document.getElementById('pwd').value;

    var params = 'username=' + username + '&password=' + password;

    xhr.open('POST', 'register', true);
    xhr.send(params);
}
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText == 'had') {
            alert('用户名已存在');
        } else if (xhr.responseText == 'success') {
            alert('注册成功');
            location.href = '/login.html';
        }else{
            alert('注册失败，请联系管理员')
        }
    }
}