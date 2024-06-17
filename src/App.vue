<script setup>
</script>

<template>
  <div id="bg"></div>
  <div id="game"></div>
  <div v-for="(project, projectId) in projects" :key="projectId" >
    <v-dialog v-model="show[projectId]">
      <ProjectBase
        :projectId="projectId"
        @close="open = null"
        :title="project.title"
        :description="project.description"
      />
    </v-dialog>
  </div>
</template>

<script>
import Phaser from 'phaser';
import scene from './scenes';
import plugins from './plugins';

import ProjectBase from './projects/ProjectBase.vue';

export default {
  data() {
    return {
      game: null,
      open: null,
      projects: {
        messages: {
          title: 'Birthday Cards',
          description: 'Many hoomans sincerely wish Nanashi Mumei a very happy birthday this year!',
        },
        mural: {
          title: 'Drawing Board',
          description: 'Hoomans doodled their birthday greetings on a shared drawing board!',
        },
        video: {
          title: 'Birthday Video',
          description: 'video template',
        },
        slideshow: {
          title: 'Birthday Slideshow',
          description: 'slideshow template',
        },
      },
      show: {
        messages: false,
        mural: false,
        video: false,
        slideshow: false,
      },
    }
  },
  watch: {
    open(val) {
      this.show = Object.keys(this.projects).reduce((c, id) => ({ ...c, [id]: val === id }), {});
    },
  },
  methods: {
    openProject({ key }) {
      this.open = key;
    },
  },
  mounted() {
    this.game = new Phaser.Game({
      type: Phaser.WEBGL,
      parent: 'game',
      banner: false,
      backgroundColor: Phaser.Display.Color.HexStringToColor('#1a1a1a').color,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
      },
      physics: {
        default: 'arcade',
      },
      plugins,
      scene,
      callbacks: {
        postBoot: () => {
          this.game.vue = this;
        },
      },
    });
  },
  components: {
    ProjectBase,
  },
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
