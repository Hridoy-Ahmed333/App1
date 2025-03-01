import { app, Menu } from "electron";
import { isDev } from "./util.js";

export function createMenu(mainWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: "App",
        type: "submenu",
        submenu: [
          {
            label: "Quit",
            click: app.quit,
          },
          {
            label: "Dev Tools",
            click: () => mainWindow.webContents.openDevTools(),
            visible: isDev(),
          },
        ],
      },
      {
        label: "View",
        type: "submenu",
        submenu: [
          {
            label: "CPU",
            click: () => {
              if (
                mainWindow.webContents &&
                typeof mainWindow.webContents.send === "function"
              ) {
                mainWindow.webContents.send("changeView", "CPU");
              }
            },
          },
          {
            label: "RAM",
            click: () => {
              if (
                mainWindow.webContents &&
                typeof mainWindow.webContents.send === "function"
              ) {
                mainWindow.webContents.send("changeView", "RAM");
              }
            },
          },
          {
            label: "Storage",
            click: () => {
              if (
                mainWindow.webContents &&
                typeof mainWindow.webContents.send === "function"
              ) {
                mainWindow.webContents.send("changeView", "Storage");
              }
            },
          },
        ],
      },
    ])
  );
}
