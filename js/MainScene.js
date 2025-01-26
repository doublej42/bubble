import {PlayField} from "./mech/PlayField.js"
import {Spawner} from './mech/Spawner.js';
import {Combiner} from './mech/Combiner.js'

export class MainScene extends Phaser.Scene {
    camera;
    cursors;
    playfield;
    bubbles;
    init() {
        // Instantiate the Playfield and pass the current scene as context
        this.playfield = new PlayField(this);
    }

    preload() {
        console.log('preload MainScene',this);
        this.playfield.preload();
        this.load.image('rightFan', 'images/rightFan.png');
        this.load.image('multHud', 'images/multHud.png');
        this.load.image('trash', 'images/trash.png');
        this.load.spritesheet('fanAnim', 'images/fanAnim.png', { frameWidth: 225, frameHeight: 225 });
        Spawner.staticPreload(this);
    }

    create() {
        this.playfield.create();
        var bounds = this.cameras.main.getBounds();
        var middle = bounds.width/2;
        var bottom = bounds.height;
        this.add.existing(new Spawner(this,middle,bottom,2));
        this.add.existing(new Spawner(this,middle+100,bottom,3));

        var combiners = this.physics.add.staticGroup();
        this.bubbles = this.physics.add.group();

        combiners.add(new Combiner(this,middle+50,bottom-500,2,3),true);
        this.physics.add.collider(this.bubbles, combiners,Combiner.handleCollision);
        console.log('physics',this.physics)
        //https://github.com/phaserjs/examples/blob/00868cfbe0ce555c8e9f8ace3e3dc7d1504425ca/public/src/games/firstgame/part9.html#L57
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
    
        // create an animation for the fan icon
        this.anims.create({
            key: 'fanSpin',
            frames: this.anims.generateFrameNumbers('fanAnim', { start: 1, end: 3 }),
            frameRate: 12,
            repeat: -1
        });

        // add a right fan icon to the hud
        const rightFanIconStartPos = {x: 40, y: hudHeight - 80};
        const rightFanIcon = this.add.sprite(rightFanIconStartPos.x, rightFanIconStartPos.y, 'fanAnim')
            .setScale(0.5)
            .setInteractive()
            .setScrollFactor(0)
            ;

        // rightFanIcon.anims.play('fanSpin');

        // add the icon to the container
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
                const newRightFanIcon = this.add.sprite(pointer.worldX-55, pointer.worldY-35, 'fanAnim')
                    .setScale(0.5)
                    .setOrigin(0, 0)
                    .setInteractive()
                    .setScrollFactor(1)
                    .anims.play('fanSpin')
                    ;
                this.input.setDraggable(newRightFanIcon);

                let hoveredHud = false;

                // Add drag event listeners to the new icon
                newRightFanIcon.on('drag', (pointer, dragX, dragY) => {
                    newRightFanIcon.x = dragX;
                    newRightFanIcon.y = dragY;

                    // if it is over the hud, turn off the animation and change the texture to trash
                    if (newRightFanIcon.x < hudWidth - 50 + this.cameras.main.scrollX) {
                        newRightFanIcon.setTexture('trash');
                        newRightFanIcon.anims.stop();
                        hoveredHud = true;
                    } else {
                        newRightFanIcon.setTexture('fanAnim');
                        newRightFanIcon.anims.play('fanSpin');
                        hoveredHud = false;
                    }
                });

                // if the icon is dragged off the hud, destroy it
                newRightFanIcon.on('dragend', (pointer) => {
                    if (hoveredHud) {
                        newRightFanIcon.destroy();
                    }
                });
            }

            // Reset the HUD tile to its original position
            rightFanIcon.x = rightFanIconStartPos.x;
            rightFanIcon.y = rightFanIconStartPos.y;
        });

        // HUD text to indicate item creation
        const leftFanText = this.add.text(leftPadding, hudHeight - 170, "left fan", {
            font: '18px Arial',
            fill: '#000000'
        });

        hudContainer.add(leftFanText);

        // add a left fan icon to the hud
        const leftFanIconStartPos = {x: 40, y: hudHeight - 220};
        const leftFanIcon = this.add.sprite(leftFanIconStartPos.x, leftFanIconStartPos.y, 'fanAnim')
            .setScale(0.5)
            .setInteractive()
            .setScrollFactor(0)
            ;
        leftFanIcon.flipX = true;
        hudContainer.add(leftFanIcon);

        // make it interactive
        this.input.setDraggable(leftFanIcon);

        leftFanIcon.on('drag', (pointer, dragX, dragY) => { 
            leftFanIcon.x = dragX;
            leftFanIcon.y = dragY;
        });

        leftFanIcon.on('dragend', (pointer) => {
            if (leftFanIcon.x > 100) {
                const newLeftFanIcon = this.add.sprite(pointer.worldX - 55, pointer.worldY - 35, 'fanAnim')
                    .setScale(0.5)
                    .setOrigin(0, 0)
                    .setInteractive()
                    .setScrollFactor(1)
                    .anims.play('fanSpin')
                    ;
                newLeftFanIcon.flipX = true;
                this.input.setDraggable(newLeftFanIcon);

                let hoveredHud = false;

                newLeftFanIcon.on('drag', (pointer, dragX, dragY) => {
                    newLeftFanIcon.x = dragX;
                    newLeftFanIcon.y = dragY;

                    // if it is over the hud, turn off the animation and change the texture to trash
                    if (newLeftFanIcon.x < hudWidth - 50 + this.cameras.main.scrollX) {
                        newLeftFanIcon.setTexture('trash');
                        newLeftFanIcon.anims.stop();
                        hoveredHud = true;
                    } else {
                        newLeftFanIcon.setTexture('fanAnim');
                        newLeftFanIcon.anims.play('fanSpin');
                        hoveredHud = false;
                    }
                });

                // if the icon is dragged off the hud, destroy it
                newLeftFanIcon.on('dragend', (pointer) => {
                    if (hoveredHud) {
                        newLeftFanIcon.destroy();
                    }
                });
            }

            leftFanIcon.x = leftFanIconStartPos.x;
            leftFanIcon.y = leftFanIconStartPos.y;
        });

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
