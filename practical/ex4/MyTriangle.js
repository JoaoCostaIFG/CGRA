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
  updateBuffers() {}
	initBuffers() {
		this.vertices = [
            0, 1, 0,
            0, 0, 0,
            1, 0, 0
		];

		//Counter-clockwise reference of vertices (regra mao direita)
    // definimos 2 triangulos => 1 losango
		this.indices = [
            0, 1, 2,
		];

    this.normals = [];
    for (var i = 0; i < 3; i++)
      this.normals.push(0, 0, 1);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;
		// this.primitiveType = this.scene.gl.LINES;

		this.initGLBuffers();
	}
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

class MyTriangleSmall extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
  updateBuffers() {}
	initBuffers() {
		this.vertices = [
            0, 2, 0,
            0, 0, 0,
            1, 1, 0
		];

		//Counter-clockwise reference of vertices (regra mao direita)
    // definimos 2 triangulos => 1 losango
		this.indices = [
            0, 1, 2,
		];

    this.normals = [];
    for (var i = 0; i < 3; i++)
      this.normals.push(0, 0, 1);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;
		// this.primitiveType = this.scene.gl.LINES;

		this.initGLBuffers();
	}
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

class MyTriangleBig extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
  updateBuffers() {}
	initBuffers() {
		this.vertices = [
            0, 4, 0,
            0, 0, 0,
            2, 2, 0
		];

		//Counter-clockwise reference of vertices (regra mao direita)
    // definimos 2 triangulos => 1 losango
		this.indices = [
            0, 1, 2,
		];

    this.normals = [];
    for (var i = 0; i < 3; i++)
      this.normals.push(0, 0, 1);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;
		// this.primitiveType = this.scene.gl.LINES;

		this.initGLBuffers();
	}
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
