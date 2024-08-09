<template>
  <div class="project">
    <div class="project-description">
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
          :class="[ 'card', censor ? 'card-censor' : '' ]"
          v-for="(item, ix) in cards" :key="`card-${ix}`"
        >
          <div class="binder"></div>
          <div class="card-name text-h6 pr-12 py-2">{{item.name}}</div>
          <div class="card-art text-body-1 pr-4 pb-2">
            <a :href="`fanart/${item.file}`" target="_blank">
              <v-img :src="`fanart/${item.thumb}`" contain />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import artwork from '../assets/artwork.json';

export default {
  data: () => ({
    cards: [],
    censor: true,
  }),
  methods: {
    spoiler() {
      this.censor = !this.censor;
    },
  },
  mounted() {
    // Load data
    (async () => {
      this.cards = Object.values(artwork.artwork);
      this.$nextTick(() => {
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
  &.card-read {
    background:#5e60c4;
    color:#ffffff;
    .card-name {
      color:#ffffff;
    }
  }
  &.card-censor {
    .card-art {
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
