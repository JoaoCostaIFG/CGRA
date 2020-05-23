attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float t;
uniform float intensity;
uniform float num_waves;

void main() {
  vTextureCoord = aTextureCoord;

  float PI = 3.141592653589793;
  float ang_freq = PI * num_waves;

  vec3 offset = vec3(0.0, 0.0, 0.0);
  if (intensity < 0.0)
    offset.z += intensity * sin((1.0 - aTextureCoord.x + t) * ang_freq);
  else
    offset.z += intensity * sin((aTextureCoord.x + t) * ang_freq);

  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

