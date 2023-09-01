import { useControls } from "leva";

export const Cube = ({ scale }) => {
  const { scale: scaleControl } = useControls("cube", {
    scale: {
      value: scale,
      min: 0,
      max: 10,
      step: 0.01,
    },
  });

  return (
    <mesh position-x={2} scale={scaleControl}>
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
  );
};
