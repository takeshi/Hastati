goog.provide("downtown.Loader");

/**
 * @constructor
 */
downtown.Loader = function() {
};

(function($, settings) {

  downtown.Loader.loadJs = function(src) {
    src = settings["basePath"] + src + ".js";
    var script = $("<script></script>");
    script.attr("type", "text/javascript");
    script.attr("src", src);
    $("head").append(script);
  };
  var loadedHtml = {};

  downtown.Loader.loadHtml = function(src, callback) {
    if (loadedHtml[path]) {
      setTimeout(callback(), 0);
    }

    var path = settings["basePath"] + src + ".html";
    $.ajax({
      async : true,
      dataType : "text",
      url : path,
      success : function(data) {
        loadedHtml[path] = true;
        $.template(src, data);
        callback(data);
      }
    });
  };
  downtown.Loader.loadCss = function(src) {
    var href = settings["basePath"] + src + ".css";
    var link = $("<link/>");
    link.attr("rel", "stylesheet");
    link.attr("type", "text/css");
    link.attr("href", href);
    $("head").append(link);

  };
}(jQuery, window["settings"]));