import {
  shaderMaterial,
  Center,
  OrbitControls,
  Sparkles,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useControls } from "leva";
import fragmentShader from "./shaders/portal/fragment.glsl";
import vertexShader from "./shaders/portal/vertex.glsl";
import { Color } from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new Color("#ffffff"),
    uColorEnd: new Color("#000000"),
  },
  vertexShader,
  fragmentShader
);

extend({ PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF("./model/portal.glb");
  const texture = useTexture("./model/baked.jpg");

  const portalMaterial = useRef();

  const { position } = useControls("position", {
    position: [0.14, 0.5, -1.08],
  });

  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta;
  });

  return (
    <>
      <color attach={"background"} args={["#030202"]} />
      <OrbitControls makeDefault />

      <Center>
        <mesh geometry={nodes.Baked.geometry} rotation-z={Math.PI}>
          <meshBasicMaterial map={texture} map-flipY={false} />
        </mesh>
        <mesh geometry={nodes.PoleLightA.geometry} position={[-0.225, 0.398, 0.35]} scale={0.6}>
          <meshBasicMaterial color={"#b3fcf9"} />
        </mesh>
        <mesh geometry={nodes.PoleLightB.geometry} position={[0.28, 0.395, 0.35]} scale={0.6}>
          <meshBasicMaterial color={"#b3fcf9"} />
        </mesh>
        <mesh
          geometry={nodes.PortalLight.geometry}
          position={[0.14, 0.5, -1.08]}
          rotation-y={Math.PI}
          scale={0.55}
        >
          <portalMaterial ref={portalMaterial} />
        </mesh>
        <Sparkles size={5} scale={[2, 1, 2]} position-y={0.5} speed={0.2} count={40} />
      </Center>
    </>
  );
}
