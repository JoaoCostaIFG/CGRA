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

    this.setUpdatePeriod(50);

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

    // vehicle
    this.speedFactor = 0.5;
    this.sizeFactor = 1.5;
    this.vehicle = new MyVehicle(this, 3, 3);

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
    //To be done...
  }

  checkKeys() {
    // TODO map setas multi set
    if (this.vehicle.v > 0) {
      this.vehicle.v -= 0.03 * this.speedFactor;
      if (this.vehicle.v > 0.5 * this.speedFactor)
        this.vehicle.v = 0.5 * this.speedFactor;
    } else if (this.vehicle.v < 0) this.vehicle.v = 0;

    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed(0 + "KeyW")) this.vehicle.v += 0.1 * this.speedFactor;
    if (this.gui.isKeyPressed(0 + "KeyS")) this.vehicle.v -= 0.5 * this.speedFactor;
    if (this.gui.isKeyPressed(0 + "KeyA")) this.vehicle.ang += 0.1;
    if (this.gui.isKeyPressed(0 + "KeyD")) this.vehicle.ang -= 0.1;
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

    // Cubemap
    this.cubemapMaterial.setTexture(this.cubemapTexs[this.selectedCubemap]);
    this.cubemapMaterial.apply();
    this.cubemap.display();

    // Vehicle
    this.pushMatrix();
    this.translate(
      this.vehicle.pos[0],
      this.vehicle.pos[1],
      this.vehicle.pos[2]
    );
    this.scale(this.sizeFactor, this.sizeFactor, this.sizeFactor);
    this.translate(
      -this.vehicle.pos[0],
      -this.vehicle.pos[1],
      -this.vehicle.pos[2]
    );
    this.vehicle.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
