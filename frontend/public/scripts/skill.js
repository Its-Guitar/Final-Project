import { skillCount as skillUse } from './main.js';

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
    update: update
  }
};

var game = new Phaser.Game(config);
var score;
var scaleFactor;
var centerX;
var centerY;
var image1, image2, image3;
var text1, text2, text3;

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

  centerX = this.cameras.main.centerX;
  centerY = this.cameras.main.centerY;

  var canvas = document.querySelector('canvas');
  var canvasRect = canvas.getBoundingClientRect();

  scaleFactor = Math.min(canvasRect.width / 800, canvasRect.height / 600);

  image1 = this.add.image(0, 0, 'image1').setVisible(false);
  image1.setScale(scaleFactor);
  image1.setPosition(centerX, centerY);
  image2 = this.add.image(0, 0, 'image2').setVisible(false);
  image2.setScale(scaleFactor);
  image2.setPosition(centerX, centerY);
  image3 = this.add.image(0, 0, 'image3').setVisible(false);
  image3.setScale(scaleFactor);
  image3.setPosition(centerX, centerY);

  text1 = this.add.text(0, 0, `Click 00 times\nto activate this skill!!`,
    {
      fontFamily: 'Georgia',
      fontSize: '24px',
      color: '#ff0000',
      fontWeight: 'bold',
      align: 'center',
      backgroundColor: '#ffffff',
    }).setVisible(false);
  text1.setScale(scaleFactor);
  text1.setPosition(centerX - (text1.width / 2), centerY - (text1.height / 2));


  text2 = this.add.text(0, 0, `Click 00 times\nto activate this skill!!`,
    {
      fontFamily: 'Georgia',
      fontSize: '24px',
      color: '#ff0000',
      fontWeight: 'bold',
      align: 'center',
      backgroundColor: '#ffffff',
    }).setVisible(false);
  text2.setScale(scaleFactor);
  text2.setPosition(centerX - (text2.width / 2), centerY - (text2.height / 2));

  text3 = this.add.text(0, 0, `Click 00 times\nto activate this skill!!`,
    {
      fontFamily: 'Georgia',
      fontSize: '24px',
      color: '#ff0000',
      fontWeight: 'bold',
      align: 'center',
      backgroundColor: '#ffffff',
    }).setVisible(false);
  text3.setScale(scaleFactor);  
  text3.setPosition(centerX - (text3.width / 2), centerY - (text3.height / 2));


  var button1 = document.getElementById(`skill1Button`);
  button1.addEventListener('click', function () {
    if (thisTa == 1) {
      score = scoreTa1;
    } else if (thisTa == 2) {
      score = scoreTa2;
    }
    if (skillUse.value >= 10) {
      score.value += 50;
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
    } else {
      text1.setVisible(true);
      this.time.delayedCall(2000, function () {
        text1.setVisible(false);
      }, [], this);
    }
  }.bind(this));

  var button2 = document.getElementById(`skill2Button`);
  button2.addEventListener('click', function () {
    if (thisTa == 1) {
      score = scoreTa1;
    } else if (thisTa == 2) {
      score = scoreTa2;
    }
    if (skillUse.value >= 50) {
      score.value -= 50;
      skillUse.value -= 50;

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

    } else {
      text2.setVisible(true);
      this.time.delayedCall(2000, function () {
        text2.setVisible(false);
      }, [], this);
    }
  }.bind(this));

  var button3 = document.getElementById(`skill3Button`);
  button3.addEventListener('click', function () {
    if (skillUse.value >= 100) {

      image3.setVisible(true);

      skillUse.value -= 100;

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

    } else {
      text3.setVisible(true);
      this.time.delayedCall(2000, function () {
        text3.setVisible(false);
      }, [], this);
    }
  }.bind(this));
}

function update() {
  text1.text = `Click ${Math.max(10 - skillUse.value, 0)} times\nto activate this skill!!`;

  text2.text = `Click ${Math.max(50 - skillUse.value, 0)} times\nto activate this skill!!`;

  text3.text = `Click ${Math.max(100 - skillUse.value, 0)} times\nto activate this skill!!`;
}