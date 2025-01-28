const GAMESIZE = 3500;
export class PlayField {
    Scene;
    Cursors;
    Camera;
    constructor(scene) {
        this.Scene = scene;
    }

    preload() {
        //console.log('preload', this.Scene)
        this.Scene.load.image('background', 'images/Pastel-Rainbow-17-Lemon-Paper-Lab.jpg')
    }

    create() {
        var background = this.Scene.add.tileSprite(0, 0, GAMESIZE, GAMESIZE, 'background').setOrigin(0, 0);
        background.setInteractive();
        // Set up the camera
        this.Camera = this.Scene.cameras.main;
        this.Camera.setBounds(0, 0, GAMESIZE, GAMESIZE); // Set the camera's boundaries to the size of the world
        this.Camera.centerOn(GAMESIZE / 2, GAMESIZE);
        //console.log('this.Scene.input.keyboard',this.Scene.input.keyboard);
        // Enable cursor keys for camera movement
        this.cursors = this.Scene.input.keyboard.createCursorKeys();
        var cam = this.Scene.cameras.main;
        
        // background.on("pointermove", function (pointer) {
        //     if (!pointer.isDown) return;
            
        //     const { x, y } = pointer.velocity;
        //     //console.log('pointermove',pointer,cam)
        //     console.log('pointermove',x,y,pointer);
        //     //I'm not sure where the 8 comes from but motion smoothing is getting me.
        //     cam.scrollX -= x / cam.zoom / 8;
        //     cam.scrollY -= y / cam.zoom / 8;
        //   });


    ;
    
          background.on('pointermove', (pointer) => {
            if (!pointer.isDown) return;
    
            cam.scrollX -= (pointer.x - pointer.prevPosition.x) / cam.zoom;
            cam.scrollY -= (pointer.y - pointer.prevPosition.y) / cam.zoom;
        });

    }

    update() {
        const scrollSpeed = 10; // Adjust the camera movement speed as needed

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