<template>
  <div class="card">
    <h1>Capas</h1>
    <div>
      <div class="layer-summary__item">
        <h1>Mapa de calor</h1>
        <a-checkbox @change="onChangeHeatMapHandler" />
      </div>
      <div class="layer-summary__item">
        <h1>Datos estadísticos</h1>
        <a-checkbox @change="onChangeFeatureMapHandler" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['setHeatMapVisibility', 'setFeatureMapVisibility']),
    onChangeHeatMapHandler(e) {
      this.setHeatMapVisibility(e.target.checked)
    },
    onChangeFeatureMapHandler(e) {
      this.setFeatureMapVisibility(e.target.checked)
    },
  },
}
</script>

<style>
.layer-summary__item {
  border: 1px dashed gray;
  border-radius: 0.2rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
.layer-summary__item h1 {
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
