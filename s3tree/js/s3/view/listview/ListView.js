goog.provide("s3.view.listview.ListView");

goog.require("downtown.Loader");

/**
 * @constructor
 */
s3.view.listview.ListView = function(attr) {
  Backbone.View.call(this, attr);
  this.eventBus = new downtown.EventBus();
  if (attr.eventBus) {
    this.eventBus = attr.eventBus;
  }

};
goog.inherits(s3.view.listview.ListView, Backbone.View);

(function($, undefined) {
  s3.view.listview.ListView.prototype.bindEventBus = function() {
    var self = this;
    this.eventBus.bind("prefix_change", function(event, prefix) {
      // console.log(prefix);
      self.s3client = prefix.client;
      self.bucket = prefix.bucket;
      prefix.loadBucket({
        success : function(result) {
          self.model = result;
          self.render();
        },
        error : function(req, status) {
          alert("Bucket Load Error " + status);
        }
      });
    });
  };

  s3.view.listview.ListView.prototype.render = function() {
    var self = this;
    downtown.Loader.loadHtml("s3/view/listview/list", function(src) {
      $(self.el).children().remove();
      var html = $($.render(self.model, src));
      $(html).appendTo(self.el);
      var table = $(html).find("table");

      $(table).dataTable({
        "bScrollInfinite" : true,
        "bScrollCollapse" : true,
        "sScrollY" : "200px"
      });
      self.bindEvent();
    });
  };

  s3.view.listview.ListView.prototype.bindEvent = function() {
    var self = this;
    $(self.el).find("a").bind("dblclick", function(event) {
      var key = $(this).attr("key");
      var url = self.s3client.createGetUrl(self.bucket, key);
      window.open(url);
      // alert(url);
      event.preventDefault();
    });
  };

}(jQuery));