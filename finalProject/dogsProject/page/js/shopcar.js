function sendAjax(url, type, data, success, fail) {
  $.ajax({
    url: url,
    type: type,
    data: data,
    success(data) {
      var data = JSON.parse(data);
      if (data.status == 'success') {
        success(data.data)
      } else {
        fail()
      }
    },
    error(e) {
      console.log(e);
    }
  })
}


function getshopCar() {
  var userId = document.cookie.split('=')[1];
  sendAjax('/getshopcar', 'POST', userId, renderShopList, renderNull)
}
getshopCar()

function renderNull() {
  $('.contentbox').html('<h5>哦~  您的购物车空空如也哎，快去SHOPPING吧</h5>')
}

function renderShopList(data) {
  var temp = '';
  for (var i = 0; i < data.length; i++) {
    temp += `<div class="cart-order" data-id='${data[i].id}'><input type="checkbox" class="checkInp">
    <div class="proimg"><a href="./detail.html?id=${data[i].product_id}"><img src="/getimg?path=${data[i].icon_img_path}" width="80" height="100"></a></div>
    <div class="protext"><a href="./detail.html?id=${data[i].product_id}">${data[i].product_name}</a></div>
    <div class="num">
      <span class="jian">-</span>
      <input type="text" value="${data[i].count}" class="productNum">
      <span class="add">+</span>
    </div>
    <div class="price">单价：￥<span class='proPrice'>${data[i].price}</span> </div>
    <input type="button" value="[ 删除 ]" class="delete"> </div>`
  }
  $('.listWrapper').html(temp);
}

// 购物车列表点击事件
function listClick() {
  $('.listWrapper').on('click', function (e) {
    var target = e.target
    var Tclass = $(target).prop('class');
    // 加减产品数量
    if (Tclass == 'add') {
      var proNum = parseInt($(target).siblings('.productNum').val());
      var newNum = proNum + 1;
      $(target).siblings('.productNum').val(newNum);
      //计算总价
      sumPrice()
    };
    if (Tclass == 'jian') {
      var proNum = parseInt($(target).siblings('.productNum').val());
      var newNum = proNum <= 1 ? proNum : proNum - 1;
      $(target).siblings('.productNum').val(newNum);
      //计算总价
      sumPrice()
    };

    //删除该条购物车数据
    if (Tclass == 'delete') {
      var shopCarId = $(target).parent('.cart-order').attr('data-id');
      deleteShopCar(shopCarId, $(target).parent('.cart-order'));
    }
    //选中商品
    if (Tclass == 'checkInp') {
      if (!$("checkInp").attr("checked")) {
        $("checkInp").attr("checked", true);
        //计算总价
        sumPrice()
      } else {
        $("checkInp").attr("checked", false);
        //计算总价
        sumPrice()
      }
    }

  })
}

listClick()

//计算选中商品总价
function sumPrice() {
  var checkBox = $("input[class='checkInp']:checked");
  var priceArr = [];
  var numArr = [];
  var totalPrice = 0;
  // 循环所有选中的checkbox
  for (var i = 0; i < checkBox.length; i++) {
    priceArr.push($(checkBox[i]).siblings('.price').children('.proPrice').html())
    numArr.push($(checkBox[i]).siblings('.num').children('.productNum').val())
  }
  for (var j = 0; j < priceArr.length; j++) {
    totalPrice = totalPrice + (parseInt(numArr[j]) * parseFloat(priceArr[j]));
  }
  $('.totalPrice').html(totalPrice);
}

// id删除购物车
function deleteShopCar(shopCarId, deleteDom) {
  sendAjax('deleteShopCarById', 'POST', shopCarId, function (data) {
    deleteDom.remove();
    //计算总价
    sumPrice()
  }, null)
}
