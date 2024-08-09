<template>
  <div class="project">
    <div class="project-description">
      <p class="blue--text">
        PROTIP: Click on a card to mark it as read. It will persist even across website visits.
        <span class="red--text font-weight-bold">Read messages:  {{countRead}} / {{countAll}}</span>
      </p>
    </div>
    <div class="project-close">
      <v-btn
        @click="spoiler()"
        large elevation="1" color="blue darken-4">
        Toggle Spoiler
      </v-btn>
    </div>
    <div class="project-content">
      <div v-masonry="'bdaycards'" transition-duration="0.3s" item-selector=".card" stagger="0s">
        <div
          v-masonry-tile
          :class="[ 'card', read[item.name] ? 'card-read' : '', censor ? 'card-censor' : '' ]"
          v-for="(item, ix) in cards" :key="`card-${ix}`"
          @click="toggleRead(item.name)"
        >
          <div class="binder"></div>
          <div class="card-name text-h6 pr-12 py-2">{{item.name}}</div>
          <div class="card-text text-body-1 pr-4 pb-2">{{item.message}}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import messages from '../assets/messages.json';

export default {
  data: () => ({
    cards: [],
    read: {},
    countRead: 0,
    countAll: 0,
    censor: true,
  }),
  methods: {
    toggleRead(key) {
      if (typeof this.read[key] === 'undefined') this.read[key] = false;
      this.read = { ...this.read, [key]: !this.read[key] };
      localStorage.setItem('mumeibday2023_read', JSON.stringify(this.read));
      this.countRead = Object.values(this.read).filter((v) => !!v).length;
    },
    spoiler() {
      this.censor = !this.censor;
    },
  },
  mounted() {
    // Load data
    (async () => {
      if (!localStorage.getItem('mumeibday2023_read')) localStorage.setItem('mumeibday2023_read', '{}');
      this.read = JSON.parse(localStorage.getItem('mumeibday2023_read'));
      this.countRead = Object.values(this.read).filter((v) => !!v).length;
      this.cards = Object.values(messages.messages)
        .sort((a, b) => a.time - b.time);
      this.countAll = this.cards.length;
      this.$nextTick(() => {
        // eslint-disable-next-line no-undef
        twemoji.parse(document.body);
        this.$redrawVueMasonry('bdaycards');
        setTimeout(() => {
          this.$redrawVueMasonry('bdaycards');
        }, 1200);
      });
    })();
  },
};
</script>

<style scoped>
.project {
  height:86vh;
  position:relative;
  .project-description {
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 46px;
    padding:10px;
    overflow:hidden;
    h3 {
      padding:0;
      margin:0;
    }
    p {
      padding:0;
      margin:0;
    }
  }
  .project-content {
    position:absolute;
    top: 46px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y:scroll;
  }
  .project-close {
    position:absolute;
    top: 5px;
    right: 20px;
    width: 230px;
    height: 50px;
    text-align:right;
  }
}

.card {
  background:#426e94;
  position:relative;
  padding-left:20px;
  min-height:100px;
  width:24%;
  margin:10px 0.5%;
  border:2px solid #12324f;
  .binder {
    background:#12324f;
    position:absolute;
    top:0px;
    left:0px;
    width:10px;
    height:100%;
  }
  .card-name {
    color:#ffffff;
  }
  .card-text {
    white-space: pre-line;
  }
  &.card-read {
    background:#c3dcf8;
    color:#000000;
    .card-name {
      color:#000000;
    }
  }
  &.card-censor {
    .card-text {
      filter:blur(5px);
    }
  }
}

@media only screen and (max-width: 1800px) {
  .card {
    width:32%;
    margin:10px 0.5%;
  }
}
@media only screen and (max-width: 1264px) {
  .card {
    width:48%;
    margin:10px 1%;
  }
}
@media only screen and (max-width: 700px) {
  .card {
    width:96%;
    margin:10px 2%;
  }
}
</style>

<style>
.card-text {
  img {
    height:1.4rem;
  }
}
</style>
