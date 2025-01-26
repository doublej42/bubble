import {PlayField} from "./mech/PlayField.js"
import {Spawner} from './mech/Spawner.js';

export class MainScene extends Phaser.Scene {
    camera;
    cursors;
    playfield;

    init() {
        // Instantiate the Playfield and pass the current scene as context
        this.playfield = new PlayField(this);
    }

    preload() {
        console.log('preload MainScene',this);
        this.playfield.preload();
        this.load.image('rightFan', 'images/rightFan.png');
        this.load.image('multHud', 'images/multHud.png');
        Spawner.staticPreload(this);
    }

    create() {
        this.playfield.create();
        var bounds = this.cameras.main.getBounds();
        var middle = bounds.width/2;
        var bottom = bounds.height;
        this.add.existing(new Spawner(this,middle,bottom));
        this.createHUD();
    }

    update() {
        this.playfield.update();
    }

    createHUD() {
        const hudWidth = 100;
        const hudHeight = 600; // TODO: update this via game config
        const leftPadding = 10;
        const padding = 30;

        // Create HUD container that stays fixed on the screen
        const hudContainer = this.add.container(0, 0)
            .setScrollFactor(0)
            ;
    
        // HUD background rectangle
        const hudBg = this.add.rectangle(0, 0, hudWidth, hudHeight, 0xffffff, 0.5).setOrigin(0, 0);
        hudContainer.add(hudBg);

        const rightFanText = this.add.text(leftPadding, hudHeight - 30, "right fan", {
            font: '18px Arial',
            fill: '#000000'
        });
        hudContainer.add(rightFanText);
    
        // Add draggable fan
        const rightFanIconStart = {x: 40, y: hudHeight - 80}
        const rightFanIcon = this.add.image(rightFanIconStart.x, rightFanIconStart.y, 'rightFan')
            .setScale(0.5)
            .setInteractive()
            .setScrollFactor(0)
            ;
        hudContainer.add(rightFanIcon);
    
        // Make the tile draggable
        this.input.setDraggable(rightFanIcon);

        rightFanIcon.on('drag', (pointer, dragX, dragY) => {
            rightFanIcon.x = dragX;
            rightFanIcon.y = dragY;
        });
    
        rightFanIcon.on('dragend', (pointer) => {
            // If dragged outside HUD, place tile at drop location
            if (rightFanIcon.x > 100) { 
                // Create a new tile in the world where dropped
                const newRightFanIcon = this.add.image(pointer.worldX-55, pointer.worldY-35, 'rightFan')
                    .setScale(0.5)
                    .setOrigin(0, 0)
                    .setInteractive()
                    .setScrollFactor(1)
                    ;
                this.input.setDraggable(newRightFanIcon);

                // Add drag event listeners to the new icon
                newRightFanIcon.on('drag', (pointer, dragX, dragY) => {
                    newRightFanIcon.x = dragX;
                    newRightFanIcon.y = dragY;
                });
            }

            // Reset the HUD tile to its original position
            rightFanIcon.x = rightFanIconStart.x;
            rightFanIcon.y = rightFanIconStart.y;
        });

        // HUD text to indicate item creation
        const leftFanText = this.add.text(leftPadding, hudHeight - 170, "left fan", {
            font: '18px Arial',
            fill: '#000000'
        });

        hudContainer.add(leftFanText);

        // add a left fan icon to the hud
        const leftFanIcon = this.add.image(40, hudHeight - 220, 'rightFan').setScale(0.5).setInteractive();
        leftFanIcon.flipX = true;
        hudContainer.add(leftFanIcon);

        // make it interactive
        // TODO

        // add multiplier text
        const multText = this.add.text(leftPadding, hudHeight - 310, "multiplier", {
            font: '18px Arial',
            fill: '#000000'
        });
        hudContainer.add(multText);


        // add multiplier icon for the hud
        const multHudIcon = this.add.image(40, hudHeight - 340, 'multHud').setScale(0.3).setInteractive();
        hudContainer.add(multHudIcon);
    }
}
