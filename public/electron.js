const { app } = require('electron');
const { initializeAppLifecycle } = require('./main-process/app-lifecycle');
const { createMainWindow } = require('./main-process/window-manager');
const { registerIPCHandlers } = require('./main-process/ipc-handlers');

// 应用生命周期管理
initializeAppLifecycle(app);

// 应用就绪后创建主窗口
app.whenReady().then(() => {
  const mainWindow = createMainWindow();
  registerIPCHandlers(mainWindow); // 注册 IPC 处理器
});

// 其他全局事件（如所有窗口关闭）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});