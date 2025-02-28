import path from "path";
import { app } from "electron";
import { isDev } from "./util.js";

export function getPreLoadPath() {
  return path.join(
    app.getAppPath(),
    // isDev() ? "src/electron" : "dist-react",
    // "preload.cjs"
    "src/electron/preload.cjs"
  );
}

export function getUIpath() {
  return path.join(app.getAppPath(), "/dist-react/index.html");
}

export function getAssetsPath() {
  return path.join(app.getAppPath(), "src/ui/assets");
}
