/* eslint-disable react/no-unknown-property */
// import { Canvas } from '@react-three/fiber';
// this example is using react-spring@9
import { useSpring } from '@react-spring/web';
import { a } from '@react-spring/three';
import { useState } from 'react';

export default function ShiftBox(props) {

  const [hitSound] = useState(() => new Audio('/hit.mp3'));
  const hitEnter = () => {
    hitSound.currentTime = 0;
    hitSound.volume = 0.2;
    hitSound.play();
  };

  const [active, setActive] = useState(0);

  const { spring } = useSpring({
    spring: active,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });

  const scale = spring.to([0, 1], [1, 5]);
  const rotation = spring.to([0, 1], [0, Math.PI]);
  const color = spring.to([0, 1], ['#ff3c38', '#ff8c42']);

  return (
    <a.mesh
      rotation-y={rotation}
      scale-x={scale}
      scale-z={scale}
      onClick={() => setActive(Number(!active))}
      onPointerOver={hitEnter}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshStandardMaterial roughness={0.5} attach="material" color={color} />
    </a.mesh>
  );
}
