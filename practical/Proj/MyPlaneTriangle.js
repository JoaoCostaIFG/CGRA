/*
 * Plane + tringle
 */
class MyPlaneTriangle extends CGFobject {
  constructor(scene) {
    super(scene);
		this.initBuffers();
  }

  updateBuffers() {}

  initBuffers() {
    this.vertices = [
      -0.5, -0.5, 0,
      0.5, -0.5, 0,
      0.5, 0.5, 0,
      -0.5, 0.5, 0,
      1.5, -0.5, 0,

      -0.5, -0.5, 0,
      0.5, -0.5, 0,
      0.5, 0.5, 0,
      -0.5, 0.5, 0,
      1.5, -0.5, 0,
    ];
    this.indices = [
      0, 1, 2,
      0, 2, 3,
      1, 4, 2,
      
      2, 1, 0,
      3, 2, 0,
      2, 4, 1,
    ];
    this.normals = [];
    for (var i = 0; i < 5; ++i)
      this.normals.push(0, 0, 1);
    for (var i = 0; i < 5; ++i)
      this.normals.push(0, 0, -1);

		this.texCoords = [
			0, 1,
			0.5, 1,
			0.5, 0,
			0, 0,
			1, 1,

			0, 1,
			0.5, 1,
			0.5, 0,
			0, 0,
			1, 1,
		];

    this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
    this.initGLBuffers();
  }
}
