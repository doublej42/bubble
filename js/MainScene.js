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
    }

    update() {
        this.playfield.update();
    }
}
