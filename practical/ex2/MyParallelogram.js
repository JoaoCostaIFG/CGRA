/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
            0, 0, 0,
            0, Math.sqrt(2), 0,
            Math.sqrt(2)/2, Math.sqrt(2)/2, 0,
            Math.sqrt(2)/2, 3*Math.sqrt(2)/2, 0,
            // 0, 0, 0,
            // 0, 1, 0,
            // 1, 0, 0,
            // 1, -1, 0
		];

		//Counter-clockwise reference of vertices (regra mao direita)
    // definimos 2 triangulos => 1 losango
		this.indices = [
        0, 1, 2,
        2, 1, 0,
        1, 3, 2,
        2, 3, 1,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;
		// this.primitiveType = this.scene.gl.LINES;

		this.initGLBuffers();
	}
}

