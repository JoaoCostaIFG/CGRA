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
    this.turbineRot = 0;
    this.vertStab = 0;
    this.rotated = false;
    this.autoPilot = false;

    /* flag */
    this.flag_t = 0.0;
    this.flag = new MyPlane(scene, 20);
    this.flagShader = new CGFshader(
      this.scene.gl,
      "shaders/flag.vert",
      "shaders/flag.frag"
    );
    this.kirovFlagTex = new CGFappearance(scene);
    this.kirovFlagTex.setTexture(
      new CGFtexture(scene, "images/kirov/kirov_flag.png")
    );

    /* basic objs */
    this.sphere = new MySphere(scene, 20, 20);
    this.cil = new MyCilinder(scene, 20);
    this.stabilizer = new MyPlaneTriangle(scene);

    /* textures */
    this.kirovBodyTex = new CGFappearance(scene);
    this.kirovBodyTex.setTexture(
      new CGFtexture(scene, "images/kirov/kirov_body.png")
    );
    this.kirovStabTex = new CGFappearance(scene);
    this.kirovStabTex.setTexture(
      new CGFtexture(scene, "images/kirov/kirov_stabilizer.png")
    );
    this.kirovDoorTex = new CGFappearance(scene);
    this.kirovDoorTex.setTexture(
      new CGFtexture(scene, "images/kirov/kirov_door.png")
    );
    this.kirovPlainTex = new CGFappearance(scene);
    this.kirovPlainTex.setTexture(
      new CGFtexture(scene, "images/kirov/kirov_plain.png")
    );
    this.kirovHeliceTex = new CGFappearance(scene);
    this.kirovHeliceTex.setTexture(
      new CGFtexture(scene, "images/kirov/kirov_helice.png")
    );

    this.initBuffers();
  }

  dropSupply() {
    if (this.supplyNum >= this.maxSupplies) return;

    this.supplies[this.supplyNum++].drop(this.pos);
  }

  isAutoPilot() {
    return this.autoPilot;
  }

  resetSupplies() {
    // clear all supplies when autopilot is set
    for (var i = 0; i < this.maxSupplies; ++i) this.supplies[i].reset();
    this.supplyNum = 0;
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

    for (var i = 0; i < this.maxSupplies; ++i) {
      this.supplies[i].update(t);
    }

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

  flagDisplay() {
    this.flag_t += Math.PI / 256;
    this.flagShader.setUniformsValues({ t: this.flag_t });
    this.flagShader.setUniformsValues({ s: this.v });

    /* side 1 */
    this.flagShader.setUniformsValues({ intensity: 0.1 });
    this.scene.setActiveShader(this.flagShader);
    this.kirovPlainTex.apply();
    /* fio 1 */
    this.scene.pushMatrix();
    this.scene.translate(0, 0.25, -2);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(2, 0.05, 1);
    this.flag.display();
    this.scene.popMatrix();
    /* fio 2 */
    this.scene.pushMatrix();
    this.scene.translate(0, -0.25, -2);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(2, 0.05, 1);
    this.flag.display();
    this.scene.popMatrix();
    /* flagueta */
    this.kirovFlagTex.apply();
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -4.5);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.scene.scale(3, 1, 1);
    this.flag.display();
    this.scene.popMatrix();

    /* side 2 */
    this.flagShader.setUniformsValues({ intensity: -0.1 });
    this.scene.setActiveShader(this.flagShader);
    this.kirovPlainTex.apply();
    /* fio 1 */
    this.scene.pushMatrix();
    this.scene.translate(0, 0.25, -2);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.scale(2, 0.05, 1);
    this.flag.display();
    this.scene.popMatrix();
    /* fio 2 */
    this.scene.pushMatrix();
    this.scene.translate(0, -0.25, -2);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.scale(2, 0.05, 1);
    this.flag.display();
    this.scene.popMatrix();
    /* flagueta */
    this.kirovFlagTex.apply();
    this.scene.pushMatrix();
    this.scene.translate(0, 0, -4.5);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.scene.scale(3, 1, 1);
    this.flag.display();
    this.scene.popMatrix();

    this.scene.setActiveShader(this.scene.defaultShader);
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
    this.flagDisplay();

    this.scene.popMatrix(); // set correct position and facing angle (pop)
  }
}
