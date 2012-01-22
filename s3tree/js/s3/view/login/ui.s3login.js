goog.provide("s3.view.login");

goog.require("s3.view.login.LoginView");

(function($) {
  $.widget("ui.s3login", {
    options : {},
    _create : function() {
      this.view = new s3.view.login.LoginView({
        el : this.element
      });
      this.view.render();
    }
  });

}(jQuery));