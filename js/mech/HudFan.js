// a HudFan is a fan that is created in the HUD and can be dragged into the world

import { Fan } from './Fan.js';

// TODO: modularize this code so the hud could be anywhere
let hudWidth = 100;

export class HudFan extends Phaser.GameObjects.Sprite {
    scene;

    constructor (scene, x, y, direction = 'left')
    {
        super(scene, x, y, 'fanAnim');
        this.scene = scene;
        this.direction = direction;

        this
            .setScale(0.5)
            .setInteractive()
            .setScrollFactor(0)
            // .setOrigin(0.5,1)
            ;

        if (direction == 'left')
        {
            this.flipX = true;
        }

        let newRightFanIcon = this;

        this.setInteractive();
        scene.input.setDraggable(newRightFanIcon);

        let hoveredHud = false;

        const rightFanIcon = this;
        rightFanIcon.on('drag', (pointer, dragX, dragY) => {
            rightFanIcon.x = dragX;
            rightFanIcon.y = dragY;
        });
    
        rightFanIcon.on('dragend', (pointer) => {
            // If dragged outside HUD, place tile at drop location
            if (rightFanIcon.x > 100) {
                // Create a new tile in the world where dropped
                scene.add.existing(new Fan(scene, pointer.worldX, pointer.worldY+20, direction, true));
            }

            // Reset the HUD tile to its original position
            rightFanIcon.x = x;
            rightFanIcon.y = y;
        });
    }
    
    static staticPreload(scene)
    {
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}