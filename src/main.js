import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueApollo from 'vue-apollo'
import axios from "axios";
import vueAxios from "vue-axios"
import vuetify from './plugins/vuetify';

Vue.use(vueAxios,axios)
Vue.use(vueApollo)

Vue.config.productionTip = false

axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem('token')}` 


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
