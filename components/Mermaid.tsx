"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");

  useEffect(() => {
    // Initialize mermaid with high contrast settings
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "loose",
      fontFamily: "var(--font-sans)",
      themeVariables: {
        primaryColor: "#0f766e", // teal-700
        primaryTextColor: "#f8fafc", // slate-50
        primaryBorderColor: "#5eead4", // teal-300
        lineColor: "#94a3b8", // slate-400
        secondaryColor: "#1e293b", // slate-900
        tertiaryColor: "#334155", // slate-700
        mainBkg: "#1e293b", // slate-900
        nodeBorder: "#5eead4", // teal-300
        clusterBkg: "rgba(30, 41, 59, 0.5)", // slate-900 with opacity
        clusterBorder: "#475569", // slate-600
        titleColor: "#f1f5f9", // slate-100
        edgeLabelBackground: "#0f172a", // slate-950
      },
      flowchart: {
        curve: "basis",
        padding: 20,
      },
    });

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvgContent(svg);
      } catch (error) {
        console.error("Mermaid render error:", error);
        setSvgContent(`<p class="text-red-500">Failed to render diagram</p>`);
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div className="my-8 w-full overflow-x-auto rounded-lg bg-slate-950 p-6 border border-slate-800 shadow-xl">
      <div
        ref={containerRef}
        className="mermaid flex justify-center min-w-[600px]"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};

export default Mermaid;
