/**
 * MyVehicle (Kirov)
 * @constructor
 */
class MyVehicle extends CGFobject {
  constructor(scene) {
    super(scene);

    /* pos */
    this.ang = 0;
    this.pos = [0, 10, 0];
    this.v = 0;

    /* animation */
    this.currTime = 0;
    this.turbineRot = 0;
    this.vertStab = 0;
    this.rotated = false;
    this.autoPilot = false;

    this.sphere = new MySphere(scene, 20, 20);
    this.cil = new MyCilinder(scene, 20);
    this.stabilizer = new MyPlaneTriangle(scene);

    /* textures */
    this.kirovBodyTex = new CGFappearance(scene);
    this.kirovBodyTex.setTexture(new CGFtexture(scene, "images/kirov/kirov_body.png"));
    this.kirovStabTex = new CGFappearance(scene);
    this.kirovStabTex.setTexture(new CGFtexture(scene, "images/kirov/kirov_stabilizer.png"));
    this.kirovDoorTex = new CGFappearance(scene);
    this.kirovDoorTex.setTexture(new CGFtexture(scene, "images/kirov/kirov_door.png"));
    this.kirovPlainTex = new CGFappearance(scene);
    this.kirovPlainTex.setTexture(new CGFtexture(scene, "images/kirov/kirov_plain.png"));
    this.kirovHeliceTex = new CGFappearance(scene);
    this.kirovHeliceTex.setTexture(new CGFtexture(scene, "images/kirov/kirov_helice.png"));

    this.initBuffers();
  }

  isAutoPilot() {
    return this.autoPilot;
  }

  toggleAutoPilot() {
    this.autoPilot = !this.autoPilot;
    this.v = 0;
  }

  updateAutoPilot(t) {
    var delta = (t - this.currTime) / 1000;
    this.v = 2 * Math.PI * delta;
    this.turnLeft((2 * delta * Math.PI) / 5);
  }

  turnLeft(amount) {
    this.ang += amount;
    if (this.vertStab > -Math.PI / 6) this.vertStab -= Math.PI / 128;

    this.rotated = true;
  }

  turnRight(amount) {
    this.ang -= amount;
    if (this.vertStab < Math.PI / 6) this.vertStab += Math.PI / 128;

    this.rotated = true;
  }

  update(t) {
    if (this.currTime == 0) this.currTime = t;
    if (this.autoPilot) this.updateAutoPilot(t);

    this.velocity = [
      Math.sin(this.ang) * this.v,
      0,
      Math.cos(this.ang) * this.v,
    ];

    this.pos[0] += this.velocity[0];
    this.pos[1] += this.velocity[1];
    this.pos[2] += this.velocity[2];

    this.turbineRot += Math.PI / 16 + this.v;

    if (!this.rotated) {
      if (Math.abs(this.vertStab) < 0.1) this.vertStab = 0;
      else if (this.vertStab < 0) this.vertStab += Math.PI / 64;
      else if (this.vertStab > 0) this.vertStab -= Math.PI / 64;
    }
    this.rotated = false;

    this.currTime = t;
  }

  updateBuffers() {}

  display() {
    this.scene.pushMatrix();
    this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
    this.scene.rotate(this.ang, 0, 1, 0);

    /* draw body */
    this.kirovBodyTex.apply();
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 2);
    this.sphere.display();
    this.scene.popMatrix();

    /* draw passengerPlace */
    this.kirovDoorTex.apply();
    this.scene.pushMatrix();
    this.scene.translate(0, -1.1, -0.75);
    this.scene.scale(0.2, 0.2, 1.5);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.cil.display();
    this.scene.popMatrix();

    this.kirovPlainTex.apply();

    this.scene.pushMatrix();
    this.scene.translate(0, -1.1, -0.75);
    this.scene.scale(0.2, 0.2, 0.2);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -1.1, 0.75);
    this.scene.scale(0.2, 0.2, 0.2);
    this.sphere.display();
    this.scene.popMatrix();

    /* passenger turbines */
    this.scene.pushMatrix();
    this.scene.translate(0.2, -1.1, -0.8);
    this.scene.scale(0.1, 0.1, 0.3);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.2, -1.1, -0.8);
    this.scene.scale(0.1, 0.1, 0.3);
    this.sphere.display();
    this.scene.popMatrix();

    /* turbine helices */
    this.kirovHeliceTex.apply();

    this.scene.pushMatrix();
    this.scene.translate(0.2, -1.1, -1.1);
    this.scene.rotate(this.turbineRot, 0, 0, 1);
    this.scene.scale(0.05, 0.2, 0.01);
    this.sphere.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.2, -1.1, -1.1);
    this.scene.rotate(-this.turbineRot, 0, 0, 1);
    this.scene.scale(0.05, 0.2, 0.01);
    this.sphere.display();
    this.scene.popMatrix();

    /* vertical stabilizers */
    this.kirovStabTex.apply();

    this.scene.pushMatrix();
    this.scene.translate(this.vertStab, 0.8, -2);
    this.scene.rotate(-Math.PI / 2 - this.vertStab, 0, 1, 0);
    this.scene.scale(0.8, 0.8, 0);
    this.stabilizer.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(this.vertStab, -0.8, -2);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scene.rotate(-Math.PI / 2 + this.vertStab, 0, 1, 0);
    this.scene.scale(0.8, 0.8, 0);
    this.stabilizer.display();
    this.scene.popMatrix();

    /* horizontal stabilizers */
    this.scene.pushMatrix();
    this.scene.translate(0.8, 0, -2);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.scale(0.8, 0.8, 0);
    this.stabilizer.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.8, 0, -2);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.scale(0.8, 0.8, 0);
    this.stabilizer.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }
}
