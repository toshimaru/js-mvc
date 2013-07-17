(function() {
  function Todo(data) {
    this.text = data.text;
    this.complete = !!data.complete;
  }

  $.extend(Todo.prototype, Events);
  $.extend(Todo, Events);

  Todo.prototype.setComplete = function(complete) {
    this.complete = !!complete;
    this.trigger('change:complete', this);
  };

  Todo.list = [];

  Todo.add = function(text) {
    var todo = new Todo({text: text});

    Todo.list.push(todo);
    this.trigger('add', todo);
  };

  // 外部に公開
  window.Todo = Todo;

})();