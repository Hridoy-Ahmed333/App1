import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getPreLoadPath } from "./pathResolver.js";
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
});
