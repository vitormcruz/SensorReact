import React from 'react';
import './Luminosity.css';

const Luminosity = ({ luminosity, maxLuminosity }) => {
  const opacity = luminosity/maxLuminosity;

  // SVG dimensions
  const width = 200;
  const height = 100;

  return (
    <div className="flashlight-container">
      <h3>Luminosity: {luminosity.toFixed(1)}</h3>
      <div className="flashlight-svg-container">
        <svg width={width} height={height} viewBox="0 0 200 100">
          {/* Flashlight body (black rectangle) */}
          <rect
            x="20"
            y="35"
            width="60"
            height="30"
            rx="2"
            className="flashlight-body"
          />

          {/* Flashlight head (cone pointing right) */}
          <polygon
            points="80,35 100,45 100,55 80,65"
            className="flashlight-head"
          />

          {/* Light beam (dark yellow circle with dynamic opacity) */}
          <circle
            cx="140"
            cy="50"
            r="35"
            className="flashlight-light-beam"
            style={{ opacity: opacity }}
          />
        </svg>
      </div>
    </div>
  );
};

export default Luminosity;