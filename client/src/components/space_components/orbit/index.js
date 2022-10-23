import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Orbit(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    const circGeoRef = useRef()
    const edgeGeoRef=useRef()
    return (
      <mesh
        {...props}
        ref={ref}>
        <ringGeometry args={
            [props.innerRadius, props.outerRadius, 30] 
        } ref={circGeoRef}/>
        <meshStandardMaterial/>
      </mesh>
    )
  }

export default Orbit;