<template>
  <v-carousel height="100%" hide-delimiters progress>
    <v-carousel-item :src="Cookbook01" contain ></v-carousel-item>
    <v-carousel-item :src="Cookbook02" contain ></v-carousel-item>
    <v-carousel-item :src="Cookbook03" contain ></v-carousel-item>
  </v-carousel>
</template>

<script>
import Cookbook01 from '../assets/certs/cert1.png';
import Cookbook02 from '../assets/certs/cert2.png';
import Cookbook03 from '../assets/certs/cert3.png';

export default {
  data() {
    return {
      Cookbook01,
      Cookbook02,
      Cookbook03,
    }
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>

</style>
