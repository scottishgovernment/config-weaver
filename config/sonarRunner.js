var createOptions = function(mode) {
    return {
        debug: true,
        separator: '\n',
        sonar: {
            analysis: {
                mode: mode
            },
            issuesReport: {
                html: true
            },
            host: {
                url: 'http://sonar.digital.gov.uk'
            },
            jdbc: {
                url: 'jdbc:mysql://sonar.digital.gov.uk/sonar?useUnicode=true&amp;characterEncoding=utf8&amp;rewriteBatchedStatements=true',
                username: 'sonar',
                password: 'sonar'
            },
            projectKey: "<%= pkg.name %>:<%= pkg.version %>",
            projectName: "<%= pkg.name %>",
            projectVersion: "<%= pkg.version %>",
            projectDescription: "<%= pkg.description %>",
            sources: ['tasks/', 'src/'].join(','),
            language: 'js',
            sourceEncoding: 'UTF-8',
            dynamicAnalysis: 'reuseReports',

            javascript: {
                lcov: {
                    reportPath: 'test/coverage/reports/lcov.info'
                }
            }
        }
    };
};

module.exports = {
    analysis: {
        options: createOptions('analysis')
    },
    preview: {
        options: createOptions('preview')
    }
};
