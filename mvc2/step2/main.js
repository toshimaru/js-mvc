$(function () {
  var $form = $('.todoForm');
  var $input = $form.find('input[type="text"]');
  var $list = $('.todoList');
  var $usual = $('.usualList li');

  console.log($usual);

  function addList(text) {
    var html = '<li><input type="checkbox">' + text + '</li>';
    var $li = $(html);

    $li.find('input[type="checkbox"]').change(function(e){
      $(this).closest('li').toggleClass('complete');
    });

    $list.append($li);
  }

  $usual.click(function(e) {
    e.preventDefault();

    var text = $(this).text();
    addList(text);
  });

  $form.submit(function(e){
    e.preventDefault();

    var text = $input.val();
    addList(text);
  });
});