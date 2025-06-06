import React from 'react';
import './Accelerometer.css';

const Accelerometer = ({ acceleration, minAccel, maxAccel }) => {
  // Calculate the fill percentage based on min/max values
  const range = maxAccel - minAccel;
  const fillPercentage = range <= 0 ?
      0 : Math.min(100, Math.max(0, ((acceleration - minAccel) / range) * 100 ));

  // SVG dimensions
  const width = 300;
  const height = 30;
  const fillWidth = (fillPercentage / 100) * width;

  return (
    <div className="accelerometer-container">
      <svg width={width} height={height}>
        {/* Background bar (gray) */}
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          className="accelerometer-background"
          rx="4"
          ry="4"
        />

        {/* Fill bar (green) */}
        <rect
          x="0"
          y="0"
          width={fillWidth}
          height={height}
          className="accelerometer-fill"
          rx="4"
          ry="4"
        />
      </svg>
    </div>
  );
};

export default Accelerometer;
