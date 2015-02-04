'use strict';

module.exports = {
    build: ['build']
};


module.exports = {
    options: {
        files: ['package.json', 'src/config/dev.json', 'src/config/prod.json', 'src/config/test.json', 'src/config/config.json'],
        updateConfigs: [],
        commit: false,
        createTag: false,
        push: false
    }
}