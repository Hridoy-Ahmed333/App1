import { app, BrowserWindow, ipcMain, Tray } from "electron";
import path from "path";
import { isDev, validateEventFrame } from "./util.js";
import { getAssetsPath, getPreLoadPath, getUIpath } from "./pathResolver.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreLoadPath(),
    },
    frame: false,
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5125");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
  pollResources(mainWindow);
  ipcMain.handle("getStaticData", (event) => {
    validateEventFrame(event.senderFrame);
    return getStaticData();
  });

  ipcMain.handle("isMaximized", (event) => {
    return mainWindow.isMaximized();
  });

  ipcMain.on("sendFrameAction", (event, payload) => {
    switch (payload) {
      case "CLOSE":
        mainWindow.close();
        break;
      case "MAXIMIZE":
        mainWindow.maximize();
        break;
      case "MINIMIZE":
        mainWindow.minimize();
        break;
      case "RESTORE":
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        }
        break;
      case "CPU":
        mainWindow.webContents.send("changeView", "CPU");
        break;
      case "RAM":
        mainWindow.webContents.send("changeView", "RAM");
        break;
      case "STORAGE":
        mainWindow.webContents.send("changeView", "Storage");
        break;
      case "DEVTOOLS":
        mainWindow.webContents.openDevTools();
        break;
      case "CLOSE_APP":
        app.quit();
        break;
    }
  });

  createTray(mainWindow);
  handleCloseEvent(mainWindow);
  createMenu(mainWindow);
});

function handleCloseEvent(mainWindow) {
  let willClose = false;

  mainWindow.on("close", (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });
  app.on("before-quit", () => {
    willClose = true;
  });
  mainWindow.on("show", () => {
    willClose = false;
  });
}
