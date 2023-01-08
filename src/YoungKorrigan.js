/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from '@react-three/drei';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function YoungKorrigan(props) {
  const { scene, animations } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/young-korrigan/model.gltf'
  );
  const youngKorriganRef = useRef();
  const { actions, names } = useAnimations(animations, youngKorriganRef);
  useEffect(() => {
    actions[names[1]].play();
  });

  return (
    <group ref={youngKorriganRef} dispose={null} position={[17, -12, 9]} rotation={[0, -0.5, 0]}>
      <mesh scale={16}>
        <primitive object={scene} {...props} />
      </mesh>
    </group>
  );
}
