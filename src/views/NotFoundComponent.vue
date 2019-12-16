<template>
  <div id="not-found-wrapper">
    <BaseSadFaceIcon />
    <h1 id="not-found-text">SORRY, WE CAN'T REACH THE PAGE YOU WANTED !</h1>
  </div>
</template>

<script>
import BaseSadFaceIcon from '@/components/BaseSadFaceIcon.vue'

export default {
  components: {
    BaseSadFaceIcon
  }
}
</script>

<style scoped>
#not-found-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}
#not-found-text {
  font-family: sans-serif;
  word-spacing: 10px;
  font-size: 40px;
}
</style>
