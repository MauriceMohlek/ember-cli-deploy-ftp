var promise = require('ember-cli/lib/ext/promise');
var coreObject = require('core-object');
var jsFtp = require('jsftp');
var _ = require('lodash');

module.exports = coreObject.extend({
  init(options) {
    this._options = options || {};
  },
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
  upload(filesToUpload) {
    filesToUpload = filesToUpload || [];
    filesToUpload.forEach((file)=> {
      console.log(`${this._options.distDir}/${file}`);
      //this._ftp.put();
    });
  }
});
