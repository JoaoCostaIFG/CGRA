/**
 * MyVehicle (Kirov)
 * @constructor
 */
class MyVehicleGondola extends CGFobject {
  constructor(scene) {
    super(scene);

    this.turbineRot = 0;

    /* basic objs */
    this.sphere = new MySphere(scene, 20, 20);
    this.cil = new MyCilinder(scene, 20);

    /* textures */
    this.kirovDoorTex = new CGFappearance(scene);
    this.kirovDoorTex.setSpecular(0.1, 0.1, 0.1, 1);
    this.kirovDoorTex.setTexture(
      new CGFtexture(scene, "images/kirov/kirov_door.png")
    );
    this.kirovPlainTex = new CGFappearance(scene);
    this.kirovPlainTex.setSpecular(0.1, 0.1, 0.1, 1);
    this.kirovPlainTex.setTexture(
      new CGFtexture(scene, "images/kirov/kirov_plain.png")
    );
    this.kirovHeliceTex = new CGFappearance(scene);
    this.kirovHeliceTex.setSpecular(0.9, 0.9, 0.9, 1);
    this.kirovHeliceTex.setTexture(
      new CGFtexture(scene, "images/kirov/kirov_helice.png")
    );

    this.initBuffers();
  }

  update(v) {
    this.turbineRot += Math.PI / 16 + v;
  }

  display() {
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
  }
}
