goog.provide("s3.model.CommonPrefixes");

(function(undefined) {

  /**
   * @constructor
   * @param {s3.ListBucketResult}
   *            parent
   */
  s3.model.CommonPrefixes = function(parent) {
    this.parent = parent;
    this.Prefix = "";

    this.folder = true;
  };

  s3.model.CommonPrefixes.prototype.name = function() {
    return this.Prefix.substring(this.parent.Prefix.length,
        this.Prefix.length - 1);
  };

}());