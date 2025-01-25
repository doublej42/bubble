
export class Spawner extends Phaser.GameObjects.Image {
    Scene;
    SpawnSpeed = 5;

    constructor (scene, x, y)
    {
        super(scene, x, y, 'wand');
        this.Scene = scene;
        this.setTexture('wand');
        this.setPosition(x, y);
        console.log('spawner',this);
        this.setOrigin(0.5,1);
    }
    
    static staticPreload(scene)
    {
        scene.load.image('wand', 'images/spawner.png')
    }

    create() {
        //this.Scene.add.tileSprite(0, 0, GAMESIZE, GAMESIZE, 'background').setOrigin(0, 0);
    }

    update() {

    }
}