(function(undefined) {
  var LIST_VIEW = "s3/view/listview/list";

  require([ "jquery", "iemon/iemon", "iemon/EventBus", "s3/parser/XmlParser",
      "iemon/utils",
  ],//
  function($, iemon, EventBus, XmlParser, utils) {

    iemon.html(LIST_VIEW);
    iemon.css(LIST_VIEW);

    $.widget("ui.s3listview", {
      options : {
        s3client : null,
        bucket : "",
        prefix : "",
        eventBus : new EventBus()
      },
      _updateList : function(prefix) {
        var self = this;
        this.options.s3client.list(this.options.bucket, null, prefix, "/", {
          success : function(data) {
            var result = XmlParser.parseListBucketResult(data);
            result.ContentsList.sort(utils.namesort);
            $(self.element).children().remove();

            var html = $.render(result, LIST_VIEW);
            $(html).appendTo(self.element);
            var table = $(html).find("table");

            $(table).dataTable({
              "bScrollInfinite" : true,
              "bScrollCollapse" : true,
              "sScrollY" : "200px"
            });

            $(self.element).find("a").bind(
                "dblclick",
                function(event) {
                  var key = $(this).attr("key");
                  var url = self.options.s3client.createGetUrl(
                      self.options.bucket, key);
                  window.open(url);
                  event.preventDefault();
                })
            //
            .hover(function() {
              $(this).addClass("hover");
            }, function() {
              $(this).removeClass("hover");
            });
          }
        });
      },
      _create : function() {
        var self = this;
        this.options.eventBus.bind("changePrefix", function(event, prefix) {
          if (window.location.hash != prefix) {
            window.location.hash = prefix;
          }
          self._updateList(prefix);
        });
        this._updateList(this.options.prefix);
      }
    });
  });

}());