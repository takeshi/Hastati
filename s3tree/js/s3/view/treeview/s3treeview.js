(function($, undefined) {
  $.cha.ns("s3.treeview");

  $.cha.js("s3.S3Client");
  $.cha.js("s3.XmlParser");
  $.cha.js("EventBus");

  $.cha.html("s3.treeview.tree");
  $.cha.html("s3.treeview.main");

  $.cha.css("s3.treeview.treeview");

  $.widget("ui.s3treeview", {
    version : "0.1",
    options : {
      s3client : null,
      key : null,
      secret : null,
      bucket : "",
      prefix : null,
      delimiter : "/",
      eventBus : new $.cha.EventBus()
    },

    renderTree : function(prefix, element) {
      var self = this;
      this.s3client.list(this.options.bucket, null, prefix,
          this.options.delimiter, {
            success : function(data) {
              var result = $.cha.s3.XmlParser.parseListBucketResult(data);

              result.ContentsList.sort($.cha.namesort);
              var html = $.render(result, "cha.s3.treeview.tree");
              var tree = $(html);
              tree.appendTo(element);
              self._createTree(tree);
            }
          });
    },
    _createTree : function(tree) {
      var self = this;
      tree.treeview();

      tree.find(".folderItem").bind("click.loadFolder", function(event) {
        self._loadFolder(this, event);
        event.preventDefault();
      });

      tree.find(".folder").bind("click.folder", function(event) {
        var prefix = $(this).attr("prefix");
        self.options.eventBus.trigger("changePrefix", prefix);
        event.preventDefault();
      });
    },
    _loadFolder : function(element, event) {
      var self = this;
      var prefix = $(element).attr("prefix");
      console.log(window.location);
      this.options.eventBus.trigger("changePrefix", prefix);
      $(element).find(".dummyFolder").remove();
      $(element).unbind("click.loadFolder");
      this.renderTree(prefix, $(element));
    },

    _create : function() {
      if (this.options.s3client) {
        this.s3client = this.options.s3client;
      } else {
        this.s3client = new $.cha.s3.S3Client(this.options.key,
            this.options.secret);
      }

      var main = $.render({
        Name : this.options.bucket
      }, "cha.s3.treeview.main");
      var frame = $(main);
      frame.appendTo(this.element);
      this._createTree(frame.find(".tree"));
    }
  });
}(jQuery));