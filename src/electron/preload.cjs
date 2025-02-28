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
    // Keep old name
    const listener = (event, data) => callback(data);
    electron.ipcRenderer.on("statistics", listener);

    return () => {
      electron.ipcRenderer.off("statistics", listener);
    };
  },
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
});
