<template>
  <div class="dialog">
    <div class="dialog-title">
      Mumei 2024 Birthday Project
      <div class="dialog-close">
        <v-btn variant="tonal" @click="$emit('close')">Close</v-btn>
      </div>
    </div>
    <div class="dialog-body">
      <h2>Gameplay</h2>
      <ul>
        <li>Use <code>WASD</code> to move around the map.</li>
        <li>Use <code>E</code> near hoomans or objects to interact with them. There's a compilation of all the messages later so there's no need to interact with everyone here.</li>
        <li>Goal: Finish all quests, and find animol at the end.</li>
        <li>Cheat: Mark most quests as complete and <a href="#" @click="unlockAll">Unlock most content</a></li>
        <li>Tip: Quest progress is saved across refresh/sessions.</li>
      </ul>

      <h2 class="mt">Birthday Message</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet purus semper, auctor ex a, ultricies nisi. Duis ut imperdiet turpis. In vulputate quam turpis, vel condimentum mauris tempus eu. Curabitur lacus nulla, venenatis vel augue at, ultrices luctus arcu. Ut maximus elementum ipsum quis vulputate. Nam consequat vel neque vel porta. Ut ut augue vitae mi iaculis convallis et ac ipsum. Nam venenatis, ligula eget tempor euismod, lectus odio pharetra mauris, eget gravida sem nisi nec velit. Mauris aliquet, ligula ac euismod viverra, nunc dui interdum est, tincidunt luctus diam nisi a nulla.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet purus semper, auctor ex a, ultricies nisi. Duis ut imperdiet turpis. In vulputate quam turpis, vel condimentum mauris tempus eu. Curabitur lacus nulla, venenatis vel augue at, ultrices luctus arcu. Ut maximus elementum ipsum quis vulputate. Nam consequat vel neque vel porta. Ut ut augue vitae mi iaculis convallis et ac ipsum. Nam venenatis, ligula eget tempor euismod, lectus odio pharetra mauris, eget gravida sem nisi nec velit. Mauris aliquet, ligula ac euismod viverra, nunc dui interdum est, tincidunt luctus diam nisi a nulla.</p>

      <h2 class="mt">Credits</h2>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: ['app'],
  data: () => ({
  }),
  methods: {
    unlockAll() {
      this.app.doneQuest('talk');
      this.app.doneQuest('messages');
      this.app.doneQuest('mural');
      this.app.doneQuest('video');
      this.app.doneQuest('slideshow');
      this.app.doneQuest('animol');
      this.app.doneQuest('party');
      this.app.openQuests();
      this.app.show.help = false;
    },
  },
};
</script>

<style scoped>
.dialog {
  width:calc(60vw - 48px);
  height:calc(80vh - 48px);
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
    width:100%;
    height:calc(80vh - 108px);
    padding:10px 20px;
    overflow-y:scroll;
    overflow-x:hidden;
  }
}

ul {
  margin:0;
  padding:0px 0px 0px 40px;
  font-size:20px;
  li {
    margin:0px 0px 0px 0px;
    padding:0;
  }
}

h2 {
  font-weight:bold;
  border-bottom: 1px solid #c0c0c0;
  padding: 0px 0px 4px 0px;
  margin: 0px 0px 7px 0px;
  &.mt {
    margin-top: 30px;
  }
}

code {
  color:#0000ff;
}
</style>
