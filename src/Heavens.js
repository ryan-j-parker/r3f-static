import { Cloud, Sky } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React from 'react';
import { useRef } from 'react';

export default function Heavens() {
  

  return (
    <>
      <Cloud
        opacity={0.9}
        speed={0.35} // Rotation speed
        width={180} // Width of the full cloud
        depth={4} // Z-dir depth
        segments={40} // Number of particles
        position={[0, 25, 0]}
        // rotation={[0, 0.2, 0]}
      />
      {/* <Sky
        distance={450000}
        sunPosition={[0, 0.5, -5000]}
        inclination={0}
        azimuth={0.15}
        intensity={0.4}
      /> */}
    </>
  );
}
