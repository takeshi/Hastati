goog.provide("s3.app");

goog.require("s3.load");
goog.require("downtown.EventBus");
goog.require("s3.view.login");
goog.require("s3.view.bucketselector");

(function($) {
  $(function() {
    var eventBus = new downtown.EventBus();
    $("#login")["s3login"]({
      eventBus : eventBus
    });
    $('#buckets')["bucketselector"]({
      eventBus : eventBus
    });
  });
}(jQuery));
