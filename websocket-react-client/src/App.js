import logo from './logo.svg';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useEffect, useState, useRef ,useCallback} from 'react';
import { useSpring, useSprings, a, useTrail, Trail, Spring,useSpringRef } from '@react-spring/three';
import { Canvas, useFrame } from "@react-three/fiber";
import uuid from "short-uuid";
import SpringBox from "./SpringBox";



const client = new W3CWebSocket('ws://127.0.0.1:8080');




function App() {
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  const springRef = useSpringRef();

  const [styles, api] = useSpring(() => (
    {
      ref : springRef,
      loop: true,
      //pause : pausee,
      //reset : true,
      from: { position : [-10,3,0]},
      to: [
        {position: [5, 3,0]},
        {position:[5,-3,0]}
      ],
      config: { duration: 1000 },

    }
  )

  );

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message);
    };
    console.log("springRef" , springRef.current);

  }, []);
  const [pausee, setPause] = useState(false);
  const [addMesh,setAddMesh] = useState(false);
  const [deleteMesh,setDeleteMesh] = useState(false);
  const [items,setItems] = useState([]);
 
  

  
  

  

  const [styles2, api2] = useSpring(() => (
    {
      loop: true,
      //pause : pausee,
      //reset : true,
      from: { position : [-8,2,0]},
      to: [
        {position: [3, 2,0]},
        {position:[3,-2,0]}
      ],
      config: { duration: 1000 },

    }
  )

  );


  function sendPause() {
    client.send("pause from React");
    setPause(!pausee);
    if (pausee === true) {
      api.resume();
      //api2.resume();
    } else {
      api.pause();
      //api2.pause();
    }

  }

  const handleClick = useCallback(e => {setItems(items => [...items, uuid.generate()])}, [])

  function deleteCube() {
    setDeleteMesh(true);
    setItems([]);
  }



  console.log(items.length);

  return (
    <>
    <button onClick={() => sendPause()}> pause </button>
      <button onClick={handleClick}> create a cube </button>
      <button onClick={() => deleteCube()}> delete a cube</button>

     
      <div style = {{height : "1000px", width : "2000px"}}>
      <Canvas>
      
      <color attach="background" args={["black"]} />
        <a.mesh
          {...styles}
          scale={clicked ? 3 : 2}
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}>
          <boxBufferGeometry attach="geometry" args={[0.4, 0.4, 0.4]} />
        <a.meshStandardMaterial roughness={0.5} attach="material" color="red" />
        </a.mesh>

        <ambientLight intensity={0.1} />
        <directionalLight />
        <pointLight position={[10, 10, 10]} />

        {items.map((key, index) => (
          <SpringBox id = {key} 
          styles = {styles2}
          />
      ))}


      </Canvas>
      </div>


    </>
  );
}

export default App;

