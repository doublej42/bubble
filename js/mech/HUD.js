// Heads-up display
// this is where the fans and multiplier may be dragged into the world, or back to be destroyed

import { HudFan } from './HudFan.js';
import { HudMult } from './HudMult.js';
import { VolumeSlider } from './VolumeSlider.js'

export class HUD {
    scoreBoard;
    scene;
    constructor(scene) {
        this.scene = scene;
        const hudWidth = 100;
        const hudHeight = window.innerHeight - 50;//600; // TODO: update this via game config
        const leftPadding = 10;

        // Create HUD container that stays fixed on the screen
        const hudContainer = scene.add.container(0, 0)
            .setScrollFactor(0)
            ;

        // HUD background rectangle
        const hudBg = scene.add.rectangle(0, 0, hudWidth, hudHeight, 0xffffff, 0.5).setOrigin(0, 0);
        hudContainer.add(hudBg);

        const rightFanText = scene.add.text(leftPadding, hudHeight - 30, "right fan", {
            fontSize: '17px',
            fontFamily: 'GroovyBubble',
            fill: '#000000'
        });
        hudContainer.add(rightFanText);

        const rightHudFan = new HudFan(scene, 40, hudHeight - 80, 'right');
        hudContainer.add(rightHudFan);

        // HUD text to indicate item creation
        const leftFanText = scene.add.text(leftPadding, hudHeight - 170, "left fan", {
            fontSize: '17px',
            fontFamily: 'GroovyBubble',
            fill: '#000000'
        });

        hudContainer.add(leftFanText);

        const leftHudFan = new HudFan(scene, 40, hudHeight - 220, 'left');
        hudContainer.add(leftHudFan);

        // add multiplier text
        const multText = scene.add.text(leftPadding, hudHeight - 310, "multiplier", {
            fontSize: '17px',
            fontFamily: 'GroovyBubble',
            fill: '#000000'
        });
        hudContainer.add(multText);

        // add multiplier icon for the hud
        //const multHudIcon = scene.add.image(40, hudHeight - 340, 'multHud').setScale(0.3).setInteractive();
        const multHudIcon = new HudMult(scene, 40, hudHeight - 340);
        hudContainer.add(multHudIcon);

        // add a volume slider
        const volumeSlider = new VolumeSlider(scene, 25, 20).setScrollFactor(0);
        hudContainer.add(volumeSlider);

        this.scoreBoard = scene.add.text(30, 100, 'Score:\r\n0', {
            color: "#000",
            fontSize: '17px',
            fontFamily: 'GroovyBubble',
            shadow: {
                offsetX: 0,
                offsetY: 0,
                color: '#FFF',
                blur: 1,
                stroke: true,
                fill: true
            },
            align: 'center',
        }).setScrollFactor(0);
    }

    static preload(scene) {
        HudFan.preload(scene);
        VolumeSlider.preload(scene);
        scene.load.image('multHud', 'images/multHud.png');
        scene.load.image('trash', 'images/trash.png');
    }

    update() {
        //console.log(this.scene.goals);
        const score = this.scene.goals.children.entries.filter(goal => goal.scored).length;
       
        //const score = 5;
        this.scoreBoard.setText(`Score:\r\n${score}`);
    }
}