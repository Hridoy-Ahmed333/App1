import { useMemo } from "react";
import BaseChart from "./BaseChart";

function Chart({ cpu, maxDataPoints }) {
  const prpData = useMemo(() => {
    const points = cpu.map((point) => ({ value: point * 100 }));
    return [
      ...points,
      ...Array.from({ length: maxDataPoints - points.length }),
    ];
  }, [cpu, maxDataPoints]);
  return <BaseChart stat={prpData} />;
}

export default Chart;
