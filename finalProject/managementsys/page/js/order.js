//获取订单总数
function getOrderCount() {
  sendAjax('/getOrderCount', 'POST', null, function (data) {
    var count = data[0]['count(id)'];
    var pageSize = 10;
    var nowPage = 1;

    getOrderList(nowPage, pageSize);
    renderPageBar('#orderPage', count, pageSize, getOrderList);
  })
}

//分页获取订单列表
function getOrderList(nowPage, pageSize) {
  sendAjax('/getOrderList', 'POST', { nowPage, pageSize }, function (data) {
    renderOrderTable(data)
  })
}

//渲染订单列表
function renderOrderTable(data) {
  var tableH = ` <tr bgcolor="#6a598c">
  <th class="textM bold">序号</th>
  <th class="textM bold">订单号</th>
  <th class="textM bold">订单金额</th>
  <th class="textM bold">状态</th>
  <th class="textM bold">昵称</th>
  <th class="textM bold">收货人</th>
  <th class="textM bold">手机</th>
  <th class="textM bold">订单时间</th>
  <th class="textM bold">付款时间</th>
  <th class="textM bold">留言</th>
  <th class="textM bold">收货地址</th>
  </tr>`
  var tempTd = '';
  for (var v = 0; v < data.length; v++) {
    var stateTemp = ''
    if (data[v].state == 0) {
      stateTemp += `<td class="textL">待付款</td>`
    } else if (data[v].state == 1) {
      stateTemp += `<td class="textL">待发货</td>`
    } else if (data[v].state == 2) {
      stateTemp += `<td class="textL">已完成</td>`
    }

    tempTd += ` <tr class="c666 ft14" bgcolor="#fff" data-id='${data[v].order_num}'>
      <td class="textL">${v + 1}</td>
      <td class="textL">${data[v].order_num}</td>
      <td class="textL">${data[v].order_price}</td>
      ${stateTemp}
      <td class="textL">${data[v].user_name}</td>
      <td class="textL">${data[v].real_name}</td>
      <td class="textL">${data[v].phone_num}</td>
      <td class="textL">${data[v].order_time}</td>
      <td class="textL">${data[v].pay_time}</td>
      <td class="textL">${data[v].liuyan}</td>
      <td class="textL">${data[v].location}</td>
    </tr>`
  }
  $('.ordertable tbody').html(tableH + tempTd);
}
// 订单详细信息点击事件
$('.ordertable').on('click', function (e) {
  var orderNum = $($(e.target).parent('tr')).attr('data-id');
  var state = $(e.target).parent('tr').children('td').eq(3).text()
  var total = $(e.target).parent('tr').children('td').eq(2).text()
  var orderDate = $(e.target).parent('tr').children('td').eq(7).text()
  var payDate = $(e.target).parent('tr').children('td').eq(8).text()
  var realName = $(e.target).parent('tr').children('td').eq(5).text()
  var phone = $(e.target).parent('tr').children('td').eq(6).text()
  var location = $(e.target).parent('tr').children('td').eq(10).text()

  $('.orderDetail').css('display', 'block')
  $('.zhezhao').css('display', 'block')
  getOrderDetail(orderNum, state, total, orderDate, payDate, realName, phone, location);
})

//订单号获取详细信息
function getOrderDetail(orderNum, state, total, orderDate, payDate, realName, phone, location) {
  renderOrderDetailTop(orderNum, state, total, orderDate, payDate, realName, phone, location);
  sendAjax('/getOrderDetail', 'POST', orderNum, renderOrderDetailTable);
}
//渲染详情页顶部
function renderOrderDetailTop(orderNum, state, total, orderDate, payDate, realName, phone, location) {
  var temp = `<div class="state">
    订单状态：<span class='sendState'>${state}</span>
  </div>
  <div class="moreIm">
    <div class="orderNum">
      订单号：<span class='orderId'>${orderNum}</span>
    </div>
    <div class="monDate">
      <div class="total">
        订单金额：<span>￥${total}</span>
      </div>
      <div class="date">订单日期：<span>${orderDate}</span></div>
      <div class="paydate">付款日期：<span>${payDate}</span></div>
    </div>
    <div class="location">
      收货信息：<span>${realName}</span><span>${phone}</span><span>${location}</span>
    </div>
  </div>`
  $('.detailTop').html(temp)
}
//渲染详情表格
function renderOrderDetailTable(data) {
  var tableH = ` <tr bgcolor="#6a598c">
    <th class="textM bold">序号</th>
    <th class="textM bold">商品编码</th>
    <th class="textM bold">商品名称</th>
    <th class="textM bold">单价</th>
    <th class="textM bold">数量</th>
    <th class="textM bold">金额</th>
    </tr>`
  var tempTd = '';
  for (var m = 0; m < data.length; m++) {
    tempTd += ` <tr class="c666 ft14" bgcolor="#fff" data-id='${data[m].order_num}'>
        <td class="textL">${m + 1}</td>
        <td class="textL">${data[m].product_id}</td>
        <td class="textL">${data[m].product_name}</td>
        <td class="textL">${data[m].price}</td>
        <td class="textL">${data[m].count}</td>
        <td class="textL">${data[m].total}</td>
      </tr>`
  }
  $('.detailTable tbody').html(tableH + tempTd);
}

//发货事件
$('.sendpro').on('click', function () {
  var orderNum = $('.orderId').html();
  sendAjax('/sendProduct', 'POST', orderNum, function (data) {
    $('.sendState').html('已发货')
    alert('发货成功');
  })
})