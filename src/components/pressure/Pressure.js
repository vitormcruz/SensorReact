import React from 'react';
import './Pressure.css';

const Pressure = ({ pressure, minPressure, maxPressure }) => {
  // Calculate rotation angle of the pointer (from -140 to 140 degrees)
  const percentage = (pressure - minPressure) / (maxPressure - minPressure);
  const angle = -140 + (percentage * 280);

  // SVG dimensions
  const width = 200;
  const height = 150;
  const centerX = width / 2;
  const centerY = height - 20;
  const radius = 80;

  // Create tick marks for the gauge
  const createTicks = () => {
    const ticks = [];
    const numTicks = 10;

    for (let i = 0; i <= numTicks; i++) {
      const tickAngle = -140 + (i * 28); // 280 degrees / 10 ticks = 28 degrees per tick
      const tickRadian = (tickAngle * Math.PI) / 180;

      const outerX = centerX + (radius * Math.cos(tickRadian));
      const outerY = centerY + (radius * Math.sin(tickRadian));
      const innerX = centerX + ((radius - 10) * Math.cos(tickRadian));
      const innerY = centerY + ((radius - 10) * Math.sin(tickRadian));

      // Add tick line
      ticks.push(
        <line
          key={`tick-${i}`}
          x1={innerX}
          y1={innerY}
          x2={outerX}
          y2={outerY}
          className="gauge-tick"
        />
      );

      // Add tick label
      const labelValue = Math.round(minPressure + (i * (maxPressure - minPressure) / numTicks));
      const labelX = centerX + ((radius - 20) * Math.cos(tickRadian));
      const labelY = centerY + ((radius - 20) * Math.sin(tickRadian));

      ticks.push(
        <text
          key={`label-${i}`}
          x={labelX}
          y={labelY + 3}
          className="gauge-tick-label"
        >
          {labelValue}
        </text>
      );
    }

    return ticks;
  };

  return (
    <div className="pressure-container">
      <h3>Pressure: {pressure.toFixed(1)} hPa</h3>
      <div className="pressure-svg-container">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Gauge background */}
          <path
            d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY}`}
            className="gauge-face"
          />

          {/* Tick marks and labels */}
          {createTicks()}

          {/* Gauge value text */}
          <text
            x={centerX}
            y={centerY - 20}
            className="gauge-value-text"
          >
            Pressure (hPa)
          </text>

          {/* Pointer */}
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX}
            y2={centerY - radius + 10}
            className="gauge-pointer"
            style={{ transform: `rotate(${angle}deg)` }}
          />

          {/* Center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={5}
            className="gauge-center"
          />
        </svg>
      </div>
    </div>
  );
};

export default Pressure;