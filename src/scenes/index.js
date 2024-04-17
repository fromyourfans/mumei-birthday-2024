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
  }
}

export default IndexScene;
