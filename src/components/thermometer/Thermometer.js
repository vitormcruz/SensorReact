import React from 'react';
import './Thermometer.css';

function Thermometer({ temperature, maxTemp = 50 }) {
    const percentage = Math.min(Math.max(temperature / maxTemp, 0), 1) * 100;

    return (
        <div className="thermometer-container">
            <h3>Temperature: {temperature.toFixed(1)}°C</h3>
            <div className="thermometer-svg-container">
                <svg width="50" height="200" viewBox="0 0 50 200">
                    {/* Thermometer outline */}
                    <rect x="20" y="10" width="10" height="150" rx="5" ry="5" className="thermometer-outline" />

                    {/* Thermometer bulb */}
                    <circle cx="25" cy="160" r="15" className="thermometer-bulb" />

                    {/* Mercury in the bulb */}
                    <circle cx="25" cy="160" r="13" className="thermometer-mercury" />

                    {/* Mercury in the tube */}
                    <rect
                        x="22"
                        y={10 + (150 - 150 * percentage / 100)}
                        width="6"
                        height={150 * percentage / 100}
                        className="thermometer-mercury"
                    />

                    {/* Temperature markings (optional) */}
                    {[0, 25, 50, 75, 100].map((mark, i) => (
                        <React.Fragment key={i}>
                            <line
                                x1="30"
                                y1={10 + (150 * (100 - mark) / 100)}
                                x2="35"
                                y2={10 + (150 * (100 - mark) / 100)}
                                className="thermometer-marking"
                            />
                            <text
                                x="38"
                                y={10 + (150 * (100 - mark) / 100) + 4}
                                className="thermometer-text"
                            >
                                {(maxTemp * mark / 100).toFixed(0)}°
                            </text>
                        </React.Fragment>
                    ))}
                </svg>
            </div>
        </div>
    );
}

export default Thermometer;
