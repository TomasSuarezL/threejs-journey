uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;

attribute float aScale;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition; 
    gl_Position.y += sin(uTime*0.5 + modelPosition.x*100.0) * 0.3 * aScale;
    gl_Position.x += sin(uTime*0.8 + modelPosition.y*100.0) * 0.1;

    gl_PointSize = uSize * uPixelRatio * aScale;
    gl_PointSize *= ( 1.0 / - viewPosition.z );
}