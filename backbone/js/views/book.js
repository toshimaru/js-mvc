var app = app || {};

(function(){
  "use strict";

  app.BookView = Backbone.View.extend({
      tagName: 'div',
      className: 'bookContainer',
      template: _.template( $( '#bookTemplate' ).html() ),

      render: function() {
          //this.el is what we defined in tagName. use $el to get access to jQuery html() function
          this.$el.html( this.template( this.model.toJSON() ) );
          console.log( this.model.toJSON() );
          return this;
      }
  });

})();
