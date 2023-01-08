/* eslint-disable react/no-unknown-property */
import { MeshReflectorMaterial } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { DoubleSide } from 'three';

export default function Mirror() {
  return (
    <mesh castShadow receiveShadow>
      <MeshReflectorMaterial
        mirror={1}
        resolution={1024}
        distortion={1}
        //   depthToBlurRatioBias={0.25}
        // side={DoubleSide}
      />
      {/* <boxGeometry args={[20, 0.25, 20]} /> */}
      <planeGeometry args={[20, 20]} />
    </mesh>
  );
}
