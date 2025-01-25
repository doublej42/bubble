window.onload = function () {
    var config = {
        type: Phaser.AUTO,
        width: 640,
        height: 480,
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
            },
        },
    };

    var game = new Phaser.Game(config);
    var cursors;
    var cameraSpeed = 5;
    var tileSize = 80;
    var gameTiles = 10;
    var tileGroup;
    var tilesArray = [];
    var gridSize = 1000; // Define a large world size

    function preload() {
        this.load.image('tile', 'assets/tile.png');
    }

    function create() {
        // Create a world-sized grid
        var graphics = this.add.graphics({
            lineStyle: { width: 1, color: 0xaaaaaa },
        });

        // Draw a grid to visualize the world
        for (var x = -gridSize; x < gridSize; x += tileSize) {
            for (var y = -gridSize; y < gridSize; y += tileSize) {
                graphics.strokeRect(x, y, tileSize, tileSize);
            }
        }

        // Create a tile group
        tileGroup = this.physics.add.group();
        for (var i = 0; i < gameTiles; i++) {
            spawnTile(this);
        }

        // Add keyboard controls
        cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
        // Move camera with WASD or Arrow keys
        if (cursors.left.isDown) {
            this.cameras.main.scrollX -= cameraSpeed;
        } else if (cursors.right.isDown) {
            this.cameras.main.scrollX += cameraSpeed;
        }
        if (cursors.up.isDown) {
            this.cameras.main.scrollY -= cameraSpeed;
        } else if (cursors.down.isDown) {
            this.cameras.main.scrollY += cameraSpeed;
        }

        // Check if any tiles are out of camera view and respawn them beyond vision
        tileGroup.getChildren().forEach((tile) => {
            if (!this.cameras.main.worldView.contains(tile.x, tile.y)) {
                respawnTileBeyondView(tile, this);
            }
        });
    }

    function spawnTile(scene) {
        // Spawn tiles randomly in the world
        var tile = scene.add.image(
            Phaser.Math.Between(100, gridSize - 100),
            Phaser.Math.Between(100, gridSize - 100),
            'tile'
        );
        tile.setOrigin(0.5);
        tile.startValue = Phaser.Math.Between(1, 10);
        tile.currentValue = tile.startValue;

        // Add text to tile
        var text = scene.add.text(0, 0, tile.startValue.toString(), {
            font: 'bold 32px Arial',
            align: 'center',
        });
        text.setOrigin(0.5);
        tile.textObject = text; // Store text object
        tile.addChild = text; // Workaround for Phaser 3

        scene.physics.add.existing(tile);
        tileGroup.add(tile);

        // Update tile position with text
        tileGroup.getChildren().forEach((tile) => {
            tile.textObject.setPosition(tile.x, tile.y);
        });
    }

    function respawnTileBeyondView(tile, scene) {
        // Respawn tiles randomly just beyond the camera view
        var camera = scene.cameras.main;
        var spawnPadding = 50; // Spawning outside visible area

        var spawnX = Phaser.Math.Between(
            camera.worldView.x - spawnPadding,
            camera.worldView.right + spawnPadding
        );
        var spawnY = Phaser.Math.Between(
            camera.worldView.y - spawnPadding,
            camera.worldView.bottom + spawnPadding
        );

        // Move the tile to the new location
        tile.setPosition(spawnX, spawnY);
        tile.currentValue = tile.startValue;
        tile.textObject.setText(tile.currentValue);
        tile.textObject.setPosition(tile.x, tile.y);
    }
};