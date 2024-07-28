<template>
  <v-carousel height="100%" hide-delimiters progress>
    <v-carousel-item :src="Cookbook01" contain ></v-carousel-item>
    <v-carousel-item :src="Cookbook02" contain ></v-carousel-item>
    <v-carousel-item :src="Cookbook03" contain ></v-carousel-item>
    <v-carousel-item :src="Cookbook04" contain ></v-carousel-item>
    <v-carousel-item :src="Cookbook05" contain ></v-carousel-item>
  </v-carousel>
</template>

<script>
import Cookbook01 from '../assets/certs/1.png';
import Cookbook02 from '../assets/certs/2.png';
import Cookbook03 from '../assets/certs/3.png';
import Cookbook04 from '../assets/certs/4.png';
import Cookbook05 from '../assets/certs/5.png';

export default {
  data() {
    return {
      Cookbook01,
      Cookbook02,
      Cookbook03,
      Cookbook04,
      Cookbook05,
    }
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>

</style>
