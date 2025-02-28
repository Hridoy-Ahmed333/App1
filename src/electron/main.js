import { app, BrowserWindow, ipcMain, Tray } from "electron";
import path from "path";
import { isDev, validateEventFrame } from "./util.js";
import { getAssetsPath, getPreLoadPath, getUIpath } from "./pathResolver.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { createTray } from "./tray.js";
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreLoadPath(),
    },
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

  createTray(mainWindow);
  handleCloseEvent(mainWindow);
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
