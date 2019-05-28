
var height = $('.hiddendiv').height();
$('.leftwrapper').css("height", height)

$('.ulwrapper').on('click', function (e) {
  $(e.target).parents('li').siblings('li').removeClass('action')
  $(e.target).parents('li').addClass('action')

  var nowheight = $(e.target).siblings('.hiddendiv').height();
  $('.leftwrapper').css("height", nowheight)
})

function sendAjax(type, url, data, success) {
  $.ajax({
    type: type,
    url: url,
    data: data,
    success: function (data) {
      success(data)
    },
    error(e) {
      console.log(e);
    }
  })
}

function getData() {
  var searchParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1] : '';
  var productId = parseInt(searchParams.split('=')[1]);
  var url = '/getproductById?productid=' + productId;
  sendAjax('GET', url, null, renderHtml);
}

function renderHtml(data) {
  var result = JSON.parse(data).data[0];
  $('.main').data(result)
  var bigImgArr = result.big_img_path.split('&');
  var detailImgArr = result.detail_img_path.split('&');


  var nameTemp = `<p class="goodsname">${result.product_name}</p><p class="desc">${result.pro_desc}</p>`;

  var imgTemp = `<img src="/getimg?path=${bigImgArr[1]}" alt="">`;
  var imgList = '';
  var detailimg = '';
  for (var i = 1; i < bigImgArr.length; i++) {
    imgList += ` <li><img src="/getimg?path=${bigImgArr[i]}" alt=""></li>`;
  };
  for (var j = 1; j < detailImgArr.length; j++) {
    detailimg += `<img src="/getimg?path=${detailImgArr[j]}" alt="">`
  }

  var priceTemp = `￥<span class="nowprice">${result.price}</span><span class="oldprice">市场价：￥<span id="oldprice">${result.old_price}</span></span>`;

  var tableTemp = `<tbody>
    <tr bgcolor="#f6f6f6">
      <th class="textR bold ft14">参数名称</th>
      <th class="ftleft bold ft14">产品参数</th>
    </tr>
    <tr class="ft14" bgcolor="#fff">
      <td class="textR">主要成份</td>
      <td class="ftleft ">
      ${result.main_contents}</td>
    </tr>
    <tr class="ft14" bgcolor="#fff">
      <td class="textR">成份含量</td>
      <td class="ftleft ">
      ${result.hanliang}</td>
    </tr>
    <tr class="ft14" bgcolor="#fff">
      <td class="textR">主要配方</td>
      <td class="ftleft">
        <div class=""><span>${result.main_peifang}</span></div>
      </td>
    </tr>
  </tbody>`

  $('.name').html(nameTemp);
  $('.img').html(imgTemp);
  $('.smallimgWrapper').html(imgList);
  $('.price').html(priceTemp);
  $('table').html(tableTemp);
  $('.imgList').html(detailimg);
}

getData()

$('.jianshao').on('click', function () {
  var num = parseInt($('.goodsnum').val());
  var nuwNum = num <= 1 ? num : num - 1;
  $('.goodsnum').val(nuwNum)
})

$('.add').on('click', function () {
  var num = parseInt($('.goodsnum').val());
  var nuwNum = num + 1;
  $('.goodsnum').val(nuwNum)
})

//购物下单
$('.buyNow').on('click', function () {
  if (!document.cookie) {
    alert('亲，请先登录哦！');
    location.href = './login.html';
  } else {
    var price = $('.main').data('price');
    var productid = $('.main').data('id');
    var productName = $('.main').data('product_name');
    var count = parseInt($('.goodsnum').val());
    var userName = $('.username').html();
    sendAjax('POST', '/makeOrder', { price, productid, productName, count, userName }, function (data) {
      var data = JSON.parse(data);
      if (data.status == 'success') {
        location.href = './buy.html?num=' + data.data;
      } else {
        alert('这个宝贝好像没货了唉，试试其他宝贝吧！');
      }
    })
  }
})

//加入购物车
$('.waitBuy').on('click', function () {
  if (!document.cookie) {
    alert('亲，请先登录哦！');
    location.href = './login.html';
  } else {
    var price = $('.main').data('price');
    var productid = $('.main').data('id');
    var productName = $('.main').data('product_name');
    var count = $('.goodsnum').val();
    var userId = $('.username').attr('data-id');

    sendAjax('POST', '/insertShopCar', { price, productid, productName, count, userId }, function (data) {
      if (JSON.parse(data).status == 'success') {
        alert('添加成功！');
      } else {
        alert('啊哦！好像失败了，再试试吧！');
      }
    })
  }
})

//获取热门列表
function getHotList() {
  sendAjax('POST', '/getHotList', null, function (data) {
    var data = JSON.parse(data)
    if (data.status == 'success') {
      renderHotList(data.data)
    } else {
      return;
    }
  })
}
getHotList()

//渲染热门商品
function renderHotList(data) {
  console.log(data)
  var temp = '';
  for (var i = 0; i < data.length; i++) {
    temp += `   <li>
                  <a href="./detail.html?id=${data[i].id}">
                    <img src="/getimg?path=${data[i].iconImgPath}" alt="">
                    <div class="desc">
                      ${data[i].product_name}
                      <span class="cf60 clear">￥${data[i].price}</span>
                    </div>
                  </a>
                </li>`
  }
  $('.hotProcut').html(temp);
}