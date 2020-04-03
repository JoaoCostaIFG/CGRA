/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
    // need to repeat vertices because each one has 3 normals
		this.vertices = [
			0.5, -0.5, 0.5,	  //0
			0.5, -0.5, -0.5,  //1
			-0.5, -0.5, -0.5,	//2
			-0.5, -0.5, 0.5,	//3
			0.5, 0.5, 0.5,	  //4
			0.5, 0.5, -0.5,   //5
			-0.5, 0.5, -0.5,	//6
			-0.5, 0.5, 0.5,	  //7

			0.5, -0.5, 0.5,	  //0
			0.5, -0.5, -0.5,  //1
			-0.5, -0.5, -0.5,	//2
			-0.5, -0.5, 0.5,	//3
			0.5, 0.5, 0.5,	  //4
			0.5, 0.5, -0.5,   //5
			-0.5, 0.5, -0.5,	//6
			-0.5, 0.5, 0.5,	  //7

			0.5, -0.5, 0.5,	  //0
			0.5, -0.5, -0.5,  //1
			-0.5, -0.5, -0.5,	//2
			-0.5, -0.5, 0.5,	//3
			0.5, 0.5, 0.5,	  //4
			0.5, 0.5, -0.5,   //5
			-0.5, 0.5, -0.5,	//6
			-0.5, 0.5, 0.5,	  //7
		];

		//Counter-clockwise reference of vertices (regra mao direita)
    // definimos 2 triangulos => 1 losango
    this.indices = [
      0, 2, 1,
      0, 3, 2,
      7, 4, 6,
      4, 5, 6,
    ];
    for (var i = 0; i < 4; i++) {
      this.indices.push(i);
      this.indices.push((i + 1) % 4);
      this.indices.push(i + 4);

      this.indices.push((i + 1) % 4);
      this.indices.push(((i + 1) % 4) + 4);
      this.indices.push(i + 4);
    }

    // Generating normals
    this.normals = [];
    // y
    for (var i = 0; i < 8; i++)
      this.normals.push(0, (i < 4) ? -1 : 1, 0);
    // z
    var k = 1;
    this.normals.push(0, 0, 1);
    for (var i = 0; i < 6; i++) {
      if (i % 2 == 0)
        k *= -1;
      this.normals.push(0, 0, k);
    }
    this.normals.push(0, 0, 1);
    // x
    k = 1;
    for (var i = 0; i < 8; i++) {
      this.normals.push(k, 0, 0);
      if (i % 2 != 0)
        k *= -1;
    }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;
		// this.primitiveType = this.scene.gl.LINES;

		this.initGLBuffers();
	}
}

