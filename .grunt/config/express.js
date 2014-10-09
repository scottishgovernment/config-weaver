module.exports = {

    express: {
        options: {
            server: './src/server.js',
            port: '<%= environment.expressPort %>',
            serverreload: true
        }
    },

};
