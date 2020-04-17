/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
  constructor(scene) {
    super(scene);
    this.initBuffers();
    this.quad = new MyQuad(scene);
  }
  display() {
    /*
    this.scene.gl.texParameteri(
      this.scene.gl.TEXTURE_2D,
      this.scene.gl.TEXTURE_MAG_FILTER,
      this.scene.gl.NEAREST
    );
    */
    this.scene.pushMatrix();
    this.scene.scale(50, 50, 50);

    // Top
    this.scene.pushMatrix();
    this.quad.updateTexCoords([
      1/4, 1/3,
      2/4, 1/3,
      1/4, 0.0,
      2/4, 0.0,
    ]);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.scene.translate(0, 0, -0.5);
    this.quad.display();
    this.scene.popMatrix();

    // Bottom
    this.scene.pushMatrix();
    this.quad.updateTexCoords([
      1/4, 1.0,
      2/4, 1.0,
      1/4, 2/3,
      2/4, 2/3,
    ]);
    this.scene.translate(0, 0, -0.5);
    this.quad.display();
    this.scene.popMatrix();

    // Side em Y (Front)
    this.scene.pushMatrix();
    this.quad.updateTexCoords([
      1/4, 2/3,
      2/4, 2/3,
      1/4, 1/3,
      2/4, 1/3,
    ]);
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    // Side em -Y (Back)
    this.scene.pushMatrix();
    this.quad.updateTexCoords([
      3/4, 2/3,
      1.0, 2/3,
      3/4, 1/3,
      1.0, 1/3,
    ]);
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    // Side em X (Right)
    this.scene.pushMatrix();
    this.quad.updateTexCoords([
      2/4, 2/3,
      3/4, 2/3,
      2/4, 1/3,
      3/4, 1/3,
    ]);
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    // Side em -X (Left)
    this.scene.pushMatrix();
    this.quad.updateTexCoords([
      0.0, 2/3,
      1/4, 2/3,
      0.0, 1/3,
      1/4, 1/3,
    ]);
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
