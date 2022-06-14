import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'


import { useSpring, useSprings, a, useTrail, Trail, Spring } from '@react-spring/three';

export default function SpringBox(props) {


  // const [styles, api] = useSpring(() => (
  //   {
  //     loop: true,
  //     //pause : pausee,
  //     //reset : true,
  //     from: { position: [-8, 2, 0] },
  //     to: [
  //       { position: [3, 2, 0] },
  //       { position: [3, -2, 0] }
  //     ],
  //     config: { duration: 1000 },

  //   }
  // )

  // );

  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
   
      <a.mesh
        key={props.key}
        {...props.styles}>
        <boxBufferGeometry attach="geometry" args={[0.4, 0.4, 0.4]} />
        <a.meshStandardMaterial roughness={0.5} attach="material" color="orange" />
      </a.mesh>
   
  )
}

