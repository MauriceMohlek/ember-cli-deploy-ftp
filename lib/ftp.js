var promise = require('ember-cli/lib/ext/promise');
var coreObject = require('core-object');
var jsFtp = require('jsftp');
var _ = require('lodash');

module.exports = coreObject.extend({
  connect(options) {
    return new promise((resolve, reject)=> {
      try {
        this._ftp = new jsFtp(options);
        this._ftp.socket.on('connect', ()=> { //Only resolve if connected
          resolve(this);
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  upload(options) {
    options = options || {};
    console.log(options);
  }
});
