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
  this.load.image('image1', '../resources/skillImage/skillOne.png');
  this.load.image('image2', '../resources/skillImage/skillTwo.png');
  this.load.image('image3', '../resources/skillImage/skillThree.png');

  this.load.audio('sound1', '../resources/skillSound/skillOne.mp3');
  this.load.audio('sound2_1', '../resources/skillSound/skillTwo_1.mp3');
  this.load.audio('sound2_2', '../resources/skillSound/skillTwo_2.mp3');
  this.load.audio('sound3', '../resources/skillSound/skillThree.mp3');
}

function create() {
  var images = [
    'image1',
    'image2',
    'image3'
  ];
  var sounds = [
    'sound1',
    ['sound2_1', 'sound2_2'],
    'sound3'
  ];

  images.forEach((imageName, index) => {
    var image = this.add.image(0, 0, imageName).setVisible(false);

    var button = document.getElementById(`skill${index + 1}Button`);

    button.addEventListener('click', function () {
      image.setVisible(true);

      if (Array.isArray(sounds[index])) {
        sounds[index].forEach((soundKey, soundIndex) => {
          if (soundIndex === 0) {
            var sound = this.sound.add(soundKey);
            sound.play();
          } else {
            setTimeout(() => {
              var sound = this.sound.add(soundKey);
              sound.play();
            }, 1000);
          }
        });
      } else {
        var sound = this.sound.add(sounds[index]);
        sound.play();
      }

      this.tweens.add({
        targets: image,
        alpha: 1,
        duration: 2000,
        ease: 'Linear',
        onComplete: function () {
          image.setVisible(false);
        }
      });
    }.bind(this));
  });

  var centerX = this.cameras.main.centerX;
  var centerY = this.cameras.main.centerY;
  images.forEach((_, index) => {
    var image = this.children.list.find(child => child.texture.key === `image${index + 1}`);
    image.setPosition(centerX, centerY);
  });
}