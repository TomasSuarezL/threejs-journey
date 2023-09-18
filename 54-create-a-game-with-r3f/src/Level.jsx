import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useMemo, useRef, useState } from "react";
import { BoxGeometry, Euler, MeshStandardMaterial, Quaternion } from "three";

const boxGeometry = new BoxGeometry(1, 1, 1);

const floorMaterial = new MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new MeshStandardMaterial({ color: "slategray" });

const BlockStart = ({ position = [0, 0, 0] }) => {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floorMaterial}
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />
    </group>
  );
};

export const BlockSpinner = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef();

  const [speed] = useState((Math.random() + 0.2) * (Math.random() > 0.5 ? 1 : -1));

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const rotation = new Quaternion();
    rotation.setFromEuler(new Euler(0, time * speed, 0));
    obstacle.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3, 0.3, 0.3]}
          castShadow
          receiveShadow
        ></mesh>
      </RigidBody>
    </group>
  );
};

export const BlockLimbo = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef();

  const [offset] = useState(Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    obstacle.current.setNextKinematicTranslation({
      x: position[0],
      y: Math.sin(time + offset) + 1.15,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3, 0.3, 0.3]}
          castShadow
          receiveShadow
        ></mesh>
      </RigidBody>
    </group>
  );
};

export const BlockAxe = ({ position = [0, 0, 0] }) => {
  const obstacle = useRef();

  const [offset] = useState(Math.random() * Math.PI * 2);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    obstacle.current.setNextKinematicTranslation({
      x: Math.sin(time + offset) * 1.25,
      y: 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor2Material}
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          castShadow
          receiveShadow
        ></mesh>
      </RigidBody>
    </group>
  );
};

const BlockEnd = ({ position = [0, 0, 0] }) => {
  const hamburger = useGLTF("./hamburger.glb");

  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floorMaterial}
        receiveShadow
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
      />
      <RigidBody
        type="fixed"
        colliders="hull"
        restitution={0.2}
        friction={0}
        position={[0, 0.25, 0]}
      >
        <primitive object={hamburger.scene} scale={0.2} />
      </RigidBody>
    </group>
  );
};

const Bounds = ({ length }) => {
  return (
    <RigidBody type="fixed">
      <mesh
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 2, length * 4]}
        position={[2.15, 1, -length * 2 + 2]}
        castShadow
      ></mesh>
      <mesh
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[0.3, 2, length * 4]}
        position={[-2.15, 1, -length * 2 + 2]}
        castShadow
      ></mesh>
      <mesh
        geometry={boxGeometry}
        material={wallMaterial}
        scale={[4, 2, 0.3]}
        position={[0, 1, -length * 4 + 2]}
        castShadow
      ></mesh>
      <CuboidCollider
        args={[2, 0.3, length * 2]}
        position={[0, 0, -length * 2 + 2]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>
  );
};

export const Level = ({ count = 5, types = [BlockSpinner, BlockLimbo, BlockAxe] }) => {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      blocks.push(types[Math.floor(Math.random() * types.length)]);
    }

    return blocks;
  }, [count, types]);

  return (
    <>
      <BlockStart />
      {blocks.map((Block, idx) => {
        return <Block key={idx} position={[0, 0, -idx * 4 - 4]} />;
      })}
      <BlockEnd position={[0, 0, -count * 4 - 4]} />
      <Bounds length={count + 2} />
    </>
  );
};
