/**
 * MyScene
 * @constructor
 */
class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.setUpdatePeriod(20);

    this.enableTextures(true);

    /* Initialize scene objects */
    this.axis = new CGFaxis(this);

    // cubemap
    this.cubemap = new MyCubeMap(this);
    this.cubemapMaterial = new CGFappearance(this);
    this.cubemapMaterial.setAmbient(255, 255, 255, 0);
    this.cubemapMaterial.setDiffuse(0, 0, 0, 0);
    this.cubemapMaterial.setSpecular(0, 0, 0, 0);
    this.cubemapTexs = [
      new CGFtexture(this, "images/cubemap.png"),
      new CGFtexture(this, "images/cubemap_water.png"),
      new CGFtexture(this, "images/cubemap_mars.png"),
      new CGFtexture(this, "images/cubemap_hardwarestore.png"),
    ];
    this.selectedCubemap = 1;
    this.cubemapList = {
      Default: 0,
      Water: 1,
      Mars: 2,
      "Hardware Store": 3,
    };

    // terrain shader
    this.terrain = new MyTerrain(this, 50, 8);

    // vehicle
    this.vehicleSpeed = 0.0;
    this.raceCarControl = false;
    this.freezeVehiclePos = false;
    this.speedFactor = 0.5;
    this.sizeFactor = 1.0;
    this.vehicle = new MyVehicle(this, 5);

    // billboard
    this.nSuppliesDelivered = 0;
    this.billboard = new MyBillboard(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
  }

  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(0, 50, -50),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  // called periodically (as per setUpdatePeriod() in init())
  update(t) {
    this.vehicle.v = this.vehicleSpeed * this.speedFactor;
    this.vehicle.update(t, this.freezeVehiclePos);
  }

  raceCarKeys() {
    if (this.vehicle.v > 0) {
      this.vehicleSpeed -= 0.15;
      if (this.vehicleSpeed > 5) this.vehicleSpeed = 5;
    } else if (this.vehicleSpeed < 0) {
      this.vehicleSpeed = 0;
    }

    if (this.gui.isKeyPressed(0 + "KeyW")) this.vehicleSpeed += 2;
    if (this.gui.isKeyPressed(0 + "KeyS")) this.vehicleSpeed -= 1;
  }

  zeppelinKeys() {
    if (this.gui.isKeyPressed(0 + "KeyW")) this.vehicleSpeed++;
    if (this.gui.isKeyPressed(0 + "KeyS")) this.vehicleSpeed--;
    if (this.vehicleSpeed < 0) this.vehicleSpeed = 0;
  }

  checkKeys() {
    var isAutoPilot = this.vehicle.autoPilot;

    if (this.gui.isKeyPressed(0 + "KeyR")) {
      this.vehicleSpeed = 0.0;
      this.nSuppliesDelivered = 0;
      this.vehicle.reset();
    }

    if (this.gui.isKeyPressed(0 + "KeyP"))
      this.vehicle.toggleAutoPilot(this.vehicleSpeed);

    if (this.gui.isKeyPressed(0 + "KeyL")) {
      ++this.nSuppliesDelivered;
      this.vehicle.dropSupply();
    }

    // skips movement controls if in autopilot
    if (isAutoPilot) return;

    // parse velocity controls
    if (this.raceCarControl) this.raceCarKeys();
    else this.zeppelinKeys();

    // parse steering controls
    if (this.gui.isKeyPressed(0 + "KeyA")) this.vehicle.turnLeft(0.1);
    if (this.gui.isKeyPressed(0 + "KeyD")) this.vehicle.turnRight(0.1);
  }

  display() {
    this.checkKeys();

    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    // ---- BEGIN Primitive drawing section

    /* Cubemap */
    this.cubemapMaterial.setTexture(this.cubemapTexs[this.selectedCubemap]);
    this.cubemapMaterial.apply();
    this.cubemap.display();

    /* terrain */
    this.pushMatrix();
    // this.translate(0, -24.99, 0);
    this.rotate(-Math.PI / 2, 1, 0, 0);
    this.terrain.display();
    this.popMatrix();

    /* billboard */
    this.billboard.display(this.nSuppliesDelivered / 5.0);

    /* vehicle */
    this.vehicle.display(this.sizeFactor);

    // ---- END Primitive drawing section
  }
}
