import React from 'react';
import './Humidity.css';

const HumidityDrop = ({ humidity, minHumidity, maxHumidity }) => {
  // Calculates the fill percentage based on min/max values
  const range = maxHumidity - minHumidity;
  const fillPercentage = range <= 0 ?
      0 : Math.min(100, Math.max(0, ((humidity - minHumidity) / range) * 100 ));

  // SVG dimensions
  const width = 100;
  const height = 150;

  return (
    <div className="humidity-drop-container">
      <h3>Humidity: {humidity.toFixed(1)}%</h3>
      <div className="humidity-drop-svg-container">
        <svg width={width} height={height} viewBox="0 0 100 150">
          {/* Container for clipping */}
          <defs>
            <clipPath id="drop-clip">
              <path
                d="M50,0 C50,0 0,60 0,100 C0,130 20,150 50,150 C80,150 100,130 100,100 C100,60 50,0 50,0 Z"
              />
            </clipPath>
          </defs>

          {/* Water drop (light gray) - background */}
          <path
            d="M50,0 C50,0 0,60 0,100 C0,130 20,150 50,150 C80,150 100,130 100,100 C100,60 50,0 50,0 Z"
            className="humidity-drop-background"
          />

          {/* Drop fill (light blue) */}
          <g clipPath="url(#drop-clip)">
            <rect
              x="0"
              y={height - (height * fillPercentage / 100)}
              width={width}
              height={height}
              className="humidity-drop-fill"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default HumidityDrop;
