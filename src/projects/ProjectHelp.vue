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
        <li>Cheat: <a href="#" @click="unlockAll">Unlock most content</a>. (reloads the page)</li>
        <li>If needed, <a href="#" @click="resetAll">Reset all</a> quest status. (reloads the page)</li>
        <li>Tip: Quest progress is saved across refresh/sessions.</li>
      </ul>

      <h2 class="mt">The Afterword</h2>
      <p class="aw">Happy Birthday Mumei! For the third time! That’s crazy to think it’s been nearly 3 years of gaffs and goofs with you and the Hoomans. We decided to be a bit more ambitious than our regular interactable website and make one where you can walk around. Really hope that it’s as enjoyable to interact with for you as it was to work on for us!</p>
      <p class="aw">Thousand thank yous for being the person who ultimately made all this possible by being who brought us all together. You’re an inspiration to us Hoomans and we can only hope that gifts like these show our full appreciation. Here’s to many more days of laughter and joy!</p>

      <h2 class="mt">Birthday Website</h2>
      <ul class="credits">
        <li><strong>Mumei's Civilization Discord Staff and Members</strong></li>
        <li><strong>Mumei's Sanctuary Discord Staff and Members</strong></li>
        <li><strong>jetrico</strong> - Site Project Organiser, Lead Programmer</li>
        <li><strong>Nin-tan【人単】</strong> - Map Artwork, Object Guides, Art Lead</li>
        <li><strong>The Gnome’s Prophet</strong> - Site Project Organiser, The Afterword</li>
        <li><strong>Jackie Chan</strong> - Site Project Organiser</li>
        <li><strong>Mudrock</strong> - Site Project Organiser</li>
        <li>Assets
          <ul>
            <li>Friend - <strong>0btuse</strong></li>
            <li>Hootsie - <strong>Mocha Alpaca</strong></li>
            <li>Hoomans - <strong>Sayowl</strong></li>
            <li>Fauna - <strong>Emi Emblerem</strong></li>
            <li>Bae - <strong>Nin-tan【人単】</strong></li>
            <li>Kronii - <strong>Nin-tan【人単】</strong></li>
            <li>Sana - <strong>Petran</strong></li>
            <li>Irys - <strong>Nin-tan【人単】</strong></li>
            <li>Kiara - <strong>Petran</strong></li>
            <li>Amelia - <strong>AlphaCas</strong></li>
            <li>Calli - <strong>Day</strong></li>
            <li>Gura - <strong>Petran</strong></li>
            <li>Ina - <strong>SleepyPenguin</strong></li>
            <li>Nerissa - <strong>SleepyPenguin</strong></li>
            <li>Shiori - <strong>Sayowl</strong></li>
            <li>Bijou - <strong>Nin-tan【人単】</strong></li>
            <li>Fuwawa - <strong>Nin-tan【人単】</strong></li>
            <li>Mococo - <strong>Nin-tan【人単】</strong></li>
            <li>Lui - <strong>SleepyPenguin</strong></li>
            <li>Subaru - <strong>SleepyPenguin</strong></li>
            <li>Towa - <strong>Nin-tan【人単】</strong></li>
            <li>Anya - <strong>Mudrock</strong></li>
            <li>Kaela - <strong>SleepyPenguin</strong></li>
            <li>Zeta - <strong>Jesus Alberto</strong></li>
            <li>Reine - <strong>SleepyPenguin</strong></li>
            <li>Cecilia - <strong>SleepyPenguin</strong></li>
            <li>Gigi - <strong>SleepyPenguin</strong></li>
            <li>Elizabeth - <strong>SleepyPenguin</strong></li>
            <li>Raora - <strong>SleepyPenguin</strong></li>
            <li>Korone Kedama - <strong>SleepyPenguin</strong></li>
            <li>Graffiti - <strong>Nin-tan【人単】</strong></li>
            <li>Fake Brands/Logos - <strong>Nin-tan【人単】</strong></li>
            <li>Prop Assets (Street lights, stop signs, trash bins, etc) - <strong>Szy, Nin-tan【人単】</strong></li>
            <li>Party Prop Assets (Mounted balloons, blank folding tables/chairs, snacks and drinks, crt with generator, cd/casette player, outdoor lamps, etc) - <strong>AlphaCas, Szy, Nin-tan【人単】</strong></li>
          </ul>
        </li>
      </ul>

      <h2 class="mt">Mission:Wolf</h2>
      <ul class="credits">
        <li>Organised by <strong>The Gnome’s Prophet</strong></li>
        <li>Donations by <strong>Hoomans</strong></li>
        <li>Mission:Wolf in Colorado, USA</li>
      </ul>

      <h2 class="mt">Special Thanks to:</h2>
      <ul class="credits">
        <li>Staff of Mumei Civilization and Sanctuary discords</li>
      </ul>

      <h2 class="mt">Links</h2>
      <ul class="credits">
        <li>Drawing Board (closed): <a href="https://magma.com/d/LOmgDyOMxD" target="_blank">https://magma.com/d/LOmgDyOMxD</a></li>
        <li>Mission:Wolf: <a href="https://missionwolf.org" target="_blank">https://missionwolf.org</a></li>
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
      this.app.doneQuest('gallery');
      this.app.doneQuest('slideshow');
      this.app.doneQuest('animol');
      this.app.doneQuest('party');
      window.location.reload();
    },
    resetAll() {
      localStorage.removeItem('quest_talk');
      localStorage.removeItem('quest_messages');
      localStorage.removeItem('quest_mural');
      localStorage.removeItem('quest_gallery');
      localStorage.removeItem('quest_slideshow');
      localStorage.removeItem('quest_animol');
      localStorage.removeItem('quest_party');
      window.location.reload();
    }
  },
};
</script>

<style scoped>
.dialog {
  width:calc(60vw - 48px);
  height:calc(80vh - 48px);
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
    width:100%;
    height:calc(80vh - 108px);
    padding:10px 20px 30px;
    overflow-y:scroll;
    overflow-x:hidden;
  }
}

p.aw {
  font-size:18px;
}

ul {
  margin:0;
  padding:0px 0px 0px 40px;
  font-size:20px;
  &.credits, &.credits ul {
    font-size:16px;
  }
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
  color:#f0ff1e;
}
</style>
