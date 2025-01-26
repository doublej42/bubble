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
    Scene;
    id;
    value;
    text = null;
    constructor (scene, x, y,value)
    {
        super(scene, x, y, 'bubble');
        this.Scene = scene;
        this.setTexture('bubble');
        this.value = value;
        //console.log('bubble',this);
        //https://docs.phaser.io/phaser/concepts/gameobjects/text
    }
    
    static staticPreload(scene)
    {
        scene.load.image('bubble', 'images/bubble.png');
    }
    


    preUpdate(delta, time) {
        if (this.text === null)
        {
            const randomColor = colourChoices[Math.floor(Math.random() * colourChoices.length)];
            //console.log('bubble preupdate first',randomColor);
            this.text = this.Scene.add.text(this.x, this.y-10, this.value, {
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
                console.log('destroyChildren',this.text);
                this.text.destroy();
              }, this);
        }
        this.text.setPosition(this.x-5,this.y-10);
        //super.preUpdate(delta, time);
        //console.log('bubble updating', this.id,this.value);
    }

}