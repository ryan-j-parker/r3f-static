/* eslint-disable react/no-unknown-property */
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  AccumulativeShadows,
  Environment,
  Float,
  Html,
  Loader,
  OrbitControls,
  PresentationControls,
  RandomizedLight,
  Sky,
  Text,
  Text3D,
} from '@react-three/drei';
import Experience from './Experience';
import { ACESFilmicToneMapping, sRGBEncoding } from 'three';
import { Suspense } from 'react';
import ShiftBox from './ShiftBox';

function App() {
  return (
    <>
      <div className="wire"></div>
      <div className="wirehide"></div>
      <div className="tack"></div>
      <div className="tacktop"></div>
      <div id="canvas-wrap">
        <Suspense fallback={<Loader />}>
          <Canvas
            shadows
            camera={{
              fov: 45,
              near: 0.1,
              far: 400,
              position: [0, 18, 50],
            }}
            gl={{
              antialias: true,
              toneMapping: ACESFilmicToneMapping,
              outputEncoding: sRGBEncoding,
            }}
          >
            <Sky
              distance={300}
              sunPosition={[0, 2000, 10000]}
              inclination={-2}
              azimuth={0.65}
              intensity={0.01}
            />
            <AccumulativeShadows temporal frames={100} scale={10}>
              <RandomizedLight amount={8} position={[5, 5, -10]} />
            </AccumulativeShadows>
            {/* <OrbitControls /> */}
            <ShiftBox position={[-1, 2.5, 1]} rotation={[0, Math.PI * -0.5, 0]} />
            <Environment preset="forest" />
            <PresentationControls
              global
              // rotation={[0.13, 0.1, 0]}
              polar={[-0.4, 0.2]}
              azimuth={[-1, 0.75]}
              config={{ mass: 2, tension: 400 }}
              snap={{ mass: 4, tension: 400 }}
            >
              <Experience />
            </PresentationControls>
          </Canvas>
        </Suspense>
      </div>
    </>
  );
}

export default App;
