$('.topwrapper').on('click', function (e) {
    var target = e.target;
    $(target).addClass('action').siblings('li').removeClass('action')
})

function sendAjax(keyword, url) {
    $.ajax({
        url: url,
        type: 'POST',
        data: keyword,
        success(data) {
            var data = JSON.parse(data);
            if (data.status == 'success') {
                renderProList(data.data)
            } else {
                $('.listUl').html(`<h5>好像没有找到您想要的产品哎！</h5>`)
            }
        },
        error(e) {
            console.log(e)
        }
    })
}

function renderProList(data) {
    var temp = '';
    for (var i = 0; i < data.length; i++) {
        temp += `<li>
        <a href="./detail.html?id=${data[i].id}">
            <img src="/getimg?path=${data[i].icon_img_path}" alt="" class="bigimg">
            <div class="name">
                ${data[i].product_name}
            </div>
            <div class="pricewrapper">
                <span class="oldprice">￥${data[i].old_price}</span>
                <span class="nowprice">￥${data[i].price}</span>
            </div>
        </a>
    </li>`
    }
    $('.listUl').html(temp);
}

function getProductByKeyWord() {
    var searchParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1] : '';
    var keyword = searchParams.split('=')[1];

    if (keyword && keyword.length != 0) {
        $('.inptxt').val(decodeURI(keyword));
        sendAjax(keyword, '/searchFunc');
    } else {
        return;
    }

}

getProductByKeyWord();



function getProducts() {
    var keyword = {
        pinpai: null,
        type: null,
        peifang: null,
        price: null
    };

    // sendAjax(keyword, '/searProducts');

    $('.topwrapper').on('click', function (e) {
        var target = e.target;
        var parentId = $(target).parent().prop('id');
        if (parentId == '1') {
            keyword.pinpai = $(target).html() == '全部' ? null : $(target).html();
        } else if (parentId == '2') {
            keyword.type = $(target).html() == '全部' ? null : $(target).html();
        } else if (parentId == '3') {
            keyword.peifang = $(target).html() == '全部' ? null : $(target).html();
        } else if (parentId == '4') {
            if ($(target).html() == '全部') {
                keyword.price = null;
            } else if ($(target).html() == '100元以内') {
                keyword.price = '0-100元';
            } else if ($(target).html() == '1000元以上') {
                keyword.price = '1000-∞元';
            } else {
                keyword.price = $(target).html();
            }
        }
        sendAjax(keyword, '/searProducts')
    })

}

getProducts()


