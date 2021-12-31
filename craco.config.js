const CracoLessPlugin = require('craco-less');

module.exports = {
    babel: {
        plugins: [
            [
                "prismjs",
                {
                    "languages": [
                        "javascript",
                        "css",
                        "html",
                        "json"
                    ],
                    "plugins": [
                        "line-numbers",
                        "show-language"
                    ],
                    "theme": "okaidia",
                    "css": true
                }
            ]
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};