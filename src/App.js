import React, { useState } from 'react';
import './App.css';

let initialized = false;

//This is teh recommended way of doing initialization in React, which I think is bad workaround, but it works.
function initializeApp(props){
    if(initialized) return;
    initialized = true;

    // Must not be inside any loops or conditions, otherwise the React hook will not work.
    setInterval(() => {
        props.setSensorData(generateSensorData());
        console.log(props.sensorData);
    }, 5000);
}

function generateSensorData() {
  return { accelaration: Math.random() * 10,
           humidity: Math.random() * 100,
           lightIntensity: Math.random() * 1000,
           position: {
            x: Math.random() * 100,
            y: Math.random() * 100,
            z: Math.random() * 100
          },
          pressure: Math.random() * 1000,
          temperature: Math.random() * 20
  };
}

function App() {
    const [sensorData, setSensorData] = useState(generateSensorData());

    initializeApp({sensorData, setSensorData});

    return (
      <div className="App">
          Acceleration: {sensorData.accelaration} <br/>
          Humidity: {sensorData.humidity} <br/>
          LightIntensity: {sensorData.lightIntensity} <br/>
          Position: X: {sensorData.position.x} - Y: {sensorData.position.y} - Z: {sensorData.position.z} <br/>
          Pressure: {sensorData.pressure} <br/>
          Temperature: {sensorData.temperature} <br/>
      </div>
    );
}

export default App;

