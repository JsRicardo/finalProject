$('#wrapper').swiperImg({
  imgList: [
    'https://img.epetht.com/2018-10/20/13/6edd0c97164921d662c9f90d5e57b0eb.jpg?x-oss-process=style/water',
    'https://img.epetht.com/2018-10/20/13/d3dd5c4dd8c29f0ff4bec9c3196d202d.jpg?x-oss-process=style/water',
    'https://img.epetht.com/2018-10/20/10/04e985040c50a51a09c053e0357408cc.jpg?x-oss-process=style/water'
  ],
  width: 762,
  height: 400,
  timer: 4000
})

function sendAjax(type, url, data, success, Fail) {
  $.ajax({
    type: type,
    url: url,
    data: data,
    success: function (data) {
      var data = JSON.parse(data);
      if (data.status == 'success') {
        success(data.data);
      } else {
        Fail();
      }
    },
    error: function (e) {
      console.log(e)
    }
  })
}

//获得产品分类
function getproductType() {
  sendAjax('POST', '/getproductType', null, renderHtml, function () {
    alert('数据丢失');
  })
}
getproductType();
// 渲染分类按钮
function renderHtml(res) {
  var htmlStr = '';
  for (var i = 0; i < res.length; i++) {
    htmlStr = htmlStr + `<li class="outerLi clear"><h4 data-id=${res[i].id}>${res[i].product_type}</h4>
                          <div class="goodslist">
                            <ul class="innerUl">
                            </ul>
                          </div>
                        </li>`;
  }
  $('.outerUl').html(htmlStr);
  var firstLi = $($($('.outerUl').children('li'))[0]);
  firstLi.addClass('action');

  var typeId = $(firstLi.children('h4')).attr('data-id');
  getProByTypeId(typeId);
}

//分类按钮点击事件
$('.outerUl').on('click', function (e) {
  var target = e.target;
  var liItem = $(target).parent();
  var sibling = $(liItem).siblings();
  var typeId = $(target).attr('data-id');

  liItem.addClass('action');

  for (var i = 0; i < sibling.length; i++) {
    $(sibling[i]).removeClass('action');
  }
  getProByTypeId(typeId);
})
// 根据分类ID获得产品
function getProByTypeId(typeId) {
  sendAjax('POST', '/getproductByType', typeId, renderProlist, function () {
    $('.action').children('.goodslist').children('.innerUl').html('<h2>啊哦！这个类目好像没有产品了哦！</h2>')
  })
}
//渲染产品列表
function renderProlist(result) {
  var temp = '';
  for (var j = 0; j < result.length; j++) {
    temp = temp + `<li class="innerLi clear">
                    <a href="./detail.html?id=${result[j].id}">
                      <div class="img">
                      <img src="/getimg?path=${result[j].icon_img_path}" alt="">
                      </div>
                      <p class="desc">${result[j].product_name}</p>
                      <div class="price">￥<span>${result[j].price}</span></div>
                    </a>
                  </li>`
  }
  var goodslist = $($('.action').children('.goodslist')).children('.innerUl');
  $(goodslist).html(temp);
}

// 获取热门品牌
function getHotPinpaiList() {
  sendAjax('POST', '/getHotPinpaiList', null, function (data) {
    renderHotList(data);
  })
}
getHotPinpaiList()

// 渲染热门品牌标签
function renderHotList(data) {
  var temp = '';
  for (var i = 0; i < data.length; i++) {
    temp += ` <li>
                <a class="listitem" href="./list.html?searchWord=${data[i].pinpai}">${data[i].pinpai}</a>
              </li>`
  }
  $('.hotPinpaiUl').html(temp);
}