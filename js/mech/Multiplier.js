import { Bubble } from "./Bubble.js";
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


// TODO: modularize this code so the hud could be anywhere
let hudWidth = 100;


//Combines A*B
export class Multiplier extends Phaser.GameObjects.Container {
    a;
    b;
    aStorage = 0;
    bStorage = 0;
    initialized = false;
    //group;
    Scene;

    text;
    spawnSpeed = 1100;
    countdown = 0;
    bubbleCount = 0;
    baseSprite;
    constructor(scene, x, y, children) {
        //console.log('Multiplier constructor');

        super(scene, x, y, children);

        this.a = 0;
        this.b = 0;
        this.Scene = scene;
        this.setSize(200, 100);

        this.baseSprite = this.Scene.add.sprite(0, 0, 'multField');
        this.add(this.baseSprite);


        this.aCapSprite = this.Scene.add.sprite(0-20, 2, 'multFieldM0');
        this.add(this.aCapSprite);
        this.bCapSprite = this.Scene.add.sprite(0+20, 2, 'multFieldM0');
        this.add(this.bCapSprite);



        // const randomColor = colourChoices[Math.floor(Math.random() * colourChoices.length)];
        // this.text = this.Scene.add.text(0, -80, "Inactive", {
        //     color: randomColor,
        //     fontSize: '17px',
        //     fontFamily: 'GroovyBubble',
        //     shadow: {
        //         offsetX: 0,
        //         offsetY: 0,
        //         color: '#FFF',
        //         blur: 1,
        //         stroke: true,
        //         fill: true
        //     },
        // });
        // this.add(this.text);


        this.setInteractive();
        scene.input.setDraggable(this);
        let hoveredHud = false;

        // Add drag event listeners to the new icon
        this.on('drag', (pointer, dragX, dragY) => {
            this.x = dragX;
            this.y = dragY;
            //no scooping up bubbles, empty it when moved
            this.a = 0;
            this.b = 0;
            this.aStorage = 0;
            this.bStorage = 0;
            console.log('drag', this.x);
            // if it is over the hud, turn off the animation and change the texture to trash
            if (this.x < hudWidth + scene.cameras.main.scrollX) {
                this.baseSprite.setTexture('trash');
                hoveredHud = true;
            } else {
                this.baseSprite.setTexture('multField');
                hoveredHud = false;
            }
        });

        // Add drag event listeners to the new icon
        // if the icon is dragged off the hud, destroy it
        this.on('dragend', (pointer) => {
            if (hoveredHud) {
                this.destroy();
            }
        });
    }

    static staticPreload(scene) {
        scene.load.image('multField', 'images/multi/multField.png');
        scene.load.image('multFieldM0', 'images/multi/multFieldM0.png');
        scene.load.image('multFieldM1', 'images/multi/multFieldM1.png');
        scene.load.image('multFieldM2', 'images/multi/multFieldM2.png');
        scene.load.image('multFieldM3', 'images/multi/multFieldM3.png');
        scene.load.image('multFieldM4', 'images/multi/multFieldM4.png');
        scene.load.image('multFieldM5', 'images/multi/multFieldM5.png');
    }


    static handleCollision(object1, object2) {
        //console.log('handleCollision', object1.value, object2.a,object2.b);
        if (object1.value === object2.a) {
            object2.aStorage++;
        }
        else if (object1.value === object2.b) {
            object2.bStorage++;
        }
        else if (object2.aStorage <= object2.bStorage) {
            object2.a = object1.value;
            object2.aStorage = 1;
        }
        else {
            object2.b = object1.value;
            object2.bStorage = 1;
        }

        //console.log('Collision', object2.aStorage, object2.bStorage);
        object1.destroy();
    }

    preUpdate(time, delta) {
        //this.text.setText(`${this.a}:${this.aStorage} * ${this.b}:${this.bStorage}`);
        //cap the storage at 5
        if (this.aStorage > 5) {
            this.aStorage = 5;
        }
        this.aCapSprite.setTexture(`multFieldM${this.aStorage}`);

        if (this.bStorage > 5) {
            this.bStorage = 5;
        }
        this.bCapSprite.setTexture(`multFieldM${this.bStorage}`);

        if (this.aStorage > 0 && this.bStorage > 0) {
            this.countdown -= delta;
            if (this.countdown <= 0) {
                this.aStorage--;
                this.bStorage--;
                //console.log('this.bubbleCount',this.bubbleCount);
                this.countdown = this.spawnSpeed;
                var bubble = new Bubble(this.Scene, this.x, this.y - (this.height / 2) - 25, this.a * this.b);
                bubble.id = this.bubbleCount++;
                this.Scene.bubbles.add(bubble, true);
            }
        }
    }

}