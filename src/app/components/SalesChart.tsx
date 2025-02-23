/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";
import React from "react";
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface SalesChartProps {
    plotData: any[];
    plotLayout: any;
}

export const SalesChart: React.FC<SalesChartProps> = ({ plotData, plotLayout }) => (
    <Plot
        data={plotData}
        layout={plotLayout}
        config={{ responsive: true }}
        style={{ width: "100%", height: "500px" }}
    />
);
