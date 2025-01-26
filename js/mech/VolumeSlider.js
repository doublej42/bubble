// this has a speaker icon for muting, and a volume slider

// TODO: feed this from the game config
const debug = true;

export class VolumeSlider extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        this.volume = 1;
        this.muted = true;
        this.create();

        this.scene.add.existing(this);
    }

    create() {
        // create a bounding box

        let imagekey = this.muted ? 'muted' : 'speaker';
        this.scene.sound.mute = this.muted;
        this.speaker = this.scene.add.image(this.x, this.y, imagekey).setInteractive().setScrollFactor(0);

        this.speaker.on('pointerdown', this.toggleMute, this);
        this.add(this.speaker);

        // draw the bounding box if debug is enabled
        if (debug) {
            const speakerBounds = this.speaker.getBounds();
            const speakerRect = new Phaser.Geom.Rectangle(speakerBounds.x, speakerBounds.y, speakerBounds.width, speakerBounds.height);
            this.scene.add.graphics({ lineStyle: { width: 2, color: 0x000000 } }).strokeRectShape(speakerRect).setScrollFactor(0);
        }

        // and add it to this container
        // this.add(speakerRect);

        // this.slider = this.scene.add.image(0, 0, 'slider').setInteractive();
        // this.slider.on('pointerdown', this.changeVolume, this);
        // this.add(this.slider);
    }

    toggleMute() {
        this.muted = !this.muted;
        if (this.muted) {
            this.speaker.setTexture('muted');
            this.volume = 0;
            this.scene.sound.mute = true;
        } else {
            this.speaker.setTexture('speaker');
            this.volume = 1;
            this.scene.sound.mute = false;
        }
    }

    static preload(scene) {
        scene.load.image('muted', 'images/muted.png');
        scene.load.image('speaker', 'images/speaker.png');
    }
}
