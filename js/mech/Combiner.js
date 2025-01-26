const colourChoices = [
    0x6eb2c3,
    0xffd7a4,
    0xffaead,
    0xecc9df,
    0xbbb0d8,
    0xf8f6b9,
    0xa6c3e5,
    0xa9deec
]
//Combines A*B
export class Combiner extends Phaser.GameObjects.Rectangle {
    a;
    b;
    aStorage = 0;
    bStorage = 0;
    initialized = false;
    //group;
    Scene;
    constructor(scene, x, y, a, b) {
        console.log('Combiner constructor');

        super(scene, x, y, 300, 100, 0x000000);

        this.a = a;
        this.b = b;
        this.Scene = scene;

    }

    static handleCollision(object1, object2) {
        console.log('handleCollision', object1, object2);
        if (object1.value === object2.a) {
            object2.aStorage++;
        }
        else if (object1.value === object2.b) {
            object2.bStorage++;
        }
        console.log('Collision',object2.aStorage,object2.bStorage);
        object1.destroy();
    }

    preUpdate(delta, time) {
        if (!this.initialized) {
            this.initialized = true;
            const randomColor = colourChoices[Math.floor(Math.random() * colourChoices.length)];
            this.Scene.add.existing(new Phaser.GameObjects.Rectangle(this.scene, this.x, this.y, 290, 90, randomColor));
            this.Scene.add.existing(new Text(this.Scene, this.x, this.y, this.a, {
                color: '#000',
                fontSize: '19px',
                fontFamily: 'GroovyBubble',
                shadow: {
                    offsetX: 0,
                    offsetY: 0,
                    color: '#FFF',
                    blur: 1,
                    stroke: true,
                    fill: true
                },
            }));

        }

    }

}