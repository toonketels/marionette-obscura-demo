'use strict';

module.exports = {
    dev: {
        options: {
            port: 8080,
            base: 'src',
            livereload: true
        }
    },
    build: {
        options: {
            port: 8081,
            base: 'build',
            keepalive: true
        }
    }
};