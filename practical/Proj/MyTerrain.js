class MyTerrain extends CGFobject {
  constructor(scene, size, maxHeight) {
    super(scene);

		this.size = size || 1;
    this.maxHeight = maxHeight || 1;

    this.plane = new MyPlane(scene, 20);
		this.terrain = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
    this.terrain.setUniformsValues({ uSampler2: 1 });
    this.terrain.setUniformsValues({ maxHeight: this.maxHeight });

		this.terrainAppearance = new CGFappearance(scene);
		this.terrainTex = new CGFtexture(scene, "images/terrain/terrain.jpg");
    this.terrainAppearance.setTexture(this.terrainTex);
		this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');
		this.terrainMap = new CGFtexture(scene, "images/terrain/heightmap.jpg");
  }

  display() {
    this.terrainAppearance.apply();
		this.scene.setActiveShader(this.terrain);
    this.terrainMap.bind(1);

    this.scene.pushMatrix();
    this.scene.scale(this.size, this.size, 1);
    this.plane.display();
    this.scene.popMatrix();

    this.scene.setActiveShader(this.scene.defaultShader);
  }
}
