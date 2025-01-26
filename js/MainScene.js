import {PlayField} from "./mech/PlayField.js"
import {Spawner} from './mech/Spawner.js';
import {Goal} from './mech/Goal.js'
import {Multiplier} from './mech/Multiplier.js'
import {HUD} from './mech/HUD.js'

export class MainScene extends Phaser.Scene {
    camera;
    cursors;
    playfield;
    bubbles;
    multipliers;
    goals;
    hud;
    init() {
        // Instantiate the Playfield and pass the current scene as context
        this.playfield = new PlayField(this);
    }

    preload() {
        console.log('preload MainScene',this);
        this.playfield.preload();
        this.load.spritesheet('fanAnim', 'images/fanAnim.png', { frameWidth: 225, frameHeight: 225 });

        Spawner.staticPreload(this);
        Multiplier.staticPreload(this);
        HUD.preload(this);
        Goal.staticPreload(this);
    }

    create() {
        this.playfield.create();
        var bounds = this.cameras.main.getBounds();
        var middle = bounds.width/2;
        var bottom = bounds.height;
        this.add.existing(new Spawner(this,middle,bottom,2));
        this.add.existing(new Spawner(this,middle+100,bottom,3));
        this.add.existing(new Spawner(this,middle-100,bottom,5));

        this.bubbles = this.physics.add.group();

        this.goals = this.physics.add.staticGroup();
        this.goals.add(new Goal(this,middle+50,bottom-700,6),true);
        this.goals.add(new Goal(this,middle+300,bottom-1300,30),true);


        this.physics.add.collider(this.bubbles, this.goals,Goal.handleCollision);

        this.multipliers = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });
        
        this.physics.add.collider(this.bubbles, this.multipliers,Multiplier.handleCollision);
        
        
        //https://github.com/phaserjs/examples/blob/00868cfbe0ce555c8e9f8ace3e3dc7d1504425ca/public/src/games/firstgame/part9.html#L57
        this.hud = new HUD(this);
        this.add.existing(this.hud);

       
    }

    update() {
        this.playfield.update();
        this.hud.update();
    }
}
