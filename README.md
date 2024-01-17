electron + react 的脚手架项目。

## 项目特点
- 提供Electron + React 桌面程序创建，测试，打包的示例。
- 提供Electron环境下调用DLL的示例。
- 提供Nodejs最新版本环境下的示例。
- 示例界面使用ant-design

## 快速开始
### 1. 安装工具

需要安装 [Git](https://git-scm.com) 和 [Node.js](https://nodejs.org/en/download/)。

安装Python 3.x版本，请使用[最新稳定版本](https://www.python.org/downloads)。

安装[visual studio build tool](https://visualstudio.microsoft.com/zh-hans/thank-you-downloading-visual-studio/?sku=BuildTools)或 [visual studio Community](https://visualstudio.microsoft.com/zh-hans/thank-you-downloading-visual-studio/?sku=Community&rel=17)，安装时选择c++桌面开发项。本示例使用VS Community 2022。
>nodejs原生编译工具node-gyp 8.4.x以上版本才支持vs 2022，请确保npm环境下的node-gyp为最新版本。

```bash
node -v
v18.16.0
npm -v
v9.5.1
npx node-gyp -v
v9.3.1
```

### 2. 设置npm镜像:
```bash
# 设置npm镜像
npm config set registry https://registry.npmmirror.com/
# 设置环境变量 ELECTRON_MIRROR=https://registry.npmmirror.com/
```
### 3. 运行项目
> 需要管理员权限，可能需要关闭360等杀毒软件。
```bash
# 克隆项目到本地
git clone https://github.com/fddi/electron-react-quick-start
# 转到项目目录
cd electron-react-quick-start
# 设置vs 版本 
npm config set msvs_version 2022
# 安装
npm install
# 运行
npm run start
```
- 运行界面

<img src="https://gitee.com/fddi/electron-react-quick-start/raw/master/docs/img-example1.png" width="60%">

- 调用DLL文件示例

<img src="https://gitee.com/fddi/electron-react-quick-start/raw/master/docs/img-example2.png" width="60%">

### 4. 打包
```bash
# 打包(win64位)
npm run build  & npm run make
```

本项目使用electron-forge工具打包，打包配置请修改forge.config.js文件。
[查看packagerConfig配置API](https://electron.github.io/packager/main/interfaces/Options.html)
## 问题汇总

### 1. 无法找到VS工具
> gyp ERR! stack Error: Could not find any Visual Studio installation to use

情况一：VS2022 需要node-gyp8.4.0以上版本才能支持,由于npm自带版本过低导致 需要升级nodejs,或升级npm：
```bash
设置vs 版本 
npm config set msvs_version 2022
npm -g install npm
# 安装最新npm后，查看版本
npm -v
8.5.0
npm install -g node-gyp
npx node-gyp -v
v8.4.1
```
情况二：删除淘宝镜像地址配置
```bash
npm config list
npm config delete electron_mirror
```
情况三：使用PowerShell
### 2. electron无法安装
> Electron failed to install correctly, please delete node_modules/electron and try installing again

node_modules/electron文件夹没有dist文件夹。[淘宝镜像](https://registry.npmmirror.com/binary.html?path=electron/)下载对应包，解压至node_modules/electron/dist内。node_modules/electron新建path.txt,输入以下内容保存
```
electron.exe
```

### 3. 打包网络超时
> 下载nsis-3.0.4.2.7z超时

网络原因，[淘宝镜像](https://registry.npmmirror.com/binary.html?path=electron-builder-binaries/)下载对应包，解压至C:\Users\\{User}\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4.2。

> 下载winCodeSign超时

网络原因，[淘宝镜像](https://registry.npmmirror.com/binary.html?path=electron-builder-binaries/)下载对应winCodeSign包，解压至C:\Users\\{User}\AppData\Local\electron-builder\Cache\winCodeSign\winCodeSign-2.6.0。

## 使用到的资源

- [electronjs](https://www.electronjs.org/docs) - Electron是由GitHub开发的一个开源库，用于构建具有HTML，CSS和JavaScript的跨平台桌面应用程序。
- [reactjs](https://react.dev/) - React是一个用于构建用户界面的JavaScript库。
- [ant.design](https://ant-design.gitee.io/index-cn) - 一套企业级的 UI 设计语言和 React 实现。
- [Koffi](https://koffi.dev/) - 是一个快速且易于使用的 Node.js C FFI 模块。

## 许可证
[MIT License](LICENSE.md)