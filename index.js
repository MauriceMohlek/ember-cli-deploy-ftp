/* jshint node: true */
'use strict';
let basePlugin = require('ember-cli-deploy-plugin');

module.exports = {
  name: 'ember-cli-deploy-ftp',

  createDeployPlugin(options) {
    let deployPlugin = basePlugin.extend({
      name: options.name,

      defaultConfig: {
        host: '127.0.0.1'
      },

      didBuild(context) {
      },
      upload(context) {
        this.log('Upload to FTP');
      },
      didDeploy(context) {
      }
    });

    return new deployPlugin();
  }
};
