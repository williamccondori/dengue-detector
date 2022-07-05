<template>
  <client-only>
    <LMap
      style="width: 100%; min-height: 100vh"
      :zoom="14"
      :center="[-12.5924632, -69.1936765]"
    >
      <LControlLayers position="topright" />
      <LControlScale position="bottomleft" :metric="true" />
      <LMiniMap
        v-if="miniMap"
        :layer="miniMap.layer"
        :options="miniMap.options"
      />
      <LWMSTileLayer
        v-for="wmsLayer in wmsLayers"
        :key="wmsLayer.id"
        :version="wmsLayer.version"
        :base-url="wmsLayer.baseUrl"
        :format="wmsLayer.format"
        :transparent="wmsLayer.isTransparent"
        :layers="wmsLayer.layers"
        :name="wmsLayer.name"
        :visible="wmsLayer.isVisible"
        layer-type="overlay"
        :options="{
          zIndex: 1,
        }"
      />
      <LTileLayer
        v-for="baseMap in baseMaps"
        :key="baseMap.id"
        :name="baseMap.name"
        :url="baseMap.url"
        :visible="baseMap.isVisible"
        layer-type="base"
        :options="{
          zIndex: 0,
        }"
      />
      <LGeoJson
        v-if="geojson && isFeatureMapVisible"
        :geojson="geojson"
        :options="{ pointToLayer: pointToLayer, onEachFeature: onEachFeature }"
      />
      <!-- <LHeatMap
        v-if="heatMapValues && isHeatMapVisible"
        :lat-lng="heatMapValues"
        :radius="50"
        :min-opacity="0.75"
        :max-zoom="10"
        :blur="60"
      /> -->
    </LMap>
  </client-only>
</template>

<script>
import axios from 'axios'
import L from 'leaflet'
import { mapState, mapActions } from 'vuex'
// import LHeatMap from '~/components/heatmap/LHeatMap.vue'

export default {
  components: {
    // LHeatMap,
  },
  data() {
    return {
      geojson: undefined,
      heatMapValues: undefined,
    }
  },
  async fetch() {
    try {
      await this.getMiniMap()
      await this.getBaseMaps()
      await this.getWmsLayers()
    } catch (error) {
      this.$message.error(error.message)
    }
  },
  computed: {
    ...mapState([
      'baseMaps',
      'wmsLayers',
      'isHeatMapVisible',
      'isFeatureMapVisible',
    ]),
    miniMap() {
      const miniMap = this.$store.state.miniMap
      return {
        ...miniMap,
        layer: L.tileLayer(miniMap.url),
      }
    },
  },
  async mounted() {
    const { data } = await axios.get(
      'https://api.map-viewer-app.williamcondori.work/api/querylayers?name=casos_dengue'
    )
    this.geojson = data
    this.heatMapValues = this.geoJson2heat(data, 1)
  },
  methods: {
    ...mapActions(['getMiniMap', 'getBaseMaps', 'getWmsLayers']),
    pointToLayer(_, latlng) {
      return L.circleMarker(latlng, {
        color: 'red',
        stroke: true,
        weight: 0.5,
        fill: true,
        radius: 5,
      })
    },
    onEachFeature(feature, layer) {
      if (feature.properties) {
        const table = document.createElement('table')
        table.classList.add('popup-table')
        const tbody = document.createElement('tbody')
        table.appendChild(tbody)
        for (const key in feature.properties) {
          const tr = document.createElement('tr')
          const td1 = document.createElement('td')
          td1.classList.add('popup-table__key')
          const td2 = document.createElement('td')
          td1.innerHTML = key
          td2.innerHTML = feature.properties[key]
          tr.appendChild(td1)
          tr.appendChild(td2)
          tbody.appendChild(tr)
        }
        layer.bindPopup(table.outerHTML)
      }
    },
    geoJson2heat(geojson, intensity) {
      return geojson.features.map(function (feature) {
        return [
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
          intensity,
        ]
      })
    },
  },
}
</script>

<style>
.popup-table {
  font-family: 'JetBrains Mono';
  border: 1px solid #ddd;
}

.popup-table th,
.popup-table td {
  border-bottom: 1px solid #ddd;
}

.popup-table tr:hover {
  background-color: #f2f2f2;
}

.popup-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.popup-table__key {
  border-right: 1px solid #ddd;
  font-weight: bolder;
  text-transform: uppercase;
}

.popup-table__key::after {
  content: ':';
}
</style>
