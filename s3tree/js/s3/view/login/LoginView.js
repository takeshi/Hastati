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
      var userJson = localStorage["s3.login.user"];
      if (userJson) {
        self.model = new s3.model.LoginUser(JSON.parse(userJson));
      }

      html.link(self.model);
      self.bindEvent();
    });
  };

  s3.view.login.LoginView.prototype.bindEvent = function() {
    var self = this;
    $(this.el).find(".login").click(function(e) {
      // alert(JSON.stringify(self.model));
      self.model.accessKey = self.model.accessKey.trim();
      self.model.secretKey = self.model.secretKey.trim();
      self.model.loadBuckets({
        success : function(buckets) {
          console.log(buckets);
        },
        error : function(req, status) {
          alert("Login Error status:" + status);
        }
      });
    });

    $(this.el).find(".save").click(function(e) {
      localStorage["s3.login.user"] = JSON.stringify(self.model);
    });
  };

}(jQuery));