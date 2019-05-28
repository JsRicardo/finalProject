//获取客户数量
function getCustomerCount() {
  sendAjax('/getCoustomerCount', 'POST', null, function (data) {
    var count = data[0]['count(id)'];
    var pageSize = 10;
    var nowPage = 1;

    getCustomerByPage(nowPage, pageSize)
    renderPageBar('#customerPage', count, pageSize, getCustomerByPage);
  })
}
// 分页获取客户列表
function getCustomerByPage(nowPage, pageSize) {
  sendAjax('/getCustomerByPage', 'POST', { nowPage, pageSize }, function (data) {
    renderCustomerTable(data)
  })
}
// 渲染客户表格
function renderCustomerTable(data) {
  var tableH = ` <tr bgcolor="#6a598c">
                    <th class="textM bold">序号</th>
                    <th class="textM bold">昵称</th>
                    <th class="textM bold">姓名</th>
                    <th class="textM bold">电话</th>
                    <th class="textM bold">城市</th>
                    <th class="textM bold">详细地址</th>
                    <th class="textM bold">创建时间</th>
                  </tr>`
  var tempTd = '';
  for (var i = 0; i < data[0].length; i++) {
    tempTd += ` <tr class="c666 ft14" bgcolor="#fff" data-id='${data[0][i].id}'>
                  <td class="textL">${i + 1}</td>
                  <td class="textL">${data[0][i].username}</td>
                  <td class="textL">${data[1][i].real_name}</td>
                  <td class="textL">${data[1][i].phone}</td>
                  <td class="textL">${data[1][i].city}</td>
                  <td class="textL">${data[1][i].address}</td>
                  <td class="textL">${data[0][i].create_date}</td>
                </tr>`
  }
  $('.customertable tbody').html(tableH + tempTd);
}

// 获取管理员表格
function getAdminList() {
  sendAjax('/getAdminList', 'POST', null, renderAdminList);
}

//渲染管理员表格
function renderAdminList(data) {
  var tableH = ` <tr bgcolor="#6a598c">
                    <th class="textM bold">序号</th>
                    <th class="textM bold">名称</th>
                    <th class="textM bold">创建人</th>
                    <th class="textM bold">创建时间</th>
                  </tr>`
  var tempTd = '';
  for (var i = 0; i < data.length; i++) {
    tempTd += ` <tr class="c666 ft14" bgcolor="#fff" data-id='${data[i].id}'>
                  <td class="textM">${i + 1}</td>
                  <td class="textL">${data[i].admin}</td>
                  <td class="textL">${data[i].create_person}</td>
                  <td class="textL">${data[i].create_date}</td>
                </tr>`
  }
  $('.admintable tbody').html(tableH + tempTd);
}
// 管理员表格点击事件（删除管理员）
function deleteAdmin() {
  var adminId;

  $('.tableWrapper').on('click', function (e) {
    if ($(e.target)[0].tagName == 'TD') {
      adminId = $($(e.target).parent('tr')).attr('data-id');
      $(e.target).parent('tr').addClass('choose').siblings('tr').removeClass('choose');
    }
    if ($(e.target).prop('class') == 'deleteAdmin') {
      if (!adminId) {
        alert('请先选择管理员！');
        return;
      }
      sendAjax('/deleteAdminById', 'POST', adminId, function (data) {
        getAdminList();
      })
    }
  })
}
deleteAdmin();

//新增管理员提交
$('.adminSubmit').on('click', function () {
  var createUser = $('.adminName').html();
  var adminName = $('.adName').val();
  var adminPwd = $('.adminPwd').val();

  sendAjax('insertAdmin', 'POST', { adminName, adminPwd, createUser }, function (data) {
    closeWindow($('.zhezhao'));
    closeWindow($('.newAdminWrapper'));
    alert('新增成功！');
    getAdminList();
  })
})