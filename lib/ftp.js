var coreObject = require('core-object');
var jsFtp = require('jsftp');
var _ = require('lodash');

module.export = coreObject.extend({
  init(options) {
    console.log(`init ${options}`);
  },
  upload(options) {
    options = option || {};
    console.log(options);
  }

});
