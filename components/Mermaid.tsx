"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark", // We can make this dynamic if needed
      securityLevel: "loose",
    });

    const renderChart = async () => {
      if (containerRef.current) {
        try {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          containerRef.current.innerHTML = ""; // Clear previous content

          // Render the chart
          // mermaid.render returns an object with svg property in newer versions,
          // or modifies the container in older ones.
          // Let's use the standard render API.
          const { svg } = await mermaid.render(id, chart);
          containerRef.current.innerHTML = svg;
        } catch (error) {
          console.error("Mermaid render error:", error);
          if (containerRef.current) {
            containerRef.current.innerHTML = `<p class="text-red-500">Failed to render diagram</p>`;
          }
        }
      }
    };

    renderChart();
  }, [chart]);

  return (
    <div
      ref={containerRef}
      className="mermaid my-6 flex justify-center bg-transparent"
    />
  );
};

export default Mermaid;
