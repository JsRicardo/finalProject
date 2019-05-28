$('.menuList').on('click', function (e) {
  $(e.target).addClass('active');
  $(e.target).parent().siblings().children('a').removeClass('active')
})

$('.adress').on('click', function () {
  $('.addLocation').css('display', 'block');
  $('.mask').css('display', 'block');
})
$('.closeWindow').on('click', function () {
  $('.addLocation').css('display', 'none');
  $('.mask').css('display', 'none');
})
$('.closeupWindow').on('click', function () {
  $('.updateLocation').css('display', 'none');
  $('.mask').css('display', 'none');
})

function sendAjax(type, url, data, success) {
  $.ajax({
    type: type,
    url: url,
    data: data,
    success: function (data) {
      var data = JSON.parse(data);
      if (data.status == 'success') {
        success(data.data);
      } else {
        // alert('数据丢失！')
      }
    },
    error: function (e) {
      console.log(e)
    }

  })
}
//添加新地址
$('.submitAddr').on('click', function () {
  var realName = $('.realname').val();
  var city = $('.city').val();
  var detailAddr = $('.detailAddr').val();
  var phone = parseInt($('.phone').val());
  var check = $('#moren').is(':checked');
  var moren;
  var userId = document.cookie.split('=')[1];
  var reg = /^1(3|4|5|7|8)\d{9}$/;
  if (!reg.test(phone)) {
    alert('请输入正确的电话号码！');
    $('.upphone').val('');
    return;
  }
  if (check) {
    moren = 1;
  } else {
    moren = 0;
  }
  sendAjax('POST', '/addLocation', { realName, city, detailAddr, phone, moren, userId }, function (data) {
    alert('添加成功');
    $('.addLocation').css('display', 'none');
    $('.mask').css('display', 'none');
  })
})
// 渲染收货地址列表
function getLocation() {
  var userId = document.cookie.split('=')[1];
  sendAjax('POST', '/getLocation', userId, function (data) {
    var temp = '';
    var labStr = '';
    for (var i = 0; i < data.length; i++) {
      if (data[i].status == 1) {
        labStr = `<label class='isMoren'>默认地址</label>`
      }else{
        labStr = '';
      }
      temp += `<div class="address-list" data-id='${data[i].id}'>
                  <div class="address-info">
                    <h2>
                      <span class='userName'>${data[i].real_name}</span> 收
                      ${labStr}
                    </h2>
                    <p><span class='ucity'>${data[i].city}</span>--<span class='uaddress'>${data[i].address}</span></p>
                    <p class='uphone'>${data[i].phone}</p>
                  </div>
                  <div class="address-edit">
                    <span  class='tomoren'>设为默认地址</span>
                    <span  class='update'>编辑</span>
                    <span  class='delate'>删除</span>
                  </div>
                </div>`
    }
    $('.listWrapper').html(temp);
  })
}
getLocation()

// 收货地址变更事件
$('.listWrapper').on('click', function (e) {
  var target = e.target;
  var Tclass = $(target).prop('class');
  var locationId = $(target).parent().parent().attr('data-id');
  var userId = document.cookie.split('=')[1];

  if (Tclass == 'delete') {
    sendAjax('POST', '/deleteLocation', locationId, function (data) {
      $(target).parent().parent().css('display', 'none')
    })
  } else if (Tclass == 'tomoren') {
    sendAjax('POST', '/upToMoren', { locationId, userId }, function (data) {
      alert('修改成功！')
    })
  } else if (Tclass == 'update') {
    sendAjax('POST', '/getLocationById', locationId, function (data) {
      if (data && data.length != 0) {
        $('.updateLocation').css('display', 'block');
        $('.updateLocation').attr('data-id', locationId);
        $('.mask').css('display', 'block');
        $('.uprealname').val(data[0].real_name);
        $('.upcity').val(data[0].city);
        $('.updetailAddr').val(data[0].address);
        $('.upphone').val(data[0].phone);
        if (data[0].status == 1) {
          $('#upmoren').attr('checked', true)
        } else {
          $('#upmoren').attr('checked', false)
        }
      }
    })
  }
})

$('.updateAddr').on('click', function (e) {
  var locationId = $('.updateLocation').attr('data-id');
  var realName = $('.uprealname').val();
  var city = $('.upcity').val();
  var detailAddr = $('.updetailAddr').val();
  var phone = parseInt($('.upphone').val());
  var check = $('#upmoren').is(':checked');
  var moren;
  var reg = /^1(3|4|5|7|8)\d{9}$/;
  if (!reg.test(phone)) {
    alert('请输入正确的电话号码！');
    $('.upphone').val('');
    return;
  }
  if (check) {
    moren = 1;
  } else {
    moren = 0;
  }
  sendAjax('POST', '/updateLocation', { realName, city, detailAddr, phone, moren, locationId }, function (data) {
    alert('修改成功！');
    $('.updateLocation').css('display', 'none');
    $('.mask').css('display', 'none');
  })
})

//获取我的订单事件
function getMyOrderlist() {
  $('.myorder').on('click', function () {
    var userName = $('.headertop').data('userName');
    sendAjax('POST', '/getMyOrderList', userName, function (data) {
      console.log(data);
    })
  })

}
getMyOrderlist()