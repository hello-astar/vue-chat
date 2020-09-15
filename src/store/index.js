import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// 用户相关的store
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  getters
})
