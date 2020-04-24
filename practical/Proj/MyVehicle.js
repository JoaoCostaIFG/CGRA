/**
 * MyVehicle
 * @constructor
 */
class MyVehicle extends CGFobject {
  constructor(scene, slices, stacks) {
    super(scene);

    /* pos */
    this.ang = 0;
    this.pos = [0, 0, -0.5];
    this.v = 0;

    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
  }

  update() {
    this.velocity = [
      Math.sin(this.ang) * this.v,
      0,
      Math.cos(this.ang) * this.v,
    ];

    this.pos[0] += this.velocity[0];
    this.pos[1] += this.velocity[1];
    this.pos[2] += this.velocity[2];
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    var ang = 0;
    var alphaAng = (2 * Math.PI) / this.slices;

    for (var i = 0; i < this.slices; i++) {
      // All vertices have to be declared for a given face
      // even if they are shared with others, as the normals
      // in each face will be different

      var sa = Math.sin(ang);
      var saa = Math.sin(ang + alphaAng);
      var ca = Math.cos(ang);
      var caa = Math.cos(ang + alphaAng);

      this.vertices.push(0, 1, 0);
      this.vertices.push(ca, 0, -sa);
      this.vertices.push(caa, 0, -saa);

      // triangle normal computed by cross product of two edges
      var normal = [saa - sa, ca * saa - sa * caa, caa - ca];

      // normalization
      var nsize = Math.sqrt(
        normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]
      );
      normal[0] /= nsize;
      normal[1] /= nsize;
      normal[2] /= nsize;

      // push normal once for each vertex of this triangle
      this.normals.push(...normal);
      this.normals.push(...normal);
      this.normals.push(...normal);

      this.indices.push(3 * i, 3 * i + 1, 3 * i + 2);

      ang += alphaAng;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  updateBuffers(complexity) {
    this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }

  display() {
    this.update();

    this.scene.pushMatrix();
    this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
    this.scene.rotate(this.ang, 0, 1, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    super.display();
    this.scene.popMatrix();
  }
}
