import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
  Noise,
  SSR,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import { useControls } from "leva";
import { Drunk } from "./Drunk";
import { useRef } from "react";

export default function Experience() {
  const drunkRef = useRef();

  const { frequency, amplitude } = useControls({
    frequency: { value: 10, min: 0, max: 50 },
    amplitude: { value: 0.1, min: 0, max: 2 },
  });

  // const ssrProps = useControls({
  //   temporalResolve: true,
  //   STRETCH_MISSED_RAYS: true,
  //   USE_MRT: true,
  //   USE_NORMALMAP: true,
  //   USE_ROUGHNESSMAP: true,
  //   ENABLE_JITTERING: true,
  //   ENABLE_BLUR: true,
  //   temporalResolveMix: { value: 0.9, min: 0, max: 1 },
  //   temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
  //   maxSamples: { value: 0, min: 0, max: 1 },
  //   resolutionScale: { value: 1, min: 0, max: 1 },
  //   blurMix: { value: 0.5, min: 0, max: 1 },
  //   blurKernelSize: { value: 8, min: 0, max: 8 },
  //   blurSharpness: { value: 0.5, min: 0, max: 1 },
  //   rayStep: { value: 0.3, min: 0, max: 1 },
  //   intensity: { value: 1, min: 0, max: 5 },
  //   maxRoughness: { value: 0.1, min: 0, max: 1 },
  //   jitter: { value: 0.7, min: 0, max: 5 },
  //   jitterSpread: { value: 0.45, min: 0, max: 1 },
  //   jitterRough: { value: 0.1, min: 0, max: 1 },
  //   roughnessFadeOut: { value: 1, min: 0, max: 1 },
  //   rayFadeOut: { value: 0, min: 0, max: 1 },
  //   MAX_STEPS: { value: 20, min: 0, max: 20 },
  //   NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
  //   maxDepthDifference: { value: 3, min: 0, max: 10 },
  //   maxDepth: { value: 1, min: 0, max: 1 },
  //   thickness: { value: 10, min: 0, max: 10 },
  //   ior: { value: 1.45, min: 0, max: 2 },
  // });
  return (
    <>
      <color args={["#ffffff"]} attach={"background"} />

      <Perf position="top-left" />

      <EffectComposer>
        {/* <Vignette offset={0.3} darkness={0.9} blendFunction={BlendFunction.PIN_LIGHT} /> */}
        {/* <Glitch
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.2, 0.4]}
            mode={GlitchMode.CONSTANT_WILD}
        /> */}
        {/* <Noise blendFunction={BlendFunction.OVERLAY} premultiply /> */}
        {/* <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0} /> */}
        {/* <DepthOfField focusDistance={0.025} focusLength={0.025} bokehScale={6} /> */}
        {/* <SSR {...ssrProps} /> */}
        <Drunk
          ref={drunkRef}
          frequency={frequency}
          amplitude={amplitude}
          blendFunction={BlendFunction.DARKEN}
        />
      </EffectComposer>
      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial
          color={"mediumpurple"}
          // emissive={"orange"}
          // emissiveIntensity={2}
          // toneMapped={false}
        />
      </mesh>

      <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" metalness={0} roughness={0} />
      </mesh>
    </>
  );
}
