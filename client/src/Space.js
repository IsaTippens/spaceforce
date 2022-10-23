import Box from "./Box";
import Planet from "./Planet";
import React, { useRef, useState } from 'react'
import { Canvas, useFrame,  } from '@react-three/fiber'
import Orbit from './components/space_components/orbit';
function xPosition(distance, angle) {
  //convert angle from degrees to radians
  angle = angle * Math.PI / 180;
  return Math.cos(angle) * distance;
}

function yPosiion(distance, angle) {
  //convert angle from degrees to radians
  angle = angle * Math.PI / 180;
  return Math.sin(angle) * distance;
}

function orbitPosition(distance, angle) {
  return [xPosition(distance, angle), yPosiion(distance, angle), 0];
}

function Space() {
  const sunPos = [0, 0, 0];
  const mercuryPos = orbitPosition(10, 120);
  const venusPos = orbitPosition(20, 260);
  const earthPos = orbitPosition(30, 90);
  const marsPos = orbitPosition(40, 100);
  const jupiterPos = orbitPosition(70, 88);
  const saturnPos = orbitPosition(85, 45);
  const uranusPos = orbitPosition(110, 110);

  

  return (
    <Canvas orthographic camera={{zoom: 2, position: [0, 0, 1]}}>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Orbit innerRadius={110} outerRadius={111} position={sunPos}/>
    <Orbit innerRadius={85} outerRadius={86} position={sunPos}/>
    <Orbit innerRadius={70} outerRadius={71} position={sunPos}/>
    <Orbit innerRadius={40} outerRadius={41} position={sunPos}/>
    <Orbit innerRadius={30} outerRadius={31} position={sunPos}/>
    <Orbit innerRadius={20} outerRadius={21} position={sunPos}/>
    <Orbit innerRadius={10} outerRadius={11} position={sunPos} />

    <Planet position={sunPos} colour="yellow" radius={5}/>
    <Planet position={mercuryPos} colour="grey" radius={2}/>
    <Planet position={venusPos} colour="orange" radius={3}/>
    <Planet position={earthPos} colour="blue" radius={3}/>
    <Planet position={marsPos} colour="red" radius={2}/>
    <Planet position={jupiterPos} colour="brown" radius={5}/>
    <Planet position={saturnPos} colour="yellow" radius={4}/>
    <Planet position={uranusPos} colour="blue" radius={3}/>

    <Box position={[2, 0, 0]} />
  </Canvas>
  );
}

export default Space;
