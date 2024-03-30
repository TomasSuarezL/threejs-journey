uniform sampler2D uPerlinTexture;
uniform float uTime;

varying vec2 vUv; 

void main() {

  vec2 smokeUv = vUv;
  smokeUv.x *= 0.5;
  smokeUv.y *= 0.3;
  smokeUv.y -= uTime*0.06;

  // smoke
  vec4 smoke = texture(uPerlinTexture, smokeUv);
  float smokeColor = smoke.r;

  smokeColor = smoothstep(0.4,1.0, smokeColor);

  smokeColor = smokeColor * smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x) * smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.4, vUv.y);

  gl_FragColor = vec4(vec3(0.6), smokeColor);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}