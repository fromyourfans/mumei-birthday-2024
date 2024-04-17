import Phaser from 'phaser';

class IndexScene extends Phaser.Scene {
  preload() {
  }

  create() {
    const { width, height } = this.game.canvas;
    const background = this.add.graphics();
    background.fillStyle(0xfff7f9);
    background.fillRect(0, 0, width, height);
  }
}

export default IndexScene;
