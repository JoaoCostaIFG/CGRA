/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
  constructor(scene) {
    super(scene);
    this.diamond = new MyDiamond(scene);
    this.paralelo = new MyParallelogram(scene);
    this.trig_norm = new MyTriangle(scene);
    this.trig_big = new MyTriangleBig(scene);

    this.materialTangram = new CGFappearance(this.scene);

    this.textureTangram = new CGFtexture(this.scene, "images/tangram.png");
    this.materialTangram.setTexture(this.textureTangram);
  }
  updateBuffers() {}
  enableNormalViz() {
    this.diamond.enableNormalViz();
    this.paralelo.enableNormalViz();
    this.trig_norm.enableNormalViz();
    this.trig_big.enableNormalViz();
  }
  display() {
    // Apply material to all objects
    this.materialTangram.apply();

    /* diamond (green) */
    var diam_trans = [1, 0, 0, 0,
                      0, 1, 0, 0,
                      0, 0, 1, 0,
                      0, 1, 0, 1];
    this.scene.pushMatrix();
    this.scene.multMatrix(diam_trans);
    this.diamond.updateTexCoords([
            0, 0.5,
            0.25, 0.75,
            0.25, 0.25,
            0.5, 0.5]);
    this.diamond.display();
    this.scene.popMatrix();

    /* Pink */
    this.scene.pushMatrix();
    this.scene.translate(-Math.sqrt(2), Math.sqrt(2), 0.0);
    this.scene.rotate((Math.PI * -135) / 180, 0, 0, 1);
    this.scene.scale(2, 2, 1);
    this.trig_norm.updateTexCoords([
            0.5, 1,
            0, 1,
            0, 0.5]);
    this.trig_norm.display();
    this.scene.popMatrix();

    /* Red */
    this.scene.pushMatrix();
    this.scene.translate(1 + Math.sqrt(0.5), 3*Math.sqrt(2)/2, 0);
    this.scene.rotate((Math.PI * 135) / 180, 0, 0, 1);
    this.trig_norm.updateTexCoords([
        0.25, 0.75,
        0.5, 0.5,
        0.75, 0.75
    ]);
    this.trig_norm.display();
    this.scene.popMatrix();

    /* Such a lovely colour for you */
    this.scene.pushMatrix();
    this.scene.translate(1 + Math.sqrt(0.5), 3*Math.sqrt(2)/2, 0);
    this.scene.rotate((Math.PI * 45) / 180, 0, 0, 1);
    this.trig_norm.updateTexCoords([
        0, 0,
        0.25, 0.25,
        0, 0.5
    ])
    this.trig_norm.display();
    this.scene.popMatrix();

    /* Yellow */
    this.scene.pushMatrix();
    this.scene.translate(1, 0, 0);
    this.paralelo.updateTexCoords([
        0.25, 0.75,
        0.75, 0.75,
        0.5, 1,
        1, 1,
        0.25, 0.75,
        0.75, 0.75,
        0.5, 1,
        1, 1
    ])
    this.paralelo.display();
    this.scene.popMatrix();

    /* Orange */
    this.scene.pushMatrix();
    this.scene.translate(1, 1, 0.0);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.trig_big.updateTexCoords([
        1, 1,
        1, 0,
        0.5, 0.5
    ]);
    this.trig_big.display();
    this.scene.popMatrix();

    /* Blue */
    this.scene.pushMatrix();
    this.scene.rotate((Math.PI * 135) / 180, 0, 0, 1);
    this.trig_big.updateTexCoords([
        1, 0,
        0, 0,
        0.5, 0.5
    ])
    this.trig_big.display();
    this.scene.popMatrix();
  }
}
