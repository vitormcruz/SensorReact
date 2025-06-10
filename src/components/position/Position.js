import React from 'react';
import './Position.css';

const Position = ({ positionX, positionY }) => {
  // SVG dimensions
  const width = 300;
  const height = 300;
  const centerX = width / 2;
  const centerY = height / 2;

  // Maximum coordinate values
  const maxCoord = 100;

  // Convert cartesian coordinates to SVG coordinates
  const toSvgCoords = (x, y) => {
    // In SVG, (0,0) is top-left corner, so we need to flip Y axis
    const svgX = centerX + (x / maxCoord) * (width * 0.4);
    const svgY = centerY - (y / maxCoord) * (height * 0.4);

    return { x: svgX, y: svgY };
  };

  // Calculate point position
  const pointPosition = toSvgCoords(positionX, positionY);

  // Generate grid lines
  const createGrid = () => {
    const lines = [];
    const gridSize = 10;

    for (let i = -gridSize; i <= gridSize; i++) {
      // Skip center lines (will be drawn as axes)
      if (i === 0) continue;

      const coord = (i / gridSize) * maxCoord;

      // Horizontal line
      const hStart = toSvgCoords(-maxCoord, coord);
      const hEnd = toSvgCoords(maxCoord, coord);

      // Vertical line
      const vStart = toSvgCoords(coord, -maxCoord);
      const vEnd = toSvgCoords(coord, maxCoord);

      lines.push(
        <line key={`h-${i}`} x1={hStart.x} y1={hStart.y} x2={hEnd.x} y2={hEnd.y} className="grid-line" />,
        <line key={`v-${i}`} x1={vStart.x} y1={vStart.y} x2={vEnd.x} y2={vEnd.y} className="grid-line" />
      );
    }
    return lines;
  };

  // Create axes
  const xStart = toSvgCoords(-maxCoord, 0);
  const xEnd = toSvgCoords(maxCoord, 0);
  const yStart = toSvgCoords(0, -maxCoord);
  const yEnd = toSvgCoords(0, maxCoord);

  return (
    <div className="cartesian-plane-container">
      <h3>Cartesian Plane</h3>
      <div className="cartesian-svg-container">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Grid lines */}
          {createGrid()}

          {/* X and Y axes */}
          <line
            x1={xStart.x}
            y1={xStart.y}
            x2={xEnd.x}
            y2={xEnd.y}
            className="axis x-axis"
          />
          <line
            x1={yStart.x}
            y1={yStart.y}
            x2={yEnd.x}
            y2={yEnd.y}
            className="axis y-axis"
          />

          {/* Axis labels */}
          <text x={xEnd.x - 15} y={xEnd.y + 20} className="axis-label">X</text>
          <text x={yEnd.x - 15} y={yEnd.y + 15} className="axis-label">Y</text>

          {/* Point marker */}
          <circle
            cx={pointPosition.x}
            cy={pointPosition.y}
            r={5}
            className="plot-point"
          />

          {/* Coordinates text display */}
          <text x={10} y={20} className="coordinates-text">
            X: {positionX.toFixed(1)}, Y: {positionY.toFixed(1)}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default Position;