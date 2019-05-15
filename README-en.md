## [中文文档](README.md)
Reactor + electron + ant scaffolding project.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/fddi/electron-react-quick-start
# Go into the repository
cd electron-react-quick-start
# vs tool
npm  --vs2015  install --global windows-build-tools
# set version
npm config set msvs_version 2015 --global
# Install dependencies
npm install
# Run the app
npm start
# Packing (example is based on win32 system, please modify the configuration according to the operating system)
npm run build & npm run pack & npm run dist
```

## Features
### electron + react examples
![tab-img](https://fddi.github.io/electron-react-quick-start/img-example1.png)
## Resources for Learning Electron and React

- [electronjs.org/docs](https://electronjs.org/docs) - Electron is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. 
- [reactjs.org/docs](https://reactjs.org/docs/getting-started.html) - React is a JavaScript library for building user interfaces. 
- [ant.design/docs](https://ant.design/docs) - An enterprise-class UI design language and React-based implementation.
- [node-ffi-napi](https://github.com/node-ffi-napi/node-ffi-napi) - A foreign function interface (FFI) for Node.js, N-API style.
## License
[MIT License](LICENSE.md)