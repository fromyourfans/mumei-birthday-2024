<script setup>
</script>

<template>
  <div>
    <span>mei2024</span>
  </div>
</template>

<script>
export default {
  mounted() {
    // eslint-disable-next-line no-undef
    twemoji.parse(document.body);
  }
}
</script>

<style scoped>
div {
  span {
    font-size:30pt;
  }
}
</style>
