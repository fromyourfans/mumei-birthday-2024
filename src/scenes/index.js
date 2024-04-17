import Phaser from 'phaser';

class IndexScene extends Phaser.Scene {
  preload() {
    const { width, height } = this.game.canvas;
    const background = this.add.graphics();
    background.fillStyle(0xede5dd);
    background.fillRect(0, 0, width, height);

    // Google Fonts
    this.load.rexWebFont({
      google: { families: ['Pacifico'] },
      testString: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890 !@#$%^&*()-_=+[{]}\\|;:\'",<.>/?',
    });
  }

  create() {
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
          this.game.vue.openProject({ key: project });
        });
    });
  }
}

export default IndexScene;
