import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  PresentationControls,
  Text,
  useGLTF,
} from "@react-three/drei";

export default function Experience() {
  const model = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );

  return (
    <>
      <Environment preset="city" />
      <color args={["#292626"]} attach={"background"} />

      {/* <OrbitControls makeDefault /> */}

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{
          mass: 2,
          tension: 400,
        }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={5.65}
            intensity={85}
            color={"#33aa88"}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.35, -1.15]}
          />
          <primitive object={model.scene} position-y={-1.2}>
            <Html
              transform
              wrapperClass="htmlScreen"
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
            >
              <iframe src="https://tomassl.vercel.app/" />
            </Html>
          </primitive>
          <Text
            font="./bangers-v20-latin-regular.woff"
            fontSize={0.8}
            position={[1.9, 0.7, 0.75]}
            rotation-y={-Math.PI / 3}
            maxWidth={2}
          >
            Tomas Suarez Lissi
          </Text>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
