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
    };
  
    var game = new Phaser.Game(config);
    var tileSize = 80;
    var gameTiles = 10;
    var tilesArray = [];
    var tileGroup;
  
    function preload() {
      this.load.image('tile', 'assets/tile.png');
    }
  
    function create() {
      tileGroup = this.add.group();
      for (var i = 0; i < gameTiles; i++) {
        var tile = this.add.image(
          Phaser.Math.Between(100, this.sys.game.config.width - 100),
          Phaser.Math.Between(100, this.sys.game.config.height - 100),
          'tile'
        );
        tile.setOrigin(0.5);
        tile.startValue = i;
        tile.currentValue = i;
  
        // Enable dragging
        tile.setInteractive({ draggable: true });
        this.input.setDraggable(tile);
  
        var text = this.add.text(0, 0, i.toString(), {
          font: 'bold 32px Arial',
          align: 'center',
        });
        text.setOrigin(0.5);
        tile.addChild = text; // Phaser 3 doesn't support direct addChild, so this is a workaround
        tile.textObject = text; // Reference to text object
  
        tileGroup.add(tile);
        tilesArray.push(tile);
      }
  
      // Handle dragging events
      this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });
    }
  
    function update() {
      for (var i = 0; i < tileGroup.getLength(); i++) {
        var tile = tileGroup.getChildren()[i];
        tile.currentValue = tile.startValue;
        tile.textObject.setText(tile.currentValue);
      }
  
      for (i = tileGroup.getLength() - 1; i >= 0; i--) {
        for (var j = i - 1; j >= 0; j--) {
          var tileA = tileGroup.getChildren()[i];
          var tileB = tileGroup.getChildren()[j];
          if (Phaser.Geom.Intersects.RectangleToRectangle(tileA.getBounds(), tileB.getBounds())) {
            tileB.currentValue += tileA.currentValue;
            tileB.textObject.setText(tileB.currentValue);
          }
        }
      }
    }
  };
  