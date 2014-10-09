'use strict';

var fs = require('fs');

/**
 * Created this task to display sonar violations to developers
 * Currently there is no build breaker on preview mode
 * we can easily add a build breaker using this task
 */
module.exports = function(grunt) {
    grunt.registerTask('inspect', 'generate content in the resources dir',
        function() {
            var reports;

            try {
                reports = JSON.parse(fs.readFileSync('.sonar/sonar-report.json'));
            } catch (Error) {
                console.log("Sonar reports not found ignoring inspection");
                reports = {
                    issues: []
                };
            };

            if (reports.issues.length > 0) {
                // quality gate check -> i.e We can throw an error to break build
                console.log('\nSONAR VIOLATIONS: ');
                reports.issues.forEach(function(issue) {
                    console.log(issue.severity['magenta'], ' ', issue.message['yellow']);
                    console.log(issue.component, ':', ' line:' ['cyan'].bold, issue.line);
                });
            } else {
                console.log('\nNo Sonar violations found');
            }
        }
    );
    return {
        setFs: function(fileUtil) {
            fs = fileUtil;
        }
    };
};
