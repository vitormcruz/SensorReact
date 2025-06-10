import React, { useState } from 'react';
import './App.css';
import Accelerometer from "./components/accelerometer/Accelerometer";
import Thermometer from "./components/thermometer/Thermometer";
import HumidityDrop from "./components/humidity/Humidity";
import Luminosity from "./components/luminosity/Luminosity";
import Pressure from "./components/pressure/Pressure";
import Position from "./components/position/Position";

let initialized = false;

//This is teh recommended way of doing initialization in React, which I think is bad workaround, but it works.
function initializeApp(props){
    if(initialized) return;
    initialized = true;

    // Must not be inside any loops or conditions, otherwise the React hook will not work.
    setInterval(() => {
        props.setSensorData(generateSensorData());
    }, 2000);
}

function generateSensorData() {
  return { accelaration: Math.random() * 10,
           humidity: Math.random() * 100,
           lightIntensity: Math.random() * 1000,
           position: {
            x: Math.random() * 100 * Math.sign(Math.random() - 0.5),
            y: Math.random() * 100 * Math.sign(Math.random() - 0.5),
          },
          pressure: Math.random() * 4000,
          temperature: Math.random() * 50
  };
}

function App() {
    Math.sign(Math.random() - 0.5)
    const [sensorData, setSensorData] = useState(generateSensorData());

    initializeApp({sensorData, setSensorData});

    return (
      <div className="App">
          <Accelerometer acceleration={sensorData.accelaration} maxAccel={10} />
          <HumidityDrop humidity={sensorData.humidity} maxHumidity={100} />
          <Luminosity luminosity={sensorData.lightIntensity} maxLuminosity={1000} />
          <Position positionX={sensorData.position.x} positionY={sensorData.position.y}/>
          <Pressure pressure={sensorData.pressure} maxPressure={4000} />
          <Thermometer temperature={sensorData.temperature} maxTemp={50} />
      </div>
    );
}

export default App;

