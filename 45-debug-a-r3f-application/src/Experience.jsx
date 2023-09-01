import { OrbitControls } from "@react-three/drei";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";
import { Cube } from "./Cube";

export default function Experience() {
  const { position, color, visible } = useControls("sphere", {
    position: {
      value: { x: -2, y: 0 },
      //   min: -4,
      //   max: 4,
      step: 0.01,
      joystick: "invertY",
    },
    color: "#ff0000",
    visible: true,
    clickMe: button(() => {
      console.log("ok");
    }),
    choice: {
      options: ["a", "b"],
    },
  });

  const { perfVisible } = useControls({
    perfVisible: true,
  });

  return (
    <>
      {perfVisible && <Perf position="top-left" />}
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position={[position.x, position.y, 0]} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
      <Cube scale={1.5} />
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
