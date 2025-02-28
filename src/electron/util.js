import { pathToFileURL } from "url";
import { getUIpath } from "./pathResolver.js";
export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function validateEventFrame(frame) {
  if (isDev() && new URL(frame.url).host === "localhost:5125") {
    console.log(getUIpath());
    return;
  }
  // if (frame.url !== pathToFileURL(getUIpath()).toString()) {
  //   console.log("I have an error");
  //   throw new Error("Malicious Event");
  // }
}
