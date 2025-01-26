// a HudMult is a fan that is created in the HUD and can be dragged into the world
import { Multiplier } from './Multiplier.js';


export class HudMult extends Phaser.GameObjects.Sprite {
    scene;

    constructor (scene, x, y)
    {
        super(scene, x, y, 'multField');
        this.scene = scene;
        

        this
            .setScale(0.5)
            .setInteractive()
            .setScrollFactor(0)
            // .setOrigin(0.5,1)
            ;
        let newRightFanIcon = this;

        this.setInteractive();
        scene.input.setDraggable(newRightFanIcon);


        
        this.on('drag', (pointer, dragX, dragY) => {
            this.x = dragX;
            this.y = dragY;
        });
    
        this.on('dragend', (pointer) => {
            // If dragged outside HUD, place tile at drop location
            if (this.x > 100) {
                // Create a new tile in the world where dropped
                scene.multipliers.add(new Multiplier(scene, pointer.worldX, pointer.worldY+20),true);
            }

            // Reset the HUD tile to its original position
            this.x = x;
            this.y = y;
        });
    }
    
    static staticPreload(scene)
    {
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
}