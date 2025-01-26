// a fan is an object which blows air to push the bubbles, left or right
// it may be dragged anywhere on the screen,
// and can be destroyed by dragging it to the HUD

// TODO: modularize this code so the hud could be anywhere
const hudWidth = 100;
const pullBehind = false; // if true, this fan causes a pull force behind it
const fanStrength = 10000;

export class Fan extends Phaser.GameObjects.Sprite {
    direction;
    blowing;

    constructor (scene, x, y, direction = 'left', blowing = true)
    {
        super(scene, x, y, 'fanAnim');
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
            .setInteractive();
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
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.blowing) {
            const fanPosition = new Phaser.Math.Vector2(this.x, this.y);
            const distance = new Phaser.Math.Vector2();
            const force = new Phaser.Math.Vector2();
            const acceleration = new Phaser.Math.Vector2();

            for (const bubble of this.scene.bubbles.getChildren()) {
                distance.copy(bubble.body.center).subtract(fanPosition);

                // if the bubble is too far away, don't bother calculating the force
                if (distance.lengthSq() > 50000) {
                    continue;
                }

                // if the bubble is behind the fan, don't bother calculating the force
                if (!pullBehind) {
                    if (this.direction === 'left' && distance.x > 0) {
                        continue;
                    } else if (this.direction === 'right' && distance.x < 0) {
                        continue;
                    }
                }

                force.copy(distance).setLength(fanStrength / distance.lengthSq()).limit(1000);

                // Adjust the force direction based on the fan's direction
                if (this.direction === 'left') {
                    force.x = -Math.abs(force.x);
                } else if (this.direction === 'right') {
                    force.x = Math.abs(force.x);
                }

                acceleration.copy(force).scale(1 / bubble.body.mass);
                bubble.body.velocity.add(acceleration);
            }
        }
    }
}