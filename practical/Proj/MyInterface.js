/**
 * MyInterface
 * @constructor
 */
class MyInterface extends CGFinterface {
  constructor() {
    super();
  }

  init(application) {
    // call CGFinterface init
    super.init(application);
    // init GUI. For more information on the methods, check:
    // http://workshop.chromeexperiments.com/examples/gui
    this.gui = new dat.GUI();

    //Checkbox element in GUI
    this.gui.add(this.scene, "displayAxis").name("Display Axis");

    // List of cubemaps
    this.gui
      .add(this.scene, "selectedCubemap", this.scene.cubemapList)
      .name("Cubemaps");

    // vehicle settings
    this.gui.add(this.scene, "raceCarControl").name("Race car controls");
    this.gui
      .add(this.scene, "freezeVehiclePos")
      .name("Freeze Vehicle in Place (DEBUG)");
    this.gui.add(this.scene, "speedFactor", 0.1, 3.0).name("Vehicle Speed");
    this.gui.add(this.scene, "sizeFactor", 0.5, 3.0).name("Vehicle Size");

    this.initKeys();

    return true;
  }

  initKeys() {
    // create reference from the scene to the GUI
    this.scene.gui = this;
    // disable the processKeyboard function
    this.processKeyboard = function () {};
    // create a named array to store which keys are being pressed
    this.activeKeys = new Map();
  }

  processKeyDown(event) {
    // called when a key is pressed down, mark it as active in the array
    this.activeKeys.set(event.location + event.code, true);
  }

  processKeyUp(event) {
    // called when a key is released, mark it as inactive in the array
    this.activeKeys.set(event.location + event.code, false);
  }

  isKeyPressed(keyCode) {
    // returns true if a key is marked as pressed, false otherwise
    if ((keyCode == "0KeyL" || keyCode == "0KeyP") && this.activeKeys.get(keyCode) === true) {
      this.activeKeys.set(keyCode, false);
      return true;
    }

    return this.activeKeys.get(keyCode) || false;
  }
}
