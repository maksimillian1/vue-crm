import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import userInfo from './userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    currency: {}
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
    setCurrency(state, currency) {
      state.currency = currency
    }
  },
  getters: {
    error: s=> s.error,
    currency: s => s.currency
  },
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
      return await res.json()
    }
  },
  modules: {
    auth,
    userInfo
  }
})