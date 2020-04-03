/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
        this.quad = new MyQuad(scene);

        this.materialTop = new CGFappearance(this.scene);
        this.textureTop = new CGFtexture(this.scene, "images/mineTop.png");
        this.materialTop.setTexture(this.textureTop);

        this.materialSide = new CGFappearance(this.scene);
        this.textureSide = new CGFtexture(this.scene, "images/mineSide.png");
        this.materialSide.setTexture(this.textureSide);

        this.materialBottom = new CGFappearance(this.scene);
        this.textureBottom = new CGFtexture(this.scene, "images/mineBottom.png");
        this.materialBottom.setTexture(this.textureBottom);
	}
    display() {
        // Top
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.materialTop.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        // Bottom
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI , 1, 0, 0);
        this.scene.translate(0, 0, 0.5);
        this.materialBottom.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.materialSide.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        // Side em X
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Side em -X
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Side em Y
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Side em -Y
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
    }

}

