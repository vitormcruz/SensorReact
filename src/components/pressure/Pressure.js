import React from 'react';
import './Pressure.css';

const Pressure = ({ pressure, minPressure, maxPressure }) => {
    const percentage = (pressure - minPressure) / (maxPressure - minPressure);
    const angle = 180 + (percentage * 360);

    // SVG dimensions and positioning
    const width = 200;
    const height = 200;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 80;

    // Create tick marks for the gauge
    const createTicks = () => {
        const ticks = [];
        const numTicks = 10;

        for (let i = 0; i < numTicks; i++) {
            // Calculate angle for each tick (starting from top, going clockwise)
            const tickAngle = 90 + (i * 360 / numTicks);
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
            <h3>Pressure</h3>
            <div className="pressure-svg-container">
                <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                    {/* Gauge outer circle */}
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r={radius}
                        className="gauge-face"
                    />

                    {/* Tick marks and labels */}
                    {createTicks()}

                    {/* Current value display */}
                    <text
                        x={centerX}
                        y={centerY + 30}
                        className="gauge-value-text"
                        style={{ fontSize: '12px', fontWeight: 'bold' }}
                    >
                        {pressure.toFixed(1)} psi
                    </text>

                    {/* Label text */}
                    <text
                        x={centerX}
                        y={centerY - 20}
                        className="gauge-value-text"
                    >
                        Pressure (psi)
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