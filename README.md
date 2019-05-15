## [English](README-en.md)
react + electron + ant 的脚手架项目。

项目基于[Create React App](https://github.com/facebookincubator/create-react-app).

## 快速开始

需要安装 [Git](https://git-scm.com) 和 [Node.js](https://nodejs.org/en/download/) (默认安装[npm]http://npmjs.com)。
windows下编译调用外部函数，需要安装.netframwork4.5+。

打开命令窗口:
```bash
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/ --global
# 克隆项目到本地
git clone https://github.com/fddi/electron-react-quick-start
# 转到项目目录
cd electron-react-quick-start
# 额外需要安装和设置的工具
npm  --vs2015  install --global windows-build-tools
# 设置vs 版本
npm config set msvs_version 2015 --global
# 安装
npm install
# 运行
npm run start
# 打包(示例基于win32系统，请根据操作系统修改配置)
npm run build & npm run pack & npm run dist
```
## 特点
### electron + react 示例
![tab-img](https://fddi.github.io/electron-react-quick-start/img-example1.png)

## 使用到的资源

- [electronjs.org/docs](https://electronjs.org/docs) - Electron是由GitHub开发的一个开源库，用于构建具有HTML，CSS和JavaScript的跨平台桌面应用程序。
- [reactjs.org/docs](https://reactjs.org/docs/getting-started.html) - React是一个用于构建用户界面的JavaScript库。
- [ant.design/docs](https://ant.design/docs) - 一套企业级的 UI 设计语言和 React 实现。
- [node-ffi-napi](https://github.com/node-ffi-napi/node-ffi-napi) - Node.js的外部函数接口（FFI），N-API样式。
## 许可证
[MIT License](LICENSE.md)