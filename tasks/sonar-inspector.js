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
                    switch (issue.severity) {
                        case 'MAJOR':
                            console.log(issue.severity['red'].bold, ' ', issue.message['white'].bold);
                            console.log(issue.component['red'], ' line:' ['cyan'], issue.line);
                            break;
                        case 'MINOR':
                            console.log(issue.severity['yellow'].bold, ' ', issue.message['white'].bold);
                            console.log(issue.component['yellow'], ' line:' ['cyan'], issue.line);
                            break;
                        default:
                            console.log(issue.severity['white'], ' ', issue.message['white']);
                            console.log(issue.component['grey'], ' line:' ['cyan'], issue.line);
                            break;
                    }
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
