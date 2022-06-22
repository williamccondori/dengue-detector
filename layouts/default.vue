<template>
  <div class="layout">
    <div class="sidebar">
      <Sidebar />
    </div>
    <div class="main">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/shared/Sidebar.vue'
export default {
  components: {
    Sidebar,
  },
}
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 20rem auto;
}
</style>
