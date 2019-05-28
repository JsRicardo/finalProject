

$('.searchBtn').on('click', function () {
  var searchWord = $('.inptxt').val();
  location.href = './list.html?searchWord=' + searchWord;
})
