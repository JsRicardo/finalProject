var userId = document.cookie.split('=')[1];

function sendAjax(url, type, data, success) {
  $.ajax({
    url: url,
    type: type,
    data: data,
    success(data) {
      success(JSON.parse(data));
    },
    error(e) {
      console.log(e);
    }
  })
}

//渲染收货地址
function renderLocation(data) {
  var locationTemp = '';
  for (var i = 0; i < data.length; i++) {
    if (data[i].status == 1) {
      locationTemp += `<div class="location location${data[i].id}">
      <div class='moren'>默认</div>
      <div class="city">${data[i].city}</div>
      <div class="realName">${data[i].real_name}<i>收</i></div>
      <div class="adress">${data[i].address}</div>
      <div class="phone">${data[i].phone}</div>
      </div>`
    } else {
      locationTemp += `<div class="location location${data[i].id}">
      <div class="city">${data[i].city}</div>
      <div class="realName">${data[i].real_name}<i>收</i></div>
      <div class="adress">${data[i].address}</div>
      <div class="phone">${data[i].phone}</div>
      </div>`
    }
  }
  $('.locationWrapper').html(locationTemp);
}

// 获取收货地址
function getLocation(userId) {

  sendAjax('/getLocation', 'POST', userId, function (data) {
    if (data.status == 'success') {
      renderLocation(data.data);
    } else {
      alert('请先添加收货地址！');
      location.href = './self.html';
    }
  })
}

getLocation(userId);

//获取订单列表
function getOrderList() {
  var searchParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1] : '';
  var orderNum = searchParams.split('=')[1];

  sendAjax('/getOrderByOrderNum', 'POST', orderNum, function (data) {
    renderOrderList(data.data);
  })
}

function renderOrderList(data) {
  var orderListTemp = `<div class="cart-order orderList">
  <input type="checkbox" name="" id="checkOrder">
    <div class="proimg">
      <a href="./detail.html?id=${data[0].product_id}">
        <img src="/getimg?path=${data[0].iconimgPath}">
      </a>
    </div>
    <div class="protext">
      <a href="./detail.html?id=${data[0].product_id}">${data[0].product_name}</a>
    </div>
    <div class="num">
      数量：<span>${data[0].count}</span>
    </div>
    <div class="price">￥<span class='proPrice'>${data[0].total}</span> </div>
    <input type="button" value="[ 删除 ]" class="delete">
  </div>`

  $('.orderWrapper').html(orderListTemp);
}

getOrderList()



//留言
$('#message').on('focus', function () {
  $(this).prop('rows', 3);
})
$('#message').on('blur', function () {
  $(this).prop('rows', 1);
})

// 提交订单
function sendOrder() {
  var city, realName, adress, phone, message, total;
  var searchParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1] : '';
  var orderNum = searchParams.split('=')[1];

  //选择地址
  $('.locationWrapper').on('click', '.location', function () {
    $(this).addClass('oncheck').siblings().removeClass('oncheck');
    city = $(this).children('.city').html();
    realName = $(this).children('.realName').html().split('<i>')[0];
    adress = $(this).children('.adress').html();
    phone = $(this).children('.phone').html();
  })

  //订单点击事件
  $('.orderWrapper').on('click', '.orderList', function () {
    if (!$("input:checkbox").attr("checked")) {
      $("input:checkbox").attr("checked", true);
      total = $("input:checkbox").siblings('.price').children('.proPrice').html();
    } else {
      $("input:checkbox").attr("checked", false);
      total = ' ';
    }

    $('.totalPrice').html(total)
  })

  //提交订单按钮
  $('.sumprice').on('click', function () {
    message = $('#message').val();

    sendAjax('/payOrder', 'POST', { city, realName, adress, phone, message, total, orderNum }, function (data) {
      if (data.status == 'success') {
        alert('恭喜您购物成功！再去看看其他宝贝吧！');
        location.href = './index.html';
      } else {
        alert('啊哦！服务器好像在开小差，等下再试试吧！');
      }
    })
  })

}

sendOrder();