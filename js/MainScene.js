import {PlayField} from "./mech/PlayField.js"
import {Spawner} from './mech/Spawner.js';
import {Fan} from './mech/Fan.js';
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
        this.load.image('multHud', 'images/multHud.png');
        this.load.image('trash', 'images/trash.png');
        this.load.spritesheet('fanAnim', 'images/fanAnim.png', { frameWidth: 225, frameHeight: 225 });

        Spawner.staticPreload(this);
        Fan.staticPreload(this);
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
        const scene = this;
        const hudWidth = 100;
        const hudHeight = 600; // TODO: update this via game config
        const leftPadding = 10;
        const padding = 30;

        // Create HUD container that stays fixed on the screen
        const hudContainer = scene.add.container(0, 0)
            .setScrollFactor(0)
            ;
    
        // HUD background rectangle
        const hudBg = scene.add.rectangle(0, 0, hudWidth, hudHeight, 0xffffff, 0.5).setOrigin(0, 0);
        hudContainer.add(hudBg);

        const rightFanText = scene.add.text(leftPadding, hudHeight - 30, "right fan", {
            font: '18px Arial',
            fill: '#000000'
        });
        hudContainer.add(rightFanText);

        // add a right fan icon to the hud
        const rightFanIconStartPos = {x: 40, y: hudHeight - 80};
        const rightFanIcon = scene.add.sprite(rightFanIconStartPos.x, rightFanIconStartPos.y, 'fanAnim')
            .setScale(0.5)
            .setInteractive()
            .setScrollFactor(0)
            ;
        rightFanIcon.anims.play('fanSpin');

        // add the icon to the container
        hudContainer.add(rightFanIcon);
    
        // Make the tile draggable
        scene.input.setDraggable(rightFanIcon);

        rightFanIcon.on('drag', (pointer, dragX, dragY) => {
            rightFanIcon.x = dragX;
            rightFanIcon.y = dragY;
        });
    
        rightFanIcon.on('dragend', (pointer) => {
            // If dragged outside HUD, place tile at drop location
            if (rightFanIcon.x > 100) {
                // Create a new tile in the world where dropped
                this.add.existing(new Fan(scene, pointer.worldX, pointer.worldY+20, 'right', true));
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
                this.add.existing(new Fan(scene, pointer.worldX, pointer.worldY+20, 'left', true));
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
