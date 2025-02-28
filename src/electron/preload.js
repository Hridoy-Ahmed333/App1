const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  suscribeStatistics: (callback) => callback({}),
  getStaticData: () => console.log("Statistics"),
});
