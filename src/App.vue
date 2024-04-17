<script setup>
</script>

<template>
  <div id="bg"></div>
  <div id="game"></div>
  {{ show_messages }}
  {{ show_mural }}
  {{ show_blessing }}
  {{ show_cookbook }}
  {{ show_button }}
  {{ show_vnteaser }}
</template>

<script>
import Phaser from 'phaser';
import scene from './scenes';
import plugins from './plugins';

export default {
  data() {
    return {
      game: null,
      show_messages: false,
      show_mural: false,
      show_blessing: false,
      show_cookbook: false,
      show_button: false,
      show_vnteaser: false,
    }
  },
  methods: {
    onProject({ key }) {
      console.log('OPEN PROJECT', key);
      this.show_messages = false;
      this.show_mural = false;
      this.show_blessing = false;
      this.show_cookbook = false;
      this.show_button = false;
      this.show_vnteaser = false;
      this[`show_${key}`] = true;
    }
  },
  mounted() {
    this.game = new Phaser.Game({
      type: Phaser.WEBGL,
      parent: 'game',
      banner: false,
      backgroundColor: Phaser.Display.Color.HexStringToColor('#1a1a1a').color,
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
      },
      plugins,
      scene,
      callbacks: {
        postBoot: () => {
          this.game.vue = this;
        },
      },
    });
  }
}
</script>

<style scoped>
#bg {
  background-color: #000;
  background-image: url(./assets/bg.png);
  background-size:cover;
  z-index:1;
  position:absolute;
  top:0;
  left:-30px;
  right:0;
  bottom:-300px;
  filter:blur(5px);
  opacity:0.7;
}
#game {
  width: 100vw;
  height: 100vh;
  z-index:2;
  position:relative;
}
</style>
