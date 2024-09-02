uniform float uTime;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uStrength;

attribute vec4 tangent;

#include ../includes/simplexNoise4d.glsl

varying vec2 vUv; 

float get_wobble(vec3 position) {
    float wobble = simplexNoise4d(vec4(
      position * uPositionFrequency,
      uTime * uTimeFrequency
    )) * uStrength;

    return wobble;
}

void main() {
    // csm_Position.x = step(csm_Position.x, 0.9) *0.2;

    vec3 biTangent = cross(normal, tangent.xyz);

  // neighbours positions
    float shift = 0.01;
    vec3 positionA = csm_Position + tangent.xyz * shift;
    vec3 positionB = csm_Position + biTangent.xyz * shift;

    float wobble = get_wobble(csm_Position);

    csm_Position += wobble * normal;
    positionA += get_wobble(positionA) * normal;
    positionB += get_wobble(positionB) * normal;

    //Compute normal
    vec3 toA = normalize(positionA - csm_Position);
    vec3 toB = normalize(positionB - csm_Position);

    csm_Normal = cross(toA, toB);

    vUv = uv;
}