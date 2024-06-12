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
      frameWidth: 250, frameHeight: 250, margin: 2, spacing: 4,
    });
  }

  create() {
    this.scene.add('amogus', AmogusScene);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('mumei', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0,
    });
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('mumei', { start: 1, end: 13 }),
      frameRate: 20,
      repeat: -1,
    });

    const { width, height } = this.game.canvas;
    this.add.text(0, height * 0.45, 'Happy Bithday Nanashi Mumei!', {
      fontFamily: 'Pacifico',
      fontSize: 50,
      align: 'center',
      fixedWidth: width,
      color: '#964B00',
      stroke: '#f3c698',
      strokeThickness: 5,
    });

    ['messages', 'mural', 'video', 'slideshow'].forEach((project, i) => {
      this.add.rectangle(410 + (i * 120), 500, 100, 100, 0x883333)
        .setOrigin(0, 0)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          this.pauseFilter.setVisible(true);
          this.game.vue.openProject({ key: project });
        });
      this.add.text(410 + (i * 120), 540, project, {
        fontFamily: 'Zen Maru Gothic',
        fontStyle: 'bold',
        fontSize: 18,
        align: 'center',
        fixedWidth: 100,
        color: '#f0f0f0',
        stroke: '#1a1a1a',
        strokeThickness: 3,
      });
    });

    this.pauseFilter = this.add.container(0, 0, [
      this.add.rectangle(0, 0, width, height, 0x000000, 0.85)
        .setOrigin(0, 0)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          const projectOpen = Object.values(this.game.vue.show).reduce((c, v) => c || v, false);
          if (!projectOpen) this.pauseFilter.setVisible(false);
        }),
      this.add.text(0, height * 0.75, 'Click to resume game', {
        fontFamily: 'Zen Maru Gothic',
        fontStyle: 'bold',
        fontSize: 30,
        align: 'center',
        fixedWidth: width,
        color: '#f0f0f0',
        stroke: '#1a1a1a',
        strokeThickness: 3,
      }),
    ]).setVisible(false);


    this.add.rectangle(1000, 500, 100, 100, 0x883333)
      .setOrigin(0, 0)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.scene.start('amogus');
      });
    this.add.text(1000, 540, 'START', {
      fontFamily: 'Zen Maru Gothic',
      fontStyle: 'bold',
      fontSize: 18,
      align: 'center',
      fixedWidth: 100,
      color: '#f0f0f0',
      stroke: '#1a1a1a',
      strokeThickness: 3,
    });
  }
}

export default IndexScene;
