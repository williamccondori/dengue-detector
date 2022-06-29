import Vue from 'vue'
import {
  LMap,
  LTileLayer,
  LWMSTileLayer,
  LMarker,
  LGeoJson,
  LControlLayers,
  LControlScale,
} from 'vue2-leaflet'
import VueLeafletMinimap from 'vue-leaflet-minimap'

import 'leaflet/dist/leaflet.css'
import 'leaflet-minimap/dist/Control.MiniMap.min.css'

Vue.component('LMap', LMap)
Vue.component('LTileLayer', LTileLayer)
Vue.component('LGeoJson', LGeoJson)
Vue.component('LWMSTileLayer', LWMSTileLayer)
Vue.component('LMarker', LMarker)
Vue.component('LControlLayers', LControlLayers)
Vue.component('LControlScale', LControlScale)
Vue.component('LMiniMap', VueLeafletMinimap)
