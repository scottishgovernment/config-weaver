'use strict';

/**
* Grunt task to save the effective config to disk.
*/
module.exports = function(grunt) {
    grunt.registerTask('save-effective-config', 'Saves the effective content to config.yaml',
        function() {
            var conf = require('../src/config').config();
            var fs = require('fs');
            var yaml = require('js-yaml').dump(conf);
            fs.writeFileSync('config.yaml', yaml);
            fs.writeFileSync('config.js', JSON.stringify(conf, null, '\t');
        }
    );

    grunt.registerTask('show-effective-config', 'Prints out the effective content',
        function() {
            var config = require('../src/config');
            var conf = config.config();
            console.log('Effective Properites:');
            config.showVars(conf, conf.application.name);
        }
    );
};