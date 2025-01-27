import {MainScene} from './MainScene.js'



const config = {
    type: Phaser.AUTO,
    width: window.innerWidth - 20,
    height: window.innerHeight - 50,
    scene: MainScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: -75 },
            //debug: true
        }
    }
};


function startGame(){
    //Remove all elements from the body
    document.body.innerHTML = "";
    const game = new Phaser.Game(config);
}

//onclick of #startGame, start the game
document.getElementById("startGame").addEventListener("click",startGame);