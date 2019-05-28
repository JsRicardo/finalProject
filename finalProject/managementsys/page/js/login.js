$('#login').on('click', function () {
    var username = $('#username').val();
    var password = $('#pwd').val();

    $.ajax({
        type: 'POST',
        url: '/login',
        data: {
            username: username,
            password: password
        },
        success: function (data) {
            var data = JSON.parse(data);
            if (data.status == 'success') {
                document.cookie = 'user=' + data.data[0].id;
                $('#username').val('');
                $('#pwd').val('');
                location.href = '/index.html'
            } else {
                alert('用户名或密码错误！')
            }
        }

    })
})