goog.provide("s3.view.login.LoginView");

goog.require("downtown.Loader");
goog.require("s3.model.LoginUser");

/**
 * @constructor
 */
s3.view.login.LoginView = function(attr) {
  this.model = new s3.model.LoginUser();
  Backbone.View.call(this, attr);
};
goog.inherits(s3.view.login.LoginView, Backbone.View);

(function($, undefined) {

  s3.view.login.LoginView.prototype.render = function() {
    var self = this;
    downtown.Loader.loadHtml("s3/view/login/login", function() {
      var html = $($.render({}, "s3/view/login/login"));
      $(self.el).html(html);
      html.link(self.model);
    });
  };

}(jQuery));