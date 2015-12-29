/* jshint node: true */
'use strict';
var promise = require('ember-cli/lib/ext/promise');
var basePlugin = require('ember-cli-deploy-plugin');
var minimatch = require('minimatch');
var ftp = require('./lib/ftp');

module.exports = {
  name: 'ember-cli-deploy-ftp',

  createDeployPlugin(options) {
    var deployPlugin = basePlugin.extend({
      name: options.name,

      requiredConfig: ['host', 'user', 'pass'],
      defaultConfig: {
        filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,ttf,woff,woff2}',
        port: 21,
        distFiles(context) {
          return context.distFiles || [];
        },
        distDir(context) {
          return context.distDir || [];
        },
      },
      upload(context) {
        var filePattern = this.readConfig('filePattern');
        var distDir = this.readConfig('distDir');
        var distFiles = this.readConfig('distFiles');

        var host = this.readConfig('host');
        var port = this.readConfig('port');
        var user = this.readConfig('user');
        var pass = this.readConfig('pass');

        var filesToUpload = distFiles.filter(minimatch.filter(filePattern, {matchBase: true}));

        ftp = new ftp({distDir});
        ftp.connect({host, port, user, pass, debugMode: true}).then(()=> {
          console.log('connected :)');
          ftp.upload(filesToUpload);
        }).catch(this._errorMessage.bind(this));
      },
      _errorMessage(error) {
        this.log(error, {color: 'red'});
        return promise.reject(error);
      }
    });
    return new deployPlugin();
  }
};
