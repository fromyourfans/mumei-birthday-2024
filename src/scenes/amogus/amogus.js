import Phaser from 'phaser';

class AmogusScene extends Phaser.Scene {
  create() {
    const mapSize = [3000, 3000];

    const { width, height } = this.game.canvas;

    const bounds = [-width / 2, -height / 2, mapSize[0] + width, mapSize[1] + height];
    this.cameras.main.setBounds(bounds[0], bounds[1], bounds[2], bounds[3]);
    this.physics.world.setBounds(bounds[0], bounds[1], bounds[2], bounds[3]);

    this.udlr = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });

    const btnTxt = { color: '#000000', fixedWidth: 40, align: 'center', fontStyle: 'bold' };
    this.UICam = this.cameras.add().setScroll(-1280, -720);
    this.uiContainer = this.add.container(-1280, -720, [
      this.debugX = this.add.text(10, 10, ''),
      this.debugY = this.add.text(100, 10, ''),
      // All Layers
      this.add.circle(30, 100, 20, 0xffffff).setStrokeStyle(2, 0x000000)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => { this.layers.setVisible(true); }),
      this.add.text(  10, 100 - 8, 'ALL', btnTxt),
      // L1
      this.add.circle(30, 150, 20, 0xffffff).setStrokeStyle(2, 0x000000)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          if (this.l1.visible) return this.l1.setVisible(false);
          this.l1.setVisible(true);
        }),
      this.add.text(  10, 150 - 8, 'L1', btnTxt),
      // L2
      this.add.circle(30, 200, 20, 0xffffff).setStrokeStyle(2, 0x000000)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          if (this.l2.visible) return this.l2.setVisible(false);
          this.l2.setVisible(true);
        }),
      this.add.text(  10, 200 - 8, 'L2', btnTxt),
      // G1
      this.add.circle(30, 250, 20, 0xffffff).setStrokeStyle(2, 0x000000)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          if (this.g1.visible) return this.g1.setVisible(false);
          this.g1.setVisible(true);
        }),
      this.add.text(  10, 250 - 8, 'G1', btnTxt),
      // G2
      this.add.circle(30, 300, 20, 0xffffff).setStrokeStyle(2, 0x000000)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          if (this.g2.visible) return this.g2.setVisible(false);
          this.g2.setVisible(true);
        }),
      this.add.text(  10, 300 - 8, 'G2', btnTxt),
      // Collission Layer
      this.add.circle(30, 350, 20, 0xffffff).setStrokeStyle(2, 0x000000)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          if (this.cl.visible) return this.cl.setVisible(false);
          this.cl.setVisible(true);
        }),
      this.add.text(  10, 350 - 8, 'Col', btnTxt),
    ]);

    this.layers = this.add.group([
      this.l1 = this.add.image(0, 0, 'l1').setOrigin(0, 0).setScale(0.5),
      this.l2 = this.add.image(0, 0, 'l2').setOrigin(0, 0).setScale(0.5),
      this.add.image(0, 0, 'roof').setOrigin(0, 0).setScale(0.5),
      this.add.image(0, 0, 'vignette').setOrigin(0, 0).setScale(0.5),
    ]);

    this.player = this.physics.add.image(1260, 980, 'sample');
    this.player.setDisplaySize(20, 20);
    this.player.setCollideWorldBounds(true);
    this.player.body.onOverlap = true;
    this.interact = this.add.rectangle(-100, -100, 120, 100, 0xff0000, 0);

    this.cameras.main.startFollow(this.player, true, 1, 1);
    this.cameraFollowing = true;

    // Global Collision
    const ground = this.physics.add.staticGroup();
    ground.addMultiple([
      this.add.rectangle(0, 0, 4000, 415, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(0, 2156, 4000, 843, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(0, 0, 465, 3000, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(3346, 0, 654, 3000, 0xff0000, 0).setOrigin(0, 0),

      this.add.rectangle(465, 535, 989, 301, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(1606, 535, 538, 301, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(2234, 535, 1112, 301, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(2143, 776, 92, 59, 0xff0000, 0).setOrigin(0, 0),

      this.add.rectangle(465, 1135, 270, 240, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(795, 1135, 120, 240, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(1216, 1135, 120, 240, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(1396, 1135, 1020, 240, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(2475, 1135, 120, 240, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(2895, 1135, 120, 240, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(3075, 1135, 270, 240, 0xff0000, 0).setOrigin(0, 0),

      this.add.rectangle(465, 1705, 270, 120, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(795, 1705, 120, 120, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(1216, 1705, 120, 120, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(1396, 1705, 1020, 120, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(2475, 1705, 120, 120, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(2895, 1705, 120, 120, 0xff0000, 0).setOrigin(0, 0),
      this.add.rectangle(3075, 1705, 270, 120, 0xff0000, 0).setOrigin(0, 0),
    ]);
    this.physics.add.collider(this.player, ground);

    // G1 Collider
    this.g1grp = this.physics.add.staticGroup();
    this.g1grp.addMultiple([
      this.add.rectangle(915, 1135, 300, 240, 0xff00ff, 0).setOrigin(0, 0),
      this.add.rectangle(915, 1705, 300, 120, 0xff00ff, 0).setOrigin(0, 0),
    ]);
    this.g1col = this.physics.add.collider(this.player, this.g1grp);

    // G2 Collider
    this.g2grp = this.physics.add.staticGroup();
    this.g2grp.addMultiple([
      this.add.rectangle(885, 1375, 30, 330, 0x0000ff, 0.5).setOrigin(0, 0).setData('floor', 2),
      this.add.rectangle(1215, 1375, 30, 330, 0x0000ff, 0.5).setOrigin(0, 0).setData('floor', 2),
    ]);
    this.g2col = this.physics.add.collider(this.player, this.g2grp);

    // Ladder: L1
    this.l1ladder = this.physics.add.staticGroup();
    this.l1ladder.addMultiple([
      this.add.rectangle(735, 1115, 60, 20, 0x00ffff, 0.3).setOrigin(0, 0).setData('floor', 1),
    ]);
    this.physics.add.overlap(this.player, this.l1ladder);

    // Ladder: L2
    this.l2ladder = this.physics.add.staticGroup();
    this.l2ladder.addMultiple([
      this.add.rectangle(735, 1375, 60, 20, 0x00ffff, 0.3).setOrigin(0, 0).setData('floor', 2),
    ]);
    this.physics.add.overlap(this.player, this.l2ladder);

    // Trigger switch floors
    this.physics.world.on('overlap', (gameObject1, gameObject2) => {
      const targetFloor = gameObject2.getData('floor');
      if (this.floor === targetFloor) return;
      if (targetFloor === 1) this.switchFloor1();
      else this.switchFloor2();
    });

    // Project Game Objects
    const interacts = this.physics.add.staticGroup();
    const interactObjs = [];
    ['messages', 'mural', 'video', 'slideshow'].forEach((project, i) => {
      const eMessages = interacts.create(1680 + (i * 200), 950, 'sample').setScale(0.3, 0.2).refreshBody();
      eMessages.interact = () => { this.game.vue.openProject({ key: project }); };
      interactObjs.push(eMessages);
    })
    this.physics.add.collider(this.player, interacts);

    // Interact Projects with Keyboard
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

    // Inital floor
    this.switchFloor1();
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

    // Debug
    this.debugX.setText(Math.round(this.player.x));
    this.debugY.setText(Math.round(this.player.y));
  }

  switchFloor1() {
    console.log('switchFloor1()');
    this.floor = 1;
    this.l2.setVisible(true);
    this.g1col.active = false;
    this.g1grp.setVisible(false);
    this.g2col.active = true;
    this.g2grp.setVisible(true);
  }

  switchFloor2() {
    console.log('switchFloor2()');
    this.floor = 2;
    this.l2.setVisible(false);
    this.g1col.active = true;
    this.g1grp.setVisible(true);
    this.g2col.active = false;
    this.g2grp.setVisible(false);
  }
}

export default AmogusScene;
