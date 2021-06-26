import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex) 
Vue.config.productionTip = false
Vue.prototype.$ajax=axios

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

new Vue({
  store:store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

         
