import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import BaseChart from "./Components/BaseChart";
import { useStatistics } from "./CustomHooks/useStatistics";
import Chart from "./Components/Chart";

function App() {
  const [count, setCount] = useState(0);
  const [activeView, setActiveView] = useState("CPU");
  const statistics = useStatistics(20);
  const cpuUsage = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  );
  const ramUsage = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );
  const storageUsage = useMemo(
    () => statistics.map((stat) => stat.storageUsage),
    [statistics]
  );
  const activeUsage = useMemo(() => {
    switch (activeView) {
      case "CPU":
        return cpuUsage;
      case "RAM":
        return ramUsage;
      case "Storage":
        return storageUsage;
      default:
        return cpuUsage;
    }
  }, [activeView, cpuUsage, ramUsage, storageUsage]);
  // useEffect(() => {
  //   const unsub = window.electron.suscribeStatistics((data) =>
  //     console.log(data)
  //   );
  //   return unsub;
  // }, []);

  useEffect(() => {
    window.electron.subscribeChangeView((view) => setActiveView(view));
  }, []);

  return (
    <div className="App">
      <header>
        <button
          id="close"
          onClick={() => window.electron.sendFrameAction("CLOSE")}
        />
        <button
          id="minimize"
          onClick={() => window.electron.sendFrameAction("MINIMIZE")}
        />
        {/* <button
          id="maximize"
          onClick={() => window.electron.sendFrameAction("MAXIMIZE")}
        /> */}
        <button
          id="maximize"
          onClick={async () => {
            const isMax = await window.electron.isMaximized();
            window.electron.sendFrameAction(isMax ? "RESTORE" : "MAXIMIZE");
          }}
        ></button>
      </header>
      <div className="navMenu">
        <button>File</button>
        <button>View</button>
        <button onClick={() => window.electron.sendFrameAction("CPU")}>
          CPU
        </button>
        <button onClick={() => window.electron.sendFrameAction("RAM")}>
          RAM
        </button>
        <button onClick={() => window.electron.sendFrameAction("STORAGE")}>
          Storage
        </button>
        <button onClick={() => window.electron.sendFrameAction("DEVTOOLS")}>
          Dev tools
        </button>
        <button onClick={() => window.electron.sendFrameAction("CLOSE_APP")}>
          Close The Application
        </button>
      </div>
      <div style={{ height: 120 }}>
        {/* <BaseChart
          stat={[{ value: 25 }, { value: 30 }, { value: 100 }]}
        ></BaseChart> */}
        <Chart cpu={activeUsage} maxDataPoints={20} />
      </div>
      <div>
        <h1>Desktop App</h1>
      </div>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
