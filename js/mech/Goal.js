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

export class Goal extends Phaser.GameObjects.Container {

    initialized = false;
    //group;
    Scene;
    text;
    timeoutSpeed = 2000;
    countdown = 0;
    bubbleCount = 0;
    goal;
    scored = false;
    baseSprite;
    constructor(scene, x, y, goal) {
        super(scene, x, y);
        this.goal = goal;
        this.Scene = scene;

        this.baseSprite = this.Scene.add.sprite(0, 0, 'goal');
        this.add(this.baseSprite);
        this.setSize(this.baseSprite.width, this.baseSprite.height);
        this.text = this.Scene.add.text(0, 0, `Provide\r\n${goal}`, {
            color: "#000",
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
            align: 'center',
        });
        Phaser.Display.Align.In.Center(this.text, this.baseSprite);
        
        //this.text.setOrigin(0.5, 0.5);
        //this.text.setPosition(this.baseSprite.width / 2, this.baseSprite.height / 2);
        
        this.add(this.text);

    }

    static handleCollision(object1, object2) {
        //console.log('handleCollision', object1, object2);
        if (object1.value === object2.goal) {
            object2.scored = true;
            //this.text.setText(`Active`);
            object2.baseSprite.setTexture('goalSuccess');
            object2.countdown = object2.timeoutSpeed;
            var bubble = new Bubble(object2.Scene,object2.x,object2.y-(object2.height/2)-object1.height,object1.value);

            object2.Scene.bubbles.add(bubble,true);
        }
        //else
        //{
            object1.destroy();
        //}

    }

    preUpdate(time, delta) {
        console.log('Goal preUpdate', this);
        //this is so it will turn off if stuff stops hitting it.
        if (this.scored) {
            //this.text.setText(`Active ${this.a}:${this.aStorage} ${this.b}:${this.bStorage}`);
            this.countdown -= delta;
            if (this.countdown <= 0) {
                this.scored = false;
                this.baseSprite.setTexture('goal');
                //this.text.setText(`Provide ${goal}`);
            }
        }
    }

    static staticPreload(scene) {
        scene.load.image('goal', 'images/Goal.png');
        scene.load.image('goalSuccess', 'images/GoalSuccess.png');
    }

}