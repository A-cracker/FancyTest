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
    count: 0,
    token:""
  },
  mutations: {
    increment (state) {
      state.count++
    },
    saveToken(state, data) {//将 token 保存
      state.token = data;
    }
  }
})

new Vue({
  store:store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')


export default store;
         
