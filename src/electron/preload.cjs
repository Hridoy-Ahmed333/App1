const { contextBridge } = require("electron");
const electron = require("electron");

// contextBridge.exposeInMainWorld("electron", {
//   suscribeStatistics: (callback) => {
//     electron.ipcRenderer.on("statistics", (event, data) => {
//       callback(data);
//     });
//   },
//   getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
// });

contextBridge.exposeInMainWorld("electron", {
  suscribeStatistics: (callback) => {
    const listener = (event, data) => callback(data);
    electron.ipcRenderer.on("statistics", listener);

    return () => {
      electron.ipcRenderer.off("statistics", listener);
    };
  },
  subscribeChangeView: (callback) => {
    const listener = (event, data) => callback(data);
    electron.ipcRenderer.on("changeView", listener);

    return () => {
      electron.ipcRenderer.off("changeView", listener);
    };
  },
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
  sendFrameAction: (payload) => {
    electron.ipcRenderer.send("sendFrameAction", payload);
  },
  isMaximized: () => electron.ipcRenderer.invoke("isMaximized"),
});
