
export class Bubble extends Phaser.GameObjects.Image {
    Scene;
    SpawnSpeed = 5;

    constructor (scene, x, y)
    {
        super(scene, x, y, 'bubble');
        this.Scene = scene;
        this.setTexture('bubble');
        this.setPosition(x, y);
        console.log('spawner',this);
        this.setOrigin(0.5,1);
    }
    
    static staticPreload(scene)
    {
        scene.load.image('bubble', 'images/bubble.png')
    }

    create() {
        //this.Scene.add.tileSprite(0, 0, GAMESIZE, GAMESIZE, 'background').setOrigin(0, 0);
    }

    update() {

    }
}