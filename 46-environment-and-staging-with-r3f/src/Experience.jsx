import { useFrame } from "@react-three/fiber";
import {
  AccumulativeShadows,
  BakeShadows,
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  RandomizedLight,
  Sky,
  SoftShadows,
  Stage,
  useHelper,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import { DirectionalLightHelper } from "three";
import { useControls } from "leva";

export default function Experience() {
  const cube = useRef();
  const directionalLight = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    cube.current.rotation.y += delta * 0.2;
  });

  useHelper(directionalLight, DirectionalLightHelper, 1);

  const { color, opacity, blur } = useControls("contactShadows", {
    color: "#000000",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: {
      value: [1, 2, 3],
    },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls("env map", {
    envMapIntensity: { value: 2.9, min: 0, max: 12 },
    envMapHeight: {
      value: 7,
      min: 0,
      max: 100,
    },
    envMapRadius: {
      value: 20,
      min: 10,
      max: 1000,
    },
    envMapScale: {
      value: 100,
      min: 10,
      max: 1000,
    },
  });

  return (
    <>
      <Perf position="top-left" />

      {/* <Environment
        background
        //   files={"/environmentMaps/the_sky_is_on_fire_2k.hdr"}
        preset="sunset"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      >
        <color attach={"background"} args={["black"]} />
        <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[0, 100, 0]} />
        </mesh>
        <Lightformer position-z={-5} scale={10} color={"green"} intensity={1} form={"ring"} />
      </Environment> */}

      {/* <BakeShadows /> */}
      {/* <SoftShadows frustum={3.75} size={50} near={9.5} samples={17} rings={11} /> */}

      <OrbitControls makeDefault />

      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        blend={120}
        temporal
      >
        <RandomizedLight
          amount={8}
          radius={0.5}
          ambient={0.5}
          intensity={1}
          bias={0.001}
          position={[1, 2, 3]}
        />
      </AccumulativeShadows> */}

      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
      /> */}

      {/* <directionalLight
        ref={directionalLight}
        position={sunPosition}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      /> */}
      {/* <ambientLight intensity={0.5} /> */}

      {/* <Sky sunPosition={sunPosition} /> */}

      {/* <mesh position-y={1} position-x={-2} castShadow>
        <sphereGeometry />
        <meshStandardMaterial envMapIntensity={envMapIntensity} color="orange" />
      </mesh>

      <mesh ref={cube} position-y={1} position-x={2} scale={1.5} castShadow>
        <boxGeometry />
        <meshStandardMaterial envMapIntensity={envMapIntensity} color="mediumpurple" />
      </mesh> */}

      {/* <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial envMapIntensity={envMapIntensity} color="greenyellow" />
      </mesh> */}
      <Stage
        shadows={{
          type: "contact",
          opacity: opacity,
          blur: blur,
        }}
        environment={"sunset"}
        preset={"portrait"}
        intensity={0.5}
      >
        <mesh position-y={1} position-x={-2} castShadow>
          <sphereGeometry />
          <meshStandardMaterial envMapIntensity={envMapIntensity} color="orange" />
        </mesh>

        <mesh ref={cube} position-y={1} position-x={2} scale={1.5} castShadow>
          <boxGeometry />
          <meshStandardMaterial envMapIntensity={envMapIntensity} color="mediumpurple" />
        </mesh>
      </Stage>
    </>
  );
}
