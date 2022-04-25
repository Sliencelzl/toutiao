import Vue from 'vue'
import Vuex from 'vuex'
import { setItem,getItem } from '../Utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
   /*  user:JSON.parse(window.localStorage.getItem(TOKEN_KEY)) */
   user:getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state,data){
      state.user = data
      /* window.localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user)) */
      setItem('TOKEN_KEY',state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
