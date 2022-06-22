import Vue from 'vue';
import { LMap, LTileLayer, LWMSTileLayer, LMarker, LGeoJson } from 'vue2-leaflet';

import 'leaflet/dist/leaflet.css';

Vue.component('LMap', LMap);
Vue.component('LTileLayer', LTileLayer);
Vue.component('LGeoJson', LGeoJson)
Vue.component('LWMSTileLayer', LWMSTileLayer);
Vue.component('LMarker', LMarker);
