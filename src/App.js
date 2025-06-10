import React, { useState } from 'react';
import './App.css';
import Accelerometer from "./components/accelerometer/Accelerometer";
import Thermometer from "./components/thermometer/Thermometer";
import HumidityDrop from "./components/humidity/Humidity";
import Luminosity from "./components/luminosity/Luminosity";
import Pressure from "./components/pressure/Pressure";

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
            x: Math.random() * 100,
            y: Math.random() * 100,
            z: Math.random() * 100
          },
          pressure: Math.random() * 4000,
          temperature: Math.random() * 50
  };
}

function App() {
    const [sensorData, setSensorData] = useState(generateSensorData());

    initializeApp({sensorData, setSensorData});

    return (
      <div className="App">
          <Accelerometer acceleration={sensorData.accelaration} minAccel={0} maxAccel={10} />
          <HumidityDrop humidity={sensorData.humidity} minHumidity={0} maxHumidity={100} />
          LightIntensity: {sensorData.lightIntensity} <br/>
          <Luminosity luminosity={sensorData.lightIntensity} maxLuminosity={1000} />
          Position: X: {sensorData.position.x} - Y: {sensorData.position.y} - Z: {sensorData.position.z} <br/>
          <Pressure pressure={sensorData.pressure} minPressure={0} maxPressure={4000} />
          Pressure: {sensorData.pressure} <br/>

          <Thermometer temperature={sensorData.temperature} minTemp={0} maxTemp={50} />
      </div>
    );
}

export default App;

