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
    }
}
