import {MainScene} from './MainScene.js'



const config = {
    type: Phaser.AUTO,
    width: window.innerWidth - 20,
    height: window.innerHeight - 50,
    scene: MainScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: -75 }
        }
    }
};

const game = new Phaser.Game(config);