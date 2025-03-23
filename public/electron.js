import { app } from 'electron';
import { initializeAppLifecycle } from './main-process/app-lifecycle.js';
import { createMainWindow } from './main-process/window-manager.js';
import { registerIPCHandlers } from './main-process/ipc-handlers.js';

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