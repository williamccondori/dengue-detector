import { v4 as uuidv4 } from 'uuid'

export const state = () => ({
  miniMap: {},
  baseMaps: [],
  isHeatMapVisible: false,
  isFeatureMapVisible: false,
})

export const actions = {
  async getBaseMaps({ commit }) {
    const API_KEY =
      'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    commit('SET_BASE_MAPS', [
      {
        id: uuidv4(),
        name: 'Mapbox Streets',
        url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${API_KEY}`,
        isVisible: true,
      },
      {
        id: uuidv4(),
        name: 'Mapbox Satellite Streets',
        url: `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=${API_KEY}`,
        isVisible: false,
      },
      {
        id: uuidv4(),
        name: 'Mapbox Dark',
        url: `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${API_KEY}`,
        isVisible: false,
      },
    ])
  },
  async getMiniMap({ commit }) {
    commit('SET_MINI_MAP', {
      id: uuidv4(),
      url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: {
        position: 'bottomright',
        toggleDisplay: true,
      },
    })
  },
  setHeatMapVisibility({ commit }, isVisible) {
    commit('SET_HEAT_MAP_VISIBILITY', isVisible)
  },
  setFeatureMapVisibility({ commit }, isVisible) {
    commit('SET_FEATURE_MAP_VISIBILITY', isVisible)
  },
}

export const mutations = {
  SET_BASE_MAPS: (state, payload) => (state.baseMaps = payload),
  SET_MINI_MAP: (state, payload) => (state.miniMap = payload),
  SET_HEAT_MAP_VISIBILITY: (state, payload) =>
    (state.isHeatMapVisible = payload),
  SET_FEATURE_MAP_VISIBILITY: (state, payload) =>
    (state.isFeatureMapVisible = payload),
}
