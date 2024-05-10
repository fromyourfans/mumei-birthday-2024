import Phaser from 'phaser';

class AmogusScene extends Phaser.Scene {
  create() {
    const MAP_BASE_SIZE = [8000, 6000];
    const MAP_SCALE = 1;
    const MAP_SIZE = [MAP_BASE_SIZE[0] * MAP_SCALE, MAP_BASE_SIZE[1] * MAP_SCALE];

    this.cameras.main.setBounds(0, 0, MAP_SIZE[0], MAP_SIZE[1]);
    this.physics.world.setBounds(0, 0, MAP_SIZE[0], MAP_SIZE[1]);

    this.udlr = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });

    this.UICam = this.cameras.add().setScroll(-1280, -720);
    this.uiContainer = this.add.container(-1280, -720, [
      this.debugX = this.add.text(10, 10, ''),
      this.debugY = this.add.text(100, 10, ''),
    ]);

    this.layers = this.add.group([
      this.l1 = this.add.image(0, 0, 'l1').setOrigin(0, 0).setScale(MAP_SCALE),
      this.l2 = this.add.image(0, 0, 'l2').setOrigin(0, 0).setScale(MAP_SCALE),
      this.add.image(0, 0, 'roof').setOrigin(0, 0).setScale(MAP_SCALE),
      this.add.image(0, 0, 'vignette').setOrigin(0, 0).setScale(MAP_SCALE),
    ]);

    this.player = this.physics.add.image(2100, 1990, 'sample');
    this.player.setDisplaySize(20, 20);
    this.player.setCollideWorldBounds(true);
    this.player.body.onOverlap = true;
    this.interact = this.add.rectangle(-100, -100, 120, 100, 0xff0000, 0);

    this.cameras.main.startFollow(this.player, true, 1, 1);
    this.cameraFollowing = true;

    // Global Collision
    const colAlpha = 0;
    const ground = this.physics.add.staticGroup();
    const MS = MAP_SCALE * 2;
    ground.addMultiple([
      this.add.rectangle(0, 0, 4000 * MS, 415 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(0, 2156 * MS, 4000 * MS, 843 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(0, 0, 465 * MS, 3000 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(3346 * MS, 0, 654 * MS, 3000 * MS, 0xff0000, colAlpha).setOrigin(0, 0),

      this.add.rectangle(465 * MS, 535 * MS, 989 * MS, 301 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(1606 * MS, 535 * MS, 538 * MS, 301 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(2234 * MS, 535 * MS, 1112 * MS, 301 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(2143 * MS, 776 * MS, 92 * MS, 59 * MS, 0xff0000, colAlpha).setOrigin(0, 0),

      this.add.rectangle(465 * MS, 1135 * MS, 270 * MS, 240 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(795 * MS, 1135 * MS, 120 * MS, 240 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(1216 * MS, 1135 * MS, 120 * MS, 240 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(1396 * MS, 1135 * MS, 1020 * MS, 240 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(2475 * MS, 1135 * MS, 120 * MS, 240 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(2895 * MS, 1135 * MS, 120 * MS, 240 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(3075 * MS, 1135 * MS, 270 * MS, 240 * MS, 0xff0000, colAlpha).setOrigin(0, 0),

      this.add.rectangle(465 * MS, 1705 * MS, 270 * MS, 120 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(795 * MS, 1705 * MS, 120 * MS, 120 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(1216 * MS, 1705 * MS, 120 * MS, 120 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(1396 * MS, 1705 * MS, 1020 * MS, 120 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(2475 * MS, 1705 * MS, 120 * MS, 120 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(2895 * MS, 1705 * MS, 120 * MS, 120 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
      this.add.rectangle(3075 * MS, 1705 * MS, 270 * MS, 120 * MS, 0xff0000, colAlpha).setOrigin(0, 0),
    ]);
    this.physics.add.collider(this.player, ground);

    // // G1 Collider
    // this.g1grp = this.physics.add.staticGroup();
    // this.g1grp.addMultiple([
    //   this.add.rectangle(915, 1135, 300, 240, 0xff00ff, 0).setOrigin(0, 0),
    //   this.add.rectangle(915, 1705, 300, 120, 0xff00ff, 0).setOrigin(0, 0),
    // ]);
    // this.g1col = this.physics.add.collider(this.player, this.g1grp);

    // // G2 Collider
    // this.g2grp = this.physics.add.staticGroup();
    // this.g2grp.addMultiple([
    //   this.add.rectangle(885, 1375, 30, 330, 0x0000ff, 0.5).setOrigin(0, 0).setData('floor', 2),
    //   this.add.rectangle(1215, 1375, 30, 330, 0x0000ff, 0.5).setOrigin(0, 0).setData('floor', 2),
    // ]);
    // this.g2col = this.physics.add.collider(this.player, this.g2grp);

    // // Ladder: L1
    // this.l1ladder = this.physics.add.staticGroup();
    // this.l1ladder.addMultiple([
    //   this.add.rectangle(735, 1115, 60, 20, 0x00ffff, 0.3).setOrigin(0, 0).setData('floor', 1),
    // ]);
    // this.physics.add.overlap(this.player, this.l1ladder);

    // // Ladder: L2
    // this.l2ladder = this.physics.add.staticGroup();
    // this.l2ladder.addMultiple([
    //   this.add.rectangle(735, 1375, 60, 20, 0x00ffff, 0.3).setOrigin(0, 0).setData('floor', 2),
    // ]);
    // this.physics.add.overlap(this.player, this.l2ladder);

    // // Trigger switch floors
    // this.physics.world.on('overlap', (gameObject1, gameObject2) => {
    //   const targetFloor = gameObject2.getData('floor');
    //   if (this.floor === targetFloor) return;
    //   if (targetFloor === 1) this.switchFloor1();
    //   else this.switchFloor2();
    // });

    // Project Game Objects
    const interacts = this.physics.add.staticGroup();
    const interactObjs = [];
    ['messages', 'mural', 'video', 'slideshow'].forEach((project, i) => {
      const eMessages = interacts.create(2400 + (i * 200), 1990, 'sample').setScale(0.3, 0.2).refreshBody();
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
    // this.switchFloor1();
  }

  update() {
    this.player.setVelocity(0);
    const SPEED = 1.1;

    // Keyboard X
    if (this.udlr.left.isDown || this.wasd.left.isDown) {
      this.player.setVelocityX(-350 * SPEED);
    } else if (this.udlr.right.isDown || this.wasd.right.isDown) {
      this.player.setVelocityX(350 * SPEED);
    }

    // Keyboard Y
    if (this.udlr.up.isDown || this.wasd.up.isDown) {
      this.player.setVelocityY(-300 * SPEED);
      this.player.setDepth(10000 + this.player.y);
    } else if (this.udlr.down.isDown || this.wasd.down.isDown) {
      this.player.setVelocityY(300 * SPEED);
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
