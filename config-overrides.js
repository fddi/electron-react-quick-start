const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const themes = require('./theme');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: themes
  })
);