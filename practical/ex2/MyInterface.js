/**
 * MyInterface
 * @constructor
 */

/*
1. add to gui
2. add variable to scene
3. do something
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

    var obj = this;

    //Checkbox element in GUI
    this.gui.add(this.scene, "displayAxis").name("Display Axis");

    // object's visibility
    this.gui.add(this.scene, "tangramVis").name("Tangram visibility");
    this.gui.add(this.scene, "cubeVis").name("Cube visibility");

    //Slider element in GUI
    this.gui.add(this.scene, "scaleFactor", 0.1, 5).name("Scale Factor");

    return true;
  }
}
