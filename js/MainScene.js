import {Playfield} from "./mech/PlayField.js"

export class MainScene extends Phaser.Scene {
    camera;
    cursors;
    playfield;
    init() {
        // Instantiate the Playfield and pass the current scene as context
        this.playfield = new Playfield(this);
    }

    preload() {
        console.log('preload MainScene',this);
        this.playfield.preload();
        this.load.image('logo', 'images/bubble.png');
        this.load.image('red', 'images/red.png');
        this.load.image('rightFan', 'images/rightFan.png');
        this.load.image('multHud', 'images/multHud.png');
    }

    create() {
        this.playfield.create();
        
        const particles = this.add.particles(0, 0, 'red', {
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        const logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        particles.startFollow(logo);
    }

    update() {
        this.playfield.update();
        this.createHUD();
    }

    createHUD() {
        const hudWidth = 100;
        const hudHeight = 600; // TODO: update this via game config
        const leftPadding = 10;
        const padding = 30;

        // Create HUD container that stays fixed on the screen
        const hudContainer = this.add.container(0, 0).setScrollFactor(0);
    
        // HUD background rectangle
        const hudBg = this.add.rectangle(0, 0, hudWidth, hudHeight, 0xffffff, 0.5).setOrigin(0, 0);
        hudContainer.add(hudBg);

        const rightFanText = this.add.text(leftPadding, hudHeight - 30, "right fan", {
            font: '18px Arial',
            fill: '#000000'
        });
        hudContainer.add(rightFanText);
    
        // Add draggable fan
        const rightFanIcon = this.add.image(40, hudHeight - 80, 'rightFan').setScale(0.5).setInteractive();
        hudContainer.add(rightFanIcon);
    
        // Make the tile draggable
        this.input.setDraggable(rightFanIcon);
    
        rightFanIcon.on('drag', (pointer, dragX, dragY) => {
            rightFanIcon.x = dragX;
            rightFanIcon.y = dragY;
        });
    
        rightFanIcon.on('dragend', (pointer) => {
            // If dragged outside HUD, place tile at drop location
            if (rightFanIcon.y > 100) { 
                // Create a new tile in the world where dropped
                const newTile = this.add.image(pointer.worldX, pointer.worldY, 'background').setOrigin(0, 0);
                newTile.setInteractive();
                this.input.setDraggable(newTile);
            }
            // Reset the HUD tile to its original position
            rightFanIcon.x = 200;
            rightFanIcon.y = 50;
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
