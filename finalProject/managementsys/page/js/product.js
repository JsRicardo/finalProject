// 新增产品------------------1

//表单提交事件，新增图片
$('.uploadImg').submit(function (event) {
  event.preventDefault();
  var form = $(this);
  var formData = new FormData(this);
  $.ajax({
    type: form.attr('method'),
    url: form.attr('action'),
    data: formData,
    mimeType: "multipart/form-data",
    contentType: false,
    cache: false,
    processData: false,
    success: function (data) {
      var result = JSON.parse(data)
      insertProduct(result.data)
    }
  })
});

// 新增产品
function insertProduct(imgpathId) {
  var type = $('.type').val();
  var typeid = $('.type option:selected').attr('data-id')
  var pinpai = $('.pinpai').val();
  var name = $('.name').val();
  var desc = $('.desc').val();
  var price = $('.price').val();
  var oldprice = $('.oldprice').val();
  var chengfen = $('.chengfen').val();
  var hanliang = $('.hanliang').val();
  var peifang = $('.peifang').val();
  var proobj = {
    type: type,
    pinpai: pinpai,
    name: name,
    desc: desc,
    price: price,
    oldprice: oldprice,
    chengfen: chengfen,
    hanliang: hanliang,
    peifang: peifang,
    imgpathId: imgpathId,
    typeid: typeid
  }
  sendAjax('/inserProduct', 'POST', proobj, function (data) {
    closeWindow($('.newProWrapper'));
    closeWindow($('.zhezhao'));
    $('.pinpai').val();
    $('.name').val();
    $('.desc').val();
    $('.price').val();
    $('.oldprice').val();
    $('.chengfen').val();
    $('.hanliang').val();
    $('.peifang').val();
    alert('新增成功');
    getProCount();
  })
}

// 获取产品列表----------------------------

function getProCount() {
  sendAjax('/getProCount', 'POST', null, function (data) {
    var count = data[0]['count(id)'];
    var pageSize = 10;
    var nowPage = 1;

    getProductByPage(nowPage, pageSize);
    renderPageBar('#productPage', count, pageSize, getProductByPage);
  })
}

//分页获取产品列表
function getProductByPage(nowPage, pageSize) {
  sendAjax('/getProductByPage', 'POST', { nowPage, pageSize }, function (data) {
    renderTable(data)
  })
}
// 渲染产品表格
function renderTable(data) {
  var tableH = ` <tr bgcolor="#6a598c">
    <th class="textM bold">序号</th>
  <th class="textM bold">产品名称</th>
  <th class="textM bold">产品分类</th>
  <th class="textM bold">品牌</th>
  <th class="textM bold">产品描述</th>
  <th class="textM bold">价格</th>
  <th class="textM bold">市场价格</th>
  <th class="textM bold">主要配方</th>
  <th class="textM bold">主要成分</th>
  <th class="textM bold">成分含量</th>
  </tr>`
  var tempTd = '';
  for (var j = 0; j < data.length; j++) {
    tempTd += ` <tr class="c666 ft14" bgcolor="#fff" data-id='${data[j].id}'>
      <td class="textL">${j + 1}</td>
      <td class="textL">${data[j].product_name}</td>
      <td class="textL">${data[j].product_type}</td>
      <td class="textL">${data[j].pinpai}</td>
      <td class="textL">${data[j].pro_desc}</td>
      <td class="textL">${data[j].price}</td>
      <td class="textL">${data[j].old_price}</td>
      <td class="textL">${data[j].main_peifang}</td>
      <td class="textL">${data[j].main_contents}</td>
      <td class="textL">${data[j].hanliang}</td>
    </tr>`
  }
  $('.cententTable .protable tbody').html(tableH + tempTd);
}

//获取产品详情------------------------

//ID获取产品图片
function getProImg(productid) {
  sendAjax('/getProImg', 'POST', productid, renderProImg)
}
//渲染产品img
function renderProImg(data) {
  var imgPathId = data[0].id;
  var iconImg = data[0].icon_img_path;
  var bigImg = data[0].big_img_path.split('&');
  var detailImg = data[0].detail_img_path.split('&');

  var iconTemp = `<img src="/getPic?path=${iconImg}" alt="">`
  var bigTemp = '';
  var detailTemp = '';
  for (var i = 1; i < bigImg.length; i++) {
    bigTemp += `<img src="/getPic?path=${bigImg[i]}" alt="">`;
  }
  for (var j = 1; j < detailImg.length; j++) {
    detailTemp += `<img src="/getPic?path=${detailImg[j]}" alt="">`;
  }
  $('.iconimg .imgBox').html(iconTemp);
  $('.bigimg .imgBox').html(bigTemp);
  $('.detailimg .imgBox').html(detailTemp);
  $('.imgbox').attr('data-id', imgPathId)
}
// 产品详细信息点击事件
// $('.protable').on('click', function (e) {
//   $('.zhezhao').css('display', 'block');
//   $('.productDetail').css('display', 'block');
//   var productid = $($(e.target).parent('tr')).attr('data-id');
//   var product_name = $(e.target).parent('tr').children('td').eq(1).text();
//   var type = $(e.target).parent('tr').children('td').eq(2).text();
//   var pinpai = $(e.target).parent('tr').children('td').eq(3).text();
//   var desc = $(e.target).parent('tr').children('td').eq(4).text();
//   var price = $(e.target).parent('tr').children('td').eq(5).text();
//   var oldprice = $(e.target).parent('tr').children('td').eq(6).text();
//   var peifang = $(e.target).parent('tr').children('td').eq(7).text();
//   var chengfen = $(e.target).parent('tr').children('td').eq(8).text();
//   var hanliang = $(e.target).parent('tr').children('td').eq(9).text();

//   renderProDetailInp(product_name, type, pinpai, desc, price, oldprice, peifang, chengfen, hanliang);
//   getProImg(productid);
//   $('.deletePro').attr('data-id', productid);
// })

//渲染产品详情Input
function renderProDetailInp(product_name, type, pinpai, desc, price, oldprice, peifang, chengfen, hanliang) {
  var temp = ` <tr>
    <td class="alignright">产品分类：</td>
    <td>
    <input class="utype" type="text" value='${type}'>
    </td>
  </tr>
  <tr>
    <td class="alignright">品牌：</td>
    <td><input class="upinpai" type="text" value='${pinpai}'></td>
  </tr>
  <tr>
    <td class="alignright">名称：</td>
    <td><input class="uname" autocomplete="off" type="text" value='${product_name}'></td>
  </tr>
  <tr>
    <td class="alignright">描述：</td>
    <td><input class="udesc" autocomplete="off" type="text" value='${desc}'></td>
  </tr>
  <tr>
    <td class="alignright">价格：</td>
    <td><input class="uprice" autocomplete="off" type="text" value='${price}'></td>
  </tr>
  <tr>
    <td class="alignright">老价格：</td>
    <td><input class="uoldprice" autocomplete="off" type="text" value='${oldprice}'></td>
  </tr>
  <tr>
    <td class="alignright">主要成分：</td>
    <td><input class="uchengfen" autocomplete="off" type="text" value='${chengfen}'></td>
  </tr>
  <tr>
    <td class="alignright">成分含量：</td>
    <td><input class="uhanliang" autocomplete="off" type="text" value='${hanliang}'></td>
  </tr>
  <tr>
    <td class="alignright">配方：</td>
    <td><input class="upeifang" autocomplete="off" type="text" value='${peifang}'></td>
  </tr>`
  $(".pinnerWrapper table").html(temp)
}

// 删除产品--------------------------

// 根据ID删除产品
function deleteProductById(proId) {
  sendAjax('/deleteProductById', 'POST', proId, function (data) {
    closeWindow($('.productDetail'));
    closeWindow($('.zhezhao'));
    alert('删除成功！');
    getProCount();
  })
}

// 顶部菜单栏点击事件-------------

// 分页获取产品列标
$('.proList').on('click', function () {
  getProCount()
})

//获取热门产品
$('.hotpro').on('click', function () {
  sendAjax('getHotProList', 'POST', null, renderTable);
})

//新增产品
$('.newpro').on('click', function () {
  openWindow($('.newProWrapper'));
  openWindow($('.zhezhao'));
  getType(renderSection);
})


function topWrapperClick() {
  var product_name, productid, type, pinpai, desc, price, oldprice, peifang, chengfen, hanliang;

  $('.proTableWrapper').on('click', function (e) {
    var target = e.target;

    //表格点击事件
    if ($(target)[0].tagName == 'TD') {
      var td = $(target).parent('tr').children('td')
      productid = $(target).parent('tr').attr('data-id');
      product_name = td.eq(1).text();
      type = td.eq(2).text();
      pinpai = td.eq(3).text();
      desc = td.eq(4).text();
      price = td.eq(5).text();
      oldprice = td.eq(6).text();
      peifang = td.eq(7).text();
      chengfen = td.eq(8).text();
      hanliang = td.eq(9).text();

      $(target).parent('tr').addClass('choose').siblings('tr').removeClass('choose');
    }

    //查看产品详情
    if ($(target).prop('class') == 'proDetail') {
      if (!product_name) {
        alert('请先选择产品！');
        return;
      }
      $('.zhezhao').css('display', 'block');
      $('.productDetail').css('display', 'block');
      renderProDetailInp(product_name, type, pinpai, desc, price, oldprice, peifang, chengfen, hanliang);
      getProImg(productid);
      $('.deletePro').attr('data-id', productid);
    }

    //设为热门商品
    if ($(target).prop('class') == 'updateHot') {
      if (!productid) {
        alert('请先选择产品！');
        return;
      }
      sendAjax('/updateHotProById', 'POST', productid, function (data) {
        alert('设置成功！');
      })
    }

    //取消热门商品
    if ($(target).prop('class') == 'deleteHot') {
      if (!productid) {
        alert('请先选择产品！');
        return;
      }
      sendAjax('/updateProNormalById', 'POST', productid, function (data) {
        alert('设置成功！');
      })
    }


  })

}
topWrapperClick();