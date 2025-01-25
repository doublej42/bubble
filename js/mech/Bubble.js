
export class Bubble extends Phaser.GameObjects.Image {
    Scene;
    id;
    value;
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bubble');
        this.Scene = scene;
        this.setTexture('bubble');
        this.setPosition(x, y);
        console.log('bubble',this);
    }
    
    static staticPreload(scene)
    {
        scene.load.image('bubble', 'images/bubble.png')
    }

    create() {
        
    }

    preUpdate(delta, time) {
        //super.preUpdate(delta, time);
        //console.log('bubble updating', this.id,this.value);
    }
}