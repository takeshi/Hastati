goog.provide("s3.model.ListAllMyBucketsResult");

goog.require("s3.model.Owner");
goog.require("s3.model.Bucket");

(function($, undefined) {

  /**
   * @constructor
   */
  s3.model.ListAllMyBucketsResult = function() {
    this.Owner = new s3.model.Owner();
    this.Buckets = [];
  };

}(jQuery));