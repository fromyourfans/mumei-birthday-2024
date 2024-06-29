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
      video: '<tbd1>',
      slideshow: '<tbd2>',
      animol: '<Secret Quest 1. Complete previous quests.>',
      party: '<Secret Quest 2. Complete previous quests.>',
      cake: '<Secret Quest 3. Complete previous quests.>',
    },
  }),
  watch: {
    questStatus(val) {
      if (questStatus.talk) {

      }
    }
  }
};
</script>

<style scoped>
.dialog {
  width:600px;
  height:460px;
  margin:0px auto;
  background:#fbeff2;
  border-radius: 12px;
  overflow:hidden;
  border:3px solid #f3c698;

  .dialog-title {
    height:60px;
    line-height:60px;
    font-size:24px;
    font-weight:bold;
    padding:0px 20px 0px 20px;
    background:#75522d;
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
