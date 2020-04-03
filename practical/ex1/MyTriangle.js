/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */

/*
1. create class and js file
2. include in main.js
3. init in MyScene
4. Display() in MyScene
*/

class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-1, 1, 0,	//0
      -1, -1, 0,	//1
			1, -1, 0,	//2
		];

		//Counter-clockwise reference of vertices (regra mao direita)
    // definimos 2 triangulos => 1 losango
		this.indices = [
			0, 1, 2,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;
		// this.primitiveType = this.scene.gl.LINES;

		this.initGLBuffers();
	}
}

