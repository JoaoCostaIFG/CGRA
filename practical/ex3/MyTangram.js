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

    this.materialPink = new CGFappearance(this.scene);
    this.materialPink.setAmbient(1.0, 0.61, 0.82, 1.0);
    this.materialPink.setDiffuse(0.0, 0.0, 0.0, 1.0);
    this.materialPink.setSpecular(1.0, 0.61, 0.82, 1.0);
    this.materialPink.setShininess(10.0);

    this.materialYellow = new CGFappearance(this.scene);
    this.materialYellow.setAmbient(1.0, 1.0, 0.0, 1.0);
    this.materialYellow.setDiffuse(0.0, 0.0, 0.0, 1.0);
    this.materialYellow.setSpecular(1.0, 1.0, 0.0, 1.0);
    this.materialYellow.setShininess(10.0);

    this.materialOrange = new CGFappearance(this.scene);
    this.materialOrange.setAmbient(1.0, 0.61, 0.0, 1.0);
    this.materialOrange.setDiffuse(0.0, 0.0, 0.0, 1.0);
    this.materialOrange.setSpecular(1.0, 0.61, 0.0, 1.0);
    this.materialOrange.setShininess(10.0);

    this.materialBlue = new CGFappearance(this.scene);
    this.materialBlue.setAmbient(0.0, 0.61, 1.0, 1.0);
    this.materialBlue.setDiffuse(0.0, 0.0, 0.0, 1.0);
    this.materialBlue.setSpecular(0.0, 0.61, 1.0, 1.0);
    this.materialBlue.setShininess(10.0);

    this.materialRed = new CGFappearance(this.scene);
    this.materialRed.setAmbient(1.0, 0.08, 0.08, 1.0);
    this.materialRed.setDiffuse(0.0, 0.0, 0.0, 1.0);
    this.materialRed.setSpecular(1.0, 0.08, 0.08, 1.0);
    this.materialRed.setShininess(10.0);

    this.materialPurple = new CGFappearance(this.scene);
    this.materialPurple.setAmbient(0.67, 0.31, 0.76, 1.0);
    this.materialPurple.setDiffuse(0.0, 0.0, 0.0, 1.0);
    this.materialPurple.setSpecular(0.67, 0.31, 0.76, 1.0);
    this.materialPurple.setShininess(10.0);
  }
  updateBuffers() {}
  enableNormalViz() {
    this.diamond.enableNormalViz();
    this.paralelo.enableNormalViz();
    this.trig_norm.enableNormalViz();
    this.trig_big.enableNormalViz();
  }
  display() {
    /* diamond (green) */
    var diam_trans = [1, 0, 0, 0,
                      0, 1, 0, 0,
                      0, 0, 1, 0,
                      0, 1, 0, 1];
    this.scene.pushMatrix();
    this.scene.multMatrix(diam_trans);
    this.scene.customMaterial.apply();
    this.diamond.display();
    this.scene.popMatrix();

    /* Pink */
    this.scene.pushMatrix();
    this.scene.translate(-Math.sqrt(2), Math.sqrt(2), 0.0);
    this.scene.rotate((Math.PI * -135) / 180, 0, 0, 1);
    this.scene.scale(2, 2, 1);
    this.materialPink.apply();
    this.trig_norm.display();
    this.scene.popMatrix();

    /* Red */
    this.scene.pushMatrix();
    this.scene.translate(1 + Math.sqrt(0.5), 3*Math.sqrt(2)/2, 0);
    this.scene.rotate((Math.PI * 135) / 180, 0, 0, 1);
    this.materialRed.apply();
    this.trig_norm.display();
    this.scene.popMatrix();

    /* Purple */
    this.scene.pushMatrix();
    this.scene.translate(1 + Math.sqrt(0.5), 3*Math.sqrt(2)/2, 0);
    this.scene.rotate((Math.PI * 45) / 180, 0, 0, 1);
    this.materialPurple.apply();
    this.trig_norm.display();
    this.scene.popMatrix();

    /* Yellow */
    this.scene.pushMatrix();
    this.scene.translate(1, 0, 0);
    this.materialYellow.apply();
    this.paralelo.display();
    this.scene.popMatrix();

    /* Orange */
    this.scene.pushMatrix();
    this.scene.translate(1, 1, 0.0);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.materialOrange.apply();
    this.trig_big.display();
    this.scene.popMatrix();

    /* Blue */
    this.scene.pushMatrix();
    this.scene.rotate((Math.PI * 135) / 180, 0, 0, 1);
    this.materialBlue.apply();
    this.trig_big.display();
    this.scene.popMatrix();
  }
}
