goog.provide("downtown.EventBus");

(function($) {

  /**
   * @constructor
   */
  downtown.EventBus = function() {
    this.dispacher = $("<div></div>");
  };
  downtown.EventBus.prototype.bind = function(type, data, callback) {
    this.dispacher.bind(type, data, callback);
  };
  downtown.EventBus.prototype.trigger = function(type, data) {
    this.dispacher.trigger(type, data);
  };

}(jQuery));