import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import BaseChart from "./Components/BaseChart";
import { useStatistics } from "./CustomHooks/useStatistics";
import Chart from "./Components/Chart";

function App() {
  const [count, setCount] = useState(0);
  const statistics = useStatistics(20);
  const cpuUsage = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  );
  // useEffect(() => {
  //   const unsub = window.electron.suscribeStatistics((data) =>
  //     console.log(data)
  //   );
  //   return unsub;
  // }, []);

  return (
    <>
      <div style={{ height: 120 }}>
        {/* <BaseChart
          stat={[{ value: 25 }, { value: 30 }, { value: 100 }]}
        ></BaseChart> */}
        <Chart cpu={cpuUsage} maxDataPoints={20} />
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
    </>
  );
}

export default App;
