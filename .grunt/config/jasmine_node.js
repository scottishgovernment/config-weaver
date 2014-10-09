module.exports = {
    options: {
        forceExit: true,
        match: '.',
        matchall: true,
        extensions: 'js',
        specNameMatcher: 'spec',
        jUnit: {
            report: false,
            savePath: "./reports/",
            useDotNotation: true,
            consolidate: true
        }
    },
    all: ['test/'],
}
