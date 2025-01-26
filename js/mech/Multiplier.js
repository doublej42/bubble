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
export class Multiplier extends Phaser.GameObjects.Sprite {
    a;
    b;
    aStorage = 0;
    bStorage = 0;
    initialized = false;
    //group;
    Scene;
    text;
    spawnSpeed = 2000;
    countdown = 0;
    bubbleCount = 0;
    constructor(scene, x, y) {
        //console.log('Multiplier constructor');

        super(scene, x, y,'Multiplier');

        this.a = 0;
        this.b = 0;
        this.Scene = scene;
        this.setTexture('multField')
        this.setInteractive();
        this.g
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
            console.log('drag',this.x);
            // if it is over the hud, turn off the animation and change the texture to trash
            if (this.x < hudWidth + scene.cameras.main.scrollX) {
                this.setTexture('trash');
                hoveredHud = true;
            } else {
                this.setTexture('multField');
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
   
    static staticPreload(scene)  {
        scene.load.image('multField', 'images/multi/multField.png');
    }
    

    static handleCollision(object1, object2) {
        //console.log('handleCollision', object1.value, object2.a,object2.b);
        if (object1.value === object2.a) {
            object2.aStorage++;
        }
        else if (object1.value === object2.b) {
            object2.bStorage++;
        }
        else if (object2.aStorage <= object2.bStorage)
        {
            object2.a = object1.value;
            object2.aStorage = 1;
        }
        else
        {
            object2.b = object1.value;
            object2.bStorage = 1;
        }

        //console.log('Collision', object2.aStorage, object2.bStorage);
        object1.destroy();
    }

    preUpdate(time, delta) {
        if (!this.initialized) {
            this.initialized = true;
            const randomColor = colourChoices[Math.floor(Math.random() * colourChoices.length)];
            this.text = this.Scene.add.text(this.x, this.y-50, "Inactive", {
                color: randomColor,
                fontSize: '17px',
                fontFamily: 'GroovyBubble',
                shadow: {
                    offsetX: 0,
                    offsetY: 0,
                    color: '#FFF',
                    blur: 1,
                    stroke: true,
                    fill: true
                },
            });


        }
        this.text.setText(`${this.a}:${this.aStorage} * ${this.b}:${this.bStorage}`);
        if (this.aStorage > 0 && this.bStorage > 0) {
            this.countdown -= delta;
            if (this.countdown <= 0) {
                this.aStorage--;
                this.bStorage--;
                //console.log('this.bubbleCount',this.bubbleCount);
                this.countdown = this.spawnSpeed;
                var bubble = new Bubble(this.Scene, this.x, this.y - (this.height/2) - 25, this.a * this.b);
                bubble.id = this.bubbleCount++;
                this.Scene.bubbles.add(bubble, true);
            }
        }
        

        //Phaser.Display.Align.In.Center(this.text, this);

        


    }

}