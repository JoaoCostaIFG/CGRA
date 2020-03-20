/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyDiamond extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
  updateBuffers() {}
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			0, -1, 0,	//1
			0, 1, 0,	//2
			1, 0, 0		//3
		];

        this.texCoords = [];

		//Counter-clockwise reference of vertices (regra mao direita)
    // definimos 2 triangulos => 1 losango
		this.indices = [
			0, 1, 2,
			1, 3, 2
		];

    this.normals = [];
    for (var i = 0; i < 4; i++)
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

