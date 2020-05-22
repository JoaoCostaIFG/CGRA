/**
 * MyVehicle (Kirov)
 * @constructor
 */
class MyVehicle extends CGFobject {
  constructor(scene, maxSupplies) {
    super(scene);

    /* supplies */
    this.maxSupplies = maxSupplies || 5;
    this.supplyNum = 0;
    this.supplies = [];
    for (var i = 0; i < this.maxSupplies; ++i)
      this.supplies.push(new MySupply(scene));

    /* pos */
    this.ang = 0;
    this.pos = [0, 10, 0];
    this.v = 0;

    /* animation */
    this.currTime = 0;
    this.vertStab = 0;
    this.rotated = false;
    this.autoPilot = false;

    /* gondola */
    this.gondola = new MyVehicleGondola(scene);
    /* flag */
    this.flag = new MyFlag(scene, 2.0, 0.15);

    /* basic objs */
    this.sphere = new MySphere(scene, 20, 20);
    this.cil = new MyCilinder(scene, 20);
    this.stabilizer = new MyPlaneTriangle(scene);

    /* textures */
    this.kirovBodyTex = new CGFappearance(scene);
    this.kirovBodyTex.setSpecular(0.1, 0.1, 0.1, 1);
    this.kirovBodyTex.setTexture(
      new CGFtexture(scene, "images/kirov/kirov_body.png")
    );
    this.kirovStabTex = new CGFappearance(scene);
    this.kirovStabTex.setSpecular(0.8, 0.8, 0.8, 1);
    this.kirovStabTex.setTexture(
      new CGFtexture(scene, "images/kirov/kirov_stabilizer.png")
    );

    this.initBuffers();
  }

  dropSupply() {
    if (this.supplyNum >= this.maxSupplies) return;

    this.supplies[this.supplyNum++].drop(this.pos);
  }

  reset() {
    // clear all supplies when autopilot is set
    for (var i = 0; i < this.maxSupplies; ++i) this.supplies[i].reset();
    this.supplyNum = 0;

    // reset vehicle pos
    this.ang = 0;
    this.pos = [0, 10, 0];
    this.v = 0;

    // reset autopilot state
    if (this.autoPilot) this.toggleAutoPilot(this.v);
  }

  toggleAutoPilot(speed) {
    if (this.autoPilot) {
      this.autoPilot = false;
      this.v = speed || 0.0;
    } else {
      this.autoPilot = true;
      this.v = 0.0;
    }
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

  updateAutoPilot(dt) {
    // make a 5 radius turn in 5 seconds
    this.v = 2 * Math.PI;
    this.turnLeft((2 * dt * Math.PI) / 5.0);
  }

  update(t, isDebug) {
    if (this.currTime == 0) this.currTime = t; // special case for the first update

    var dt = (t - this.currTime) / 1000; // delta time
    if (this.autoPilot) this.updateAutoPilot(dt); // TODO

    var dr = this.v * dt; // delta pos

    for (var i = 0; i < this.maxSupplies; ++i) {
      this.supplies[i].update(t);
    }

    /* calculate the 2 components of the velocity */
    this.velocity = [
      Math.sin(this.ang) * dr,
      0,
      Math.cos(this.ang) * dr,
    ];

    /* DEBUG: the block below makes the behicle position static
     * (GOOD FOR CHECKING ANIMATIONS)
     */
    if (!isDebug) {
      this.pos[0] += this.velocity[0];
      this.pos[1] += this.velocity[1];
      this.pos[2] += this.velocity[2];
    }

    this.gondola.update(this.v); // update gondola turbines pos

    if (!this.rotated) {
      if (Math.abs(this.vertStab) < 0.1) this.vertStab = 0;
      else if (this.vertStab < 0) this.vertStab += Math.PI / 64;
      else if (this.vertStab > 0) this.vertStab -= Math.PI / 64;
    }
    this.rotated = false;

    this.currTime = t;
    this.flag.update(dt, this.v);
  }

  display(sizeFactor) {
    for (var i = 0; i < this.supplyNum; ++i) this.supplies[i].display();

    this.scene.pushMatrix();
    // scale
    this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
    this.scene.scale(sizeFactor, sizeFactor, sizeFactor);
    this.scene.translate(-this.pos[0], -this.pos[1], -this.pos[2]);
    // set correct position and facing angle
    this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
    this.scene.rotate(this.ang, 0, 1, 0);

    /* draw body */
    this.kirovBodyTex.apply();
    this.scene.pushMatrix();
    this.scene.scale(1, 1, 2);
    this.sphere.display();
    this.scene.popMatrix();

    /* draw gondola */
    this.gondola.display();

    /* vertical stabilizers */
    this.kirovStabTex.apply();

    this.scene.pushMatrix();
    this.scene.translate(-this.vertStab, 0.8, -2);
    this.scene.rotate(-Math.PI / 2 + this.vertStab, 0, 1, 0);
    this.scene.scale(0.8, 0.8, 1);
    this.stabilizer.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-this.vertStab, -0.8, -2);
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scene.rotate(-Math.PI / 2 - this.vertStab, 0, 1, 0);
    this.scene.scale(0.8, 0.8, 1);
    this.stabilizer.display();
    this.scene.popMatrix();

    /* horizontal stabilizers */
    this.scene.pushMatrix();
    this.scene.translate(0.8, 0, -2);
    this.scene.rotate(-Math.PI / 2, 0, 0, 1);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.scale(0.8, 0.8, 1);
    this.stabilizer.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-0.8, 0, -2);
    this.scene.rotate(Math.PI / 2, 0, 0, 1);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.scale(0.8, 0.8, 1);
    this.stabilizer.display();
    this.scene.popMatrix();

    /* flag */
    this.flag.display();

    this.scene.popMatrix(); // set correct position and facing angle (pop)
  }
}
