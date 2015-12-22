/* jshint node: true */
'use strict';
var basePlugin = require('ember-cli-deploy-plugin');
var minimatch = require('minimatch');
var ftp = require('./lib/ftp');

module.exports = {
  name: 'ember-cli-deploy-ftp',

  createDeployPlugin(options) {
    var deployPlugin = basePlugin.extend({
      name: options.name,

      defaultConfig: {
        filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,ttf,woff,woff2}',
        distFiles(context) {
          return context.distFiles || [];
        }
      },

      didBuild(context) {
      },
      upload(context) {
        var filePattern = this.readConfig('filePattern');
        var distDir = this.readConfig('distDir');
        var distFiles = this.readConfig('distFiles');

        var filesToUpload = distFiles.filter(minimatch.filter(filePattern, {matchBase: true}));
      },
      didDeploy(context) {
      }
    });

    return new deployPlugin();
  }
};
