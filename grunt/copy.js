'use strict';

var _ = require('lodash');

module.exports = function(grunt) {
    return {
        build: {
            files: [
                {expand: true, cwd: 'src/', src: ['index.html', 'images/**'], dest: 'build/'}
            ]
        },
        cssAsScss: {
            files: [
                {
                    expand: true,
                    cwd: 'src/vendor/bootstrap/dist/css/',
                    src: ['bootstrap-theme.css', 'bootstrap.css'],
                    dest: 'src/scss/vendor',
                    ext: ".scss"
                }
            ]
        }
    };
};