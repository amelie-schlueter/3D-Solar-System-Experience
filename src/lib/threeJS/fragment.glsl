uniform float time;
uniform float emissiveIntensity;
varying vec2 vUv;
varying vec3 vPosition;

#include "noise.glsl"

void main() {
    float noiseValue = noise(vPosition + time);

    vec3 color = mix(vec3(1.0, 0.1, 0.0), vec3(1.0, 0.2, 0.0), noiseValue);
    float intensity = (noiseValue * 0.5 + 0.5) * emissiveIntensity;

    gl_FragColor = vec4(color * intensity, 1.0);
}
