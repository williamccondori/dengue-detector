<template>
  <client-only>
    <LMap
      style="width: 100%; min-height: 100vh"
      :zoom="6"
      :center="[-10.1884015, -75.6500792]"
    >
      <LTileLayer :url="url"> </LTileLayer>
      <LGeoJson
        v-if="geojson"
        :geojson="geojson"
        :options="{ pointToLayer: pointToLayer, onEachFeature: onEachFeature }"
      />
      <LHeatMap
        v-if="heatMapValues"
        :lat-lng="heatMapValues"
        :radius="50"
        :min-opacity="0.75"
        :max-zoom="10"
        :blur="60"
      />
    </LMap>
  </client-only>
</template>

<script>
import axios from 'axios'
import LHeatMap from '~/components/heatmap/LHeatMap.vue'

export default {
  components: {
    LHeatMap,
  },
  data() {
    return {
      url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      geojson: undefined,
      heatMapValues: undefined,
    }
  },
  async mounted() {
    const { data } = await axios.get(
      'https://api.map-viewer-app.williamcondori.work/api/querylayers?name=puerto_maldonado'
    )
    this.geojson = data
    this.heatMapValues = this.geoJson2heat(data, 1)
  },
  methods: {
    pointToLayer(_, latlng) {
      return L.circleMarker(latlng, {
        color: 'red',
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
