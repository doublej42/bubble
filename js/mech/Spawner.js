
export class Spawner extends Phaser.GameObjects.Image {
    Scene;
    spawnSpeed = 5000;
    active = true;
    countdown = 0;
    constructor (scene, x, y)
    {
        super(scene, x, y, 'spawner');
        this.Scene = scene;
        this.setTexture('spawner');
        this.setPosition(x, y);
        console.log('spawner',this);
        this.setOrigin(0.5,1);
    }
    
    static staticPreload(scene)
    {
        scene.load.image('spawner', 'images/spawner.png')
    }

    create() {
        //this.Scene.add.tileSprite(0, 0, GAMESIZE, GAMESIZE, 'background').setOrigin(0, 0);
    }

    preUpdate(time, delta) {
        //console.log('update Spawner',time,delta);
        this.countdown -= delta;
        if (this.countdown <= 0)
        {
            this.countdown = this.spawnSpeed;
            console.log('spawning bubble');
        }

    }
}