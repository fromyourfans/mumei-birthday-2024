import Phaser from 'phaser';

class AmogusScene extends Phaser.Scene {
  create() {
    const mapSize = [3000, 3000];

    const { width, height } = this.game.canvas;
    this.add.graphics({ x: -width / 2, y: -height / 2 })
      .fillGradientStyle(0xffffff, 0xff5555, 0x555555, 0x55ff55)
      .fillRect(0, 0, mapSize[0] + width, mapSize[1] + height);

    const bounds = [-width / 2, -height / 2, mapSize[0] + width, mapSize[1] + height];
    this.cameras.main.setBounds(bounds[0], bounds[1], bounds[2], bounds[3]);
    this.physics.world.setBounds(bounds[0], bounds[1], bounds[2], bounds[3]);

    this.udlr = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });

    this.player = this.physics.add.image(width / 2, height / 2, 'sample');
    this.player.setDisplaySize(50, 50);
    this.player.setCollideWorldBounds(true);
    this.interact = this.add.rectangle(-100, -100, 120, 100, 0xff0000, 0.1);

    this.cameras.main.startFollow(this.player, true, 1, 1);
    this.cameraFollowing = true;

    const ground = this.physics.add.staticGroup();
    ground.create(400, 568, 'sample').setScale(2).refreshBody();
    ground.create(450, 400, 'sample').setScale(0.4).refreshBody();
    ground.create(0, 0, 'sample').setScale(5, 0.3).refreshBody();
    this.physics.add.collider(this.player, ground);

    const interacts = this.physics.add.staticGroup();
    const interactObjs = [];
    ['messages', 'mural', 'video', 'slideshow'].forEach((project, i) => {
      const eMessages = interacts.create(600 + (i * 200), 200, 'sample').setScale(0.3, 0.2).refreshBody();
      eMessages.interact = () => { this.game.vue.openProject({ key: project }); };
      interactObjs.push(eMessages);
    })
    this.physics.add.collider(this.player, interacts);

    this.interactTarget = null;
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.keyE.on('down', () => {
      const boundsA = this.interact.getBounds();
      let target = null;
      interactObjs.forEach((obj) => {
        const boundsB = obj.getBounds();
        const overlap = Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
        if (overlap) target = obj;
      });
      if (target) target.interact();
    });
  }

  update() {
    this.player.setVelocity(0);

    // Keyboard X
    if (this.udlr.left.isDown || this.wasd.left.isDown) {
      this.player.setVelocityX(-350);
    } else if (this.udlr.right.isDown || this.wasd.right.isDown) {
      this.player.setVelocityX(350);
    }

    // Keyboard Y
    if (this.udlr.up.isDown || this.wasd.up.isDown) {
      this.player.setVelocityY(-300);
      this.player.setDepth(10000 + this.player.y);
    } else if (this.udlr.down.isDown || this.wasd.down.isDown) {
      this.player.setVelocityY(300);
      this.player.setDepth(10000 + this.player.y);
    }

    // Interact hitbox
    this.interact.x = this.player.x;
    this.interact.y = this.player.y;
  }
}

export default AmogusScene;
