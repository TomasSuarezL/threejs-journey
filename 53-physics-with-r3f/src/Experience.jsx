import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Euler, Quaternion, Matrix4, Vector3 } from "three";
import { Perf } from "r3f-perf";
import {
  BallCollider,
  CuboidCollider,
  CylinderCollider,
  InstancedRigidBodies,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { useRef, useState, useEffect, useMemo } from "react";

const CUBE_COUNT = 300;

export default function Experience() {
  const [audio] = useState(() => new Audio("./hit.mp3"));
  const model = useGLTF("./hamburger.glb");

  const cube = useRef();
  const twister = useRef();

  const instances = useMemo(() => {
    const instances = [];

    for (let i = 0; i < CUBE_COUNT; i++) {
      instances.push({
        key: `instance_${i}`,
        position: [(Math.random() - 0.5) * 10, 6 + i * 0.2, (Math.random() - 0.5) * 10],
        rotation: [0, 0, 0],
      });
    }

    return instances;
  }, []);

  const cubeJump = () => {
    cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    const eulerRotation = new Euler(0, time * 3, 0);
    const quaternionRotation = new Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 0.5;
    const x = Math.sin(angle) * 2;
    const z = Math.cos(angle) * 2;
    twister.current.setNextKinematicTranslation({ x, y: -0.8, z });
  });

  const collisionEnter = () => {
    audio.currentTime = 0;
    audio.volume = Math.random();
    audio.play();
  };

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <Physics gravity={[0, -9, 0]}>
        <RigidBody colliders="ball">
          <mesh castShadow position={[-2, 4, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        <RigidBody ref={cube} restitution={0} friction={0} onCollisionEnter={collisionEnter}>
          <mesh castShadow position={[2, 2, 0]} scale={1} onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>

        <RigidBody ref={twister} position={[0, -0.8, 0]} friction={0} type="kinematicPosition">
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 2, 0]}>
          <primitive object={model.scene} scale={0.25} />
          <CylinderCollider args={[0.5, 1.25]} />
        </RigidBody>

        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>

        <InstancedRigidBodies instances={instances}>
          <instancedMesh args={[null, null, CUBE_COUNT]}>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}
