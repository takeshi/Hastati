goog.provide("s3.app");
goog.require("s3.load");

goog.require("s3.view.login");

(function($) {
  $(function() {
    $("#login")["s3login"]();

  });
}(jQuery));
