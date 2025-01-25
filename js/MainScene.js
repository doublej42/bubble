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
        Spawner.staticPreload(this);
        //this.load.image('logo', 'images/bubble.png');
        //this.load.image('red', 'images/red.png');
    }

    create() {
        this.playfield.create();
        var bounds = this.cameras.main.getBounds();
        var middle = bounds.width/2;
        var bottom = bounds.height;
        this.add.existing(new Spawner(this,middle,bottom));
    }

    update() {
        this.playfield.update();
    }
}
