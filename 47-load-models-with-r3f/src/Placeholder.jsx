export const Placeholder = (props) => {
  return (
    <mesh {...props} castShadow>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshStandardMaterial wireframe color="mediumpurple" />
    </mesh>
  );
};
