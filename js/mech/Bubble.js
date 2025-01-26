const colourChoices = [
    '#6eb2c3',
    '#ffd7a4',
    '#ffaead',
    '#ecc9df',
    '#bbb0d8',
    '#f8f6b9',
    '#a6c3e5',
    '#a9deec'
]

export class Bubble extends Phaser.GameObjects.Image {
    scene;
    id;
    value;
    text = null;
    isSfxAdded = false;
    sfx = {};

    constructor (scene, x, y,value)
    {
        super(scene, x, y, 'bubble');
        this.scene = scene;
        this.setTexture('bubble');
        this.value = value;
        this.ensureSfxAdded();
        this.playPopSound();

        //https://docs.phaser.io/phaser/concepts/gameobjects/text
    }

    ensureSfxAdded() {
        if(!this.isSfxAdded) {
            // create the pop sound effects
            this.sfx.pops = [
                this.scene.sound.add('bubblePop1'),
                this.scene.sound.add('bubblePop2'),
                this.scene.sound.add('bubblePop3'),
                this.scene.sound.add('bubblePop4'),
                this.scene.sound.add('bubblePop5'),
                this.scene.sound.add('bubblePop6'),
            ];

            this.isSfxAdded = true;
        }
    }
    
    // play a random bubble pop sound
    playPopSound() {
        this.sfx.pops[Math.floor(Math.random() * this.sfx.pops.length)].play();
    }
    
    static staticPreload(scene)
    {
        scene.load.image('bubble', 'images/bubble.png');
        scene.load.audio('bubblePop1', 'audio/bubblePop1.wav');
        scene.load.audio('bubblePop2', 'audio/bubblePop2.wav');
        scene.load.audio('bubblePop3', 'audio/bubblePop3.wav');
        scene.load.audio('bubblePop4', 'audio/bubblePop4.wav');
        scene.load.audio('bubblePop5', 'audio/bubblePop5.wav');
        scene.load.audio('bubblePop6', 'audio/bubblePop6.wav');
    }

    preUpdate(delta, time) {
        if (this.text === null)
        {
            const randomColor = colourChoices[Math.floor(Math.random() * colourChoices.length)];
            //console.log('bubble preupdate first',randomColor);
            this.text = this.scene.add.text(this.x, this.y-10, this.value, {
                color: randomColor,
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
            });
            //this.text.once('destroy',this.destroyChildren , this);
            this.once('destroy', function () {
                //console.log('destroyChildren',this.text);
                this.text.destroy();
              }, this);
        }
        this.text.setPosition(this.x-5,this.y-10);
        //super.preUpdate(delta, time);
        //console.log('bubble updating', this.id,this.value);
    }

}