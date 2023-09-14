import { forwardRef } from "react";
import DrunkEffect from "./DrunkEffect";

export const Drunk = forwardRef((props, ref) => {
  const effect = new DrunkEffect(props);

  return <primitive object={effect} ref={ref} />;
});
