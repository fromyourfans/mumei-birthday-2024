<template>
  <a :href="miralImgUrl" target="_blank">
    <img :src="miralImgUrl" class="mural-img">
  </a>
</template>

<script>
import MuralImg from '../assets/magma-20240730.png';

export default {
  data() {
    return {
      miralImgUrl: MuralImg,
    }
  },
  mounted() {
  },
}
</script>

<style scoped>
.mural-img {
  width:auto;
  height:100%;
  margin:0px auto;
  display:block;
}
</style>
