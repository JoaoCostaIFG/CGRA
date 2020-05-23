/**
 * MyFlag (Kirov)
 * @constructor
 */
class MyFlag extends CGFobject {
  constructor(scene, num_waves, max_intensity) {
    super(scene);

    /* animation */
    this.max_intensity = max_intensity || 0.2;
    this.flag_t = 0.0;
    this.flag = new MyPlane(scene, 20);
    this.flagShader = new CGFshader(
      this.scene.gl,
      "shaders/flag.vert",
      "shaders/flag.frag"
    );

    /* textures */
    this.kirovFlagTex = new CGFappearance(scene);
    this.kirovFlagTex.setTexture(
      new CGFtexture(scene, "images/kirov/kirov_flag.png")
    );
    this.kirovPlainTex = new CGFappearance(scene);
    this.kirovPlainTex.setTexture(
      new CGFtexture(scene, "images/kirov/kirov_plain.png")
    );

    this.flagShader.setUniformsValues({ num_waves: num_waves || 3.0 });
    this.initBuffers();
  }

  update(dt, v) {
    // this.flag_t += Math.PI / 256.0;
    this.flag_t += (1 + v * 0.2) * dt;
    this.flagShader.setUniformsValues({ t: this.flag_t });
    this.flagShader.setUniformsValues({ s: v  });
  }

  display() {
    /* side 1 */
    this.flagShader.setUniformsValues({ intensity: this.max_intensity });
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
    this.flagShader.setUniformsValues({ intensity: -this.max_intensity });
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
}
