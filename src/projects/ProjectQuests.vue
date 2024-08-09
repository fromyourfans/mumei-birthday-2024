<template>
  <div class="dialog">
    <div class="dialog-title">
      Quests
      <div class="dialog-close">
        <v-btn variant="tonal" @click="$emit('close')">Close</v-btn>
      </div>
    </div>
    <div class="dialog-body">
      <ul>
        <li v-for="(quest, project) in questStatus" :key="`quest-${project}`">
          <input type="checkbox" onclick="return false;" :checked="quest" />
          <span>{{questText[project]}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: ['questStatus'],
  data: () => ({
    questText: {
      talk: 'Talk to at least one hooman',
      messages: 'Look at the messages on the right bridge',
      mural: 'Look at the graffiti under the left bridge',
      gallery: 'Look at the paper bags outside Gwak',
      slideshow: 'Look at the ATM outside KFP',
      animol: '(?) secret quest',
      party: '(?) secret quest',
    },
    preAnimolQuests: ['talk', 'messages', 'mural', 'gallery', 'slideshow'],
  }),
  watch: {
    questStatus() {
      this.checkQuestTexts();
    }
  },
  methods: {
    checkQuestTexts() {
      if (!this.preAnimolQuests.map((n) => this.questStatus[n]).filter((v) => !v).length) {
        this.questText.animol = 'Find animol!'
      }
      if (this.questStatus.animol) {
        this.questText.party = 'Check out the noises nearby...'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.checkQuestTexts();
    });
  }
};
</script>

<style scoped>
.dialog {
  width:600px;
  height:460px;
  margin:0px auto;
  background:#264b6b;
  color:#f0f0f0;
  border:3px solid #071a2b;
  border-radius: 12px;
  overflow:hidden;

  .dialog-title {
    height:60px;
    line-height:60px;
    font-size:24px;
    font-weight:bold;
    padding:0px 20px 0px 20px;
    background:#12324f;
    color:#fff;

    span {
      font-size:16px;
      color:#d9cdeb;
      line-height:60px;
      vertical-align:middle;
      padding-left:20px;
    }

    .dialog-close {
      float:right;
    }
  }

  .dialog-body {
    width:600px;
    height:400px;
  }
}

ul {
  margin:0;
  padding:10px 0px 0px 20px;
  font-size:20px;
  li {
    margin:10px 0px 0px 0px;
    padding:0;
    list-style: none;
    input {
      width: 16px;
      height: 16px;
      margin-right:10px;
    }
  }
}
</style>
