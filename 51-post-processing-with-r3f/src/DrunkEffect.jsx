import { BlendFunction, Effect } from "postprocessing";

const fragmentShader = /*glsl*/ `
  uniform float frequency;
  uniform float amplitude;
  uniform float offset;

  void mainUv(inout vec2 uv) {
    uv.y += sin(uv.x * frequency + offset) * amplitude;
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor ) {
        
      outputColor = vec4(0.5, 1.0, 0.5, inputColor.a);
    }
`;

export default class DrunkEffect extends Effect {
  constructor({ frequency, amplitude, blendFunction = BlendFunction.DARKEN }) {
    super("DrunkEffect", fragmentShader, {
      blendFunction,
      uniforms: new Map([
        ["frequency", { value: frequency }],
        ["amplitude", { value: amplitude }],
        ["offset", { value: 0 }],
      ]),
    });
  }

  update(_renderer, _buffer, deltaTime) {
    this.uniforms.get("offset").value += deltaTime * 2;
  }
}
