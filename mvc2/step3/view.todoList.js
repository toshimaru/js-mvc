(function() {

  function TodoListView ($el) {
    this.$el = $el;
    Todo.on('add', this.add.bind(this));
  }

  TodoListView.prototype.add = function(todo) {
    var item = new TodoListItemView(todo);
    this.$el.append(item.$el);
  };

  function TodoListItemView(todo) {
    this.todo = todo;
    this.$el = $('<li><input type="checkbox">' + todo.text + '</li>');
    this.$checkbox = this.$el.find('input[type="checkbox"]');

    this.$checkbox.change(this.onchangeCheckbox.bind(this));
    this.todo.on('change:complete', this.onchangeComplete.bind(this));
  }

  TodoListItemView.prototype.onchangeCheckbox = function() {
    this.todo.setComplete(this.$checkbox.is(':checked'));
  };

  TodoListItemView.prototype.onchangeComplete = function() {
    if (this.todo.complete) {
      this.$el.addClass('complete');
    } else {
      this.$el.removeClass('complete');
    }

    this.$checkbox.attr('checked', this.todo.complete);
  };

  window.TodoListView = TodoListView;

})();