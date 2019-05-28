var cok = document.cookie;
if (cok && cok.length != 0) {
  $.ajax({
    url: '/getUser',
    type: 'POST',
    data: cok.split('=')[1],
    success(data) {
      var data = JSON.parse(data);
      var userName = data.data[0].username;
      $('.login').html('欢迎您：<span class="username" data-id=' + cok.split('=')[1] + '>' + userName + '</span > ');
      $('.regist').html('<a href="./login.html">退出</a>');
      $('.headertop').data('userName', userName);
    }
  })
}