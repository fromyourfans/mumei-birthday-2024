<template>
  <div class="dialog">
    <div class="dialog-title">
      {{ title }}
      <span>{{ description }}</span>
      <div class="dialog-close">
        <v-btn variant="tonal" @click="$emit('close')">Close</v-btn>
      </div>
    </div>
    <div class="dialog-body">
      <ProjectMessages v-if="projectId === 'messages'" />
      <ProjectMural v-if="projectId === 'mural'" />
      <ProjectGallery v-if="projectId === 'gallery'" />
      <ProjectSlideshow v-if="projectId === 'slideshow'" />
    </div>
  </div>
</template>

<script>
import ProjectMessages from './ProjectMessages.vue';
import ProjectMural from './ProjectMural.vue';
import ProjectGallery from './ProjectGallery.vue';
import ProjectSlideshow from './ProjectSlideshow.vue';

export default {
  props: ['projectId', 'title', 'description'],
  components: {
    ProjectMessages,
    ProjectMural,
    ProjectGallery,
    ProjectSlideshow,
  }
}
</script>

<style scoped>
.dialog {
  width:calc(100vw - 48px);
  height:calc(100vh - 48px);
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
    width:calc(100vw - 48px);
    height:calc(100vh - 108px);
  }
}
</style>
