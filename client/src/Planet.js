import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Planet(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    return (
      <mesh
        {...props}
        ref={ref}>
        <circleGeometry args={
            [props.radius, 12]
        }/>
        <meshStandardMaterial color={props.colour} />
      </mesh>
    )
  }

export default Planet;