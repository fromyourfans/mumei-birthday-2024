<script setup>
</script>

<template>
  <div id="game"></div>
</template>

<script>
import Phaser from 'phaser';

export default {
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
#game {
  width: 100vw;
  height: 100vh;
}
</style>
