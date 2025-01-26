// a fan is an object which blows air to push the bubbles, left or right
// it may be dragged anywhere on the screen,
// and can be destroyed by dragging it to the HUD

// TODO: modularize this code so the hud could be anywhere
let hudWidth = 100;

export class Fan extends Phaser.GameObjects.Sprite {
    scene;
    direction;
    blowing;

    constructor (scene, x, y, direction = 'left', blowing = true)
    {
        super(scene, x, y, 'fanAnim');
        this.scene = scene;
        this.direction = direction;
        this.blowing = blowing;

        // create a blowing animation for the fan
        scene.anims.create({
            key: 'fanSpin',
            frames: this.anims.generateFrameNumbers('fanAnim', { start: 1, end: 3 }),
            frameRate: 12,
            repeat: -1
        });

        this
            .setScale(0.5)
            // .setInteractive()
            // .setScrollFactor(0)
            // .setOrigin(0.5,1)
            ;

        if (direction == 'left')
        {
            this.flipX = true;
        }

        if (blowing) {
            this.anims.play('fanSpin', true);
        }

        let newRightFanIcon = this;

        this.setInteractive();
        scene.input.setDraggable(newRightFanIcon);

        let hoveredHud = false;

        // Add drag event listeners to the new icon
        newRightFanIcon.on('drag', (pointer, dragX, dragY) => {
            newRightFanIcon.x = dragX;
            newRightFanIcon.y = dragY;

            // if it is over the hud, turn off the animation and change the texture to trash
            if (newRightFanIcon.x < hudWidth + scene.cameras.main.scrollX) {
                newRightFanIcon.setTexture('trash');
                newRightFanIcon.anims.stop();
                hoveredHud = true;
            } else {
                newRightFanIcon.setTexture('fanAnim');
                newRightFanIcon.anims.play('fanSpin');
                hoveredHud = false;
            }
        });

        // Add drag event listeners to the new icon
        // if the icon is dragged off the hud, destroy it
        newRightFanIcon.on('dragend', (pointer) => {
            if (hoveredHud) {
                newRightFanIcon.destroy();
            }
        });
    }
    
    static staticPreload(scene)
    {
        // scene.load.image('trash', 'images/trash.png');
        // scene.load.spritesheet('fanAnim', 'images/fanAnim.png', { frameWidth: 225, frameHeight: 225 });
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}