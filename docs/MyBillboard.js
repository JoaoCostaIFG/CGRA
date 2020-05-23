class MyBillboard extends CGFobject {
  constructor(scene) {
    super(scene);

    this.plane = new MyPlane(scene, 20);

    this.billboardShader = new CGFshader(
      this.scene.gl,
      "shaders/billboard.vert",
      "shaders/billboard.frag"
    );

    this.boardTextTex = new CGFappearance(scene);
    this.boardTextTex.setTexture(
      new CGFtexture(scene, "images/billboard/billboard_text.png")
    );

    this.boardStandTex = new CGFappearance(scene);
    this.boardStandTex.setTexture(
      new CGFtexture(scene, "images/billboard/billboard_stand.png")
    );
    this.boardTextTex.setTextureWrap("REPEAT", "REPEAT");
  }

  displayCounter(perc) {
    this.billboardShader.setUniformsValues({ perc: perc });
    this.scene.setActiveShader(this.billboardShader);

    this.scene.pushMatrix();
    this.scene.translate(5.9, 1.5, 5.9);
    this.scene.rotate(Math.PI + Math.PI/4, 0, 1, 0);
    this.scene.scale(1.5, 0.2, 1);
    this.plane.display();
    this.scene.popMatrix();

    this.scene.setActiveShader(this.scene.defaultShader);
  }

  display(perc) {
    this.scene.pushMatrix();
    this.scene.translate(6.0, 0.0, 6.0);

    /* billboard text */
    this.boardTextTex.apply();
    this.scene.pushMatrix();
    this.scene.translate(0.0, 1.5, 0.0);
    this.scene.rotate(Math.PI + Math.PI/4, 0, 1, 0);
    this.scene.scale(2, 1, 1);
    this.plane.display();
    this.scene.popMatrix();

    /* billboard patinhas */
    this.boardStandTex.apply();
    this.scene.translate(0.0, 0.5, 0.0);

    this.scene.pushMatrix();
    this.scene.translate(0.5, 0.0, -0.5);
    this.scene.scale(0.2, 1.0, 0.2);
    this.scene.rotate(Math.PI + Math.PI/4, 0, 1, 0);
    this.plane.display();
    this.scene.popMatrix();

    this.scene.translate(-0.5, 0.0, 0.5);
    this.scene.scale(0.2, 1.0, 0.2);
    this.scene.rotate(Math.PI + Math.PI/4, 0, 1, 0);
    this.plane.display();

    this.scene.popMatrix();

    this.displayCounter(perc);
  }
}
