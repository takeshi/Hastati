goog.provide("s3.model.ListBucketResult");

(function($, undefined) {
  /**
   * @constructor
   * @param {s3.model.ListBucketResult}
   *            parent
   */
  s3.model.ListBucketResult = function(parent) {
    this.parent = parent;
    this.Name = "";
    this.Prefix = "";
    this.Marker = "";
    this.MaxKeys = 0;
    this.Delimiter = "";
    this.IsTruncated = false;
    this.ContentsList = [];
  };

}(jQuery));