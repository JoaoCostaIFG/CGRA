class MySupply extends CGFobject {
  SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2,
  };

  constructor(scene) {
    super(scene);

    /* position + state */
    this.state = this.SupplyStates.INACTIVE;
    this.pos = [0, 0, 0];

    /* animation */
    this.currTime = 0;
    this.startFallTime = 0;
    this.fallHeight = 0;

    /* appearance + textures */
    this.initBuffers();
    this.quad = new MyQuad(scene);

    this.materialTop = new CGFappearance(this.scene);
    this.textureTop = new CGFtexture(this.scene, "images/supply_crate/ab_crate_a.png");
    this.materialTop.setTexture(this.textureTop);

    this.materialSide = new CGFappearance(this.scene);
    this.textureSide = new CGFtexture(this.scene, "images/supply_crate/ab_crate_i.png");
    this.materialSide.setTexture(this.textureSide);

    this.materialBottom = new CGFappearance(this.scene);
    this.textureBottom = new CGFtexture(this.scene, "images/supply_crate/ab_crate_e.png");
    this.materialBottom.setTexture(this.textureBottom);
  }

  reset() {
    this.state = this.SupplyStates.INACTIVE;
    this.pos = [0, 0, 0];
  }

  land() {
    if (this.pos[1] <= 0) {
      this.pos[1] = 0.1;
      this.state = this.SupplyStates.LANDED;
    }
  }

  drop(dropPosition) {
    this.pos[0] = dropPosition[0];
    this.pos[1] = dropPosition[1];
    this.pos[2] = dropPosition[2];

    this.startFallTime = this.currTime;
    this.fallHeight = this.pos[1];

    this.state = this.SupplyStates.FALLING;
  }

  update(t) {
    this.currTime = t;

    if (this.state != this.SupplyStates.FALLING) return;

    var percentageFall = (t - this.startFallTime) / 3000;
    this.pos[1] = this.fallHeight * (1 - percentageFall);
  }

  fallingDisplay() {
    this.scene.pushMatrix();
    this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);

    // Side in Z (Front)
    this.scene.pushMatrix();
    this.materialSide.apply();
    this.scene.rotate(Math.PI, 0, 1, 0);
    this.scene.translate(0, 0, 0.5);
    this.quad.display();
    this.scene.popMatrix();

    // Side in -Z (Back)
    this.scene.pushMatrix();
    this.materialSide.apply();
    this.scene.translate(0, 0, 0.5);
    this.quad.display();
    this.scene.popMatrix();

    // Side em Y (Top)
    this.scene.pushMatrix();
    this.materialBottom.apply();
    this.scene.translate(0, -0.5, 0);
    this.scene.rotate(Math.PI / 2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    // Side em -Y (Bottom)
    this.scene.pushMatrix();
    this.materialTop.apply();
    this.scene.translate(0, 0.5, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    // Side em X (Right)
    this.scene.pushMatrix();
    this.materialSide.apply();
    this.scene.translate(-0.5, 0, 0);
    this.scene.rotate(-Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    // Side em -X (Left)
    this.scene.pushMatrix();
    this.materialSide.apply();
    this.scene.translate(0.5, 0, 0);
    this.scene.rotate(Math.PI / 2, 0, 1, 0);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }

  landedDisplay() {
    this.scene.pushMatrix();
    this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);

    this.scene.pushMatrix();
    this.materialBottom.apply();
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.materialSide.apply();
    this.scene.translate(0, 0, -1.0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.materialSide.apply();
    this.scene.translate(0, 0, 1.0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.materialTop.apply();
    this.scene.translate(0, 0, -2.0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.materialSide.apply();
    this.scene.translate(1.0, 0, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.materialSide.apply();
    this.scene.translate(-1.0, 0, 0);
    this.scene.rotate(-Math.PI / 2, 1, 0, 0);
    this.quad.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
  }

  display() {
    if (this.state == this.SupplyStates.INACTIVE) return;
    else if (this.state == this.SupplyStates.FALLING) this.fallingDisplay();
    else if (this.state == this.SupplyStates.LANDED) this.landedDisplay();

    this.land();
  }
}
