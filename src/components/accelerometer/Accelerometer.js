import React from 'react';
import './Accelerometer.css';

const Accelerometer = ({ acceleration, maxAccel }) => {
  // Calculate the fill percentage based on min/max values
  const fillPercentage = maxAccel <= 0 ?
      0 : Math.min(100, Math.max(0, (acceleration / maxAccel) * 100 ));

  // SVG dimensions
  const width = 300;
  const height = 30;
  const fillWidth = (fillPercentage / 100) * width;

  return (
    <div className="accelerometer-container">
      <h3>Acceleration: {acceleration.toFixed(1)} k/h</h3>
      <div className="accelerometer-svg-container">
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
    </div>
  );
};

export default Accelerometer;
