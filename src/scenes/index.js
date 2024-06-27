import Phaser from 'phaser';

import AmogusScene from './amogus/amogus';

import SamplePng from '../assets/sample.png';
import MapL1Png from '../assets/map/l1.png';
import MapL1NPng from '../assets/map/l1_n.png';
import MapBridgePng from '../assets/map/bridge.png';
import MapBridgeNPng from '../assets/map/bridge_n.png';
import MapFencePng from '../assets/map/fence.png';
import MapFenceNPng from '../assets/map/fence_n.png';
import MapSuburbPng from '../assets/map/suburb.png';
import MapSuburbNPng from '../assets/map/suburb_n.png';
import MapRoofPng from '../assets/map/roof.png';
import MumeiPng from '../assets/mumei.png';

import hoomJson from '../assets/hooman.json?url';
import hoomPng from '../assets/hooman.png';

import messages from '../assets/messages.json';

class IndexScene extends Phaser.Scene {
  preload() {
    this.input.topOnly = true;

    const { width, height } = this.game.canvas;
    const background = this.add.graphics();
    background.fillStyle(0xede5dd);
    background.fillRect(0, 0, width, height);

    // Google Fonts
    this.load.rexWebFont({
      google: { families: ['Pacifico', 'Zen Maru Gothic'] },
      testString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890 !@#$%^&*()-_=+[{]}\\|;:\'",<.>/? 人類',
    });

    this.load.image('sample', SamplePng);
    this.load.image('l1', [MapL1Png, MapL1NPng]);
    this.load.image('bridge', [MapBridgePng, MapBridgeNPng]);
    this.load.image('fence', [MapFencePng, MapFenceNPng]);
    this.load.image('suburb', [MapSuburbPng, MapSuburbNPng]);
    this.load.image('roof', MapRoofPng);

    this.load.spritesheet('mumei', MumeiPng, {
      frameWidth: 247, frameHeight: 247, margin: 2, spacing: 4,
    });

    this.load.rexAwait(async (success) => {
      this.game.registry.set('messages', messages.messages)
      success();
    });

    this.load.atlas('hoomans', hoomPng, hoomJson);

    // Loading Bar
    this.loadingText = this.add.text(0, 550, 'Moomin\'...', {
      fontFamily: 'Arial',
      fontStyle: 'bold',
      fontSize: 20,
      align: 'center',
      fixedWidth: width,
      color: '#964B00',
    });
    this.progressBox = this.add.rectangle(240, 530, 800, 14, 0x964B00).setOrigin(0);
    this.progressBar = this.add.rectangle(242, 532, 1, 10, 0xffffff).setOrigin(0);
    this.load.on('progress', (progress) => {
      this.progressBar.setDisplaySize(792 * progress, 10);
    });
  }

  makeAnimation(sprite, key, start, end, repeat = -1, frameRate = 20) {
    this.anims.create({
      key,
      frames: this.anims.generateFrameNumbers(sprite, { start, end }),
      frameRate,
      repeat,
    });
  }

  create() {
    this.loadingText.setVisible(false);
    this.progressBox.setVisible(false);
    this.progressBar.setVisible(false);

    this.scene.add('amogus', AmogusScene);

    this.makeAnimation('mumei', 'left-idle', 0, 0, 1, 0);
    this.makeAnimation('mumei', 'left-walk', 1, 12);
    this.makeAnimation('mumei', 'right-idle', 13, 13, 1, 0);
    this.makeAnimation('mumei', 'right-walk', 14, 25);

    this.cameras.main.fadeOut(1000);
    this.time.addEvent({
      delay: 1000,
      callback: function proceed() {
        this.scene.start('amogus');
      },
      callbackScope: this,
    });
  }
}

export default IndexScene;
