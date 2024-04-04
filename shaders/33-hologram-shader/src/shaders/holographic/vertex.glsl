uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;

#include ../includes/random2D.glsl

void main () {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Glitch
  float glitchTime = uTime - modelPosition.y;
  float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime * 8.76);
  glitchStrength /= 3.0;
  glitchStrength = smoothstep(0.4, 1.0, glitchStrength) * 0.25; 
  modelPosition.x += random2D(modelPosition.xz + uTime) * glitchStrength;
  modelPosition.z += random2D(modelPosition.zx + uTime) * glitchStrength;

  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  vPosition = modelPosition.xyz;
  vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
}