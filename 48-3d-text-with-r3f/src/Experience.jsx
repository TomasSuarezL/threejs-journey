import { OrbitControls, Text3D, Center, useMatcapTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ConeGeometry, MeshMatcapMaterial, SRGBColorSpace } from "three";
import { Perf } from "r3f-perf";
import { useEffect } from "react";
import { useRef } from "react";

const torusGeometry = new ConeGeometry(1, 2.2, 3, 1);
const material = new MeshMatcapMaterial();

export default function Experience() {
  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

  const pyramids = useRef([]);

  useEffect(() => {
    matcapTexture.colorSpace = SRGBColorSpace;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  useFrame((state, delta) => {
    for (const pyramid of pyramids.current) {
      pyramid.rotation.y += delta * 0.1;
      pyramid.rotation.x += delta * 0.1;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <mesh scale={1.5}>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh> */}
      {/* <coneGeometry ref={setTorusGeometry} args={[1, 2.2, 3, 1]} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

      <Center>
        <Text3D
          font={"./fonts/helvetiker_regular.typeface.json"}
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          material={material}
        >
          HELLO R3F
        </Text3D>
      </Center>
      {[...Array(100)].map((_, idx) => (
        <mesh
          key={idx}
          ref={(elem) => (pyramids.current[idx] = elem)}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.3 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          geometry={torusGeometry}
          material={material}
        />
      ))}
    </>
  );
}
