import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { useControls } from "leva";

export const Fox = (props) => {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);

  const { animation } = useControls("fox", {
    animation: { options: animations.names },
  });

  useEffect(() => {
    const action = animations.actions[animation];
    action.reset().fadeIn(0.5).play();

    return () => {
      action.fadeOut(0.5);
    };
  }, [animation]);

  return <primitive object={fox.scene} {...props} />;
};
