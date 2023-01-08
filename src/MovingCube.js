/* eslint-disable react/no-unknown-property */
import { MeshReflectorMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useRef } from 'react';

export default function MovingCube({ position = [0, 0, 0] }) {
  const boxRef = useRef();
  const cubeRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const x = Math.sin(time * 0.25);
    const y = Math.cos(time * 0.25);

    boxRef.current.setNextKinematicRotation({
      x: 0,
      y: y + time,
      z: 0,
    });

    boxRef.current.setNextKinematicTranslation({
      x: position[0] + x * 17.5,
      y: position[1] + y * 17.5,
      z: position[2],
    });
    // console.log('frame updated');
  });

  const eventHandler = (event) => {
    cubeRef.current.material.color.set(`hsl(${Math.random() * 360}, ${Math.random() * 100}%, ${Math.random() * 100}%)`);
    // eslint-disable-next-line no-console
    console.log(event);
  };

  const scaleHandler = (event) => {
    cubeRef.current.scale.set(Math.random() * 5, Math.random() * 5, Math.random() * 5);
  };

  return (
    <RigidBody
      ref={boxRef}
      type="kinematicPosition"
      scale={5}
      gravityScale={0}
      position={[0, 6, 0]}
    >
      <mesh onClick={eventHandler} onContextMenu={scaleHandler} ref={cubeRef}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshReflectorMaterial
          //   blur={[0, 0.1]}
          // mixBlur={0.5}
          // distortion={0.75}
          // depthScale={0.5}
          resolution={1024}
          flipX={true}
          mirror={1}
          //   side={DoubleSide}
          //   roughness={0.1}
          //   metalness={0.8}
          // color={'#000000'}
        />
        {/* <meshStandardMaterial /> */}
      </mesh>
    </RigidBody>
  );
}
