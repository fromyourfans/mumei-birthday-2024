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
  <div>
    <v-dialog v-model="show.quests">
      <ProjectQuests @close="show.quests = false" :questStatus="questStatus" />
    </v-dialog>
  </div>
  <div>
    <v-dialog v-model="show.help">
      <ProjectHelp @close="show.help = false" :app="this" />
    </v-dialog>
  </div>
</template>

<script>
import Phaser from 'phaser';
import scene from './scenes';
import plugins from './plugins';

import ProjectBase from './projects/ProjectBase.vue';
import ProjectQuests from './projects/ProjectQuests.vue';
import ProjectHelp from './projects/ProjectHelp.vue';

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
        quests: false,
        help: false,
      },
      questStatus: {
        talk: false,
        messages: false,
        mural: false,
        video: false,
        slideshow: false,
        animol: false,
        party: false,
        cake: false,
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
    openQuests() {
      this.show.quests = true;
    },
    openHelp() {
      this.show.help = true;
    },
    doneQuest(questId) {
      if (typeof this.questStatus[questId] !== 'undefined') {
        this.questStatus[questId] = true;
        localStorage.setItem(`quest_${questId}`, 1);
      }
    }
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

    // Quest progress
    if (localStorage.getItem('quest_talk')) this.questStatus.talk = true;
    if (localStorage.getItem('quest_messages')) this.questStatus.messages = true;
    if (localStorage.getItem('quest_mural')) this.questStatus.mural = true;
    if (localStorage.getItem('quest_video')) this.questStatus.video = true;
    if (localStorage.getItem('quest_slideshow')) this.questStatus.slideshow = true;
    if (localStorage.getItem('quest_animol')) this.questStatus.animol = true;
    if (localStorage.getItem('quest_party')) this.questStatus.party = true;
    if (localStorage.getItem('quest_cake')) this.questStatus.cake = true;
  },
  components: {
    ProjectBase,
    ProjectQuests,
    ProjectHelp,
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
