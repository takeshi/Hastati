(function($, undefined) {

  var LIST_VIEW = "html!s3/view/bucketselector/list";

  require(
  //
  [ "jquery", "jquery/jsrender", //
  LIST_VIEW,//
  "css!s3/view/bucketselector/list" ],//
  function($, html) {
    $.widget("ui.bucketselectview", {
      options : {
        result : null,
        s3client : null,
        selectBucket : function(bucketName) {
          console.log(bucketName);
        }
      },
      getS3client : function() {
        return this.options.s3client;
      },
      _create : function() {
        var self = this;
        var html = $.render(this.options.result, LIST_VIEW);
        var tree = $(html);
        tree.appendTo(this.element);
        var bucket = localStorage["s3.selectedBucket"];
        if (bucket) {
          self.options.selectBucket(bucket);
          $(tree).find("option").each(function(i, e) {
            if ($(e).attr("bucket") == bucket) {
              $(e).attr("selected", true);
            }
          });
        }
        tree.find("select").bind("change", function() {
          var selected = $(tree).find("option:selected").attr("bucket");
          localStorage["s3.selectedBucket"] = selected;
          self.options.selectBucket(selected);
        });
      }
    });
  });
}());