const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const themes = require('./theme');
module.exports = function override(config, env) {
  config = injectBabelPlugin(['import',
    { libraryName: 'antd', libraryDirectory: 'es', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: themes,
    javascriptEnabled: true
  })(config, env);
  return config;
};