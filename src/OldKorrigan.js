/* eslint-disable react/no-unknown-property */
import { Center, Sparkles, useAnimations, useGLTF, useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef } from 'react';

export default function OldKorrigan(props) {
  const { scene, animations } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/old-korrigan/model.gltf'
  );
  const oldKorriganRef = useRef();
  const { actions, names } = useAnimations(animations, oldKorriganRef);
  useEffect(() => {
    actions[names[0]].play();
  });

  //   useEffect((state, delta) => {
  //     // const time = state.clock.getElapsedTime();
  //     console.log('state', state, 'delta', delta);
  //     oldKorriganRef.current.rotation.y = Math.PI;
  //     oldKorriganRef.current.position.x += Math.sin() * delta;
  //     oldKorriganRef.current.position.z += Math.cos() * delta;
  //   });

  const goldMatcap = useTexture('/gold-matcap.png');

  return (
    <group
      ref={oldKorriganRef}
      scale={9}
      rotation={[0, Math.PI - 0.2, 0]}
      position={[-14.2, 4.2, -9]}
      dispose={null}
    >
      {/* <Center> */}
      {/* </Center> */}
      <mesh scale={3}>
        <primitive object={scene} {...props} />
      </mesh>
      <mesh position-y={-0.05}>
        <boxBufferGeometry args={[0.5, 0.1, 0.5]} />
        <meshStandardMaterial roughness={0.2} metalness={0.9} color={'#ff433d'} />
      </mesh>
      {/* <mesh rotation={[Math.PI * -0.5, 0, 0]}>
        <torusGeometry args={[3, 0.5, 16, 100]} />
        <meshMatcapMaterial matcap={goldMatcap} />
      </mesh> */}
    </group>
  );
}
