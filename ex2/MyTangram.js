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
  }
  display() {
    /* diamond */
    var diam_trans = [1, 0, 0, 0,
                      0, 1, 0, 0,
                      0, 0, 1, 0,
                      0, 1, 0, 1];
    this.scene.pushMatrix();
    this.scene.multMatrix(diam_trans);
    this.diamond.display();
    this.scene.popMatrix();

    /* Pink */
    this.scene.pushMatrix();
    this.scene.translate(-Math.sqrt(2), Math.sqrt(2), 0.0);
    this.scene.rotate((Math.PI * -135) / 180, 0, 0, 1);
    this.scene.scale(2, 2, 1);
    this.trig_norm.display();
    this.scene.popMatrix();

    /* Red + Purple */
    this.scene.pushMatrix();
    this.scene.translate(1, 2 + Math.sqrt(2), 0);
    this.scene.rotate((Math.PI * -90) / 180, 0, 0, 1);
    this.scene.scale(2, 2, 1);
    this.trig_norm.display();
    this.scene.popMatrix();

    /* Yellow */
    this.scene.pushMatrix();
    this.scene.translate(1, 0, 0);
    this.paralelo.display();
    this.scene.popMatrix();

    /* Orange */
    this.scene.pushMatrix();
    this.scene.translate(1, 1, 0.0);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.trig_big.display();
    this.scene.popMatrix();

    /* Blue */
    this.scene.pushMatrix();
    this.scene.rotate((Math.PI * 135) / 180, 0, 0, 1);
    this.trig_big.display();
    this.scene.popMatrix();
  }
}
