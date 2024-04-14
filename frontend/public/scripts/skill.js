import { skillCount1 as skillTa1 } from './main.js';
import { skillCount2 as skillTa2 } from './main.js';

import { score1 as scoreTa1 } from './main.js';
import { score2 as scoreTa2 } from './main.js';

import { whichTa as thisTa } from './main.js';

import { activateBonus } from './main.js';


var config = {
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',
  parent: 'game-container',
  transparent: true,
  scene: {
    preload: preload,
    create: create,
  }
};

var skillUse;
var score;

var game = new Phaser.Game(config);

game.scale.pageAlignHorizontally = true;
game.scale.pageAlignVertically = true;
game.scale.refresh();

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

  var image1 = this.add.image(0, 0, 'image1').setVisible(false);
  var image2 = this.add.image(0, 0, 'image2').setVisible(false);
  var image3 = this.add.image(0, -1000, 'image3').setVisible(false);

  var button1 = document.getElementById(`skill1Button`);
  button1.addEventListener('click', function () {
    if (thisTa == 1) {
      skillUse = skillTa1;
      score = scoreTa1;
    } else if (thisTa == 2) {
      skillUse = skillTa2;
      score = scoreTa2;
    }
    if (skillUse.value >= 10) {
      score.value += 200;
      skillUse.value -= 10;
      image1.setVisible(true);

      var sound1 = this.sound.add('sound1');
      sound1.play();

      this.tweens.add({
        targets: image1,
        alpha: 1,
        duration: 2000,
        ease: 'Linear',
        onComplete: function () {
          image1.setVisible(false);
        }
      });
      console.log(score.value);
      console.log(skillUse.value);
    } else {
      console.log("Button 1 cannot be used. your have to click " + (20 - skillUse.value) + " click to active this skill")
    }
  }.bind(this));

  var button2 = document.getElementById(`skill2Button`);
  button2.addEventListener('click', function () {
    if (thisTa == 1) {
      skillUse = skillTa1;
      score = scoreTa1;
    } else if (thisTa == 2) {
      skillUse = skillTa2;
      score = scoreTa2;
    }
    if (skillUse.value >= 20) {
      score.value -= 100;
      skillUse.value -= 20;

      image2.setVisible(true);

      var sound2_1 = this.sound.add('sound2_1');
      sound2_1.play();
      setTimeout(() => {
        var sound2_2 = this.sound.add('sound2_2');
        sound2_2.play();
      }, 1000);

      this.tweens.add({
        targets: image2,
        alpha: 1,
        duration: 2000,
        ease: 'Linear',
        onComplete: function () {
          image2.setVisible(false);
        }
      });
      console.log(score.value);
      console.log(skillUse.value);
    } else {
      console.log("Button 2 cannot be used. your have to click " + (50 - skillUse.value) + " click to active this skill")
    }
  }.bind(this));

  var button3 = document.getElementById(`skill3Button`);
  button3.addEventListener('click', function () {
    if (thisTa == 1) {
      skillUse = skillTa1;
    } else if (thisTa == 2) {
      skillUse = skillTa2;
    }
    if (skillUse.value >= 30) {

      image3.setVisible(true);

      skillUse.value -= 30;

      var sound3 = this.sound.add('sound3');
      sound3.play();

      this.tweens.add({
        targets: image3,
        alpha: 1,
        duration: 2000,
        ease: 'Linear',
        onComplete: function () {
          image3.setVisible(false);
        }
      });

      activateBonus();
      console.log(score.value);
      console.log(skillUse.value);

    } else {
      console.log("Button 1 cannot be used. your have to click " + (60 - skillUse.value) + " click to active this skill")
    }
  }.bind(this));

  var centerX = this.cameras.main.centerX;
  var centerY = this.cameras.main.centerY;
  images.forEach((_, index) => {
    var image = this.children.list.find(child => child.texture.key === `image${index + 1}`);
    image.setPosition(centerX, centerY);
  });
}