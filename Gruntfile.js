'use strict';

module.exports = function(grunt) {

    // Node path
    var path = require('path');

    // Load our custom tasks
    grunt.loadTasks('tasks');

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Load config
    var gruntConfig = grunt.file.readYAML('_config.yaml');

    require('load-grunt-config')(grunt, {
        init: true,
        // Make data object available in tasks
        data: {
            pkg: grunt.file.readJSON('package.json')
        },
        // Load grunt tasks and aliases
        configPath: path.join(process.cwd(), gruntConfig.grunt + '/config'),
        overridePath: path.join(process.cwd(), gruntConfig.grunt),

        // Allow for just in time loading
        jitGrunt: {
            // Static routes
            instrument: 'grunt-istanbul',
            jasmine_node: 'jasmine-node'
        }
    });
};
