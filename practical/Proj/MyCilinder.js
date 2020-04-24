/**
 * MyCilinder
 * @constructor
 */
class MyCilinder extends CGFobject {
  constructor(scene, slices) {
    super(scene);
    this.slices = slices;
    this.initBuffers();
  }
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    var ang = 0;
    var alphaAng = (2 * Math.PI) / this.slices;

    this.texCoords = [];
    var texCurr = 0;
    var texStep = 1.0 / this.slices;

    /* think about a prism made of rectangles. Each rectangle like so:
     * 1----3
     * |\   |
     * | \  |
     * |  \ |
     * |   \|
     * 0----2
     *
     * We add the first 2 vertices outside the loop because they are
     * a special case (they don't 'link back' to anyone).
     */
    // this is vertice 0
    this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
    this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
    this.texCoords.push(texCurr, 1);
    // this is vertice 1
    this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
    this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
    this.texCoords.push(texCurr, 0);
    ang += alphaAng;
    texCurr += texStep;

    for (var i = 2; i < this.slices * 2 + 2; i += 2) {
      // this is vertice 2
      this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
      this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
      this.texCoords.push(texCurr, 1);

      // this is vertice 3
      this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
      this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
      this.texCoords.push(texCurr, 0);

      // these are the triangles: 0-1-2 and 1-3-2
      this.indices.push(i - 2, i, i - 1);
      this.indices.push(i, i + 1, i - 1);
      ang += alphaAng;
      texCurr += texStep;
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
}

/*
 *     for (var i = 0; i < this.slices * 4; i += 4) {
 *       // this is vertice 0
 *       this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
 *       this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
 *
 *       // this is vertice 1
 *       this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
 *       this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
 *
 *       // this is vertice 2
 *       ang += alphaAng;
 *       this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
 *       this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
 *
 *       // this is vertice 3
 *       this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
 *       this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
 *
 *       // these are the triangles: 0-1-2 and 1-3-2
 *       this.indices.push(i, i + 2, i + 1);
 *       this.indices.push(i + 2, i + 3, i + 1);
 *     }
 */
