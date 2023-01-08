/* eslint-disable react/no-unknown-property */
import { Box, Sphere } from '@react-three/drei';
import { MeshCollider, RigidBody, useRapier, useSphericalJoint } from '@react-three/rapier';
import { useRef } from 'react';

export const MeshChain = (props) => {
  const anchor = useRef(null);
  const box = useRef(null);

  useSphericalJoint(anchor, box, [
    [0, 0, 0], // Position of the joint in bodyA's local space
    [0, 4, 0], // Position of the joint in bodyB's local space
  ]);

  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();

  let params = rapier.JointData.fixed(
    { x: 0.0, y: 0.0, z: 0.0 },
    { w: 1.0, x: 0.0, y: 0.0, z: 0.0 },
    { x: 0.0, y: -2.0, z: 0.0 },
    { w: 1.0, x: 0.0, y: 0.0, z: 0.0 }
  );
  let joint = world.createImpulseJoint(params, anchor, box, true);

  return (
    <group {...props}>
      {/* <RigidBody ref={anchor}>
        <mesh>
          <sphereGeometry args={[2, 30, 30]} />
          <meshStandardMaterial color="#44f531" />
        </mesh>
      </RigidBody>
      <RigidBody ref={ball}>
        <mesh>
          <sphereGeometry args={[2, 30, 30]} />
          <meshStandardMaterial color="#cc3f10" />
        </mesh>
      </RigidBody> */}
      <RigidBody ref={anchor} />
      <RigidBody ref={box} position={[0, -2, 0]}>
        <Box args={[0.2, 4, 0.2]}>
          <meshPhysicalMaterial />
        </Box>
        <MeshCollider type="ball">
          <Sphere args={[0.5]} position={[0, -2, 0]}>
            <meshPhysicalMaterial />
          </Sphere>
        </MeshCollider>
      </RigidBody>
    </group>
  );
};
