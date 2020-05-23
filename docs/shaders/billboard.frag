#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

uniform float perc;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
  
  if (perc > 0.0 && vTextureCoord.x < perc)
    color = vec4(1.0 - vTextureCoord.x, vTextureCoord.x, 0.0, 1.0);
	
	gl_FragColor = color;
}
