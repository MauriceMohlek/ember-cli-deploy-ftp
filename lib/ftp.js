var promise = require('ember-cli/lib/ext/promise');
var coreObject = require('core-object');
var jsFtp = require('jsftp');
var fs = require('fs');

module.exports = coreObject.extend({
  init(options) {
    this._options = options || {};
  },
  connect(options) {
    return new promise((resolve, reject)=> {
      try {
        this._ftp = new jsFtp(options);
        this._ftp.on('jsftp_debug', (eventType, data)=> {
          console.log('DEBUG: ', eventType);
          console.log(JSON.stringify(data, null, 2));
        });
        this._ftp.once('connect', ()=> {
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
      var f = `./${this._options.distDir}/${file}`;
      var data = fs.readFileSync(f);
      console.log(f);
      this._ftp.put(data, `/${file}`, (hadError)=> {
        if (!hadError) {
          console.log(`Uploaded ${file}`);
        } else {
          console.log(`Error on uploading ${file}`);
        }
      });
    });
  }
});
