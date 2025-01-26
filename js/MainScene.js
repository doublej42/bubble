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
    }

    create() {
        this.playfield.create();
        var bounds = this.cameras.main.getBounds();
        var middle = bounds.width/2;
        var bottom = bounds.height;
        this.add.existing(new Spawner(this,middle,bottom,2));
        this.add.existing(new Spawner(this,middle+100,bottom,3));
    }

    update() {
        this.playfield.update();
    }
}
