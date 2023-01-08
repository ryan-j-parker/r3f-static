/* eslint-disable react/no-unknown-property */
import {
  AccumulativeShadows,
  Center,
  Float,
  MeshReflectorMaterial,
  RandomizedLight,
  shaderMaterial,
  Sparkles,
  Text3D,
  useAnimations,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import { Debug, Physics, RigidBody } from '@react-three/rapier';
import React, { useState } from 'react';
import { DoubleSide } from 'three';
import vertShader from './vertShader';
import fragShader from './fragShader';
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import Heavens from './Heavens';
import Box from './ShiftBox';
import MovingCube from './MovingCube';
import Ground from './Mirror';
import * as THREE from 'three';
import Mirror from './Mirror';
import { useEffect } from 'react';
import OldKorrigan from './OldKorrigan';
import YoungKorrigan from './YoungKorrigan';

const GlassMaterial = shaderMaterial({
  vertShader,
  fragShader,
});
extend({ GlassMaterial });

export default function Experience() {
  const cloudRef = useRef();
  const cubeRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // cloudRef.current.rotation.y += time;

    const x = Math.sin(time * 0.05);
    const z = Math.cos(time * 0.05);

    cloudRef.current.setNextKinematicTranslation({
      x: x * 17.5,
      y: 3,
      z: z * 17.5,
    });
    const rotation = new THREE.Quaternion();
    cloudRef.current.setNextKinematicRotation(rotation * time);
    // console.log('frame updated');
  });

  //   const colorHandler = () => {
  //     cubeRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 90%)`);
  //   };

  const oldKorriganRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const rotationRate = new THREE.Quaternion();
    rotationRate.setFromEuler(new THREE.Euler(0, time * -0.05, 0));
    oldKorriganRef.current.setNextKinematicRotation(rotationRate);
  });

  const goldMatcap = useTexture('/gold-matcap.png');

  return (
    <>
      <Physics gravity={[0, -9.81, 0]}>
        <Float
          position={[0, 21, 52]}
          rotation={[0, 0, 0]}
          scale={[0.5, 0.5, 0.5]}
          floatIntensity={0.5}
          floatSpeed={0.5}
          rotationIntensity={0.5}
          rotationSpeed={0.5}
        >
          <Center>
            <Text3D
              font={'/Berkshire_Swash_Regular.json'}
              curveSegments={24}
              size={3.5}
              height={0.8}
              bevelSegments={30}
              bevelSize={0.1}
            >
              <meshMatcapMaterial
                attach="material"
                matcap={goldMatcap}
                metalness={0.5}
                roughness={0.5}
              />
              Ryan J. Parker
            </Text3D>
          </Center>
        </Float>
        {/* <RigidBody
          rotation={[Math.PI * -0.5, Math.PI * -0.5]}
          position={[-14.2, 4.2, -9]}
          gravityScale={0}
        > */}
        {/* <mesh rotation={[Math.PI * -0.5, 0, 0]} position={[3, 4.2, -9]}>
          <torusGeometry args={[18, 0.5, 16, 100]} />
          <meshMatcapMaterial matcap={goldMatcap} />
        </mesh> */}
        {/* </RigidBody> */}
        <group>
          <RigidBody
            type="kinematicPosition"
            ref={oldKorriganRef}
            gravityScale={0}
            mass={10}
            restitution={0}
            friction={1}
            colliders="cuboid"
          >
            <OldKorrigan />
          </RigidBody>
        </group>
        <RigidBody type="kinematicPosition" ref={cloudRef}>
          <Heavens />
        </RigidBody>
        <Debug />
        <MovingCube position={[0, 4, 0]} />
        <RigidBody
          type="fixed"
          colliders="cuboid"
          position={[0, -3, 0]}
          rotation={[Math.PI * -0.5, 0, 0]}
        >
          <Mirror />
        </RigidBody>
        <RigidBody
          type="fixed"
          colliders="cuboid"
          position={[-16, 3, -12]}
          rotation={[Math.PI * -0.5, 0, 0]}
        >
          <Mirror />
        </RigidBody>
        <RigidBody
          type="fixed"
          colliders="cuboid"
          position={[26, -12, 0]}
          rotation={[Math.PI * -0.5, 0, 0]}
        >
          <Mirror />
        </RigidBody>
        <YoungKorrigan/>
      </Physics>
    </>
  );
}
