//工具函数  关闭窗口
function closeWindow(obj) {
  obj.css('display', 'none');
}
function openWindow(obj) {
  obj.css('display', 'block');
}

// 发送ajax
function sendAjax(url, type, data, success) {
  $.ajax({
    url: url,
    type: type,
    data: data,
    success: function (data) {
      var result = JSON.parse(data)
      if (result.status == 'success') {
        success(result.data)
      } else {
        alert('请求错误！')
      }
    }
  })
}

//删除cookie
function clearAllCookie() {
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i--;)
      document.cookie = keys[i] + "=0; expire=" + date.toGMTString() + "; path=/";
  }
}

//分页按钮区
function renderPageBar(dom, count, pageSize, callbackFunc) {
  $(dom).paging({
    pageNum: 1, // 当前页面
    totalNum: count / pageSize, // 总页码
    totalList: count, // 记录总数量
    callback: function (num) { //回调函数
      callbackFunc(num, pageSize);
    }
  });
}

//渲染顶部admin名称
function welcome() {
  var cok = document.cookie.split('=')[1];
  if (cok && cok.length != 0) {
    sendAjax('/getAdminById', 'POST', cok, function (data) {
      $('.adminName').html(`${data[0].admin}`);
    })
  } else {
    location.href = './login.html'
  }
}
welcome();

//退出事件
$('.logout').on('click', function () {
  clearAllCookie();
  $('.logout').prop('href', './login.html');
})



//<----------页面点击事件----------->

// 菜单栏点击事件
$('dt').on('click', function (e) {
  var target = e.target;
  $(target).parent('dl').siblings('dl').removeClass('action');
  $(target).parent('dl').addClass('action');
})

$('dd').on('click', function (e) {
  var target = e.target;
  var showDiv = $(target).prop('id');
  $(target).addClass('action').siblings('dd').removeClass('action');

  $('.' + showDiv).addClass('showdiv');
  $('.' + showDiv).siblings('div').removeClass('showdiv');

  // 请求相应项数据
  if (showDiv == 'cententTable') {
    getProCount();
  } else if (showDiv == 'typeTable') {
    getType(renderTypeTable);
  } else if (showDiv == 'orderList') {
    getOrderCount();
  } else if (showDiv == 'customerList') {
    getCustomerCount();
  } else if (showDiv == 'adminList') {
    getAdminList();
  }
})

// 关闭弹窗四件
$('.closeWindow').on('click', function () {
  closeWindow($('.newType'));
  closeWindow($('.zhezhao'));
  closeWindow($('.newAdminWrapper'));
})

$('.newproClose').on('click', function () {
  closeWindow($('.newProWrapper'))
  closeWindow($('.zhezhao'));
})
$('.closeDetail').on('click', function () {
  closeWindow($('.orderDetail'))
  closeWindow($('.zhezhao'))
})
$('.proDetailClose').on('click', function () {
  closeWindow($('.productDetail'))
  closeWindow($('.zhezhao'))
})
$('.newImgClose').on('click', function () {
  closeWindow($(".inputNewImg"))
})
$('.newImg input').on('click', function () {
  openWindow($('.inputNewImg'))
})


//新增分类
$('.newtype').on('click', function () {
  openWindow($('.newType'));
  openWindow($('.zhezhao'));
})

//删除产品
$('.deletePro').on('click', function () {
  var productId = $('.deletePro').attr('data-id');
  deleteProductById(productId);
})

//新增管理员事件
$('.newAdmin').on('click', function(){
  openWindow($('.zhezhao'));
  openWindow($('.newAdminWrapper'));
})
