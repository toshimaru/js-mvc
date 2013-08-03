// モデル
var Bookmark = Backbone.Model.extend({
});

// コレクション
var Bookmarks = Backbone.Collection.extend({
  model: Bookmark
});

// １つのブックマークモデルに対する１つのビュー
var BookView = Backbone.View.extend({
  tagName: 'div',
  className: 'bookContainer',
  template: _.template( $( '#item-template' ).html() ),

  // イベントの登録
  events: {
     'click .title': 'clickEvent',
     'click .delete': 'deleteBook'
  },

  clickEvent: function() {
    alert(this.model.get('user'));
    this.$el.append('<strong>Clicked!</strong>');
  },

  deleteBook: function() {
    this.remove();
  },

  render: function() {
    // this.el is what we defined in tagName. 
    // use $el to get access to jQuery html() function
    // console.log(this.model.toJSON());
    this.$el.html(this.template( this.model.toJSON() ));
    return this;
  }
});

// アプリケーション全体（コレクション）のコンテナビュー
var BookmarkView = Backbone.View.extend({
  el: '#bookmark',

  initialize: function( initialBookmarks ) {
    // コレクションを登録
    this.collection = initialBookmarks;
    this.render();
  },

  // render library by rendering each book in its collection
  render: function() {
    this.collection.each(function( item ) {
      this.renderBookmark( item );
    }, this );
  },

  // render a book by creating a BookView and appending the
  // element it renders to the library's element
  renderBookmark: function( item ) {
    var bookView = new BookView({ model: item });
    this.$el.append( bookView.render().el );
  }
});


$(function(){
  // コレクションを生成
  var bookmarks = new Bookmarks();
  console.log(bookmarks.toJSON());

  // ブックマーク情報を取得
  $.getJSON('http://b.hatena.ne.jp/entry/jsonlite/?url=https://www.google.com/&callback=?').done(function(data) {
    $.each(data, function(k, v) {
      // console.log(k + " : " + v);
      if (k === 'bookmarks') {
        _.each(v, function(bookmark){
          // ブックマーク情報をコレクションにADDしていく
          bookmarks.add(bookmark);
        });
      }
    });

    // console.log(bookmarks.toJSON());
    // コレクションをビューに渡してレンダリング
    new BookmarkView(bookmarks);
  }).fail(function(data) {
    console.debug( "error" );
  }).always(function() {
    console.debug( "complete" );
  });
});

