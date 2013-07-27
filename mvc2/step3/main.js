$(function() {
  new TodoFormView( $('.todoForm') );
  new TodoListView( $('.todoList') );

  // add new feature 1 (usual list)
  $('.usualList li').click(function() {
    Todo.add($(this).text());
  });

  // add new feature 2
  $('.completeAll').click(function() {
    Todo.setCompleteAll();
  });
});