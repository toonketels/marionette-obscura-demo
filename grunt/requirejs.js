'use strict';

// https://github.com/jrburke/r.js/blob/master/build/example.build.js
// https://github.com/mishoo/UglifyJS2
module.exports = {
    build: {
        options : {
            baseUrl: 'src/js',
            mainConfigFile: 'src/js/main.js',
            name: 'main',
            out: 'build/js/build.js',
            almond: true,
            replaceRequireScript: [{
                files: ['build/index.html'],
                module: 'main',
                modulePath: 'js/build'
            }],
            optimize: 'uglify2',
            preserveLicenseComments: false,
            useStrict: true,
            generateSourceMaps: true,
            uglify2: {
                output: {
                    beautify: false
                },
                compress: {
                    sequences: false,
                    global_defs: {
                        DEBUG: false
                    }
                },
                warnings: true,
                mangle: true
            },
        }
    }
};