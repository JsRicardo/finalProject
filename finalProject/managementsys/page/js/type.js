// 新增分类
$('.typeSubmit').on('click', function () {
    var typeName = $('.typeName').val();

    $.ajax({
        url: '/insertType',
        type: 'POST',
        data: typeName,
        success: function (data) {
            if (JSON.parse(data).status == 'success') {
                alert('新增成功');
                closeWindow($('.newType'));
                closeWindow($('.zhezhao'));
                getType(renderTypeTable);
            } else {
                alert('已存在该产品分类')
            }
        }
    })
})

//请求产品分类
function getType(success) {
    sendAjax('/getType', 'POST', null, success)
}

// 渲染select
function renderSection(data) {
    var temp = '';
    for (var i = 0; i < data.length; i++) {
        temp += `<option data-id='${data[i].id}' value="${data[i].product_type}">${data[i].product_type}</option>`
    }
    $('.type').html(temp);
}

//渲染分类表格
function renderTypeTable(data) {
    var typeTableH = ` <tr bgcolor="#6a598c">
    <th class="textM bold">序号</th>
    <th class="textM bold">产品分类</th>
    `
    var typeTempTd = '';
    for (var k = 0; k < data.length; k++) {
        typeTempTd += ` <tr class="c666 ft14" bgcolor="#fff" data-id='${data[k].id}'>
      <td class="textM">${k + 1}</td>
      <td class="textM">${data[k].product_type}</td>
    </tr>`
    }
    $('.typeTable .typetable tbody').html(typeTableH + typeTempTd);
}