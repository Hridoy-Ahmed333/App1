import { app, Menu, Tray } from "electron";
import path from "path";
import { getAssetsPath } from "./pathResolver.js";

export function createTray(mainWindow) {
  const tray = new Tray(
    path.join(
      getAssetsPath(),
      process.platform === "darwin" ? "tray2.png" : "tray1.png"
    )
  );
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show",
        click: () => {
          mainWindow.show();
          if (app.dock) {
            app.dock.show();
          }
        },
      },
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ])
  );
}
