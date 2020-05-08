attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float t;
uniform float s;
uniform float intensity;

void main() {
  vTextureCoord = aTextureCoord;

  vec3 offset = vec3(0.0, 0.0, 0.0);

  float speed;
  if (s == 0.0)
    speed = 1.0;
  else
    speed = s + 1.0;

  if (intensity < 0.0)
    offset.z += intensity * sin((1.0 - aTextureCoord.x + t) * 3.14 * 6.0);
  else
    offset.z += intensity * sin((aTextureCoord.x + t) * 3.14 * 6.0);

  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}

