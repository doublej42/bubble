const GAMESIZE = 10000;
export class PlayField {
    Scene;
    Cursors;
    Camera;
    constructor(scene)
    {
        this.Scene = scene;
    }
    
    preload()
    {
        console.log('preload', this.Scene)
        this.Scene.load.image('background', 'images/Pastel-Rainbow-17-Lemon-Paper-Lab.jpg')
    }

    create() {
        this.Scene.add.tileSprite(0, 0, GAMESIZE, GAMESIZE, 'background').setOrigin(0, 0);

        // Set up the camera
        this.Camera = this.Scene.cameras.main;
        this.Camera.setBounds(0, 0, GAMESIZE, GAMESIZE); // Set the camera's boundaries to the size of the world
        this.Camera.centerOn(GAMESIZE/2,GAMESIZE);
        //console.log('this.Scene.input.keyboard',this.Scene.input.keyboard);
        // Enable cursor keys for camera movement
        this.cursors = this.Scene.input.keyboard.createCursorKeys();
    }

    update() {
        const scrollSpeed = 3; // Adjust the camera movement speed as needed
        
        var cursors = this.cursors;
        //console.log()
        var camera = this.Camera;
        // Move the camera based on cursor input
        if (cursors.left.isDown) {
            camera.scrollX -= scrollSpeed;
        }
        if (cursors.right.isDown) {
            camera.scrollX += scrollSpeed;
        }
        if (cursors.up.isDown) {
            camera.scrollY -= scrollSpeed;
        }
        if (cursors.down.isDown) {
            camera.scrollY += scrollSpeed;
        }
    }
}