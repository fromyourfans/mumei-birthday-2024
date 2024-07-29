import Phaser from 'phaser';

import hoomJson from '../../assets/hooman.json';
import decorJson from '../../assets/decor.json';
import npcJson from '../../assets/npc.json';

const PLAYER_SCALE = 0.6;

const HOOMAN_FRAMES = Object.keys(hoomJson.frames);
const DECOR_FRAMES = Object.keys(decorJson.frames);
const NPC_FRAMES = Object.keys(npcJson.frames);
console.log('%cDECOR_FRAMES\n%O', 'color:red;font-size:20px;', DECOR_FRAMES.join('\n'));
console.log('%cNPC_FRAMES\n%O', 'color:red;font-size:20px;', NPC_FRAMES.join('\n'));

class AmogusScene extends Phaser.Scene {
  create() {
    const MAP_BASE_SIZE = [8000, 6000];
    const MAP_SCALE = 1;
    const MAP_SIZE = [MAP_BASE_SIZE[0] * MAP_SCALE, MAP_BASE_SIZE[1] * MAP_SCALE];

    this.preAnimolQuests = {
      talk: false,
      messages: false,
      mural: false,
      gallery: false,
      slideshow: false,
    };

    this.postAnimolQuests = {
      animol: false,
      party: false,
    };

    if (localStorage.getItem('quest_talk')) this.preAnimolQuests.talk = true;
    if (localStorage.getItem('quest_messages')) this.preAnimolQuests.messages = true;
    if (localStorage.getItem('quest_mural')) this.preAnimolQuests.mural = true;
    if (localStorage.getItem('quest_gallery')) this.preAnimolQuests.gallery = true;
    if (localStorage.getItem('quest_slideshow')) this.preAnimolQuests.slideshow = true;
    if (localStorage.getItem('quest_animol')) {
      this.postAnimolQuests.animol = true;
      this.spawnAnimol();
    } else {
      this.checkAnimolGoal();
    }
    if (localStorage.getItem('quest_party')) this.postAnimolQuests.party = true;


    this.cameras.main.setBounds(840, 0, MAP_SIZE[0] - 2000, MAP_SIZE[1]);
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
      this.bridge1 = this.add.image(885 * 2, 1113 * 2, 'bridge').setOrigin(0, 0).setScale(MAP_SCALE).setDepth(10001),
      this.bridge2 = this.add.image(2566 * 2, 1113 * 2, 'bridge').setOrigin(0, 0).setScale(MAP_SCALE).setDepth(10001),
      this.add.image(459 * 2, 0, 'roof').setOrigin(0, 0).setScale(MAP_SCALE).setDepth(20001).setTint(0x394E91),
      this.fence1 = this.add.image(899 * 2, 993 * 2, 'fence').setOrigin(0, 0).setScale(MAP_SCALE, MAP_SCALE + 0.035).setDepth(20004),
      this.fence2 = this.add.image(2579 * 2, 993 * 2, 'fence').setOrigin(0, 0).setScale(MAP_SCALE, MAP_SCALE + 0.035).setDepth(20004),
      this.suburb = this.add.image(500 * 2, 1913 * 2, 'suburb').setOrigin(0, 0).setScale(MAP_SCALE).setDepth(20003).setTint(0x394E91).setScrollFactor(1.1, 1),
      this.add.rectangle(0, 0, 930, MAP_SIZE[1], 0x000000).setOrigin(0, 0).setScale(MAP_SCALE).setDepth(20004),
      this.add.graphics({ x: 930, y: 0 })
        .fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 1, 0, 1, 0)
        .fillRect(0, 0, 200, MAP_SIZE[1])
        .setDepth(20004),
      this.add.graphics({ x: 6490, y: 0 })
        .fillGradientStyle(0x000000, 0x000000, 0x000000, 0x000000, 0, 1, 0, 1)
        .fillRect(0, 0, 200, MAP_SIZE[1])
        .setDepth(20004),
      this.add.rectangle(6690, 0, MAP_SIZE[0] - 6690, MAP_SIZE[1], 0x000000).setOrigin(0, 0).setScale(MAP_SCALE).setDepth(20004),
    ]);

    this.player = this.physics.add.image(1150, 1970, 'sample');
    this.player.setDisplaySize(50, 10).setOrigin(0.5, 1).setTintFill(0xff0000).setAlpha(0);
    this.player.setCollideWorldBounds(true);
    this.player.body.onOverlap = true;
    this.interact = this.add.rectangle(-100, -100, 120, 100, 0xff0000, 0);

    this.walkDir = 'right';
    this.mumSpine = this.physics.add.sprite(2100, 1990, 'mumei')
      .setScale(PLAYER_SCALE).setOrigin(0.5, 0.96).play('right-idle');

    this.cameras.main.startFollow(this.player, true, 1, 1);
    this.cameraFollowing = true;

    // Lighting
    this.l1.setPipeline('Light2D');
    this.bridge1.setPipeline('Light2D');
    this.bridge2.setPipeline('Light2D');
    this.fence1.setPipeline('Light2D');
    this.fence2.setPipeline('Light2D');
    this.mumLamp1 = this.lights.addLight(this.player.x, this.player.y, 300, 0xffffff, 0.4); // 0xE5D145
    this.mumLamp2 = this.lights.addLight(this.player.x, this.player.y, 500, 0xffffff, 0.7); // 0xE5D145
    this.mumLamp3 = this.lights.addLight(this.player.x, this.player.y, 700, 0xE5D145, 1); // 0xE5D145
    this.lights.enable().setAmbientColor(0x394E91);

    // Global Collision
    const colAlpha = 0;
    const ground = this.physics.add.staticGroup();
    this.ground = ground;
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

    // G1 Collider
    this.g1grp = this.physics.add.staticGroup();
    this.g1grp.addMultiple([
      this.add.rectangle(1830 * MAP_SCALE, 2270 * MAP_SCALE, 600 * MAP_SCALE, 480 * MAP_SCALE, 0xff00ff, colAlpha).setOrigin(0, 0),
      this.add.rectangle(1830 * MAP_SCALE, 3410 * MAP_SCALE, 600 * MAP_SCALE, 240 * MAP_SCALE, 0xff00ff, colAlpha).setOrigin(0, 0),
      this.add.rectangle(5190 * MAP_SCALE, 2270 * MAP_SCALE, 600 * MAP_SCALE, 480 * MAP_SCALE, 0xff00ff, colAlpha).setOrigin(0, 0),
      this.add.rectangle(5190 * MAP_SCALE, 3410 * MAP_SCALE, 600 * MAP_SCALE, 240 * MAP_SCALE, 0xff00ff, colAlpha).setOrigin(0, 0),
    ]);
    this.g1col = this.physics.add.collider(this.player, this.g1grp);

    // G2 Collider
    this.g2grp = this.physics.add.staticGroup();
    this.g2grp.addMultiple([
      this.add.rectangle(1770 * MAP_SCALE, 2750 * MAP_SCALE, 60 * MAP_SCALE, 660 * MAP_SCALE, 0x0000ff, colAlpha).setOrigin(0, 0).setData('floor', 2),
      this.add.rectangle(2430 * MAP_SCALE, 2750 * MAP_SCALE, 60 * MAP_SCALE, 660 * MAP_SCALE, 0x0000ff, colAlpha).setOrigin(0, 0).setData('floor', 2),
      this.add.rectangle(5130 * MAP_SCALE, 2750 * MAP_SCALE, 60 * MAP_SCALE, 660 * MAP_SCALE, 0x0000ff, colAlpha).setOrigin(0, 0).setData('floor', 2),
      this.add.rectangle(5790 * MAP_SCALE, 2750 * MAP_SCALE, 60 * MAP_SCALE, 660 * MAP_SCALE, 0x0000ff, colAlpha).setOrigin(0, 0).setData('floor', 2),
    ]);
    this.g2col = this.physics.add.collider(this.player, this.g2grp);

    // G3 Collider
    this.g3a = this.add.rectangle(1700 * MAP_SCALE, 2750 * MAP_SCALE, 860 * MAP_SCALE, 660 * MAP_SCALE, 0x00ffff, colAlpha).setOrigin(0, 0);
    this.g3b = this.add.rectangle(5060 * MAP_SCALE, 2750 * MAP_SCALE, 860 * MAP_SCALE, 660 * MAP_SCALE, 0x00ffff, colAlpha).setOrigin(0, 0);

    // Ladder: L1
    const ladAlpha = 0;
    this.l1ladder = this.physics.add.staticGroup();
    this.l1ladder.addMultiple([
      this.add.rectangle(1470 * MAP_SCALE, 2230 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 1),
      this.add.rectangle(2670 * MAP_SCALE, 2230 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 1),
      this.add.rectangle(4830 * MAP_SCALE, 2230 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 1),
      this.add.rectangle(6030 * MAP_SCALE, 2230 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 1),
      this.add.rectangle(1470 * MAP_SCALE, 3650 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 1),
      this.add.rectangle(2670 * MAP_SCALE, 3650 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 1),
      this.add.rectangle(4830 * MAP_SCALE, 3650 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 1),
      this.add.rectangle(6030 * MAP_SCALE, 3650 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 1),
    ]);
    this.physics.add.overlap(this.player, this.l1ladder);

    // Ladder: L2
    this.l2ladder = this.physics.add.staticGroup();
    this.l2ladder.addMultiple([
      this.add.rectangle(1470 * MAP_SCALE, 2750 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 2),
      this.add.rectangle(2670 * MAP_SCALE, 2750 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 2),
      this.add.rectangle(4830 * MAP_SCALE, 2750 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 2),
      this.add.rectangle(6030 * MAP_SCALE, 2750 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 2),
      this.add.rectangle(1470 * MAP_SCALE, 3370 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 2),
      this.add.rectangle(2670 * MAP_SCALE, 3370 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 2),
      this.add.rectangle(4830 * MAP_SCALE, 3370 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 2),
      this.add.rectangle(6030 * MAP_SCALE, 3370 * MAP_SCALE, 120 * MAP_SCALE, 40 * MAP_SCALE, 0x66ff66, ladAlpha).setOrigin(0, 0).setData('floor', 2),
    ]);
    this.physics.add.overlap(this.player, this.l2ladder);

    // Trigger switch floors
    this.physics.world.on('overlap', (gameObject1, gameObject2) => {
      const targetFloor = gameObject2.getData('floor');
      const targetBridge = gameObject2.getData('bridge');
      if (targetFloor) {
        if (this.floor === targetFloor) return;
        if (targetFloor === 1) this.switchFloor1();
        else this.switchFloor2();
      } else if (targetBridge && this.l2.visible) {
        // this.l2.setVisible(false);
      }
    });

    // Project Game Objects
    const interacts = this.physics.add.staticGroup();
    const interactObjs = [];
    // 1900 2500 aggieboard / spray cans
    (() => {
      const obj = this.add.image(2150, 2740, 'sample').setOrigin(0.5, 1).setScale(2, 1.3).setDepth(10000);
      obj.interact = () => {
        if (this.floor == 1) return;
        this.game.vue.openProject({ key: 'mural' });
        this.game.vue.doneQuest('mural');
        this.preAnimolQuests.mural = true;
        this.checkAnimolGoal();
      };
      interactObjs.push(obj);
    })();
    // 5220 2750 messageboard / locks and knots
    (() => {
      const obj = interacts.create(5220, 2800, 'sample').setOrigin(1, 1).setScale(0.2, 1).setDepth(10000 + 2800).refreshBody();
      obj.interact = () => {
        if (this.floor == 2) return;
        this.game.vue.openProject({ key: 'messages' });
        this.game.vue.doneQuest('messages');
        this.preAnimolQuests.messages = true;
        this.checkAnimolGoal();
      };
      this.messagesObj = obj;
      interactObjs.push(obj);
    })();
    // 2630 1700 media showcase / atm machine
    (() => {
      const obj = interacts.create(2740, 1690, 'decor', 'ATM').setOrigin(0.5, 1).setScale(1.25).setDepth(10000 + 1640).refreshBody();
      obj.interact = () => {
        this.game.vue.openProject({key: 'slideshow' });
        this.game.vue.doneQuest('slideshow');
        this.preAnimolQuests.gallery = true;
        this.checkAnimolGoal();
      };
      interactObjs.push(obj);
    })();
    // 5210 1682 homman maker / generic fashion sign
    (() => {
      const obj = interacts.create(5230, 1720, 'decor', 'BAG').setOrigin(0.5, 1).setScale(1.3).setDepth(10000 + 1720).refreshBody();
      obj.interact = () => {
        this.game.vue.openProject({ key: 'gallery' });
        this.game.vue.doneQuest('gallery');
        this.preAnimolQuests.slideshow = true;
        this.checkAnimolGoal();
      };
      interactObjs.push(obj);
    })();
    this.physics.add.collider(this.player, interacts);

    // Animol
    this.animolOpen = false;
    (() => {
      this.animolGoal = this.add.sprite(4400, 1500, 'animol-goal')
        .setOrigin(0.5, 0.95).setScale(0.5).setDepth(10000 + 1500)
        .setPipeline('Light2D')
        .play('animol-goal')
        .setVisible(false);
      this.animolGoal.interact = () => {};
      interactObjs.push(this.animolGoal);
    })();

    // Party Area
    (() => {
      this.partyArea = this.physics.add.staticGroup();
      this.partyArea.addMultiple([
        this.add.rectangle(3000 * MAP_SCALE, 2770 * MAP_SCALE, 1420 * MAP_SCALE, 630 * MAP_SCALE, 0xff0000, 0).setOrigin(0, 0),
      ]);
      this.physics.add.overlap(this.player, this.partyArea, () => {
        if (!this.postAnimolQuests.animol) return;
        if (this.postAnimolQuests.party) return;
        this.postAnimolQuests.party = true;
        this.game.vue.doneQuest('party');
        return true;
      });
    })();

    // Hoomans
    const HOOMAN_SPACING = 150;
    const SPAWN_CHANCE = 0.25;
    const BLOCK_CELLS = ['0,8', '0,9', '0,10', '1,12', '1,13', '1,14', '2,9', '2,26'];
    const msgBoxes = this.add.group();
    let messages = this.game.registry.get('messages');
    for (let i = messages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [messages[i], messages[j]] = [messages[j], messages[i]];
    }
    let msgIndex = -1;
    this.hommanObjs = [];
    ((spawnLocs) => {
      spawnLocs.forEach(([x, y, w, h], j) => {
        this.add.rectangle(x, y, w, h, 0x00ff00).setOrigin(0, 0).setAlpha(0);
        [...new Array(Math.floor(w / HOOMAN_SPACING))].forEach((e, i) => {
          if (msgIndex >= messages.length - 1) return
          if (Math.random() > SPAWN_CHANCE) return
          if (BLOCK_CELLS.indexOf(`${j},${i}`) > -1) return
          msgIndex += 1;
          if (!messages[msgIndex].message) return
          const spawnX = x + (i * HOOMAN_SPACING) + (HOOMAN_SPACING / 2);
          const spawnY = y + (h * 0.2) + Math.floor(Math.random() * (h * 0.6));
          const hoo = this.add.sprite(spawnX, spawnY, 'hoomans')
            .setOrigin(0.5, 1).setScale(0.25).setDepth(10000 + spawnY).setPipeline('Light2D')
            .setFrame(HOOMAN_FRAMES[Math.floor(Math.random() * HOOMAN_FRAMES.length)]);
          this.hommanObjs.push(hoo);
          const msgTxt = this.add.text(spawnX, spawnY - 50, messages[msgIndex].message, {
            fontFamily: 'Zen Maru Gothic',
            fontSize: 12,
            align: 'center',
            fixedWidth: 180,
            color: '#ffffff',
            stroke: '#1a1a1a',
            strokeThickness: 3,
            wordWrap: { width: 180, useAdvancedWrap: true }
          }).setOrigin(0.5, 1).setDepth(30002).setVisible(false);
          const msgBox = this.add.rectangle(spawnX, spawnY - 45, 200, msgTxt.displayHeight + 10, 0x000000, 0.7)
            .setOrigin(0.5, 1).setDepth(30001).setVisible(false);
          msgBoxes.add(msgBox);
          msgBoxes.add(msgTxt);
          hoo.interact = () => {
            this.game.vue.doneQuest('talk');
            this.preAnimolQuests.talk = true;
            this.checkAnimolGoal();
            msgBoxes.setVisible(false);
            msgBox.setVisible(true);
            msgTxt.setVisible(true);
            setTimeout(() => {
              msgBox.setVisible(false);
              msgTxt.setVisible(false);
            }, 5000);
          };
          interactObjs.push(hoo);
        });
      });
    })([
      [1200, 1682, 1750, 100],
      [3180, 1682, 3270, 100],

      [1200, 1800, 5000, 170], // street
      [1200, 1970, 5000, 170], // street

      [1200, 2160, 560, 100],
      [2500, 2160, 2630, 100],
      [5870, 2160, 580, 100],

      [1200, 3660, 660, 100],
      [2400, 3660, 2830, 100],
      [5770, 3660, 680, 100],

      [1200, 3800, 5000, 170], // street
    ]);

    // Scale
    this.placeScale = 0.5;
    this.uiContainer.add([
      this.scaleTxt = this.add.text(1220, 690, String(this.placeScale), { fontSize: 20 }),
    ]);

    this.input.on('wheel', (pointer) => {
      if (pointer.deltaY > 0) this.placeScale -= 0.05;
      if (pointer.deltaY < 0) this.placeScale += 0.05;
      this.placeScale = Math.round(this.placeScale * 100) / 100;
      this.scaleTxt.setText(String(this.placeScale));
    });

    // Decors
    ((decors) => {
      decors.forEach(([frame, x, y, scale, depth]) => {
        this.add.sprite(x, y, 'decor', frame)
          .setScale(scale * 0.5 || 1).setOrigin(0.5, 1).setDepth(depth || (10000 + y)).setPipeline('Light2D');
      });
      let placeDecor = 0
      this.decorBtn = this.add.sprite(-250, -60, 'decor', DECOR_FRAMES[placeDecor]).setScale(0.4)
        .setInteractive()
        .on('pointerdown', () => {
          placeDecor += 1;
          if (placeDecor > DECOR_FRAMES.length) placeDecor = 0;
          this.decorBtn.setFrame(DECOR_FRAMES[placeDecor]);
        });
      let placed = {};
      let placei = 0;
      const isShift = this.input.keyboard.addKey('SHIFT');
      this.input.on('pointerdown', () => {
        if (this.input.keyboard.checkDown(isShift)) {
          const placeX = Math.round(this.cameras.main.scrollX + this.input.x);
          const placeY = Math.round(this.cameras.main.scrollY + this.input.y);
          placed[placei] = [DECOR_FRAMES[placeDecor], placeX, placeY, this.placeScale];
          console.log('%cDECOR %O', 'color:red;', JSON.stringify(Object.values(placed)));
          const placedObj = this.add.sprite(placeX, placeY, 'decor', DECOR_FRAMES[placeDecor])
            .setScale(this.placeScale).setOrigin(0.5, 1).setDepth(10000 + placeY).setPipeline('Light2D')
            .setData('placei', placei)
            .setInteractive()
            .on('pointerdown', () => {
              delete placed[placedObj.getData('placei')];
              placedObj.destroy();
              console.log('%cDECOR %O', 'color:red;', JSON.stringify(Object.values(placed)));
            });
          placei += 1;
        }
      });
    })([
      ['szy_trash_bim', 1560, 1700, 0.8],
      ['spNB2', 2500, 1780, 0.8],
      ['spNB4', 2550, 1780, 0.8],
      ['spNB1', 2600, 1780, 0.8],
      ['spNB2', 2650, 1780, 0.8],
      ['spNB3', 2700, 1780, 0.8],
      ['spSHEET', 4379, 1680, 1.6],
      ['szy_cone', 4330, 1720, 0.8],
      ['spNB2', 4550, 1780, 0.8],
      ['spNB4', 4600, 1780, 0.8],
      ['spNB1', 4650, 1780, 0.8],
      ['spNB2', 4700, 1780, 0.8],
      ['spNB3', 4750, 1780, 0.8],
      ['szy_cone', 5355, 1720, 0.8],
      ['szy_cone', 5400, 1705, 0.8],
      ['spNB2', 5850, 1780, 0.8],
      ['spNB4', 5900, 1780, 0.8],
      ['spNB1', 5950, 1780, 0.8],
      ['spNB2', 6000, 1780, 0.8],
      ['spNB3', 6050, 1780, 0.8],
      ['szy_cone', 2670, 860, 0.8],
      ['szy_cone_tired', 2770, 870, 0.8],
      ['szy_cone', 3310, 860, 0.8],
      ['szy_trash_bim_lidless', 2030, 870, 0.8],
      ['szy_trash_bim_lidless', 3800, 870, 0.8],
      ['szy_cone', 4340, 720, 0.8],
      ['szy_cone', 4425, 720, 0.8],
      ['szy_cone', 4340, 820, 0.8],
      ['szy_cone', 4425, 820, 0.8],
      ['szy_cone_tired', 4410, 1030, 0.8],
      ['szy_cone_tired', 5720, 810, 0.8],
      ['szy_trash_bim_lidless', 5850, 800, 0.8],
      ['szy_trash_bim_lidless', 6090, 850, 0.8],
      ['szy_trash_bim_lidless', 6181, 850, 0.8],
      ['szy_cone_tired', 1380, 2780, 0.8],
      ['szy_trash_bim_lidless', 2880, 3410, 0.8],
      ['szy_trash_bim_lidless', 4700, 2780, 0.8],
      ['szy_cone', 4780, 3410, 0.8],
      ['SPRAY3', 2550, 2790, 0.8],
      ['SPRAY1', 2580, 2810, 0.8],
      ['SPRAY2', 2600, 2800, 0.8],
      ['acas_balloon', 3180, 2780, 1.5],
      ['acas_balloon', 4500, 2800, 1.5],
      ['acas_balloon', 3000, 3400, 1.5],
      ['acas_balloon', 4700, 3400, 1.5],
      ['szy_cone_tired', 6220, 3420, 0.8],
    ]);

    // NPC
    ((npcs) => {
      npcs.forEach(([frame, x, y, scale, depth]) => {
        this.add.sprite(x, y, 'npc', frame)
          .setScale(scale || 1).setOrigin(0.5, 1).setDepth(depth || (10000 + y));
      });
      let placeNpc = 0
      this.npcBtn = this.add.sprite(-130, -60, 'npc', NPC_FRAMES[placeNpc]).setScale(0.4)
        .setInteractive()
        .on('pointerdown', () => {
          placeNpc += 1;
          if (placeNpc > NPC_FRAMES.length) placeNpc = 0;
          this.npcBtn.setFrame(NPC_FRAMES[placeNpc]);
        });
      let placed = {};
      let placei = 0;
      const isAlt = this.input.keyboard.addKey('ALT');
      this.input.on('pointerdown', () => {
        if (this.input.keyboard.checkDown(isAlt)) {
          const placeX = Math.round(this.cameras.main.scrollX + this.input.x);
          const placeY = Math.round(this.cameras.main.scrollY + this.input.y);
          placed[placei] = [NPC_FRAMES[placeNpc], placeX, placeY, this.placeScale];
          console.log('%cNPC %O', 'color:red;', JSON.stringify(Object.values(placed)));
          const placedObj = this.add.sprite(placeX, placeY, 'npc', NPC_FRAMES[placeNpc])
            .setScale(this.placeScale).setOrigin(0.5, 1).setDepth(10000 + placeY)
            .setData('placei', placei)
            .setInteractive()
            .on('pointerdown', () => {
              delete placed[placedObj.getData('placei')];
              placedObj.destroy();
              console.log('%cNPC %O', 'color:red;', JSON.stringify(Object.values(placed)));
            });
          placei += 1;
        }
      });
    })([
      ['sp_Kaela_-peek', 1285, 1324, 1.2],
      ['day_calli', 2056, 1284, 1.2],
      ['petran_Kiara2', 2696, 1365, 1.2],
    ]);

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

    // Interface: Quests
    this.add.rectangle(-1280 + 60, -60, 100, 100, 0xff0000, 0)
      .setInteractive().on('pointerdown', () => {
        this.game.vue.openQuests();
      });
    this.add.text(-1280 + 10, -40, 'Quests', {
      fontFamily: 'Londrina Solid',
      fontSize: 20,
      align: 'center',
      fixedWidth: 100,
      color: '#ffffff',
      stroke: '#1a1a1a',
      strokeThickness: 3,
    })
    this.add.image(-1280 + 60, -70, 'book').setScale(0.7);

    // Interface: Help
    this.add.rectangle(-1280 + 60 + 100, -60, 100, 100, 0xff0000, 0)
      .setInteractive().on('pointerdown', () => {
        this.game.vue.openHelp();
      });
    this.add.text(-1280 + 10 + 100, -40, 'Help', {
      fontFamily: 'Londrina Solid',
      fontSize: 20,
      align: 'center',
      fixedWidth: 100,
      color: '#ffffff',
      stroke: '#1a1a1a',
      strokeThickness: 3,
    })
    this.add.image(-1280 + 60 + 100, -70, 'help').setScale(0.9);

    // Inital floor
    this.switchFloor1();

    // postUpdate()
    this.events.on('postupdate', () =>{
      this.mumSpine.x = this.player.x;
      this.mumSpine.y = this.player.y;
      if (this.animol) {
        this.animolSprite.x = this.animol.x;
        this.animolSprite.y = this.animol.y;
      }
    });

    // Fade In
    this.cameras.main.fadeIn(1000);
  }

  update() {
    this.player.setVelocity(0);
    const SPEED = 1.5;

    // Keyboard X
    if (this.udlr.left.isDown || this.wasd.left.isDown) {
      this.walkDir = 'left';
      this.player.setVelocityX(-350 * SPEED);
    } else if (this.udlr.right.isDown || this.wasd.right.isDown) {
      this.walkDir = 'right';
      this.player.setVelocityX(350 * SPEED);
    }

    // Keyboard Y
    if (this.udlr.up.isDown || this.wasd.up.isDown) {
      this.player.setVelocityY(-300 * SPEED);
    } else if (this.udlr.down.isDown || this.wasd.down.isDown) {
      this.player.setVelocityY(300 * SPEED);
    }
    this.player.setDepth(10000 + this.player.y);

    if (this.player.body.velocity.x !== 0 || this.player.body.velocity.y !== 0) {
      this.mumSpine.play(`${this.walkDir}-walk`, true);
    } else if (this.player.body.velocity.x === 0 || this.player.body.velocity.y === 0) {
      this.mumSpine.play(`${this.walkDir}-idle`, true);
    }

    // Interact hitbox
    this.interact.x = this.player.x;
    this.interact.y = this.player.y;
    this.mumLamp1.x = this.player.x;
    this.mumLamp1.y = this.player.y;
    this.mumLamp2.x = this.player.x;
    this.mumLamp2.y = this.player.y;
    this.mumLamp3.x = this.player.x;
    this.mumLamp3.y = this.player.y;
    this.mumSpine.setDepth(this.player.depth);

    // Debug
    this.debugX.setText(Math.round(this.player.x));
    this.debugY.setText(Math.round(this.player.y));

    // Bridge Fade
    if (this.floor === 2) {
      const playerBounds = this.player.getBounds();
      const g3aBounds = this.g3a.getBounds();
      const g3bBounds = this.g3b.getBounds();
      const bridgeOverlapA = Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, g3aBounds);
      const bridgeOverlapB = Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, g3bBounds);
      if (bridgeOverlapA || bridgeOverlapB) {
        if (this.bridge1.alpha > 0) this.bridge1.alpha -= 0.05;
        if (this.bridge2.alpha > 0) this.bridge2.alpha -= 0.05;
        if (this.fence1.alpha > 0) this.fence1.alpha -= 0.05;
        if (this.fence2.alpha > 0) this.fence2.alpha -= 0.05;
        if (this.messagesObj && this.messagesObj.alpha > 0) {
          this.messagesObj.alpha -= 0.05;
          if (this.messagesObj.alpha <= 0) this.messagesObj.disableBody();
        }
      } else {
        if (this.bridge1.alpha < 1) this.bridge1.alpha += 0.05;
        if (this.bridge2.alpha < 1) this.bridge2.alpha += 0.05;
        if (this.fence1.alpha < 1) this.fence1.alpha += 0.05;
        if (this.fence2.alpha < 1) this.fence2.alpha += 0.05;
        if (this.messagesObj && this.messagesObj.alpha < 1) {
          this.messagesObj.alpha += 0.05;
          this.messagesObj.enableBody();
        }
      }
    }

    // Follower
    if (this.animol) {
      const flwDst = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.animol.x,
        this.animol.y,
      );
      if (flwDst > 700) {
        this.animol.x = this.player.x;
        this.animol.y = this.player.y;
      } else if (flwDst > 400) {
        // this.followerCollider.active = false;
      } else if (flwDst > 140) {
        // this.followerCollider.active = true;
        this.physics.moveToObject(this.animol, this.player, Math.abs(flwDst) * 2);
        this.animolSprite.setDepth(10000 + this.animol.y - 20);
      } else {
        // this.followerCollider.active = true;
        this.animol.setVelocity(0, 0);
      }
      if (Math.abs(this.animol.body.velocity.x) < 1) this.animol.body.velocity.x = 0;
      if (Math.abs(this.animol.body.velocity.y) < 1) this.animol.body.velocity.y = 0;
      if (this.animol.body.velocity.x < 0) {
        this.animolDir = 'left';
        this.animolSprite.play('animol-left-walk', true);
      } else if (this.animol.body.velocity.x > 0) {
        this.animolDir = 'right';
        this.animolSprite.play('animol-right-walk', true);
      } else if (this.animol.body.velocity.y !== 0) {
        if (this.animolDir === 'left') {
          this.animolSprite.play('animol-left-walk', true);
        } else {
          this.animolSprite.play('animol-right-walk', true);
        }
      } else {
        if (this.animolDir === 'left') {
          this.animolSprite.play('animol-left-idle', true);
        } else {
          this.animolSprite.play('animol-right-idle', true);
        }
      }
    }
  }

  switchFloor1() {
    this.floor = 1;
    this.bridge1.setVisible(true);
    this.bridge2.setVisible(true);
    this.fence1.setVisible(true);
    this.fence2.setVisible(true);
    this.g1col.active = false;
    if (this.a1col) this.a1col.active = false;
    this.g1grp.setVisible(false);
    this.g2col.active = true;
    if (this.a2col) this.a2col.active = true;
    this.g2grp.setVisible(true);
    this.g3a.setVisible(false);
    this.g3b.setVisible(false);
  }

  switchFloor2() {
    this.floor = 2;
    this.g1col.active = true;
    if (this.a1col) this.a1col.active = true;
    this.g1grp.setVisible(true);
    this.g2col.active = false;
    if (this.a2col) this.a2col.active = false;
    this.g2grp.setVisible(false);
    this.g3a.setVisible(true);
    this.g3b.setVisible(true);
  }

  checkAnimolGoal() {
    if (!Object.values(this.preAnimolQuests).filter((v) => !v).length) {
      this.animolGoal.setVisible(true);
      this.animolGoal.interact = () => {
        if (this.animolOpen) return;
        this.animolOpen = true;
        this.animolGoal.play('animol-open');
        this.game.vue.doneQuest('animol');
        this.time.addEvent({
          delay: 670,
          callback: function proceed() {
            this.animolGoal.setVisible(false);
            this.spawnAnimol();
          },
          callbackScope: this,
        });
      };
    }
  }

  spawnAnimol() {
    this.animolDir = 'left';
    this.animol = this.physics.add.image(4400, 1500, 'sample')
      .setDisplaySize(30, 10).setOrigin(0.5, 1).setTintFill(0xff0000).setAlpha(0)
      .refreshBody();
    this.animolSprite = this.add.sprite(4400, 1500, 'animol-walk')
      .setOrigin(0.5, 0.85).setScale(0.4)
      .setPipeline('Light2D')
      .play('animol-left-idle');
    this.animolSprite.setDepth(10000 + this.animol.y - 20);
    this.physics.add.collider(this.animol, this.ground);
    this.a1col = this.physics.add.collider(this.animol, this.g1grp);
    this.a2col = this.physics.add.collider(this.animol, this.g2grp);
    this.a1col.active = false;
    this.postAnimolQuests.animol = true;
    // Party
    // 3000 2770 1420 630
    [...new Array(30)].forEach(() => {
      const spawnY = 2770 + (Math.random() * 630);
      this.add.sprite(3000 + (Math.random() * 1420), spawnY, 'hoomans')
        .setOrigin(0.5, 1).setScale(0.6).setDepth(10000 + spawnY).setPipeline('Light2D')
        .setFrame(HOOMAN_FRAMES[Math.floor(Math.random() * HOOMAN_FRAMES.length)]);
    });
  }
}

export default AmogusScene;
