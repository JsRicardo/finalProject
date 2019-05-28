$('#login').on('click', function () {
    var username = $('#username').val();
    var password = $('#pwd').val();

    // console.log(username, password)
    $.ajax({
        url: '/login',
        type: 'POST',
        data: {
            username: username,
            password: password
        },
        success(data) {
            var data = JSON.parse(data);
            if (data.status == 'success') {
                document.cookie = 'user=' + data.data;
                location.href = './index.html'
            } else {
                alert('用户名或密码错误')
            }
        },
        error(e) {
            console.log(e)
        }
    })
})