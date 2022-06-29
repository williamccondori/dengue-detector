<template>
  <div class="sidebar">
    <!-- <LayerSelector /> -->
    <LayerSummary />
  </div>
</template>

<script>
// import LayerSelector from './sidebar/LayerSelector.vue'
import LayerSummary from './sidebar/LayerSummary.vue'
export default {
  components: {
    // LayerSelector,
    LayerSummary,
  },
}
</script>

<style scoped>
.sidebar {
  background-color: rgb(242, 242, 242);
  background-image: radial-gradient(
    rgba(31, 41, 55, 0.2) 0.5px,
    rgb(242, 242, 242) 0.5px
  );
  background-size: 5px 5px;
  height: 100vh;
  padding: 1rem;
  border-right: 1px solid rgb(229, 230, 230);
}
</style>
