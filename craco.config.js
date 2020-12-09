const CracoLessPlugin = require('craco-less');
const themes = require('./theme');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: themes,
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};