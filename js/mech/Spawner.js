import { Bubble } from "./Bubble.js";
export class Spawner extends Phaser.GameObjects.Image {
    Scene;
    spawnSpeed = 1000;
    active = true;
    countdown = 0;
    bubbleCount = 0;
    //bubbles;
    value;
    constructor (scene, x, y, value)
    {
        super(scene, x, y, 'spawner');
        this.Scene = scene;
        this.setTexture('spawner');
        //console.log('spawner',this);
        this.setOrigin(0.5,1);
        // this.bubbles = this.Scene.physics.add.group({
        //     bounceX: 1,
        //     bounceY: 1
        // });
        this.value = value;
    }
    
    static staticPreload(scene)
    {
        scene.load.image('spawner', 'images/spawner.png')
        Bubble.staticPreload(scene);
    }

    preUpdate(time, delta) {
        //super.preUpdate(delta, time);
        //console.log('update Spawner',time,delta);
        //gravity: https://phaser.io/examples/v3.85.0/physics/arcade/view/gravity
        
        this.countdown -= delta;
        
        if (this.countdown <= 0)
        {
            this.countdown = this.spawnSpeed;
            //console.log('spawning bubble');
            var bubble = new Bubble(this.Scene,this.x,this.y-(this.height/2),this.value);
            bubble.id = this.bubbleCount++;
            bubble.addToUpdateList();
            //this.bubbles.add(bubble,true);
            this.scene.bubbles.add(bubble,true);
        }

    }
}