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

  gl_FragColor = vec4(vec3(1.0), smokeColor);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}