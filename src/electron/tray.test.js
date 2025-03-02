import { expect, Mock, test, vi } from "vitest";
import { createTray } from "./tray.js";
import { app, BrowserWindow, Menu } from "electron";

vi.mock("electron", () => {
  return {
    Tray: vi.fn().mockReturnValue({
      setContextMenu: vi.fn(),
    }),
    app: {
      getAppPath: vi.fn().mockReturnValue("/"),
      dock: {
        show: vi.fn(),
      },
      quit: vi.fn(),
    },
    Menu: {
      buildFromTemplate: vi.fn(),
    },
  };
});

const mainWindow = {
  show: vi.fn(),
};

test("", () => {
  const mainWindow = {
    show: vi.fn(),
  };

  createTray(mainWindow);

  const calls = vi.mocked(Menu.buildFromTemplate).mock.calls;
  const args = calls[0]; // Extract the first call's arguments
  const template = args[0]; // Menu template

  expect(template).toHaveLength(2);

  expect(template[0].label).toEqual("Show");
  template[0]?.click?.(null, null, null);
  expect(mainWindow.show).toHaveBeenCalled();
  expect(app.dock.show).toHaveBeenCalled();

  template[1]?.click?.(null, null, null);
  expect(app.quit).toHaveBeenCalled();
});
