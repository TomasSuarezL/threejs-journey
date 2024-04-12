uniform float uSize;
uniform vec2 uResolution;

attribute float aSize;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  gl_Position = projectionMatrix * viewPosition;

  gl_PointSize = uSize * aSize * uResolution.y;
  gl_PointSize /= -viewPosition.z ;
}