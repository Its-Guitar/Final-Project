var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  parent: 'game-container',
  transparent: true,
  scene: {
    preload: preload,
    create: create
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image('myImage', '../resources/kiss.png');
}

function create() {
  var image = this.add.image(0, 0, 'myImage').setVisible(false);

  var button = document.getElementById('skillOneButton');
  button.addEventListener('click', function () {
    image.setVisible(true);
    setTimeout(function () {
      image.setVisible(false);
    }, 2000);
  });

  var centerX = this.cameras.main.centerX;
  var centerY = this.cameras.main.centerY;
  image.setPosition(centerX, centerY);
}