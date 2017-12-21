import api from 'src/api'

const state = {
  themes: []
}

const getters = {
  getThemes: state => state.themes
}

const mutations = {
  THEMES_LIST: (state, themes) => {
    state.themes = themes
  }
}

const actions = {
  getThemes ({ state, commit }) {
    return api.get('/themes').then((response) => {
      commit('THEMES_LIST', response.others)
    }).catch((error) => {
      console.log(error)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
