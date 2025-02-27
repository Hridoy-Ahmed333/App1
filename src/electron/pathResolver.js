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
