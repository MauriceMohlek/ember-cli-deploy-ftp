var coreObject = require('core-object');
var jsFtp = require('jsftp');
var _ = require('lodash');

module.exports = coreObject.extend({
  init(options) {
    console.log(`init ${options}`);
  },
  upload(options) {
    options = options || {};
    console.log(options);
  }
});
